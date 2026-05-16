import sqlalchemy as sa
from pathlib import Path
from app.core.database import SessionLocal, engine
from app.ingestion.chunker import chunk_file
from app.ingestion.git_parser import parse_file_history, get_file_authors
from app.ingestion.pii import scrub
from app.services.embeddings import embed_code, embed_text
import structlog
import json

log = structlog.get_logger()

SUPPORTED_EXTENSIONS = {
    ".py", ".js", ".ts", ".jsx", ".tsx",
    ".java", ".go", ".rs", ".rb", ".cpp",
    ".c", ".cs", ".md", ".txt"
}


async def ingest_repo(repo_path: str, repo_id: str) -> dict:
    repo_path = Path(repo_path)
    if not repo_path.exists():
        return {"error": f"Repo path does not exist: {repo_path}"}

    code_files = [
        f for f in repo_path.rglob("*")
        if f.suffix.lower() in SUPPORTED_EXTENSIONS
        and ".git" not in f.parts
        and "node_modules" not in f.parts
        and "__pycache__" not in f.parts
    ][:20]

    total_chunks = 0
    total_intent = 0
    failed_files = []

    for fpath in code_files:
        try:
            content = fpath.read_text(errors="ignore")
            if not content.strip():
                continue

            rel_path = str(fpath.relative_to(repo_path))
            authors = get_file_authors(str(repo_path), rel_path)
            history = parse_file_history(str(repo_path), rel_path)
            chunks = chunk_file(rel_path, content)

            for chunk in chunks[:1]:
                clean = scrub(chunk["content"])
                try:
                    embeddings = await embed_code([clean])
                    if not embeddings:
                        continue
                    emb_str = "[" + ",".join(str(x) for x in embeddings[0]) + "]"
                    with engine.connect() as conn:
                        conn.execute(sa.text(
                            "INSERT INTO code_chunks "
                            "(repo_id, file_path, language, author, start_line, end_line, content, embedding) "
                            "VALUES (:rid, :fp, :lang, :auth, :sl, :el, :c, CAST(:e AS vector))"
                        ), {
                            "rid": repo_id,
                            "fp": rel_path,
                            "lang": chunk["language"],
                            "auth": authors[0] if authors else "unknown",
                            "sl": chunk["start_line"],
                            "el": chunk["end_line"],
                            "c": clean,
                            "e": emb_str
                        })
                        conn.commit()
                    total_chunks += 1
                except Exception as e:
                    log.error("chunk_embed_failed", error=str(e)[:120])
                    continue

            for commit in history[:1]:
                clean_msg = scrub(commit["message"])
                intent_text = (
                    f"File: {rel_path}\n"
                    f"Author: {commit['author']}\n"
                    f"Date: {commit['date']}\n"
                    f"Message: {clean_msg}\n"
                    f"Is fix: {commit.get('is_fix', False)}\n"
                    f"Is revert: {commit.get('is_revert', False)}"
                )
                try:
                    embeddings = await embed_text([intent_text])
                    if not embeddings:
                        continue
                    emb_str = "[" + ",".join(str(x) for x in embeddings[0]) + "]"
                    meta = json.dumps({"author": commit["author"], "file": rel_path})
                    with engine.connect() as conn:
                        conn.execute(sa.text(
                            "INSERT INTO intent_chunks "
                            "(repo_id, source_type, source_ref, content, metadata, embedding) "
                            "VALUES (:rid, :st, :sr, :c, CAST(:m AS jsonb), CAST(:e AS vector))"
                        ), {
                            "rid": repo_id,
                            "st": "commit",
                            "sr": commit["hash"],
                            "c": intent_text,
                            "m": meta,
                            "e": emb_str
                        })
                        conn.commit()
                    total_intent += 1
                except Exception as e:
                    log.error("intent_embed_failed", error=str(e)[:120])
                    continue

            log.info("ingested", file=rel_path)

        except Exception as e:
            failed_files.append(str(fpath))
            log.error("ingest_failed", error=str(e)[:120])

    return {
        "repo_id": repo_id,
        "files_processed": len(code_files),
        "code_chunks_stored": total_chunks,
        "intent_chunks_stored": total_intent,
        "failed_files": len(failed_files),
        "status": "complete"
    }
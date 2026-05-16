import sqlalchemy as sa
from pathlib import Path
from app.core.database import SessionLocal
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
    ][:200]

    total_chunks = 0
    total_intent = 0
    failed_files = []

    for fpath in code_files:
        db = SessionLocal()
        try:
            content = fpath.read_text(errors="ignore")
            if not content.strip():
                continue

            rel_path = str(fpath.relative_to(repo_path))
            authors = get_file_authors(str(repo_path), rel_path)
            history = parse_file_history(str(repo_path), rel_path)
            chunks = chunk_file(rel_path, content)

            for chunk in chunks:
                clean = scrub(chunk["content"])
                embeddings = await embed_code([clean])
                if not embeddings:
                    continue
                db.execute(sa.text("""
                    INSERT INTO code_chunks
                    (repo_id, file_path, language, author, start_line, end_line, content, embedding)
                    VALUES (:rid, :fp, :lang, :auth, :sl, :el, :c, :e::vector)
                """), {
                    "rid": repo_id,
                    "fp": rel_path,
                    "lang": chunk["language"],
                    "auth": authors[0] if authors else "unknown",
                    "sl": chunk["start_line"],
                    "el": chunk["end_line"],
                    "c": clean,
                    "e": str(embeddings[0])
                })
                total_chunks += 1

            for commit in history[:20]:
                clean_msg = scrub(commit["message"])
                intent_text = (
                    f"File: {rel_path}\n"
                    f"Author: {commit['author']}\n"
                    f"Date: {commit['date']}\n"
                    f"Message: {clean_msg}\n"
                    f"Is fix: {commit.get('is_fix', False)}\n"
                    f"Is revert: {commit.get('is_revert', False)}"
                )
                embeddings = await embed_text([intent_text])
                if not embeddings:
                    continue
                db.execute(sa.text("""
                    INSERT INTO intent_chunks
                    (repo_id, source_type, source_ref, content, metadata, embedding)
                    VALUES (:rid, :st, :sr, :c, :m::jsonb, :e::vector)
                """), {
                    "rid": repo_id,
                    "st": "commit",
                    "sr": commit["hash"],
                    "c": intent_text,
                    "m": json.dumps({"author": commit["author"], "file": rel_path}),
                    "e": str(embeddings[0])
                })
                total_intent += 1

            db.commit()
            log.info("ingested", file=rel_path)

        except Exception as e:
            failed_files.append(str(fpath))
            log.error("ingest_failed", file=str(fpath), error=str(e))
            db.rollback()
        finally:
            db.close()

    return {
        "repo_id": repo_id,
        "files_processed": len(code_files),
        "code_chunks_stored": total_chunks,
        "intent_chunks_stored": total_intent,
        "failed_files": len(failed_files),
        "status": "complete"
    }
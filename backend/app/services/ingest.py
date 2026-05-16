import sqlalchemy as sa
from pathlib import Path
from app.core.database import AsyncSessionLocal
from app.ingestion.chunker import chunk_file
from app.ingestion.git_parser import (
    parse_file_history,
    get_file_authors,
    format_history_for_bob
)
from app.ingestion.pii import scrub
from app.services.embeddings import embed_code, embed_text
import structlog

log = structlog.get_logger()

# File types to index
SUPPORTED_EXTENSIONS = {
    ".py", ".js", ".ts", ".jsx", ".tsx",
    ".java", ".go", ".rs", ".rb", ".cpp",
    ".c", ".cs", ".md", ".txt"
}


# ─────────────────────────────────────────────
# MAIN INGESTION PIPELINE
# ─────────────────────────────────────────────
async def ingest_repo(repo_path: str, repo_id: str) -> dict:
    """
    Full repo ingestion pipeline.
    1. Find all supported source files
    2. Chunk each file at function/class boundaries
    3. Scrub PII from content
    4. Embed with Voyage AI
    5. Store in pgvector
    6. Parse and store git history as intent chunks
    Returns a summary of what was ingested.
    """
    repo_path = Path(repo_path)
    if not repo_path.exists():
        return {"error": f"Repo path does not exist: {repo_path}"}

    code_files = [
        f for f in repo_path.rglob("*")
        if f.suffix.lower() in SUPPORTED_EXTENSIONS
        and ".git" not in f.parts
        and "node_modules" not in f.parts
        and "__pycache__" not in f.parts
    ]

    # Cap at 200 files for demo
    code_files = code_files[:200]

    total_chunks = 0
    total_intent = 0
    failed_files = []

    async with AsyncSessionLocal() as db:
        for fpath in code_files:
            try:
                content = fpath.read_text(errors="ignore")
                if not content.strip():
                    continue

                rel_path = str(fpath.relative_to(repo_path))
                authors = get_file_authors(str(repo_path), rel_path)
                history = parse_file_history(str(repo_path), rel_path)
                chunks = chunk_file(rel_path, content)

                # ── Store code chunks ──
                for chunk in chunks:
                    clean = scrub(chunk["content"])
                    embeddings = await embed_code([clean])
                    if not embeddings:
                        continue

                    await db.execute(sa.text("""
                        INSERT INTO code_chunks
                        (repo_id, file_path, language, author, start_line, end_line, content, embedding)
                        VALUES (:rid, :fp, :lang, :auth, :sl, :el, :c, :e::vector)
                        ON CONFLICT DO NOTHING
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

                # ── Store intent chunks (commit history) ──
                for commit in history[:20]:
                    clean_msg = scrub(commit["message"])
                    intent_text = (
                        f"File: {rel_path}\n"
                        f"Author: {commit['author']}\n"
                        f"Date: {commit['date']}\n"
                        f"Message: {clean_msg}\n"
                        f"Lines added: {commit.get('lines_added', 0)}\n"
                        f"Lines removed: {commit.get('lines_removed', 0)}\n"
                        f"Tickets: {', '.join(commit.get('ticket_refs', []))}\n"
                        f"Is fix: {commit.get('is_fix', False)}\n"
                        f"Is revert: {commit.get('is_revert', False)}"
                    )

                    embeddings = await embed_text([intent_text])
                    if not embeddings:
                        continue

                    await db.execute(sa.text("""
                        INSERT INTO intent_chunks
                        (repo_id, source_type, source_ref, content, metadata, embedding)
                        VALUES (:rid, :st, :sr, :c, :m::jsonb, :e::vector)
                        ON CONFLICT DO NOTHING
                    """), {
                        "rid": repo_id,
                        "st": "commit",
                        "sr": commit["hash"],
                        "c": intent_text,
                        "m": sa.text(f"""'{{"author": "{commit['author']}", "file": "{rel_path}"}}'"""),
                        "e": str(embeddings[0])
                    })
                    total_intent += 1

                await db.commit()
                log.info("ingested", file=rel_path, chunks=len(chunks))

            except Exception as e:
                failed_files.append({"file": str(fpath), "error": str(e)})
                log.error("ingest_failed", file=str(fpath), error=str(e))
                continue

    return {
        "repo_id": repo_id,
        "files_processed": len(code_files),
        "code_chunks_stored": total_chunks,
        "intent_chunks_stored": total_intent,
        "failed_files": len(failed_files),
        "status": "complete"
    }


# ─────────────────────────────────────────────
# SINGLE FILE INGEST — used by webhook
# ─────────────────────────────────────────────
async def ingest_file(repo_path: str, repo_id: str, file_path: str) -> dict:
    """
    Ingest a single file — called when a push webhook fires.
    Deletes existing chunks for this file then re-ingests.
    """
    full_path = Path(repo_path) / file_path

    if not full_path.exists():
        return {"error": "File not found"}

    async with AsyncSessionLocal() as db:
        # Delete stale chunks for this file
        await db.execute(sa.text("""
            DELETE FROM code_chunks
            WHERE repo_id = :rid AND file_path = :fp
        """), {"rid": repo_id, "fp": file_path})

        await db.execute(sa.text("""
            DELETE FROM intent_chunks
            WHERE repo_id = :rid AND source_type = 'commit'
            AND content LIKE :fp_pattern
        """), {"rid": repo_id, "fp_pattern": f"%File: {file_path}%"})

        await db.commit()

    # Re-ingest just this file
    result = await ingest_repo(repo_path, repo_id)
    return {"file": file_path, "status": "re-ingested", **result}
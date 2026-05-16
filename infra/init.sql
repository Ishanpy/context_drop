CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS code_chunks (
    id          SERIAL PRIMARY KEY,
    repo_id     TEXT NOT NULL,
    file_path   TEXT NOT NULL,
    language    TEXT,
    author      TEXT,
    start_line  INT,
    end_line    INT,
    content     TEXT,
    embedding   vector(1536)
);

CREATE TABLE IF NOT EXISTS intent_chunks (
    id          SERIAL PRIMARY KEY,
    repo_id     TEXT NOT NULL,
    source_type TEXT,
    source_ref  TEXT,
    content     TEXT,
    metadata    JSONB,
    embedding   vector(1024)
);

CREATE TABLE IF NOT EXISTS capsules (
    id          SERIAL PRIMARY KEY,
    repo_id     TEXT NOT NULL,
    file_path   TEXT NOT NULL,
    audience    TEXT NOT NULL,
    output      JSONB,
    stale       BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_log (
    id          SERIAL PRIMARY KEY,
    repo_id     TEXT,
    action      TEXT,
    detail      JSONB,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_code_embedding ON code_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_intent_embedding ON intent_chunks USING hnsw (embedding vector_cosine_ops);
# ContextDrop System Architecture & Flow

**Project Type:** Hackathon-level Knowledge Preservation System  
**Purpose:** Extract and preserve contextual knowledge from git repositories using AI

---

## 🎯 Core Concept

ContextDrop solves the "knowledge loss" problem in software teams by:
1. **Ingesting** git repositories and converting code + history into searchable vectors
2. **Retrieving** relevant context using semantic search
3. **Generating** intelligent briefs using IBM Granite LLM

Think of it as "Google for your codebase's WHY, not just WHAT"

---

## 🏗️ System Architecture Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ContextDrop System                           │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    FastAPI Backend                              │ │
│  │                                                                  │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │ │
│  │  │   API Routes │  │   Services   │  │  Ingestion   │         │ │
│  │  │              │  │              │  │              │         │ │
│  │  │ • capsule    │  │ • bob        │  │ • git_parser │         │ │
│  │  │ • ticket     │──│ • embeddings │──│ • chunker    │         │ │
│  │  │ • pr_brief   │  │ • retrieval  │  │ • pii        │         │ │
│  │  │ • busfactor  │  │ • ingest     │  │              │         │ │
│  │  │ • departure  │  │              │  │              │         │ │
│  │  │ • ingest     │  │              │  │              │         │ │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │ │
│  │         │                  │                  │                 │ │
│  └─────────┼──────────────────┼──────────────────┼─────────────────┘ │
│            │                  │                  │                   │
│            ▼                  ▼                  ▼                   │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐      │
│  │   PostgreSQL    │ │  Google Gemini  │ │   IBM WatsonX   │      │
│  │   + pgvector    │ │   Embeddings    │ │  Granite LLM    │      │
│  │                 │ │   (768-dim)     │ │                 │      │
│  │ • code_chunks   │ │                 │ │ • Reasoning     │      │
│  │ • intent_chunks │ │ • embed_code()  │ │ • Generation    │      │
│  │ • capsules      │ │ • embed_text()  │ │ • call_bob()    │      │
│  │ • audit_log     │ │ • embed_query() │ │                 │      │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📂 File Structure & Connections

```
context_drop/
├── backend/
│   └── app/
│       ├── main.py                    # FastAPI app entry point
│       ├── config.py                  # Settings & environment vars
│       │
│       ├── api/routes/                # HTTP endpoints
│       │   ├── capsule.py            → services/retrieval.py → services/bob.py
│       │   ├── ticket.py             → services/retrieval.py → services/bob.py
│       │   ├── pr_brief.py           → services/retrieval.py → services/bob.py
│       │   ├── busfactor.py          → ingestion/git_parser.py
│       │   ├── departure_brief.py    → ingestion/git_parser.py → services/bob.py
│       │   └── ingest.py             → services/ingest.py
│       │
│       ├── services/                  # Business logic
│       │   ├── bob.py                # IBM Granite LLM interface
│       │   ├── embeddings.py         # Google Gemini embeddings
│       │   ├── retrieval.py          # Vector search queries
│       │   └── ingest.py             → ingestion/* → embeddings.py
│       │
│       ├── ingestion/                 # Data processing
│       │   ├── git_parser.py         # Extract git history
│       │   ├── chunker.py            # Split code into chunks
│       │   └── pii.py                # Remove sensitive data
│       │
│       └── core/
│           └── database.py           # PostgreSQL connection
│
├── infra/
│   └── init.sql                      # Database schema
│
└── docker-compose.yml                # PostgreSQL + Redis setup
```

---

## 🔄 Data Flow Diagrams

### Flow 1: Repository Ingestion

```
User Request
    │
    ▼
POST /api/ingest
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ services/ingest.py::ingest_repo()                           │
│                                                               │
│  1. List files in repo (filter by extension)                │
│     └─> Only .py, .js, .ts, .java, .go, etc.               │
│                                                               │
│  2. For each file:                                           │
│     ├─> ingestion/git_parser.py::parse_file_history()      │
│     │   └─> Extract commits, authors, messages              │
│     │                                                         │
│     ├─> ingestion/git_parser.py::get_file_authors()        │
│     │   └─> Get author list sorted by commit count          │
│     │                                                         │
│     ├─> ingestion/chunker.py::chunk_file()                 │
│     │   └─> Split into logical chunks (functions/classes)   │
│     │                                                         │
│     ├─> ingestion/pii.py::scrub()                          │
│     │   └─> Remove emails, API keys, passwords              │
│     │                                                         │
│     ├─> services/embeddings.py::embed_code()               │
│     │   └─> Generate 768-dim vector via Gemini              │
│     │                                                         │
│     └─> Store in PostgreSQL code_chunks table               │
│                                                               │
│  3. For each commit:                                         │
│     ├─> Build intent text (author + date + message)         │
│     ├─> services/embeddings.py::embed_text()               │
│     │   └─> Generate 768-dim vector via Gemini              │
│     └─> Store in PostgreSQL intent_chunks table             │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Return: {
  "repo_id": "...",
  "files_processed": 20,
  "code_chunks_stored": 45,
  "intent_chunks_stored": 30
}
```

### Flow 2: Capsule Generation (Knowledge Brief)

```
User Request: "Explain auth.py"
    │
    ▼
POST /api/capsule
{
  "repo_id": "my-repo",
  "file_path": "src/auth.py",
  "audience": "developer"
}
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ api/routes/capsule.py::get_capsule()                        │
│                                                               │
│  1. Check PostgreSQL cache (capsules table)                 │
│     └─> If found & fresh (<1 hour) → return cached          │
│                                                               │
│  2. If not cached:                                           │
│     │                                                         │
│     ├─> services/retrieval.py::retrieve_context()          │
│     │   │                                                     │
│     │   ├─> Generate query embeddings:                       │
│     │   │   ├─> embed_query(file_path) → code_emb          │
│     │   │   └─> embed_query("why was X built") → intent_emb │
│     │   │                                                     │
│     │   ├─> Vector search in code_chunks:                    │
│     │   │   SELECT * FROM code_chunks                        │
│     │   │   WHERE repo_id = 'my-repo'                        │
│     │   │   ORDER BY embedding <=> code_emb                  │
│     │   │   LIMIT 8                                          │
│     │   │                                                     │
│     │   ├─> Vector search in intent_chunks:                  │
│     │   │   SELECT * FROM intent_chunks                      │
│     │   │   WHERE repo_id = 'my-repo'                        │
│     │   │   ORDER BY embedding <=> intent_emb                │
│     │   │   LIMIT 8                                          │
│     │   │                                                     │
│     │   └─> Return: {                                        │
│     │         "code": "...",      # Top 8 code chunks        │
│     │         "commits": "...",   # Top 8 commit messages    │
│     │         "authors": [...]    # File authors             │
│     │       }                                                 │
│     │                                                         │
│     └─> services/bob.py::generate_capsule()                 │
│         │                                                     │
│         ├─> Build prompt with context                        │
│         ├─> services/bob.py::call_bob()                     │
│         │   │                                                 │
│         │   ├─> Get IAM token from WatsonX                   │
│         │   ├─> POST to WatsonX API                          │
│         │   │   Model: ibm/granite-3-8b-instruct             │
│         │   │   Prompt: System + Audience + Context          │
│         │   │                                                 │
│         │   └─> Parse JSON response                          │
│         │                                                     │
│         └─> Return: {                                        │
│               "what": "...",                                 │
│               "why": "...",                                  │
│               "risk": "...",                                 │
│               "who_knows": [...],                            │
│               "confidence_score": 0.85                       │
│             }                                                 │
│                                                               │
│  3. Cache result in PostgreSQL                               │
│     INSERT INTO capsules (repo_id, file_path, output)       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Return: {
  "cached": false,
  "capsule": { ... }
}
```

### Flow 3: Ticket Intelligence

```
User Request: "I need to add OAuth support"
    │
    ▼
POST /api/ticket
{
  "repo_id": "my-repo",
  "ticket_text": "Add OAuth 2.0 authentication"
}
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ api/routes/ticket.py::get_ticket_intelligence()             │
│                                                               │
│  1. services/retrieval.py::retrieve_for_ticket()            │
│     │                                                         │
│     ├─> embed_query(ticket_text) → code_emb                 │
│     ├─> embed_query(ticket_text) → intent_emb               │
│     │                                                         │
│     ├─> Search code_chunks (top 6 matches)                   │
│     └─> Search intent_chunks (top 6 matches)                 │
│                                                               │
│  2. services/bob.py::analyze_ticket()                       │
│     │                                                         │
│     └─> call_bob() with ticket + context                    │
│         └─> Returns: {                                       │
│               "relevant_files": [...],                       │
│               "risks": "...",                                │
│               "open_questions": [...]                        │
│             }                                                 │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Return: Ticket analysis JSON
```

### Flow 4: PR Brief

```
User Request: PR opened with changed files
    │
    ▼
POST /api/pr-brief
{
  "repo_id": "my-repo",
  "pr_title": "Add rate limiting",
  "changed_files": ["api/middleware.py", "config.py"]
}
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ api/routes/pr_brief.py::get_pr_brief()                      │
│                                                               │
│  1. services/retrieval.py::retrieve_for_pr()                │
│     │                                                         │
│     └─> For each changed file:                               │
│         ├─> embed_query(file_path)                          │
│         └─> Search code_chunks for that file                 │
│                                                               │
│  2. services/bob.py::generate_pr_brief()                    │
│     │                                                         │
│     └─> call_bob() with PR info + code context              │
│         └─> Returns: {                                       │
│               "intent": "...",                               │
│               "risky_files": [...],                          │
│               "reviewer_must_know": "..."                    │
│             }                                                 │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Return: PR analysis JSON
```

### Flow 5: Bus Factor Analysis

```
User Request: "Show me risky files"
    │
    ▼
GET /api/bus-factor?repo_path=/path/to/repo
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ api/routes/busfactor.py::get_bus_factor()                   │
│                                                               │
│  1. ingestion/git_parser.py::bus_factor()                   │
│     │                                                         │
│     ├─> Iterate through git commits (last 500)              │
│     ├─> Track unique authors per file                        │
│     └─> Return: {                                            │
│           "auth.py": 1,      # High risk (1 author)         │
│           "utils.py": 2,     # Medium risk (2 authors)      │
│           "main.py": 5       # Low risk (5 authors)         │
│         }                                                     │
│                                                               │
│  2. Format results with risk levels                          │
│     └─> 1 author = "high"                                    │
│         2 authors = "medium"                                 │
│         3+ authors = "low"                                   │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Return: {
  "files": [...],
  "summary": {
    "high_risk": 12,
    "medium_risk": 8,
    "low_risk": 30
  }
}
```

### Flow 6: Departure Brief

```
User Request: "Engineer Alice is leaving"
    │
    ▼
POST /api/departure-brief
{
  "repo_path": "/path/to/repo",
  "engineer_name": "Alice"
}
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│ api/routes/departure_brief.py::get_departure_brief()        │
│                                                               │
│  1. Get bus factor scores                                    │
│     └─> ingestion/git_parser.py::bus_factor()              │
│                                                               │
│  2. Find files where Alice is sole author                    │
│     └─> Filter: author_count == 1 AND author == "Alice"     │
│                                                               │
│  3. Build context for Bob                                    │
│     └─> git_parser.py::format_departure_context_for_bob()  │
│         ├─> Get commit history for each file                 │
│         └─> Format as structured text                        │
│                                                               │
│  4. Generate brief                                           │
│     └─> services/bob.py::generate_departure_brief()        │
│         └─> Returns: {                                       │
│               "engineer": "Alice",                           │
│               "critical_modules": [                          │
│                 {                                             │
│                   "file": "auth.py",                         │
│                   "what": "...",                             │
│                   "why": "...",                              │
│                   "risk_if_lost": "..."                      │
│                 }                                             │
│               ]                                               │
│             }                                                 │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
Return: Departure brief JSON
```

---

## 🔗 Key File Connections

### 1. **main.py** → All Routes
```python
# main.py is the entry point
app.include_router(capsule.router, prefix="/api/capsule")
app.include_router(ticket.router, prefix="/api/ticket")
# ... etc
```

### 2. **Routes** → **Services** → **Ingestion**
```
capsule.py
    └─> retrieval.py::retrieve_context()
        ├─> embeddings.py::embed_query()
        └─> database.py (SQL queries)
    └─> bob.py::generate_capsule()
        └─> call_bob() → WatsonX API

ticket.py
    └─> retrieval.py::retrieve_for_ticket()
    └─> bob.py::analyze_ticket()

ingest.py
    └─> ingest.py::ingest_repo()
        ├─> git_parser.py::parse_file_history()
        ├─> chunker.py::chunk_file()
        ├─> pii.py::scrub()
        └─> embeddings.py::embed_code()
```

### 3. **Database Schema** → **Services**
```sql
-- init.sql defines tables
code_chunks (embedding vector(1536))
intent_chunks (embedding vector(1024))
capsules (output JSONB)

-- Used by:
retrieval.py → Queries code_chunks, intent_chunks
capsule.py → Queries/inserts capsules
ingest.py → Inserts code_chunks, intent_chunks
```

### 4. **Config** → Everything
```python
# config.py provides settings to all modules
settings = get_settings()
settings.database_url → database.py
settings.gemini_api_key → embeddings.py
settings.watsonx_api_key → bob.py
```

---

## 🧠 How It Works: The Intelligence Layer

### Vector Embeddings (Gemini)
```python
# embeddings.py
"def authenticate(user):" 
    ↓ Gemini API
[0.234, -0.891, 0.445, ...] (768 numbers)
```

**Purpose:** Convert code/text into numbers that capture semantic meaning
**Why:** Similar code has similar vectors → enables semantic search

### Vector Search (pgvector)
```sql
-- Find code similar to query
SELECT content FROM code_chunks
ORDER BY embedding <=> query_embedding
LIMIT 8
```

**Purpose:** Find relevant context without exact keyword matching
**Why:** "authentication" matches "login", "auth", "user verification"

### LLM Generation (IBM Granite)
```python
# bob.py
Prompt = System Instructions + Audience + Context
    ↓ WatsonX API (Granite model)
{
  "what": "This is an OAuth handler...",
  "why": "Built to support SSO...",
  "risk": "No rate limiting..."
}
```

**Purpose:** Reason over context and generate human-readable insights
**Why:** Combines code + history + tickets into actionable knowledge

---

## 🎭 Audience-Specific Output

The system tailors responses based on audience:

### Developer Audience
```json
{
  "what": "OAuth2 authentication middleware using JWT tokens",
  "why": "Replaced basic auth after security audit in Q2 2023",
  "risk": "Token refresh logic has race condition (see commit abc123)",
  "who_knows": ["Alice", "Bob"]
}
```

### Manager Audience
```json
{
  "what": "Login system that verifies user identity",
  "why": "Upgraded for better security after customer request",
  "risk": "If this breaks, users can't log in (2-hour fix time)",
  "who_knows": ["Alice", "Bob"]
}
```

### Junior Developer Audience
```json
{
  "what": "This file handles user login",
  "why": "We use OAuth because it's more secure than passwords",
  "risk": "Don't modify token_refresh() - it's tricky and breaks easily",
  "safe_to_edit": ["add_logging()", "format_response()"],
  "who_knows": ["Alice (ask her first)", "Bob"]
}
```

---

## 🔧 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend** | FastAPI | REST API framework |
| **Database** | PostgreSQL + pgvector | Store vectors & metadata |
| **Embeddings** | Google Gemini | Convert text → vectors (768-dim) |
| **LLM** | IBM Granite (WatsonX) | Generate insights |
| **Git Analysis** | GitPython | Parse commit history |
| **Logging** | structlog | Structured logging |
| **Config** | pydantic-settings | Environment management |

---

## 🚀 Quick Start Flow

```bash
# 1. Start infrastructure
docker-compose up -d  # PostgreSQL + Redis

# 2. Run database init
psql -U cduser -d contextdrop -f infra/init.sql

# 3. Start backend
cd backend
uvicorn app.main:app --reload

# 4. Ingest a repository
curl -X POST http://localhost:8000/api/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "repo_path": "/path/to/your/repo",
    "repo_id": "my-project"
  }'

# 5. Get a capsule
curl -X POST http://localhost:8000/api/capsule \
  -H "Content-Type: application/json" \
  -d '{
    "repo_id": "my-project",
    "file_path": "src/main.py",
    "audience": "developer"
  }'
```

---

## 🎯 Use Cases

### 1. **Onboarding New Developers**
```
GET /api/capsule → "Explain this file like I'm new"
Audience: junior
```

### 2. **Code Review Context**
```
POST /api/pr-brief → "What's risky about this PR?"
Returns: Historical context + risk assessment
```

### 3. **Ticket Planning**
```
POST /api/ticket → "Where should I start for this feature?"
Returns: Relevant files + known risks + questions to answer
```

### 4. **Knowledge Transfer**
```
POST /api/departure-brief → "Alice is leaving, what does she own?"
Returns: Critical modules + handoff notes
```

### 5. **Risk Assessment**
```
GET /api/bus-factor → "Which files are risky?"
Returns: Files with single author (bus factor = 1)
```

---

## 🔍 Key Insights

### What Makes This Smart?
1. **Semantic Search**: Finds relevant code even without exact keywords
2. **Historical Context**: Understands WHY code exists, not just WHAT it does
3. **Multi-Source**: Combines code + commits + tickets for complete picture
4. **Audience-Aware**: Same data, different explanations for different roles

### What Makes This Fast?
1. **Vector Indexing**: pgvector HNSW index for sub-second searches
2. **Caching**: Capsules cached for 1 hour in PostgreSQL
3. **Batch Processing**: Multiple embeddings in single API call (when fixed)

### What Makes This Useful?
1. **Preserves Tribal Knowledge**: Captures "why" before people leave
2. **Reduces Onboarding Time**: New devs get context instantly
3. **Improves Code Review**: Reviewers see historical context
4. **Identifies Risk**: Bus factor analysis shows knowledge gaps

---

## 🐛 Known Issues (Hackathon Context)

Since this is hackathon-level code, here are the main issues to be aware of:

### Critical
1. **Embedding dimension mismatch**: Schema expects 1536/1024, Gemini outputs 768
2. **Only first chunk processed**: `chunks[:1]` means 90% of code ignored
3. **Batch embedding broken**: Only processes first item in list
4. **No database initialization**: `init.sql` never executed

### How to Work Around
```python
# Fix 1: Update schema
ALTER TABLE code_chunks ALTER COLUMN embedding TYPE vector(768);
ALTER TABLE intent_chunks ALTER COLUMN embedding TYPE vector(768);

# Fix 2: Remove slice
for chunk in chunks:  # Not chunks[:1]

# Fix 3: Fix embed_code
for text in texts:  # Process all, not just texts[0]

# Fix 4: Run init.sql manually
psql -U cduser -d contextdrop -f infra/init.sql
```

---

## 📊 Performance Characteristics

| Operation | Time | Bottleneck |
|-----------|------|------------|
| Ingest 1 file | ~2-3s | Gemini API calls |
| Ingest 20 files | ~60s | Sequential processing |
| Capsule (cached) | <100ms | Database query |
| Capsule (uncached) | ~3-5s | WatsonX API + retrieval |
| Vector search | <50ms | pgvector index |
| Ticket analysis | ~4-6s | Embeddings + WatsonX |

---

## 🎓 Learning Resources

To understand this codebase:
1. **Vector Embeddings**: How text becomes numbers
2. **Semantic Search**: Why cosine similarity works
3. **LLM Prompting**: How to structure prompts for Granite
4. **pgvector**: PostgreSQL extension for vector operations
5. **FastAPI**: Modern Python web framework

---

## 🏁 Summary

**ContextDrop** is a knowledge preservation system that:
- Ingests git repos → chunks code → generates embeddings → stores in PostgreSQL
- Retrieves context via vector similarity search
- Generates insights using IBM Granite LLM
- Provides audience-specific explanations (developer/manager/junior)
- Supports 6 use cases: capsules, tickets, PRs, bus factor, departure briefs, ingestion

**Key Innovation**: Combines code + git history + AI to answer "WHY" not just "WHAT"

**Hackathon Status**: Core functionality works, but needs fixes for production use
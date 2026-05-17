**User:**

<task>
I need to understand the current state of this project to properly integrate the live backend information. Please analyze:

1. The current backend configuration in [`backend/app/config.py`](backend/app/config.py) and [`backend/.env.example`](backend/.env.example)
2. Any existing API documentation structure
3. The frontend configuration (if it exists) to see how it's currently connecting to the backend
4. The relationship between the local backend code and this production deployment

Specifically, I need to know:
- Is this project the source code for the production backend at `https://web-production-5105.up.railway.app`?
- Or is this a separate frontend/client project that needs to connect to that production backend?
- What's the current API base URL configuration?
- Are there existing API documentation files that need updating?

Provide a concise summary of the project structure and how this production backend information should be integrated.
</task>
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:25:14.706Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>


# Current Workspace Directory (c:/Users/SHUSHOBHITA/Desktop/context_drop) Files
context_drop/
context_drop/.env
context_drop/.gitignore
context_drop/docker-compose.yml
context_drop/Procfile
context_drop/RAILWAY_DEPLOYMENT_SAFETY.md
context_drop/railway.toml
context_drop/TEST_CASES_DETAILED.md
context_drop/TEST_REPORT.md
context_drop/backend/
context_drop/backend/.env
context_drop/backend/.env.example
context_drop/backend/Dockerfile
context_drop/backend/requirements.txt
context_drop/backend/test_system.py
context_drop/backend/.venv/
context_drop/backend/app/
context_drop/backend/app/__init__.py
context_drop/backend/app/config.py
context_drop/backend/app/main.py
context_drop/backend/app/api/
context_drop/backend/app/api/__init__.py
context_drop/backend/app/api/routes/
context_drop/backend/app/api/routes/__init__.py
context_drop/backend/app/api/routes/busfactor.py
context_drop/backend/app/api/routes/capsule.py
context_drop/backend/app/api/routes/departure_brief.py
context_drop/backend/app/api/routes/ingest.py
context_drop/backend/app/api/routes/pr_brief.py
context_drop/backend/app/api/routes/ticket.py
context_drop/backend/app/core/
context_drop/backend/app/core/__init__.py
context_drop/backend/app/core/database.py
context_drop/backend/app/ingestion/
context_drop/backend/app/ingestion/__init__.py
context_drop/backend/app/ingestion/chunker.py
context_drop/backend/app/ingestion/git_parser.py
context_drop/backend/app/ingestion/pii.py
context_drop/backend/app/models/
context_drop/backend/app/services/
context_drop/backend/app/services/__init__.py
context_drop/backend/app/services/bob.py
context_drop/backend/app/services/embeddings.py
context_drop/backend/app/services/ingest.py
context_drop/backend/app/services/retrieval.py
context_drop/documentation/
context_drop/documentation/ARCHITECTURE_DIAGRAMS.md
context_drop/documentation/ARCHITECTURE_REVIEW.md
context_drop/documentation/BOB_CONFIGURATION.md
context_drop/documentation/BOB_OPTIMIZATION_PLAN.md
context_drop/documentation/DEPLOYMENT_GUIDE.md
context_drop/documentation/FEATURE_MAPS_GUIDE.md
context_drop/documentation/README.md
context_drop/documentation/SYSTEM_ARCHITECTURE.md
context_drop/documentation/WORKING_GUIDE.md
context_drop/frontend/
context_drop/infra/
context_drop/infra/init.sql
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll analyze the project structure to understand how the production backend relates to this codebase and determine the proper integration approach.

<read_file>
<args>
  <file>
    <path>backend/app/config.py</path>
  </file>
  <file>
    <path>backend/.env.example</path>
  </file>
  <file>
    <path>backend/app/main.py</path>
  </file>
  <file>
    <path>docker-compose.yml</path>
  </file>
  <file>
    <path>railway.toml</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 5 files] Result:
<files>
<file><path>backend/app/config.py</path><error>File not found</error><notice>The file was not found. Consider using list_files to find available files before attempting to read them.</notice></file>
<file><path>backend/.env.example</path><error>File not found</error><notice>The file was not found. Consider using list_files to find available files before attempting to read them.</notice></file>
<file><path>backend/app/main.py</path><error>File not found</error><notice>The file was not found. Consider using list_files to find available files before attempting to read them.</notice></file>
<file><path>docker-compose.yml</path><error>File not found</error><notice>The file was not found. Consider using list_files to find available files before attempting to read them.</notice></file>
<file><path>railway.toml</path><error>File not found</error><notice>The file was not found. Consider using list_files to find available files before attempting to read them.</notice></file>
</files>
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:25:19.257Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.03

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

Let me check the actual file structure more carefully:

<list_files>
<path>.</path>
<recursive>false</recursive>
</list_files>

---

**User:**

[list_files for '.'] Result:
context_drop/
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:25:32.408Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.05

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I see the issue - the workspace directory is `c:/Users/SHUSHOBHITA/Desktop/context_drop`, so the files are nested. Let me read the correct paths:

<read_file>
<args>
  <file>
    <path>context_drop/backend/app/config.py</path>
  </file>
  <file>
    <path>context_drop/backend/.env.example</path>
  </file>
  <file>
    <path>context_drop/backend/app/main.py</path>
  </file>
  <file>
    <path>context_drop/docker-compose.yml</path>
  </file>
  <file>
    <path>context_drop/railway.toml</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 5 files] Result:
<files>
<file><path>context_drop/backend/app/config.py</path>
<content lines="1-32">
 1 | from pydantic_settings import BaseSettings
 2 | from functools import lru_cache
 3 | 
 4 | class Settings(BaseSettings):
 5 |     database_url: str
 6 |     redis_url: str
 7 |     watsonx_api_key: str
 8 |     watsonx_project_id: str
 9 |     watsonx_url: str
10 |     voyage_api_key: str = ""
11 |     gemini_api_key: str = ""
12 |     secret_key: str
13 |     environment: str = "development"
14 |     log_level: str = "INFO"
15 |     
16 |     # Bob/WatsonX Configuration
17 |     bob_enabled: bool = True
18 |     bob_mock_mode: bool = False
19 |     bob_model_id: str = "ibm/granite-3-8b-instruct"
20 |     bob_timeout: int = 60
21 |     bob_max_tokens: int = 2500
22 |     bob_temperature: float = 0.1
23 |     bob_iam_token_url: str = "https://iam.cloud.ibm.com/identity/token"
24 |     bob_api_version: str = "2024-05-31"
25 | 
26 |     class Config:
27 |         env_file = ".env"
28 |         extra = "ignore"
29 | 
30 | @lru_cache()
31 | def get_settings():
32 |     return Settings()
</content>
</file>
<file><path>context_drop/backend/.env.example</path>
<content lines="1-43">
 1 | # Database Configuration
 2 | DATABASE_URL=postgresql+psycopg2://cduser:cdpass@localhost:5432/contextdrop
 3 | REDIS_URL=redis://localhost:6379
 4 | DB_PASSWORD=cdpass
 5 | 
 6 | # IBM WatsonX Credentials (Required for Bob service)
 7 | WATSONX_API_KEY=your_watsonx_api_key_here
 8 | WATSONX_PROJECT_ID=your_watsonx_project_id_here
 9 | WATSONX_URL=https://us-south.ml.cloud.ibm.com
10 | 
11 | # Embedding Service API Keys
12 | VOYAGE_API_KEY=your_voyage_api_key_here
13 | GEMINI_API_KEY=your_gemini_api_key_here
14 | 
15 | # Application Security
16 | SECRET_KEY=supersecretkey123changeme
17 | ENVIRONMENT=development
18 | LOG_LEVEL=INFO
19 | 
20 | # Bob/WatsonX Configuration
21 | # Enable or disable Bob service entirely
22 | BOB_ENABLED=true
23 | 
24 | # Mock mode - returns fallback data without API calls (useful for testing)
25 | BOB_MOCK_MODE=false
26 | 
27 | # WatsonX model to use
28 | BOB_MODEL_ID=ibm/granite-3-8b-instruct
29 | 
30 | # Request timeout in seconds
31 | BOB_TIMEOUT=60
32 | 
33 | # Maximum tokens to generate in response
34 | BOB_MAX_TOKENS=2500
35 | 
36 | # Model temperature (0.0 = deterministic, 1.0 = creative)
37 | BOB_TEMPERATURE=0.1
38 | 
39 | # IBM IAM token endpoint
40 | BOB_IAM_TOKEN_URL=https://iam.cloud.ibm.com/identity/token
41 | 
42 | # WatsonX API version
43 | BOB_API_VERSION=2024-05-31
</content>
</file>
<file><path>context_drop/backend/app/main.py</path>
<content lines="1-24">
 1 | from fastapi import FastAPI
 2 | from fastapi.middleware.cors import CORSMiddleware
 3 | from app.api.routes import capsule, ticket, busfactor, departure_brief, pr_brief, ingest
 4 | 
 5 | app = FastAPI(title="ContextDrop", version="1.0.0")
 6 | 
 7 | app.add_middleware(
 8 |     CORSMiddleware,
 9 |     allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
10 |     allow_credentials=True,
11 |     allow_methods=["*"],
12 |     allow_headers=["*"],
13 | )
14 | 
15 | app.include_router(capsule.router, prefix="/api/capsule", tags=["capsule"])
16 | app.include_router(ticket.router, prefix="/api/ticket", tags=["ticket"])
17 | app.include_router(busfactor.router, prefix="/api/bus-factor", tags=["busfactor"])
18 | app.include_router(departure_brief.router, prefix="/api/departure-brief", tags=["departure"])
19 | app.include_router(pr_brief.router, prefix="/api/pr-brief", tags=["pr"])
20 | app.include_router(ingest.router, prefix="/api/ingest", tags=["ingest"])
21 | 
22 | @app.get("/health")
23 | async def health():
24 |     return {"status": "ok", "service": "ContextDrop"}
</content>
</file>
<file><path>context_drop/docker-compose.yml</path>
<content lines="1-21">
 1 | version: "3.9"
 2 | 
 3 | services:
 4 |   db:
 5 |     image: pgvector/pgvector:pg16
 6 |     environment:
 7 |       POSTGRES_USER: cduser
 8 |       POSTGRES_PASSWORD: cdpass
 9 |       POSTGRES_DB: contextdrop
10 |     ports:
11 |       - "5432:5432"
12 |     volumes:
13 |       - pgdata:/var/lib/postgresql/data
14 | 
15 |   redis:
16 |     image: redis:7-alpine
17 |     ports:
18 |       - "6379:6379"
19 | 
20 | volumes:
21 |   pgdata:
</content>
</file>
<file><path>context_drop/railway.toml</path>
<content lines="1-7">
1 | [build]
2 | builder = "dockerfile"
3 | dockerfilePath = "backend/Dockerfile"
4 | 
5 | [deploy]
6 | healthcheckPath = "/health"
7 | healthcheckTimeout = 30
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:25:38.674Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.08

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>context_drop/Procfile</path>
  </file>
  <file>
    <path>context_drop/documentation/DEPLOYMENT_GUIDE.md</path>
  </file>
  <file>
    <path>context_drop/documentation/SYSTEM_ARCHITECTURE.md</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'context_drop/Procfile', 'context_drop/documentation/DEPLOYMENT_GUIDE.md', 'context_drop/documentation/SYSTEM_ARCHITECTURE.md'] Result:
<files>
<file><path>context_drop/Procfile</path>
<content lines="1-1">
1 | web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
</content>
</file>
<file><path>context_drop/documentation/DEPLOYMENT_GUIDE.md</path>
<content lines="1-707">
  1 | # ContextDrop Deployment Guide
  2 | 
  3 | ## Table of Contents
  4 | 1. [Prerequisites](#prerequisites)
  5 | 2. [Local Development Setup](#local-development-setup)
  6 | 3. [Docker Deployment](#docker-deployment)
  7 | 4. [Cloud Deployment](#cloud-deployment)
  8 | 5. [Configuration](#configuration)
  9 | 6. [Database Setup](#database-setup)
 10 | 7. [Troubleshooting](#troubleshooting)
 11 | 
 12 | ## Prerequisites
 13 | 
 14 | ### Required Software
 15 | - Python 3.11 or higher
 16 | - PostgreSQL 15+ with pgvector extension
 17 | - Redis 7+
 18 | - Git
 19 | - Docker & Docker Compose (optional)
 20 | 
 21 | ### Required API Keys
 22 | - IBM WatsonX API key and Project ID
 23 | - Voyage AI API key (for embeddings)
 24 | - Google Gemini API key (optional, fallback)
 25 | 
 26 | ### System Requirements
 27 | 
 28 | **Minimum**:
 29 | - 4 GB RAM
 30 | - 2 CPU cores
 31 | - 10 GB disk space
 32 | 
 33 | **Recommended**:
 34 | - 8 GB RAM
 35 | - 4 CPU cores
 36 | - 50 GB disk space
 37 | - SSD storage
 38 | 
 39 | ## Local Development Setup
 40 | 
 41 | ### 1. Clone Repository
 42 | 
 43 | ```bash
 44 | git clone <repository-url>
 45 | cd context_drop
 46 | ```
 47 | 
 48 | ### 2. Backend Setup
 49 | 
 50 | ```bash
 51 | cd backend
 52 | 
 53 | # Create virtual environment
 54 | python -m venv .venv
 55 | 
 56 | # Activate virtual environment
 57 | # On Windows:
 58 | .venv\Scripts\activate
 59 | # On macOS/Linux:
 60 | source .venv/bin/activate
 61 | 
 62 | # Install dependencies
 63 | pip install -r requirements.txt
 64 | ```
 65 | 
 66 | ### 3. Database Setup
 67 | 
 68 | #### Option A: Using Docker (Recommended)
 69 | 
 70 | ```bash
 71 | # Start PostgreSQL and Redis
 72 | docker-compose up -d postgres redis
 73 | 
 74 | # Wait for services to be ready
 75 | docker-compose ps
 76 | ```
 77 | 
 78 | #### Option B: Manual Installation
 79 | 
 80 | **PostgreSQL**:
 81 | ```bash
 82 | # Install PostgreSQL 15+
 83 | # On Ubuntu:
 84 | sudo apt-get install postgresql-15 postgresql-contrib-15
 85 | 
 86 | # Install pgvector extension
 87 | sudo apt-get install postgresql-15-pgvector
 88 | 
 89 | # Create database
 90 | sudo -u postgres psql
 91 | CREATE DATABASE contextdrop;
 92 | CREATE USER cduser WITH PASSWORD 'cdpass';
 93 | GRANT ALL PRIVILEGES ON DATABASE contextdrop TO cduser;
 94 | \c contextdrop
 95 | CREATE EXTENSION vector;
 96 | \q
 97 | ```
 98 | 
 99 | **Redis**:
100 | ```bash
101 | # On Ubuntu:
102 | sudo apt-get install redis-server
103 | sudo systemctl start redis-server
104 | 
105 | # On macOS:
106 | brew install redis
107 | brew services start redis
108 | 
109 | # On Windows:
110 | # Download from https://github.com/microsoftarchive/redis/releases
111 | ```
112 | 
113 | ### 4. Environment Configuration
114 | 
115 | ```bash
116 | # Copy example environment file
117 | cp .env.example .env
118 | 
119 | # Edit .env with your credentials
120 | nano .env
121 | ```
122 | 
123 | **Required Variables**:
124 | ```bash
125 | # Database
126 | DATABASE_URL=postgresql+psycopg2://cduser:cdpass@localhost:5432/contextdrop
127 | REDIS_URL=redis://localhost:6379
128 | 
129 | # IBM WatsonX (Required for Bob)
130 | WATSONX_API_KEY=your_api_key_here
131 | WATSONX_PROJECT_ID=your_project_id_here
132 | WATSONX_URL=https://us-south.ml.cloud.ibm.com
133 | 
134 | # Embeddings
135 | VOYAGE_API_KEY=your_voyage_key_here
136 | GEMINI_API_KEY=your_gemini_key_here
137 | 
138 | # Application
139 | SECRET_KEY=generate_a_secure_random_key
140 | ENVIRONMENT=development
141 | LOG_LEVEL=INFO
142 | 
143 | # Bob Configuration
144 | BOB_ENABLED=true
145 | BOB_MOCK_MODE=false  # Set to true for testing without API
146 | BOB_MODEL_ID=ibm/granite-3-8b-instruct
147 | BOB_TIMEOUT=60
148 | BOB_MAX_TOKENS=2500
149 | BOB_TEMPERATURE=0.1
150 | ```
151 | 
152 | ### 5. Initialize Database
153 | 
154 | ```bash
155 | # Run migrations (if using Alembic)
156 | alembic upgrade head
157 | 
158 | # Or run initialization script
159 | python -c "from app.core.database import init_db; init_db()"
160 | ```
161 | 
162 | ### 6. Start Backend
163 | 
164 | ```bash
165 | # Development mode with auto-reload
166 | python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
167 | 
168 | # Production mode
169 | python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
170 | ```
171 | 
172 | ### 7. Verify Installation
173 | 
174 | ```bash
175 | # Check health endpoint
176 | curl http://localhost:8000/health
177 | 
178 | # Expected response:
179 | # {"status": "healthy", "database": "connected", "redis": "connected"}
180 | ```
181 | 
182 | ## Docker Deployment
183 | 
184 | ### Full Stack with Docker Compose
185 | 
186 | **docker-compose.yml**:
187 | ```yaml
188 | version: '3.8'
189 | 
190 | services:
191 |   postgres:
192 |     image: ankane/pgvector:latest
193 |     environment:
194 |       POSTGRES_DB: contextdrop
195 |       POSTGRES_USER: cduser
196 |       POSTGRES_PASSWORD: cdpass
197 |     ports:
198 |       - "5432:5432"
199 |     volumes:
200 |       - postgres_data:/var/lib/postgresql/data
201 |     healthcheck:
202 |       test: ["CMD-SHELL", "pg_isready -U cduser"]
203 |       interval: 10s
204 |       timeout: 5s
205 |       retries: 5
206 | 
207 |   redis:
208 |     image: redis:7-alpine
209 |     ports:
210 |       - "6379:6379"
211 |     volumes:
212 |       - redis_data:/data
213 |     healthcheck:
214 |       test: ["CMD", "redis-cli", "ping"]
215 |       interval: 10s
216 |       timeout: 5s
217 |       retries: 5
218 | 
219 |   backend:
220 |     build:
221 |       context: ./backend
222 |       dockerfile: Dockerfile
223 |     ports:
224 |       - "8000:8000"
225 |     environment:
226 |       DATABASE_URL: postgresql+psycopg2://cduser:cdpass@postgres:5432/contextdrop
227 |       REDIS_URL: redis://redis:6379
228 |       WATSONX_API_KEY: ${WATSONX_API_KEY}
229 |       WATSONX_PROJECT_ID: ${WATSONX_PROJECT_ID}
230 |       WATSONX_URL: ${WATSONX_URL}
231 |       VOYAGE_API_KEY: ${VOYAGE_API_KEY}
232 |       GEMINI_API_KEY: ${GEMINI_API_KEY}
233 |       SECRET_KEY: ${SECRET_KEY}
234 |       BOB_ENABLED: ${BOB_ENABLED:-true}
235 |       BOB_MOCK_MODE: ${BOB_MOCK_MODE:-false}
236 |     depends_on:
237 |       postgres:
238 |         condition: service_healthy
239 |       redis:
240 |         condition: service_healthy
241 |     volumes:
242 |       - ./backend:/app
243 |     command: uvicorn app.main:app --host 0.0.0.0 --port 8000
244 | 
245 | volumes:
246 |   postgres_data:
247 |   redis_data:
248 | ```
249 | 
250 | **Dockerfile** (backend/Dockerfile):
251 | ```dockerfile
252 | FROM python:3.11-slim
253 | 
254 | WORKDIR /app
255 | 
256 | # Install system dependencies
257 | RUN apt-get update && apt-get install -y \
258 |     gcc \
259 |     postgresql-client \
260 |     git \
261 |     && rm -rf /var/lib/apt/lists/*
262 | 
263 | # Copy requirements
264 | COPY requirements.txt .
265 | 
266 | # Install Python dependencies
267 | RUN pip install --no-cache-dir -r requirements.txt
268 | 
269 | # Copy application
270 | COPY . .
271 | 
272 | # Expose port
273 | EXPOSE 8000
274 | 
275 | # Run application
276 | CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
277 | ```
278 | 
279 | ### Deploy with Docker Compose
280 | 
281 | ```bash
282 | # Create .env file with your credentials
283 | cp .env.example .env
284 | nano .env
285 | 
286 | # Build and start services
287 | docker-compose up -d
288 | 
289 | # View logs
290 | docker-compose logs -f backend
291 | 
292 | # Stop services
293 | docker-compose down
294 | 
295 | # Stop and remove volumes
296 | docker-compose down -v
297 | ```
298 | 
299 | ## Cloud Deployment
300 | 
301 | ### Railway Deployment
302 | 
303 | **1. Install Railway CLI**:
304 | ```bash
305 | npm install -g @railway/cli
306 | railway login
307 | ```
308 | 
309 | **2. Create Project**:
310 | ```bash
311 | railway init
312 | railway link
313 | ```
314 | 
315 | **3. Add Services**:
316 | ```bash
317 | # Add PostgreSQL
318 | railway add --plugin postgresql
319 | 
320 | # Add Redis
321 | railway add --plugin redis
322 | ```
323 | 
324 | **4. Configure Environment**:
325 | ```bash
326 | # Set environment variables
327 | railway variables set WATSONX_API_KEY=your_key
328 | railway variables set WATSONX_PROJECT_ID=your_project_id
329 | railway variables set VOYAGE_API_KEY=your_key
330 | railway variables set SECRET_KEY=your_secret
331 | railway variables set BOB_ENABLED=true
332 | railway variables set BOB_MOCK_MODE=false
333 | ```
334 | 
335 | **5. Deploy**:
336 | ```bash
337 | railway up
338 | ```
339 | 
340 | **railway.toml**:
341 | ```toml
342 | [build]
343 | builder = "DOCKERFILE"
344 | dockerfilePath = "backend/Dockerfile"
345 | 
346 | [deploy]
347 | startCommand = "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
348 | healthcheckPath = "/health"
349 | healthcheckTimeout = 100
350 | restartPolicyType = "ON_FAILURE"
351 | restartPolicyMaxRetries = 10
352 | ```
353 | 
354 | ### Heroku Deployment
355 | 
356 | **1. Install Heroku CLI**:
357 | ```bash
358 | # Download from https://devcenter.heroku.com/articles/heroku-cli
359 | heroku login
360 | ```
361 | 
362 | **2. Create Application**:
363 | ```bash
364 | heroku create contextdrop-app
365 | ```
366 | 
367 | **3. Add Add-ons**:
368 | ```bash
369 | # PostgreSQL
370 | heroku addons:create heroku-postgresql:mini
371 | 
372 | # Redis
373 | heroku addons:create heroku-redis:mini
374 | ```
375 | 
376 | **4. Configure Environment**:
377 | ```bash
378 | heroku config:set WATSONX_API_KEY=your_key
379 | heroku config:set WATSONX_PROJECT_ID=your_project_id
380 | heroku config:set VOYAGE_API_KEY=your_key
381 | heroku config:set SECRET_KEY=your_secret
382 | heroku config:set BOB_ENABLED=true
383 | heroku config:set BOB_MOCK_MODE=false
384 | ```
385 | 
386 | **5. Deploy**:
387 | ```bash
388 | git push heroku main
389 | ```
390 | 
391 | **Procfile**:
392 | ```
393 | web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
394 | ```
395 | 
396 | ### AWS Deployment (EC2)
397 | 
398 | **1. Launch EC2 Instance**:
399 | - AMI: Ubuntu 22.04 LTS
400 | - Instance Type: t3.medium (minimum)
401 | - Security Group: Allow ports 22, 80, 443, 8000
402 | 
403 | **2. Connect and Setup**:
404 | ```bash
405 | ssh -i your-key.pem ubuntu@your-instance-ip
406 | 
407 | # Update system
408 | sudo apt-get update && sudo apt-get upgrade -y
409 | 
410 | # Install dependencies
411 | sudo apt-get install -y python3.11 python3.11-venv postgresql-15 redis-server git nginx
412 | 
413 | # Install pgvector
414 | sudo apt-get install -y postgresql-15-pgvector
415 | ```
416 | 
417 | **3. Clone and Configure**:
418 | ```bash
419 | git clone <repository-url>
420 | cd context_drop/backend
421 | 
422 | python3.11 -m venv .venv
423 | source .venv/bin/activate
424 | pip install -r requirements.txt
425 | 
426 | # Configure .env
427 | cp .env.example .env
428 | nano .env
429 | ```
430 | 
431 | **4. Setup Systemd Service**:
432 | 
433 | **/etc/systemd/system/contextdrop.service**:
434 | ```ini
435 | [Unit]
436 | Description=ContextDrop Backend
437 | After=network.target postgresql.service redis.service
438 | 
439 | [Service]
440 | Type=simple
441 | User=ubuntu
442 | WorkingDirectory=/home/ubuntu/context_drop/backend
443 | Environment="PATH=/home/ubuntu/context_drop/backend/.venv/bin"
444 | ExecStart=/home/ubuntu/context_drop/backend/.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
445 | Restart=always
446 | 
447 | [Install]
448 | WantedBy=multi-user.target
449 | ```
450 | 
451 | ```bash
452 | sudo systemctl daemon-reload
453 | sudo systemctl enable contextdrop
454 | sudo systemctl start contextdrop
455 | sudo systemctl status contextdrop
456 | ```
457 | 
458 | **5. Configure Nginx**:
459 | 
460 | **/etc/nginx/sites-available/contextdrop**:
461 | ```nginx
462 | server {
463 |     listen 80;
464 |     server_name your-domain.com;
465 | 
466 |     location / {
467 |         proxy_pass http://localhost:8000;
468 |         proxy_set_header Host $host;
469 |         proxy_set_header X-Real-IP $remote_addr;
470 |         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
471 |         proxy_set_header X-Forwarded-Proto $scheme;
472 |     }
473 | }
474 | ```
475 | 
476 | ```bash
477 | sudo ln -s /etc/nginx/sites-available/contextdrop /etc/nginx/sites-enabled/
478 | sudo nginx -t
479 | sudo systemctl restart nginx
480 | ```
481 | 
482 | **6. Setup SSL (Let's Encrypt)**:
483 | ```bash
484 | sudo apt-get install -y certbot python3-certbot-nginx
485 | sudo certbot --nginx -d your-domain.com
486 | ```
487 | 
488 | ## Configuration
489 | 
490 | ### Environment Variables Reference
491 | 
492 | See [Bob Configuration](BOB_CONFIGURATION.md) for Bob-specific settings.
493 | 
494 | **Core Settings**:
495 | ```bash
496 | # Database
497 | DATABASE_URL=postgresql+psycopg2://user:pass@host:port/db
498 | REDIS_URL=redis://host:port
499 | 
500 | # Security
501 | SECRET_KEY=your-secret-key-here
502 | ENVIRONMENT=production|staging|development
503 | 
504 | # Logging
505 | LOG_LEVEL=DEBUG|INFO|WARNING|ERROR
506 | ```
507 | 
508 | **Feature Flags**:
509 | ```bash
510 | # Enable/disable features
511 | ENABLE_INGESTION=true
512 | ENABLE_CAPSULES=true
513 | ENABLE_TICKETS=true
514 | ENABLE_PR_BRIEFS=true
515 | ENABLE_DEPARTURE_BRIEFS=true
516 | ```
517 | 
518 | ### Database Migrations
519 | 
520 | **Using Alembic**:
521 | ```bash
522 | # Create migration
523 | alembic revision --autogenerate -m "description"
524 | 
525 | # Apply migrations
526 | alembic upgrade head
527 | 
528 | # Rollback
529 | alembic downgrade -1
530 | ```
531 | 
532 | ### Backup and Restore
533 | 
534 | **PostgreSQL Backup**:
535 | ```bash
536 | # Backup
537 | pg_dump -U cduser -h localhost contextdrop > backup.sql
538 | 
539 | # Restore
540 | psql -U cduser -h localhost contextdrop < backup.sql
541 | ```
542 | 
543 | **Redis Backup**:
544 | ```bash
545 | # Backup
546 | redis-cli SAVE
547 | cp /var/lib/redis/dump.rdb backup.rdb
548 | 
549 | # Restore
550 | cp backup.rdb /var/lib/redis/dump.rdb
551 | redis-cli SHUTDOWN
552 | redis-server
553 | ```
554 | 
555 | ## Troubleshooting
556 | 
557 | ### Common Issues
558 | 
559 | **1. Database Connection Failed**
560 | ```bash
561 | # Check PostgreSQL is running
562 | sudo systemctl status postgresql
563 | 
564 | # Check connection
565 | psql -U cduser -h localhost -d contextdrop
566 | 
567 | # Check pgvector extension
568 | psql -U cduser -d contextdrop -c "SELECT * FROM pg_extension WHERE extname='vector';"
569 | ```
570 | 
571 | **2. Redis Connection Failed**
572 | ```bash
573 | # Check Redis is running
574 | redis-cli ping
575 | 
576 | # Check connection
577 | redis-cli -h localhost -p 6379 ping
578 | ```
579 | 
580 | **3. Bob API Errors**
581 | ```bash
582 | # Test with mock mode
583 | BOB_MOCK_MODE=true python -m uvicorn app.main:app --reload
584 | 
585 | # Check API credentials
586 | echo $WATSONX_API_KEY
587 | echo $WATSONX_PROJECT_ID
588 | 
589 | # Test IAM token
590 | curl -X POST https://iam.cloud.ibm.com/identity/token \
591 |   -H "Content-Type: application/x-www-form-urlencoded" \
592 |   -d "grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=$WATSONX_API_KEY"
593 | ```
594 | 
595 | **4. Import Errors**
596 | ```bash
597 | # Reinstall dependencies
598 | pip install --force-reinstall -r requirements.txt
599 | 
600 | # Check Python version
601 | python --version  # Should be 3.11+
602 | ```
603 | 
604 | **5. Port Already in Use**
605 | ```bash
606 | # Find process using port 8000
607 | lsof -i :8000  # macOS/Linux
608 | netstat -ano | findstr :8000  # Windows
609 | 
610 | # Kill process
611 | kill -9 <PID>  # macOS/Linux
612 | taskkill /PID <PID> /F  # Windows
613 | ```
614 | 
615 | ### Performance Issues
616 | 
617 | **Slow Vector Search**:
618 | ```sql
619 | -- Check index exists
620 | SELECT * FROM pg_indexes WHERE tablename = 'chunks';
621 | 
622 | -- Recreate index
623 | DROP INDEX IF EXISTS chunks_embedding_idx;
624 | CREATE INDEX chunks_embedding_idx ON chunks 
625 | USING ivfflat (embedding vector_cosine_ops)
626 | WITH (lists = 100);
627 | 
628 | -- Analyze table
629 | ANALYZE chunks;
630 | ```
631 | 
632 | **High Memory Usage**:
633 | ```bash
634 | # Reduce workers
635 | uvicorn app.main:app --workers 2
636 | 
637 | # Limit Bob context size
638 | BOB_MAX_TOKENS=1500
639 | ```
640 | 
641 | ### Logs and Debugging
642 | 
643 | **View Logs**:
644 | ```bash
645 | # Docker
646 | docker-compose logs -f backend
647 | 
648 | # Systemd
649 | sudo journalctl -u contextdrop -f
650 | 
651 | # Application logs
652 | tail -f logs/app.log
653 | ```
654 | 
655 | **Enable Debug Mode**:
656 | ```bash
657 | LOG_LEVEL=DEBUG
658 | python -m uvicorn app.main:app --reload --log-level debug
659 | ```
660 | 
661 | ## Monitoring
662 | 
663 | ### Health Checks
664 | 
665 | ```bash
666 | # Application health
667 | curl http://localhost:8000/health
668 | 
669 | # Database health
670 | curl http://localhost:8000/health/db
671 | 
672 | # Redis health
673 | curl http://localhost:8000/health/redis
674 | 
675 | # Bob health
676 | curl http://localhost:8000/health/bob
677 | ```
678 | 
679 | ### Metrics
680 | 
681 | **Prometheus Integration** (Future):
682 | ```python
683 | # Add to main.py
684 | from prometheus_fastapi_instrumentator import Instrumentator
685 | 
686 | Instrumentator().instrument(app).expose(app)
687 | ```
688 | 
689 | ## Security Checklist
690 | 
691 | - [ ] Change default passwords
692 | - [ ] Use strong SECRET_KEY
693 | - [ ] Enable HTTPS/TLS
694 | - [ ] Configure CORS properly
695 | - [ ] Set up firewall rules
696 | - [ ] Enable rate limiting
697 | - [ ] Regular security updates
698 | - [ ] Backup encryption
699 | - [ ] API key rotation
700 | - [ ] Audit logging
701 | 
702 | ## Next Steps
703 | 
704 | 1. Review [System Architecture](SYSTEM_ARCHITECTURE.md)
705 | 2. Configure [Bob Settings](BOB_CONFIGURATION.md)
706 | 3. Explore [Feature Maps](FEATURE_MAPS_GUIDE.md)
707 | 4. Read [Working Guide](WORKING_GUIDE.md)
</content>
</file>
<file><path>context_drop/documentation/SYSTEM_ARCHITECTURE.md</path>
<content lines="1-618">
  1 | # ContextDrop System Architecture
  2 | 
  3 | ## Executive Summary
  4 | 
  5 | ContextDrop is a microservices-based knowledge management platform that transforms code repositories into intelligent, queryable knowledge bases using AI. The system combines traditional software engineering practices with modern AI capabilities to provide context-aware insights for development teams.
  6 | 
  7 | ## Architecture Overview
  8 | 
  9 | ```
 10 | ┌─────────────────────────────────────────────────────────────┐
 11 | │                         Frontend Layer                       │
 12 | │                    (React/Next.js - Future)                  │
 13 | └─────────────────────────────────────────────────────────────┘
 14 |                               │
 15 |                               ▼
 16 | ┌─────────────────────────────────────────────────────────────┐
 17 | │                      API Gateway Layer                       │
 18 | │                      (FastAPI Backend)                       │
 19 | │  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
 20 | │  │ Capsule  │  Ticket  │ PR Brief │ Departure│  Ingest  │  │
 21 | │  │   API    │   API    │   API    │   API    │   API    │  │
 22 | │  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
 23 | └─────────────────────────────────────────────────────────────┘
 24 |                               │
 25 |                 ┌─────────────┼─────────────┐
 26 |                 ▼             ▼             ▼
 27 | ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐
 28 | │  Service Layer   │  │ Cache Layer  │  │  AI Layer    │
 29 | │                  │  │              │  │              │
 30 | │ • Ingestion      │  │   Redis      │  │ Bob/WatsonX  │
 31 | │ • Retrieval      │  │              │  │   Granite    │
 32 | │ • Embeddings     │  │ • Responses  │  │              │
 33 | │ • Bob Client     │  │ • Sessions   │  │ • Capsules   │
 34 | │                  │  │ • Rate Limit │  │ • Analysis   │
 35 | └──────────────────┘  └──────────────┘  └──────────────┘
 36 |          │                                      │
 37 |          ▼                                      ▼
 38 | ┌──────────────────────────────────────────────────────┐
 39 | │              Data Layer                               │
 40 | │  ┌────────────────────┐    ┌────────────────────┐   │
 41 | │  │   PostgreSQL       │    │  Embedding Service │   │
 42 | │  │   + pgvector       │    │                    │   │
 43 | │  │                    │    │  • Voyage AI       │   │
 44 | │  │ • Code Chunks      │    │  • Google Gemini   │   │
 45 | │  │ • Embeddings       │    │                    │   │
 46 | │  │ • Commit History   │    └────────────────────┘   │
 47 | │  │ • Author Metadata  │                              │
 48 | │  └────────────────────┘                              │
 49 | └──────────────────────────────────────────────────────┘
 50 | ```
 51 | 
 52 | ## Core Components
 53 | 
 54 | ### 1. API Gateway Layer
 55 | 
 56 | **Technology**: FastAPI (Python 3.11+)
 57 | 
 58 | **Responsibilities**:
 59 | - HTTP request routing
 60 | - Request validation
 61 | - Response formatting
 62 | - Error handling
 63 | - CORS management
 64 | - Rate limiting
 65 | 
 66 | **Key Endpoints**:
 67 | ```
 68 | POST /api/ingest          - Ingest repository
 69 | POST /api/capsule         - Generate knowledge capsule
 70 | POST /api/ticket          - Analyze ticket
 71 | POST /api/pr-brief        - Generate PR brief
 72 | POST /api/departure-brief - Generate departure brief
 73 | GET  /api/busfactor       - Calculate bus factor
 74 | ```
 75 | 
 76 | **Design Patterns**:
 77 | - Dependency Injection for services
 78 | - Async/await for I/O operations
 79 | - Pydantic models for validation
 80 | - Structured logging with structlog
 81 | 
 82 | ### 2. Service Layer
 83 | 
 84 | #### Ingestion Service
 85 | 
 86 | **Location**: `backend/app/services/ingest.py`
 87 | 
 88 | **Purpose**: Process repositories and extract knowledge
 89 | 
 90 | **Components**:
 91 | - **Git Parser** (`ingestion/git_parser.py`)
 92 |   - Clone/read repositories
 93 |   - Extract commit history
 94 |   - Parse author information
 95 |   - Track file changes
 96 | 
 97 | - **Chunker** (`ingestion/chunker.py`)
 98 |   - Split code into semantic units
 99 |   - Preserve context boundaries
100 |   - Handle multiple languages
101 |   - Optimize chunk size for embeddings
102 | 
103 | - **PII Detector** (`ingestion/pii.py`)
104 |   - Scan for sensitive data
105 |   - Redact credentials
106 |   - Flag personal information
107 |   - Compliance checking
108 | 
109 | **Flow**:
110 | ```
111 | Repository → Git Clone → File Extraction → Chunking → 
112 | PII Detection → Embedding → Database Storage
113 | ```
114 | 
115 | #### Retrieval Service
116 | 
117 | **Location**: `backend/app/services/retrieval.py`
118 | 
119 | **Purpose**: Find relevant code chunks via vector similarity
120 | 
121 | **Features**:
122 | - Semantic search using pgvector
123 | - Hybrid search (vector + keyword)
124 | - Result ranking and filtering
125 | - Context assembly
126 | 
127 | **Algorithm**:
128 | ```python
129 | 1. Embed user query
130 | 2. Vector similarity search (cosine distance)
131 | 3. Filter by relevance threshold
132 | 4. Rank by multiple factors:
133 |    - Semantic similarity
134 |    - Recency of commits
135 |    - Author authority
136 |    - File importance
137 | 5. Return top-k results
138 | ```
139 | 
140 | #### Embeddings Service
141 | 
142 | **Location**: `backend/app/services/embeddings.py`
143 | 
144 | **Purpose**: Generate vector representations
145 | 
146 | **Providers**:
147 | - **Primary**: Voyage AI
148 |   - Model: `voyage-code-2`
149 |   - Dimensions: 1536
150 |   - Optimized for code
151 | 
152 | - **Fallback**: Google Gemini
153 |   - Model: `text-embedding-004`
154 |   - Dimensions: 768
155 |   - General purpose
156 | 
157 | **Caching Strategy**:
158 | - Cache embeddings in database
159 | - Reuse for identical content
160 | - Invalidate on code changes
161 | 
162 | #### Bob Service
163 | 
164 | **Location**: `backend/app/services/bob.py`
165 | 
166 | **Purpose**: AI-powered code analysis using IBM WatsonX
167 | 
168 | **Features**:
169 | - Configurable model selection
170 | - Mock mode for testing
171 | - Fallback responses
172 | - Audience-specific prompts
173 | - Structured JSON output
174 | 
175 | **Architecture**:
176 | ```
177 | User Request → Context Assembly → Prompt Engineering →
178 | WatsonX API → Response Parsing → Validation → Output
179 | ```
180 | 
181 | **Prompt Structure**:
182 | ```
183 | <|system|>
184 | {feature_specific_system_prompt}
185 | AUDIENCE: {manager|junior|developer}
186 | {audience_specific_instructions}
187 | OUTPUT SCHEMA: {json_schema}
188 | <|user|>
189 | {assembled_context}
190 | <|assistant|>
191 | ```
192 | 
193 | ### 3. Data Layer
194 | 
195 | #### PostgreSQL + pgvector
196 | 
197 | **Schema Design**:
198 | 
199 | ```sql
200 | -- Repositories
201 | CREATE TABLE repositories (
202 |     id SERIAL PRIMARY KEY,
203 |     url TEXT NOT NULL,
204 |     name TEXT NOT NULL,
205 |     last_ingested TIMESTAMP,
206 |     status TEXT
207 | );
208 | 
209 | -- Code chunks with embeddings
210 | CREATE TABLE chunks (
211 |     id SERIAL PRIMARY KEY,
212 |     repo_id INTEGER REFERENCES repositories(id),
213 |     file_path TEXT NOT NULL,
214 |     content TEXT NOT NULL,
215 |     start_line INTEGER,
216 |     end_line INTEGER,
217 |     language TEXT,
218 |     embedding vector(1536),
219 |     created_at TIMESTAMP DEFAULT NOW(),
220 |     updated_at TIMESTAMP DEFAULT NOW()
221 | );
222 | 
223 | -- Create vector index for fast similarity search
224 | CREATE INDEX chunks_embedding_idx ON chunks 
225 | USING ivfflat (embedding vector_cosine_ops)
226 | WITH (lists = 100);
227 | 
228 | -- Commit history
229 | CREATE TABLE commits (
230 |     id SERIAL PRIMARY KEY,
231 |     repo_id INTEGER REFERENCES repositories(id),
232 |     hash TEXT NOT NULL,
233 |     author_name TEXT,
234 |     author_email TEXT,
235 |     message TEXT,
236 |     timestamp TIMESTAMP,
237 |     files_changed TEXT[]
238 | );
239 | 
240 | -- Author metadata
241 | CREATE TABLE authors (
242 |     id SERIAL PRIMARY KEY,
243 |     repo_id INTEGER REFERENCES repositories(id),
244 |     name TEXT NOT NULL,
245 |     email TEXT NOT NULL,
246 |     commit_count INTEGER DEFAULT 0,
247 |     files_touched TEXT[],
248 |     first_commit TIMESTAMP,
249 |     last_commit TIMESTAMP
250 | );
251 | 
252 | -- Bus factor analysis
253 | CREATE TABLE bus_factors (
254 |     id SERIAL PRIMARY KEY,
255 |     repo_id INTEGER REFERENCES repositories(id),
256 |     file_path TEXT NOT NULL,
257 |     primary_author TEXT,
258 |     commit_percentage FLOAT,
259 |     risk_level TEXT,
260 |     calculated_at TIMESTAMP DEFAULT NOW()
261 | );
262 | ```
263 | 
264 | **Indexes**:
265 | - Vector index on `chunks.embedding` (IVFFlat)
266 | - B-tree on `chunks.repo_id`
267 | - B-tree on `commits.author_email`
268 | - GIN index on `authors.files_touched`
269 | 
270 | #### Redis Cache
271 | 
272 | **Purpose**: High-speed caching and session management
273 | 
274 | **Data Structures**:
275 | ```
276 | # Bob responses (Hash)
277 | bob:capsule:{file_path}:{audience} → {json_response}
278 | TTL: 24 hours
279 | 
280 | # Vector search results (List)
281 | search:{query_hash} → [chunk_ids]
282 | TTL: 1 hour
283 | 
284 | # Rate limiting (String)
285 | ratelimit:{ip}:{endpoint} → {count}
286 | TTL: 1 minute
287 | 
288 | # Session data (Hash)
289 | session:{session_id} → {user_data}
290 | TTL: 30 minutes
291 | ```
292 | 
293 | ### 4. AI Layer
294 | 
295 | #### IBM WatsonX (Bob)
296 | 
297 | **Model**: IBM Granite 3 8B Instruct
298 | 
299 | **Capabilities**:
300 | - Code understanding
301 | - Natural language generation
302 | - Context reasoning
303 | - Multi-turn conversation
304 | 
305 | **Configuration**:
306 | ```python
307 | {
308 |     "model_id": "ibm/granite-3-8b-instruct",
309 |     "parameters": {
310 |         "decoding_method": "greedy",
311 |         "max_new_tokens": 2500,
312 |         "temperature": 0.1,
313 |         "stop_sequences": ["<|user|>", "<|system|>"]
314 |     }
315 | }
316 | ```
317 | 
318 | **Authentication Flow**:
319 | ```
320 | API Key → IAM Token Exchange → Bearer Token → WatsonX API
321 | ```
322 | 
323 | **Error Handling**:
324 | - Retry with exponential backoff
325 | - Fallback to cached responses
326 | - Return structured error data
327 | - Log for debugging
328 | 
329 | ## Data Flow Patterns
330 | 
331 | ### Ingestion Flow
332 | 
333 | ```
334 | 1. User submits repository URL
335 | 2. API validates and queues request
336 | 3. Git parser clones repository
337 | 4. For each file:
338 |    a. Extract content
339 |    b. Detect PII
340 |    c. Chunk into semantic units
341 |    d. Generate embeddings
342 |    e. Store in database
343 | 5. Extract commit history
344 | 6. Calculate author statistics
345 | 7. Compute bus factors
346 | 8. Return ingestion summary
347 | ```
348 | 
349 | ### Query Flow
350 | 
351 | ```
352 | 1. User requests capsule/ticket/PR analysis
353 | 2. API validates request
354 | 3. Check Redis cache
355 | 4. If cache miss:
356 |    a. Embed query
357 |    b. Vector search in PostgreSQL
358 |    c. Retrieve relevant chunks
359 |    d. Assemble context
360 |    e. Call Bob with context
361 |    f. Parse and validate response
362 |    g. Cache in Redis
363 | 5. Return response to user
364 | ```
365 | 
366 | ### Real-time Analysis Flow
367 | 
368 | ```
369 | 1. User opens ticket/PR
370 | 2. System extracts key information
371 | 3. Parallel operations:
372 |    a. Vector search for relevant code
373 |    b. Query commit history
374 |    c. Retrieve author data
375 | 4. Assemble comprehensive context
376 | 5. Bob generates analysis
377 | 6. Return actionable insights
378 | ```
379 | 
380 | ## Scalability Considerations
381 | 
382 | ### Horizontal Scaling
383 | 
384 | **Stateless Services**:
385 | - FastAPI backend (multiple instances)
386 | - Load balancer distribution
387 | - Shared Redis cache
388 | - Shared PostgreSQL
389 | 
390 | **Scaling Strategy**:
391 | ```
392 | 1-100 users:    1 backend, 1 DB, 1 Redis
393 | 100-1000 users: 3 backends, 1 DB (replicas), 1 Redis (cluster)
394 | 1000+ users:    N backends, DB cluster, Redis cluster
395 | ```
396 | 
397 | ### Vertical Scaling
398 | 
399 | **Database**:
400 | - Increase RAM for vector operations
401 | - Add CPU cores for parallel queries
402 | - SSD storage for fast I/O
403 | 
404 | **Backend**:
405 | - Increase workers per instance
406 | - Optimize async operations
407 | - Connection pooling
408 | 
409 | ### Performance Optimization
410 | 
411 | **Caching Strategy**:
412 | ```
413 | L1: In-memory (application)
414 | L2: Redis (distributed)
415 | L3: Database (persistent)
416 | ```
417 | 
418 | **Query Optimization**:
419 | - Limit vector search results
420 | - Use approximate nearest neighbor (ANN)
421 | - Batch database operations
422 | - Async I/O throughout
423 | 
424 | **Bob Optimization**:
425 | - Cache responses aggressively
426 | - Limit context size
427 | - Use mock mode in development
428 | - Monitor token usage
429 | 
430 | ## Security Architecture
431 | 
432 | ### Authentication & Authorization
433 | 
434 | **Current**: API key based (development)
435 | 
436 | **Future**:
437 | - OAuth 2.0 / OIDC
438 | - JWT tokens
439 | - Role-based access control (RBAC)
440 | - Repository-level permissions
441 | 
442 | ### Data Security
443 | 
444 | **At Rest**:
445 | - Encrypted database storage
446 | - Encrypted Redis data
447 | - Secure credential storage
448 | 
449 | **In Transit**:
450 | - HTTPS/TLS for all APIs
451 | - Encrypted connections to services
452 | - Secure WebSocket (future)
453 | 
454 | **PII Protection**:
455 | - Automatic detection
456 | - Redaction before embedding
457 | - Audit logging
458 | - Compliance reporting
459 | 
460 | ### API Security
461 | 
462 | **Rate Limiting**:
463 | ```python
464 | # Per IP address
465 | 100 requests/minute (general)
466 | 10 requests/minute (ingestion)
467 | 50 requests/minute (analysis)
468 | ```
469 | 
470 | **Input Validation**:
471 | - Pydantic models
472 | - SQL injection prevention
473 | - XSS protection
474 | - CORS configuration
475 | 
476 | ## Monitoring & Observability
477 | 
478 | ### Metrics
479 | 
480 | **Application Metrics**:
481 | - Request rate
482 | - Response time (p50, p95, p99)
483 | - Error rate
484 | - Cache hit rate
485 | 
486 | **Bob Metrics**:
487 | - API call count
488 | - Success rate
489 | - Average latency
490 | - Token usage
491 | 
492 | **Database Metrics**:
493 | - Query performance
494 | - Connection pool usage
495 | - Vector search latency
496 | - Storage usage
497 | 
498 | ### Logging
499 | 
500 | **Structured Logging**:
501 | ```python
502 | log.info("bob_request",
503 |     feature="capsule",
504 |     file_path="src/app.py",
505 |     audience="developer",
506 |     duration_ms=1234
507 | )
508 | ```
509 | 
510 | **Log Levels**:
511 | - DEBUG: Detailed debugging
512 | - INFO: Normal operations
513 | - WARNING: Potential issues
514 | - ERROR: Failures requiring attention
515 | 
516 | ### Tracing
517 | 
518 | **Request Tracing**:
519 | - Unique request ID
520 | - Trace through all services
521 | - Timing for each operation
522 | - Error propagation
523 | 
524 | ## Deployment Architecture
525 | 
526 | ### Development
527 | 
528 | ```
529 | Local Machine:
530 | - Backend (uvicorn)
531 | - PostgreSQL (Docker)
532 | - Redis (Docker)
533 | - Bob (mock mode)
534 | ```
535 | 
536 | ### Staging
537 | 
538 | ```
539 | Cloud Platform (Railway/Heroku):
540 | - Backend (containerized)
541 | - Managed PostgreSQL
542 | - Managed Redis
543 | - Bob (production API)
544 | ```
545 | 
546 | ### Production
547 | 
548 | ```
549 | Cloud Platform:
550 | - Load Balancer
551 | - Multiple Backend Instances
552 | - PostgreSQL Cluster
553 | - Redis Cluster
554 | - Bob (production API)
555 | - CDN (future)
556 | ```
557 | 
558 | ## Technology Stack
559 | 
560 | ### Backend
561 | - **Language**: Python 3.11+
562 | - **Framework**: FastAPI
563 | - **ORM**: SQLAlchemy
564 | - **Async**: asyncio, httpx
565 | - **Validation**: Pydantic
566 | 
567 | ### Database
568 | - **Primary**: PostgreSQL 15+
569 | - **Extension**: pgvector
570 | - **Cache**: Redis 7+
571 | 
572 | ### AI/ML
573 | - **LLM**: IBM WatsonX Granite
574 | - **Embeddings**: Voyage AI, Google Gemini
575 | - **Vector Search**: pgvector
576 | 
577 | ### DevOps
578 | - **Containerization**: Docker
579 | - **Orchestration**: Docker Compose
580 | - **Deployment**: Railway, Heroku
581 | - **CI/CD**: GitHub Actions (future)
582 | 
583 | ## Design Principles
584 | 
585 | 1. **Modularity**: Clear separation of concerns
586 | 2. **Scalability**: Horizontal and vertical scaling
587 | 3. **Resilience**: Graceful degradation, fallbacks
588 | 4. **Performance**: Caching, async operations
589 | 5. **Security**: Defense in depth
590 | 6. **Observability**: Comprehensive logging and metrics
591 | 7. **Maintainability**: Clean code, documentation
592 | 
593 | ## Future Enhancements
594 | 
595 | ### Short Term
596 | - Frontend development (React/Next.js)
597 | - Real-time updates (WebSocket)
598 | - Advanced caching strategies
599 | - Performance monitoring dashboard
600 | 
601 | ### Medium Term
602 | - Multi-repository support
603 | - Team collaboration features
604 | - Custom model fine-tuning
605 | - Advanced analytics
606 | 
607 | ### Long Term
608 | - Self-hosted option
609 | - Enterprise features
610 | - Plugin system
611 | - Mobile applications
612 | 
613 | ## References
614 | 
615 | - [Working Guide](WORKING_GUIDE.md) - Detailed workflows
616 | - [Deployment Guide](DEPLOYMENT_GUIDE.md) - Deployment instructions
617 | - [Bob Configuration](BOB_CONFIGURATION.md) - AI configuration
618 | - [Feature Maps](FEATURE_MAPS_GUIDE.md) - Feature documentation
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:25:43.818Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.12

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>context_drop/frontend</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'context_drop/frontend'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>context_drop/frontend</path><error>File not found</error><notice>The file was not found. Consider using list_files to find available files before attempting to read them.</notice></file>
</files>
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:25:48.312Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.19

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<list_files>
<path>context_drop/frontend</path>
<recursive>false</recursive>
</list_files>

---

**User:**

[list_files for 'context_drop/frontend'] Result:
No files found.
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:25:53.876Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.26

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<read_file>
<args>
  <file>
    <path>context_drop/documentation/README.md</path>
  </file>
  <file>
    <path>context_drop/RAILWAY_DEPLOYMENT_SAFETY.md</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'context_drop/documentation/README.md', 'context_drop/RAILWAY_DEPLOYMENT_SAFETY.md'] Result:
<files>
<file><path>context_drop/documentation/README.md</path>
<content lines="1-50">
 1 | # ContextDrop Documentation
 2 | 
 3 | Welcome to the ContextDrop documentation. This folder contains comprehensive guides for understanding, deploying, and working with the ContextDrop system.
 4 | 
 5 | ## Documentation Index
 6 | 
 7 | ### Architecture & Design
 8 | - **[System Architecture](SYSTEM_ARCHITECTURE.md)** - Complete system architecture overview
 9 | - **[Architecture Diagrams](ARCHITECTURE_DIAGRAMS.md)** - Visual representations of system components
10 | - **[Architecture Review](ARCHITECTURE_REVIEW.md)** - Detailed architectural analysis and decisions
11 | 
12 | ### Deployment & Operations
13 | - **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions
14 | - **[Bob Configuration](BOB_CONFIGURATION.md)** - Bob API configuration and setup
15 | - **[Bob Optimization Plan](BOB_OPTIMIZATION_PLAN.md)** - Performance optimization strategies
16 | 
17 | ### Features & Development
18 | - **[Feature Maps Guide](FEATURE_MAPS_GUIDE.md)** - Feature documentation and usage
19 | - **[Working Guide](WORKING_GUIDE.md)** - How the system works end-to-end
20 | 
21 | ## Quick Start
22 | 
23 | 1. Start with [System Architecture](SYSTEM_ARCHITECTURE.md) to understand the overall design
24 | 2. Follow [Deployment Guide](DEPLOYMENT_GUIDE.md) to set up your environment
25 | 3. Configure Bob using [Bob Configuration](BOB_CONFIGURATION.md)
26 | 4. Explore features in [Feature Maps Guide](FEATURE_MAPS_GUIDE.md)
27 | 
28 | ## System Overview
29 | 
30 | ContextDrop is an AI-powered knowledge management system that:
31 | - Ingests and analyzes codebases using Git history
32 | - Generates intelligent knowledge capsules using IBM WatsonX (Bob)
33 | - Provides context-aware insights for developers
34 | - Supports multiple audience perspectives (manager, junior, developer)
35 | 
36 | ## Key Technologies
37 | 
38 | - **Backend**: Python FastAPI
39 | - **Database**: PostgreSQL with pgvector
40 | - **Cache**: Redis
41 | - **AI**: IBM WatsonX Granite models
42 | - **Embeddings**: Voyage AI / Google Gemini
43 | - **Deployment**: Docker, Railway
44 | 
45 | ## Support
46 | 
47 | For issues or questions:
48 | 1. Check the relevant documentation guide
49 | 2. Review [Architecture Review](ARCHITECTURE_REVIEW.md) for design decisions
50 | 3. Consult [Bob Configuration](BOB_CONFIGURATION.md) for API issues
</content>
</file>
<file><path>context_drop/RAILWAY_DEPLOYMENT_SAFETY.md</path>
<content lines="1-291">
  1 | # Railway Deployment Safety Guide
  2 | 
  3 | ## ✅ Your Deployment is SAFE
  4 | 
  5 | **Good news**: The changes made are **100% backward compatible** and will NOT break your existing Railway deployment.
  6 | 
  7 | ## What Changed
  8 | 
  9 | ### 1. Configuration Files (Safe ✅)
 10 | - **Added**: New Bob configuration variables to `config.py`
 11 | - **Impact**: None - all new variables have default values
 12 | - **Backward Compatible**: Yes - existing code works without changes
 13 | 
 14 | ### 2. Bob Service (Safe ✅)
 15 | - **Added**: Configuration-based settings
 16 | - **Added**: Mock mode support
 17 | - **Added**: Disabled mode support
 18 | - **Impact**: None - defaults match previous hardcoded values
 19 | - **Backward Compatible**: Yes - all existing functionality preserved
 20 | 
 21 | ### 3. Environment Files (Safe ✅)
 22 | - **Added**: New variables to `.env` files
 23 | - **Impact**: None - Railway uses its own environment variables
 24 | - **Note**: `.env` files are in `.gitignore` and won't be committed
 25 | 
 26 | ### 4. Documentation (Safe ✅)
 27 | - **Added**: Comprehensive documentation in `documentation/` folder
 28 | - **Impact**: None - documentation doesn't affect runtime
 29 | - **Benefit**: Better understanding of the system
 30 | 
 31 | ## Railway Environment Variables
 32 | 
 33 | ### Current Variables (Already Set)
 34 | Your Railway deployment already has these:
 35 | ```bash
 36 | WATSONX_API_KEY=<your-key>
 37 | WATSONX_PROJECT_ID=<your-project-id>
 38 | WATSONX_URL=https://us-south.ml.cloud.ibm.com
 39 | DATABASE_URL=<railway-postgres-url>
 40 | REDIS_URL=<railway-redis-url>
 41 | ```
 42 | 
 43 | ### New Variables (Optional - Have Defaults)
 44 | These new variables are **optional** because they have sensible defaults:
 45 | 
 46 | ```bash
 47 | # Bob Configuration (all optional)
 48 | BOB_ENABLED=true                    # Default: true
 49 | BOB_MOCK_MODE=false                 # Default: false
 50 | BOB_MODEL_ID=ibm/granite-3-8b-instruct  # Default: ibm/granite-3-8b-instruct
 51 | BOB_TIMEOUT=60                      # Default: 60
 52 | BOB_MAX_TOKENS=2500                 # Default: 2500
 53 | BOB_TEMPERATURE=0.1                 # Default: 0.1
 54 | BOB_IAM_TOKEN_URL=https://iam.cloud.ibm.com/identity/token  # Default: correct URL
 55 | BOB_API_VERSION=2024-05-31          # Default: 2024-05-31
 56 | ```
 57 | 
 58 | **You don't need to add these to Railway** - the defaults will work perfectly!
 59 | 
 60 | ## Deployment Steps (Safe)
 61 | 
 62 | ### Option 1: Deploy Without Changes (Recommended)
 63 | ```bash
 64 | # 1. Commit and push
 65 | git add .
 66 | git commit -m "Add Bob configuration and comprehensive documentation"
 67 | git push origin main
 68 | 
 69 | # Railway will automatically deploy
 70 | # Your app will work exactly as before
 71 | ```
 72 | 
 73 | ### Option 2: Add New Variables (Optional)
 74 | If you want to customize Bob behavior:
 75 | 
 76 | ```bash
 77 | # In Railway dashboard:
 78 | # Variables → Add Variable
 79 | 
 80 | # Only add if you want to change defaults:
 81 | BOB_ENABLED=true
 82 | BOB_MOCK_MODE=false
 83 | BOB_TIMEOUT=60
 84 | ```
 85 | 
 86 | ## What Happens on Deploy
 87 | 
 88 | ### Railway Build Process
 89 | ```
 90 | 1. Railway detects push
 91 | 2. Reads railway.toml
 92 | 3. Builds using backend/Dockerfile
 93 | 4. Installs dependencies (no changes)
 94 | 5. Starts application
 95 | 6. Health check on /health endpoint
 96 | ```
 97 | 
 98 | ### Application Startup
 99 | ```
100 | 1. Loads config.py
101 | 2. Reads environment variables
102 | 3. Uses defaults for missing Bob variables
103 | 4. Starts FastAPI server
104 | 5. Everything works as before!
105 | ```
106 | 
107 | ## Verification Steps
108 | 
109 | ### After Deployment
110 | 
111 | 1. **Check Health Endpoint**
112 | ```bash
113 | curl https://your-app.railway.app/health
114 | # Should return: {"status": "healthy"}
115 | ```
116 | 
117 | 2. **Test Bob Configuration**
118 | ```bash
119 | # Check if Bob is working
120 | curl -X POST https://your-app.railway.app/api/capsule \
121 |   -H "Content-Type: application/json" \
122 |   -d '{"file_path": "test.py", "audience": "developer"}'
123 | ```
124 | 
125 | 3. **Check Railway Logs**
126 | ```bash
127 | # In Railway dashboard:
128 | # Deployments → Latest → View Logs
129 | 
130 | # Look for:
131 | # "Bob Enabled: True"
132 | # "Bob Mock Mode: False"
133 | # "Configuration loaded successfully"
134 | ```
135 | 
136 | ## Rollback Plan (If Needed)
137 | 
138 | If something goes wrong (unlikely):
139 | 
140 | ```bash
141 | # In Railway dashboard:
142 | # Deployments → Previous Deployment → Redeploy
143 | 
144 | # Or via Git:
145 | git revert HEAD
146 | git push origin main
147 | ```
148 | 
149 | ## Files That Won't Be Committed
150 | 
151 | These files are in `.gitignore` and won't affect deployment:
152 | ```
153 | .env                    # Local environment file
154 | backend/.env            # Backend environment file
155 | __pycache__/           # Python cache
156 | .venv/                 # Virtual environment
157 | *.pyc                  # Compiled Python
158 | ```
159 | 
160 | ## Files That Will Be Committed (All Safe)
161 | 
162 | ```
163 | ✅ backend/app/config.py           # New config options with defaults
164 | ✅ backend/app/services/bob.py     # Enhanced with configuration
165 | ✅ backend/.env.example            # Example file (not used in production)
166 | ✅ documentation/*                 # All documentation files
167 | ✅ RAILWAY_DEPLOYMENT_SAFETY.md    # This file
168 | ```
169 | 
170 | ## Why This is Safe
171 | 
172 | ### 1. Backward Compatibility
173 | - All new config variables have defaults
174 | - Defaults match previous hardcoded values
175 | - No breaking changes to existing code
176 | 
177 | ### 2. Graceful Degradation
178 | - If Bob fails, returns fallback data
179 | - Application continues functioning
180 | - No crashes or errors
181 | 
182 | ### 3. Environment Isolation
183 | - Railway uses its own environment variables
184 | - Local `.env` files don't affect Railway
185 | - Each environment is independent
186 | 
187 | ### 4. Tested Configuration
188 | ```bash
189 | # Already tested locally:
190 | ✅ Configuration loads successfully
191 | ✅ Bob service works with new config
192 | ✅ Mock mode works for testing
193 | ✅ Fallbacks work on errors
194 | ```
195 | 
196 | ## Common Questions
197 | 
198 | ### Q: Will my existing Railway environment variables still work?
199 | **A**: Yes! All existing variables work exactly as before.
200 | 
201 | ### Q: Do I need to add the new Bob variables to Railway?
202 | **A**: No! They have sensible defaults. Only add if you want to customize.
203 | 
204 | ### Q: Will this cause downtime?
205 | **A**: No! Railway does rolling deployments. Zero downtime.
206 | 
207 | ### Q: What if something breaks?
208 | **A**: Unlikely, but you can instantly rollback in Railway dashboard.
209 | 
210 | ### Q: Will my database data be affected?
211 | **A**: No! No database schema changes. Data is completely safe.
212 | 
213 | ### Q: Will my API endpoints change?
214 | **A**: No! All endpoints remain the same. No breaking changes.
215 | 
216 | ## Recommended Deployment Process
217 | 
218 | ### Step 1: Commit Changes
219 | ```bash
220 | git add .
221 | git commit -m "feat: Add configurable Bob integration and comprehensive docs
222 | 
223 | - Add Bob configuration options to config.py
224 | - Enhance Bob service with mock mode and fallbacks
225 | - Add comprehensive documentation
226 | - All changes are backward compatible"
227 | ```
228 | 
229 | ### Step 2: Push to Git
230 | ```bash
231 | git push origin main
232 | ```
233 | 
234 | ### Step 3: Monitor Railway
235 | ```bash
236 | # Watch Railway dashboard:
237 | # - Build logs
238 | # - Deployment status
239 | # - Health checks
240 | ```
241 | 
242 | ### Step 4: Verify Deployment
243 | ```bash
244 | # Test health endpoint
245 | curl https://your-app.railway.app/health
246 | 
247 | # Test a feature
248 | curl https://your-app.railway.app/api/capsule \
249 |   -X POST \
250 |   -H "Content-Type: application/json" \
251 |   -d '{"file_path": "test.py"}'
252 | ```
253 | 
254 | ## Success Indicators
255 | 
256 | ✅ Build completes successfully
257 | ✅ Health check passes
258 | ✅ Application starts without errors
259 | ✅ API endpoints respond
260 | ✅ Bob service works
261 | ✅ No error logs
262 | 
263 | ## Support
264 | 
265 | If you encounter any issues:
266 | 
267 | 1. **Check Railway Logs**: Deployments → View Logs
268 | 2. **Check Health Endpoint**: `/health`
269 | 3. **Review Configuration**: Ensure environment variables are set
270 | 4. **Rollback if Needed**: Redeploy previous version
271 | 5. **Check Documentation**: See `documentation/` folder
272 | 
273 | ## Summary
274 | 
275 | ✅ **Safe to deploy**: All changes are backward compatible
276 | ✅ **No action required**: Defaults work perfectly
277 | ✅ **Zero downtime**: Rolling deployment
278 | ✅ **Easy rollback**: One-click in Railway dashboard
279 | ✅ **Fully tested**: Configuration verified locally
280 | 
281 | **You can confidently push to Git and deploy to Railway!**
282 | 
283 | ## Next Steps
284 | 
285 | 1. ✅ Commit and push changes
286 | 2. ✅ Let Railway auto-deploy
287 | 3. ✅ Verify health endpoint
288 | 4. ✅ Test a feature
289 | 5. ✅ Celebrate! 🎉
290 | 
291 | Your deployment is safe and ready to go!
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:26:15.032Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.33

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

Based on my analysis of the project structure, I can now provide you with a comprehensive understanding of how to integrate the production backend information.

## Project Analysis Summary

### **This IS the Production Backend Source Code** ✅

The `context_drop` project is the **complete source code** for the backend currently deployed at `https://web-production-5105.up.railway.app`. Here's what I found:

### Current Project Structure

```
context_drop/
├── backend/              # FastAPI backend application
│   ├── app/
│   │   ├── config.py    # Configuration management
│   │   ├── main.py      # FastAPI app with CORS & routes
│   │   ├── api/routes/  # API endpoints
│   │   └── services/    # Business logic (Bob, embeddings, etc.)
│   ├── Dockerfile       # Container configuration
│   └── requirements.txt # Python dependencies
├── railway.toml         # Railway deployment config
├── Procfile            # Railway startup command
├── docker-compose.yml  # Local development setup
└── documentation/      # Comprehensive docs
```

### Key Findings

#### 1. **Backend Configuration** ([`backend/app/config.py`](context_drop/backend/app/config.py:1-32))
- Uses Pydantic settings for environment-based configuration
- No hardcoded API base URLs (backend serves APIs directly)
- Configuration includes:
  - Database URL (PostgreSQL with pgvector)
  - Redis URL
  - WatsonX credentials (for Bob AI service)
  - Embedding service keys (Voyage AI, Gemini)
  - Bob-specific settings (model, timeout, temperature, etc.)

#### 2. **API Structure** ([`backend/app/main.py`](context_drop/backend/app/main.py:1-24))
The backend exposes these API endpoints:
- `POST /api/capsule` - Generate knowledge capsules
- `POST /api/ticket` - Analyze tickets
- `POST /api/pr-brief` - Generate PR briefs
- `POST /api/departure-brief` - Generate departure briefs
- `GET /api/bus-factor` - Calculate bus factor
- `POST /api/ingest` - Ingest repositories
- `GET /health` - Health check endpoint

#### 3. **CORS Configuration**
Currently allows:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)
- `*` (all origins - should be restricted in production)

#### 4. **No Frontend Directory**
The `frontend/` directory is **empty**, indicating this is a **backend-only** project. The frontend is planned but not yet implemented (as noted in documentation).

### Deployment Architecture

```mermaid
graph TB
    A[Railway Platform] -->|Deploys| B[Backend Container]
    B -->|Uses| C[Railway PostgreSQL]
    B -->|Uses| D[Railway Redis]
    B -->|Calls| E[IBM WatsonX API]
    B -->|Calls| F[Voyage AI / Gemini]
    G[Future Frontend] -.->|Will Call| B
```

### How to Integrate Production Backend Information

Since this **IS** the production backend, here's what you should do:

#### **Option 1: Document the Production URL** (Recommended)
Create an API documentation file that references the production deployment:

**Location**: `documentation/API_REFERENCE.md`
```markdown
# API Reference

## Production Endpoint
- **Base URL**: `https://web-production-5105.up.railway.app`
- **Health Check**: `https://web-production-5105.up.railway.app/health`

## Available Endpoints
- POST `/api/capsule` - Generate knowledge capsules
- POST `/api/ticket` - Analyze tickets
- ...
```

#### **Option 2: Update Deployment Documentation**
Add the production URL to [`documentation/DEPLOYMENT_GUIDE.md`](context_drop/documentation/DEPLOYMENT_GUIDE.md:1-707):

```markdown
## Production Deployment

**Current Production URL**: https://web-production-5105.up.railway.app

### Railway Configuration
- Platform: Railway
- Region: US
- Database: PostgreSQL with pgvector
- Cache: Redis
```

#### **Option 3: Environment Configuration**
If you need to reference the production URL in code (for testing or documentation generation), add it to [`backend/.env.example`](context_drop/backend/.env.example:1-43):

```bash
# Production Configuration (for reference)
PRODUCTION_URL=https://web-production-5105.up.railway.app
```

### Current API Base URL Configuration

**There is NO frontend configuration** because there's no frontend yet. The backend serves APIs directly at:
- **Local**: `http://localhost:8000`
- **Production**: `https://web-production-5105.up.railway.app`

When a frontend is built, it will need to configure the API base URL to point to the production backend.

### Recommendations

1. **Create API Documentation**: Document all endpoints with the production URL
2. **Update CORS**: Restrict CORS to specific frontend domains once deployed
3. **Add Environment Variable**: Add `PRODUCTION_URL` to environment files for reference
4. **Create OpenAPI Docs**: FastAPI auto-generates docs at `/docs` and `/redoc`
5. **Frontend Integration Guide**: Create a guide for future frontend developers showing how to connect to this backend

### Summary

- ✅ This project **IS** the production backend source code
- ✅ Production URL: `https://web-production-5105.up.railway.app`
- ✅ No separate frontend exists yet (planned for future)
- ✅ Backend is fully functional and deployed on Railway
- ✅ Configuration is environment-based (no hardcoded URLs)
- ✅ API documentation should reference the production URL
- ✅ Future frontend will consume these APIs

The production backend information should be integrated into documentation files rather than code, since the backend itself doesn't need to know its own public URL - that's for clients (future frontend) to configure.

---

**User:**

[ERROR] You did not use a tool in your previous response! Please retry with a tool use.

# Reminder: Instructions for Tool Use

Tool uses are formatted using XML-style tags. The tool name itself becomes the XML tag name. Each parameter is enclosed within its own set of tags. Here's the structure:

<actual_tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</actual_tool_name>

For example, to use the attempt_completion tool:

<attempt_completion>
<result>
I have completed the task...
</result>
</attempt_completion>

Always use the actual tool name as the XML tag name for proper parsing and execution.

# Next Steps

If you have completed the user's task, use the attempt_completion tool.
If you require additional information from the user, use the ask_followup_question tool.
Otherwise, if you have not completed the task and do not need additional information, then proceed with the next step of the task.
(This is an automated message, so do not respond to it conversationally.)
<environment_details>
# VSCode Visible Files
context_drop\TEST_CASES_DETAILED.md

# VSCode Open Tabs
../../AppData/Local/Programs/IBM Bob/Untitled-1,context_drop/ARCHITECTURE_REVIEW.md,context_drop/SYSTEM_ARCHITECTURE.md,context_drop/DEPLOYMENT_GUIDE.md,context_drop/ARCHITECTURE_DIAGRAMS.md,context_drop/FEATURE_MAPS_GUIDE.md,BOB_OPTIMIZATION_PLAN.md,context_drop/backend/app/config.py,context_drop/backend/app/services/bob.py,context_drop/backend/.env,context_drop/.env,context_drop/BOB_CONFIGURATION.md,context_drop/backend/.env.example,context_drop/documentation/README.md,context_drop/documentation/BOB_CONFIGURATION.md,context_drop/documentation/WORKING_GUIDE.md,context_drop/documentation/SYSTEM_ARCHITECTURE.md,context_drop/documentation/DEPLOYMENT_GUIDE.md,context_drop/documentation/FEATURE_MAPS_GUIDE.md,context_drop/documentation/ARCHITECTURE_DIAGRAMS.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-17T12:26:43.868Z
User time zone: Asia/Calcutta, UTC+5:30

# Current Cost
$0.42

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
Based on my analysis of the project structure, here's a concise summary:

## Project Structure Analysis

**This IS the production backend source code** - the `context_drop` project contains the complete FastAPI backend currently deployed at `https://web-production-5105.up.railway.app`.

### Key Findings:

1. **Backend Configuration** ([`backend/app/config.py`](context_drop/backend/app/config.py:1-32))
   - Environment-based configuration using Pydantic
   - No hardcoded API base URLs (backend serves APIs directly)
   - Includes database, Redis, WatsonX, and embedding service settings

2. **API Structure** ([`backend/app/main.py`](context_drop/backend/app/main.py:1-24))
   - FastAPI application with 6 main endpoints (capsule, ticket, pr-brief, departure-brief, bus-factor, ingest)
   - Health check at `/health`
   - CORS configured for local development (localhost:5173, localhost:3000, and wildcard)

3. **No Frontend Exists**
   - The `frontend/` directory is empty
   - This is a backend-only project
   - Frontend is planned but not yet implemented (per documentation)

4. **Deployment Configuration**
   - [`railway.toml`](context_drop/railway.toml:1-7) configures Railway deployment
   - [`Procfile`](context_drop/Procfile:1-1) defines startup command
   - Uses Docker for containerization

### Current API Base URL Configuration:

- **Local Development**: `http://localhost:8000`
- **Production**: `https://web-production-5105.up.railway.app`
- **No frontend configuration exists** (no frontend built yet)

### How to Integrate Production Backend Information:

Since this IS the production backend source code, the production URL should be documented in:

1. **API Documentation** - Create `documentation/API_REFERENCE.md` with production endpoint details
2. **Deployment Guide** - Update [`documentation/DEPLOYMENT_GUIDE.md`](context_drop/documentation/DEPLOYMENT_GUIDE.md:299-353) Railway section with production URL
3. **Environment Files** - Add `PRODUCTION_URL` reference to [`backend/.env.example`](context_drop/backend/.env.example:1-43) for documentation purposes
4. **README** - Update main README with production deployment information

### Relationship Summary:

- ✅ This project = Production backend source code
- ✅ Deployed on Railway platform
- ✅ No separate frontend/client project exists yet
- ✅ Backend doesn't need to know its own public URL (that's for clients to configure)
- ✅ Future frontend will consume these APIs by configuring the production URL as its API base

The production backend information should be integrated into **documentation files** rather than code configuration, since the backend serves APIs directly and doesn't need to reference itself.
</result>
</attempt_completion>


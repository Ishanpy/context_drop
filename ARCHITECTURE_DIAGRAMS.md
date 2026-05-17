# ContextDrop Architecture Diagrams

Visual representations of the ContextDrop system architecture using Mermaid diagrams.

---

## 1. System Overview

```mermaid
graph TB
    subgraph "Client Layer"
        USER[User/Developer]
    end
    
    subgraph "API Layer"
        API[FastAPI Backend<br/>Port 8000]
    end
    
    subgraph "Service Layer"
        BOB[Bob Service<br/>LLM Interface]
        EMB[Embeddings Service<br/>Vector Generation]
        RET[Retrieval Service<br/>Vector Search]
        ING[Ingest Service<br/>Data Processing]
    end
    
    subgraph "Processing Layer"
        GIT[Git Parser<br/>History Analysis]
        CHUNK[Chunker<br/>Code Splitting]
        PII[PII Scrubber<br/>Data Cleaning]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL<br/>+ pgvector)]
    end
    
    subgraph "External APIs"
        GEMINI[Google Gemini<br/>Embeddings API]
        WATSON[IBM WatsonX<br/>Granite LLM]
    end
    
    USER -->|HTTP Requests| API
    API --> BOB
    API --> RET
    API --> ING
    
    BOB -->|Generate Insights| WATSON
    EMB -->|Generate Vectors| GEMINI
    RET -->|Query Vectors| DB
    RET --> EMB
    
    ING --> GIT
    ING --> CHUNK
    ING --> PII
    ING --> EMB
    ING -->|Store Data| DB
    
    BOB --> RET
    
    style USER fill:#e1f5ff
    style API fill:#fff3e0
    style DB fill:#f3e5f5
    style GEMINI fill:#e8f5e9
    style WATSON fill:#e8f5e9
```

---

## 2. Data Flow: Repository Ingestion

```mermaid
sequenceDiagram
    participant User
    participant API as FastAPI
    participant Ingest as Ingest Service
    participant Git as Git Parser
    participant Chunk as Chunker
    participant PII as PII Scrubber
    participant Embed as Embeddings
    participant Gemini as Google Gemini
    participant DB as PostgreSQL

    User->>API: POST /api/ingest<br/>{repo_path, repo_id}
    API->>Ingest: ingest_repo()
    
    loop For each file
        Ingest->>Git: parse_file_history()
        Git-->>Ingest: commits, authors
        
        Ingest->>Chunk: chunk_file()
        Chunk-->>Ingest: code chunks
        
        Ingest->>PII: scrub()
        PII-->>Ingest: cleaned content
        
        Ingest->>Embed: embed_code()
        Embed->>Gemini: API call
        Gemini-->>Embed: 768-dim vector
        Embed-->>Ingest: embeddings
        
        Ingest->>DB: INSERT code_chunks
        Ingest->>DB: INSERT intent_chunks
    end
    
    Ingest-->>API: {files_processed, chunks_stored}
    API-->>User: Ingestion complete
```

---

## 3. Data Flow: Capsule Generation

```mermaid
sequenceDiagram
    participant User
    participant API as FastAPI
    participant Cache as Cache Check
    participant Ret as Retrieval Service
    participant Embed as Embeddings
    participant DB as PostgreSQL
    participant Bob as Bob Service
    participant Watson as IBM WatsonX

    User->>API: POST /api/capsule<br/>{repo_id, file_path}
    API->>Cache: Check PostgreSQL cache
    
    alt Cache Hit
        Cache-->>API: Return cached capsule
        API-->>User: {cached: true, capsule}
    else Cache Miss
        API->>Ret: retrieve_context()
        
        Ret->>Embed: embed_query(file_path)
        Embed-->>Ret: code_embedding
        
        Ret->>Embed: embed_query(why built)
        Embed-->>Ret: intent_embedding
        
        Ret->>DB: Vector search code_chunks
        DB-->>Ret: Top 8 code matches
        
        Ret->>DB: Vector search intent_chunks
        DB-->>Ret: Top 8 commit matches
        
        Ret-->>API: {code, commits, authors}
        
        API->>Bob: generate_capsule()
        Bob->>Watson: POST with context
        Watson-->>Bob: JSON response
        Bob-->>API: {what, why, risk, who_knows}
        
        API->>DB: Cache capsule
        API-->>User: {cached: false, capsule}
    end
```

---

## 4. Component Architecture

```mermaid
graph LR
    subgraph "Backend Application"
        subgraph "API Routes"
            R1[/api/capsule]
            R2[/api/ticket]
            R3[/api/pr-brief]
            R4[/api/bus-factor]
            R5[/api/departure-brief]
            R6[/api/ingest]
        end
        
        subgraph "Services"
            S1[bob.py]
            S2[embeddings.py]
            S3[retrieval.py]
            S4[ingest.py]
        end
        
        subgraph "Ingestion"
            I1[git_parser.py]
            I2[chunker.py]
            I3[pii.py]
        end
        
        subgraph "Core"
            C1[database.py]
            C2[config.py]
        end
    end
    
    R1 --> S3
    R1 --> S1
    R2 --> S3
    R2 --> S1
    R3 --> S3
    R3 --> S1
    R4 --> I1
    R5 --> I1
    R5 --> S1
    R6 --> S4
    
    S1 --> C2
    S2 --> C2
    S3 --> S2
    S3 --> C1
    S4 --> I1
    S4 --> I2
    S4 --> I3
    S4 --> S2
    S4 --> C1
    
    C1 --> C2
    
    style R1 fill:#bbdefb
    style R2 fill:#bbdefb
    style R3 fill:#bbdefb
    style R4 fill:#bbdefb
    style R5 fill:#bbdefb
    style R6 fill:#bbdefb
    style S1 fill:#c8e6c9
    style S2 fill:#c8e6c9
    style S3 fill:#c8e6c9
    style S4 fill:#c8e6c9
```

---

## 5. Database Schema

```mermaid
erDiagram
    CODE_CHUNKS {
        int id PK
        text repo_id
        text file_path
        text language
        text author
        int start_line
        int end_line
        text content
        vector_768 embedding
    }
    
    INTENT_CHUNKS {
        int id PK
        text repo_id
        text source_type
        text source_ref
        text content
        jsonb metadata
        vector_768 embedding
    }
    
    CAPSULES {
        int id PK
        text repo_id
        text file_path
        text audience
        jsonb output
        boolean stale
        timestamptz created_at
    }
    
    AUDIT_LOG {
        int id PK
        text repo_id
        text action
        jsonb detail
        timestamptz created_at
    }
    
    CODE_CHUNKS ||--o{ CAPSULES : "generates"
    INTENT_CHUNKS ||--o{ CAPSULES : "generates"
```

---

## 6. Vector Search Flow

```mermaid
graph TD
    A[User Query:<br/>Explain auth.py] --> B[Generate Query Embedding]
    B --> C[768-dimensional Vector]
    
    C --> D[Vector Similarity Search]
    
    D --> E[(code_chunks table)]
    D --> F[(intent_chunks table)]
    
    E --> G[Calculate Cosine Distance]
    F --> H[Calculate Cosine Distance]
    
    G --> I[Top 8 Code Matches]
    H --> J[Top 8 Commit Matches]
    
    I --> K[Assemble Context]
    J --> K
    
    K --> L[Send to LLM]
    L --> M[Generate Capsule]
    
    style A fill:#e3f2fd
    style C fill:#fff9c4
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style M fill:#c8e6c9
```

---

## 7. Deployment Architecture

```mermaid
graph TB
    subgraph "Docker Compose"
        PG[PostgreSQL + pgvector<br/>Port 5432]
        REDIS[Redis<br/>Port 6379]
    end
    
    subgraph "Local Process"
        FAST[FastAPI + uvicorn<br/>Port 8000]
    end
    
    subgraph "External Services"
        GEM[Google Gemini API<br/>Embeddings]
        WAT[IBM WatsonX API<br/>Granite LLM]
    end
    
    FAST -->|SQL Queries| PG
    FAST -->|Cache| REDIS
    FAST -->|Embed Requests| GEM
    FAST -->|LLM Requests| WAT
    
    USER[Developer] -->|HTTP| FAST
    
    style PG fill:#f3e5f5
    style REDIS fill:#ffebee
    style FAST fill:#fff3e0
    style GEM fill:#e8f5e9
    style WAT fill:#e8f5e9
    style USER fill:#e1f5ff
```

---

## 8. Request Flow: Ticket Intelligence

```mermaid
flowchart TD
    A[User: Add OAuth support] --> B[POST /api/ticket]
    B --> C{Retrieve Context}
    
    C --> D[Embed ticket text]
    D --> E[Search code_chunks]
    D --> F[Search intent_chunks]
    
    E --> G[Top 6 code matches]
    F --> H[Top 6 commit matches]
    
    G --> I[Assemble context]
    H --> I
    
    I --> J[Call Bob Service]
    J --> K[Generate prompt]
    K --> L[IBM Granite LLM]
    
    L --> M{Parse Response}
    M --> N[relevant_files]
    M --> O[risks]
    M --> P[open_questions]
    
    N --> Q[Return JSON]
    O --> Q
    P --> Q
    
    Q --> R[User receives analysis]
    
    style A fill:#e3f2fd
    style L fill:#e8f5e9
    style R fill:#c8e6c9
```

---

## 9. Bus Factor Analysis Flow

```mermaid
flowchart LR
    A[GET /api/bus-factor] --> B[Git Parser]
    
    B --> C[Iterate commits<br/>last 500]
    
    C --> D{For each file}
    
    D --> E[Track unique authors]
    
    E --> F{Count authors}
    
    F -->|1 author| G[High Risk]
    F -->|2 authors| H[Medium Risk]
    F -->|3+ authors| I[Low Risk]
    
    G --> J[Return results]
    H --> J
    I --> J
    
    J --> K[Sort by risk<br/>highest first]
    
    K --> L[User receives<br/>risk assessment]
    
    style G fill:#ffcdd2
    style H fill:#fff9c4
    style I fill:#c8e6c9
```

---

## 10. Embedding Generation Process

```mermaid
graph TD
    A[Source Code] --> B[Chunker]
    B --> C[Code Chunks]
    
    C --> D[PII Scrubber]
    D --> E[Clean Text]
    
    E --> F[Embeddings Service]
    F --> G[Google Gemini API]
    
    G --> H[768-dimensional Vector]
    
    H --> I{Store in DB}
    
    I --> J[(code_chunks)]
    I --> K[(intent_chunks)]
    
    subgraph "Vector Format"
        H
        L[Example:<br/>0.234, -0.891, 0.445, ...]
    end
    
    style A fill:#e3f2fd
    style E fill:#fff9c4
    style H fill:#ffebee
    style J fill:#f3e5f5
    style K fill:#f3e5f5
```

---

## 11. Audience-Specific Output Flow

```mermaid
graph TD
    A[Same Context] --> B{Audience Type}
    
    B -->|developer| C[Technical Output]
    B -->|manager| D[Business Output]
    B -->|junior| E[Educational Output]
    
    C --> F[File paths<br/>Function names<br/>Technical debt<br/>Architecture decisions]
    
    D --> G[Business impact<br/>Risk in time/money<br/>Team dependencies<br/>No jargon]
    
    E --> H[What it does<br/>Why it exists<br/>Safe to edit<br/>Who to ask]
    
    F --> I[Bob generates<br/>appropriate response]
    G --> I
    H --> I
    
    style B fill:#fff9c4
    style C fill:#bbdefb
    style D fill:#c8e6c9
    style E fill:#ffccbc
```

---

## 12. Error Handling Flow

```mermaid
flowchart TD
    A[API Request] --> B{Try Operation}
    
    B -->|Success| C[Return Result]
    
    B -->|Embedding Error| D[Log Error]
    B -->|Database Error| E[Log Error]
    B -->|LLM Error| F[Log Error]
    
    D --> G{Return Fallback}
    E --> G
    F --> G
    
    G --> H[Empty/Default Response]
    H --> I[User receives<br/>partial result]
    
    C --> J[User receives<br/>full result]
    
    style B fill:#fff9c4
    style D fill:#ffcdd2
    style E fill:#ffcdd2
    style F fill:#ffcdd2
    style C fill:#c8e6c9
```

---

## 13. Caching Strategy

```mermaid
graph TD
    A[Capsule Request] --> B{Check PostgreSQL Cache}
    
    B -->|Found & Fresh<br/>less than 1 hour| C[Return Cached]
    
    B -->|Not Found or Stale| D[Generate New]
    
    D --> E[Retrieve Context]
    E --> F[Call LLM]
    F --> G[Generate Capsule]
    
    G --> H[Store in Cache]
    H --> I[Return Fresh]
    
    C --> J[Fast Response<br/>less than 100ms]
    I --> K[Slow Response<br/>3-5 seconds]
    
    style B fill:#fff9c4
    style C fill:#c8e6c9
    style D fill:#ffebee
    style J fill:#c8e6c9
    style K fill:#ffccbc
```

---

## 14. File Processing Pipeline

```mermaid
flowchart LR
    A[Repository] --> B[List Files]
    B --> C{Filter Extensions}
    
    C -->|.py .js .ts etc| D[Process File]
    C -->|Other| E[Skip]
    
    D --> F[Parse Git History]
    D --> G[Chunk Code]
    
    F --> H[Extract Commits]
    G --> I[Split into Chunks]
    
    H --> J[Generate Intent Embeddings]
    I --> K[Generate Code Embeddings]
    
    J --> L[(intent_chunks)]
    K --> M[(code_chunks)]
    
    style C fill:#fff9c4
    style D fill:#c8e6c9
    style E fill:#ffcdd2
```

---

## 15. Complete System Integration

```mermaid
graph TB
    subgraph "User Interface Layer"
        UI[API Endpoints<br/>/api/*]
    end
    
    subgraph "Business Logic Layer"
        BL1[Capsule Generation]
        BL2[Ticket Analysis]
        BL3[PR Brief]
        BL4[Bus Factor]
        BL5[Departure Brief]
        BL6[Repository Ingestion]
    end
    
    subgraph "Data Processing Layer"
        DP1[Git History Parser]
        DP2[Code Chunker]
        DP3[PII Scrubber]
        DP4[Vector Embeddings]
    end
    
    subgraph "Storage Layer"
        ST1[(PostgreSQL)]
        ST2[(Redis Cache)]
    end
    
    subgraph "External Services Layer"
        EX1[Google Gemini<br/>Embeddings]
        EX2[IBM WatsonX<br/>Granite LLM]
    end
    
    UI --> BL1
    UI --> BL2
    UI --> BL3
    UI --> BL4
    UI --> BL5
    UI --> BL6
    
    BL1 --> DP4
    BL2 --> DP4
    BL3 --> DP4
    BL6 --> DP1
    BL6 --> DP2
    BL6 --> DP3
    BL6 --> DP4
    
    DP4 --> EX1
    BL1 --> EX2
    BL2 --> EX2
    BL3 --> EX2
    BL5 --> EX2
    
    BL1 --> ST1
    BL2 --> ST1
    BL3 --> ST1
    BL4 --> ST1
    BL5 --> ST1
    BL6 --> ST1
    
    BL1 -.-> ST2
    
    style UI fill:#e3f2fd
    style ST1 fill:#f3e5f5
    style ST2 fill:#ffebee
    style EX1 fill:#e8f5e9
    style EX2 fill:#e8f5e9
```

---

## How to View These Diagrams

### In GitHub/GitLab
These Mermaid diagrams will render automatically when viewing this file on GitHub or GitLab.

### In VS Code
Install the "Markdown Preview Mermaid Support" extension:
```bash
code --install-extension bierner.markdown-mermaid
```

### Online Viewer
Copy any diagram to: https://mermaid.live/

### Export as Images
Use the Mermaid CLI:
```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i ARCHITECTURE_DIAGRAMS.md -o diagrams/
```

---

## Diagram Legend

| Color | Meaning |
|-------|---------|
| 🔵 Blue | User-facing components |
| 🟢 Green | Processing/Logic components |
| 🟣 Purple | Data storage |
| 🟡 Yellow | Decision points |
| 🔴 Red | Error states |
| 🟠 Orange | External services |

---

## Additional Resources

- **System Architecture**: See `SYSTEM_ARCHITECTURE.md` for detailed explanations
- **Deployment Guide**: See `DEPLOYMENT_GUIDE.md` for setup instructions
- **Architecture Review**: See `ARCHITECTURE_REVIEW.md` for issues and fixes
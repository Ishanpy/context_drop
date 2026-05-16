from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import capsule, ticket, busfactor, departure_brief, pr_brief, ingest

app = FastAPI(title="ContextDrop", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(capsule.router, prefix="/api/capsule", tags=["capsule"])
app.include_router(ticket.router, prefix="/api/ticket", tags=["ticket"])
app.include_router(busfactor.router, prefix="/api/bus-factor", tags=["busfactor"])
app.include_router(departure_brief.router, prefix="/api/departure-brief", tags=["departure"])
app.include_router(pr_brief.router, prefix="/api/pr-brief", tags=["pr"])
app.include_router(ingest.router, prefix="/api/ingest", tags=["ingest"])

@app.get("/health")
async def health():
    return {"status": "ok", "service": "ContextDrop"}
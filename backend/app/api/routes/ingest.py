from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ingest import ingest_repo

router = APIRouter()


class IngestRequest(BaseModel):
    repo_path: str
    repo_id: str


@router.post("/")
async def ingest(req: IngestRequest):
    result = await ingest_repo(req.repo_path, req.repo_id)
    return result
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.retrieval import retrieve_for_pr
from app.services.bob import generate_pr_brief

router = APIRouter()


class PRBriefRequest(BaseModel):
    repo_id: str
    pr_title: str
    pr_description: str
    changed_files: list[str]


@router.post("/")
async def get_pr_brief(req: PRBriefRequest):
    code_context = await retrieve_for_pr(req.repo_id, req.changed_files)

    brief = await generate_pr_brief(
        pr_title=req.pr_title,
        pr_description=req.pr_description,
        changed_files=req.changed_files,
        code_context=code_context
    )

    return brief
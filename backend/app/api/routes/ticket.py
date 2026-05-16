from fastapi import APIRouter
from pydantic import BaseModel
from app.services.retrieval import retrieve_for_ticket
from app.services.bob import analyze_ticket

router = APIRouter()


class TicketRequest(BaseModel):
    repo_id: str
    ticket_text: str
    audience: str = "developer"


@router.post("/")
async def get_ticket_intelligence(req: TicketRequest):
    context = await retrieve_for_ticket(req.repo_id, req.ticket_text)
    result = await analyze_ticket(
        ticket_text=req.ticket_text,
        repo_context=context,
        audience=req.audience
    )
    return result
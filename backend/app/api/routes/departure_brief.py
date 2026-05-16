from fastapi import APIRouter
from pydantic import BaseModel
from app.ingestion.git_parser import (
    bus_factor,
    format_departure_context_for_bob
)
from app.services.bob import generate_departure_brief

router = APIRouter()


class DepartureRequest(BaseModel):
    repo_path: str
    repo_id: str
    engineer_name: str


@router.post("/")
async def get_departure_brief(req: DepartureRequest):
    # Get bus factor scores
    scores = bus_factor(req.repo_path)

    # Find modules this engineer solely owns
    sole_modules = [
        f for f, count in scores.items()
        if count == 1
    ]

    if not sole_modules:
        return {
            "engineer": req.engineer_name,
            "message": "No sole-ownership modules found for this engineer.",
            "brief": None
        }

    # Build structured context for Bob
    git_context = format_departure_context_for_bob(
        req.repo_path,
        req.engineer_name,
        scores
    )

    # Call Bob
    brief = await generate_departure_brief(
        engineer_name=req.engineer_name,
        modules=sole_modules[:15],
        git_context=git_context
    )

    return {
        "engineer": req.engineer_name,
        "sole_ownership_count": len(sole_modules),
        "brief": brief
    }
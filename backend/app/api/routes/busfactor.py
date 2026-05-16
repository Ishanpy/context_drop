from fastapi import APIRouter
from app.ingestion.git_parser import bus_factor, get_risk_level

router = APIRouter()


@router.get("/")
async def get_bus_factor(repo_path: str, repo_id: str):
    scores = bus_factor(repo_path)

    result = []
    for path, n_authors in list(scores.items())[:50]:
        result.append({
            "file": path,
            "authors": n_authors,
            "risk": get_risk_level(n_authors)
        })

    high_risk = [f for f in result if f["risk"] == "high"]
    medium_risk = [f for f in result if f["risk"] == "medium"]

    return {
        "repo_id": repo_id,
        "files": result,
        "summary": {
            "total_files": len(result),
            "high_risk": len(high_risk),
            "medium_risk": len(medium_risk),
            "low_risk": len(result) - len(high_risk) - len(medium_risk)
        }
    }
import voyageai
from app.config import get_settings

settings = get_settings()
_client = voyageai.Client(api_key=settings.voyage_api_key)


async def embed_code(texts: list[str]) -> list[list[float]]:
    """Embed code chunks using voyage-code-2 (1536 dimensions)."""
    if not texts:
        return []
    result = _client.embed(
        texts,
        model="voyage-code-2",
        input_type="document"
    )
    return result.embeddings


async def embed_text(texts: list[str]) -> list[list[float]]:
    """Embed natural language (commits, tickets, docs) using voyage-3."""
    if not texts:
        return []
    result = _client.embed(
        texts,
        model="voyage-3",
        input_type="document"
    )
    return result.embeddings


async def embed_query(text: str, kind: str = "code") -> list[float]:
    """
    Embed a search query for retrieval.
    kind: code — uses voyage-code-2
    kind: text — uses voyage-3
    """
    model = "voyage-code-2" if kind == "code" else "voyage-3"
    result = _client.embed(
        [text],
        model=model,
        input_type="query"
    )
    return result.embeddings[0]
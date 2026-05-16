from google import genai
from google.genai import types
from app.config import get_settings

settings = get_settings()
_client = genai.Client(api_key=settings.gemini_api_key)


async def embed_code(texts: list[str]) -> list[list[float]]:
    if not texts:
        return []
    response = _client.models.embed_content(
        model="gemini-embedding-001",
        contents=texts[0],
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_DOCUMENT",
            output_dimensionality=768
        )
    )
    return [response.embeddings[0].values]


async def embed_text(texts: list[str]) -> list[list[float]]:
    if not texts:
        return []
    response = _client.models.embed_content(
        model="gemini-embedding-001",
        contents=texts[0],
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_DOCUMENT",
            output_dimensionality=768
        )
    )
    return [response.embeddings[0].values]


async def embed_query(text: str, kind: str = "code") -> list[float]:
    response = _client.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_QUERY",
            output_dimensionality=768
        )
    )
    return response.embeddings[0].values
import re

_PATTERNS = [
    (r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', '<EMAIL>'),
    (r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', '<PHONE>'),
    (r'\b(?:sk-|pk-|rk-)[a-zA-Z0-9]{20,}\b', '<API_KEY>'),
    (r'\bghp_[a-zA-Z0-9]{36}\b', '<GITHUB_TOKEN>'),
    (r'\b[A-Z0-9]{20}\b', '<ACCESS_KEY>'),
    (r'password\s*=\s*["\']?.+?["\']?[\s,;]', '<PASSWORD>'),
    (r'secret\s*=\s*["\']?.+?["\']?[\s,;]', '<SECRET>'),
]


def scrub(text: str) -> str:
    """Remove PII and secrets from text before storing."""
    if not text:
        return text
    for pattern, replacement in _PATTERNS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    return text
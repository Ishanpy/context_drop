import re
from pathlib import Path


def chunk_file(file_path: str, content: str, max_lines: int = 50) -> list[dict]:
    """
    Split a source file into logical chunks.
    Tries to split on function/class boundaries.
    Falls back to fixed line windows if no boundaries found.
    """
    lines = content.splitlines()
    chunks = []
    language = _detect_language(file_path)

    # Find function/class boundary lines
    boundaries = _find_boundaries(lines, language)

    if boundaries:
        for i, start in enumerate(boundaries):
            end = boundaries[i + 1] if i + 1 < len(boundaries) else len(lines)
            chunk_lines = lines[start:end]
            chunk_content = "\n".join(chunk_lines).strip()
            if chunk_content:
                chunks.append({
                    "file_path": file_path,
                    "language": language,
                    "start_line": start + 1,
                    "end_line": end,
                    "content": chunk_content
                })
    else:
        # Fall back to fixed windows
        for start in range(0, len(lines), max_lines):
            end = min(start + max_lines, len(lines))
            chunk_content = "\n".join(lines[start:end]).strip()
            if chunk_content:
                chunks.append({
                    "file_path": file_path,
                    "language": language,
                    "start_line": start + 1,
                    "end_line": end,
                    "content": chunk_content
                })

    return chunks


def _detect_language(file_path: str) -> str:
    ext = Path(file_path).suffix.lower()
    return {
        ".py": "python",
        ".js": "javascript",
        ".ts": "typescript",
        ".jsx": "javascript",
        ".tsx": "typescript",
        ".java": "java",
        ".go": "go",
        ".rs": "rust",
        ".rb": "ruby",
        ".cpp": "cpp",
        ".c": "c",
        ".cs": "csharp",
    }.get(ext, "unknown")


def _find_boundaries(lines: list[str], language: str) -> list[int]:
    """Find line indices where functions or classes start."""
    patterns = {
        "python": r"^(def |class |\s{0,4}def |\s{0,4}class )",
        "javascript": r"^(function |const \w+ = |class |  \w+\()",
        "typescript": r"^(function |const \w+ = |class |  \w+\(|export )",
        "java": r"^\s*(public|private|protected|static).*(void|int|String|boolean)",
        "go": r"^func ",
    }
    pattern = patterns.get(language)
    if not pattern:
        return []

    boundaries = []
    for i, line in enumerate(lines):
        if re.match(pattern, line):
            boundaries.append(i)

    return boundaries
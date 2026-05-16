import git
from collections import defaultdict
from datetime import datetime


def parse_file_history(repo_path: str, file_path: str) -> list[dict]:
    """Get commit history for a specific file."""
    try:
        repo = git.Repo(repo_path)
        commits = []
        for commit in repo.iter_commits(paths=file_path, max_count=30):
            commits.append({
                "hash": commit.hexsha[:8],
                "author": commit.author.name,
                "date": datetime.fromtimestamp(commit.committed_date).isoformat(),
                "message": commit.message.strip()
            })
        return commits
    except Exception:
        return []


def get_file_authors(repo_path: str, file_path: str) -> list[str]:
    """Get unique authors who have committed to a file."""
    history = parse_file_history(repo_path, file_path)
    seen = []
    for commit in history:
        if commit["author"] not in seen:
            seen.append(commit["author"])
    return seen


def bus_factor(repo_path: str) -> dict[str, int]:
    """
    Calculate bus factor per file.
    Returns: {file_path: number_of_unique_authors}
    """
    try:
        repo = git.Repo(repo_path)
        file_authors = defaultdict(set)

        for commit in repo.iter_commits(max_count=500):
            for file in commit.stats.files:
                file_authors[file].add(commit.author.name)

        return {f: len(authors) for f, authors in file_authors.items()}
    except Exception:
        return {}


def format_history_for_bob(commits: list[dict]) -> str:
    """Format commit history into a string Bob can reason over."""
    if not commits:
        return "No commit history available."
    lines = []
    for c in commits:
        lines.append(f"[{c['hash']}] {c['date']} — {c['author']}: {c['message']}")
    return "\n".join(lines)
import git
from collections import defaultdict
from datetime import datetime
import re


# ─────────────────────────────────────────────
# FILE-LEVEL HISTORY
# ─────────────────────────────────────────────
def parse_file_history(repo_path: str, file_path: str, max_commits: int = 30) -> list[dict]:
    try:
        repo = git.Repo(repo_path)
        commits = []
        for commit in repo.iter_commits(paths=file_path, max_count=max_commits):
            stats = commit.stats.files.get(file_path, {})
            commits.append({
                "hash": commit.hexsha[:8],
                "full_hash": commit.hexsha,
                "author": commit.author.name,
                "email": commit.author.email,
                "date": datetime.fromtimestamp(commit.committed_date).isoformat(),
                "message": commit.message.strip(),
                "lines_added": stats.get("insertions", 0),
                "lines_removed": stats.get("deletions", 0),
                "ticket_refs": _extract_ticket_refs(commit.message),
                "is_fix": _is_fix_commit(commit.message),
                "is_revert": _is_revert_commit(commit.message),
            })
        return commits
    except Exception:
        return []


# ─────────────────────────────────────────────
# AUTHOR ANALYSIS
# ─────────────────────────────────────────────
def get_file_authors(repo_path: str, file_path: str) -> list[str]:
    history = parse_file_history(repo_path, file_path)
    author_counts = defaultdict(int)
    for commit in history:
        author_counts[commit["author"]] += 1
    return sorted(author_counts, key=lambda a: author_counts[a], reverse=True)


def get_author_commit_counts(repo_path: str, file_path: str) -> dict[str, int]:
    history = parse_file_history(repo_path, file_path)
    counts = defaultdict(int)
    for commit in history:
        counts[commit["author"]] += 1
    return dict(counts)


# ─────────────────────────────────────────────
# BUS FACTOR
# ─────────────────────────────────────────────
def bus_factor(repo_path: str, max_commits: int = 500) -> dict[str, int]:
    try:
        repo = git.Repo(repo_path)
        file_authors = defaultdict(set)
        for commit in repo.iter_commits(max_count=max_commits):
            for file in commit.stats.files:
                file_authors[file].add(commit.author.name)
        scores = {f: len(authors) for f, authors in file_authors.items()}
        return dict(sorted(scores.items(), key=lambda x: x[1]))
    except Exception:
        return {}


def get_risk_level(author_count: int) -> str:
    if author_count == 1:
        return "high"
    elif author_count == 2:
        return "medium"
    return "low"


# ─────────────────────────────────────────────
# FORMAT FOR BOB
# ─────────────────────────────────────────────
def format_history_for_bob(commits: list[dict]) -> str:
    if not commits:
        return "No commit history available for this file."

    fixes = [c for c in commits if c.get("is_fix")]
    reverts = [c for c in commits if c.get("is_revert")]
    ticket_commits = [c for c in commits if c.get("ticket_refs")]
    regular = [c for c in commits if not c.get("is_fix") and not c.get("is_revert")]

    sections = []

    if reverts:
        sections.append("=== REVERTED CHANGES (something was tried and undone) ===")
        for c in reverts:
            sections.append(_format_commit_line(c))

    if fixes:
        sections.append("\n=== BUG FIXES (these reveal past failures) ===")
        for c in fixes:
            sections.append(_format_commit_line(c))

    if ticket_commits:
        sections.append("\n=== TICKET-LINKED COMMITS (business context) ===")
        for c in ticket_commits:
            refs = ", ".join(c["ticket_refs"])
            sections.append(f"  [{refs}] {_format_commit_line(c)}")

    if regular:
        sections.append("\n=== FEATURE COMMITS ===")
        for c in regular[:10]:
            sections.append(_format_commit_line(c))

    sections.append(f"\n=== SUMMARY ===")
    sections.append(f"Total commits analyzed: {len(commits)}")
    sections.append(f"Bug fixes: {len(fixes)}")
    sections.append(f"Reverts: {len(reverts)}")
    sections.append(f"Ticket-linked: {len(ticket_commits)}")
    authors = list({c["author"] for c in commits})
    sections.append(f"Authors involved: {', '.join(authors)}")

    return "\n".join(sections)


def format_departure_context_for_bob(
    repo_path: str,
    engineer_name: str,
    bus_factor_scores: dict[str, int]
) -> str:
    sole_ownership = []
    for file_path, author_count in bus_factor_scores.items():
        if author_count == 1:
            authors = get_file_authors(repo_path, file_path)
            if authors and authors[0].lower() == engineer_name.lower():
                history = parse_file_history(repo_path, file_path, max_commits=10)
                sole_ownership.append({
                    "file": file_path,
                    "commits": history
                })

    if not sole_ownership:
        return f"No files found where {engineer_name} is the sole author."

    lines = [f"=== DEPARTURE BRIEF CONTEXT FOR: {engineer_name} ===\n"]
    lines.append(f"Files with sole ownership ({len(sole_ownership)} total):\n")

    for item in sole_ownership[:15]:
        lines.append(f"FILE: {item['file']}")
        for c in item["commits"][:5]:
            lines.append(f"  [{c['hash']}] {c['date']} — {c['message']}")
        lines.append("")

    return "\n".join(lines)


# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────
def _format_commit_line(commit: dict) -> str:
    added = commit.get("lines_added", 0)
    removed = commit.get("lines_removed", 0)
    return (
        f"  [{commit['hash']}] {commit['date']} — {commit['author']}: "
        f"{commit['message']} (+{added}/-{removed})"
    )


def _extract_ticket_refs(message: str) -> list[str]:
    return re.findall(r'\b[A-Z]{2,10}-\d+\b', message)


def _is_fix_commit(message: str) -> bool:
    keywords = ["fix", "bug", "patch", "hotfix", "repair", "resolve", "revert"]
    return any(k in message.lower() for k in keywords)


def _is_revert_commit(message: str) -> bool:
    return message.lower().strip().startswith("revert")
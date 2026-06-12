#!/usr/bin/env python3
"""
Stop hook: propose_claude_md.py
Runs at the end of every Claude Code session.
Reads the session transcript, reflects on what changed,
and proposes additions/edits to CLAUDE.md.

Usage: called automatically by .claude/settings.json Stop hook.
"""

import json
import sys
import os

def main():
    # Read hook input from stdin (Claude Code passes session data as JSON)
    try:
        hook_input = json.load(sys.stdin)
    except Exception:
        hook_input = {}

    session_id = hook_input.get("session_id", "unknown")
    transcript = hook_input.get("transcript", [])

    if not transcript:
        print("[propose_claude_md] No transcript found — skipping.")
        return

    # Collect assistant messages to find what was changed
    changes = []
    for msg in transcript:
        if msg.get("role") == "assistant":
            content = msg.get("content", "")
            if isinstance(content, list):
                for block in content:
                    if isinstance(block, dict) and block.get("type") == "text":
                        text = block.get("text", "")
                        # Flag messages that describe file changes
                        if any(kw in text.lower() for kw in ["created", "added", "updated", "modified", "new project", "new track"]):
                            changes.append(text[:200])

    if not changes:
        print("[propose_claude_md] No significant changes detected — CLAUDE.md likely up to date.")
        return

    # Write a proposal file for human review
    proposal_path = ".claude/proposed_claude_md_updates.md"
    with open(proposal_path, "w") as f:
        f.write(f"# Proposed CLAUDE.md Updates\n")
        f.write(f"_Session: {session_id}_\n\n")
        f.write("Review these suggested additions and manually apply them to CLAUDE.md:\n\n")
        for i, change in enumerate(changes, 1):
            f.write(f"## Detected Change {i}\n")
            f.write(f"```\n{change}\n```\n\n")
        f.write("---\n_Delete this file after reviewing._\n")

    print(f"[propose_claude_md] Wrote {len(changes)} proposed update(s) to {proposal_path}")
    print("[propose_claude_md] Review and apply manually, then delete the file.")

if __name__ == "__main__":
    main()

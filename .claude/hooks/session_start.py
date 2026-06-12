#!/usr/bin/env python3
"""
PreToolUse hook: session_start.py
Runs before the first file write/edit in a session.
Prints a context summary so Claude Code always knows the project state.

Usage: called automatically by .claude/settings.json PreToolUse hook.
"""

import json
import sys
import os
from pathlib import Path

def count_projects():
    """Count project cards in projects.html."""
    try:
        html = Path("projects.html").read_text()
        return html.count('class="project-card')
    except Exception:
        return "?"

def count_music_files():
    """Count music files in assets/music/."""
    music_dir = Path("assets/music")
    if not music_dir.exists():
        return 0
    return len(list(music_dir.glob("*.mp3")) + list(music_dir.glob("*.mp4")))

def main():
    try:
        hook_input = json.load(sys.stdin)
    except Exception:
        hook_input = {}

    tool_name = hook_input.get("tool_name", "unknown")

    context = {
        "project": "Alan Wu Personal Portfolio",
        "stack": "Vanilla HTML/CSS/JS — GitHub Pages",
        "design": "Dark kinetic — cyan/violet waveform motif — Syne + Space Grotesk + Space Mono",
        "projects_in_html": count_projects(),
        "music_files": count_music_files(),
        "claude_md": "CLAUDE.md — read it before making any changes",
        "trigger_tool": tool_name,
    }

    print("[session_start] Portfolio context loaded:")
    for k, v in context.items():
        print(f"  {k}: {v}")
    print("[session_start] ✓ Always read CLAUDE.md for design tokens and content rules before editing.")

if __name__ == "__main__":
    main()

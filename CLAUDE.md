# CLAUDE.md — Alan Wu Personal Portfolio

> **This file is the source of truth for Claude Code.**  
> Read it fully before touching any file. It encodes every decision made during planning.

---

## Project Identity

**Owner:** Alan Wu  
**Site:** `alanwu.dev` (or `alanwu.github.io` until custom domain is set up)  
**Repo:** `alan-wu-portfolio` on GitHub  
**Hosting:** GitHub Pages (static, zero build step)  
**Stack:** Vanilla HTML · CSS · JavaScript — no framework, no bundler  

**Purpose:** Personal portfolio showcasing CS/engineering work, music production, and professional experience. Doubles as a learning ground for the Claude Code AI harness (CLAUDE.md, Skills, Hooks, MCP).

---

## Design System (DO NOT DEVIATE)

### Color Tokens
```
--bg:       #080a0f   ← page background
--bg2:      #0d1017   ← alternate section background
--surface:  #131720   ← card/hover surfaces
--border:   rgba(255,255,255,0.07)
--cyan:     #00e5ff   ← primary accent (links, labels, hover)
--violet:   #9b5cf6   ← secondary accent (role labels, decorative)
--mid:      #5b8cff   ← tertiary (waveform layer)
--text:     #e8ecf4   ← primary text
--muted:    #6b7280   ← secondary text, descriptions
```

### Typography
```
--font-display: 'Syne' (800 weight) — headings only
--font-body:    'Space Grotesk'     — body text, paragraphs
--font-mono:    'Space Mono'        — labels, tags, nav, metadata
```

### Signature Element
**Animated three-layer waveform** at hero bottom — cyan, violet, blue sinusoidal waves running on `<canvas>`. This is the visual identity. Do not remove or replace it.

### Layout Rules
- Sections: `padding: 7rem 3rem` desktop, `5rem 1.25rem` mobile
- Grid gaps: 1px with `background: var(--border)` (creates hairline grid lines)
- Dividers: `<div class="divider">` — `1px` lines using `var(--border)`
- No rounded corners anywhere except `.btn-primary` (none)
- Cards use `::before` pseudo gradient top-border on hover (cyan → violet)

---

## File Structure

```
alan-wu-portfolio/
├── index.html              ← Pure landing page: full-viewport hero + 4-card teaser strip
├── about.html              ← About section: bio, stats grid, skills grid
├── experience.html         ← Experience section (full page)
├── projects.html           ← Projects section with CS/Music Tech tabs (full page)
├── music.html              ← Music section (full page)
├── contact.html            ← Contact section (full page, vertically centered)
├── CLAUDE.md               ← you are here
├── README.md               ← GitHub Pages deployment guide
├── assets/
│   ├── js/                 ← extracted scripts
│   │   ├── main.js         ← scroll reveal + active nav highlight (shared)
│   │   ├── index.js        ← waveform canvas animation
│   │   ├── projects.js     ← tab switcher
│   │   └── music.js        ← decorative waveform bar generator
│   ├── css/                ← extracted stylesheets
│   │   ├── main.css        ← tokens, reset, nav, footer, animations, .page-hero base (shared)
│   │   ├── index.css       ← hero, waveform, glow orbs, buttons, teaser strip
│   │   ├── about.css       ← about grid, stats, skills
│   │   ├── experience.css  ← experience list + page-hero bg override
│   │   ├── projects.css    ← tabs, project cards, tab panels
│   │   ├── music.css       ← music grid, cards, page-hero override (spacious)
│   │   └── contact.css     ← contact section (centered layout, watermark)
│   ├── music/              ← .mp3 / .mp4 files go here
│   │   └── README.md       ← format: slug.mp3, metadata in music-data.js
│   ├── images/             ← project screenshots, profile photo
│   │   └── README.md
│   └── projects/           ← any downloadable project files
├── .claude/
│   ├── settings.json       ← hook configuration
│   ├── skills/
│   │   ├── add-cs-project.md
│   │   ├── add-music-track.md
│   │   └── add-experience.md
│   └── hooks/
│       ├── propose_claude_md.py    ← stop hook: reflects + proposes updates
│       └── session_start.py        ← start hook: loads context summary
└── .github/
    └── workflows/
        └── deploy.yml      ← GitHub Pages auto-deploy on push to main
```

**Multi-page notes:**
- Each HTML file is fully self-contained (full `<style>` block in every page — no shared CSS file yet).
- Nav logo (`AW.DEV`) links to `index.html` on all pages.
- Active nav link is highlighted in `var(--cyan)` via inline `<script>` checking `window.location.pathname` on each page.
- `index.html` is a pure landing page: full-viewport hero + a single teaser strip (4 `.teaser-card` elements linking to each inner page). No full content sections.
- Inner pages (`about.html`, `experience.html`, `projects.html`, `music.html`, `contact.html`) each have a `.page-hero` div at top (section label + heading).
- `music.html` uses extra padding on `.page-hero` for breathing room while tracks are placeholders.
- **Sticky footer:** all pages use `body { display: flex; flex-direction: column; min-height: 100vh; }` and `<main>` with `flex: 1` to push the footer to the bottom of the viewport.

---

## Content: Alan Wu

**Full name:** Alan Wu  
**Email:** alanwu.coop@gmail.com  
**University:** University of British Columbia, BSc Computer Science  
**Year:** 4th year, graduating May 2028  
**GPA:** 4.30/4.33 (Major GPA: 89%)  
**Location:** Vancouver, BC  

### Experience (newest first)
1. **Surrey Food Bank** — Full Stack Developer, Jan–Apr 2026
   - React.js, Django, PostgreSQL, Tailwind CSS
   - Built appointment booking system + Tiny Bundles feature end-to-end

2. **ZenNyxAI Inc.** — Web Feature Engineer, May–Sep 2025
   - React.js, React-Konva, Marked.js, jsPDF, KaTeX, OpenAI
   - Core MindMap feature for EasyNoteAI (Markdown → interactive node graphs)

### Projects
| Name | Type | Year | Stack | GitHub |
|------|------|------|-------|--------|
| 39WithYou | Personal | 2025 | TS, React, Three.js, Claude API, TTS | TBD |
| VoiceBase | Hackathon 🏆2nd | 2024 | React, Spring Boot, Node | TBD |
| FiscordProject | Personal | 2024 | TS, Next.js, Firebase | TBD |
| WhereToEat? | Academic | 2024 | Java, Swing, JUnit | TBD |
| Tennis Rank Predictor | Academic | 2024 | R, tidyverse | TBD |

### Music
Genres: Cinematic · EDM · Pop · Rock  
Instruments: Piano · Saxophone  
Files: MP3 / MP4 in `/assets/music/`  
> **To add a track:** follow `.claude/skills/add-music-track.md`

### Achievements
- UBC Biztech Hellohacks Hackathon — 2nd Place (Oct 2024)
- UBC Dean's List — Faculty of Science (Sep 2023–May 2026)

---

## Critical Rules for Claude Code

1. **Never change design tokens.** Colors, fonts, and spacing are locked.
2. **Multi-page with shared CSS** — the site is split across 6 HTML files. Styles live in `assets/css/`: `main.css` is shared by all pages; each page also links its own `[pagename].css` for unique styles. When adding a new component, decide if it's shared (→ `main.css`) or page-specific (→ the relevant `[pagename].css`). Do not add inline `<style>` blocks.
3. **No frameworks.** Do not introduce React, Vite, or any bundler without an explicit instruction to do so.
4. **GitHub Pages compatibility.** Everything must work as static files — no server-side code, no Node process.
5. **Music files are local assets.** Reference them as `./assets/music/filename.mp3` — never embed external streaming URLs without asking.
6. **Reveal animation class is `.reveal`.** Add it to any new section heading or card. The IntersectionObserver handles the rest.
7. **Waveform canvas (`#waveCanvas`) lives in `#hero` only.** Do not duplicate it.
8. **Project cards** follow the `.project-card` structure exactly — type, name, desc, stack tags, links.
9. **Music cards** follow the `.music-card` structure — genre, waveform div `#wfN`, title, meta.
10. **Tab system:** CS projects are in `#tab-cs`, music tech in `#tab-music-tech`. Adding a new tab requires updating both the `.projects-tabs` nav and adding a new `#tab-X` panel.

---

## How to Add Things (quick reference)

### Add a CS project
→ See `.claude/skills/add-cs-project.md`

### Add a music track
→ See `.claude/skills/add-music-track.md`

### Add a work experience entry
→ See `.claude/skills/add-experience.md`

### Update GitHub links on projects
Find the project card by name, update `href="#"` on `.project-link` to the real GitHub URL.

---

## GitHub Pages Deployment

Push to `main` branch → GitHub Pages auto-deploys via `.github/workflows/deploy.yml`.  
Live at: `https://[your-github-username].github.io/alan-wu-portfolio/`

> First deploy: Go to repo Settings → Pages → Source: GitHub Actions

---

## AI Harness Notes

This project is intentionally structured to practice the full Claude Code harness:

- **CLAUDE.md** (this file): global rules, design tokens, content inventory
- **Skills** (`.claude/skills/`): repeatable workflows for adding content
- **Hooks** (`.claude/hooks/`): self-improving automation
  - `session_start.py` runs at session start to load context
  - `propose_claude_md.py` runs as stop hook to suggest CLAUDE.md updates
- **Subagents**: use for scoped tasks like "scan all project cards and check GitHub links"
- **MCP (GitHub)**: can be wired up to auto-create issues for TODO items in code

**Context from planning session:** This project was planned in claude.ai chat (Jun 2026). That session established the stack, design direction (waveform motif, F1-inspired kinetic dark aesthetic), and the full AI harness architecture. This CLAUDE.md is the bridge — it captures everything so Claude Code has full context without needing the chat history.

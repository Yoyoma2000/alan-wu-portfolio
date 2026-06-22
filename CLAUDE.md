# CLAUDE.md — Alan Wu Personal Portfolio

> **This file is the source of truth for Claude Code.**  
> Read it fully before touching any file. It encodes every decision made during planning and all sessions since.

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

Current tuned values (Jun 2026) — do not arbitrarily change these:
- Layer speeds: cyan `0.009`, violet `0.0132`, blue `0.0054` (intentionally slow; were reduced 40% from original)
- Canvas element opacity: `0.55` (in `index.css` `#waveCanvas`)
- Stroke `globalAlpha` inside draw loop: `0.85` (in `index.js`)

### Layout Rules
- Sections: `padding: 7rem 3rem` desktop, `5rem 1.25rem` mobile (from `main.css`; override per-page with ID selectors)
- Grid gaps: 1px with `background: var(--border)` (creates hairline grid lines)
- Dividers: `<div class="divider">` — `1px` lines using `var(--border)`
- No rounded corners anywhere except `.btn-primary` (none)
- Cards use `::before` pseudo gradient top-border on hover (cyan → violet)

---

## File Structure

```
alan-wu-portfolio/
├── index.html              ← Pure landing page: full-viewport hero + 4-card teaser strip
├── about.html              ← About: two-column viewport layout (bio + photo/skills), NO .page-hero
├── experience.html         ← Experience: vertical timeline with 3 entries
├── projects.html           ← Projects: CS & Engineering + Music Tech tabs
├── music.html              ← Music: horizontal U-arc carousel (no .page-hero)
├── contact.html            ← Contact: vertically centered, email/GitHub/LinkedIn/Resume links
├── CLAUDE.md               ← you are here
├── README.md               ← GitHub Pages deployment guide
├── assets/
│   ├── js/
│   │   ├── main.js         ← scroll reveal + active nav highlight + nav indicator + hamburger (shared)
│   │   ├── index.js        ← waveform canvas animation + hero staggered reveal
│   │   ├── projects.js     ← tab switcher (CS ↔ Music Tech)
│   │   ├── music.js        ← U-arc carousel, SoundCloud embeds, visualizer, drag scrub
│   │   ├── experience.js   ← any experience-page-specific JS
│   │   └── contact.js      ← email copy-to-clipboard button logic
│   ├── css/
│   │   ├── main.css        ← tokens, reset, nav, footer, animations, .page-hero, .reveal (shared)
│   │   ├── index.css       ← hero, waveform canvas, glow orbs, buttons, teaser strip
│   │   ├── about.css       ← two-column about layout, photo, skills grid
│   │   ├── experience.css  ← timeline layout, tl-entry, tl-card, tl-node
│   │   ├── projects.css    ← tabs, .project-card, .project-note, tab panels, screenshot lightbox
│   │   ├── music.css       ← U-arc carousel, mc-* components, visualizer bars
│   │   └── contact.css     ← contact section centered layout
│   ├── images/
│   │   ├── profile.jpg     ← profile photo (aspect-ratio 3/4, referenced in about.html)
│   │   └── projects/       ← screenshot lightbox images, one SLUG.png per project card (19 as of Jun 2026)
│   ├── documents/
│   │   └── resume.pdf      ← resume download (linked from contact.html)
│   └── music/              ← (empty — all music served via SoundCloud embeds, not local files)
├── .claude/
│   ├── settings.json       ← hook configuration
│   ├── skills/
│   │   ├── add-cs-project.md
│   │   ├── add-music-track.md
│   │   └── add-experience.md
│   └── hooks/
│       ├── propose_claude_md.py    ← Stop hook: reflects + proposes updates (only active hook)
│       └── session_start.py        ← present but inactive — not wired up in settings.json
└── .github/
    └── workflows/
        └── deploy.yml      ← GitHub Pages auto-deploy on push to main
```

**Multi-page notes:**
- Styles live in `assets/css/` — `main.css` is shared by all pages; each page links its own `[pagename].css`. No inline `<style>` blocks.
- Nav logo (`AW.DEV`) links to `index.html` on all pages.
- **Active nav link** is highlighted in `var(--text)` (bright white) via JS in `main.js`. On `index.html` the logo itself is treated as the active element. Non-active links stay `var(--muted)`.
- **Nav sliding indicator:** all 6 pages have `<div class="nav-indicator"></div>` as the first child of `.nav-links`. On page load, `main.js` positions it over the active link using `getBoundingClientRect()`. Cross-page slide animation: before navigating, the current indicator position is saved to `sessionStorage`; on the new page it snaps to the saved position then slides to the current link via a double-`requestAnimationFrame` + CSS `transition`. **Positioning is split into two cases:** (1) Fresh page load (no `navPrevLeft` in sessionStorage) — uses `document.fonts.ready.then(positionIndicator)` so font metrics are stable before measuring; safe here because no animation is in flight. (2) Cross-page navigation (`navPrevLeft` present) — uses double-rAF; fonts are already cached so measurement is correct, and `fonts.ready` would race with the snap-then-slide animation. Do NOT collapse these into a single path. A `resize` listener also calls `positionIndicator()` (after clearing `transition`) to correct the pill when the window moves between monitors with different DPI scaling.
- **Mobile nav:** all 6 pages have a `.nav-hamburger` button inside `<nav>`. `main.js` builds a `.nav-mobile-overlay` div appended to `<body>` (not inside `<nav>`) to avoid the `backdrop-filter` containing-block issue, clones the nav links into it, and toggles it on hamburger click. Overlay is `position: fixed; inset: 0; z-index: 99` with `background: var(--bg)`.
- `index.html` is a pure landing page: full-viewport hero + a single teaser strip (4 `.teaser-card` elements linking to each inner page). No full content sections.
- **Pages with `.page-hero`:** `experience.html`, `projects.html`, `contact.html`. Each has a `.page-hero` div at the top (section label + `.section-title` heading). `about.html` and `music.html` do NOT use `.page-hero` — they have their own custom header layouts.
- **Sticky footer:** all pages use `body { display: flex; flex-direction: column; min-height: 100vh; }` and `<main>` with `flex: 1` to push the footer to the bottom of the viewport.
- **Flex-fill pattern for single-section pages:** when a page has one section that should fill the full viewport height (no scrollbar), use `body:has(#sectionId) main { display: flex; flex-direction: column; }` + `#sectionId { flex: 1; align-content: center; }` in the page-specific CSS. Do NOT use `min-height: calc(100vh - Xpx)` — it cannot account for footer height and always causes a scrollbar. Currently used by `about.html` and `music.html`.
- **Hero animation:** `.hero-eyebrow`, `.hero-name`, `.hero-tagline`, `.hero-cta`, `.scroll-hint` start at `opacity: 0; transform: translateY(20px)` via CSS. `index.js` triggers each via `setTimeout` + **direct style assignment** (`el.style.opacity = '1'; el.style.transform = 'translateY(0)'`) at staggered delays (300–1400 ms). Do NOT use CSS `@keyframes animation:` — fill-mode is unreliable on GitHub Pages / Windows with reduce-motion OS settings.
- **prefers-reduced-motion:** `main.css` has a `@media (prefers-reduced-motion: reduce)` block that sets `transition: none !important` globally and forces `opacity: 1` on both `.reveal` and all hero elements. `index.js` also checks `window.matchMedia` and skips timeouts to reveal hero elements immediately.

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
   - React.js, Django, PostgreSQL, Tailwind CSS, JIRA
   - Appointment booking system with automated timeslot generation; Tiny Bundles feature end-to-end

2. **ZenNyxAI Inc.** — Web Feature Engineer, May–Sep 2025
   - React.js, React-Konva, Marked.js, jsPDF, KaTeX, OpenAI
   - Core MindMap feature for EasyNoteAI (Markdown → interactive node graphs, multi-format export)

3. **University of British Columbia** — BSc Computer Science, Sep 2023–Present
   - GPA 4.30/4.33, Dean's List (2023–2026), graduating May 2028

### Projects — CS & Engineering Tab (`#tab-cs`)

| Name | Type | Year | Stack | GitHub |
|------|------|------|-------|--------|
| EasyCheck | Personal | 2026 | TypeScript, Next.js, GitHub App SDK, DeepSeek V3, Octokit, Webhooks | github.com/Yoyoma2000/EasyCheck |
| Surrey Food Bank | Co-op | Jan–Apr 2026 | React.js, Django, PostgreSQL, Tailwind, JIRA | Proprietary |
| SwipeToBuy | Personal | 2026 | React.js, Node.js, Tailwind CSS | github.com/Yoyoma2000/SwipeToBuy |
| Workday UBC Chrome Extension | Personal | 2026 | JavaScript, Chrome Extensions API | github.com/Yoyoma2000/WorkdayUBC-Extension-RemoveLocationCode |
| ZenNyxAI | Co-op | May–Sep 2025 | React.js, React-Konva, Marked.js, jsPDF, KaTeX, OpenAI | Proprietary |
| 39WithYou | Personal | 2025 | TS, React, Three.js, Claude API, TTS Models | github.com/Yoyoma2000/39WithYou |
| VoiceBase | Hackathon 🏆2nd | Oct 2024 | React.js, Spring Boot, Node.js, jszip | github.com/Yoyoma2000/Voicebank-Maker |
| FiscordProject | Personal | 2024 | TS, Next.js, Firebase, Tailwind | github.com/Yoyoma2000/fiscordprojectalan |
| WhereToEat? | Academic | 2024 | Java, Swing, JUnit, JSON | github.com/Yoyoma2000/WhereToEat |
| Tennis Rank Predictor | Academic | 2024 | R, tidyverse, tidyModels, GGAlly | github.com/Yoyoma2000/DSCI100-Group10-Project |
| CharityDatabase | Academic | 2024 | SQL, database schema design | github.com/Yoyoma2000/CharityDatabase |
| Made-In-Abyss: Journey Into the Unknown | Personal | 2023 | GML, GameMaker Studio | github.com/Yoyoma2000/Made-In-Abyss---Journey-Into-the-Unknown |
| Gun Game Simulator | Personal | 2022 | Java, JSON | github.com/Yoyoma2000/Gun-Game-Simulator |

**Proprietary co-op projects** (Surrey Food Bank, ZenNyxAI) use `<p class="project-note">Proprietary codebase — developed during co-op term</p>` instead of a `.project-links` div. `.project-note` is defined in `projects.css`.

### Projects — Music Tech Tab (`#tab-music-tech`)

All 6 cards link to `https://github.com/Yoyoma2000/MUSC320-projects` (same repo, different projects within it).

| Name | Type | Stack |
|------|------|-------|
| DJ Mixing Station | Personal · 2025 · Final Project | Max/MSP, Max 9, DSP, Audio Routing |
| FM Synthesizer | Academic · 2025 | Max/MSP, FM Synthesis, MIDI, DSP |
| Sampler | Academic · 2025 | Max/MSP, Audio Sampling, DSP |
| MIDI Keyboard + Sequencer | Academic · 2025 | Max/MSP, MIDI, Sequencing |
| Retro Game Music Generator | Academic · 2025 | Max/MSP, Procedural Generation, MIDI |
| Currency Converter | Academic · 2025 | Max/MSP |

### Music
Genres: Cinematic · EDM · Pop · Rock · Jazz · J-Pop · Phonk · Lofi · Ambient · Electronic  
Instruments: Piano · Saxophone  
All tracks (65 as of Jun 2026) served via **SoundCloud private embeds** — no local audio files. Track IDs and secret tokens stored in `TRACKS` array in `assets/js/music.js`.

### Achievements
- UBC Biztech Hellohacks Hackathon — 2nd Place (Oct 2024)
- UBC Dean's List — Faculty of Science (Sep 2023–May 2026)

---

## Critical Rules for Claude Code

1. **Never change design tokens.** Colors, fonts, and spacing are locked.
2. **Multi-page with shared CSS** — `main.css` is shared; each page has its own `[pagename].css`. When adding a component, decide if it's shared (→ `main.css`) or page-specific (→ relevant `[pagename].css`). No inline `<style>` blocks.
3. **No frameworks.** Do not introduce React, Vite, or any bundler without an explicit instruction.
4. **GitHub Pages compatibility.** Everything must work as static files — no server-side code, no Node process.
5. **Music files are SoundCloud embeds.** The `assets/music/` directory is empty. All tracks (count = `TRACKS.length` in `music.js`, currently 65) are served via SoundCloud private embed iframes. Track data (id + secret token) lives in `music.js`. Never reference local audio files for the music page.
6. **Reveal animation class is `.reveal`.** Add it to any new section heading or card. The IntersectionObserver in `main.js` toggles `.visible` when the element enters the viewport.
7. **Waveform canvas (`#waveCanvas`) lives in `#hero` only.** Do not duplicate it.
8. **Project cards** follow the `.project-card` structure exactly — `.project-card-header` (containing `.project-type` + the screenshot icon button), `.project-name`, `.project-desc`, `.project-stack` (with `<span>` tags), `.project-links`. For proprietary projects with no GitHub link, use `<p class="project-note">Proprietary codebase — developed during co-op term</p>` instead of `.project-links`. **`.project-link` text is always `↗ GitHub`** (arrow + space + label) — applies to both the CS & Engineering and Music Tech tabs.
9. **Screenshot lightbox:** every `.project-card` has a `.project-img-btn` icon (top-right, inside `.project-card-header` so it's vertically centered with `.project-type` — do not go back to absolute-positioning it against the card corner, that broke alignment). Hidden at `opacity: 0.4` by default, full opacity + cyan on `.project-card:hover`. Clicking it opens a shared fullscreen `#lightboxOverlay` (fade in/out via `.is-open` class, `0.35s` opacity transition) showing the image at `data-src="assets/images/projects/SLUG.png"`. Missing images fall back to a "Screenshot coming soon" message (`onerror` on the lightbox `<img>`, not per-card markup). Closes via the × button, clicking outside the image, or Escape. Logic lives in `projects.js`; markup for the single shared overlay is at the bottom of `projects.html` (`#lightboxOverlay`, `#lightboxImg`, `#lightboxSoon`, `#lightboxClose`). **To add a screenshot:** drop `SLUG.png` into `assets/images/projects/` — no code changes needed. Current slugs (CS & Engineering + Music Tech, in card order): `easycheck`, `surrey-food-bank`, `swipetobuy`, `workday-ubc-chrome-extension`, `zennyxai`, `39withyou`, `voicebase`, `fiscordproject`, `wheretoeat`, `tennis-rank-predictor`, `charitydatabase`, `made-in-abyss-journey-into-the-unknown`, `gun-game-simulator`, `dj-mixing-station`, `fm-synthesizer`, `sampler`, `midi-keyboard-sequencer`, `retro-game-music-generator`, `currency-converter`.
10. **Music page uses a horizontal U-arc carousel**, not a grid. Cards are `.mc-card` elements injected by `music.js` from the `TRACKS` array. The active card expands to show a lazy-loaded SoundCloud iframe. Do not add `.music-card` or `.page-hero` to `music.html`.
11. **Tab system:** CS projects are in `#tab-cs`, music tech in `#tab-music-tech`. Adding a new tab requires updating both the `.projects-tabs` nav and adding a new `#tab-X` panel.
12. **Nav indicator:** every `<nav>` has `<div class="nav-indicator"></div>` as the first child of `.nav-links`. Styles in `main.css`, logic in `main.js`. Do not remove it or inline-position it via CSS — JS sets `left`, `width`, and `opacity` at runtime.
13. **Hero text visibility:** `index.js` reveals hero elements via `setTimeout` + **direct style assignment** (`el.style.opacity = '1'; el.style.transform = 'translateY(0)'`). Never use CSS `@keyframes` with `animation-fill-mode: forwards` for hero elements — it is unreliable on GitHub Pages / Windows and leaves elements invisible after animation completes.
14. **Nav indicator positioning — two-path rule:** Fresh load → `document.fonts.ready.then(positionIndicator)`. Cross-page navigation (sessionStorage has `navPrevLeft`) → double-`requestAnimationFrame`. Do NOT collapse into one path — `fonts.ready` races with the snap-then-slide animation when fonts are already cached.
15. **Single-viewport pages — use flex fill, not min-height:** `body:has(#sectionId) main { display: flex; flex-direction: column; }` + `#sectionId { flex: 1; }`. `min-height: calc(100vh - Npx)` always causes a scrollbar because it cannot account for the footer height at compile time.
16. **GitHub Pages CDN caching:** always hard-refresh (`Ctrl+Shift+R`) before concluding a deployed fix didn't work. GitHub Pages CDN can serve stale assets for several minutes.
17. **Python hooks on Windows:** the hook runner uses `py` (not `python3`) on Windows. If hooks fail with "command not found", check that `py` is on PATH.
18. **about.html has no `.page-hero`.** The "About" section label and "Two worlds, one toolkit." heading live inside `.about-left` within `#about`, using `.about-heading` (not `.section-title`). Do not add a `.page-hero` div to about.html.
19. **experience.html loads `experience.js`** and **contact.html loads `contact.js`** — both files exist in `assets/js/`. Do not remove these script tags.
20. **Visually verify layout/sizing changes before committing.** For any change to spacing, width, layout, or visual sizing (e.g. the music visualizer width, card dimensions, grid layout), serve the site locally (`python -m http.server`) and open the affected page in a browser before committing. Show/describe the result and get confirmation rather than committing on the first guess — sizing changes are easy to get wrong on the first try (e.g. picking 2x when 1.5x was wanted).

---

## About Page Architecture

`about.html` was fully redesigned (Jun 2026) into a single-viewport two-column layout — no `.page-hero`, no stats grid, no Music skill group.

**HTML structure:**
```html
<section id="about">
  <div class="about-left">        <!-- col 1, spans both grid rows -->
    <p class="section-label reveal">About</p>
    <h1 class="about-heading reveal">Two worlds, one toolkit.</h1>
    <p class="about-text reveal">...</p>
    <p class="about-text reveal" style="margin-top:1rem;">...</p>
  </div>
  <div class="about-photo-wrap reveal">   <!-- col 2, row 1 -->
    <img src="assets/images/profile.jpg" alt="Alan Wu" class="about-photo">
  </div>
  <div class="about-skills-wrap">         <!-- col 2, row 2 -->
    <p class="section-label reveal">Skills</p>
    <div class="skills-grid reveal">...</div>
  </div>
</section>
```

**CSS (`about.css`) key facts:**
- `body:has(#about) main { display: flex; flex-direction: column; }` + `#about { flex: 1; }` fills the viewport without a scrollbar
- `grid-template-areas: "left photo" / "left skills"` — explicit named areas; do not revert to numeric `grid-column`/`grid-row` placement (it was unreliable)
- `.about-heading`: `clamp(2.5rem, 5vw, 4rem)`, matches `.section-title` size
- `.about-photo`: `max-width: 320px; aspect-ratio: 3/4; object-fit: cover; object-position: center top; margin: 1rem auto`
- `.about-skills-wrap`: `padding-left: calc((50% - 160px) * 0.6)` nudges the skills block rightward to roughly align with the photo center
- Skills: only **Languages**, **Frameworks**, **Tools & AI** — Music skill group was removed
- Mobile (`≤768px`): `grid-template-areas: "photo" / "left" / "skills"` — stacks photo → bio → skills

---

## Music Page Architecture

`music.html` was redesigned (Jun 2026) into a horizontal U-arc carousel — no grid, no `.page-hero`.

**HTML structure:**
```html
<section id="music">
  <div class="mc-header">          <!-- .section-label + .mc-heading, both have .reveal -->
  <div class="mc-clip">            <!-- overflow: hidden, fixed height 420px -->
    <div class="mc-stage" id="mcStage">   <!-- cards injected by JS -->
  <div class="mc-footer">
    <div class="mc-viz" id="mcViz">       <!-- TRACKS.length visualizer bars injected by JS (65 as of Jun 2026) -->
    <div class="mc-counter">             <!-- X / TRACKS.length -->
```

**JS (`music.js`) key facts:**
- `TRACKS` array: objects `{ title, genre, id, token }` — SoundCloud track IDs + secret tokens. 65 entries as of Jun 2026; count drives bar count, counter, etc. automatically
- All tracks are **private SoundCloud links** requiring the `secret_token` query param in the embed URL
- U-arc positions defined in `STEPS` array — 5 entries for offsets 0–4+, with `x/y/scale/opacity`
- Only the active card has a SoundCloud iframe in the DOM (lazy-injected on `goTo()`, removed on deactivate)
- Scroll capture: `mouseenter`/`mouseleave` on the active card adds/removes a `{ passive: false }` wheel listener — no overlay div on the iframe
- `isThrottled` flag (600 ms) prevents scroll accumulation
- Visualizer: bar count = `TRACKS.length`, bell-curve height falloff from active index, drag-to-scrub via `mousedown`/`mousemove` on `.mc-viz`
- Bar width calculated dynamically from `VIZ_W / TRACKS.length` (with `VIZ_GAP` subtracted) — do not set bar width in CSS
- **`VIZ_W` in `music.js` and `.mc-viz { max-width }` in `music.css` must always match.** Current value: `720px` (1.5x the original 480px, set Jun 2026). If one changes, change the other.
- Idle animation: `startVizIdle()` nudges 3–4 random non-active bars every 200 ms

**CSS (`music.css`) key facts:**
- `body:has(#music) main { display: flex; flex-direction: column; }` + `#music { flex: 1; }` fills viewport
- Do not add `min-height` to `#music` — the flex fill handles it

**To add a track:** append an entry to `TRACKS` in `music.js` and confirm `.mc-total` matches `TRACKS.length` (it is set dynamically via JS, so no HTML change needed).

---

## Experience Page Architecture

`experience.html` uses a **vertical alternating timeline** — entries alternate left/right of a center gradient line.

**Structure:** `.timeline` > `.tl-entry.tl-left` or `.tl-entry.tl-right` > `[.tl-date] [.tl-node] [.tl-card]`

- Node dot: `.tl-node` (cyan glow) or `.tl-node--academic` (violet glow)
- Card top-border gradient animates in on hover (same pattern as `.project-card`)
- Mobile: collapses to `[node] [card]` layout with date shown inside card via `.card-date`
- Currently 3 entries: UBC (academic, left), ZenNyxAI (right), Surrey Food Bank (left)

---

## How to Add Things (quick reference)

### Add a CS project
→ See `.claude/skills/add-cs-project.md`  
Order: newest first. Co-op projects without public repos → use `<p class="project-note">Proprietary codebase — developed during co-op term</p>` instead of `.project-links`.

### Add a music track
→ See `.claude/skills/add-music-track.md`  
Append to `TRACKS` array in `music.js` — HTML does not need to change.

### Add a work experience entry
→ See `.claude/skills/add-experience.md`  
Add a `.tl-entry` to the timeline in `experience.html`; update the experience table in this CLAUDE.md.

### Update GitHub links on projects
Find the card by `.project-name`, update `href` on `.project-link`, ensure `target="_blank" rel="noopener"`, remove `project-link-placeholder` class.

---

## GitHub Pages Deployment

Push to `main` branch → GitHub Pages auto-deploys via `.github/workflows/deploy.yml`.  
Live at: `https://Yoyoma2000.github.io/alan-wu-portfolio/`

> First deploy: Go to repo Settings → Pages → Source: GitHub Actions  
> **CDN cache:** always `Ctrl+Shift+R` (hard refresh) before assuming a pushed fix didn't take effect.

---

## AI Harness Notes

This project is intentionally structured to practice the full Claude Code harness:

- **CLAUDE.md** (this file): global rules, design tokens, content inventory
- **Skills** (`.claude/skills/`): repeatable workflows for adding content
- **Hooks** (`.claude/hooks/`): self-improving automation
  - `propose_claude_md.py` runs as the **Stop** hook to suggest CLAUDE.md updates — this is the only hook currently wired up in `.claude/settings.json`
  - `session_start.py` still exists in `.claude/hooks/` but is **not** referenced in `settings.json` (no `SessionStart`/`PreToolUse` entry) — it is inactive
  - On Windows, hooks must invoke `py` not `python3`
- **Subagents**: use for scoped tasks like "scan all project cards and check GitHub links"
- **MCP (GitHub)**: can be wired up to auto-create issues for TODO items in code

**Context from planning session:** This project was planned in claude.ai chat (Jun 2026). That session established the stack, design direction (waveform motif, F1-inspired kinetic dark aesthetic), and the full AI harness architecture. This CLAUDE.md is the bridge — it captures everything so Claude Code has full context without needing the chat history.

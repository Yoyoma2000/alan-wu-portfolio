# Skill: Add CS Project Card

**Name:** add-cs-project  
**Description:** Adds a new project card to the CS & Engineering tab in index.html  
**Trigger:** "add project [name]" or "add CS project" or "new project card"

---

## Steps

1. **Gather information** — ask for (or infer from context):
   - Project name
   - Type: `Personal` | `Academic` | `Hackathon` | `Work`
   - Year (e.g., `2025`)
   - One-sentence description (what it does + one interesting technical detail)
   - Tech stack (list of 3–6 items)
   - GitHub URL (or leave as `#` with note `project-link-placeholder`)
   - Award if applicable (e.g., `🏆 2nd Place`)

2. **Locate the insertion point** in `index.html`:
   - Find `<div class="tab-panel active" id="tab-cs">`
   - Insert the new card as the LAST `.project-card` div inside `.projects-grid`

3. **Use this exact template:**
```html
<div class="project-card reveal">
  <div class="project-type">[Type] · [Year]</div>
  <div class="project-name">[Project Name]</div>
  <p class="project-desc">[Description — 2–3 sentences, specific about what it does and one technical highlight]</p>
  <div class="project-stack">
    <span>[Tech1]</span><span>[Tech2]</span><span>[Tech3]</span>
  </div>
  <div class="project-links">
    <a href="[GitHub URL or #]" class="project-link [project-link-placeholder if no URL]" [target="_blank" if real URL]>
      [GitHub — coming soon OR ↗ GitHub]
    </a>
  </div>
</div>
```

4. **Update CLAUDE.md** — add a row to the Projects table under `## Content: Alan Wu`.

5. **Verify** — confirm the card is inside `#tab-cs > .projects-grid` and the `.reveal` class is present.

---

## Example

Input: "Add project: 39WithYou, personal, 2025, Three.js React Claude API, github.com/alanwu/39WithYou"

Output card:
```html
<div class="project-card reveal">
  <div class="project-type">Personal · 2025</div>
  <div class="project-name">39WithYou</div>
  <p class="project-desc">AI-powered chatbot with an animated 3D character model. LLM inference backend with locally run TTS models for real-time voice interaction, synchronized to dynamic gesture mapping.</p>
  <div class="project-stack">
    <span>TypeScript</span><span>React.js</span><span>Three.js</span>
    <span>Node.js</span><span>Claude API</span><span>TTS Models</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/alanwu/39WithYou" class="project-link" target="_blank">↗ GitHub</a>
  </div>
</div>
```

---

## Checklist
- [ ] Card is inside `#tab-cs > .projects-grid`
- [ ] `.reveal` class present
- [ ] Description is specific (not generic)
- [ ] Stack tags are short (one word or framework name)
- [ ] CLAUDE.md Projects table updated
- [ ] GitHub URL is real or placeholder class applied

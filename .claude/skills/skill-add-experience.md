# Skill: Add Experience Entry

**Name:** add-experience  
**Description:** Adds a new work/volunteer experience entry to the Experience section  
**Trigger:** "add experience", "add job", "add work entry"

---

## Steps

1. **Gather information:**
   - Company name
   - Location (City, Province/Country)
   - Role title
   - Date range (e.g., `Jan – Apr 2026`)
   - Tech stack (optional — leave `<div class="exp-tech"></div>` empty if non-technical)
   - 2–3 bullet points (specific achievements, not vague responsibilities)

2. **Find the insertion point** in `index.html`:
   - Find `<div class="exp-list">`
   - Insert NEW entries at the TOP (newest first)

3. **Use this exact template:**
```html
<div class="exp-item reveal">
  <div class="exp-meta">
    <div class="exp-date">[Date Range]</div>
    <div class="exp-company">[Company Name]</div>
    <div class="exp-location">[City, Province]</div>
  </div>
  <div class="exp-content">
    <div class="exp-role">[Role Title]</div>
    <div class="exp-tech">
      <span class="tech-tag">[Tech1]</span>
      <span class="tech-tag">[Tech2]</span>
    </div>
    <ul class="exp-bullets">
      <li>[Bullet 1 — specific accomplishment with metric or technical detail if possible]</li>
      <li>[Bullet 2]</li>
      <li>[Bullet 3 — optional]</li>
    </ul>
  </div>
</div>
```

4. **Update CLAUDE.md** — add a numbered entry under Experience (newest first).

---

## Checklist
- [ ] Entry inserted at TOP of `.exp-list` (newest first)
- [ ] `.reveal` class present on `.exp-item`
- [ ] Bullets are specific (not "worked on" or "helped with")
- [ ] Tech tags are short framework/tool names
- [ ] CLAUDE.md Experience list updated

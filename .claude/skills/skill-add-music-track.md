# Skill: Add Music Track

**Name:** add-music-track  
**Description:** Adds a new music card to the Music section and wires up the audio file  
**Trigger:** "add music track", "add song", "add track [name]"

---

## Steps

1. **Gather information:**
   - Track title
   - Genre: `Cinematic` | `EDM` | `Pop` | `Rock` | `Pop / Rock` | other
   - File path: e.g., `./assets/music/my-track.mp3`
   - Optional: short description (1 sentence)

2. **Place the MP3/MP4 file** in `/assets/music/[slug].mp3`
   - Slug = lowercase, hyphens, no spaces (e.g., `midnight-drive.mp3`)

3. **Find the existing music cards** in `#musicGrid` and note the highest waveform ID (e.g., `wf3`). New card gets the next ID (e.g., `wf4`).

4. **Remove any placeholder cards** that haven't been replaced yet, OR insert after existing real cards.

5. **Use this exact template:**
```html
<div class="music-card reveal" id="card-[slug]">
  <div class="music-genre">[Genre]</div>
  <div class="music-waveform" id="wf[N]"></div>
  <div class="music-title">[Track Title]</div>
  <div class="music-meta">[Genre] · [Year if known]</div>
  <audio id="audio-[slug]" src="./assets/music/[filename].mp3" preload="none"></audio>
</div>
```

6. **Wire up click-to-play** — add this to the script section (or the existing music click handler if one exists):
```js
document.getElementById('card-[slug]').addEventListener('click', () => {
  const audio = document.getElementById('audio-[slug]');
  if (audio.paused) { audio.play(); } else { audio.pause(); }
});
```

7. **Add waveform bars** for the new wf ID by adding to the waveform init array:
```js
// Find this line in the script:
['wf1','wf2','wf3'].forEach(id => {
// Add 'wf[N]' to the array
```

8. **Update CLAUDE.md** — note the new track under Music section.

---

## Example

Input: "Add track: Midnight Drive, EDM, assets/music/midnight-drive.mp3"

Result: New `.music-card` with id `card-midnight-drive`, genre `EDM`, waveform bars, click-to-play audio.

---

## Checklist
- [ ] MP3 file placed in `/assets/music/`
- [ ] Card uses correct wfN ID (increment from last)
- [ ] `<audio>` tag present with correct src
- [ ] Click handler added to script section
- [ ] wfN added to waveform bars init array
- [ ] Placeholder card removed if replacing one
- [ ] CLAUDE.md Music section updated

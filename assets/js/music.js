// ── Music waveform bars (random decorative) ───────────
['wf1', 'wf2', 'wf3'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  for (let i = 0; i < 40; i++) {
    const bar = document.createElement('div');
    bar.className = 'wf-bar';
    bar.style.height = (15 + Math.random() * 80) + '%';
    el.appendChild(bar);
  }
});

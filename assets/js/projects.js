// ── Tabs ──────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── Screenshot preview toggle ────────────────────────
document.querySelectorAll('.project-preview-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    img.hidden = expanded;
  });
});

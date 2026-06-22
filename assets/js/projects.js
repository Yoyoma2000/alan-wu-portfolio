// ── Tabs ──────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── Screenshot lightbox ───────────────────────────────
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxSoon = document.getElementById('lightboxSoon');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxSoon.hidden = true;
  lightboxImg.hidden = false;
  lightboxImg.onerror = () => {
    lightboxImg.hidden = true;
    lightboxSoon.hidden = false;
  };
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxOverlay.hidden = false;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => lightboxOverlay.classList.add('is-open'));
  });
}

function closeLightbox() {
  lightboxOverlay.classList.remove('is-open');
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    lightboxOverlay.hidden = true;
  };
  lightboxOverlay.addEventListener('transitionend', finish, { once: true });
  setTimeout(finish, 400);
}

document.querySelectorAll('.project-img-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.closest('.project-card').querySelector('.project-name').textContent;
    openLightbox(btn.dataset.src, name + ' screenshot');
  });
});

lightboxClose.addEventListener('click', closeLightbox);

lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightboxOverlay.hidden) closeLightbox();
});

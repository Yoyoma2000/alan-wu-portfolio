// ── Scroll reveal ─────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── Active nav highlight + sliding indicator ──────────
const page = window.location.pathname.split('/').pop() || 'index.html';
let activeNavLink = null;

document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) {
    a.style.color = 'var(--text)';
    activeNavLink = a;
  }
});

function positionIndicator() {
  const indicator = document.querySelector('.nav-indicator');
  if (!indicator || !activeNavLink) return;
  const PAD_X = 12; // 0.75rem
  indicator.style.left  = (activeNavLink.offsetLeft - PAD_X) + 'px';
  indicator.style.width = (activeNavLink.offsetWidth + PAD_X * 2) + 'px';
  indicator.style.opacity = '1';
}
positionIndicator();
document.fonts.ready.then(positionIndicator);

// ── Hamburger menu ────────────────────────────────────
// Overlay is appended to <body> directly to avoid backdrop-filter containing-block
// constraints that would confine position:fixed children to <nav>'s dimensions.
const hamburger = document.querySelector('.nav-hamburger');
const navLinksEl = document.querySelector('.nav-links');

if (hamburger && navLinksEl) {
  const overlay = document.createElement('div');
  overlay.className = 'nav-mobile-overlay';
  navLinksEl.querySelectorAll('a').forEach(a => {
    const link = a.cloneNode(true);
    if (a.getAttribute('href') === page) link.style.color = 'var(--text)';
    overlay.appendChild(link);
  });
  document.body.appendChild(overlay);

  const closeMenu = () => {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeMenu(); });
}

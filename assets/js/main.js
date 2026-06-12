// ── Scroll reveal ─────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── Active nav highlight + sliding indicator ──────────
const page       = window.location.pathname.split('/').pop() || 'index.html';
const navLinksEl = document.querySelector('.nav-links');
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
  const PAD_X      = 12;
  const targetLeft = (activeNavLink.offsetLeft - PAD_X) + 'px';
  const targetW    = (activeNavLink.offsetWidth + PAD_X * 2) + 'px';

  const prevLeft = sessionStorage.getItem('navPrevLeft');
  const prevW    = sessionStorage.getItem('navPrevWidth');
  sessionStorage.removeItem('navPrevLeft');
  sessionStorage.removeItem('navPrevWidth');

  if (prevLeft && prevLeft !== targetLeft) {
    // Snap to previous page's position, then slide to current
    indicator.style.left    = prevLeft;
    indicator.style.width   = prevW || targetW;
    indicator.style.opacity = '1';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        indicator.style.transition = 'left 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1)';
        indicator.style.left  = targetLeft;
        indicator.style.width = targetW;
      });
    });
  } else {
    indicator.style.left    = targetLeft;
    indicator.style.width   = targetW;
    indicator.style.opacity = '1';
  }
}
positionIndicator();
document.fonts.ready.then(positionIndicator);

// Save indicator position before navigating so next page can slide from here
if (navLinksEl) {
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      const ind = document.querySelector('.nav-indicator');
      if (ind && ind.style.opacity === '1') {
        sessionStorage.setItem('navPrevLeft',  ind.style.left);
        sessionStorage.setItem('navPrevWidth', ind.style.width);
      }
    });
  });
}

// ── Hamburger menu ────────────────────────────────────
// Overlay is appended to <body> directly to avoid backdrop-filter containing-block
// constraints that would confine position:fixed children to <nav>'s dimensions.
const hamburger = document.querySelector('.nav-hamburger');

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

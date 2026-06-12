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
const logoEl     = document.querySelector('.nav-logo');
let activeNavLink = null;

document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) {
    a.style.color = 'var(--text)';
    activeNavLink = a;
  }
});

// On the landing page treat the logo as the active element
if (!activeNavLink && (page === 'index.html' || page === '') && logoEl) {
  logoEl.style.color = 'var(--text)';
  activeNavLink = logoEl;
}

// Use getBoundingClientRect so the logo (outside .nav-links) can also be measured
function getIndicatorPos(linkEl) {
  const PAD_X         = 12;
  const containerRect = navLinksEl.getBoundingClientRect();
  const linkRect      = linkEl.getBoundingClientRect();
  return {
    left:  (linkRect.left - containerRect.left - PAD_X) + 'px',
    width: (linkRect.width + PAD_X * 2) + 'px',
  };
}

function positionIndicator() {
  const indicator = document.querySelector('.nav-indicator');
  if (!indicator || !activeNavLink || !navLinksEl) return;

  const { left: targetLeft, width: targetW } = getIndicatorPos(activeNavLink);

  const prevLeft = sessionStorage.getItem('navPrevLeft');
  const prevW    = sessionStorage.getItem('navPrevWidth');
  sessionStorage.removeItem('navPrevLeft');
  sessionStorage.removeItem('navPrevWidth');

  if (prevLeft && prevLeft !== targetLeft) {
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
// Two cases:
// 1. Cross-page navigation (prevLeft in sessionStorage): fonts are cached, use
//    double-rAF so the snap-then-slide animation runs without a fonts.ready race.
// 2. Fresh page load (no prevLeft): fonts may not be loaded yet, so wait for
//    fonts.ready before measuring — no animation in flight, so no race risk.
if (sessionStorage.getItem('navPrevLeft')) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      positionIndicator();
    });
  });
} else {
  document.fonts.ready.then(() => positionIndicator());
}

// Reposition instantly on resize (covers moving between monitors with different DPI).
// Clears any lingering slide transition so the pill snaps rather than animates.
window.addEventListener('resize', () => {
  const indicator = document.querySelector('.nav-indicator');
  if (indicator) indicator.style.transition = 'none';
  positionIndicator();
});

// Save position before navigating so the next page can slide from here
function saveIndicatorPos() {
  const ind = document.querySelector('.nav-indicator');
  if (ind && ind.style.opacity === '1') {
    sessionStorage.setItem('navPrevLeft',  ind.style.left);
    sessionStorage.setItem('navPrevWidth', ind.style.width);
  }
}
if (logoEl)     logoEl.addEventListener('click', saveIndicatorPos);
if (navLinksEl) navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', saveIndicatorPos));

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

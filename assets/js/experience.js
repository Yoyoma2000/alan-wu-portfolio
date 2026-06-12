// ── Timeline directional reveal ────────────────────────
// Left entries slide in from left, right entries from right.
const tlEntries = document.querySelectorAll('.tl-entry');

if (tlEntries.length) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    tlEntries.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  } else {
    tlEntries.forEach(el => {
      const dx = el.classList.contains('tl-left') ? '-28px' : '28px';
      el.style.opacity = '0';
      el.style.transform = `translateX(${dx})`;
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    tlEntries.forEach(el => observer.observe(el));
  }
}

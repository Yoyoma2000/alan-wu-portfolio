// ── Track data ────────────────────────────────────────────
const TRACKS = [
  { title: 'Remix for Freya',                                             genre: 'EDM',        id: '2337978794', token: 's-H6ngFvRCRuT' },
  { title: 'Cinematic Piece',                                             genre: 'Cinematic',  id: '2337979193', token: 's-uu5R6aFJ6vN' },
  { title: 'Miku V6 - Waiting',                                           genre: 'Pop',        id: '2337979502', token: 's-Usx0gtecChY' },
  { title: 'Hi-Tech 8Bit',                                                genre: 'Electronic', id: '2337981191', token: 's-IASWfoXCT9H' },
  { title: 'Jazzy Rock - Kasane Teto',                                    genre: 'Jazz / Rock',id: '2337981524', token: 's-YxA5TSVBQU8' },
  { title: 'J Pop from my Dream - Kasane Teto',                           genre: 'J-Pop',      id: '2337981767', token: 's-DzOTYnWuG6f' },
  { title: 'Color Bass Pop - Zundamon',                                   genre: 'Pop',        id: '2337981881', token: 's-9Z4qIQFlRuk' },
  { title: 'Brazilian Phonk',                                             genre: 'Phonk',      id: '2337982370', token: 's-DrZLWOqvEUE' },
  { title: 'Wukong Epic',                                                 genre: 'Cinematic',  id: '2337983960', token: 's-aS9Mg3xB0KD' },
  { title: 'Piano MIMI-type song - Kasane Teto',                          genre: 'Piano',      id: '2337984584', token: 's-hPLiGp8DCNt' },
  { title: 'HITECH Fullon and Hyperpop',                                  genre: 'Electronic', id: '2337984827', token: 's-21EouRyBJBS' },
  { title: 'Lucid Dreams (Nightcore Remix)',                              genre: 'Nightcore',  id: '2337985610', token: 's-aLfaipnYKLP' },
  { title: 'Very Tough Trap Beat',                                        genre: 'Trap',       id: '2337987182', token: 's-inwLR38QTcL' },
  { title: 'Wakeup Alarm - Kasane Teto and Hatsune Miku',                 genre: 'Pop',        id: '2337992702', token: 's-U0MXT8pgU3P' },
  { title: 'Snowed-In - Lofi',                                            genre: 'Lofi',       id: '2337994106', token: 's-RvwnHf4kXWp' },
  { title: 'ZenDroplets - Made with only sounds from a Garden + Wine Glass', genre: 'Ambient', id: '2337994511', token: 's-wj802PsyiC5' },
  { title: 'Wintry Song - Hatsune Miku (MUSC319 Final Project)',          genre: 'Cinematic',  id: '2337999572', token: 's-YRYiZa71lLL' },
];

const SC_BASE   = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A';
const SC_PARAMS = '&color=%2300e5ff&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';

function makeSrc(id, token) {
  return `${SC_BASE}${id}%3Fsecret_token%3D${token}${SC_PARAMS}`;
}

function isMobile() {
  return window.innerWidth <= 768;
}

// ── Build card DOM ────────────────────────────────────────
const viewport = document.getElementById('mcViewport');
const totalEl  = document.querySelector('.mc-total');
if (totalEl) totalEl.textContent = TRACKS.length;

TRACKS.forEach((track, i) => {
  const card = document.createElement('div');
  card.className = 'mc-card';
  card.dataset.index = i;
  card.innerHTML = `<div class="mc-card-genre">${track.genre}</div>
    <div class="mc-card-title">${track.title}</div>
    <div class="mc-embed"></div>`;
  viewport.appendChild(card);
});

// ── Desktop carousel ──────────────────────────────────────
let activeIdx = 0;

// [scale, opacity, absolute-y-offset-px]
const STEPS = [
  [1,    1,   0  ],  // offset 0 — active
  [0.75, 0.4, 240],  // offset ±1
  [0.55, 0.2, 430],  // offset ±2
  [0.45, 0,   650],  // offset ±3+
];

function getStep(abs) {
  return STEPS[Math.min(abs, STEPS.length - 1)];
}

function injectIframe(embed, idx) {
  if (embed.querySelector('iframe')) return;
  const f = document.createElement('iframe');
  f.setAttribute('src',         makeSrc(TRACKS[idx].id, TRACKS[idx].token));
  f.setAttribute('width',       '100%');
  f.setAttribute('height',      '166');
  f.setAttribute('scrolling',   'no');
  f.setAttribute('frameborder', 'no');
  f.setAttribute('allow',       'autoplay');
  embed.appendChild(f);
}

function goTo(index) {
  const cards = Array.from(viewport.querySelectorAll('.mc-card'));
  const prev  = activeIdx;
  activeIdx   = Math.max(0, Math.min(TRACKS.length - 1, index));

  cards.forEach((card, i) => {
    const off  = i - activeIdx;
    const abs  = Math.abs(off);
    const sign = off >= 0 ? 1 : -1;
    const [s, o, y] = getStep(abs);

    card.style.transform = `translateY(calc(-50% + ${sign * y}px)) scale(${s})`;
    card.style.opacity   = o;
    card.style.zIndex    = 20 - abs;
    card.classList.toggle('mc-active', i === activeIdx);

    const embed = card.querySelector('.mc-embed');
    if (i === activeIdx) {
      injectIframe(embed, i);
    } else if (i === prev && prev !== activeIdx) {
      embed.innerHTML = '';
    }
  });

  const currentEl = document.querySelector('.mc-current');
  if (currentEl) currentEl.textContent = activeIdx + 1;

  const prevBtn = document.querySelector('.mc-prev');
  const nextBtn = document.querySelector('.mc-next');
  if (prevBtn) prevBtn.disabled = activeIdx === 0;
  if (nextBtn) nextBtn.disabled = activeIdx === TRACKS.length - 1;
}

// ── Mobile: lazy-load iframes via IntersectionObserver ────
function initMobile() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const embed = entry.target.querySelector('.mc-embed');
      injectIframe(embed, parseInt(entry.target.dataset.index, 10));
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '300px 0px' });

  viewport.querySelectorAll('.mc-card').forEach(c => obs.observe(c));
}

// ── Init ──────────────────────────────────────────────────
if (isMobile()) {
  initMobile();
} else {
  goTo(0);
}

// ── Arrow buttons ─────────────────────────────────────────
document.querySelector('.mc-prev')?.addEventListener('click', () => goTo(activeIdx - 1));
document.querySelector('.mc-next')?.addEventListener('click', () => goTo(activeIdx + 1));

// ── Keyboard navigation ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (isMobile()) return;
  if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(activeIdx - 1);
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(activeIdx + 1);
});

// ── Click non-active card to focus ────────────────────────
viewport.addEventListener('click', e => {
  if (isMobile()) return;
  const card = e.target.closest('.mc-card');
  if (card && !card.classList.contains('mc-active')) {
    goTo(parseInt(card.dataset.index, 10));
  }
});

// ── Scroll wheel (debounced) ──────────────────────────────
let wheelLock = false;
const section = document.getElementById('music');
if (section) {
  section.addEventListener('wheel', e => {
    if (isMobile()) return;
    e.preventDefault();
    if (wheelLock) return;
    wheelLock = true;
    goTo(activeIdx + (e.deltaY > 0 ? 1 : -1));
    setTimeout(() => { wheelLock = false; }, 600);
  }, { passive: false });
}

// ── Touch swipe ───────────────────────────────────────────
let touchY0 = 0;
if (section) {
  section.addEventListener('touchstart', e => {
    touchY0 = e.touches[0].clientY;
  }, { passive: true });
  section.addEventListener('touchend', e => {
    if (isMobile()) return;
    const delta = touchY0 - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 60) goTo(activeIdx + (delta > 0 ? 1 : -1));
  });
}

// ── Track data ────────────────────────────────────────────
const TRACKS = [
  { title: 'Remix for Freya',                                              genre: 'EDM',         id: '2337978794', token: 's-H6ngFvRCRuT' },
  { title: 'Cinematic Piece',                                              genre: 'Cinematic',   id: '2337979193', token: 's-uu5R6aFJ6vN' },
  { title: 'Miku V6 - Waiting',                                            genre: 'Pop',         id: '2337979502', token: 's-Usx0gtecChY' },
  { title: 'Hi-Tech 8Bit',                                                 genre: 'Electronic',  id: '2337981191', token: 's-IASWfoXCT9H' },
  { title: 'Jazzy Rock - Kasane Teto',                                     genre: 'Jazz / Rock', id: '2337981524', token: 's-YxA5TSVBQU8' },
  { title: 'J Pop from my Dream - Kasane Teto',                            genre: 'J-Pop',       id: '2337981767', token: 's-DzOTYnWuG6f' },
  { title: 'Color Bass Pop - Zundamon',                                    genre: 'Pop',         id: '2337981881', token: 's-9Z4qIQFlRuk' },
  { title: 'Brazilian Phonk',                                              genre: 'Phonk',       id: '2337982370', token: 's-DrZLWOqvEUE' },
  { title: 'Wukong Epic',                                                  genre: 'Cinematic',   id: '2337983960', token: 's-aS9Mg3xB0KD' },
  { title: 'Piano MIMI-type song - Kasane Teto',                           genre: 'Piano',       id: '2337984584', token: 's-hPLiGp8DCNt' },
  { title: 'HITECH Fullon and Hyperpop',                                   genre: 'Electronic',  id: '2337984827', token: 's-21EouRyBJBS' },
  { title: 'Lucid Dreams (Nightcore Remix)',                               genre: 'Nightcore',   id: '2337985610', token: 's-aLfaipnYKLP' },
  { title: 'Very Tough Trap Beat',                                         genre: 'Trap',        id: '2337987182', token: 's-inwLR38QTcL' },
  { title: 'Wakeup Alarm - Kasane Teto and Hatsune Miku',                  genre: 'Pop',         id: '2337992702', token: 's-U0MXT8pgU3P' },
  { title: 'Snowed-In - Lofi',                                             genre: 'Lofi',        id: '2337994106', token: 's-RvwnHf4kXWp' },
  { title: 'ZenDroplets - Made with only sounds from a Garden + Wine Glass', genre: 'Ambient',   id: '2337994511', token: 's-wj802PsyiC5' },
  { title: 'Wintry Song - Hatsune Miku (MUSC319 Final Project)',           genre: 'Cinematic',   id: '2337999572', token: 's-YRYiZa71lLL' },
  { title: 'Ghostly Piano Trap Beat', genre: 'Trap', id: '2338000712', token: 's-JEuBzma9wkh' },
  { title: 'Miku Choir / Acapella - Hatsune Mikus', genre: 'Pop', id: '2338000499', token: 's-0W7uVq50201' },
  { title: 'Hawaii Jazz Rock - Kasane Teto', genre: 'Jazz / Rock', id: '2338000349', token: 's-bHxbVxXPRKw' },
  { title: 'Jazzy Jpop with 8bit', genre: 'J-Pop', id: '2337999926', token: 's-SIp7A8YN7Ah' },
  { title: 'Emotional Slow Piano - Kasane Teto', genre: 'Piano', id: '2337999845', token: 's-wTg4PsfcHWi' },
  { title: 'GTA Mission - Techno Soundscape', genre: 'Electronic', id: '2337999092', token: 's-Lp5SQQ0bJTO' },
  { title: 'EDM Trap (Autopan Practice)', genre: 'EDM', id: '2337998753', token: 's-eXpsMTHdU9n' },
  { title: 'Project Vocaloid Song (First Attempt) - Kasane Teto', genre: 'J-Pop', id: '2337997571', token: 's-cfL2vvY8jHB' },
  { title: 'Kawaii-Step Hyperpop - Ringtone', genre: 'Hyperpop', id: '2337997235', token: 's-7OMGm7QMmXg' },
  { title: 'EDMFullSong (One of my first projects - Cakewalk DAW)', genre: 'EDM', id: '2337996983', token: 's-AZCzmEAfHJx' },
  { title: 'Dramatic Cinematic', genre: 'Cinematic', id: '2337996836', token: 's-mR418qq2vig' },
  { title: 'Broken Bots', genre: 'Electronic', id: '2337996743', token: 's-XjackdNv3X6' },
  { title: 'AstralSerenity', genre: 'Lofi', id: '2337996476', token: 's-2V3DAFDdLph' },
  { title: 'Freedom - JPop DnB - Hatsune Miku', genre: 'J-Pop', id: '2337996161', token: 's-XzqULBeDO9h' },
  { title: 'DropletsFromTheSky - Only sounds from a Garden', genre: 'Ambient', id: '2337995915', token: 's-m3Nmm177RxU' },
  { title: 'Retro Game Sounds', genre: 'Electronic', id: '2337994982', token: 's-7TUH8hOONez' },
  { title: 'Adventure - Hatsune Miku (Jibberish Japanese)', genre: 'Pop', id: '2337994901', token: 's-cxSvb1WR1N7' },
  { title: 'Horror Film Score (MUSC119)', genre: 'Cinematic', id: '2337994022', token: 's-BRLh3WIFb7w' },
  { title: 'Simple Orchestral', genre: 'Cinematic', id: '2337993944', token: 's-NEfSOh9VNh0' },
  { title: 'MikuDorime Bass (Concept)', genre: 'Electronic', id: '2337993779', token: 's-i2PPi9W2Ix9' },
  { title: 'SleepTight - EDM - Hatsune Miku', genre: 'EDM', id: '2337993689', token: 's-wssypRNECSH' },
  { title: 'Hangout with Miku JPop - Hatsune Miku', genre: 'J-Pop', id: '2337993431', token: 's-SRmj0sTOftW' },
  { title: 'Chilly Breakbeat', genre: 'Electronic', id: '2337993251', token: 's-8TGWvCre5nj' },
  { title: 'Release Cut Piano Rock', genre: 'Rock', id: '2337993074', token: 's-rQndGcmv2RL' },
  { title: 'Rhythm Game Break', genre: 'Electronic', id: '2337992933', token: 's-FLLmjM9U31v' },
  { title: 'Drum and Bass Inspired Stonebank', genre: 'DnB', id: '2337991457', token: 's-zY6KQGFiABA' },
  { title: 'Movie/Game Trailer Music', genre: 'Cinematic', id: '2337990479', token: 's-ENn6I8eMf56' },
  { title: 'LOFI Jazz', genre: 'Lofi', id: '2337989744', token: 's-eOIGsjbVb99' },
  { title: 'Hyperpop Inspired by Hyper Potions and Tokyo Machine', genre: 'Hyperpop', id: '2337989105', token: 's-mulqRt8vRki' },
  { title: 'Melodic EDM - Kasane Teto', genre: 'EDM', id: '2337986696', token: 's-yhGXzd7yKjb' },
  { title: 'Christmas Miracle type', genre: 'Cinematic', id: '2337985337', token: 's-ZyQ5xPBGT5b' },
  { title: 'Amen Break EDM Bass', genre: 'EDM', id: '2337985229', token: 's-m9qJC1J2Jj5' },
  { title: 'Drum and Bass - Instrumental', genre: 'DnB', id: '2337985016', token: 's-QZH6GNtewjG' },
  { title: 'Project_ColorBASS', genre: 'Electronic', id: '2337984752', token: 's-BQoCcBddduF' },
  { title: "Macaroon Moon x King's Dead", genre: 'Hip-Hop', id: '2337984407', token: 's-4CIUGzhucer' },
  { title: 'Attempts to Sing - Lofi Jazz', genre: 'Lofi', id: '2337984122', token: 's-kZ2yerlDsHw' },
  { title: 'TetoJRock', genre: 'Rock', id: '2337983894', token: 's-xgylKa5YqFq' },
  { title: 'Japanese Gamey Music', genre: 'Electronic', id: '2337983813', token: 's-AFPSIVkny56' },
  { title: 'Romantic Slow - Kasane Teto (CN)', genre: 'Pop', id: '2337983636', token: 's-vAI8jV6qjnK' },
  { title: 'tv off x Otsukare Summer', genre: 'J-Pop', id: '2337983384', token: 's-G2T7g8XysS3' },
  { title: 'SHIJOSHUGI ADTRUCK x Where Our Blue Is', genre: 'J-Pop', id: '2337983150', token: 's-u96pvHLUsTC' },
  { title: 'Hyperpop + Trap', genre: 'Hyperpop', id: '2337982643', token: 's-sjKeR7IBvrF' },
  { title: 'SKAI x Perfect Math Class', genre: 'Electronic', id: '2337982319', token: 's-H6mrhECipMo' },
  { title: 'Sunshine Drive Type Rock/Jpop', genre: 'Rock', id: '2337982112', token: 's-KSLzz8h1rmf' },
  { title: 'Project_Artcore', genre: 'Electronic', id: '2337981581', token: 's-EvawLQPcnIy' },
  { title: 'Attempts to sing', genre: 'Pop', id: '2337980360', token: 's-vdJLuW85Cjv' },
  { title: 'Nissan Altima Remix', genre: 'EDM', id: '2337980048', token: 's-7KQDTdKUaDc' },
  { title: '蜡烛颂', genre: 'Cinematic', id: '2337979751', token: 's-GGTCkCPpS3m' },
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
const stage   = document.getElementById('mcStage');
const totalEl = document.querySelector('.mc-total');
if (totalEl) totalEl.textContent = TRACKS.length;

TRACKS.forEach((track, i) => {
  const card = document.createElement('div');
  card.className = 'mc-card';
  card.dataset.index = i;
  card.innerHTML = `<div class="mc-card-genre">${track.genre}</div>
    <div class="mc-card-title">${track.title}</div>
    <div class="mc-embed"></div>`;
  stage.appendChild(card);
});

// ── U-arc parameters per |offset| from active ────────────
// x = horizontal center-to-center spacing (px)
// y = arc lift (negative = up, 0 = baseline)
// s = scale, o = opacity
const STEPS = [
  { x: 0,    y: 0,    s: 1,    o: 1    },   // 0: active
  { x: 340,  y: -40,  s: 0.75, o: 0.5  },   // ±1
  { x: 680,  y: -90,  s: 0.55, o: 0.3  },   // ±2
  { x: 1020, y: -150, s: 0.42, o: 0.12 },   // ±3
  { x: 1380, y: -200, s: 0.35, o: 0    },   // ±4+
];

function getStep(abs) {
  return STEPS[Math.min(abs, STEPS.length - 1)];
}

let activeIdx = 0;

// ── Visualizer ────────────────────────────────────────────
const VIZ_BELL = [1, 0.70, 0.45, 0.28, 0.16, 0.08];

function bellH(abs) {
  return VIZ_BELL[Math.min(abs, VIZ_BELL.length - 1)];
}

const VIZ_GAP  = 4;
const VIZ_W    = 480;
const barWidth = (VIZ_W - (TRACKS.length - 1) * VIZ_GAP) / TRACKS.length;

const vizEl    = document.getElementById('mcViz');
const VIZ_BARS = [];
if (vizEl) {
  for (let i = 0; i < TRACKS.length; i++) {
    const bar = document.createElement('div');
    bar.className = 'mc-viz-bar';
    bar.style.width = barWidth + 'px';
    bar.addEventListener('click', () => goTo(i));
    vizEl.appendChild(bar);
    VIZ_BARS.push(bar);
  }
  console.log(`Visualizer: ${VIZ_BARS.length} bars created`);
  updateViz();

  // Drag to scrub
  let vizDragging = false;

  function vizIdxFromX(clientX) {
    const rect = vizEl.getBoundingClientRect();
    const relX = Math.max(0, clientX - rect.left);
    return Math.max(0, Math.min(TRACKS.length - 1, Math.floor(relX / (barWidth + VIZ_GAP))));
  }

  vizEl.addEventListener('mousedown', e => {
    e.preventDefault();
    vizDragging = true;
    goTo(vizIdxFromX(e.clientX));
  });
  vizEl.addEventListener('mousemove', e => {
    if (!vizDragging) return;
    const idx = vizIdxFromX(e.clientX);
    if (idx !== activeIdx) goTo(idx);
  });
  vizEl.addEventListener('mouseup',    () => { vizDragging = false; });
  vizEl.addEventListener('mouseleave', () => { vizDragging = false; });
}

function updateViz() {
  VIZ_BARS.forEach((bar, i) => {
    const abs = Math.abs(i - activeIdx);
    bar.style.height = bellH(abs) * 100 + '%';
    if (abs === 0) {
      bar.style.background = '#00e5ff';
      bar.style.opacity    = '1';
      bar.style.boxShadow  = '0 0 8px #00e5ff';
    } else {
      bar.style.background = '#6b7280';
      bar.style.opacity    = '0.3';
      bar.style.boxShadow  = 'none';
    }
  });
}

function startVizIdle() {
  setInterval(() => {
    const count      = 3 + Math.floor(Math.random() * 2);
    const candidates = VIZ_BARS.map((_, i) => i).filter(i => i !== activeIdx);
    // Partial Fisher-Yates shuffle to pick `count` random indices
    for (let i = candidates.length - 1; i > candidates.length - 1 - count && i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    candidates.slice(candidates.length - count).forEach(i => {
      const base  = bellH(Math.abs(i - activeIdx)) * 100;
      const nudge = (Math.random() * 6 + 5) * (Math.random() < 0.5 ? 1 : -1);
      VIZ_BARS[i].style.height = Math.max(4, Math.min(95, base + nudge)) + '%';
      setTimeout(() => {
        if (i !== activeIdx) {
          VIZ_BARS[i].style.height = bellH(Math.abs(i - activeIdx)) * 100 + '%';
        }
      }, 150);
    });
  }, 200);
}

let isThrottled = false;

function navigate(dir) {
  if (isThrottled) return;
  isThrottled = true;
  goTo(activeIdx + dir);
  setTimeout(() => { isThrottled = false; }, 600);
}

// Refs for active card's mouseenter/mouseleave/wheel handlers so they
// can be removed when a different card becomes active.
let activeCardEl      = null;
let cardWheelHandler  = null;
let cardEnterHandler  = null;
let cardLeaveHandler  = null;

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
  const cards = Array.from(stage.querySelectorAll('.mc-card'));
  const prev  = activeIdx;
  activeIdx   = Math.max(0, Math.min(TRACKS.length - 1, index));

  cards.forEach((card, i) => {
    const off  = i - activeIdx;
    const abs  = Math.abs(off);
    const sign = off >= 0 ? 1 : -1;
    const { x, y, s, o } = getStep(abs);

    card.style.transform = `translate(calc(-50% + ${sign * x}px), calc(-50% + ${y}px)) scale(${s})`;
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

  // Swap mouseenter/wheel capture from old active card to new one.
  // This avoids any overlay on the iframe — SoundCloud controls are
  // always directly clickable. Scroll over the card (non-iframe area)
  // still navigates; scroll over the iframe goes to the embed itself.
  if (activeCardEl) {
    activeCardEl.removeEventListener('mouseenter', cardEnterHandler);
    activeCardEl.removeEventListener('mouseleave', cardLeaveHandler);
    activeCardEl.removeEventListener('wheel', cardWheelHandler);
  }
  activeCardEl     = cards[activeIdx];
  cardWheelHandler = e => {
    e.preventDefault();
    const dir = Math.abs(e.deltaX) >= Math.abs(e.deltaY)
      ? Math.sign(e.deltaX)
      : Math.sign(e.deltaY);
    navigate(dir);
  };
  cardEnterHandler = () => activeCardEl.addEventListener('wheel', cardWheelHandler, { passive: false });
  cardLeaveHandler = () => activeCardEl.removeEventListener('wheel', cardWheelHandler);
  activeCardEl.addEventListener('mouseenter', cardEnterHandler);
  activeCardEl.addEventListener('mouseleave', cardLeaveHandler);

  updateViz();
}

// ── Mobile: lazy-load all iframes via IntersectionObserver
function initMobile() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const embed = entry.target.querySelector('.mc-embed');
      const idx   = parseInt(entry.target.dataset.index, 10);
      if (!embed.querySelector('iframe')) {
        const f = document.createElement('iframe');
        f.setAttribute('src',         makeSrc(TRACKS[idx].id, TRACKS[idx].token));
        f.setAttribute('width',       '100%');
        f.setAttribute('height',      '166');
        f.setAttribute('scrolling',   'no');
        f.setAttribute('frameborder', 'no');
        f.setAttribute('allow',       'autoplay');
        embed.appendChild(f);
      }
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '300px 0px' });

  stage.querySelectorAll('.mc-card').forEach(c => obs.observe(c));
}

// ── Init ──────────────────────────────────────────────────
if (isMobile()) {
  initMobile();
} else {
  goTo(0);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startVizIdle();
  }
}

// ── Stage wheel — captures scroll on non-iframe card areas ─
stage.addEventListener('wheel', e => {
  if (isMobile()) return;
  e.preventDefault();
  const dir = Math.abs(e.deltaX) >= Math.abs(e.deltaY)
    ? Math.sign(e.deltaX)
    : Math.sign(e.deltaY);
  navigate(dir);
}, { passive: false });

// ── Keyboard navigation ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (isMobile()) return;
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(activeIdx - 1);
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(activeIdx + 1);
});

// ── Click non-active card to focus ────────────────────────
stage.addEventListener('click', e => {
  if (isMobile()) return;
  const card = e.target.closest('.mc-card');
  if (card && !card.classList.contains('mc-active')) {
    goTo(parseInt(card.dataset.index, 10));
  }
});

// ── Touch swipe (tablet/desktop touch) ───────────────────
let touchX0 = 0;
stage.addEventListener('touchstart', e => {
  touchX0 = e.touches[0].clientX;
}, { passive: true });
stage.addEventListener('touchend', e => {
  if (isMobile()) return;
  const delta = touchX0 - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 60) goTo(activeIdx + (delta > 0 ? 1 : -1));
});

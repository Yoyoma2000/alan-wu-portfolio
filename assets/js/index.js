// ── Waveform canvas animation ─────────────────────────
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let t = 0;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.width, h = canvas.height;
  const layers = [
    { freq: 0.012, amp: 0.28, speed: 0.015, color: '#00e5ff', lineW: 1.5 },
    { freq: 0.018, amp: 0.18, speed: 0.022, color: '#9b5cf6', lineW: 1 },
    { freq: 0.008, amp: 0.38, speed: 0.009, color: '#5b8cff', lineW: 0.8 },
  ];
  layers.forEach(layer => {
    ctx.beginPath();
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = layer.lineW;
    ctx.globalAlpha = 0.7;
    for (let x = 0; x <= w; x++) {
      const y = h * 0.5 + Math.sin(x * layer.freq + t * layer.speed * 60) * h * layer.amp
                          + Math.sin(x * layer.freq * 1.7 + t * layer.speed * 40) * h * layer.amp * 0.4;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
  t++;
  requestAnimationFrame(drawWave);
}
drawWave();

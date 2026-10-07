// Procedurally drawn mock app screens for the hero phone, used until real
// screenshots are dropped into src/assets/screens/. Each echoes a real skill:
// live streaming, offline-first ERP, real-time chat and BLE/IoT.
import { CanvasTexture, SRGBColorSpace } from 'three';

const W = 600;
const H = 1300;
const FONT = "'Inter Variable', 'Segoe UI', system-ui, sans-serif";
const BLUE = '#13b9fd';
const DEEP = '#02569b';
const TEAL = '#5eead4';

function rr(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

function text(ctx, str, x, y, size, color, weight = 600, align = 'left') {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(str, x, y);
}

function linear(ctx, x0, y0, x1, y1, stops) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c));
  return g;
}

function statusBar(ctx, color = '#fff') {
  text(ctx, '9:41', 60, 70, 26, color, 600);
  rr(ctx, W - 108, 52, 46, 22, 6, null);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  rr(ctx, W - 104, 56, 32, 14, 3, color);
  rr(ctx, W - 160, 56, 30, 14, 4, color);
}

function homeIndicator(ctx) {
  rr(ctx, W / 2 - 90, H - 34, 180, 8, 4, 'rgba(255,255,255,0.55)');
}

function liveScreen(ctx) {
  ctx.fillStyle = linear(ctx, 0, 0, W, H, ['#2a1b5e', '#0b1f3a', '#051024']);
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 520, 20, W / 2, 520, 360);
  glow.addColorStop(0, 'rgba(19,185,253,0.55)');
  glow.addColorStop(1, 'rgba(19,185,253,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.beginPath();
  ctx.arc(W / 2, 470, 120, 0, Math.PI * 2);
  ctx.fillStyle = linear(ctx, W / 2 - 120, 350, W / 2 + 120, 590, ['#7dd3fc', '#6366f1']);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(W / 2, 760, 210, 150, 0, Math.PI, 0);
  ctx.fill();
  statusBar(ctx);
  rr(ctx, 40, 110, 96, 44, 12, '#ef4444');
  text(ctx, 'LIVE', 88, 141, 24, '#fff', 800, 'center');
  rr(ctx, 150, 110, 128, 44, 12, 'rgba(0,0,0,0.45)');
  text(ctx, '2.4k', 214, 141, 24, '#fff', 700, 'center');
  rr(ctx, W - 96, 106, 56, 52, 26, 'rgba(255,255,255,0.15)');
  text(ctx, '×', W - 68, 143, 36, '#fff', 500, 'center');

  const chats = [
    ['aarav', 'This UI is so smooth!'],
    ['meera', 'Agora latency is ~0 👀'],
    ['dev_k', 'Joined from Delhi 🔥'],
  ];
  chats.forEach(([user, msg], i) => {
    const y = 900 + i * 92;
    rr(ctx, 40, y, 420, 74, 22, 'rgba(0,0,0,0.38)');
    ctx.beginPath();
    ctx.arc(80, y + 37, 20, 0, Math.PI * 2);
    ctx.fillStyle = [BLUE, TEAL, '#f472b6'][i];
    ctx.fill();
    text(ctx, user, 114, y + 30, 20, 'rgba(255,255,255,0.65)', 600);
    text(ctx, msg, 114, y + 58, 23, '#fff', 500);
  });
  rr(ctx, 40, 1190, 400, 64, 32, 'rgba(255,255,255,0.12)');
  text(ctx, 'Say something…', 74, 1231, 23, 'rgba(255,255,255,0.6)', 500);
  ctx.beginPath();
  ctx.arc(510, 1222, 34, 0, Math.PI * 2);
  ctx.fillStyle = linear(ctx, 476, 1188, 544, 1256, ['#f472b6', '#ef4444']);
  ctx.fill();
  text(ctx, '♥', 510, 1234, 32, '#fff', 700, 'center');
  homeIndicator(ctx);
}

function erpScreen(ctx) {
  ctx.fillStyle = '#070d1e';
  ctx.fillRect(0, 0, W, H);
  statusBar(ctx);
  text(ctx, 'Good morning', 40, 160, 24, 'rgba(255,255,255,0.55)', 500);
  text(ctx, 'Dashboard', 40, 206, 44, '#fff', 700);
  rr(ctx, 360, 168, 200, 44, 22, 'rgba(94,234,212,0.14)');
  ctx.beginPath();
  ctx.arc(386, 190, 7, 0, Math.PI * 2);
  ctx.fillStyle = TEAL;
  ctx.fill();
  text(ctx, 'Offline ready', 402, 198, 20, TEAL, 600);

  rr(ctx, 40, 250, 250, 170, 28, linear(ctx, 40, 250, 290, 420, [BLUE, DEEP]));
  text(ctx, 'Revenue', 66, 300, 22, 'rgba(255,255,255,0.8)', 500);
  text(ctx, '₹4.8L', 66, 360, 46, '#fff', 800);
  text(ctx, '+12.4%', 66, 396, 20, '#d1fae5', 600);
  rr(ctx, 310, 250, 250, 170, 28, 'rgba(255,255,255,0.06)');
  text(ctx, 'Orders', 336, 300, 22, 'rgba(255,255,255,0.6)', 500);
  text(ctx, '1,284', 336, 360, 46, '#fff', 800);
  text(ctx, '38 pending sync', 336, 396, 20, TEAL, 600);

  rr(ctx, 40, 450, 520, 330, 28, 'rgba(255,255,255,0.05)');
  text(ctx, 'This week', 70, 500, 24, '#fff', 600);
  const bars = [0.45, 0.7, 0.55, 0.9, 0.62, 0.78, 0.5];
  bars.forEach((v, i) => {
    const bh = 200 * v;
    rr(ctx, 76 + i * 66, 740 - bh, 36, bh, 10, i === 3 ? linear(ctx, 0, 740 - bh, 0, 740, [TEAL, BLUE]) : 'rgba(19,185,253,0.35)');
  });

  ['Invoice #1042', 'Stock update', 'Invoice #1041'].forEach((label, i) => {
    const y = 810 + i * 120;
    rr(ctx, 40, y, 520, 100, 24, 'rgba(255,255,255,0.05)');
    rr(ctx, 64, y + 22, 56, 56, 16, i === 1 ? 'rgba(94,234,212,0.2)' : 'rgba(19,185,253,0.2)');
    text(ctx, label, 140, y + 46, 24, '#fff', 600);
    text(ctx, i === 1 ? 'Synced just now' : 'Saved offline · will sync', 140, y + 78, 19, 'rgba(255,255,255,0.5)', 500);
    text(ctx, i === 1 ? '✓' : '⟳', 528, y + 62, 28, i === 1 ? TEAL : BLUE, 700, 'right');
  });
  rr(ctx, 40, 1180, 520, 84, 32, 'rgba(255,255,255,0.07)');
  [0, 1, 2, 3].forEach((i) => rr(ctx, 92 + i * 128, 1206, 32, 32, 9, i === 0 ? BLUE : 'rgba(255,255,255,0.3)'));
  homeIndicator(ctx);
}

function chatScreen(ctx) {
  ctx.fillStyle = linear(ctx, 0, 0, 0, H, ['#0b1430', '#060b19']);
  ctx.fillRect(0, 0, W, H);
  statusBar(ctx);
  rr(ctx, 0, 100, W, 120, 0, 'rgba(255,255,255,0.04)');
  ctx.beginPath();
  ctx.arc(90, 160, 34, 0, Math.PI * 2);
  ctx.fillStyle = linear(ctx, 56, 126, 124, 194, [TEAL, BLUE]);
  ctx.fill();
  text(ctx, 'Project Team', 142, 152, 28, '#fff', 700);
  ctx.beginPath();
  ctx.arc(150, 180, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#22c55e';
  ctx.fill();
  text(ctx, '3 online', 166, 188, 20, 'rgba(255,255,255,0.55)', 500);

  const msgs = [
    [0, 'Build is green on Codemagic ✅'],
    [1, 'Pushing the release to Play now'],
    [0, 'Payments flow looks perfect'],
    [1, 'Cashfree + IAP both verified 🎉'],
    [0, 'Ship it! 🚀'],
  ];
  let y = 270;
  msgs.forEach(([mine, msg]) => {
    ctx.font = `500 24px ${FONT}`;
    const w = Math.min(ctx.measureText(msg).width + 56, 470);
    const x = mine ? W - 40 - w : 40;
    rr(ctx, x, y, w, 76, 26, mine ? linear(ctx, x, y, x + w, y + 76, [BLUE, '#0b84d8']) : 'rgba(255,255,255,0.08)');
    text(ctx, msg, x + 28, y + 47, 24, mine ? '#031120' : '#fff', 500);
    y += 104;
  });
  rr(ctx, 40, y, 120, 64, 26, 'rgba(255,255,255,0.08)');
  [0, 1, 2].forEach((i) => {
    ctx.beginPath();
    ctx.arc(74 + i * 26, y + 32, 7, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.35 + i * 0.2})`;
    ctx.fill();
  });
  rr(ctx, 30, 1180, 450, 70, 35, 'rgba(255,255,255,0.08)');
  text(ctx, 'Message', 66, 1224, 24, 'rgba(255,255,255,0.45)', 500);
  ctx.beginPath();
  ctx.arc(530, 1215, 36, 0, Math.PI * 2);
  ctx.fillStyle = BLUE;
  ctx.fill();
  text(ctx, '➤', 532, 1226, 30, '#031120', 700, 'center');
  homeIndicator(ctx);
}

function iotScreen(ctx) {
  ctx.fillStyle = linear(ctx, 0, 0, W, H, ['#04201f', '#061226', '#050a18']);
  ctx.fillRect(0, 0, W, H);
  statusBar(ctx);
  text(ctx, 'My Device', 40, 190, 44, '#fff', 700);
  rr(ctx, 40, 216, 270, 44, 22, 'rgba(19,185,253,0.15)');
  text(ctx, '● Connected via BLE', 60, 246, 20, BLUE, 600);

  const cx = W / 2;
  const cy = 560;
  ctx.lineCap = 'round';
  ctx.lineWidth = 34;
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.arc(cx, cy, 190, Math.PI * 0.75, Math.PI * 2.25);
  ctx.stroke();
  ctx.strokeStyle = linear(ctx, cx - 190, cy, cx + 190, cy, [TEAL, BLUE]);
  ctx.beginPath();
  ctx.arc(cx, cy, 190, Math.PI * 0.75, Math.PI * (0.75 + 1.5 * 0.72));
  ctx.stroke();
  text(ctx, '72%', cx, cy + 20, 84, '#fff', 800, 'center');
  text(ctx, 'Battery', cx, cy + 66, 24, 'rgba(255,255,255,0.55)', 500, 'center');

  const tiles = [
    ['Sensor', 'Active', true],
    ['Auto-sync', 'On', true],
    ['Firmware', 'v2.1', false],
    ['Signal', '-48 dBm', false],
  ];
  tiles.forEach(([label, value, on], i) => {
    const x = 40 + (i % 2) * 270;
    const y = 830 + Math.floor(i / 2) * 170;
    rr(ctx, x, y, 250, 150, 28, on ? 'rgba(94,234,212,0.12)' : 'rgba(255,255,255,0.06)');
    text(ctx, label, x + 26, y + 52, 24, 'rgba(255,255,255,0.7)', 500);
    text(ctx, value, x + 26, y + 104, 34, '#fff', 700);
    if (on) {
      rr(ctx, x + 168, y + 30, 58, 32, 16, TEAL);
      ctx.beginPath();
      ctx.arc(x + 210, y + 46, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#04201f';
      ctx.fill();
    }
  });
  homeIndicator(ctx);
}

const SCREENS = [liveScreen, erpScreen, chatScreen, iotScreen];

export function makePlaceholderScreens() {
  return SCREENS.map((draw) => {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    draw(canvas.getContext('2d'));
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  });
}

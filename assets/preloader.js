/* ──────────────────────────────────────────────
   preloader.js — 0→100 counter with status messages
   ────────────────────────────────────────────── */
(() => {
  'use strict';

  const pre   = document.getElementById('preloader');
  const fill  = document.getElementById('pre-bar-fill');
  const count = document.getElementById('pre-count');
  const status = document.getElementById('pre-status');
  if (!pre || !fill || !count) return;

  const statuses = [
    'Loading visual archive…',
    'Threading the timeline…',
    'Calibrating the field…',
    'A documentary in eight chapters'
  ];

  let progress = 0;
  let lastStatus = 0;
  const duration = 2400; // ms
  const start = performance.now();

  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - t, 3);
    progress = Math.round(eased * 100);
    count.textContent = String(progress).padStart(3, '0');
    fill.style.transform = `scaleX(${eased})`;

    // swap status messages in 4 phases
    const phase = Math.min(Math.floor(t * statuses.length), statuses.length - 1);
    if (phase !== lastStatus) {
      lastStatus = phase;
      status.style.opacity = '0';
      setTimeout(() => {
        status.textContent = statuses[phase];
        status.style.opacity = '0.6';
      }, 180);
    }

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      finish();
    }
  };
  requestAnimationFrame(tick);

  function finish() {
    // small hold then fade out
    setTimeout(() => {
      pre.style.transition = 'opacity 0.9s ease, transform 1.1s cubic-bezier(.76,0,.24,1)';
      pre.style.opacity = '0';
      pre.style.transform = 'scale(1.02)';
      // reveal layers
      document.getElementById('webgl-hero')?.classList.add('on');
      document.getElementById('particles')?.classList.add('on');
      document.getElementById('nav')?.classList.add('on');
      window.dispatchEvent(new Event('preloader:done'));
      setTimeout(() => pre.remove(), 1000);
    }, 280);
  }
})();

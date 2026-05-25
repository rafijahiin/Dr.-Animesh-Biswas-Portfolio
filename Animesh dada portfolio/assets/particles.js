/* ──────────────────────────────────────────────
   particles.js — ambient gold dust over the whole page
   Light canvas2D layer that drifts upward, gathers
   near the cursor, and dims when scrolling fast.
   ────────────────────────────────────────────── */
(() => {
  'use strict';

  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = window.innerWidth;
  let H = window.innerHeight;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // ─── particle pool ─────────────────────────────
  const COUNT = Math.min(110, Math.floor((W * H) / 16000));
  const parts = [];
  const seed = () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    z: 0.3 + Math.random() * 0.7,
    r: 0.4 + Math.random() * 1.6,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -0.05 - Math.random() * 0.18,
    a: 0.2 + Math.random() * 0.45,
    tw: Math.random() * Math.PI * 2,
    twS: 0.003 + Math.random() * 0.008,
  });
  for (let i = 0; i < COUNT; i++) parts.push(seed());

  // mouse — particles drift slightly toward it
  let mx = W / 2, my = H / 2;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // scroll speed sensitivity
  let lastSy = window.scrollY;
  let scrollV = 0;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    scrollV = Math.min(Math.abs(sy - lastSy) / 30, 1);
    lastSy = sy;
  }, { passive: true });

  // pause when tab hidden
  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(loop);
  });

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    // decay scrollV
    scrollV *= 0.92;

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];

      // gentle attraction to cursor
      const dx = mx - p.x;
      const dy = my - p.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 60000) {
        const f = (1 - d2 / 60000) * 0.012 * p.z;
        p.vx += dx * f * 0.001;
        p.vy += dy * f * 0.001;
      }

      // damping toward base velocity
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 - 0.06 * p.z * 0.6;

      p.x += p.vx * (1 + scrollV * 2);
      p.y += p.vy * (1 + scrollV * 2);

      // wrap
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.y > H + 20) p.y = -10;

      // twinkle
      p.tw += p.twS;
      const alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));

      // render — gold dot with halo
      ctx.beginPath();
      const r = p.r * p.z;
      ctx.fillStyle = `rgba(200, 169, 110, ${alpha})`;
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();

      // soft halo for larger ones
      if (p.r > 1.0) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 169, 110, ${alpha * 0.08})`;
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ──────────────────────────────────────────────
   contact canvas — sparse constellation behind the CTA
   ────────────────────────────────────────────── */
(() => {
  'use strict';

  const canvas = document.getElementById('contact-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 60;
  const pts = [];
  for (let i = 0; i < COUNT; i++) {
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 0.4 + Math.random() * 1.2,
    });
  }

  let running = true;
  const io = new IntersectionObserver(entries => {
    running = entries[0].isIntersecting;
    if (running) requestAnimationFrame(loop);
  }, { threshold: 0.05 });
  io.observe(canvas.parentElement);

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    // background subtle gradient
    const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.6);
    grad.addColorStop(0, 'rgba(22, 55, 42, 0.35)');
    grad.addColorStop(1, 'rgba(5, 5, 5, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // update + draw points
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = 'rgba(200, 169, 110, 0.55)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // connecting lines for nearby
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 18000) {
          ctx.strokeStyle = `rgba(200, 169, 110, ${(1 - d2 / 18000) * 0.18})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ──────────────────────────────────────────────
   cursor.js — custom dual-ring cursor with smooth follow
   ────────────────────────────────────────────── */
(() => {
  'use strict';

  const cur  = document.getElementById('cur');
  const curf = document.getElementById('cur-f');
  if (!cur || !curf) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let fx = mx;
  let fy = my;

  // Hide on touch devices
  if (matchMedia('(pointer: coarse)').matches) {
    cur.style.display = 'none';
    curf.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left  = mx + 'px';
    cur.style.top   = my + 'px';
  });

  (function tick() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    curf.style.left = fx + 'px';
    curf.style.top  = fy + 'px';
    requestAnimationFrame(tick);
  })();

  // Hover handling — expand on interactive elements
  const expand = () => { cur.classList.add('big'); curf.classList.add('big'); };
  const reset  = () => {
    cur.classList.remove('big', 'txt');
    curf.classList.remove('big', 'txt');
  };

  const bind = () => {
    document
      .querySelectorAll('a, button, .focus-card, .field-card, .moments-item, .impact-cell, .pub-row, .tag, .nav-btn, [data-cursor="big"]')
      .forEach(el => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', reset);
      });
    // Long-text reading cursor
    document
      .querySelectorAll('p, h2, h3, h4, .chapter-card-title, .hero-name, .contact-cta')
      .forEach(el => {
        el.addEventListener('mouseenter', () => {
          cur.classList.add('txt');
          curf.classList.add('txt');
        });
        el.addEventListener('mouseleave', reset);
      });
  };

  // Bind once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => document.body.classList.add('cur-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cur-hidden'));
})();

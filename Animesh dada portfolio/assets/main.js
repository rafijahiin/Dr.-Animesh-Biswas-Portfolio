/* ──────────────────────────────────────────────
   main.js — small glue layer
   ──────────────────────────────────────────────
   - keyboard shortcut to jump between chapters (J / K)
   - active nav link highlight per chapter
   - smooth-scroll polyfill safeguard
   ────────────────────────────────────────────── */
(() => {
  'use strict';

  // ─── Active nav link based on chapter in view ──
  const links = document.querySelectorAll('.nav-links a');
  const sections = ['#ch1', '#ch2', '#ch3', '#ch4', '#ch5', '#ch6']
    .map(id => document.querySelector(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const id = '#' + en.target.id;
        links.forEach(l => {
          if (l.getAttribute('href') === id) {
            l.style.color = 'var(--gold)';
          } else {
            l.style.color = '';
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
  }

  // ─── Keyboard nav: J / K to jump chapters ──────
  const allSections = ['#hero', '#ch1', '#ch2', '#ch3', '#ch4', '#ch5', '#ch6', '#contact']
    .map(id => document.querySelector(id))
    .filter(Boolean);
  let curIdx = 0;

  function jumpTo(idx) {
    idx = Math.max(0, Math.min(allSections.length - 1, idx));
    curIdx = idx;
    const el = allSections[idx];
    window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  }

  window.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea')) return;
    if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowDown') {
      // figure out current section based on scroll
      const y = window.scrollY + window.innerHeight * 0.3;
      for (let i = 0; i < allSections.length; i++) {
        if (allSections[i].offsetTop > y) { jumpTo(i); return; }
      }
      jumpTo(allSections.length - 1);
    }
    if (e.key === 'k' || e.key === 'K' || e.key === 'ArrowUp') {
      const y = window.scrollY;
      for (let i = allSections.length - 1; i >= 0; i--) {
        if (allSections[i].offsetTop < y - 50) { jumpTo(i); return; }
      }
      jumpTo(0);
    }
  });

  // ─── Time-of-day greeting in console (a small touch) ──
  if (!sessionStorage.getItem('ab-console')) {
    sessionStorage.setItem('ab-console', '1');
    const h = new Date().getHours();
    const g = h < 5 ? 'a long night' : h < 12 ? 'good morning' : h < 18 ? 'good afternoon' : 'good evening';
    console.log(
      `%c${g}.\n%cA documentary in eight chapters — Dr. Animesh Biswas, PhD.\n` +
      `Built with care. Use J/K or ↑/↓ to advance through chapters.`,
      'font-family: serif; font-size: 22px; font-style: italic; color: #c8a96e;',
      'font-family: monospace; font-size: 11px; color: #ece6d8;'
    );
  }
})();

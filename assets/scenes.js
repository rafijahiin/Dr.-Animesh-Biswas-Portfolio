/* ──────────────────────────────────────────────
   scenes.js — GSAP ScrollTrigger orchestration
   ──────────────────────────────────────────────
   - Nav reveal on scroll
   - Top progress bar
   - Reveal observer (.rv)
   - Smooth-scroll anchors
   - Chapter card pin + dissolve as content rises
   - Focus chapter: horizontal pinned scroll
   - Impact: pinned, staggered counter reveals
   - Publications: line-draw reveal
   - Field & Moments: parallax + entry
   - Hero parallax on scroll
   ────────────────────────────────────────────── */
(() => {
  'use strict';

  if (!window.gsap) {
    console.warn('GSAP not loaded — animations disabled.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // ─── progress bar + nav reveal ─────────────────
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const total = () => document.documentElement.scrollHeight - window.innerHeight;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy > 80) nav?.classList.add('on'); else nav?.classList.remove('on');
    if (progress) progress.style.transform = `scaleX(${Math.max(0, Math.min(1, sy / total()))})`;
  }, { passive: true });

  // ─── Smooth anchor jumps ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 0, behavior: 'smooth' });
    });
  });

  // ─── Reveal observer (lightweight, non-GSAP) ───
  const ro = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.rv').forEach(el => ro.observe(el));

  // ─── Counter for impact cells ──────────────────
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const cell = en.target;
      const numEl = cell.querySelector('[data-num]');
      const target = +cell.dataset.target;
      if (!numEl || !target) return;
      const dur = 1800;
      const start = performance.now();
      cell.classList.add('lit');
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - t, 4);
        numEl.textContent = Math.floor(e * target);
        if (t < 1) requestAnimationFrame(step);
        else numEl.textContent = target;
      };
      requestAnimationFrame(step);
      counterIO.unobserve(cell);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.impact-cell').forEach(c => counterIO.observe(c));

  // ─── Hero name parallax + fade as user scrolls ─
  gsap.to('.hero-name', {
    yPercent: -25,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    }
  });
  gsap.to('.hero-meta', {
    yPercent: 40,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: '20% top',
      end: 'bottom top',
      scrub: 1.2,
    }
  });

  // ─── Chapter card pin → content rises ──────────
  document.querySelectorAll('.chapter').forEach((chap, idx) => {
    const card = chap.querySelector('.chapter-card');
    if (!card) return;
    const inner = card.querySelector('.chapter-card-inner');
    const num = card.querySelector('.chapter-card-num');
    const line = card.querySelector('.chapter-card-line');
    const title = card.querySelector('.chapter-card-title');
    const sub = card.querySelector('.chapter-card-sub');
    const coord = card.querySelector('.chapter-card-coord');

    // Pre-stage
    gsap.set([num, sub, coord], { autoAlpha: 0, y: 30 });
    gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
    gsap.set(title, { autoAlpha: 0, y: 80 });

    // Entry timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      }
    });
    tl.to(num,   { autoAlpha: 1, y: 0, duration: 0.4 })
      .to(line,  { scaleY: 1, duration: 0.6 }, '-=0.15')
      .to(title, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to(sub,   { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.45')
      .to(coord, { autoAlpha: 1, y: 0, duration: 0.4 }, '-=0.3');

    // Exit — slow rise + fade as content comes in
    gsap.to(inner, {
      y: -120,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'center 30%',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
  });

  // ─── Ch1 portrait parallax ─────────────────────
  if (document.querySelector('.ch1-portrait-frame')) {
    gsap.fromTo('.ch1-portrait-frame', { y: 60 }, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.ch1-stage',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.4,
      }
    });
  }

  // ─── Ch2 horizontal pinned focus scroll ────────
  const focusPin = document.querySelector('.focus-pin');
  const focusTrack = document.getElementById('focus-track');
  const focusFill  = document.getElementById('focus-rail-fill');
  if (focusPin && focusTrack) {
    const computeDistance = () => focusTrack.scrollWidth - window.innerWidth + 80;
    let distance = computeDistance();

    const st = ScrollTrigger.create({
      trigger: focusPin,
      start: 'top top',
      end: () => `+=${computeDistance() + 200}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(focusTrack, { x: -self.progress * computeDistance() });
        if (focusFill) focusFill.style.width = `${Math.max(8, self.progress * 100)}%`;
      }
    });
    window.addEventListener('resize', () => { distance = computeDistance(); st.refresh(); });
  }

  // ─── Ch3 impact entry stagger ──────────────────
  gsap.from('.impact-cell', {
    y: 70,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.impact-stage',
      start: 'top 70%',
    }
  });

  // ─── Ch4 pub rows line-draw entry ──────────────
  gsap.utils.toArray('.pub-row').forEach((row, i) => {
    gsap.from(row, {
      y: 40, opacity: 0, duration: 0.85,
      ease: 'power3.out',
      delay: i * 0.07,
      scrollTrigger: { trigger: row, start: 'top 88%' }
    });
  });

  // ─── Ch5 field cards entry ─────────────────────
  gsap.from('.field-card', {
    y: 60,
    opacity: 0,
    duration: 0.95,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.chapter-field',
      start: 'top 70%',
    }
  });

  // ─── Ch6 moments entry stagger ─────────────────
  gsap.from('.moments-item', {
    scale: 0.95,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.moments-grid',
      start: 'top 75%',
    }
  });

  // Subtle parallax inside moments placeholders
  gsap.utils.toArray('.moments-item').forEach((item) => {
    const ph = item.querySelector('.placeholder');
    if (!ph) return;
    gsap.fromTo(ph, { y: -20 }, {
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      }
    });
  });

  // ─── Contact CTA reveal ───────────────────────
  gsap.from('.contact-cta-row', {
    y: 100,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%',
    }
  });
  gsap.from('.contact-btn', {
    y: 30, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact', start: 'top 60%' }
  });
  gsap.from('.contact-col', {
    y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.contact-grid', start: 'top 85%' }
  });

  // ─── Focus card 3D tilt on hover ───────────────
  document.querySelectorAll('.focus-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 8;
      card.style.transition = 'transform 0.2s ease-out, border-color 0.5s, background 0.5s';
      card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(.76,0,.24,1), border-color 0.5s, background 0.5s';
      card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });

  // Force a final refresh once preloader has fully released layers
  window.addEventListener('preloader:done', () => {
    setTimeout(() => ScrollTrigger.refresh(), 200);
  });
  window.addEventListener('load', () => {
    setTimeout(() => ScrollTrigger.refresh(), 400);
  });

})();

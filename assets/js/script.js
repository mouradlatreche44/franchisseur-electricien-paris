/* ===========================================
   FRANCHISSEUR — Interactions
   =========================================== */

(function () {
  'use strict';

  // ---------------------------
  // Header scroll state
  // ---------------------------
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------------------------
  // Mobile menu
  // ---------------------------
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) {
    const toggle = () => {
      mobileBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };
    mobileBtn.addEventListener('click', toggle);
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', toggle));
  }

  // ---------------------------
  // Scroll-reveal (IntersectionObserver)
  // ---------------------------
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------------------------
  // Hero parallax (subtle)
  // ---------------------------
  const heroBg = document.getElementById('heroBg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const onParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const offset = Math.min(window.scrollY * 0.25, 200);
          heroBg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.05)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    onParallax();
  }

  // ---------------------------
  // Smooth anchor offset for fixed header
  // ---------------------------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------------------------
  // Year in footer
  // ---------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------------------
  // Contact form — enhanced UX (still posts to FormSubmit)
  // ---------------------------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Envoi en cours…';
        btn.style.opacity = '0.7';
      }
    });
  }
})();

// === Theme Toggle ===
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  updateIcon();

  t && t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', d);
    t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
    updateIcon();
  });

  function updateIcon() {
    if (!t) return;
    t.innerHTML = d === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// === Mobile Menu ===
(function () {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.header__nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// === Scroll Animation (Intersection Observer) ===
(function () {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all section content
  document.querySelectorAll('.section-header, .info-card, .service-card, .partner-card, .leader-card, .funding-item, .timeline-item, .assessment-card, .highlight-box, .chart-container, .table-wrapper').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
})();

// === Active Nav Link on Scroll ===
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.background = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--color-primary)';
            link.style.background = 'var(--color-primary-light)';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
})();

// === Header scroll behavior ===
(function () {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();

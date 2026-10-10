/**
 * Saikrishna Rajan — Portfolio JavaScript
 * Handles SceneAI theme switcher, navigation, mobile menu,
 * certificate lightbox modal, and smooth interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark mode)
  initTheme();

  // 2. Navigation, Sticky Header & Mobile Toggle
  initNavigation();

  // 3. Scroll to Top Button
  initScrollTop();

  // 4. Certificate Lightbox Modal
  initCertificateModal();

  // 5. Contact Form Feedback
  initContactForm();
});

/* =========================================================================
   1. Theme Management
   ========================================================================= */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const currentTheme = savedTheme ? savedTheme : 'light';

  applyTheme(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/* =========================================================================
   2. Navigation & Mobile Menu
   ========================================================================= */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const pillMenu = document.querySelector('.nav-pill-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // ScrollSpy active link highlighting
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation toggle
  if (navToggle && pillMenu) {
    navToggle.addEventListener('click', () => {
      const isVisible = pillMenu.style.display === 'flex';
      pillMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        pillMenu.style.position = 'absolute';
        pillMenu.style.top = 'var(--nav-height)';
        pillMenu.style.left = '1.5rem';
        pillMenu.style.right = '1.5rem';
        pillMenu.style.flexDirection = 'column';
        pillMenu.style.padding = '1rem';
        pillMenu.style.background = 'var(--bg-card)';
        pillMenu.style.boxShadow = 'var(--shadow-lg)';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          pillMenu.style.display = 'none';
        }
      });
    });
  }
}

/* =========================================================================
   3. Scroll to Top Button
   ========================================================================= */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================================================
   4. Certificate Lightbox Modal
   ========================================================================= */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-cert-img');
  const modalTitle = document.getElementById('modal-cert-title');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggers = document.querySelectorAll('.cert-preview-trigger');

  if (!modal || !modalImg || !closeBtn) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-img');
      const title = trigger.getAttribute('data-title');
      if (imgSrc) {
        modalImg.src = imgSrc;
        modalTitle.textContent = title || 'Certificate Preview';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* =========================================================================
   5. Contact Form Handling
   ========================================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Opening Mail Client...</span>';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }
  });
}

/**
 * Modern Portfolio Website - Main JavaScript
 * Handles theme toggling, navigation, typewriter effect, 
 * project filtering, stats counter, and interactive form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark/Light)
  initTheme();

  // 2. Navigation & Mobile Menu
  initNavigation();

  // 3. Typewriter Effect in Hero
  initTypewriter();

  // 4. Project Category Filtering
  initProjectFilter();

  // 5. Animated Counter for Stats
  initStatsCounter();

  // 6. Contact Form Handling
  initContactForm();

  // 7. Scroll to Top Button
  initScrollTop();

  // 8. Certificate Modal Lightbox
  initCertificateModal();
});

/* =========================================================================
   1. Theme Management (Light / Dark mode)
   ========================================================================= */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

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
   2. Navigation, Sticky Header, & ScrollSpy
   ========================================================================= */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll shadow / blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // ScrollSpy active link highlight
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* =========================================================================
   3. Typewriter Effect
   ========================================================================= */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  const roles = [
    '2nd Year AIML Student',
    'AI Developer Intern @ ANTYK',
    'Research Paper Presenter',
    'Python, C, C++, Java Programmer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* =========================================================================
   4. Project Category Filtering
   ========================================================================= */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =========================================================================
   5. Animated Number Counter for Stats
   ========================================================================= */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1500;
          const increment = Math.ceil(target / (duration / 30));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = target + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = count + suffix;
            }
          }, 30);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* =========================================================================
   6. Contact Form Submission Handling
   ========================================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toastMsg = document.getElementById('toast-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !toastMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic form validation check
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Set loading state on button
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      Sending...
    `;

    // Simulate sending email (Replace with Formspree, EmailJS, or your backend)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      showToast('Thank you! Your message has been sent successfully.', 'success');
    }, 1200);
  });

  function showToast(message, type) {
    toastMsg.textContent = message;
    toastMsg.className = `toast-msg ${type}`;

    setTimeout(() => {
      toastMsg.className = 'toast-msg';
      toastMsg.textContent = '';
    }, 4500);
  }
}

/* =========================================================================
   7. Scroll to Top Button
   ========================================================================= */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =========================================================================
   8. Certificate Lightbox Modal
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
      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
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

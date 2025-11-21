// Portfolio JavaScript - Main Script
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('.nav-mobile .nav-link');

  // Toggle menu
  function toggleMenu() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }

  // Close menu
  function closeMenu() {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners for menu
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      closeMenu();
    });
  });

  // ========================================
  // Image Modal
  // ========================================
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  // Make openModal available globally
  window.openModal = function(imgElement) {
    if (modal && modalImg) {
      modal.classList.add('active');
      modalImg.src = imgElement.src;
      modalImg.alt = imgElement.alt;
      document.body.style.overflow = 'hidden';
    }
  };

  // Make closeModal available globally
  window.closeModal = function() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal when clicking outside image
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ========================================
  // Scroll to Top Button
  // ========================================
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', function() {
    if (scrollTopBtn) {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // Header Shadow on Scroll
  // ========================================
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (header) {
      if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      }
    }
  });

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Don't prevent default if href is just \"#\"
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Animate Skill Bars on Scroll
  // ========================================
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (barPosition < screenPosition) {
        bar.style.width = bar.style.width || '0%';
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars(); // Initial check

  // ========================================
  // Form Submission Handler
  // ========================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Here you would typically send the data to a server
      // For now, just show a success message
      alert('Terima kasih! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // ========================================
  // Active Navigation Link
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  
  function setActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  // ========================================
  // Lazy Load Images (if needed)
  // ========================================
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ========================================
  // Console Welcome Message
  // ========================================
  console.log('%c👋 Welcome to my Portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
  console.log('%cDeveloped by Danuyasa', 'color: #8b5cf6; font-size: 14px;');
});
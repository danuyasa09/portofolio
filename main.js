// Portfolio JavaScript - Main Script
// ========================================

// Pastikan DOM sudah dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // 1. Mobile Menu Toggle
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('.nav-mobile .nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ========================================
  // 2. EmailJS Form Handler (Sudah Diperbaiki)
  // ========================================
  // Inisialisasi EmailJS dengan Public Key Anda
  emailjs.init("xGKw1ErzVDC7IkZYU");

  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      // Gunakan ID Service dan ID Template dari dashboard EmailJS Anda
      emailjs.sendForm(
        "service_aeb9lgm", // Service ID
        "template_v4kmpsh",         // Template ID
        this               // Mengirimkan elemen form itu sendiri
      )
      .then(() => {
        alert("Pesan berhasil dikirim! Saya akan segera menghubungi Anda.");
        form.reset(); // Mengosongkan form setelah berhasil
      })
      .catch((error) => {
        alert("Gagal mengirim pesan! Silakan cek koneksi atau konfigurasi EmailJS Anda.");
        console.error("EmailJS Error:", error);
      });
    });
  }

  // ========================================
  // 3. Image Modal (Galeri)
  // ========================================
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  window.openModal = function(imgElement) {
    if (modal && modalImg) {
      modal.classList.add('active');
      modalImg.src = imgElement.src;
      modalImg.alt = imgElement.alt;
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ========================================
  // 4. Scroll Effects & Navigation
  // ========================================
  const scrollTopBtn = document.getElementById('scrollTop');
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    // Tombol Scroll ke Atas
    if (scrollTopBtn) {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Shadow Header saat scroll
    if (header) {
      if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      }
    }
    
    setActiveNav();
    animateSkillBars();
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth Scroll untuk link anchor
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // Animasi Skill Bar
  const skillBars = document.querySelectorAll('.skill-progress');
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (barPosition < screenPosition) {
        // Bar akan melebar sesuai width yang ada di inline style HTML
        bar.style.opacity = '1';
      }
    });
  }

  // Set Navigasi Aktif berdasarkan posisi scroll
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

  // ========================================
  // 5. Konsol & Inisialisasi Awal
  // ========================================
  console.log('%c👋 Welcome to my Portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
  animateSkillBars(); // Jalankan sekali saat load
});
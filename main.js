/* ===================================================
   MAIN.JS — CINEMATIC ENGINEERING PORTFOLIO
   =================================================== */

import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------- UTILITIES ----------
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- DOM READY ----------
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initHero();
  initScrollAnimations();
  initAchievementGallery();
  initContactVideo();

  if (!isTouchDevice()) {
    initCustomCursor();
  }
});


/* ===================================================
   LOADER
   =================================================== */
function initLoader() {
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Fallback: remove loader after 3 seconds max
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 3000);
}


/* ===================================================
   NAVIGATION
   =================================================== */
function initNavigation() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 80);
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


/* ===================================================
   HERO
   =================================================== */
function initHero() {
  const video = document.getElementById('heroVideo');

  // Video fade in
  if (video) {
    const onVideoReady = () => {
      video.classList.add('loaded');
      startHeroAnimation();
    };

    if (video.readyState >= 3) {
      onVideoReady();
    } else {
      video.addEventListener('canplay', onVideoReady, { once: true });
      // Fallback
      setTimeout(onVideoReady, 2000);
    }
  } else {
    startHeroAnimation();
  }

  // Hero parallax on scroll
  if (!prefersReducedMotion() && !isTouchDevice()) {
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.querySelector('.hero-video-wrap');

    gsap.to(heroContent, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(heroVideo, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Darken overlay on scroll
    gsap.to('.hero-overlay', {
      opacity: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}


function startHeroAnimation() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const tl = gsap.timeline({ delay: 0.3 });

  tl.to('.hero-line-1', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'expo.out',
  })
  .to('.hero-line-2', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'expo.out',
  }, '-=0.8')
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
  }, '-=0.6')
  .to('.hero-tags', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
  }, '-=0.5')
  .to('.hero-desc', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
  }, '-=0.5')
  .to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
  }, '-=0.4')
  .to('.hero-scroll', {
    opacity: 1,
    duration: 0.8,
    ease: 'expo.out',
  }, '-=0.3')
  .to('.hero-status', {
    opacity: 1,
    duration: 0.8,
    ease: 'expo.out',
  }, '-=0.6');
}


/* ===================================================
   SCROLL ANIMATIONS
   =================================================== */
function initScrollAnimations() {
  if (prefersReducedMotion()) {
    // Show everything immediately
    document.querySelectorAll('.reveal-text, .reveal-up').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  // Reveal text blocks
  const revealTextElements = document.querySelectorAll('.reveal-text');
  revealTextElements.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        el.classList.add('revealed');
        // Also trigger children spans with GSAP for staggered effect
        const spans = el.querySelectorAll('span');
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
        });
      },
    });
  });

  // Reveal up elements
  const revealUpElements = document.querySelectorAll('.reveal-up');
  revealUpElements.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
        });
      },
    });
  });

  // Section numbers parallax
  if (!isTouchDevice()) {
    document.querySelectorAll('.section-number').forEach(num => {
      gsap.to(num, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: num.closest('.section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  // About image parallax
  if (!isTouchDevice()) {
    const aboutImg = document.querySelector('.about-image');
    if (aboutImg) {
      gsap.to(aboutImg, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-image-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }

  // Project images — scale in
  document.querySelectorAll('.project-image-wrap').forEach(wrap => {
    gsap.from(wrap.querySelector('.project-image'), {
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Spotlight image zoom on scroll
  const spotlightImg = document.querySelector('.spotlight-bg-img');
  if (spotlightImg && !isTouchDevice()) {
    gsap.to(spotlightImg, {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.spotlight',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}


/* ===================================================
   ACHIEVEMENT GALLERY — DRAG SCROLL
   =================================================== */
function initAchievementGallery() {
  const gallery = document.getElementById('achievementGallery');
  if (!gallery || isTouchDevice()) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.style.cursor = 'grabbing';
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.style.cursor = 'grab';
  });

  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.style.cursor = 'grab';
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    gallery.scrollLeft = scrollLeft - walk;
  });

  gallery.style.cursor = 'grab';
}


/* ===================================================
   CONTACT VIDEO — LAZY LOAD
   =================================================== */
function initContactVideo() {
  const contactVideo = document.querySelector('.contact-video');
  if (!contactVideo || isTouchDevice()) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactVideo.play().catch(() => {});
        observer.unobserve(contactVideo);
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(contactVideo);
}


/* ===================================================
   CUSTOM CURSOR
   =================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  // Show cursor on first mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursor.classList.contains('visible')) {
      cursor.classList.add('visible');
    }
  });

  // Smooth follow with RAF
  function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    cursor.style.transform = `translate(${cursorX - cursor.offsetWidth / 2}px, ${cursorY - cursor.offsetHeight / 2}px)`;
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Hover states
  document.querySelectorAll('[data-cursor="link"]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('link-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('link-hover'));
  });

  document.querySelectorAll('[data-cursor="img"]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('img-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('img-hover'));
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
  document.addEventListener('mouseenter', () => cursor.classList.add('visible'));
}

// UltraGC Foundation - Main JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const header = document.querySelector('.header');
      if (!header.contains(event.target) && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Smooth fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-fade attribute
  document.querySelectorAll('[data-fade]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
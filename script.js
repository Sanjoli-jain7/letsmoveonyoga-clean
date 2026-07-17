// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all others
      document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Floating WhatsApp Button (injected on every page)
  if (!document.querySelector('.whatsapp-float')) {
    const waLink = document.createElement('a');
    waLink.href = 'https://wa.me/message/NDRDUDFY6DM6O1';
    waLink.className = 'whatsapp-float';
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    waLink.setAttribute('aria-label', 'Chat with us on WhatsApp');
    waLink.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path><path d="M12.001 2.002C6.478 2.002 2 6.48 2 12.003c0 1.949.542 3.83 1.567 5.462L2 22l4.657-1.535a9.945 9.945 0 0 0 5.344 1.538h.004c5.523 0 10.001-4.478 10.001-10.001 0-2.671-1.04-5.182-2.929-7.071A9.936 9.936 0 0 0 12.001 2.002zm0 18.017h-.003a8.32 8.32 0 0 1-4.246-1.16l-.305-.181-3.156 1.04 1.055-3.076-.198-.316a8.318 8.318 0 0 1-1.276-4.323c0-4.6 3.742-8.342 8.334-8.342a8.29 8.29 0 0 1 5.9 2.445 8.278 8.278 0 0 1 2.436 5.9c-.002 4.6-3.744 8.343-8.341 8.343z"></path></svg>';
    document.body.appendChild(waLink);
  }
});

  // Video Playback Logic
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    const video = card.querySelector('video');
    const overlay = card.querySelector('.video-poster-overlay');
    
    if (video && overlay) {
      overlay.addEventListener('click', () => {
        // Pause all other videos
        document.querySelectorAll('video').forEach(v => {
          if (v !== video) {
            v.pause();
            const otherOverlay = v.parentElement.querySelector('.video-poster-overlay');
            if (otherOverlay) otherOverlay.style.display = 'flex';
          }
        });

        if (video.paused) {
          video.setAttribute('controls', 'true');
          video.play();
          overlay.style.display = 'none';
        }
      });

      video.addEventListener('pause', () => {
        overlay.style.display = 'flex';
      });
    }
  });

  // Testimonial Slider Logic
  const track = document.getElementById('testimonialTrack');
  if (track) {
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    let currentIndex = 0;
    let autoAdvance;

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });
      
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });
    }

    const startInterval = () => {
      autoAdvance = setInterval(nextSlide, 5000);
    };

    const resetInterval = () => {
      clearInterval(autoAdvance);
      startInterval();
    };

    const sliderContainer = document.querySelector('.testimonial-slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    sliderContainer.addEventListener('mouseleave', startInterval);

    startInterval();
  }

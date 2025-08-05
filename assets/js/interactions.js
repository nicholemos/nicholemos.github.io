// Advanced Interactions and Animations

class AdvancedInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollProgress();
    this.setupScrollAnimations();
    this.setupParallax();
    this.setupSmoothScrolling();
    this.setupRippleEffect();
    this.setupLoadingAnimation();
    this.setupCursorEffects();
    this.setupTypingEffect();
    this.setupCounterAnimation();
  }

  // Scroll Progress Bar
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // Enhanced Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Add stagger effect for children
          if (entry.target.classList.contains('stagger-animation')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);

    // Observe elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    // Observe sections for stagger animations
    document.querySelectorAll('.stagger-animation').forEach(el => {
      observer.observe(el);
    });
  }

  // Parallax Effect
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const rate = scrolled * -0.5;
          element.style.transform = `translateY(${rate}px)`;
        });
      });
    }

    // Hero parallax
    const hero = document.querySelector('#hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  // Enhanced Smooth Scrolling
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('#header').offsetWidth > 0 ? 0 : 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          // Custom smooth scroll with easing
          this.smoothScrollTo(targetPosition, 1000);
        }
      });
    });
  }

  smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, start + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  // Ripple Effect for Buttons
  setupRippleEffect() {
    document.querySelectorAll('.ripple').forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Loading Animation
  setupLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        document.body.classList.add('loaded');
        
        setTimeout(() => {
          loadingOverlay.remove();
        }, 500);
      }, 1000);
    });
  }

  // Custom Cursor Effects
  setupCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hover effects
    document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
      });
    });

    // Add cursor CSS
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
      .custom-cursor {
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
      }
      
      .cursor-follower {
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.5;
      }
      
      .custom-cursor.cursor-hover {
        transform: scale(2);
      }
      
      .cursor-follower.cursor-hover {
        transform: scale(1.5);
        opacity: 0.8;
      }
      
      @media (max-width: 768px) {
        .custom-cursor,
        .cursor-follower {
          display: none;
        }
      }
    `;
    document.head.appendChild(cursorStyle);
  }

  // Enhanced Typing Effect
  setupTypingEffect() {
    const typedElement = document.querySelector('.typed');
    if (typedElement) {
      const strings = typedElement.getAttribute('data-typed-items').split(',');
      let currentString = 0;
      let currentChar = 0;
      let isDeleting = false;

      const typeSpeed = 100;
      const deleteSpeed = 50;
      const pauseTime = 2000;

      const type = () => {
        const current = strings[currentString];
        
        if (isDeleting) {
          typedElement.textContent = current.substring(0, currentChar - 1);
          currentChar--;
        } else {
          typedElement.textContent = current.substring(0, currentChar + 1);
          currentChar++;
        }

        let speed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && currentChar === current.length) {
          speed = pauseTime;
          isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
          isDeleting = false;
          currentString = (currentString + 1) % strings.length;
        }

        setTimeout(type, speed);
      };

      type();
    }
  }

  // Counter Animation
  setupCounterAnimation() {
    const counters = document.querySelectorAll('.purecounter');
    
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-purecounter-end'));
          const duration = parseInt(counter.getAttribute('data-purecounter-duration')) * 1000;
          
          this.animateCounter(counter, 0, target, duration);
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOutCubic);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = end;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
}

// Utility Functions
class Utils {
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedInteractions();
  
  // Add scroll-animate class to elements that should animate on scroll
  document.querySelectorAll('.section-title, .modern-card, .portfolio-item').forEach(el => {
    el.classList.add('scroll-animate');
  });
  
  // Add stagger animation to portfolio grid
  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (portfolioGrid) {
    portfolioGrid.classList.add('stagger-animation');
  }
});


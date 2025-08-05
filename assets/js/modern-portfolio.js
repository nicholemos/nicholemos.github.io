// Modern Portfolio Gallery JavaScript

class ModernPortfolio {
  constructor() {
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    this.portfolioFilters = document.querySelectorAll('.portfolio-filter');
    this.lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    
    this.init();
  }

  init() {
    this.setupFilters();
    this.setupLightbox();
    this.setupAnimations();
    this.setupHoverEffects();
  }

  setupFilters() {
    this.portfolioFilters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all filters
        this.portfolioFilters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        filter.classList.add('active');
        
        // Get filter value
        const filterValue = filter.getAttribute('data-filter');
        
        // Filter portfolio items
        this.filterItems(filterValue);
      });
    });
  }

  filterItems(filterValue) {
    this.portfolioItems.forEach(item => {
      if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
        item.style.display = 'block';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Animate in
        setTimeout(() => {
          item.style.transition = 'all 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100);
      } else {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  setupLightbox() {
    // Create lightbox HTML
    const lightboxHTML = `
      <div class="portfolio-lightbox" id="portfolioLightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" id="lightboxClose">
            <i class="bi bi-x"></i>
          </button>
          <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="lightbox-nav lightbox-next" id="lightboxNext">
            <i class="bi bi-chevron-right"></i>
          </button>
          <img src="" alt="" id="lightboxImage">
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('portfolioLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Setup lightbox triggers
    this.lightboxTriggers.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Collect all images
        images = Array.from(this.lightboxTriggers).map(t => t.getAttribute('href'));
        currentImageIndex = index;
        
        // Show lightbox
        this.showLightbox(lightbox, lightboxImage, images[currentImageIndex]);
      });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', () => {
      this.hideLightbox(lightbox);
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        this.hideLightbox(lightbox);
      }
    });
    
    // Navigation
    lightboxPrev.addEventListener('click', () => {
      currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      lightboxImage.src = images[currentImageIndex];
    });
    
    lightboxNext.addEventListener('click', () => {
      currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      lightboxImage.src = images[currentImageIndex];
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          this.hideLightbox(lightbox);
        } else if (e.key === 'ArrowLeft') {
          lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
          lightboxNext.click();
        }
      }
    });
  }

  showLightbox(lightbox, lightboxImage, imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideLightbox(lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe portfolio items
    this.portfolioItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'all 0.6s ease';
      observer.observe(item);
    });
  }

  setupHoverEffects() {
    this.portfolioItems.forEach(item => {
      const overlay = item.querySelector('.portfolio-overlay');
      const image = item.querySelector('img');
      
      item.addEventListener('mouseenter', () => {
        // Add subtle parallax effect
        image.style.transform = 'scale(1.05)';
        
        // Animate overlay elements
        const h3 = overlay.querySelector('h3');
        const p = overlay.querySelector('p');
        const links = overlay.querySelector('.portfolio-links');
        
        setTimeout(() => {
          h3.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
          p.style.transform = 'translateY(0)';
        }, 200);
        
        setTimeout(() => {
          links.style.transform = 'translateY(0)';
        }, 300);
      });
      
      item.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
      });
    });
  }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('#header').offsetWidth > 0 ? 0 : 80;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced typing effect
function enhanceTypingEffect() {
  const typedElement = document.querySelector('.typed');
  if (typedElement) {
    // Add cursor blinking effect
    typedElement.style.borderRight = '2px solid';
    typedElement.style.animation = 'blink 1s infinite';
    
    // Add CSS for blinking cursor
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: currentColor; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Parallax effect for hero section
function setupParallax() {
  const hero = document.querySelector('#hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Enhanced scroll animations
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modern portfolio
  new ModernPortfolio();
  
  // Setup additional features
  setupSmoothScrolling();
  enhanceTypingEffect();
  setupParallax();
  setupScrollAnimations();
  
  // Add loading animation
  document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
  
  .portfolio-item {
    transition: all 0.3s ease;
  }
  
  .portfolio-item:hover {
    transform: translateY(-8px);
  }
`;
document.head.appendChild(loadingStyle);


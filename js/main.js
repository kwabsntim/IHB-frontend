// ==================== CONFIGURATION ====================
const CONFIG = {
  WIGGLE_DURATION: 2200,
  NAV_WIGGLE_DELAY: 1000,
  TYPING_SPEED: 100,
  TYPING_TEXT: "🚚 Interested in the service? Click Book Now at the top!",
  MOBILE_BREAKPOINT: 768,
  API_ENDPOINT: 'https://ihb-transport-dk.onrender.com/api/public/deliveries'
};

// ==================== UTILITY FUNCTIONS ====================
const Utils = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  isMobile() {
    return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
  },

  scrollToElement(element, offset = 100) {
    if (!this.isMobile()) return;
    
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

    window.scrollTo({
      top: middle - offset,
      behavior: 'smooth'
    });
  },

  createIntersectionObserver(callback, options = {}) {
    const defaultOptions = { threshold: 0.5 };
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
  }
};

// ==================== ANIMATION MANAGER ====================
const AnimationManager = {
  navWiggleDone: false,
  navWigglePromise: null,
  navWigglePromiseResolve: null,

  ensureNavWigglePromise() {
    if (!this.navWigglePromise) {
      this.navWigglePromise = new Promise(resolve => {
        this.navWigglePromiseResolve = resolve;
      });
    }
  },

  wiggleOnce(element, duration = CONFIG.WIGGLE_DURATION) {
    if (!element) return;
    
    element.classList.remove('btn-wiggle-once');
    void element.offsetWidth; // Force reflow
    element.classList.add('btn-wiggle-once');
    
    setTimeout(() => element.classList.remove('btn-wiggle-once'), duration + 50);
  },

  shakeOnce(element) {
    if (!element) return;
    
    element.classList.remove('btn-pop');
    void element.offsetWidth;
    element.classList.add('btn-pop');
    
    setTimeout(() => element.classList.remove('btn-pop'), 700);
  },

  createTypingAnimation() {
    if (document.querySelector('.typing-container')) return;

    const container = document.createElement('div');
    container.className = 'typing-container';
    container.innerHTML = '<div class="typing-text"></div>';

    const processContainer = document.querySelector('.process-container');
    const insertTarget = processContainer || document.querySelector('.how-it-works-section');
    
    if (processContainer) {
      processContainer.parentNode.insertBefore(container, processContainer.nextSibling);
    } else if (insertTarget) {
      insertTarget.appendChild(container);
    }

    if (Utils.isMobile()) {
      setTimeout(() => {
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    }

    this.typeWriter(container.querySelector('.typing-text'), CONFIG.TYPING_TEXT);
  },

  typeWriter(element, text, index = 0) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => this.typeWriter(element, text, index + 1), CONFIG.TYPING_SPEED);
    } else {
      element.innerHTML += '<span class="cursor">|</span>';
      setTimeout(() => this.triggerPostTypingActions(), 500);
    }
  },

  triggerPostTypingActions() {
    const bookNowBtn = document.querySelector('.nav-cta');
    const mobileBookBtn = document.querySelector('.mobile-book-btn');

    if (bookNowBtn) {
      this.wiggleOnce(bookNowBtn);
      this.ensureNavWigglePromise();
      setTimeout(() => {
        this.navWiggleDone = true;
        if (this.navWigglePromiseResolve) this.navWigglePromiseResolve();
      }, CONFIG.WIGGLE_DURATION + 50);
    } else {
      this.navWiggleDone = true;
    }

    if (mobileBookBtn) this.wiggleOnce(mobileBookBtn);
  }
};

// ==================== NAVBAR HANDLER ====================
const NavbarHandler = {
  isScrolled: false,

  init() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', Utils.throttle(() => {
      const shouldBeScrolled = window.scrollY > 50;
      
      if (shouldBeScrolled !== this.isScrolled) {
        this.isScrolled = shouldBeScrolled;
        navbar.classList.toggle('scrolled', shouldBeScrolled);
      }
    }, 100));
  }
};

// ==================== MOBILE MENU HANDLER ====================
const MobileMenuHandler = {
  init() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
};

// ==================== SMOOTH SCROLL HANDLER ====================
const SmoothScrollHandler = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      });
    }
  }
};

// ==================== FORM HANDLERS ====================
const FormHandlers = {
  initQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;

    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        pickup: document.getElementById('pickup')?.value,
        dropoff: document.getElementById('dropoff')?.value,
        weight: document.getElementById('weight')?.value
      };
      
      sessionStorage.setItem('quoteData', JSON.stringify(formData));
      alert('Quote form submitted! Next: Show full booking form');
    });
  },

  initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = document.getElementById('contactMessage')?.value.trim();
      
      if (message) {
        window.location.href = `mailto:info@ihbtransport.com?subject=Contact%20Request&body=${encodeURIComponent(message)}`;
      }
    });
  },

  initTrackingForm() {
    const trackingForm = document.getElementById('trackingForm');
    if (!trackingForm) return;

    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const requestId = document.getElementById('requestId')?.value.trim();
      
      if (requestId) {
        alert(`Tracking request for ID: ${requestId}\n\nThis feature will be implemented with real tracking functionality.`);
      }
    });
  },

  initBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;

    let errorBox = bookingForm.querySelector('.booking-error');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.className = 'booking-error';
      bookingForm.insertBefore(errorBox, bookingForm.firstChild);
    }

    let overlay = document.querySelector('.booking-loading-overlay');
    if (!overlay) {
      overlay = this.createLoadingOverlay();
    }

    let isSubmitting = false;

    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (isSubmitting) return;
      isSubmitting = true;

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn?.textContent || '';

      errorBox.textContent = '';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      const payload = this.getBookingPayload();
      const validation = this.validateBookingPayload(payload);

      if (!validation.valid) {
        errorBox.textContent = validation.message;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        isSubmitting = false;
        return;
      }

      // Show loading overlay
      overlay.classList.add('visible');

      try {
        const response = await this.submitBooking(payload);
        
        // Stop loader immediately when response is received
        overlay.classList.remove('visible');

        if (response.success) {
          this.showBookingSuccess(bookingForm, submitBtn, originalText, () => {
            isSubmitting = false;
          });
          bookingForm.reset();
        } else {
          throw new Error(response.error || 'Submission failed');
        }

      } catch (err) {
        console.error('Booking error:', err);
        
        // Ensure loader is stopped on error
        overlay.classList.remove('visible');
        
        errorBox.textContent = 'Failed to submit booking: ' + (err.message || 'Unknown error');
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        isSubmitting = false;
      }
    });
  },

  createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'booking-loading-overlay';
    overlay.innerHTML = `
      <div class="booking-loading-inner">
        <div class="booking-spinner" aria-hidden="true"></div>
        <div class="booking-loading-text">Sending booking...</div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  },

  getBookingPayload() {
    const get = (id) => document.getElementById(id)?.value.trim() || '';
    
    return {
      client_name: get('client_name'),
      client_email: get('client_email'),
      pickup_street: get('pickup_street'),
      pickup_city: get('pickup_city'),
      pickup_post_code: get('pickup_post_code'),
      pickup_country: get('pickup_country'),
      dropoff_street: get('dropoff_street'),
      dropoff_city: get('dropoff_city'),
      dropoff_post_code: get('dropoff_post_code'),
      dropoff_country: get('dropoff_country'),
      item_description: get('item_description'),
      items: get('items'),
      weight: get('weight'),
      service: document.getElementById('service')?.value || '',
      pickup_date: document.getElementById('service_date')?.value || ''
    };
  },

  validateBookingPayload(payload) {
    const requiredFields = [
      { key: 'client_name', label: 'Name' },
      { key: 'client_email', label: 'Email' },
      { key: 'pickup_street', label: 'Pickup street' },
      { key: 'pickup_city', label: 'Pickup city' },
      { key: 'pickup_post_code', label: 'Pickup post code' },
      { key: 'dropoff_street', label: 'Service street' },
      { key: 'dropoff_city', label: 'Service city' },
      { key: 'dropoff_post_code', label: 'Service post code' },
      { key: 'item_description', label: 'Item description' },
      { key: 'items', label: 'Items' },
      { key: 'weight', label: 'Weight' },
      { key: 'service', label: 'Service type' },
      { key: 'pickup_date', label: 'Service date' }
    ];

    const missing = requiredFields
      .filter(field => !payload[field.key])
      .map(field => field.label);

    return {
      valid: missing.length === 0,
      message: missing.length ? `Please fill the following fields: ${missing.join(', ')}` : ''
    };
  },

  async submitBooking(payload) {
    try {
      const response = await fetch(CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || `Server responded with ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      // Ensure we stop the loader even on network errors
      throw error;
    }
  },

  showBookingSuccess(form, submitBtn, originalText, onStay) {
    let successBox = form.querySelector('.booking-success');
    
    if (!successBox) {
      successBox = document.createElement('div');
      successBox.className = 'booking-success';
      
      const actions = document.createElement('div');
      actions.className = 'booking-success-actions';
      
      const stayBtn = document.createElement('button');
      stayBtn.type = 'button';
      stayBtn.className = 'btn-primary booking-success-stay';
      stayBtn.textContent = 'Stay on page';
      
      const homeBtn = document.createElement('button');
      homeBtn.type = 'button';
      homeBtn.className = 'btn-secondary booking-success-home';
      homeBtn.textContent = 'Go to homepage';
      
      actions.appendChild(stayBtn);
      actions.appendChild(homeBtn);
      
      const messageDiv = document.createElement('div');
      successBox.appendChild(messageDiv);
      successBox.appendChild(actions);
      
      form.insertBefore(successBox, form.firstChild);

      stayBtn.addEventListener('click', () => {
        successBox.style.display = 'none';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText || 'Submit Booking';
        }
        onStay();
      });

      homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    successBox.firstChild.textContent = 'Booking submitted successfully.';
    successBox.style.display = 'block';

    if (submitBtn) {
      submitBtn.textContent = 'Submitted';
      submitBtn.disabled = true;
    }
  }
};

// ==================== PRICING TOGGLE HANDLER ====================
const PricingHandler = {
  init() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const weekdayPricing = document.querySelector('.weekday-pricing');
    const weekendPricing = document.querySelector('.weekend-pricing');

    if (!toggleBtns.length) return;

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const period = this.getAttribute('data-period');
        
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        if (period === 'weekday') {
          weekdayPricing?.classList.add('active');
          weekendPricing?.classList.remove('active');
        } else if (period === 'weekend') {
          weekdayPricing?.classList.remove('active');
          weekendPricing?.classList.add('active');
        }
      });
    });

    window.addEventListener('resize', Utils.debounce(() => {
      if (window.innerWidth > CONFIG.MOBILE_BREAKPOINT) {
        const hasActive = document.querySelector('.toggle-btn.active');
        if (!hasActive && toggleBtns.length > 0) {
          toggleBtns[0].classList.add('active');
          weekdayPricing?.classList.add('active');
          weekendPricing?.classList.remove('active');
        }
      }
    }, 250));
  }
};

// ==================== ANIMATION OBSERVERS ====================
const AnimationObservers = {
  initBottomButtonShake() {
    const bottomBookBtn = document.querySelector('.pricing-cta .btn-primary');
    if (!bottomBookBtn) return;

    const observer = Utils.createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          AnimationManager.shakeOnce(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(bottomBookBtn);
  },

  initMobileAnimations() {
    if (window.innerWidth > CONFIG.MOBILE_BREAKPOINT) return;

    this.initAboutFeatures();
    this.initMobileBookButton();
    this.initPricingCards();
  },

  initAboutFeatures() {
    const features = document.querySelectorAll('.about-feature');
    if (!features.length) return;

    const observer = Utils.createIntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          const animations = ['slide-in-left', 'slide-in-center', 'slide-in-right'];
          entry.target.classList.add(animations[idx] || 'slide-in-right');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    features.forEach(f => observer.observe(f));
  },

  initMobileBookButton() {
    const mobileBookBtn = document.querySelector('.mobile-book-btn');
    if (!mobileBookBtn) return;

    mobileBookBtn.classList.remove('slide-in-down');
    setTimeout(() => {
      mobileBookBtn.classList.add('slide-in-down');
      setTimeout(() => {
        AnimationManager.wiggleOnce(mobileBookBtn, CONFIG.WIGGLE_DURATION);
      }, 700);
    }, 300);
  },

  initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    const pricingBookBtn = document.querySelector('.pricing-cta .btn-primary');
    
    if (!pricingCards.length || !pricingBookBtn) return;

    const lastCard = pricingCards[pricingCards.length - 1];
    const observer = Utils.createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rotate-in');
          observer.unobserve(entry.target);
          
          if (entry.target === lastCard) {
            pricingBookBtn.classList.remove('btn-bounce');
            setTimeout(() => pricingBookBtn.classList.add('btn-bounce'), 50);
          }
        }
      });
    }, { threshold: 0.1 });

    pricingCards.forEach(card => observer.observe(card));
  },

  initGetQuoteButton() {
    const getQuoteButton = document.querySelector('.quote-form button.btn-primary');
    if (!getQuoteButton) return;

    const wiggleOnce = (el) => {
      if (el.dataset?.wiggled === '1') return;

      if (AnimationManager.navWiggleDone) {
        AnimationManager.wiggleOnce(el, CONFIG.WIGGLE_DURATION);
      } else {
        AnimationManager.ensureNavWigglePromise();
        AnimationManager.navWigglePromise.then(() => {
          AnimationManager.wiggleOnce(el, CONFIG.WIGGLE_DURATION);
        });
      }

      if (el.dataset) el.dataset.wiggled = '1';
    };

    const observer = Utils.createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.dataset?.wiggled !== '1') {
            wiggleOnce(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(getQuoteButton);
  },

  initTestimonials() {
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    if (!cards.length) return;

    const observer = Utils.createIntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const idx = Number(card.dataset.idx) || 0;
          card.style.transitionDelay = (idx * 200) + 'ms';
          card.classList.add('in-view');
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(c => observer.observe(c));
  },

  initFooterTyping() {
    const footer = document.querySelector('footer');
    const typingText = document.getElementById('typingText');
    
    if (!footer || !typingText) return;

    const observer = Utils.createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.typeFooterText(typingText, 'IHB TRANSPORT APS');
          }, 500);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(footer);
  },

  typeFooterText(element, text, index = 0) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => this.typeFooterText(element, text, index + 1), 190);
    }
  }
};

// ==================== HOW IT WORKS SECTION ====================
const HowItWorksHandler = {
  init() {
    const section = document.querySelector('.how-it-works-section');
    const processSteps = document.querySelectorAll('.process-step');
    
    if (!section || !processSteps.length) return;

    const observer = Utils.createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (Utils.isMobile()) {
            this.animateStepsOnScroll(processSteps);
          } else {
            setTimeout(() => this.animateSteps(processSteps), 500);
          }
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  },

  animateSteps(steps) {
    steps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add('active');

        setTimeout(() => {
          step.style.transform = 'translateY(-5px) scale(1.05)';
          setTimeout(() => {
            step.style.transform = 'translateY(0) scale(1)';
          }, 200);
        }, 800);

        if (Utils.isMobile()) {
          setTimeout(() => Utils.scrollToElement(step), 1200);
        }
      }, index * 1500);
    });

    const totalTime = (steps.length * 1500) + 1000;
    setTimeout(() => {
      AnimationManager.createTypingAnimation();

      if (Utils.isMobile()) {
        setTimeout(() => {
          const container = document.querySelector('.typing-container');
          if (container) Utils.scrollToElement(container, 200);
        }, 1500);
      }
    }, totalTime);
  },

  animateStepsOnScroll(steps) {
    const stepObserver = Utils.createIntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('active')) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 300);
        }
      });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

    steps.forEach(step => stepObserver.observe(step));

    let animatedSteps = 0;
    const glowObserver = Utils.createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('active')) {
          entry.target.classList.add('active');
          animatedSteps++;

          if (animatedSteps === steps.length) {
            setTimeout(() => AnimationManager.createTypingAnimation(), 1000);
          }
        }
      });
    }, { threshold: 0.5 });

    steps.forEach(step => glowObserver.observe(step));
  }
};

// ==================== INITIALIZATION ====================
const App = {
  init() {
    // Initialize all modules on DOMContentLoaded
    NavbarHandler.init();
    MobileMenuHandler.init();
    SmoothScrollHandler.init();
    PricingHandler.init();
    
    FormHandlers.initQuoteForm();
    FormHandlers.initContactForm();
    FormHandlers.initTrackingForm();
    FormHandlers.initBookingForm();
    
    AnimationObservers.initBottomButtonShake();
    AnimationObservers.initMobileAnimations();
    AnimationObservers.initGetQuoteButton();
    AnimationObservers.initTestimonials();
    AnimationObservers.initFooterTyping();
    
    HowItWorksHandler.init();
  },

  initOnLoad() {
    // Nav button wiggle after page load
    const navBookButton = document.querySelector('.nav-cta');
    const getQuoteButton = document.querySelector('.quote-form button.btn-primary');
    
    setTimeout(() => {
      if (navBookButton) {
        AnimationManager.wiggleOnce(navBookButton, CONFIG.NAV_WIGGLE_DELAY);
        AnimationManager.ensureNavWigglePromise();
        
        setTimeout(() => {
          AnimationManager.navWiggleDone = true;
          if (AnimationManager.navWigglePromiseResolve) {
            AnimationManager.navWigglePromiseResolve();
          }
        }, CONFIG.WIGGLE_DURATION + 50);
      } else {
        AnimationManager.navWiggleDone = true;
      }

      if (getQuoteButton) {
        const wiggleQuoteBtn = () => {
          AnimationManager.wiggleOnce(getQuoteButton, CONFIG.WIGGLE_DURATION);
          getQuoteButton.dataset.wiggled = '1';
        };

        if (AnimationManager.navWiggleDone) {
          wiggleQuoteBtn();
        } else {
          AnimationManager.ensureNavWigglePromise();
          AnimationManager.navWigglePromise.then(wiggleQuoteBtn);
        }
      }

      const typingDelay = CONFIG.NAV_WIGGLE_DELAY + CONFIG.WIGGLE_DURATION + 250 + CONFIG.WIGGLE_DURATION + 250;
      setTimeout(() => {
        if (!document.querySelector('.typing-container')) {
          try { AnimationManager.createTypingAnimation(); } catch (e) {}
        }
      }, typingDelay);
    }, CONFIG.NAV_WIGGLE_DELAY);
  }
};

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => App.init());
window.addEventListener('load', () => App.initOnLoad());

// Export for global access if needed
window.AnimationManager = AnimationManager;
window.wiggleOnceGlobal = (el, duration) => AnimationManager.wiggleOnce(el, duration);
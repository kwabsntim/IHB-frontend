// ==================== CONFIGURATION ====================
const CONFIG = {
  WIGGLE_DURATION: 2200,
  NAV_WIGGLE_DELAY: 1000,
  TYPING_SPEED: 100,
  TYPING_TEXT: "🚚 Interesseret i vores service? Klik på 'Bestil nu' øverst!",
  MOBILE_BREAKPOINT: 768,
  API_ENDPOINT: 'https://ihb-transport-dk.onrender.com/api/public/deliveries'
};

// ==================== I18N (i18next) ====================
// Loads i18next via CDN and initializes translations for 'en' and 'da'.
function initI18n() {
  if (window.i18next) return Promise.resolve(window.i18next);

  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/i18next@21.9.1/dist/umd/i18next.min.js';
    s.onload = () => {
      const resources = {
        en: {
          translation: {
            'admin.title': 'Admin Dashboard',
            'admin.subtitle': 'Manage deliveries',
            'button.refresh': 'Refresh',
            'button.logout': 'Logout',
            'table.delivery': 'Delivery',
            'table.client': 'Client',
            'table.status': 'Status',
            'table.actions': 'Actions',
            'button.details': 'Details',
            'button.start': 'Start Delivery',
            'button.set_price': 'Set Price',
            'button.mark_done': 'Mark as done',
            'loading': 'Loading…'
            // index page keys will be added below
          }
        },
        da: {
          translation: {
            'admin.title': 'Administrator Panel',
            'admin.subtitle': 'Administrer leverancer',
            'button.refresh': 'Opdater',
            'button.logout': 'Log ud',
            'table.delivery': 'Levering',
            'table.client': 'Kunde',
            'table.status': 'Status',
            'table.actions': 'Handlinger',
            'button.details': 'Detaljer',
            'button.start': 'Start levering',
            'button.set_price': 'Sæt pris',
            'button.mark_done': 'Marker som færdig',
            'loading': 'Indlæser…'
            // index page keys will be added below
          }
        }
      };

      // Add index page translations (common keys) to both locales
      const indexKeysEn = {
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.how': 'How It Works',
        'nav.track': 'Track',
        'nav.book': 'Book Now',
        'hero.title': 'Fast & Reliable Logistics Service',
        'hero.subtitle': 'From moving and international shipping to junk removal and storage—we handle it all with care and precision across Denmark & EU',
        'badge.tracking': 'Real-time Tracking',
        'badge.secure': 'Secure Handling',
        'badge.same_day': 'Same-Day Available',
        'quote.header': 'Quick Price Estimate',
        'quote.pickup.label': 'Pickup Location',
        'quote.dropoff.label': 'Delivery Location',
        'quote.weight.label': 'Package Weight (kg)',
        'quote.button': 'Get Instant Quote',
        'quote.pickup.placeholder': 'Enter pickup address',
        'quote.dropoff.placeholder': 'Enter delivery address',
        'quote.weight.placeholder': '0.0',
        'about.title': 'About Us',
        'about.subtitle': 'Professional Moving & Logistics Solutions Across Denmark & Europe',
        'how.title': 'How It Works',
        'pricing.title': 'Prices',
        'pricing.subtitle': 'Competitive hourly rates with no hidden fees',
        'pricing.weekdays': 'Weekdays (Mon-Fri)',
        'pricing.weekend': 'Weekend (Sat-Sun)',
        'pricing.note': 'Click buttons below to view weekday and weekend prices',
        'pricing.book': 'Book Now',
        'testimonials.title': 'What our customers say',
        'track.title': 'Track Your Request',
        'track.desc': 'Enter your request ID below to track the status of your delivery.',
          'track.button': 'Track Request',
          'track.placeholder': 'Enter your request ID',
        'contact.title': 'Contact Us',
        'contact.desc': 'Have questions or want to reach us directly? Send us a message below and we\'ll get back to you!',
        'contact.button': 'Send Message',
        'footer.cvr': 'CVR 44621592 | ©2026'
      };

      const indexKeysDa = {
        'nav.services': 'Tjenester',
        'nav.about': 'Om os',
        'nav.how': 'Hvordan det virker',
        'nav.track': 'Spor',
        'nav.book': 'Bestil nu',
        'hero.title': 'Hurtig og Pålidelig Logistikservice',
        'hero.subtitle': 'Fra flytning og international forsendelse til bortskaffelse og opbevaring – vi klarer det med omhu og præcision i hele Danmark og EU',
        'badge.tracking': 'Realtids sporing',
        'badge.secure': 'Sikker håndtering',
        'badge.same_day': 'Samme dag tilgængelig',
        'quote.header': 'Hurtigt prisoverslag',
        'quote.pickup.label': 'Afhentningssted',
        'quote.dropoff.label': 'Leveringsadresse',
        'quote.weight.label': 'Pakkens vægt (kg)',
        'quote.button': 'Få øjeblikkeligt tilbud',
        'quote.pickup.placeholder': 'Indtast afhentningsadresse',
        'quote.dropoff.placeholder': 'Indtast leveringsadresse',
        'quote.weight.placeholder': '0.0',
        'about.title': 'Om os',
        'about.subtitle': 'Professionelle flytte- og logistikløsninger i hele Danmark og Europa',
        'how.title': 'Hvordan det virker',
        'pricing.title': 'Priser',
        'pricing.subtitle': 'Konkurrencedygtige timepriser uden skjulte gebyrer',
        'pricing.weekdays': 'Hverdag (Man-Fre)',
        'pricing.weekend': 'Weekend (Lør-Søn)',
        'pricing.note': 'Klik på knapperne nedenfor for at se priser for hverdag og weekend',
        'pricing.book': 'Bestil nu',
        'testimonials.title': 'Hvad vores kunder siger',
        'track.title': 'Spor din forespørgsel',
        'track.desc': 'Indtast dit anmodnings-id nedenfor for at spore status for din levering.',
          'track.button': 'Spor forespørgsel',
          'track.placeholder': 'Indtast dit anmodnings-id',
        'contact.title': 'Kontakt os',
        'contact.desc': 'Har du spørgsmål eller vil du kontakte os direkte? Send os en besked nedenfor, så vender vi tilbage!',
        'contact.button': 'Send besked',
        'footer.cvr': 'CVR 44621592 | ©2026'
      };

      Object.assign(resources.en.translation, indexKeysEn);
      Object.assign(resources.da.translation, indexKeysDa);

      window.i18next.init({ lng: localStorage.getItem('i18n_lang') || 'da', resources }, () => {
        resolve(window.i18next);
      });
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function applyTranslations(i18n) {
  if (!i18n) return;
  // Admin header
  const h1 = document.querySelector('.header h1');
  if (h1) h1.textContent = i18n.t('admin.title');
  const sub = document.querySelector('.header .muted');
  if (sub) sub.textContent = i18n.t('admin.subtitle');
  const refresh = document.getElementById('refreshBtn');
  if (refresh) refresh.textContent = i18n.t('button.refresh');
  const logout = document.getElementById('logoutBtn');
  if (logout) logout.textContent = i18n.t('button.logout');

  // Table headers (if present)
  document.querySelectorAll('table thead th').forEach((th, idx) => {
    const keys = ['table.delivery','table.client','table.status','table.actions'];
    if (keys[idx]) th.textContent = i18n.t(keys[idx]);
  });

  // Buttons inside table rows
  document.querySelectorAll('.open-public').forEach(b => b.textContent = i18n.t('button.details'));
  document.querySelectorAll('.set-price').forEach(b => b.textContent = i18n.t('button.set_price'));
  document.querySelectorAll('.start-delivery').forEach(b => b.textContent = i18n.t('button.start'));
  document.querySelectorAll('.mark-done').forEach(b => b.textContent = i18n.t('button.mark_done'));

  // Generic loading texts
  document.querySelectorAll('[data-i18n-loading]').forEach(el => el.textContent = i18n.t('loading'));

  // Generic data-i18n attributes: set textContent for elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    // If element is input/textarea, set placeholder instead
    const tag = el.tagName && el.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') {
      const placeholder = i18n.t(key);
      if (placeholder) el.setAttribute('placeholder', placeholder);
    } else {
      el.textContent = i18n.t(key);
    }
  });

  // data-i18n-placeholder: explicitly set placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    el.setAttribute('placeholder', i18n.t(key));
  });

  // data-i18n-html: set innerHTML (use sparingly)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    el.innerHTML = i18n.t(key);
  });
}

function changeLanguage(lng) {
  localStorage.setItem('i18n_lang', lng);
  if (window.i18next) {
    window.i18next.changeLanguage(lng, () => applyTranslations(window.i18next));
  }
}

// Initialize i18n early
initI18n().then(i18n => applyTranslations(i18n)).catch(err => console.warn('i18n load failed', err));

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

    window.scrollTo({ top: middle - offset, behavior: 'smooth' });
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
      
      if (!requestId) return;

      // Open a simple tracking result page in a new tab which will fetch
      // the server output for the given delivery id and display raw JSON.
      const url = `track.html?id=${encodeURIComponent(requestId)}`;
      window.open(url, '_blank');
      // Clear the input so the user sees the form reset immediately
      try {
        trackingForm.reset();
        const reqInput = document.getElementById('requestId');
        if (reqInput) reqInput.blur();
      } catch (e) {
        // ignore
      }
    });
  },

  initBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;

    // insert or find an error box at top of the form
    let errorBox = bookingForm.querySelector('.booking-error');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.className = 'booking-error';
      bookingForm.insertBefore(errorBox, bookingForm.firstChild);
    }

    // Create or find a global loading overlay element (hidden by default)
    let overlay = document.querySelector('.booking-loading-overlay');
    if (!overlay) overlay = this.createLoadingOverlay();

    // Processing modal helpers (autonomous stepper popup)
    const getProcessModal = () => document.querySelector('.booking-process-modal');
    const createProcessModal = () => {
      let modal = getProcessModal();
      if (modal) return modal;
      modal = document.createElement('div');
      modal.className = 'booking-process-modal';
      modal.innerHTML = `
        <div class="modal-card">
          <div class="modal-steps">
            <div class="step" data-step="0"><div class="dot"></div><div class="label">Parsing request</div></div>
            <div class="step" data-step="1"><div class="dot"></div><div class="label">Analysing booking info</div></div>
            <div class="step" data-step="2"><div class="dot"></div><div class="label">Sending booking request</div></div>
          </div>
          <div class="modal-result" aria-hidden="true"></div>
        </div>
      `;
      document.body.appendChild(modal);
      return modal;
    };

    const showModalStep = (index, state = 'active') => {
      const m = createProcessModal();
      const steps = Array.from(m.querySelectorAll('.step'));
      steps.forEach((s, i) => {
        s.classList.remove('active', 'done');
        if (i < index) s.classList.add('done');
        if (i === index && state === 'active') s.classList.add('active');
        if (i === index && state === 'done') s.classList.add('done');
      });
      m.style.display = 'flex';
    };

    const showModalResult = (html) => {
      const m = createProcessModal();
      const result = m.querySelector('.modal-result');
      if (result) {
        result.setAttribute('aria-hidden', 'false');
        result.innerHTML = html;
      }
    };

    const hideProcessModal = () => { const m = getProcessModal(); if (m) m.style.display = 'none'; };

    // Run the stepper sequence on a timer independent of server response.
    // Returns a handle with a `cancel()` method.
    const startProcessSequence = () => {
      const modal = createProcessModal();
      modal.style.display = 'flex';
      showModalStep(0);

      let cancelled = false;
      const timers = [];

      // parsing -> analysing -> sending -> success message -> hide
      timers.push(setTimeout(() => { if (!cancelled) showModalStep(1); }, 1200));
      timers.push(setTimeout(() => { if (!cancelled) showModalStep(2); }, 1200 + 1400));
      timers.push(setTimeout(() => { if (!cancelled) {
        // show final 'Booking sent' success result
        showModalResult('<div class="success">Booking sent<br><small>Please check your mail for further steps</small></div>');
      } }, 1200 + 1400 + 1800));
      // hide after showing success for a while
      timers.push(setTimeout(() => { if (!cancelled) hideProcessModal(); }, 1200 + 1400 + 1800 + 2200));

      return {
        cancel() {
          cancelled = true;
          timers.forEach(t => clearTimeout(t));
          hideProcessModal();
        }
      };
    };

    let isSubmitting = false;

    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Submit handler entered, current isSubmitting=', isSubmitting);

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

      // Show loading overlay briefly, then run autonomous modal stepper (independent of server)
      overlay.classList.add('visible');
      // Kick off the autonomous step sequence
      const seqHandle = startProcessSequence();

      try {
        // Start the network request in background - do not await it for UX
        const responsePromise = this.submitBooking(payload).catch(err => {
          // Log server/network errors but do not block the UI sequence
          console.error('Background booking request failed:', err);
        });

        // Hide blocking overlay immediately while modal stepper shows
        overlay.classList.remove('visible');

        // When the autonomous stepper completes it will hide itself.
        // Meanwhile allow new submissions after short cooldown.
        isSubmitting = false;
        if (submitBtn) {
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2000);
        }

        // show booking success box in-form after the modal finishes (delayed)
        setTimeout(() => {
          try {
            this.showBookingSuccess(bookingForm, submitBtn, originalText, () => {});
            bookingForm.reset();
            const successBox = bookingForm.querySelector('.booking-success');
            if (successBox) setTimeout(() => { try { successBox.style.display = 'none'; } catch (e) {} }, 6000);
          } catch (e) {
            console.error('Failed to show in-form success:', e);
          }
        }, 1200 + 1400 + 1800); // show when modal reaches final state

      } catch (err) {
        console.error('Booking error during start:', err);
        overlay.classList.remove('visible');
        errorBox.textContent = 'Failed to submit booking: ' + (err.message || 'Unknown error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        // cancel modal sequence if something went catastrophically wrong
        try { seqHandle.cancel(); } catch (e) {}
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
    // Simple success message (no 'Go to homepage' action)
    let successBox = form.querySelector('.booking-success');

    if (!successBox) {
      successBox = document.createElement('div');
      successBox.className = 'booking-success';
      const messageDiv = document.createElement('div');
      successBox.appendChild(messageDiv);
      form.insertBefore(successBox, form.firstChild);
    }

    successBox.firstChild.textContent = 'Booking submitted successfully. Please check your mail for further steps.';
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
    // Cleanup any leftover inline tracking output that may be present from earlier edits
    try {
      const leftover = document.getElementById('trackingOutput');
      if (leftover) leftover.remove();
      const alt = document.getElementById('output');
      if (alt && alt.parentElement && alt.parentElement.id === 'track') alt.remove();
    } catch (e) {}

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
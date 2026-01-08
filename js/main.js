// ==================== BOTTOM BUTTONS SHAKE ON IN-VIEW ====================
document.addEventListener('DOMContentLoaded', () => {
    // Select bottom Book Now button only
    const bottomBookBtn = document.querySelector('.pricing-cta .btn-primary');
    const shakeOnce = (el) => {
        console.log('Shaking bottom book button');
        if (!el) return;
        el.classList.remove('btn-pop'); // Remove if present
        // Force reflow to restart animation if needed
        void el.offsetWidth;
        el.classList.add('btn-pop');
        setTimeout(() => el.classList.remove('btn-pop'), 700);
    };
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Bottom book button in view, shaking');
                shakeOnce(entry.target);
                // Only animate once per view
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (bottomBookBtn) {
        console.log('Bottom book button found, observing');
        observer.observe(bottomBookBtn);
    } else {
        console.log('Bottom book button not found');
    }
});
// ==================== PRICING CARDS ROTATE-IN ANIMATION (MOBILE) ====================
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) return;
    // About features slide-in
    const features = document.querySelectorAll('.about-feature');
    if (features.length) {
        const aboutObserver = new window.IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    if (idx === 0) entry.target.classList.add('slide-in-left');
                    else if (idx === 1) entry.target.classList.add('slide-in-center');
                    else entry.target.classList.add('slide-in-right');
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        features.forEach(f => aboutObserver.observe(f));
    }

    // Mobile Book Now Button Slide Down and Wiggle
    const mobileBookBtn = document.querySelector('.mobile-book-btn');
    if (mobileBookBtn) {
        mobileBookBtn.classList.remove('btn-wiggle');
        mobileBookBtn.classList.remove('slide-in-down');
        setTimeout(() => {
            mobileBookBtn.classList.add('slide-in-down');
            setTimeout(() => {
                mobileBookBtn.classList.add('btn-wiggle');
            }, 700); // Start wiggle after slide in
        }, 300); // Small delay after DOMContentLoaded
    }

    // Pricing cards rotate-in and bottom Book Now bounce
    const pricingCards = document.querySelectorAll('.pricing-card');
    const pricingBookBtn = document.querySelector('.pricing-cta .btn-primary');
    if (pricingCards.length && pricingBookBtn) {
        const lastCard = pricingCards[pricingCards.length - 1];
        const cardObserver = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('rotate-in');
                    cardObserver.unobserve(entry.target);
                    // If this is the last card, trigger the button bounce immediately
                    if (entry.target === lastCard) {
                        pricingBookBtn.classList.remove('btn-bounce');
                        setTimeout(() => {
                            pricingBookBtn.classList.add('btn-bounce');
                        }, 50); // Practically immediate
                    }
                }
            });
        }, { threshold: 0.1 });
        pricingCards.forEach(card => cardObserver.observe(card));
    }
});
// ==================== ABOUT FEATURES SLIDE-IN ANIMATION (MOBILE) ====================
// ==================== PRICING BOOK NOW WIGGLE ANIMATION ====================
// ==================== BUTTON WIGGLE ANIMATION ====================
window.addEventListener('load', () => {
    const navBookButton = document.querySelector('.nav-cta');
    setTimeout(() => {
        console.log('Adding wiggle to navbar button');
        if (navBookButton) {
            navBookButton.classList.add('btn-wiggle');
        } else {
            console.log('Navbar button not found');
        }
    }, 5000);
});
// ========== GET QUOTE BUTTON WIGGLE ON IN-VIEW ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Window width:', window.innerWidth);
    const getQuoteButton = document.querySelector('.quote-form button.btn-primary');
    console.log('Get quote button:', getQuoteButton);
    if (!getQuoteButton) return;
    const wiggleOnce = (el) => {
        console.log('Wiggling get quote button');
        el.classList.remove('btn-wiggle');
        void el.offsetWidth;
        el.classList.add('btn-wiggle');
        setTimeout(() => el.classList.remove('btn-wiggle'), 2000);
    };
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Get quote button in view, wiggling');
                wiggleOnce(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(getQuoteButton);
});

// Contact form submission handler (send mail)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = document.getElementById('contactMessage').value;
            if (message.trim()) {
                window.location.href = `mailto:info@ihbtransport.com?subject=Contact%20Request&body=${encodeURIComponent(message)}`;
            }
        });
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
const logoImg = document.querySelector('.logo-img');

// Preload logos for smoother transition
const logo1 = new Image();
const logo2 = new Image();
logo1.src = 'static/newLogo.png';
logo2.src = 'static/logo2.jpeg';

let isScrolled = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && !isScrolled) {
        isScrolled = true;
        navbar.classList. add('scrolled');
        // Smooth logo change with fade
        if (logoImg) {
            logoImg.style.opacity = '0';
            setTimeout(() => {
                logoImg.src = 'static/logo2.png';
                logoImg.style.opacity = '1';
            }, 150);
        }
    } else if (window.scrollY <= 50 && isScrolled) {
        isScrolled = false;
        navbar.classList. remove('scrolled');
        // Smooth logo change with fade
        if (logoImg) {
            logoImg.style.opacity = '0';
            setTimeout(() => {
                logoImg.src = 'static/newLogo.png';
                logoImg.style.opacity = '1';
            }, 150);
        }
    }
});

// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ====================
document. querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this. getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior:  'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== QUOTE FORM SUBMISSION ====================
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        pickup: document.getElementById('pickup').value,
        dropoff: document. getElementById('dropoff').value,
        weight: document.getElementById('weight').value
    };
    
    console.log('Form Data:', formData);
    
    // Store in sessionStorage for next page
    sessionStorage.setItem('quoteData', JSON.stringify(formData));
    
    // TODO: Show full booking form (modal or scroll to section)
    alert('Quote form submitted!  Next:  Show full booking form');
    
    // Later:  Open modal or scroll to full form section
    // showBookingModal(formData);
});

// ==================== SCROLL INDICATOR CLICK ====================
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// ==================== PRICING TOGGLE ====================
const toggleBtns = document.querySelectorAll('.toggle-btn');
const weekdayPricing = document.querySelector('.weekday-pricing');
const weekendPricing = document.querySelector('.weekend-pricing');

console.log('Toggle buttons found:', toggleBtns.length);
console.log('Weekday pricing:', weekdayPricing);
console.log('Weekend pricing:', weekendPricing);

if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            console.log('Button clicked:', period);
            
            // Check if we're on mobile (window width <= 768px)
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // ACCORDION MODE: Toggle the clicked section, allow both to be open
                this.classList.toggle('active');
                
                if (period === 'weekday') {
                    weekdayPricing.classList.toggle('active');
                } else if (period === 'weekend') {
                    weekendPricing.classList.toggle('active');
                }
            } else {
                // DESKTOP MODE: Toggle between sections (only one open at a time)
                // Remove active class from all buttons
                toggleBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Toggle pricing grids
                if (period === 'weekday') {
                    console.log('Showing weekday pricing');
                    if (weekdayPricing) weekdayPricing.classList.add('active');
                    if (weekendPricing) weekendPricing.classList.remove('active');
                } else if (period === 'weekend') {
                    console.log('Showing weekend pricing');
                    if (weekdayPricing) weekdayPricing.classList.remove('active');
                    if (weekendPricing) weekendPricing.classList.add('active');
                }
            }
        });
    });
} else {
    console.error('No toggle buttons found!');
}

// Handle window resize to reset pricing display
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        // On desktop, ensure only one is active
        const hasActive = document.querySelector('.toggle-btn.active');
        if (!hasActive && toggleBtns.length > 0) {
            // Default to weekday if none active
            toggleBtns[0].classList.add('active');
            if (weekdayPricing) weekdayPricing.classList.add('active');
            if (weekendPricing) weekendPricing.classList.remove('active');
        }
    }
});

// ==================== TESTIMONIALS: STAGGER REVEAL ====================
(function(){
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    console.log('Testimonial cards found:', cards.length);
    if (!cards.length) return;

    // Staggered entrance using IntersectionObserver
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Testimonial card in view:', entry.target.dataset.idx);
                    const card = entry.target;
                    const idx = Number(card.dataset.idx) || 0;
                    card.style.transitionDelay = (idx * 200) + 'ms';
                    card.classList.add('in-view');
                    o.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(c => obs.observe(c));
    } else {
        // fallback
        cards.forEach(c => c.classList.add('in-view'));
    }
})();


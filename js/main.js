// ==================== PRICING CARDS ROTATE-IN ANIMATION (MOBILE) ====================
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) return;
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (!pricingCards.length) return;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('rotate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    pricingCards.forEach(card => observer.observe(card));
});
// ==================== ABOUT FEATURES SLIDE-IN ANIMATION (MOBILE) ====================
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) return;
    const features = document.querySelectorAll('.about-feature');
    if (!features.length) return;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                if (idx === 0) entry.target.classList.add('slide-in-left');
                else if (idx === 1) entry.target.classList.add('slide-in-center');
                else entry.target.classList.add('slide-in-right');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    features.forEach(f => observer.observe(f));
});
// ==================== PRICING BOOK NOW BOUNCE ANIMATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const pricingBookBtn = document.querySelector('.pricing-cta .btn-primary');
    if (!pricingBookBtn) return;
    let bounced = false;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !bounced) {
                pricingBookBtn.classList.add('btn-bounce');
                bounced = true;
                setTimeout(() => {
                    pricingBookBtn.classList.remove('btn-bounce');
                }, 3500);
            }
        });
    }, { threshold: 0.7 });
    observer.observe(pricingBookBtn);
});
// ==================== BUTTON BOUNCE ANIMATION ====================
window.addEventListener('load', () => {
    const navBookButton = document.querySelector('.nav-cta');
    const mobileBookButton = document.querySelector('.mobile-book-btn');
    
    setTimeout(() => {
        if (navBookButton) navBookButton.classList.add('btn-bounce');
        if (mobileBookButton) mobileBookButton.classList.add('btn-bounce');
        
        // Remove bounce after 6 seconds (3 complete cycles at 2s each)
        setTimeout(() => {
            if (navBookButton) navBookButton.classList.remove('btn-bounce');
            if (mobileBookButton) mobileBookButton.classList.remove('btn-bounce');
        }, 6000);
    }, 500);
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


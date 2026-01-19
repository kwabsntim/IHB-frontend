// ==================== BOTTOM BUTTONS SHAKE ON IN-VIEW ====================
document.addEventListener('DOMContentLoaded', () => {
    // Select bottom Book Now button only
    const bottomBookBtn = document.querySelector('.pricing-cta .btn-primary');
    const shakeOnce = (el) => {
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
                shakeOnce(entry.target);
                // Only animate once per view
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (bottomBookBtn) {
        observer.observe(bottomBookBtn);
    } else {
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
        if (navBookButton) {
            navBookButton.classList.add('btn-wiggle');
        } else {
        }
    }, 5000);
});
// ========== GET QUOTE BUTTON WIGGLE ON IN-VIEW ==========
document.addEventListener('DOMContentLoaded', () => {
    const getQuoteButton = document.querySelector('.quote-form button.btn-primary');
    if (!getQuoteButton) return;
    const wiggleOnce = (el) => {
        el.classList.remove('btn-wiggle');
        void el.offsetWidth;
        el.classList.add('btn-wiggle');
        setTimeout(() => el.classList.remove('btn-wiggle'), 2000);
    };
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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

// Booking form submission handler - validation, loading overlay and confirmation
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;

    // Insert or find an error box at top of the form
    let errorBox = bookingForm.querySelector('.booking-error');
    if (!errorBox) {
        errorBox = document.createElement('div');
        errorBox.className = 'booking-error';
        bookingForm.insertBefore(errorBox, bookingForm.firstChild);
    }

    // Create a global loading overlay element (hidden by default)
    let overlay = document.querySelector('.booking-loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'booking-loading-overlay';
        overlay.innerHTML = `
            <div class="booking-loading-inner">
                <div class="booking-spinner" aria-hidden="true"></div>
                <div class="booking-loading-text">Sending booking...</div>
            </div>`;
        document.body.appendChild(overlay);
    }

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorBox.textContent = '';

        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const get = (id) => document.getElementById(id)?.value.trim() || '';
        const payload = {
            client_name: get('client_name'),
            client_email: get('client_email'),
            pickup_address: {
                street: get('pickup_street'),
                city: get('pickup_city'),
                post_code: get('pickup_post_code'),
                country: get('pickup_country')
            },
            service_address: {
                street: get('dropoff_street'),
                city: get('dropoff_city'),
                post_code: get('dropoff_post_code'),
                country: get('dropoff_country')
            },
            item_description: get('item_description'),
            items: get('items'),
            weight: get('weight'),
            service: document.getElementById('service')?.value || '',
            service_date: document.getElementById('service_date')?.value || ''
        };

        // Basic client-side validation: required fields must be present
        const required = [
            { val: payload.client_name, name: 'Name' },
            { val: payload.client_email, name: 'Email' },
            { val: payload.pickup_address.street, name: 'Pickup street' },
            { val: payload.pickup_address.city, name: 'Pickup city' },
            { val: payload.pickup_address.post_code, name: 'Pickup post code' },
            { val: payload.service_address.street, name: 'Service street' },
            { val: payload.service_address.city, name: 'Service city' },
            { val: payload.service_address.post_code, name: 'Service post code' },
            { val: payload.item_description, name: 'Item description' },
            { val: payload.items, name: 'Items' },
            { val: payload.weight, name: 'Weight' },
            { val: payload.service, name: 'Service type' },
            { val: payload.service_date, name: 'Service date' }
        ];

        const missing = required.filter(r => !r.val).map(r => r.name);
        if (missing.length) {
            errorBox.textContent = 'Please fill the following fields: ' + missing.join(', ');
            if (submitBtn) submitBtn.disabled = false;
            return;
        }

        // Show loading overlay
        overlay.classList.add('visible');

        try {
            const res = await fetch('https://ihb-transport-dk.onrender.com/api/public/deliveries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `Server responded with ${res.status}`);
            }

            // On success show a confirm dialog: OK = stay, Cancel = go to homepage
            const stay = window.confirm('Booking submitted successfully. Click OK to remain on this page, or Cancel to return to the homepage.');
            bookingForm.reset();
            if (!stay) {
                window.location.href = 'index.html';
            }
        } catch (err) {
            console.error('Booking submit error:', err);
            errorBox.textContent = 'Failed to submit booking: ' + (err.message || 'Unknown error');
        } finally {
            overlay.classList.remove('visible');
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

let isScrolled = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && !isScrolled) {
        isScrolled = true;
        navbar.classList.add('scrolled');
    } else if (window.scrollY <= 50 && isScrolled) {
        isScrolled = false;
        navbar.classList.remove('scrolled');
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

if (toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
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
                    if (weekdayPricing) weekdayPricing.classList.add('active');
                    if (weekendPricing) weekendPricing.classList.remove('active');
                } else if (period === 'weekend') {
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
    if (!cards.length) return;

    // Staggered entrance using IntersectionObserver
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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

// ==================== FOOTER TYPING ANIMATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typingText');
    const text = 'IHB TRANSPORT APS';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 190); // Typing speed
        }
    }
    
    // Start typing animation when footer comes into view
    const footer = document.querySelector('footer');
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typeWriter();
                    }, 500); // Small delay before starting
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(footer);
    }
});

// Tracking form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const trackingForm = document.getElementById('trackingForm');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const requestId = document.getElementById('requestId').value.trim();
            if (requestId) {
                // For now, show an alert. In a real app, this would make an API call
                alert(`Tracking request for ID: ${requestId}\n\nThis feature will be implemented with real tracking functionality.`);
            }
        });
    }
});

// Function to trigger Book Now button glow and typing text
function triggerBookNowGlow() {
    // Start typing text first
    createTypingText();
}

// Function to trigger glow after typing is complete
function triggerGlowAfterTyping() {
    const bookNowBtn = document.querySelector('.nav-cta');
    const mobileBookBtn = document.querySelector('.mobile-book-btn');

    // Add glow effect to both buttons
    if (bookNowBtn) {
        bookNowBtn.classList.add('glow-effect');
        // Remove the class after the animation duration so the glow stops
        setTimeout(() => bookNowBtn.classList.remove('glow-effect'), 2100);
    }
    if (mobileBookBtn) {
        mobileBookBtn.classList.add('glow-effect');
        setTimeout(() => mobileBookBtn.classList.remove('glow-effect'), 2100);
    }
}

// Function to create and animate typing text
function createTypingText() {
    // Create container for typing text
    const typingContainer = document.createElement('div');
    typingContainer.className = 'typing-container';
    typingContainer.innerHTML = `
        <div class="typing-text"></div>
    `;

    // Insert after the process container
    const processContainer = document.querySelector('.process-container');
    if (processContainer) {
        processContainer.parentNode.insertBefore(typingContainer, processContainer.nextSibling);
    } else {
        // Fallback: insert at end of how-it-works section
        const howItWorksSection = document.querySelector('.how-it-works-section');
        if (howItWorksSection) {
            howItWorksSection.appendChild(typingContainer);
        }
    }

    // Start typing animation
    const text = "🚚 Interested in the service? Click Book Now at the top!";
    const typingText = typingContainer.querySelector('.typing-text');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 140); // Faster typing for engagement
        } else {
            // Typing complete - add blinking cursor effect
            typingText.innerHTML += '<span class="cursor">|</span>';
            setTimeout(() => {
                triggerGlowAfterTyping(); // Trigger glow after typing is done
            }, 500);
        }
    }

    typeWriter();
}

// ==================== MOBILE SCROLL-BASED ANIMATION ====================
// Function to animate steps based on scroll position (mobile only)
function animateStepsOnScroll(processSteps) {
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('active')) {
                // Add delay based on step index for sequential animation
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 300); // 300ms delay between steps
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of step is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
    });

    // Observe each step
    processSteps.forEach((step, index) => {
        stepObserver.observe(step);
    });

    // Track animated steps for glow trigger
    let animatedSteps = 0;
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('active')) {
                entry.target.classList.add('active');
                animatedSteps++;

                // When all steps have been animated, trigger the glow
                if (animatedSteps === processSteps.length) {
                    setTimeout(() => {
                        triggerBookNowGlow();
                    }, 1000); // Wait 1 second after last step
                }
            }
        });
    }, { threshold: 0.5 });

    processSteps.forEach(step => {
        glowObserver.observe(step);
    });
}
// Function to check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Handle window resize to update mobile detection
let isMobileDevice = isMobile();
window.addEventListener('resize', debounce(() => {
    isMobileDevice = isMobile();
}, 250));

// Function to smoothly scroll element into view
function scrollToElement(element, offset = 100) {
    if (!isMobile()) return; // Only auto-scroll on mobile

    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

    window.scrollTo({
        top: middle - offset,
        behavior: 'smooth'
    });
}
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const howItWorksSection = document.querySelector('.how-it-works-section');
    if (!howItWorksSection) return;

    const processSteps = document.querySelectorAll('.process-step');
    if (!processSteps.length) return;

    // Function to animate steps sequentially with enhanced effects
    function animateSteps() {
        processSteps.forEach((step, index) => {
            setTimeout(() => {
                // Add active class to trigger CSS transitions (like mobile)
                step.classList.add('active');

                // Add a subtle bounce effect for desktop
                setTimeout(() => {
                    step.style.transform = 'translateY(-5px) scale(1.05)';
                    setTimeout(() => {
                        step.style.transform = 'translateY(0) scale(1)';
                    }, 200);
                }, 800);

                // Auto-scroll to this step on mobile after a brief delay
                if (isMobileDevice) {
                    setTimeout(() => {
                        scrollToElement(step);
                    }, 1200); // Scroll after animation has settled
                }
            }, index * 1500); // Faster sequential animation for desktop engagement
        });

        // After all steps are animated, immediately trigger Book Now glow
        const totalAnimationTime = (processSteps.length * 1500) + 1000; // steps + small pause
        setTimeout(() => {
            triggerBookNowGlow();

            // Start glow only after How It Works animation is done
            const bookNowBtn = document.querySelector('.nav-cta');
            const mobileBookBtn = document.querySelector('.mobile-book-btn');
            if (bookNowBtn) bookNowBtn.classList.add('glow-effect');
            if (mobileBookBtn) mobileBookBtn.classList.add('glow-effect');

            // Scroll to typing text on mobile
            if (isMobileDevice) {
                setTimeout(() => {
                    const typingContainer = document.querySelector('.typing-container');
                    if (typingContainer) {
                        scrollToElement(typingContainer, 200);
                    }
                }, 1500);
            }
        }, totalAnimationTime);
    }

    // Function to trigger Book Now button glow and typing text
    function triggerBookNowGlow() {
        // Start typing text first
        createTypingText();
    }

    // Function to trigger glow after typing is complete
    function triggerGlowAfterTyping() {
        const bookNowBtn = document.querySelector('.nav-cta');
        const mobileBookBtn = document.querySelector('.mobile-book-btn');

        // Add glow effect to both buttons
        if (bookNowBtn) {
            bookNowBtn.classList.add('glow-effect');
            // remove after 2s so glow only lasts 2 seconds
            setTimeout(() => bookNowBtn.classList.remove('glow-effect'), 2000);
        }
        if (mobileBookBtn) {
            mobileBookBtn.classList.add('glow-effect');
            setTimeout(() => mobileBookBtn.classList.remove('glow-effect'), 2000);
        }
    }

    // Function to create and animate typing text
    function createTypingText() {
        // Create container for typing text
        const typingContainer = document.createElement('div');
        typingContainer.className = 'typing-container';
        typingContainer.innerHTML = `
            <div class="typing-text"></div>
        `;

        // Insert after the process container
        const processContainer = document.querySelector('.process-container');
        if (processContainer) {
            processContainer.parentNode.insertBefore(typingContainer, processContainer.nextSibling);
        } else {
            // Fallback: insert at end of how-it-works section
            const howItWorksSection = document.querySelector('.how-it-works-section');
            if (howItWorksSection) {
                howItWorksSection.appendChild(typingContainer);
            }
        }

        // Start typing animation
        const text = "🚚 Interested in the service? Click Book Now at the top!";
        const typingText = typingContainer.querySelector('.typing-text');
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // Faster typing for engagement
            } else {
                // Typing complete - add blinking cursor effect
                typingText.innerHTML += '<span class="cursor">|</span>';
                setTimeout(() => {
                    triggerGlowAfterTyping(); // Trigger glow after typing is done
                }, 500);
            }
        }

        typeWriter();
    }

    // Trigger animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (isMobileDevice) {
                    // On mobile, animate steps as user scrolls through the section
                    animateStepsOnScroll(processSteps);
                } else {
                    // On desktop, animate all steps automatically
                    setTimeout(() => {
                        animateSteps();
                    }, 500);
                }
                observer.disconnect(); // Disconnect after triggering to free up resources
            }
        });
    }, { threshold: 0.1 }); // Lower threshold for earlier triggering

    observer.observe(howItWorksSection);
});

// ==================== STOP GLOW WHEN PRICES SECTION IS VISIBLE ====================
document.addEventListener('DOMContentLoaded', () => {
    const pricesSection = document.getElementById('pricing');
    const bookNowBtn = document.querySelector('.nav-cta');
    const mobileBookBtn = document.querySelector('.mobile-book-btn');

    if (pricesSection && (bookNowBtn || mobileBookBtn)) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove glow effect when prices section comes into view
                    if (bookNowBtn) {
                        bookNowBtn.classList.remove('glow-effect');
                    }
                    if (mobileBookBtn) {
                        mobileBookBtn.classList.remove('glow-effect');
                    }
                    observer.disconnect(); // Disconnect after triggering to free up resources
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

        observer.observe(pricesSection);
    }
});
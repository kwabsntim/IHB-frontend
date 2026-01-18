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
// Central wiggle duration so it's easy to tweak
const WIGGLE_DURATION = 2200; // milliseconds (2.2s)
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
        mobileBookBtn.classList.remove('slide-in-down');
        setTimeout(() => {
            mobileBookBtn.classList.add('slide-in-down');
            setTimeout(() => {
                // single wiggle after slide-in
                wiggleOnceGlobal(mobileBookBtn, WIGGLE_DURATION);
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
        // Give the nav book button a single wiggle after a short delay, then wiggle the "Get Quote" button
        const NAV_WIGGLE_DELAY = 1000; // reduced to 1s per request
        const NAV_WIGGLE_DURATION = WIGGLE_DURATION;
        setTimeout(() => {
            if (navBookButton) {
                // trigger nav wiggle and mark done after its duration
                wiggleOnceGlobal(navBookButton, NAV_WIGGLE_DURATION);
                ensureNavWigglePromise();
                setTimeout(() => {
                    navWiggleDone = true;
                    if (navWigglePromiseResolve) navWigglePromiseResolve();
                }, NAV_WIGGLE_DURATION + 50);
            } else {
                // no nav button - mark as done so others don't wait forever
                navWiggleDone = true;
            }

            // After the nav wiggle completes, wiggle the Get Quote button (if present)
            const getQuoteButton = document.querySelector('.quote-form button.btn-primary');
            if (getQuoteButton) {
                if (navWiggleDone) wiggleOnceGlobal(getQuoteButton, WIGGLE_DURATION);
                else {
                    ensureNavWigglePromise();
                    navWigglePromise.then(() => wiggleOnceGlobal(getQuoteButton, WIGGLE_DURATION));
                }
                // mark as wiggled so the intersection observer won't repeat it
                getQuoteButton.dataset.wiggled = '1';
            }

            // Start the footer "Interested" typing animation after nav and get-quote wiggles finish
            // (only start if not already present)
            const TYPING_START_DELAY = NAV_WIGGLE_DURATION + 250 + WIGGLE_DURATION + 250; // nav + gap + get-quote + gap
            setTimeout(() => {
                if (!document.querySelector('.typing-container')) {
                    // createTypingText is global; call it to start typing
                    try { createTypingText(); } catch (e) { /* no-op if unavailable */ }
                }
            }, TYPING_START_DELAY);
        }, NAV_WIGGLE_DELAY);
});
// ========== GET QUOTE BUTTON WIGGLE ON IN-VIEW ==========
document.addEventListener('DOMContentLoaded', () => {
    const getQuoteButton = document.querySelector('.quote-form button.btn-primary');
    if (!getQuoteButton) return;
    const wiggleOnce = (el) => {
        // Skip if already wiggled on load
        if (el.dataset && el.dataset.wiggled === '1') return;
        // Ensure nav wiggle happens first. If nav wiggle already done, wiggle immediately.
        if (navWiggleDone) {
            wiggleOnceGlobal(el, WIGGLE_DURATION);
        } else {
            ensureNavWigglePromise();
            navWigglePromise.then(() => wiggleOnceGlobal(el, WIGGLE_DURATION));
        }
        // mark as wiggled so it doesn't trigger twice
        if (el.dataset) el.dataset.wiggled = '1';
    };
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it was already wiggled on page load, just unobserve and skip
                if (entry.target.dataset && entry.target.dataset.wiggled === '1') {
                    observer.unobserve(entry.target);
                    return;
                }
                wiggleOnce(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(getQuoteButton);
});

// Global helper to wiggle a button once (re-usable)
function wiggleOnceGlobal(el, duration = WIGGLE_DURATION) {
    if (!el) return;
    // remove any lingering one-shot class and force reflow
    el.classList.remove('btn-wiggle-once');
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add('btn-wiggle-once');
    setTimeout(() => el.classList.remove('btn-wiggle-once'), duration + 50);
}

// Track whether the nav Book Now has completed its first wiggle
let navWiggleDone = false;
let navWigglePromise = null;
let navWigglePromiseResolve = null;
function ensureNavWigglePromise() {
    if (!navWigglePromise) {
        navWigglePromise = new Promise(resolve => { navWigglePromiseResolve = resolve; });
    }
}

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
            
                // Unified toggle behavior for all viewports: show selected period, hide the other
                toggleBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                if (period === 'weekday') {
                    if (weekdayPricing) weekdayPricing.classList.add('active');
                    if (weekendPricing) weekendPricing.classList.remove('active');
                } else if (period === 'weekend') {
                    if (weekdayPricing) weekdayPricing.classList.remove('active');
                    if (weekendPricing) weekendPricing.classList.add('active');
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
    // Instead of the old glow effect, wiggle the Book Now buttons once
    const bookNowBtn = document.querySelector('.nav-cta');
    const mobileBookBtn = document.querySelector('.mobile-book-btn');
    if (bookNowBtn) {
        wiggleOnceGlobal(bookNowBtn, WIGGLE_DURATION);
        // mark nav wiggle as completed so other wiggles can wait on it
        ensureNavWigglePromise();
        setTimeout(() => {
            navWiggleDone = true;
            if (navWigglePromiseResolve) navWigglePromiseResolve();
        }, WIGGLE_DURATION + 50);
    } else {
        navWiggleDone = true;
    }
    if (mobileBookBtn) wiggleOnceGlobal(mobileBookBtn, WIGGLE_DURATION);
}

// (The createTypingText function is defined later once; calls to it will use that single implementation.)

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
        // When typing finishes, wiggle the Book Now buttons once (no glow)
        const bookNowBtn = document.querySelector('.nav-cta');
        const mobileBookBtn = document.querySelector('.mobile-book-btn');
        if (bookNowBtn) {
            wiggleOnceGlobal(bookNowBtn, WIGGLE_DURATION);
            // mark nav wiggle as completed so other wiggles can wait on it
            ensureNavWigglePromise();
            setTimeout(() => {
                navWiggleDone = true;
                if (navWigglePromiseResolve) navWigglePromiseResolve();
            }, WIGGLE_DURATION + 50);
        } else {
            navWiggleDone = true;
        }
        if (mobileBookBtn) wiggleOnceGlobal(mobileBookBtn, WIGGLE_DURATION);
    }

    // Function to create and animate typing text
    function createTypingText() {
        // Prevent multiple typing containers if function is called more than once
        if (document.querySelector('.typing-container')) return;
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

        // On mobile, make sure the typing area is visible by scrolling it into view
        if (isMobile()) {
            // small timeout so layout has settled
            setTimeout(() => {
                // Ensure it's visible and not hidden by parent overflow
                typingContainer.style.visibility = 'visible';
                typingContainer.style.opacity = '1';
                try {
                    // Prefer a native scrollIntoView; fallback to scrollToElement
                    typingContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } catch (e) {
                    scrollToElement(typingContainer, 120);
                }
            }, 120);
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
// (Glow removal observer removed — glow behavior deprecated in favor of wiggle-on-typing)
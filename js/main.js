// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
const logoImg = document.querySelector('.logo-img');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList. add('scrolled');
        // Change to logo2 when scrolled
        if (logoImg) {
            logoImg.src = 'static/logo2.jpeg';
        }
    } else {
        navbar.classList. remove('scrolled');
        // Change back to newLogo when at top
        if (logoImg) {
            logoImg.src = 'static/newLogo.png';
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
document.querySelectorAll('. nav-link').forEach(link => {
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
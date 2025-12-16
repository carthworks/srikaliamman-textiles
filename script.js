// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initializeAOS();
    initializeNavbar();
    initializeDarkMode();
    initializeProductSlider();
    initializeEnquiryForm();
    initializeSmoothScroll();
    initializeCarousel();
    initializeBackToTop();
});

// ============================================
// AOS ANIMATION LIBRARY
// ============================================

function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initializeNavbar() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        highlightActiveSection();
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Initial check for active section
    highlightActiveSection();
}

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset for navbar height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// DARK MODE TOGGLE
// ============================================

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateDarkModeIcon(currentTheme);

    darkModeToggle.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);

        // Add animation effect
        this.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
}

function updateDarkModeIcon(theme) {
    const icon = document.querySelector('#darkModeToggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// PRODUCT SLIDER
// ============================================

function initializeProductSlider() {
    const slider = document.getElementById('productSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slider || !prevBtn || !nextBtn) return;

    const cardWidth = 320 + 32; // card width + gap

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });

    // Auto-scroll functionality (optional)
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);

    // Pause on touch
    slider.addEventListener('touchstart', stopAutoScroll);
    slider.addEventListener('touchend', startAutoScroll);

    // Update button visibility based on scroll position
    function updateButtonVisibility() {
        const isAtStart = slider.scrollLeft <= 0;
        const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10;

        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }

    slider.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility();
}

// ============================================
// ENQUIRY FORM
// ============================================

function initializeEnquiryForm() {
    const form = document.getElementById('enquiryForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            product: document.getElementById('product').value,
            quantity: document.getElementById('quantity').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide form and show thank you message
            form.style.display = 'none';
            thankYouMessage.style.display = 'block';

            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Optional: Send data to server or email service
            console.log('Form submitted:', formData);

            // You can integrate with email services like EmailJS, FormSpree, etc.
            // Example: sendEmail(formData);

            // Scroll to thank you message
            thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}

function validateForm(formData) {
    // Name validation
    if (formData.name.trim().length < 2) {
        showAlert('Please enter a valid name', 'error');
        return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        showAlert('Please enter a valid 10-digit phone number', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }

    // Product selection validation
    if (!formData.product) {
        showAlert('Please select a product', 'error');
        return false;
    }

    return true;
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert - ${type === 'error' ? 'danger' : 'success'} alert - dismissible fade show`;
    alert.style.position = 'fixed';
    alert.style.top = '100px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';
    alert.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    alert.innerHTML = `
        ${message}
<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
`;

    document.body.appendChild(alert);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// CAROUSEL AUTO-PLAY
// ============================================

function initializeCarousel() {
    const carousel = document.getElementById('productCarousel');
    if (!carousel) {
        console.error('Carousel element not found!');
        return;
    }

    // Check if Bootstrap is loaded
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap is not loaded!');
        return;
    }

    try {
        // Initialize Bootstrap carousel
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            touch: true,
            ride: 'carousel'
        });

        console.log('Carousel initialized successfully!');

        // Manual control buttons (optional - for debugging)
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                bsCarousel.to(index);
            });
        });

    } catch (error) {
        console.error('Error initializing carousel:', error);
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// ANALYTICS & TRACKING (Optional)
// ============================================

function trackEvent(eventName, eventData) {
    // Integrate with Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);

    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track button clicks
document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-primary, .btn-outline-primary')) {
        const button = e.target.closest('.btn-primary, .btn-outline-primary');
        trackEvent('button_click', {
            button_text: button.textContent.trim(),
            button_location: button.closest('section')?.id || 'unknown'
        });
    }
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function () {
        trackEvent('whatsapp_click', {
            location: this.closest('section')?.id || 'floating_button'
        });
    });
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log page load time
window.addEventListener('load', function () {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('Page loaded in:', loadTime, 'ms');

    trackEvent('page_load', {
        load_time: loadTime
    });
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.message);
    // You can send errors to a logging service here
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for slider
document.addEventListener('keydown', function (e) {
    const slider = document.getElementById('productSlider');
    if (!slider) return;

    if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn')?.click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn')?.click();
    }
});

// Focus management for modals and overlays
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ============================================
// CONSOLE BRANDING (Optional)
// ============================================
// BACK TO TOP BUTTON
// ============================================

function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CONSOLE BRANDING (Optional)
// ============================================

console.log(
    '%c Sri Kaliamman Textiles ',
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;'
);
console.log(
    '%c Quality Terry & Textile Products from Karur ',
    'color: #667eea; font-size: 14px; font-weight: bold;'
);
console.log(
    '%c Website built with ❤️ ',
    'color: #6b7280; font-size: 12px;'
);

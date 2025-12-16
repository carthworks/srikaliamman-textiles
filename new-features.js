
// ============================================
// PAGE LOADER
// ============================================

function initializePageLoader() {
    const loader = document.getElementById('pageLoader');

    if (!loader) return;

    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800); // Show loader for at least 800ms
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');

    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// LIGHTBOX GALLERY
// ============================================

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

    // Get all lightbox triggers
    const triggers = document.querySelectorAll('.lightbox-trigger');
    let currentImageIndex = 0;
    let images = [];

    // Collect all images
    triggers.forEach((trigger, index) => {
        const imageData = {
            src: trigger.dataset.image,
            caption: trigger.dataset.caption || ''
        };
        images.push(imageData);

        // Add click event to trigger
        trigger.addEventListener('click', (e) => {
            // Don't open lightbox if clicking on buttons inside
            if (e.target.closest('.btn')) return;

            currentImageIndex = index;
            openLightbox();
        });
    });

    // Also add click event to lightbox buttons
    document.querySelectorAll('.lightbox-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (images.length === 0) return;

        lightboxImage.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
}

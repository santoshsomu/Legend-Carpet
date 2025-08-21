document.addEventListener('DOMContentLoaded', () => {
    // Initialize basic sliders (fallback for non-portfolio pages)
    initializeBasicSliders();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile menu
    initializeMobileMenu();
});

function initializeBasicSliders() {
    const sliders = document.querySelectorAll('.image-comparison-slider');

    sliders.forEach(slider => {
        // Skip if already initialized by portfolio.js
        if (slider.hasAttribute('data-initialized')) return;
        
        const sliderImg = slider.querySelector('.comparison-image.image-after');
        const sliderLine = slider.querySelector('.comparison-slider');

        if (!sliderImg || !sliderLine) return;

        let isDragging = false;

        const startDrag = (e) => {
            isDragging = true;
            slider.classList.add('is-dragging');
            updateSlider(e);
        };

        const stopDrag = () => {
            isDragging = false;
            slider.classList.remove('is-dragging');
        };

        const updateSlider = (e) => {
            if (!isDragging) return;

            const rect = slider.getBoundingClientRect();
            let x = (e.clientX || e.touches[0].clientX) - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percent = (x / rect.width) * 100;

            sliderImg.style.clipPath = `inset(0 0 0 ${percent}%)`;
            sliderLine.style.left = `${percent}%`;
        };

        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag, { passive: false });

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);

        document.addEventListener('mousemove', updateSlider);
        document.addEventListener('touchmove', updateSlider, { passive: false });
        
        // Mark as initialized
        slider.setAttribute('data-initialized', 'true');
    });
}

function initializeScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = mainNav.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking nav links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}document.addEventListener('DOMContentLoaded', () => {
    // Initialize basic sliders (fallback for non-portfolio pages)
    initializeBasicSliders();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile menu
    initializeMobileMenu();
});
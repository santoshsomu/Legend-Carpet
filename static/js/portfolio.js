document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio page loaded, initializing...');
    
    // Initialize everything
    initializeImageLoading();
    initializeImageSliders();
    initializePortfolioFilters();
    initializeLoadMore();
    initializeAnimations();
    
    // Debug: Log how many sliders were found
    const sliders = document.querySelectorAll('.image-comparison-slider');
    const images = document.querySelectorAll('.comparison-image');
    console.log(`Found ${sliders.length} image comparison sliders`);
    console.log(`Found ${images.length} comparison images`);
    
    // Log image sources for debugging
    images.forEach((img, index) => {
        console.log(`Image ${index + 1}: ${img.src}`);
    });
});

// Enhanced Image Comparison Sliders
function initializeImageSliders() {
    const sliders = document.querySelectorAll('.image-comparison-slider');

    sliders.forEach(slider => {
        const sliderImage = slider.querySelector('.image-after');
        const sliderLine = slider.querySelector('.comparison-slider');
        const sliderHandle = slider.querySelector('.comparison-slider-handle');

        let isDragging = false;
        let animationId = null;

        // Add keyboard support
        slider.setAttribute('tabindex', '0');
        slider.setAttribute('role', 'slider');
        slider.setAttribute('aria-label', 'Drag to compare before and after images');
        slider.setAttribute('aria-valuemin', '0');
        slider.setAttribute('aria-valuemax', '100');
        slider.setAttribute('aria-valuenow', '50');

        const startDragging = (e) => {
            isDragging = true;
            slider.classList.add('is-dragging');
            
            // Prevent default to avoid image dragging
            e.preventDefault();
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            updateSlider(clientX - slider.getBoundingClientRect().left);
            
            // Add visual feedback
            sliderHandle.style.transform = 'translate(-50%, -50%) scale(1.2)';
        };

        const stopDragging = () => {
            if (!isDragging) return;
            
            isDragging = false;
            slider.classList.remove('is-dragging');
            
            // Reset visual feedback
            sliderHandle.style.transform = 'translate(-50%, -50%) scale(1)';
            
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            
            // Use requestAnimationFrame for smooth performance
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            animationId = requestAnimationFrame(() => {
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                updateSlider(clientX - slider.getBoundingClientRect().left);
            });
        };

        const updateSlider = (x) => {
            const sliderWidth = slider.offsetWidth;
            let newPosition = (x / sliderWidth) * 100;
            newPosition = Math.max(0, Math.min(100, newPosition));

            // Update clip path with smooth transition
            sliderImage.style.clipPath = `inset(0 0 0 ${newPosition}%)`;
            sliderLine.style.left = `${newPosition}%`;
            
            // Update ARIA value
            slider.setAttribute('aria-valuenow', Math.round(newPosition));
        };

        // Keyboard support
        const handleKeydown = (e) => {
            let currentPosition = parseFloat(slider.getAttribute('aria-valuenow')) || 50;
            let newPosition = currentPosition;
            
            switch(e.key) {
                case 'ArrowLeft':
                    newPosition = Math.max(0, currentPosition - 5);
                    break;
                case 'ArrowRight':
                    newPosition = Math.min(100, currentPosition + 5);
                    break;
                case 'Home':
                    newPosition = 0;
                    break;
                case 'End':
                    newPosition = 100;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            
            sliderImage.style.clipPath = `inset(0 0 0 ${newPosition}%)`;
            sliderLine.style.left = `${newPosition}%`;
            slider.setAttribute('aria-valuenow', Math.round(newPosition));
        };

        // Auto-reveal animation on scroll
        const revealSlider = () => {
            const rect = slider.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !slider.classList.contains('revealed')) {
                slider.classList.add('revealed');
                
                // Animate from 0 to 50%
                let progress = 0;
                const animate = () => {
                    progress += 2;
                    if (progress <= 50) {
                        sliderImage.style.clipPath = `inset(0 0 0 ${progress}%)`;
                        sliderLine.style.left = `${progress}%`;
                        requestAnimationFrame(animate);
                    }
                };
                
                setTimeout(animate, 500);
            }
        };

        // Event listeners
        slider.addEventListener('mousedown', startDragging);
        slider.addEventListener('touchstart', startDragging, { passive: false });
        slider.addEventListener('keydown', handleKeydown);

        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });

        // Scroll reveal
        window.addEventListener('scroll', revealSlider);
        revealSlider(); // Check initial state
    });
}

// Portfolio Filtering System
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items with animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.style.animationDelay = `${index * 0.1}s`;
                    }, index * 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!loadMoreBtn) return;

    // Additional portfolio items data
    const additionalItems = [
        {
            category: 'cleaning',
            title: 'Pet Stain Removal',
            description: 'Complete elimination of pet odors and stains using enzyme-based cleaning solutions.',
            tags: ['Pet Stains', 'Odor Removal'],
            beforeImg: '/static/images/before.jpeg',
            afterImg: '/static/images/after.jpeg'
        },
        {
            category: 'repair',
            title: 'Carpet Patching',
            description: 'Seamless patch repair that perfectly matches the existing carpet texture and color.',
            tags: ['Patching', 'Color Match'],
            beforeImg: '/static/images/before.jpeg',
            afterImg: '/static/images/after.jpeg'
        },
        {
            category: 'restoration',
            title: 'Flood Damage Recovery',
            description: 'Complete restoration of flood-damaged carpets using industrial-grade equipment.',
            tags: ['Flood Damage', 'Emergency Service'],
            beforeImg: '/static/images/before.jpeg',
            afterImg: '/static/images/after.jpeg'
        }
    ];

    let itemsLoaded = 0;

    loadMoreBtn.addEventListener('click', () => {
        const itemsToLoad = Math.min(3, additionalItems.length - itemsLoaded);
        
        if (itemsToLoad === 0) {
            loadMoreBtn.style.display = 'none';
            return;
        }

        // Add loading state
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;

        setTimeout(() => {
            for (let i = 0; i < itemsToLoad; i++) {
                const item = additionalItems[itemsLoaded + i];
                const portfolioItem = createPortfolioItem(item);
                portfolioGrid.appendChild(portfolioItem);
                
                // Initialize slider for new item
                const slider = portfolioItem.querySelector('.image-comparison-slider');
                if (slider) {
                    initializeSingleSlider(slider);
                }
                
                // Animate in
                setTimeout(() => {
                    portfolioItem.classList.add('scale-in', 'in-view');
                }, i * 100);
            }

            itemsLoaded += itemsToLoad;

            // Reset button
            if (itemsLoaded >= additionalItems.length) {
                loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Projects Loaded';
                setTimeout(() => {
                    loadMoreBtn.style.display = 'none';
                }, 2000);
            } else {
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Projects';
                loadMoreBtn.disabled = false;
            }
        }, 1000);
    });
}

// Create portfolio item HTML
function createPortfolioItem(item) {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item scale-in';
    portfolioItem.setAttribute('data-category', item.category);
    
    portfolioItem.innerHTML = `
        <div class="portfolio-card">
            <div class="image-comparison-slider">
                <img class="comparison-image image-before" src="${item.beforeImg}" alt="Before ${item.title}" loading="lazy">
                <img class="comparison-image image-after" src="${item.afterImg}" alt="After ${item.title}" loading="lazy">
                <div class="comparison-slider">
                    <div class="comparison-slider-handle">
                        <i class="fas fa-arrows-alt-h" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="comparison-labels">
                    <span class="label-before">Before</span>
                    <span class="label-after">After</span>
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return portfolioItem;
}

// Initialize single slider (for dynamically added items)
function initializeSingleSlider(slider) {
    const sliderImage = slider.querySelector('.image-after');
    const sliderLine = slider.querySelector('.comparison-slider');
    const sliderHandle = slider.querySelector('.comparison-slider-handle');

    let isDragging = false;

    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Drag to compare before and after images');

    const startDragging = (e) => {
        isDragging = true;
        slider.classList.add('is-dragging');
        e.preventDefault();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updateSlider(clientX - slider.getBoundingClientRect().left);
    };

    const stopDragging = () => {
        isDragging = false;
        slider.classList.remove('is-dragging');
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        updateSlider(clientX - slider.getBoundingClientRect().left);
    };

    const updateSlider = (x) => {
        const sliderWidth = slider.offsetWidth;
        let newPosition = (x / sliderWidth) * 100;
        newPosition = Math.max(0, Math.min(100, newPosition));

        sliderImage.style.clipPath = `inset(0 0 0 ${newPosition}%)`;
        sliderLine.style.left = `${newPosition}%`;
    };

    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', startDragging, { passive: false });
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
}

// Scroll-based animations
function initializeAnimations() {
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

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    const portfolioHero = document.querySelector('.portfolio-hero');
    if (portfolioHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            portfolioHero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + (stat.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    });

    if (portfolioHero) {
        heroObserver.observe(portfolioHero);
    }
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        
        // Try to load fallback image
        if (e.target.classList.contains('image-before')) {
            e.target.src = '/static/images/before.jpeg';
        } else if (e.target.classList.contains('image-after')) {
            e.target.src = '/static/images/after.jpeg';
        }
        
        // If fallback also fails, show placeholder
        e.target.onerror = function() {
            this.style.background = 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%)';
            this.style.backgroundSize = '20px 20px';
            this.alt = 'Image not available';
        };
    }
}, true);

// Initialize image loading with better error handling
function initializeImageLoading() {
    const images = document.querySelectorAll('.comparison-image');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        } else {
            img.onload = function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
                console.log('Image loaded successfully:', this.src);
            };
            
            img.onerror = function() {
                console.warn('Image failed to load:', this.src);
                this.classList.remove('loading');
                
                // Try fallback images
                if (this.classList.contains('image-before') && !this.src.includes('before.jpeg')) {
                    console.log('Trying fallback before image');
                    this.src = '/static/images/before.jpeg';
                } else if (this.classList.contains('image-after') && !this.src.includes('after.jpeg')) {
                    console.log('Trying fallback after image');
                    this.src = '/static/images/after.jpeg';
                } else {
                    // Show placeholder pattern
                    this.style.background = 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%)';
                    this.style.backgroundSize = '20px 20px';
                    this.alt = 'Image not available';
                    this.classList.add('fallback-image');
                }
            };
        }
    });
    
    // Log debug information
    console.log(`Found ${images.length} portfolio images to load`);
}

// Call image loading initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeImageLoading();
    // ... rest of existing initialization code
});
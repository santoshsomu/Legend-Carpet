document.addEventListener('DOMContentLoaded', () => {
    // Initialize basic sliders (fallback for non-portfolio pages)
    initializeBasicSliders();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Add services carousel init
    initializeServicesCarousel();
    
    // Initialize magnetic testimonial cards
    initializeMagneticCards();
    
    // Initialize parallax effects
    initializeParallax();
    
    // Initialize enhanced magnetic cards with confetti
    enhanceMagneticCards();
    
    // Initialize page transitions
    initializePageTransitions();
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
    // Enhanced Intersection Observer for smooth fade animations
    const observerOptions = {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Special handling for the entire why-us section
                if (entry.target.id === 'why-us') {
                    // Add fade animation class first, then trigger the animation
                    entry.target.classList.add('fade-animation');
                    
                    // Small delay to ensure the fade-animation class is applied
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, 50);
                    
                    // Then add staggered animations to child elements
                    setTimeout(() => {
                        const elements = entry.target.querySelectorAll('.benefit, .why-us-text h2, .why-us-text p, .cta-button, .smooth-image');
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('in-view');
                            }, index * 150);
                        });
                    }, 300);
                } 
                // Add staggered animation delays for other why-us content
                else if (entry.target.classList.contains('why-us-content')) {
                    const elements = entry.target.querySelectorAll('.benefit, .why-us-text h2, .why-us-text p, .cta-button');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('in-view');
                        }, index * 150);
                    });
                } else {
                    entry.target.classList.add('in-view');
                }
                
                // Add smooth scale effect for images
                const images = entry.target.querySelectorAll('img');
                images.forEach((img, index) => {
                    setTimeout(() => {
                        img.style.transform = 'scale(1)';
                        img.style.opacity = '1';
                    }, index * 100);
                });
            } else {
                // Remove animations when scrolling back up (optional fade out)
                if (entry.target.id === 'why-us') {
                    entry.target.classList.remove('in-view', 'fade-animation');
                    // Also remove from child elements
                    const elements = entry.target.querySelectorAll('.benefit, .why-us-text h2, .why-us-text p, .cta-button, .smooth-image');
                    elements.forEach(el => {
                        el.classList.remove('in-view');
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements with animation classes including the entire why-us section
    document.querySelectorAll('.fade-in, .scale-in, .why-us-content, #why-us').forEach(el => {
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
}

// Service Area Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.getElementById(tab.dataset.tab);

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(tc => tc.classList.remove('active'));
            if (target) {
                target.classList.add('active');
            }
        });
    });
});

// Add smooth scroll to contact form after submission
document.addEventListener('DOMContentLoaded', function() {
    // If URL contains #contact and there's a flash message
    if (window.location.hash === '#contact' && document.querySelector('.alert')) {
        const formSection = document.querySelector(window.location.hash);
        const header = document.getElementById('main-header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Scroll to form with header offset
        window.scrollTo({
            top: formSection.offsetTop - headerHeight - 20,
            behavior: 'smooth'
        });
        
        // Focus on first form input
        const firstInput = formSection.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }
});

function initializeServicesCarousel() {
    const containers = document.querySelectorAll('.services-grid');
    
    containers.forEach(container => {
        if (container.dataset.carouselInitialized) return;
        container.dataset.carouselInitialized = 'true';

        let isDown = false;
        let startX = 0;
        let startY = 0;
        let scrollLeft = 0;
        let hasDragged = false;
        let dragDistance = 0;
        let updateCenterTimeout = null;
        let dragDirection = 0;

        const getPageX = (e) => (e.touches && e.touches[0] ? e.touches[0].pageX : e.pageX);
        const getPageY = (e) => (e.touches && e.touches[0] ? e.touches[0].pageY : e.pageY);

        // Create navigation arrows
        const servicesSection = container.closest('#services');
        if (servicesSection && !servicesSection.querySelector('.carousel-nav')) {
            const leftArrow = document.createElement('button');
            leftArrow.className = 'carousel-nav carousel-nav-left';
            leftArrow.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
            leftArrow.setAttribute('aria-label', 'Previous service');
            
            const rightArrow = document.createElement('button');
            rightArrow.className = 'carousel-nav carousel-nav-right';
            rightArrow.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
            rightArrow.setAttribute('aria-label', 'Next service');
            
            servicesSection.appendChild(leftArrow);
            servicesSection.appendChild(rightArrow);
            
            // Arrow click handlers
            leftArrow.addEventListener('click', () => scrollCarousel('left'));
            rightArrow.addEventListener('click', () => scrollCarousel('right'));
            
            // Update arrow states on scroll
            container.addEventListener('scroll', updateArrowStates);
            updateArrowStates();
        }

        // Scroll carousel function
        function scrollCarousel(direction) {
            const cardWidth = container.querySelector('.service-card')?.offsetWidth || 300;
            const gap = 24; // var(--space-6) = 1.5rem = 24px
            const scrollAmount = cardWidth + gap;
            
            const currentScroll = container.scrollLeft;
            const targetScroll = direction === 'left' 
                ? currentScroll - scrollAmount 
                : currentScroll + scrollAmount;
            
            // Smooth scroll animation
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
            
            markInteracted();
            
            // Update center card after animation
            setTimeout(() => {
                updateCenterCard();
            }, 300);
        }

        // Update arrow button states
        function updateArrowStates() {
            const leftArrow = servicesSection?.querySelector('.carousel-nav-left');
            const rightArrow = servicesSection?.querySelector('.carousel-nav-right');
            
            if (!leftArrow || !rightArrow) return;
            
            const maxScroll = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;
            
            // Disable left arrow if at start
            if (currentScroll <= 10) {
                leftArrow.classList.add('disabled');
            } else {
                leftArrow.classList.remove('disabled');
            }
            
            // Disable right arrow if at end
            if (currentScroll >= maxScroll - 10) {
                rightArrow.classList.add('disabled');
            } else {
                rightArrow.classList.remove('disabled');
            }
        }

        // Mark as user interacted (hides hint)
        const markInteracted = () => {
            container.classList.add('user-interacted');
        };

        // Update drag hint animation
        const updateDragHint = (direction) => {
            dragDirection = direction;
            
            if (direction < 0) {
                container.style.setProperty('--drag-direction', 'translateX(-50%) translateX(-5px)');
                container.classList.add('dragging-left');
                container.classList.remove('dragging-right');
            } else if (direction > 0) {
                container.style.setProperty('--drag-direction', 'translateX(-50%) translateX(5px)');
                container.classList.add('dragging-right');
                container.classList.remove('dragging-left');
            } else {
                container.style.setProperty('--drag-direction', 'translateX(-50%)');
                container.classList.remove('dragging-left', 'dragging-right');
            }
        };

        // Find and mark center card
        const updateCenterCard = () => {
            if (updateCenterTimeout) {
                clearTimeout(updateCenterTimeout);
            }
            
            updateCenterTimeout = setTimeout(() => {
                const cards = Array.from(container.querySelectorAll('.service-card'));
                if (!cards.length) return;

                const containerRect = container.getBoundingClientRect();
                const containerCenter = containerRect.left + (containerRect.width / 2);
                
                let closestCard = null;
                let minDistance = Infinity;

                cards.forEach(card => {
                    card.classList.remove('is-center');
                    
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.left + (cardRect.width / 2);
                    const distance = Math.abs(containerCenter - cardCenter);
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCard = card;
                    }
                });

                if (closestCard) {
                    closestCard.classList.add('is-center');
                }
                
                // Update arrow states
                updateArrowStates();
            }, 50);
        };

        // Drag handlers
        const onDown = (e) => {
            isDown = true;
            hasDragged = false;
            dragDistance = 0;
            container.classList.add('is-dragging');
            startX = getPageX(e) - container.offsetLeft;
            startY = getPageY(e);
            scrollLeft = container.scrollLeft;
            markInteracted();
        };

        const onMove = (e) => {
            if (!isDown) return;
            
            const x = getPageX(e) - container.offsetLeft;
            const y = getPageY(e);
            const walkX = (x - startX) * 1.5;
            const walkY = Math.abs(y - startY);
            
            dragDistance = Math.abs(walkX);
            
            if (dragDistance > 15 && Math.abs(walkX) > walkY) {
                e.preventDefault();
                hasDragged = true;
                updateDragHint(walkX > 0 ? 1 : -1);
                container.scrollLeft = scrollLeft - walkX;
                updateCenterCard();
            }
        };

        const onUp = (e) => {
            isDown = false;
            container.classList.remove('is-dragging');
            updateDragHint(0);
            
            if (hasDragged && dragDistance > 15) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            setTimeout(() => {
                hasDragged = false;
                dragDistance = 0;
            }, 100);
            
            updateCenterCard();
        };

        // Mouse events
        container.addEventListener('mousedown', onDown);
        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseup', onUp);
        container.addEventListener('mouseleave', onUp);

        // Touch events
        container.addEventListener('touchstart', onDown, { passive: true });
        container.addEventListener('touchmove', onMove, { passive: false });
        container.addEventListener('touchend', onUp);
        container.addEventListener('touchcancel', onUp);

        // Scroll events
        container.addEventListener('scroll', () => {
            markInteracted();
            updateCenterCard();
        }, { passive: true });

        // Wheel events
        container.addEventListener('wheel', (e) => {
            markInteracted();
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                container.scrollLeft += e.deltaX;
                updateDragHint(e.deltaX > 0 ? 1 : -1);
                setTimeout(() => updateDragHint(0), 200);
                updateCenterCard();
            }
        });

        // Handle clicks on service cards
        container.addEventListener('click', (e) => {
            if (hasDragged && dragDistance > 15) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            const link = e.target.closest('.service-card-link');
            if (link && link.href && !hasDragged) {
                return true;
            }
        }, false);

        // Hold-to-zoom on individual cards
        container.querySelectorAll('.service-card').forEach(card => {
            let holdTimeout = null;
            
            const addHold = (e) => {
                if (isDown && dragDistance > 5) return;
                
                holdTimeout = setTimeout(() => {
                    if (!hasDragged) {
                        card.classList.add('is-holding');
                    }
                }, 300);
            };
            
            const removeHold = () => {
                if (holdTimeout) {
                    clearTimeout(holdTimeout);
                    holdTimeout = null;
                }
                card.classList.remove('is-holding');
            };

            card.addEventListener('mousedown', addHold);
            card.addEventListener('mouseup', removeHold);
            card.addEventListener('mouseleave', removeHold);
            card.addEventListener('touchstart', addHold, { passive: true });
            card.addEventListener('touchend', removeHold);
            card.addEventListener('touchcancel', removeHold);
            card.addEventListener('click', removeHold);
        });

        // Initial center card detection
        setTimeout(() => {
            updateCenterCard();
        }, 100);

        // Update on window resize
        window.addEventListener('resize', () => {
            updateCenterCard();
        }, { passive: true });
        
        // Keyboard navigation
        if (servicesSection) {
            servicesSection.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    scrollCarousel('left');
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    scrollCarousel('right');
                }
            });
        }
    });
}

function initializeMagneticCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        // Create content wrapper if it doesn't exist
        const content = card.innerHTML;
        card.innerHTML = `<div class="testimonial-card-content">${content}</div>`;
        
        const cardContent = card.querySelector('.testimonial-card-content');
        let isHovering = false;
        let animationId = null;
        
        // Magnetic effect variables
        const maxRotation = 15; // Maximum rotation in degrees
        const maxTranslation = 8; // Maximum translation in pixels
        
        function updateCardTransform(e) {
            if (!isHovering) return;
            
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateX = (mouseY / rect.height) * maxRotation * -1; // Inverted for natural feel
            const rotateY = (mouseX / rect.width) * maxRotation;
            
            // Calculate translation for subtle following effect
            const translateX = (mouseX / rect.width) * maxTranslation;
            const translateY = (mouseY / rect.height) * maxTranslation;
            
            // Apply transforms
            const transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateX(${translateX}px) 
                translateY(${translateY}px)
                translateZ(10px)
            `;
            
            card.style.transform = transform;
            
            // Add magnetic hover class for enhanced effects
            card.classList.add('magnetic-hover');
            
            // Schedule next update
            animationId = requestAnimationFrame(() => updateCardTransform(e));
        }
        
        function resetCard() {
            isHovering = false;
            
            // Cancel any pending animation
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            
            // Smooth return to original position
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px)';
            
            // Remove magnetic hover class
            card.classList.remove('magnetic-hover');
            
            // Reset transition after animation
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        }
        
        // Mouse enter - start magnetic effect
        card.addEventListener('mouseenter', (e) => {
            isHovering = true;
            card.style.transition = 'box-shadow 0.3s ease, transform 0.1s ease-out';
            updateCardTransform(e);
        });
        
        // Mouse move - update magnetic effect
        card.addEventListener('mousemove', (e) => {
            if (isHovering) {
                // Cancel previous animation frame to avoid stacking
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                updateCardTransform(e);
            }
        });
        
        // Mouse leave - reset card
        card.addEventListener('mouseleave', resetCard);
        
        // Handle window blur/focus for cleanup
        window.addEventListener('blur', () => {
            if (isHovering) {
                resetCard();
            }
        });
    });
}

// Confetti effect for testimonial cards
function createConfetti(element) {
    // Check if confetti container already exists
    if (element.querySelector('.confetti-container')) {
        return; // Prevent multiple confetti instances
    }
    
    const container = document.createElement('div');
    container.className = 'confetti-container';
    element.appendChild(container);
    
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    const shapes = ['circle', 'square', 'triangle'];
    
    // Create 15-20 confetti particles
    const particleCount = Math.floor(Math.random() * 6) + 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `confetti-particle ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.color = color;
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        particle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        
        // Random rotation
        particle.style.setProperty('--rotation-end', Math.random() * 360 + 'deg');
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 2500);
    }
    
    // Remove container after all particles are done
    setTimeout(() => {
        if (container.parentNode) {
            container.remove();
        }
    }, 3000);
}

// Parallax effect for sections - Direct sliding effect
function initializeParallax() {
    const servicesSection = document.getElementById('services');
    const whyUsSection = document.getElementById('why-us');
    
    if (!servicesSection || !whyUsSection) {
        console.log('❌ Parallax: Sections not found');
        return;
    }
    
    console.log('✅ Parallax initialized successfully');
    console.log('Services section:', servicesSection);
    console.log('Why-us section:', whyUsSection);
    
    // Add debug mode - you can remove this later
    whyUsSection.classList.add('parallax-debug');
    
    // Make why-us section positioned for parallax
    whyUsSection.style.position = 'relative';
    whyUsSection.style.zIndex = '20';
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Get section positions
        const servicesRect = servicesSection.getBoundingClientRect();
        const whyUsRect = whyUsSection.getBoundingClientRect();
        
        // Simple, clear parallax zone - only when why-us is entering viewport
        const parallaxStart = windowHeight;
        const parallaxEnd = 0;
        
        // Check if we're in the clean parallax zone
        if (whyUsRect.top <= parallaxStart && whyUsRect.top >= parallaxEnd) {
            // Simple linear progress for clarity
            const progress = 1 - (whyUsRect.top / parallaxStart);
            const clampedProgress = Math.max(0, Math.min(1, progress));
            
            if (clampedProgress > 0) {
                // Simple, clean sliding effect - no complex transforms
                const slideDistance = clampedProgress * 80; // Reduced from 300px to 80px
                const scaleValue = 0.95 + (clampedProgress * 0.05); // Minimal scale: 0.95 to 1.0
                
                // Clean transforms without blur or rotation for clarity
                whyUsSection.style.setProperty('transition', 'none', 'important');
                whyUsSection.style.setProperty('transform', 
                    `translateY(-${slideDistance}px) scale(${scaleValue})`, 
                    'important');
                whyUsSection.style.setProperty('z-index', '15', 'important');
                whyUsSection.style.setProperty('box-shadow', 
                    `0 -${5 + clampedProgress * 15}px ${10 + clampedProgress * 20}px rgba(0,0,0,${0.1 + clampedProgress * 0.1})`, 
                    'important');
                
                // Minimal effect on services section for clarity
                const servicesOpacity = 1 - (clampedProgress * 0.3);
                servicesSection.style.setProperty('opacity', servicesOpacity.toString(), 'important');
                
                console.log(`� Clean Parallax: ${clampedProgress.toFixed(2)}, Slide: ${slideDistance}px`);
            }
        } else {
            // Clean reset with smooth transition
            whyUsSection.style.setProperty('transition', 'all 0.3s ease', 'important');
            whyUsSection.style.removeProperty('transform');
            whyUsSection.style.removeProperty('box-shadow');
            whyUsSection.style.removeProperty('z-index');
            
            // Reset services section
            servicesSection.style.setProperty('transition', 'opacity 0.3s ease', 'important');
            servicesSection.style.removeProperty('opacity');
            
            console.log(`🔄 Clean reset completed`);
        }
    }
    
    // Add scroll listener with throttling
    let parallaxTicking = false;
    function onScroll() {
        if (!parallaxTicking) {
            requestAnimationFrame(() => {
                updateParallax();
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    updateParallax(); // Initial call
    
    // Manual test function - call testParallax() in console
    window.testParallax = function() {
        console.log('🧪 Testing clean, simple parallax...');
        
        // Test the simplified parallax effect
        let testProgress = 0;
        const testInterval = setInterval(() => {
            testProgress += 0.05; // Larger increments for smoother demo
            
            if (testProgress <= 1) {
                // Simple linear movement for clarity
                const slideDistance = testProgress * 80; // Clean 80px movement
                const scaleValue = 0.95 + (testProgress * 0.05); // Minimal scale
                
                whyUsSection.style.setProperty('transition', 'none', 'important');
                whyUsSection.style.setProperty('transform', 
                    `translateY(-${slideDistance}px) scale(${scaleValue})`, 
                    'important');
                whyUsSection.style.setProperty('box-shadow', 
                    `0 -${5 + testProgress * 15}px ${10 + testProgress * 20}px rgba(0,0,0,${0.1 + testProgress * 0.1})`, 
                    'important');
                
                // Simple opacity change on services
                const servicesOpacity = 1 - (testProgress * 0.3);
                servicesSection.style.setProperty('opacity', servicesOpacity.toString(), 'important');
                
                console.log(`Clean test progress: ${testProgress.toFixed(2)}, Slide: ${slideDistance}px`);
            } else {
                // Clean reset
                clearInterval(testInterval);
                console.log('🔄 Testing clean reset...');
                
                whyUsSection.style.setProperty('transition', 'all 0.3s ease', 'important');
                servicesSection.style.setProperty('transition', 'opacity 0.3s ease', 'important');
                
                setTimeout(() => {
                    whyUsSection.style.removeProperty('transform');
                    whyUsSection.style.removeProperty('box-shadow');
                    servicesSection.style.removeProperty('opacity');
                    console.log('✅ Clean reset completed - no jarring effects');
                }, 100);
            }
        }, 100); // Slower intervals for clearer demonstration
    };
    
    console.log('💡 Type testParallax() in console to test the effect manually');
}

// Page transition effects
function initializePageTransitions() {
    // Create transition overlay element
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="page-transition-content">
            <div class="page-transition-spinner"></div>
            <div class="page-transition-text">Loading...</div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Add page fade-in class on load
    document.body.classList.add('page-fade-in');
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="/"], nav a[href^="#"]');
    const footerLinks = document.querySelectorAll('footer a[href^="/"]');
    const allTransitionLinks = [...navLinks, ...footerLinks];
    
    console.log('🔄 Page transitions initialized for', allTransitionLinks.length, 'links');
    
    allTransitionLinks.forEach(link => {
        // Skip hash links (internal page navigation)
        if (link.getAttribute('href').startsWith('#')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const linkText = this.textContent.trim();
            
            // Update transition text
            overlay.querySelector('.page-transition-text').textContent = `Loading ${linkText}...`;
            
            // Show overlay
            document.body.classList.add('page-loading');
            overlay.classList.add('active');
            
            console.log(`🚀 Page transition started to: ${href}`);
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            // Page was loaded from cache
            overlay.classList.remove('active');
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-fade-in');
        }
    });
    
    // Remove loading state on page unload
    window.addEventListener('beforeunload', function() {
        overlay.classList.remove('active');
        document.body.classList.remove('page-loading');
    });
}

// Enhanced magnetic cards with confetti and spotlight effect
function enhanceMagneticCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    
    if (!testimonialsGrid) return;
    
    testimonialCards.forEach(card => {
        let confettiTimeout = null;
        
        card.addEventListener('mouseenter', () => {
            // Clear any existing confetti timeout
            if (confettiTimeout) {
                clearTimeout(confettiTimeout);
            }
            
            // Activate spotlight mode
            testimonialsGrid.classList.add('spotlight-mode');
            card.classList.add('spotlight-active');
            
            // Remove spotlight-active from all other cards
            testimonialCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('spotlight-active');
                }
            });
            
            // Create confetti after a short delay to prevent spam
            confettiTimeout = setTimeout(() => {
                createConfetti(card);
            }, 200);
        });
        
        card.addEventListener('mouseleave', () => {
            // Clear confetti timeout if user leaves quickly
            if (confettiTimeout) {
                clearTimeout(confettiTimeout);
                confettiTimeout = null;
            }
            
            // Remove spotlight effects
            card.classList.remove('spotlight-active');
            testimonialsGrid.classList.remove('spotlight-mode');
        });
    });
    
    // Also handle when mouse leaves the entire testimonials grid
    testimonialsGrid.addEventListener('mouseleave', () => {
        testimonialsGrid.classList.remove('spotlight-mode');
        testimonialCards.forEach(card => {
            card.classList.remove('spotlight-active');
        });
    });
}

// Test function for vibrant spotlight effect (can be called from browser console)
function testSpotlightEffect() {
    const cards = document.querySelectorAll('.testimonial-card');
    const grid = document.querySelector('.testimonials-grid');
    
    if (cards.length === 0) {
        console.log('❌ No testimonial cards found');
        return;
    }
    
    console.log('🌈 Testing VIBRANT spotlight effect on', cards.length, 'cards');
    
    // Test spotlight on first card
    grid.classList.add('spotlight-mode');
    cards[0].classList.add('spotlight-active');
    
    console.log('� VIBRANT spotlight activated on first card for 4 seconds');
    console.log('✨ Features: Blue-green-gold torch beam, vibrant glow, gentle dimming');
    
    setTimeout(() => {
        grid.classList.remove('spotlight-mode');
        cards[0].classList.remove('spotlight-active');
        console.log('🎯 Vibrant spotlight test completed');
    }, 4000);
}

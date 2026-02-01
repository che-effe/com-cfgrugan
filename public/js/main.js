// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Project Filtering (Digital Work Page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Article Filtering (Articles Page)
    const articleFilterButtons = document.querySelectorAll('.articles-filter .filter-btn');
    const articleCards = document.querySelectorAll('.article-card');

    articleFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            articleFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter articles
            articleCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Image Lightbox Modal
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoSource = document.getElementById('modalVideoSource');
    const modalTitle = document.getElementById('modalTitle');
    const modalMedium = document.getElementById('modalMedium');
    const modalDate = document.getElementById('modalDate');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalLinks = document.getElementById('modalLinks');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open modal when gallery item is clicked (Analog Art Page)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const medium = this.querySelector('.artwork-medium')?.textContent || '';
            const date = this.querySelector('.artwork-date')?.textContent || '';
            const description = this.querySelector('.artwork-description')?.textContent || '';

            // Set modal content for analog art
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
            
            modalTitle.textContent = title;
            if (modalMedium) modalMedium.textContent = medium;
            if (modalDate) modalDate.textContent = date;
            modalDescription.textContent = description;
            
            // Clear tags and links for analog art
            if (modalTags) modalTags.innerHTML = '';
            if (modalLinks) modalLinks.innerHTML = '';

            // Show modal
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Open modal when project card is clicked (Digital Work Page)
    projectCards.forEach(card => {
        const projectImage = card.querySelector('.project-image');
        if (projectImage) {
            projectImage.addEventListener('click', function() {
                const img = this.querySelector('img');
                const video = this.querySelector('video');
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const tags = card.querySelectorAll('.tag');
                const links = card.querySelectorAll('.project-links a');

                modalTitle.textContent = title;
                modalDescription.textContent = description;

                // Handle video or image
                if (video && video.querySelector('source')) {
                    const videoSrc = video.querySelector('source').src;
                    modalVideoSource.src = videoSrc;
                    modalVideo.load();
                    modalVideo.style.display = 'block';
                    modalImage.style.display = 'none';
                    modalVideo.play();
                } else if (img) {
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                    modalImage.style.display = 'block';
                    modalVideo.style.display = 'none';
                }

                // Clear and hide medium/date for digital projects
                if (modalMedium) modalMedium.textContent = '';
                if (modalDate) modalDate.textContent = '';

                // Add tags
                if (modalTags) {
                    modalTags.innerHTML = '';
                    tags.forEach(tag => {
                        const tagElement = document.createElement('span');
                        tagElement.className = 'tag';
                        tagElement.textContent = tag.textContent;
                        modalTags.appendChild(tagElement);
                    });
                }

                // Add links
                if (modalLinks) {
                    modalLinks.innerHTML = '';
                    links.forEach(link => {
                        const linkElement = document.createElement('a');
                        linkElement.href = link.href;
                        linkElement.target = '_blank';
                        linkElement.className = link.className;
                        linkElement.textContent = link.textContent;
                        modalLinks.appendChild(linkElement);
                    });
                }

                // Show modal
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Close modal functions
    function closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Pause video if playing
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    }

    // Close modal when close button is clicked
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when overlay is clicked
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal when escape key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && imageModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Art Category Filtering (Analog Art Page)
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.preview-card, .community-item, .project-card, .gallery-item, .timeline-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Utility function to debounce events
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

    // Handle window resize events
    const handleResize = debounce(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .animate-slide-in {
            animation: slideInFromLeft 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Lazy load images when they're added
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    lazyLoadImages();

    // Add loading states for dynamic content
    function showLoading(element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }

    function hideLoading(element, content) {
        element.innerHTML = content;
    }

    // Console welcome message
    console.log('%c Welcome to My Portfolio! ', 'background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
    console.log('Built with Node.js, Express, and Vanilla JavaScript');
    console.log('Check out the source code and feel free to reach out!');
});
// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 77, 46, 0.98)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'rgba(26, 77, 46, 0.95)';
        navbar.style.padding = '1rem 0';
    }
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let images = [];

// Collect all gallery images
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    images = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-src'),
        caption: item.querySelector('p').textContent
    }));

    // Also make timeline images clickable
    const timelineImages = document.querySelectorAll('.timeline-img');
    timelineImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            const imgData = {
                src: img.getAttribute('src'),
                caption: img.getAttribute('alt')
            };
            // Find this image in our images array or add it temporarily
            const imgIndex = images.findIndex(i => i.src === imgData.src);
            if (imgIndex !== -1) {
                openLightbox(imgIndex);
            }
        });
    });

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    if (images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// Event Listeners for Lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .gallery-item, .highlight-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Parallax Effect for Hero Section - Disabled to keep people visible
// window.addEventListener('scroll', () => {
//     const hero = document.querySelector('.hero');
//     const scrollPosition = window.pageYOffset;
//     if (hero) {
//         hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
//     }
// });

// Counter Animation for Stats (if needed in future)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile Menu Toggle (for future enhancement)
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');

    // This can be enhanced later with a hamburger menu
    if (window.innerWidth <= 768) {
        // Add mobile menu functionality if needed
    }
}

// Add hover effect sound (optional, commented out)
// const hoverSound = new Audio('path/to/hover-sound.mp3');
// document.querySelectorAll('.gallery-item, .highlight-card').forEach(item => {
//     item.addEventListener('mouseenter', () => {
//         hoverSound.currentTime = 0;
//         hoverSound.play();
//     });
// });

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initScrollAnimations();
    initMobileMenu();

    console.log('Golf Memories website loaded successfully! ⛳');
});

// Add image lazy loading for performance
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll event
const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add smooth reveal for sections
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

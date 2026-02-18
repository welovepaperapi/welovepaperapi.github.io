// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = spans[0].style.transform === 'rotate(45deg) translateY(10px)' 
        ? '' 
        : 'rotate(45deg) translateY(10px)';
    spans[1].style.opacity = spans[1].style.opacity === '0' ? '1' : '0';
    spans[2].style.transform = spans[2].style.transform === 'rotate(-45deg) translateY(-10px)' 
        ? '' 
        : 'rotate(-45deg) translateY(-10px)';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.querySelectorAll('span').forEach(span => {
            span.style.transform = '';
            span.style.opacity = '1';
        });
    });
});

// Active nav link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .stat-box, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff88, #00d4ff);
            color: #050a1a;
            padding: 20px 30px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;
        notification.textContent = '✓ Nachricht wurde empfangen! Danke für deine Anfrage!';
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a backend service here
        console.log('Form data:', data);
    });
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Create advanced particle animations
function createParticles() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${['#00ff88', '#00d4ff', '#ff00ff'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: float ${Math.random() * 15 + 10}s linear infinite;
            pointer-events: none;
        `;
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.background = 'linear-gradient(180deg, rgba(10, 14, 39, 0.98) 0%, rgba(10, 14, 39, 0.95) 100%)';
        navbar.style.borderBottom = '2px solid #00ff88';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.borderBottom = '1px solid #2d3656';
    }
});

// Add typing animation to title
function typeWriter() {
    const title = document.querySelector('.title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    // Start typing after page loads
    setTimeout(type, 500);
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', typeWriter);
} else {
    typeWriter();
}

// Counter animation for stats
function animateCounters() {
    const statBoxes = document.querySelectorAll('.stat-box h3');
    
    const counterOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text);
                
                if (number) {
                    let current = 0;
                    const increment = number / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(counter);
                            target.classList.add('counted');
                        } else {
                            target.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                        }
                    }, 30);
                }
            }
        });
    }, counterOptions);
    
    statBoxes.forEach(box => counterObserver.observe(box));
}

// Wait before animating counters
setTimeout(animateCounters, 1000);

// Smooth scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add glow effect to buttons on hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--mouse-x', x + 'px');
        btn.style.setProperty('--mouse-y', y + 'px');
    });
});

// Detect dark theme preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
}

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

// Prevent horizontal scroll on mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        // Prevent default swipe behavior
        return false;
    }
}

// Add CSS variables support for pointer tracking
const style = document.createElement('style');
style.textContent = `
    .btn {
        --mouse-x: 0px;
        --mouse-y: 0px;
    }
    
    @keyframes slideOutRight {
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Lock Overlay Animation
const lockOverlay = document.querySelector('.lock-overlay');
const lockIcon = document.querySelector('.lock-icon');
const contactContent = document.querySelector('.contact-content');
const contactSubtitle = document.querySelector('.contact-subtitle');

if (lockOverlay && lockIcon) {
    lockOverlay.addEventListener('click', () => {
        // Shake animation
        lockIcon.classList.add('locked');
        
        // Remove animation class after it finishes
        setTimeout(() => {
            lockIcon.classList.remove('locked');
        }, 800);
    });
}

console.log('🚀 Portfolio loaded successfully!');
console.log('✨ Made with love by Philipp Zinhobl');

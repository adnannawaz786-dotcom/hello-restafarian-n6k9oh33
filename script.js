// Rastafarian-themed interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeAnimations();
    initializeColorCycle();
    initializeResponsiveEffects();
    initializeAccessibility();
});

// Smooth entrance animations
function initializeAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    // Add staggered fade-in effect
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
}

// Interactive color cycling effect
function initializeColorCycle() {
    const title = document.querySelector('h1');
    const colors = ['#ff6b35', '#f7931e', '#ffd700', '#228b22', '#ff0000'];
    let colorIndex = 0;
    
    if (!title) return;
    
    // Add click event for color cycling
    title.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.color = colors[colorIndex];
        this.style.transition = 'color 0.5s ease';
        
        // Add pulse effect
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Add hover effect
    title.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
    });
    
    title.addEventListener('mouseleave', function() {
        this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
    });
}

// Responsive interaction effects
function initializeResponsiveEffects() {
    // Add parallax effect to background elements
    window.addEventListener('scroll', throttle(handleParallax, 16));
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add window resize handler
    window.addEventListener('resize', debounce(handleResize, 250));
}

// Accessibility enhancements
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #ffd700';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Parallax scroll effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Handle window resize
function handleResize() {
    // Recalculate any size-dependent animations
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < 768;
    
    // Adjust animations for mobile devices
    if (isMobile) {
        document.body.classList.add('mobile-view');
        // Reduce animation intensity on mobile
        document.documentElement.style.setProperty('--animation-scale', '0.8');
    } else {
        document.body.classList.remove('mobile-view');
        document.documentElement.style.setProperty('--animation-scale', '1');
    }
}

// Utility function to throttle scroll events
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
    };
}

// Utility function to debounce resize events
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

// Add floating animation to decorative elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const duration = 3000 + (index * 500); // Stagger the animations
        const amplitude = 10 + (index * 5); // Vary the floating distance
        
        element.style.animation = `floating ${duration}ms ease-in-out infinite`;
        element.style.animationDelay = `${index * 200}ms`;
    });
}

// Initialize floating animations after DOM load
setTimeout(addFloatingAnimation, 1000);

// Add CSS custom properties for dynamic theming
function updateThemeProperties() {
    const root = document.documentElement;
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDarkMode) {
        root.style.setProperty('--bg-opacity', '0.9');
        root.style.setProperty('--text-shadow-intensity', '0.5');
    } else {
        root.style.setProperty('--bg-opacity', '0.95');
        root.style.setProperty('--text-shadow-intensity', '0.3');
    }
}

// Listen for color scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeProperties);
updateThemeProperties();

// Error handling for missing elements
function safeElementOperation(selector, operation) {
    try {
        const element = document.querySelector(selector);
        if (element && typeof operation === 'function') {
            operation(element);
        }
    } catch (error) {
        console.warn(`Safe operation failed for selector: ${selector}`, error);
    }
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 0);
    });
}
// Create Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll
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

// Reveal Animation on Scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Animate Counter Numbers
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function currentSlide(n) {
    currentTestimonial = n;
    updateSlider();
}

function updateSlider() {
    const track = document.getElementById('testimonialTrack');
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// Auto-slide testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateSlider();
}, 5000);

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Mouse Trail Effect
const coords = { x: 0, y: 0 };
const circles = [];
const colors = ['rgba(0, 212, 255, 0.4)', 'rgba(123, 47, 247, 0.4)', 'rgba(255, 0, 110, 0.4)'];

for (let i = 0; i < 15; i++) {
    const circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.width = '15px';
    circle.style.height = '15px';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = colors[i % colors.length];
    circle.style.pointerEvents = 'none';
    circle.style.zIndex = '9998';
    circle.style.transition = 'transform 0.15s ease-out';
    circle.style.boxShadow = `0 0 15px ${colors[i % colors.length]}`;
    document.body.appendChild(circle);
    circles.push({ elem: circle, x: 0, y: 0 });
}

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.elem.style.left = x - 7.5 + 'px';
        circle.elem.style.top = y - 7.5 + 'px';
        circle.elem.style.transform = `scale(${(circles.length - index) / circles.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.25;
        y += (nextCircle.y - y) * 0.25;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

// Add hover effect to stat cards with ripple
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 212, 255, 0.5)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = card.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add 3D tilt effect to course cards
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Initialize
window.addEventListener('load', () => {
    createParticles();
    animateCounter();
    reveal();
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
});

// Intersection Observer for staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Add glow effect on hover for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', x + 'px');
        button.style.setProperty('--y', y + 'px');
    });
});

// Floating animation for icons in hero
const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
});

// Add typing effect to hero text
const heroTitle = document.querySelector('.hero-content h1');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';
let charIndex = 0;

function typeWriter() {
    if (charIndex < originalText.length) {
        heroTitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const scrolled = window.scrollY;
    const maxScroll = 500; // Adjust this value to control how much scroll triggers full darkness
    const scrollPercent = Math.min(scrolled / maxScroll, 1); // 0 to 1
    
    if (scrolled > 0) {
        nav.classList.add('scrolled');
        
        // Interpolate between light and dark gradient
        const r1 = Math.round(179 - (179 * scrollPercent)); // #B3F7FF → darker
        const g1 = Math.round(247 - (247 * scrollPercent));
        const b1 = Math.round(255 - (200 * scrollPercent));
        
        const r2 = Math.round(66 - (52 * scrollPercent)); // #4242C2 → darker
        const g2 = Math.round(66 - (26 * scrollPercent));
        const b2 = Math.round(194 - (77 * scrollPercent));
        
        const r3 = Math.round(75 - (75 * scrollPercent)); // #4B0096 → darker
        const g3 = Math.round(0);
        const b3 = Math.round(150 - (102 * scrollPercent));
        
        nav.style.background = `linear-gradient(45deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}), rgb(${r3},${g3},${b3}))`;
    } else {
        nav.classList.remove('scrolled');
        nav.style.background = 'linear-gradient(45deg, #B3F7FF, #4242C2, #4B0096)';
    }
});
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

const coords = { x: 0, y: 0 };
const circles = [];
const colors = ['rgba(0, 212, 255, 0.4)', 'rgba(123, 47, 247, 0.4)', 'rgba(255, 0, 110, 0.4)'];

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


function updateCountdown() {
            const targetDate = new Date('2026-01-16').getTime();
            const now = new Date().getTime();
            const difference = targetDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('countdown').textContent = 
                `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (difference < 0) {
                document.getElementById('countdown').textContent = 'Launch Time!';
            }
        }

        updateCountdown();
setInterval(updateCountdown, 1000);

const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
});

document.addEventListener('DOMContenLoaded', () => {
    const triggerSection = document.getElementById('trigger-section')
    const triggerSection = document.getElementById('floating-banner')

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {})
      entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatingBanner.classList.add('is-visible');
                console.log('Banner displayed: Trigger section is visible.');
            } else {
                floatingBanner.classlist.remove('is-visible');
                console.log('Banner hidden: Trigger section is not visible.');
            }
        });}.    , ovbserverOptions;


    if (triggerSection) {
        observer.observe(triggerSection);
    }
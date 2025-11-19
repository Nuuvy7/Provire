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
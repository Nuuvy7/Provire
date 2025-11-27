document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');

    function updateNavbar() {
        if (window.scrollY >= window.innerHeight) {
            //section 2+
            navbar.style.height = 'auto'; 
            navbar.style.opacity = '0.95';
            navbar.style.backgroundColor = '#184188';
            navbar.style.padding = '5px 15px';
            navbar.style.top = '0';
        } else {
            //section 1
            navbar.style.height = '0';
            navbar.style.opacity = '0';
            navbar.style.backgroundColor = 'transparent';
            navbar.style.padding = '0 0'; 
        }
    }

    updateNavbar(); // Jalankan saat load
    window.addEventListener('scroll', updateNavbar);
});

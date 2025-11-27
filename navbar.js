document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');

    function updateNavbar() {
        if (window.scrollY >= window.innerHeight) {
            // Di section 2+, height naik ke nilai penuh (misalnya 50px), opacity 1, background solid
            navbar.style.height = 'auto'; // Ganti dengan tinggi navbar yang kamu inginkan, e.g., 'auto' jika fleksibel
            navbar.style.opacity = '1';
            navbar.style.backgroundColor = '#000000ff'; // Ganti warna solid
            navbar.style.padding = '15px 25px'; 
        } else {
            // Di section 1, height 0, opacity 0, background transparan
            navbar.style.height = '0';
            navbar.style.opacity = '0';
            navbar.style.backgroundColor = 'transparent';
            navbar.style.padding = '0px 0px'; 
        }
    }

    updateNavbar(); // Jalankan saat load
    window.addEventListener('scroll', updateNavbar);
});

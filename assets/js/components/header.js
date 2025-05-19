document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('block');
            
            // Toggle icon between menu and x
            const menuIcon = mobileMenuButton.querySelector('.menu-icon');
            const closeIcon = mobileMenuButton.querySelector('.close-icon');
            
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });
    }

    // Sticky header with shadow on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
                header.classList.remove('bg-white');
            } else {
                header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
                header.classList.add('bg-white');
            }
        });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('text-blue-600', 'font-semibold');
            link.classList.remove('text-gray-700');
        }
    });
});
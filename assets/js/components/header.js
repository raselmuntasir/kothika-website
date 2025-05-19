function initializeHeaderMenu() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Search functionality
    function handleSearch(event) {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput') || document.getElementById('mobileSearchInput');
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm) {
            // Search in courses
            const courses = document.querySelectorAll('.course-card');
            courses.forEach(course => {
                const title = course.querySelector('.course-title').textContent.toLowerCase();
                const description = course.querySelector('.course-instructor')?.textContent.toLowerCase() || '';
                const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
                course.style.display = isVisible ? 'block' : 'none';
            });

            // Search in blog posts
            const blogPosts = document.querySelectorAll('.blog-post');
            blogPosts.forEach(post => {
                const title = post.querySelector('.blog-title').textContent.toLowerCase();
                const content = post.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
                const isVisible = title.includes(searchTerm) || content.includes(searchTerm);
                post.style.display = isVisible ? 'block' : 'none';
            });

            // If no results found, show message
            const noResults = document.getElementById('noResults');
            if (noResults) {
                const hasVisibleResults = Array.from(courses).some(course => course.style.display !== 'none') ||
                                        Array.from(blogPosts).some(post => post.style.display !== 'none');
                noResults.style.display = hasVisibleResults ? 'none' : 'block';
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        }
    }

    // Add search event listeners
    const searchForm = document.getElementById('searchForm');
    const mobileSearchForm = document.getElementById('mobileSearchForm');
    
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', handleSearch);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileMenuBtn && mobileMenu && closeMobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            // Reinitialize icons after showing menu
            lucide.createIcons();
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');

    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.add('hidden');
            }
        });
    }

    // Theme toggle functionality
    function setupThemeToggle(themeToggleBtn) {
        if (!themeToggleBtn) return;

        const sunIcon = themeToggleBtn.querySelector('[data-lucide="sun"]');
        const moonIcon = themeToggleBtn.querySelector('[data-lucide="moon"]');

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            updateThemeIcons(savedTheme === 'dark');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark);
        });

        function updateThemeIcons(isDark) {
            if (sunIcon && moonIcon) {
                sunIcon.classList.toggle('hidden', isDark);
                moonIcon.classList.toggle('hidden', !isDark);
            }
        }
    }

    // Setup both desktop and mobile theme toggles
    setupThemeToggle(document.getElementById('themeToggle'));
    setupThemeToggle(document.getElementById('mobileThemeToggle'));

    // Sticky header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('shadow-lg', 'bg-[#181E38]/95', 'backdrop-blur-sm');
        } else {
            header.classList.remove('shadow-lg', 'bg-[#181E38]/95', 'backdrop-blur-sm');
        }
        
        lastScroll = currentScroll;
    });

    // Active link highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || 
            (currentPath.endsWith('/') && linkPath === 'index.html') ||
            (currentPath.endsWith(linkPath))) {
            link.classList.add('text-[#E94742]');
        }
    });

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && mobileMenu) {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });
}

// Initialize header menu when the script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeaderMenu);
} else {
    initializeHeaderMenu();
}
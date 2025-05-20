function initializeHeaderMenu() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Search functionality
    function handleSearch(event) {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput') || document.getElementById('mobileSearchInput');
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm) {
            const results = [];
            
            // Search in courses
            const courses = document.querySelectorAll('.course-card, [class*="course"]');
            courses.forEach(course => {
                const title = course.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = course.querySelector('p')?.textContent.toLowerCase() || '';
                const instructor = course.querySelector('.text-gray-600')?.textContent.toLowerCase() || '';
                const link = course.querySelector('a')?.href || '#';
                const thumbnail = course.querySelector('img')?.src || '';
                const price = course.querySelector('.text-lg')?.textContent || '';
                const rating = course.querySelector('.text-yellow-500')?.textContent || '';
                const category = course.querySelector('.bg-blue-600')?.textContent.toLowerCase() || '';

                // Check if search term matches any part of the course
                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    instructor.includes(searchTerm) ||
                    category.includes(searchTerm)) {
                    results.push({
                        type: 'course',
                        title: course.querySelector('h3')?.textContent || '',
                        description: course.querySelector('p')?.textContent || '',
                        instructor: course.querySelector('.text-gray-600')?.textContent || '',
                        link: link,
                        thumbnail: thumbnail,
                        price: price,
                        rating: rating,
                        category: category
                    });
                }
            });

            // Search in blog posts
            const blogPosts = document.querySelectorAll('.blog-post, [class*="blog"]');
            blogPosts.forEach(post => {
                const title = post.querySelector('h3')?.textContent.toLowerCase() || '';
                const content = post.querySelector('p')?.textContent.toLowerCase() || '';
                const author = post.querySelector('.text-gray-600')?.textContent.toLowerCase() || '';
                const link = post.querySelector('a')?.href || '#';
                const thumbnail = post.querySelector('img')?.src || '';

                if (title.includes(searchTerm) || 
                    content.includes(searchTerm) || 
                    author.includes(searchTerm)) {
                    results.push({
                        type: 'blog',
                        title: post.querySelector('h3')?.textContent || '',
                        description: post.querySelector('p')?.textContent || '',
                        author: post.querySelector('.text-gray-600')?.textContent || '',
                        link: link,
                        thumbnail: thumbnail
                    });
                }
            });

            // Show results
            const searchResults = document.getElementById('searchResults');
            const mobileSearchResults = document.getElementById('mobileSearchResults');
            const searchResultsContent = document.getElementById('searchResultsContent');
            const mobileSearchResultsContent = document.getElementById('mobileSearchResultsContent');
            const noResults = document.getElementById('noResults');
            const mobileNoResults = document.getElementById('mobileNoResults');

            if (results.length > 0) {
                // Show results
                searchResults?.classList.remove('hidden');
                mobileSearchResults?.classList.remove('hidden');
                noResults?.classList.add('hidden');
                mobileNoResults?.classList.add('hidden');

                // Render results
                const resultsHTML = results.map(result => `
                    <a href="${result.link}" class="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-100 dark:border-gray-700 mb-3">
                        <div class="flex items-start gap-4">
                            ${result.thumbnail ? `
                                <div class="flex-shrink-0">
                                    <img src="${result.thumbnail}" alt="${result.title}" class="w-20 h-20 object-cover rounded-lg shadow-sm">
                                </div>
                            ` : ''}
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between mb-1">
                                    <h4 class="font-semibold text-gray-900 dark:text-gray-100 text-lg truncate">${result.title}</h4>
                                    ${result.price ? `
                                        <span class="text-sm font-bold text-[#E94742]">${result.price}</span>
                                    ` : ''}
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">${result.description}</p>
                                ${result.instructor ? `
                                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        <i data-lucide="user" class="w-4 h-4 mr-1"></i>
                                        <span>${result.instructor}</span>
                                    </div>
                                ` : ''}
                                <div class="flex items-center justify-between">
                                    ${result.rating ? `
                                        <div class="flex items-center text-sm">
                                            <i data-lucide="star" class="w-4 h-4 text-yellow-500 fill-current mr-1"></i>
                                            <span class="text-gray-600 dark:text-gray-400">${result.rating}</span>
                                        </div>
                                    ` : ''}
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${result.type === 'course' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}">
                                        ${result.type === 'course' ? 'কোর্স' : 'ব্লগ'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                `).join('');

                searchResultsContent.innerHTML = resultsHTML;
                mobileSearchResultsContent.innerHTML = resultsHTML;

                // Highlight matching text
                const regex = new RegExp(searchTerm, 'gi');
                searchResultsContent.innerHTML = searchResultsContent.innerHTML.replace(
                    regex,
                    match => `<span class="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">${match}</span>`
                );
                mobileSearchResultsContent.innerHTML = mobileSearchResultsContent.innerHTML.replace(
                    regex,
                    match => `<span class="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">${match}</span>`
                );
            } else {
                // Show no results message
                searchResults?.classList.remove('hidden');
                mobileSearchResults?.classList.remove('hidden');
                noResults?.classList.remove('hidden');
                mobileNoResults?.classList.remove('hidden');
                searchResultsContent.innerHTML = '';
                mobileSearchResultsContent.innerHTML = '';
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        } else {
            // Hide results if search term is empty
            const searchResults = document.getElementById('searchResults');
            const mobileSearchResults = document.getElementById('mobileSearchResults');
            searchResults?.classList.add('hidden');
            mobileSearchResults?.classList.add('hidden');
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

    // Close search results
    const closeSearchResults = document.getElementById('closeSearchResults');
    const closeMobileSearchResults = document.getElementById('closeMobileSearchResults');
    
    if (closeSearchResults) {
        closeSearchResults.addEventListener('click', () => {
            document.getElementById('searchResults')?.classList.add('hidden');
        });
    }
    
    if (closeMobileSearchResults) {
        closeMobileSearchResults.addEventListener('click', () => {
            document.getElementById('mobileSearchResults')?.classList.add('hidden');
        });
    }

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        const searchResults = document.getElementById('searchResults');
        const mobileSearchResults = document.getElementById('mobileSearchResults');
        const searchForm = document.getElementById('searchForm');
        const mobileSearchForm = document.getElementById('mobileSearchForm');

        if (searchResults && !searchResults.contains(e.target) && !searchForm?.contains(e.target)) {
            searchResults.classList.add('hidden');
        }

        if (mobileSearchResults && !mobileSearchResults.contains(e.target) && !mobileSearchForm?.contains(e.target)) {
            mobileSearchResults.classList.add('hidden');
        }
    });

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
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcons(savedTheme === 'dark');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            const theme = isDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
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
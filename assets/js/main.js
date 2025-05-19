// হেডার/ফুটার ইনক্লুড করার ফাংশন
document.addEventListener('DOMContentLoaded', async () => {
    // Load all includes
    document.querySelectorAll('[data-include]').forEach(element => {
        fetch(element.getAttribute('data-include'))
            .then(response => response.text())
            .then(html => {
                element.innerHTML = html;
                if (element.getAttribute('data-include').includes('header.html')) {
                    initializeHeader();
                }
                lucide.createIcons();
            })
            .catch(error => {
                console.error('Error loading include:', error);
            });
    });

    // জনপ্রিয় কোর্স লোড
    if (document.getElementById('popularCourses')) {
        loadPopularCourses();
    }

    // পেজ লোড時に থিম চেক
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

// Initialize header components
function initializeHeader() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', 
                mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuButton = document.getElementById('mobileMenuButton');

    function toggleTheme() {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        
        // আইকন আপডেট
        const icons = document.querySelectorAll('[data-lucide="sun"], [data-lucide="moon"]');
        icons.forEach(icon => {
            icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        });
        lucide.createIcons();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleTheme);
    }

    // Set active nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function loadPopularCourses() {
    // জনপ্রিয় কোর্স লোড করার লজিক
    const popularCourses = [
        {
            title: "ফেসবুক এডস মাস্টারি",
            category: "digital-marketing",
            instructor: "rasel",
            rating: 4.8,
            students: 1245,
            duration: "৬ ঘণ্টা ৩০ মিনিট",
            price: 2999,
            thumbnail: "assets/images/courses/facebook-ads-course.jpg"
        },
        {
            title: "প্রিমিয়ার প্রো এডিটিং",
            category: "video-editing",
            instructor: "kamrul",
            rating: 4.6,
            students: 892,
            duration: "৮ ঘণ্টা ১৫ মিনিট",
            price: 2499,
            thumbnail: "assets/images/courses/premiere-pro-course.jpg"
        },
        {
            title: "স্টার্টআপ স্ট্রাটেজি",
            category: "business",
            instructor: "barshan",
            rating: 4.9,
            students: 567,
            duration: "৫ ঘণ্টা ৪৫ মিনিট",
            price: 3499,
            thumbnail: "assets/images/courses/startup-strategy-course.jpg"
        }
    ];

    const popularCoursesEl = document.getElementById('popularCourses');
    popularCoursesEl.innerHTML = popularCourses.map(course => `
        <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div class="relative">
                <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-48 object-cover">
                <span class="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">${course.category.replace('-', ' ')}</span>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">${course.title}</h3>
                <p class="text-gray-600 text-sm mb-2">ইনস্ট্রাক্টর: ${getInstructorName(course.instructor)}</p>
                
                <div class="flex items-center mb-2">
                    <span class="text-yellow-500 mr-1">
                        ${renderStars(course.rating)}
                    </span>
                    <span class="text-gray-600 text-sm">(${course.rating.toFixed(1)})</span>
                </div>
                
                <div class="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span><i class="fas fa-users mr-1"></i> ${course.students.toLocaleString()}</span>
                    <span><i class="far fa-clock mr-1"></i> ${course.duration}</span>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="font-bold text-lg">৳${course.price.toLocaleString()}</span>
                    <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">
                        এনরোল করুন
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// হেল্পার ফাংশন
function getInstructorName(id) {
    const instructors = {
        rasel: "রাসেল আহমেদ",
        kamrul: "কামরুল হাসান",
        barshan: "বারশন দেব"
    };
    return instructors[id] || id;
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}
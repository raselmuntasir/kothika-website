document.addEventListener("DOMContentLoaded", function() {
    const courses = [
        { 
            id: 1,
            title: "ফেসবুক এডস মাস্টারি", 
            category: "digital-marketing", 
            instructor: "rasel", 
            created: "2024-01-15",
            rating: 4.8,
            students: 1245,
            duration: "৬ ঘণ্টা ৩০ মিনিট",
            price: 2999,
            thumbnail: "assets/images/courses/facebook-ads-course.jpg"
        },
        { 
            id: 2,
            title: "প্রিমিয়ার প্রো এডিটিং", 
            category: "video-editing", 
            instructor: "kamrul", 
            created: "2024-02-01",
            rating: 4.6,
            students: 892,
            duration: "৮ ঘণ্টা ১৫ মিনিট",
            price: 2499,
            thumbnail: "assets/images/courses/premiere-pro-course.jpg"
        },
        { 
            id: 3,
            title: "স্টার্টআপ স্ট্রাটেজি", 
            category: "business", 
            instructor: "barshan", 
            created: "2024-01-20",
            rating: 4.9,
            students: 567,
            duration: "৫ ঘণ্টা ৪৫ মিনিট",
            price: 3499,
            thumbnail: "assets/images/courses/startup-strategy-course.jpg"
        },
        { 
            id: 4,
            title: "এসইও বেসিক", 
            category: "digital-marketing", 
            instructor: "kamrul", 
            created: "2024-01-15",
            rating: 4.5,
            students: 2103,
            duration: "৪ ঘণ্টা ২০ মিনিট",
            price: 1999,
            thumbnail: "assets/images/courses/seo-basics-course.jpg"
        },
        { 
            id: 5,
            title: "ফটোশপ ফান্ডামেন্টাল", 
            category: "graphic-design", 
            instructor: "rasel", 
            created: "2024-02-22",
            rating: 4.7,
            students: 1532,
            duration: "৭ ঘণ্টা ১০ মিনিট",
            price: 2299,
            thumbnail: "assets/images/courses/photoshop-course.jpg"
        },
        { 
            id: 6,
            title: "ই-কমার্স ম্যানেজমেন্ট", 
            category: "business", 
            instructor: "barshan", 
            created: "2024-04-18",
            rating: 4.4,
            students: 678,
            duration: "৬ ঘণ্টা",
            price: 2799,
            thumbnail: "assets/images/courses/ecommerce-course.jpg"
        }
    ];

    const courseListEl = document.getElementById("courseList");
    const loadingEl = document.getElementById("loading");
    const sortByEl = document.getElementById("sortBy");
    const categoryFilterEl = document.getElementById("categoryFilter");
    const instructorFilterEl = document.getElementById("instructorFilter");

    function getCategoryName(categoryId) {
        const categories = {
            'digital-marketing': 'ডিজিটাল মার্কেটিং',
            'video-editing': 'ভিডিও এডিটিং',
            'business': 'ব্যবসা',
            'graphic-design': 'গ্রাফিক ডিজাইন'
        };
        return categories[categoryId] || categoryId;
    }

    function getInstructorName(id) {
        const instructors = {
            'rasel': 'রাসেল আহমেদ',
            'kamrul': 'কামরুল হাসান',
            'barshan': 'বারশন দেব'
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

    function renderCourses() {
        loadingEl.classList.remove('hidden');
        courseListEl.innerHTML = '';
        
        // Simulate API delay
        setTimeout(() => {
            const sortBy = sortByEl.value;
            const category = categoryFilterEl.value;
            const instructor = instructorFilterEl.value;

            let filtered = [...courses];

            if (category !== "all") {
                filtered = filtered.filter(c => c.category === category);
            }

            if (instructor !== "all") {
                filtered = filtered.filter(c => c.instructor === instructor);
            }

            if (sortBy === "alphabetical") {
                filtered.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortBy === "recent") {
                filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
            } else if (sortBy === "popular") {
                filtered.sort((a, b) => b.students - a.students);
            }

            courseListEl.innerHTML = filtered.map(course => `
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div class="relative group">
                        <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-48 object-cover rounded-t-xl">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-xl"></div>
                        <span class="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">${getCategoryName(course.category)}</span>
                    </div>
                    <div class="p-5">
                        <h3 class="font-semibold text-lg mb-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">${course.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 flex items-center">
                            <i class="fas fa-user-tie mr-2 text-blue-600 dark:text-blue-400"></i>
                            ${getInstructorName(course.instructor)}
                        </p>
                        
                        <div class="flex items-center mb-3">
                            <span class="text-yellow-500 mr-2">
                                ${renderStars(course.rating)}
                            </span>
                            <span class="text-gray-600 dark:text-gray-300 text-sm font-medium">${course.rating}</span>
                        </div>
                        
                        <div class="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                            <span class="flex items-center">
                                <i class="fas fa-users mr-2 text-blue-600 dark:text-blue-400"></i>
                                ${course.students.toLocaleString()} শিক্ষার্থী
                            </span>
                            <span class="flex items-center">
                                <i class="far fa-clock mr-2 text-blue-600 dark:text-blue-400"></i>
                                ${course.duration}
                            </span>
                        </div>
                        
                        <div class="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                            <span class="font-bold text-xl text-gray-800 dark:text-white">৳${course.price.toLocaleString()}</span>
                            <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center">
                                এনরোল করুন
                                <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');

            loadingEl.classList.add('hidden');
        }, 500);
    }

    // Event listeners
    sortByEl.addEventListener("change", renderCourses);
    categoryFilterEl.addEventListener("change", renderCourses);
    instructorFilterEl.addEventListener("change", renderCourses);

    // Initial load
    renderCourses();
});
document.addEventListener("DOMContentLoaded", function() {
    const courses = [
        { 
            title: "ফেসবুক এডস মাস্টারি", 
            category: "digital-marketing", 
            instructor: "rasel", 
            created: "2025-04-01",
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
            created: "2025-03-10",
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
            created: "2025-05-01",
            rating: 4.9,
            students: 567,
            duration: "৫ ঘণ্টা ৪৫ মিনিট",
            price: 3499,
            thumbnail: "assets/images/courses/startup-strategy-course.jpg"
        },
        { 
            title: "এসইও বেসিক", 
            category: "digital-marketing", 
            instructor: "kamrul", 
            created: "2025-01-15",
            rating: 4.5,
            students: 2103,
            duration: "৪ ঘণ্টা ২০ মিনিট",
            price: 1999,
            thumbnail: "assets/images/courses/seo-basics-course.jpg"
        },
        { 
            title: "ফটোশপ ফান্ডামেন্টাল", 
            category: "graphic-design", 
            instructor: "rasel", 
            created: "2025-02-22",
            rating: 4.7,
            students: 1532,
            duration: "৭ ঘণ্টা ১০ মিনিট",
            price: 2299,
            thumbnail: "assets/images/courses/photoshop-course.jpg"
        },
        { 
            title: "ই-কমার্স ম্যানেজমেন্ট", 
            category: "business", 
            instructor: "barshan", 
            created: "2025-04-18",
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

            loadingEl.classList.add('hidden');
        }, 500);
    }

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

    // Event listeners
    sortByEl.addEventListener("change", renderCourses);
    categoryFilterEl.addEventListener("change", renderCourses);
    instructorFilterEl.addEventListener("change", renderCourses);

    // Initial load
    renderCourses();
});
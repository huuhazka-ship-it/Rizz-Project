// Smooth scrolling untuk navigasi
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll untuk link navigasi
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink(clickedLink = null) {
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (clickedLink) {
            clickedLink.classList.add('active');
        } else {
            // Find which section is currently in view
            const sections = document.querySelectorAll('section');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && 
                    window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            if (currentSection) {
                const activeLink = document.querySelector(`.nav-menu a[href="#${currentSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
    });

    // CTA Button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const facilitiesSection = document.querySelector('#facilities');
            if (facilitiesSection) {
                const offsetTop = facilitiesSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Animasi untuk cards saat scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.card, .facility-card, .activity-card, .news-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    const cards = document.querySelectorAll('.card, .facility-card, .activity-card, .news-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Simple news data (bisa diganti dengan data dinamis)
    const newsData = [
        {
            title: "Penerimaan Siswa Baru 2024",
            content: "Pendaftaran siswa baru tahun ajaran 2024/2025 telah dibuka. Segera daftarkan putra-putri Anda.",
            date: "20 Maret 2024"
        },
        {
            title: "Workshop Teknologi Pendidikan",
            content: "Sekolah mengadakan workshop pemanfaatan teknologi dalam pembelajaran untuk guru-guru.",
            date: "18 Maret 2024"
        }
    ];

    // Function untuk menampilkan berita (contoh dynamic content)
    function displayNews() {
        const newsGrid = document.querySelector('.news-grid');
        if (newsGrid) {
            // Clear existing content
            newsGrid.innerHTML = '';
            
            // Add news items
            newsData.forEach(news => {
                const newsArticle = document.createElement('article');
                newsArticle.className = 'news-card';
                newsArticle.innerHTML = `
                    <h3>${news.title}</h3>
                    <p>${news.content}</p>
                    <span class="date">${news.date}</span>
                `;
                newsGrid.appendChild(newsArticle);
            });
        }
    }

    // Panggil function untuk menampilkan berita
    displayNews();

    // Mobile menu toggle (bisa dikembangkan untuk responsive design)
    function initMobileMenu() {
        const nav = document.querySelector('nav');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        
        // Insert mobile menu button
        nav.insertBefore(mobileMenuBtn, navMenu);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Check screen size and show/hide mobile menu button
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navMenu.classList.remove('show');
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.classList.add('show');
            }
        }
        
        // Initial check and event listener for resize
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    }

    // Initialize mobile menu
    initMobileMenu();

    // Console log untuk debugging
    console.log('Website SMP Negeri 1 Maju Jaya loaded successfully!');
});

// Additional utility functions
const SchoolWebsite = {
    // Function untuk menampilkan alert welcome
    showWelcome: function() {
        setTimeout(() => {
            alert('Selamat datang di website SMP Negeri 1 Maju Jaya!');
        }, 1000);
    },
    
    // Function untuk menghitung jumlah section
    countSections: function() {
        const sections = document.querySelectorAll('section');
        console.log(`Total sections: ${sections.length}`);
        return sections.length;
    },
    
    // Function untuk update copyright year
    updateCopyright: function() {
        const copyrightElement = document.querySelector('.copyright p');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = `© ${currentYear} SMP Negeri 1 Maju Jaya. All rights reserved.`;
        }
    }
};

// Panggil fungsi update copyright
SchoolWebsite.updateCopyright();
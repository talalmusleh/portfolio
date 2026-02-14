/*==================== Toggle Icon Navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== Scroll Sections Active Link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /*==================== Sticky Navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== Remove Toggle Icon and Navbar When Click Navbar Link ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== Close Mobile Menu When Clicking Links ====================*/
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

/*==================== Scroll Reveal ====================*/
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== Typed JS ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Designer', 'YouTuber', 'Blogger'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*==================== Smooth Scroll for Anchor Links ====================*/
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

/*==================== Add Animation on Scroll for Services ====================*/
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.services-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(50px)';
    box.style.transition = 'all 0.6s ease';
    observer.observe(box);
});

/*==================== Portfolio Filter Animation ====================*/
document.querySelectorAll('.portfolio-box').forEach((box, index) => {
    box.style.animationDelay = `${index * 0.1}s`;
});

/*==================== Form Validation ====================*/
const contactForm = document.querySelector('.contact form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all required fields!');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return false;
        }
        
        // Success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

/*==================== Add Cursor Trail Effect (Optional) ====================*/
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

// Only create cursor trail if user adds .circle elements
if (circles.length > 0) {
    circles.forEach(function (circle) {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', function(e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

/*==================== Loading Animation ====================*/
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

/*==================== Parallax Effect on Scroll ====================*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.home-img');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/*==================== Dark/Light Mode Toggle (Optional) ====================*/
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.style.getPropertyValue('--bg-color');
    
    if (currentTheme === '#1f242d' || currentTheme === '') {
        // Switch to light mode
        root.style.setProperty('--bg-color', '#f0f0f0');
        root.style.setProperty('--second-bg-color', '#ffffff');
        root.style.setProperty('--text-color', '#1f242d');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark mode
        root.style.setProperty('--bg-color', '#1f242d');
        root.style.setProperty('--second-bg-color', '#323946');
        root.style.setProperty('--text-color', '#fff');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        toggleTheme();
    }
});

/*==================== Counter Animation for Stats (Optional) ====================*/
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Example usage - add this to elements with class 'counter'
document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    animateCounter(counter, target);
});

/*==================== Add "Read More" Functionality ====================*/
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.services-box') || this.closest('.about-content');
        const moreText = parent.querySelector('.more-text');
        
        if (moreText) {
            if (moreText.style.display === 'none' || moreText.style.display === '') {
                moreText.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                moreText.style.display = 'none';
                this.textContent = 'Read More';
            }
        }
    });
});

/*==================== Performance Optimization - Debounce Scroll ====================*/
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
const debouncedScroll = debounce(() => {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);

/*==================== Console Message ====================*/
console.log('%c👋 Welcome to my Portfolio!', 'color: #0ef; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped by Talal Musleh', 'color: #0ef; font-size: 14px;');

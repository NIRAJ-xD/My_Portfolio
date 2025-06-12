// Typing Animation
const typingElement = document.getElementById('typing');
const words = ['Web Developer', 'Python Enthusiast', 'Java Programmer', 'PHP Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    
    typingElement.textContent = currentChar;
    
    if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(type, 50);
    } else {
        // Change word
        isDeleting = !isDeleting;
        
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(type, 1000);
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    type();
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };
    
    // Check if skills section is in view
    const skillsSection = document.querySelector('.skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.getElementById('toggleIcon').textContent = '☰';
                }
            }
        });
    });
});

// Toggle mobile menus
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const toggleIcon = document.getElementById('toggleIcon');
    
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        toggleIcon.textContent = '✖';
        document.body.style.overflow = 'hidden';
    } else {
        toggleIcon.textContent = '☰';
        document.body.style.overflow = 'auto';
    }
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleIcon.textContent = '☰';
            document.body.style.overflow = 'auto';
        });
    });
}
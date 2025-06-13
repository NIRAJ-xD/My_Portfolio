document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

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

  // Start typing animation
  type();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('no-scroll');
      });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Animate skill bars when section is in view
  const skillsSection = document.querySelector('.skills');
  const skillBars = document.querySelectorAll('.skill-level');

  function animateSkillBars() {
      skillBars.forEach(bar => {
          const skillLevel = bar.getAttribute('data-skill');
          bar.style.width = skillLevel + '%';
      });
  }

  const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateSkillBars();
              skillsObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.2 });

  skillsObserver.observe(skillsSection);

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;
          
          // Here you would typically send the form data to a server
          console.log('Form submitted:', { name, email, message });
          
          // Show success message
          alert('Thank you for your message! I will get back to you soon.');
          
          // Reset form
          this.reset();
      });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
});
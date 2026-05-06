// ============ DOM ELEMENTS ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const scrollItems = document.querySelectorAll('.animate-on-scroll');
const contactForm = document.getElementById('contactForm');

// ============ MOBILE MENU TOGGLE ============
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
}

// Close mobile menu when a link is clicked
if (navLinks) {
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });
}

// ============ PROJECT FILTERING ============
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter projects
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.style.display = 'grid';
        // Trigger animation on show
        setTimeout(() => {
          card.classList.add('visible');
        }, 10);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============ SCROLL ANIMATIONS ============
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

scrollItems.forEach((item) => observer.observe(item));

// ============ CONTACT FORM HANDLING ============
if (contactForm) {
  // Check for Formspree success/error on page load
  const urlParams = new URLSearchParams(window.location.search);
  const formMessage = document.getElementById('form-message');

  if (urlParams.get('message') === 'success') {
    formMessage.style.display = 'block';
    formMessage.style.background = 'rgba(110, 226, 255, 0.1)';
    formMessage.style.border = '1px solid var(--accent)';
    formMessage.style.color = 'var(--accent)';
    formMessage.innerHTML = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
    contactForm.reset();
  } else if (urlParams.get('message') === 'error') {
    formMessage.style.display = 'block';
    formMessage.style.background = 'rgba(255, 100, 100, 0.1)';
    formMessage.style.border = '1px solid #ff6464';
    formMessage.style.color = '#ff6464';
    formMessage.innerHTML = '❌ Sorry, there was an error sending your message. Please try again or contact me directly.';
  }

  contactForm.addEventListener('submit', (e) => {
    // Basic validation before submission
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      e.preventDefault();
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      e.preventDefault();
      return;
    }

    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.innerText;

    // Show loading state
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // Hide any previous messages
    formMessage.style.display = 'none';

    // Formspree will handle the submission
    // The page will reload with success/error parameters
  });
}

// ============ SMOOTH SCROLLING ENHANCEMENT ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// ============ NAVBAR BACKGROUND ON SCROLL ============
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(5, 7, 15, 0.95)';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(5, 7, 15, 0.85)';
    navbar.style.boxShadow = 'none';
  }
});

// ============ TYPING EFFECT (OPTIONAL) ============
// Uncomment if you want a typing effect on the hero title
/*
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.innerText;
  heroTitle.innerText = '';
  
  let index = 0;
  const typeSpeed = 50;
  
  function typeEffect() {
    if (index < text.length) {
      heroTitle.innerText += text.charAt(index);
      index++;
      setTimeout(typeEffect, typeSpeed);
    }
  }
  
  typeEffect();
}
*/

// ============ LAZY LOADING FOR IMAGES ============
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
}

// ============ UTILITY: ACTIVE NAV LINK ON SCROLL ============
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    }
  });
});

function typeHeroText() {
  if (!heroText) return;
  heroText.textContent = typedString.slice(0, typedIndex);
  typedIndex += 1;
  if (typedIndex <= typedString.length) {
    setTimeout(typeHeroText, 45);
  }
}

typeHeroText();

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  if (name && email) {
    contactForm.reset();
    alert('Thanks, ' + name + '! I will review your message and respond shortly.');
  }
});

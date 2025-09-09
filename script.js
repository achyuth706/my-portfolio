// Smooth scrolling for sidebar navigation links with easing
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetID);
    window.scrollTo({
      top: targetSection.offsetTop - 20, // offset for top spacing
      behavior: 'smooth'
    });

    // Close sidebar on mobile after clicking a link
    document.querySelector('.sidebar').classList.remove('active');
  });
});

// Highlight active menu item on scroll smoothly
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY || document.documentElement.scrollTop;

  // Highlight sidebar
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`nav a[href="#${id}"]`);
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });

  // Reveal sections on scroll
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerBottom = window.innerHeight * 0.85;
    if (sectionTop < triggerBottom) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
});

// Contact form validation
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill all fields before submitting!');
    return false;
  }
  alert('Message sent successfully!');
  return true;
}

// Initial staggered reveal animation
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// ✅ Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
});

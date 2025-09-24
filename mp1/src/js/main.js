/* Your JS here. */

const navEl = document.querySelector('.navbar');
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const navH = navEl ? navEl.getBoundingClientRect().height : 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navH + 1;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});


document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  this.reset();
});

const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const linkMap = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
const progressBar = document.querySelector('.scroll-indicator__bar');

let ticking = false;

function setActiveLink(id) {
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === `#${id}`;
    a.classList.toggle('active', isActive);
    if (isActive) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function updateProgress() {
  if (!progressBar) return;
  const doc = document.documentElement;
  const total = doc.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressBar.style.width = pct + '%';
}

function updateActiveByScroll() {
  if (!navEl || sections.length === 0) return;

  const navBottomY = navEl.getBoundingClientRect().bottom + 1;
  const scrollBottom = Math.ceil(window.scrollY + window.innerHeight);
  const docHeight = Math.floor(document.documentElement.scrollHeight);

  if (scrollBottom >= docHeight - 2) {
    setActiveLink(sections[sections.length - 1].id);
    return;
  }

  let currentId = sections[0].id;

  for (const sec of sections) {
    const r = sec.getBoundingClientRect();

    if (r.top <= navBottomY && r.bottom > navBottomY) {
      currentId = sec.id;
      break;
    }

    if (r.top >= 0 && r.bottom <= window.innerHeight && r.top < navBottomY) {
      currentId = sec.id;
      break;
    }
  }

  setActiveLink(currentId);
}

function onScrollOrResize() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateProgress();
    updateActiveByScroll();
    ticking = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateProgress();
  updateActiveByScroll();
});
window.addEventListener('scroll', onScrollOrResize, { passive: true });
window.addEventListener('resize', onScrollOrResize);

(function initSkillsCarousel() {
  const viewport = document.querySelector('.skills-viewport');
  const track = document.querySelector('.skills-track');
  const slides = Array.from(document.querySelectorAll('.skills-slide'));
  const prevBtn = document.querySelector('.skills-arrow.prev');
  const nextBtn = document.querySelector('.skills-arrow.next');

  if (!viewport || !track || slides.length < 1) return;

  let index = 0;
  let slideWidth = viewport.clientWidth;

  function updateAria() {
    slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== index ? 'true' : 'false'));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    updateAria();
  }

  function resize() {
    slideWidth = viewport.clientWidth;
    slides.forEach(s => (s.style.minWidth = slideWidth + 'px'));
    track.style.transition = 'none';
    requestAnimationFrame(() => {
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      requestAnimationFrame(() => (track.style.transition = 'transform 0.35s ease'));
    });
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  [prevBtn, nextBtn].forEach(btn => {
    btn?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });
  });

  let startX = 0, dx = 0, dragging = false;
  viewport.addEventListener('pointerdown', e => { dragging = true; startX = e.clientX; viewport.setPointerCapture(e.pointerId); });
  viewport.addEventListener('pointermove', e => { if (dragging) dx = e.clientX - startX; });
  viewport.addEventListener('pointerup', e => {
    dragging = false;
    if (Math.abs(dx) > 40) { dx < 0 ? goTo(index + 1) : goTo(index - 1); }
    dx = 0;
  });

  window.addEventListener('resize', resize);

  resize();
  updateAria();
})();

const navbar = document.querySelector('.navbar');

function resizeNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add('small');
    navbar.classList.remove('large');
  } else {
    navbar.classList.add('large');
    navbar.classList.remove('small');
  }
}

document.addEventListener('DOMContentLoaded', resizeNavbar);
window.addEventListener('scroll', resizeNavbar);


const openModalButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.modal .close');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
    }
  });
});

closeButtons.forEach(close => {
  close.addEventListener('click', () => {
    close.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});



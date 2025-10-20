// === EFFET ZOOM SUR LA BANNIÈRE ===
window.addEventListener('scroll', () => {
  const banner = document.querySelector('.banner-img');
  const scroll = window.scrollY;
  if (banner) {
    banner.style.transform = `scale(${1 + scroll / 2000}) translateY(${scroll / 5}px)`;
  }
});

// === HEADER TRANSPARENT → BLEU AU SCROLL ===
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === ANIMATIONS AU SCROLL (fade-in) ===
const fadeElements = document.querySelectorAll('.fade-in, .value-card, .project, .tarif-card');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
fadeElements.forEach(el => fadeObserver.observe(el));

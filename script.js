// === Effet zoom sur la bannière ===
window.addEventListener('scroll', () => {
  const banner = document.querySelector('.banner-img');
  const scroll = window.scrollY;
  if (banner) {
    banner.style.transform = `scale(${1 + scroll / 2000}) translateY(${scroll / 5}px)`;
  }
});

// === Header transparent → bleu au scroll ===
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === Animation d’apparition (fade-in) ===
const fadeElements = document.querySelectorAll('.fade-in, .section-fade');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));

// === Animation des cartes (services, projets, tarifs) ===
const cards = document.querySelectorAll('.project, .tarif-card');
cards.forEach(card => {
  card.classList.add('card-fade');
  fadeObserver.observe(card);
});

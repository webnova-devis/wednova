// === Effet zoom / parallax sur la bannière ===
window.addEventListener('scroll', () => {
  const banner = document.querySelector('.banner-img');
  const y = window.scrollY || window.pageYOffset;
  if (banner) {
    const scale = 1 + Math.min(y / 2000, 0.35);
    banner.style.transform = `scale(${scale}) translateY(${y / 6}px)`;
  }
});

// === Header transparent -> bleu au scroll ===
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// === Animations d’apparition (fade-in) ===
const observed = document.querySelectorAll('.fade-in, .value-card, .card, .project, .tarif-card');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

observed.forEach(el => io.observe(el));

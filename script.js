// Effet zoom sur la bannière
window.addEventListener('scroll', function() {
  const banner = document.querySelector('.banner-img');
  const scroll = window.scrollY;
  if (banner) banner.style.transform = `scale(${1 + scroll / 2000}) translateY(${scroll / 5}px)`;
});

// Header transparent → bleu
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Animation d’apparition des sections
const fadeElems = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
});
fadeElems.forEach(el => observer.observe(el));

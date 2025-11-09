// === Effet parallax bannière ===
window.addEventListener("scroll", () => {
  const banner = document.querySelector(".banner-img");
  if (!banner) return;
  const y = window.scrollY;
  banner.style.transform = `scale(${1 + y / 2000}) translateY(${y / 6}px)`;
});

// === Header transparent -> bleu ===
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// === Animations apparition ===
const fadeEls = document.querySelectorAll(".fade-in");
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.2 });
fadeEls.forEach(el => io.observe(el));

// === MENU BURGER + OVERLAY ===
const burger = document.querySelector(".burger");
const navMenu = document.querySelector("nav ul");
const overlay = document.querySelector(".overlay");

function toggleMenu() {
  const isOpen = navMenu.classList.toggle("open");
  burger.classList.toggle("open");
  overlay.classList.toggle("show", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

burger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", toggleMenu));
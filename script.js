// ================================
//          💙 JV WEB 
// ================================

// === EFFET PARALLAX BANNIÈRE ===
const initParallax = () => {
  const banner = document.querySelector(".banner-img");
  if (!banner) return;

  let ticking = false;

  const updateParallax = () => {
    const y = window.scrollY;
    const scale = 1 + Math.min(y / 2000, 0.35);
    banner.style.transform = `scale(${scale}) translateY(${y / 6}px)`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
};

// === HEADER TRANSPARENT -> BLEU ===
const initHeaderScroll = () => {
  const header = document.querySelector("header");
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
};

// === ANIMATIONS D'APPARITION (INTERSECTION OBSERVER) ===
const initScrollAnimations = () => {
  const elementsToAnimate = document.querySelectorAll(
    ".fade-in, .value-card, .card, .project, .tarif-card, .service-card"
  );

  if (elementsToAnimate.length === 0) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Délai d'animation en cascade
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((el) => observer.observe(el));
};

// === MENU BURGER (SLIDE + OVERLAY) ===
const initBurgerMenu = () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector("nav ul");
  let overlay = document.querySelector(".overlay");

  // Créer l'overlay s'il n'existe pas
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  }

  if (!burger || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle("open");
    burger.classList.toggle("open");
    overlay.classList.toggle("show", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    // Accessibilité
    burger.setAttribute("aria-expanded", isOpen);
  };

  const closeMenu = () => {
    navMenu.classList.remove("open");
    burger.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
  };

  // Event listeners
  burger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Fermer le menu lors du clic sur un lien
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fermer avec la touche Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  // Accessibilité initiale
  burger.setAttribute("aria-expanded", "false");
};

// === SMOOTH SCROLL POUR LES ANCRES ===
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
};

// === VALIDATION FORMULAIRE CONTACT ===
const initFormValidation = () => {
  const form = document.querySelector(".contact-form form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ff4444";

        setTimeout(() => {
          input.style.borderColor = "";
        }, 3000);
      }
    });

    if (!isValid) {
      e.preventDefault();
      alert("⚠️ Veuillez remplir tous les champs obligatoires.");
    }
  });

  // Réinitialiser la bordure lors de la saisie
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
    });
  });
};

// === BOUTON RETOUR EN HAUT ===
const initBackToTop = () => {
  // Créer le bouton
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Retour en haut");
  
  // Styles inline (à ajouter au CSS pour une meilleure pratique)
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #007bff, #00bcd4);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  `;

  document.body.appendChild(backToTopBtn);

  // Afficher/masquer selon le scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
    }
  });

  // Action au clic
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Effet hover
  backToTopBtn.addEventListener("mouseenter", () => {
    backToTopBtn.style.transform = "translateY(-5px)";
    backToTopBtn.style.boxShadow = "0 8px 25px rgba(0, 123, 255, 0.5)";
  });

  backToTopBtn.addEventListener("mouseleave", () => {
    backToTopBtn.style.transform = "translateY(0)";
    backToTopBtn.style.boxShadow = "0 4px 15px rgba(0, 123, 255, 0.4)";
  });
};

// === LAZY LOADING IMAGES ===
const initLazyLoading = () => {
  const images = document.querySelectorAll("img[data-src]");
  
  if (images.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// === ANIMATION DU LOGO ===
const initLogoAnimation = () => {
  const logo = document.querySelector(".logo");
  if (!logo) return;

  logo.addEventListener("click", () => {
    logo.style.animation = "spin 0.6s ease";
    setTimeout(() => {
      logo.style.animation = "";
    }, 600);
  });
};

// === PRELOADER (OPTIONNEL) ===
const initPreloader = () => {
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 300);
      }, 500);
    }
  });
};

// === INITIALISATION AU CHARGEMENT ===
const init = () => {
  // Fonctions principales
  initParallax();
  initHeaderScroll();
  initScrollAnimations();
  initBurgerMenu();
  initSmoothScroll();
  initFormValidation();
  initBackToTop();
  initLazyLoading();
  initLogoAnimation();
  initPreloader();

  console.log("✅ JV WEB - Site initialisé avec succès!");
};

// Démarrer quand le DOM est prêt
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// === ANIMATION SPIN POUR LE LOGO (À AJOUTER AU CSS) ===
// @keyframes spin {
//   from { transform: rotate(0deg) scale(1); }
//   50% { transform: rotate(180deg) scale(1.1); }
//   to { transform: rotate(360deg) scale(1); }
// }

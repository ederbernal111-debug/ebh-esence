/* ============================================
   EBH Esence – Main Script
   ============================================ */

'use strict';

/* --- Product Data --- */
const products = [
  {
    id: 1,
    name: 'ASAD BOURBON',
    brand: 'Lattafa',
    img: 'img/asad-bourbon.jpg',
    price5:80,
    price10: 150,
    bg: 'linear-gradient(135deg, #2c1810, #6b3a1f, #d4a04a)'
  },
  {
    id: 2,
    name: 'VALENTINO BORN IN ROMA INTENSE',
    brand: 'Valentino',
    img: 'img/valentino-born-in-roma.jpg',
    price5: 230,
    price10: 450,
    bg: 'linear-gradient(135deg, #1a1a2e, #4a0e4e, #e91e63)'
  },
  {
    id: 3,
    name: 'JASSOR',
    brand: 'Lattafa',
    img: 'img/jassor.jpg',
    price5: 55,
    price10: 105,
    bg: 'linear-gradient(135deg, #1a0a00, #5c3a21, #c49a3c)'
  },
  {
    id: 4,
    name: 'HAWAS TROPICAL',
    brand: 'Hawas',
    img: 'img/hawas-tropical.jpg',
    price5: 90,
    price10: 170,
    bg: 'linear-gradient(135deg, #004d40, #00897b, #80cbc4)'
  },
  {
    id: 5,
    name: 'HAWAS ATLANTIS',
    brand: 'Hawas',
    img: 'img/hawas-atlantis.jpg',
    price5: 70,
    price10: 130,
    bg: 'linear-gradient(135deg, #0d1b3e, #1565c0, #64b5f6)'
  },
  {
    id: 6,
    name: 'AETHER EXTRAIT',
    brand: 'Aether',
    img: 'img/aether-extrait.jpg',
    price5: 90,
    price10: 175,
    bg: 'linear-gradient(135deg, #1b5e20, #43a047, #c8e6c9)'
  },
  {
    id: 7,
    name: 'SCEPTRE MALACHITE',
    brand: 'Maison Alhambra',
    img: 'img/sceptre-malachite.jpg',
    price5: 80,
    price10: 150,
    bg: 'linear-gradient(135deg, #002620, #2e7d32, #a5d6a7)'
  },
  {
    id: 8,
    name: 'FAKHAR PLATINUM',
    brand: 'Lattafa',
    img: 'img/fakhar-platinum.jpg',
    price5: 80,
    price10: 150,
    bg: 'linear-gradient(135deg, #1a1a2e, #4a4a6a, #c0c0c0)'
  }
];

/* --- DOM Ready --- */
document.addEventListener('DOMContentLoaded', () => {

  renderProducts();
  setCurrentYear();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();

});

/* --- Render Products --- */
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img" style="background: ${p.bg};">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-brand">${p.brand}</p>
        <div class="product-prices">
          <div class="price-item">
            <span class="size">5 ml</span>
            <span class="price">$${p.price5}</span>
          </div>
          <div class="price-item">
            <span class="size">10 ml</span>
            <span class="price">$${p.price10}</span>
          </div>
        </div>
        <button class="btn-whatsapp-product" data-product="${p.name}">
          <i class="fab fa-whatsapp"></i> Pedir por WhatsApp
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-whatsapp-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product');
      const msg = `Hola, me interesa el perfume ${product}`;
      window.open(`https://wa.me/523861035362?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
}

/* --- Set current year in footer --- */
function setCurrentYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }, { passive: true });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll Animations (Intersection Observer) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));

  /* Also observe product cards after they render */
  const productCards = document.querySelectorAll('.product-card');
  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        productObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  productCards.forEach(card => productObserver.observe(card));
}

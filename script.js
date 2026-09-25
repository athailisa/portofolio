// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('flex');
    navMenu.classList.toggle('hidden', !isOpen);
  });
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.add('hidden');
      navMenu.classList.remove('flex');
    });
  });
}

// ===== DARK / LIGHT MODE =====
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.textContent = '☀️';
  } else {
    root.removeAttribute('data-theme');
    if (themeBtn) themeBtn.textContent = '🌙';
  }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch (e) {}
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch (e) {}
  });
}

// ===== SCROLL REVEAL (tiap kartu punya animasi & delay sendiri) =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ===== BACK TO TOP =====
const toTopBtn = document.getElementById('toTop');
if (toTopBtn) {
  window.addEventListener('scroll', () => {
    toTopBtn.classList.toggle('show', window.scrollY > 420);
  });
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== COPY EMAIL =====
document.querySelectorAll('.copy-email').forEach((btn) => {
  const original = btn.innerHTML;
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      btn.innerHTML = '✅ Tersalin!';
    } catch (err) {
      btn.innerHTML = '⚠️ Salin manual: ' + email;
    }
    setTimeout(() => { btn.innerHTML = original; }, 1800);
  });
});

// Pesan sapaan di console
console.log("Halo! Portofolio siswi RPL berhasil dimuat dengan baik. Semangat untuk persiapan PKL-nya!");

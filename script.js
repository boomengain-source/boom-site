const filterButtons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.product-card');
const resultCount = document.querySelector('.result-count');
const emptyMessage = document.querySelector('.empty-message');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach((card) => {
      const categories = card.dataset.categories.split(' ');
      const isVisible = filter === 'all' || categories.includes(filter);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    resultCount.textContent = `Показано: ${visibleCount} ${getModelWord(visibleCount)}`;
    emptyMessage.hidden = visibleCount !== 0;
  });
});

function getModelWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) return 'модель';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'модели';
  return 'моделей';
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});

mainNav.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
});

// Header fidelity fix: use the actual BOOM Engineering logo from the live site
// and replace the temporary CSS-drawn contact icons with crisp SVG icons.
const headerLogo = document.querySelector('.site-header .logo img');
if (headerLogo) {
  headerLogo.src = 'https://boom-eng.ru/wp-content/themes/boom-theme/assets/images/logo.png';
  headerLogo.alt = 'BOOM Engineering';
  headerLogo.style.width = '181px';
  headerLogo.style.height = 'auto';
  headerLogo.style.objectFit = 'contain';
}

const phoneIcon = document.querySelector('.contact-left a[href^="tel:"] .contact-icon');
if (phoneIcon) {
  phoneIcon.outerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;flex:0 0 auto">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z"></path>
    </svg>`;
}

const mailIcon = document.querySelector('.contact-left a[href^="mailto:"] .mail-icon');
if (mailIcon) {
  mailIcon.outerHTML = `
    <svg width="23" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;flex:0 0 auto">
      <rect x="1" y="1" width="22" height="16" rx="1.5"></rect>
      <path d="M2 3l10 7L22 3"></path>
    </svg>`;
}

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

// Use the actual BOOM Engineering logo from the live site.
const headerLogo = document.querySelector('.site-header .logo img');
if (headerLogo) {
  headerLogo.src = 'https://boom-eng.ru/wp-content/themes/boom-theme/assets/images/logo.png';
  headerLogo.alt = 'BOOM Engineering';
  headerLogo.style.width = '197px';
  headerLogo.style.height = '63px';
  headerLogo.style.objectFit = 'contain';
}

// Replace temporary contact marks with explicit, recognizable outline icons.
const phoneIcon = document.querySelector('.contact-left a[href^="tel:"] .contact-icon');
if (phoneIcon) {
  phoneIcon.outerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;width:22px;height:22px;flex:0 0 22px">
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25A2.25 2.25 0 0 0 21.75 19.5v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"></path>
    </svg>`;
}

const mailIcon = document.querySelector('.contact-left a[href^="mailto:"] .mail-icon');
if (mailIcon) {
  mailIcon.outerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;width:23px;height:23px;flex:0 0 23px">
      <path d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75"></path>
    </svg>`;
}

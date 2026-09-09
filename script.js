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

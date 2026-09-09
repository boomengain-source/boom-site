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

// Give each model deep-link a unique browser title and description.
const defaultSeo = { title: document.title, description: document.querySelector('meta[name="description"]')?.content || '' };
function applyModelSeo() {
  const detail = location.hash ? document.querySelector(location.hash) : null;
  const meta = document.querySelector('meta[name="description"]');
  document.title = detail?.dataset.seoTitle || defaultSeo.title;
  if (meta) meta.content = detail?.dataset.seoDescription || defaultSeo.description;
}
window.addEventListener('hashchange', applyModelSeo);
applyModelSeo();

// Official TROX product visuals and documentation sources.
// The previous generated SVG placeholders remain only as fallback files in the PR;
// all visible catalog/detail images are replaced with official TROX media at runtime.
const troxProducts = {
  'FKA2-EU': {
    image: 'https://cdn.trox.de/7ed3c52f5ad7acc6/5426075c4015/FK2-EU_img_09psd.png',
    page: 'https://www.trox.be/en/fire-dampers/fka2-eu-003fbb2088c44811'
  },
  'FK2-EU': {
    image: 'https://cdn0.scrvt.com/trox/1fef8edc77d32932/53aea7d707f1/FK2-EU_img_12.png',
    page: 'https://www.trox.de/en/fire-dampers/fk2-eu-6a7ebbadc72c1037'
  },
  'FKR-EU': {
    image: 'https://cdn0.scrvt.com/trox/5d2b663b23326b73/01dba3ea0e8b/Produktbild-FKR-EU.png',
    page: 'https://www.trox.de/en/fire-dampers/fkr-eu-69c6216a6d944cc9'
  },
  'FKRS-EU': {
    image: 'https://cdn0.scrvt.com/trox/7d9bfe6320842a93/a45a8a6d5210/00136610_0.png',
    page: 'https://www.trox.de/en/fire-dampers/fkrs-eu-e44c04db778f79a6'
  },
  'KA2-EU': {
    image: 'https://www.trox.de/__scrivito/to_binary?encrypted_params=eyJiaW5hcnlfaWQiOiJlN2U0ZTg1MTU5ZTk5MzZiLzUwOGZmOTc3MDc0Mi9TY3JlZW5zaG90LTIwMjUtMDUtMDYtMTQwMTU2LnBuZyIsIm9ial9pZCI6ImU3ZTRlODUxNTllOTkzNmIiLCJ0cmFuc2Zvcm1hdGlvbl9kZWZpbml0aW9uIjp7IndpZHRoIjo2MDB9fQ%3D%3D--1d8cb6adcf65d412891da96fb61b932247c5b27f',
    page: 'https://www.trox.de/en/fire-dampers/ka2-eu-1ac28fd4d1bb18a5'
  },
  'EK-JZ': {
    image: 'https://cdn.trox.de/3545691203b90813/4f78fb584ddd/v/da7a24af7f8d/EK-JZ_img_19psd.png',
    page: 'https://www.trox.de/en/smoke-control-damper/ek-jz-605db13990db172d'
  },
  'EK2-EU': {
    image: 'https://cdn.trox.de/77999b79b47c76d4/a4a2debe946e/EK2-EU-introduction-image-english.png',
    page: 'https://www.trox.de/en/smoke-control-damper/ek2-eu-3d057b1570acb468'
  },
  'EK-JS': {
    image: 'https://cdn.trox.de/408c34038faaf72d/9b47c9889882/v/4d349e5de49a/EK-JS-introduction-and-navigation-image.png',
    page: 'https://www.trox.de/en/smoke-control-damper/ek-js-fbd700e6e81da044'
  }
};

function applyOfficialTroxMedia(container, headingSelector) {
  const heading = container.querySelector(headingSelector);
  if (!heading) return;
  const model = heading.textContent.trim();
  const product = troxProducts[model];
  if (!product) return;

  const image = container.querySelector('.product-image img, .detail-image img');
  if (image) {
    image.src = product.image;
    image.alt = `TROX ${model} — официальное изображение изделия`;
    image.loading = 'lazy';
    image.referrerPolicy = 'no-referrer';
    image.style.objectFit = 'contain';
    image.style.background = '#fff';
  }

  const docs = container.querySelector('.docs');
  if (docs) {
    docs.innerHTML = `
      <b>Документы TROX</b>
      <a href="${product.page}" target="_blank" rel="noopener noreferrer">Технический лист ↗</a>
      <a href="${product.page}" target="_blank" rel="noopener noreferrer">Сертификаты / DoP ↗</a>
      <a href="${product.page}" target="_blank" rel="noopener noreferrer">Монтажная инструкция ↗</a>
      <span>BIM / CAD <em>по запросу BOOM</em></span>`;
  }
}

document.querySelectorAll('.product-card').forEach((card) => applyOfficialTroxMedia(card, 'h2'));
document.querySelectorAll('.model-detail').forEach((detail) => applyOfficialTroxMedia(detail, 'h2'));

// Bring EK-JZ card flow-rate text in line with the current TROX product page.
document.querySelectorAll('.product-card').forEach((card) => {
  if (card.querySelector('h2')?.textContent.trim() !== 'EK-JZ') return;
  const flowItem = [...card.querySelectorAll('.card-specs li')].find((item) => item.textContent.trim().startsWith('Расход:'));
  if (flowItem) flowItem.textContent = 'Расход: до 131 544 м³/ч';
});

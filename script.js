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

const headerLogo = document.querySelector('.site-header .logo img');
if (headerLogo) {
  headerLogo.src = 'https://boom-eng.ru/wp-content/themes/boom-theme/assets/images/logo.png';
  headerLogo.alt = 'BOOM Engineering';
  headerLogo.style.width = '197px';
  headerLogo.style.height = '63px';
  headerLogo.style.objectFit = 'contain';
}

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

const defaultSeo = { title: document.title, description: document.querySelector('meta[name="description"]')?.content || '' };
function applyModelSeo() {
  const detail = location.hash ? document.querySelector(location.hash) : null;
  const meta = document.querySelector('meta[name="description"]');
  document.title = detail?.dataset.seoTitle || defaultSeo.title;
  if (meta) meta.content = detail?.dataset.seoDescription || defaultSeo.description;
}
window.addEventListener('hashchange', applyModelSeo);
applyModelSeo();

const troxProducts = {
  'FKA2-EU': {
    image: 'https://cdn.trox.de/536376718a7bff22/0378ea32f310/FK2-EU_img_09psd.psd.link',
    page: 'https://www.trox.be/en/fire-dampers/fka2-eu-003fbb2088c44811'
  },
  'FK2-EU': {
    image: 'https://www.trox.de/__scrivito/to_binary?encrypted_params=eyJiaW5hcnlfaWQiOiI1YmQxMGE4MTkwODk1MjQxLzY2N2JmOGViZTc4Ny9GSzItRVVfaW1nXzkwcG5nLnBuZyIsIm9ial9pZCI6IjViZDEwYTgxOTA4OTUyNDEiLCJ0cmFuc2Zvcm1hdGlvbl9kZWZpbml0aW9uIjp7IndpZHRoIjo2MDB9fQ%3D%3D--0d8bf7564b2159403caeecff8e29d5aa46ba774b',
    page: 'https://www.trox.de/en/fire-dampers/fk2-eu-6a7ebbadc72c1037'
  },
  'FKR-EU': {
    image: 'https://www.trox.de/__scrivito/to_binary?encrypted_params=eyJiaW5hcnlfaWQiOiI1ZDJiNjYzYjIzMzI2YjczLzAxZGJhM2VhMGU4Yi9Qcm9kdWt0YmlsZC1GS1ItRVUucG5nIiwib2JqX2lkIjoiNWQyYjY2M2IyMzMyNmI3MyIsInRyYW5zZm9ybWF0aW9uX2RlZmluaXRpb24iOnsid2lkdGgiOjYwMH19--1ae50209b59fad817c52161f10f4581f82fa8af4',
    page: 'https://www.trox.de/en/fire-dampers/fkr-eu-69c6216a6d944cc9'
  },
  'FKRS-EU': {
    image: 'https://www.trox.de/__scrivito/to_binary?encrypted_params=eyJiaW5hcnlfaWQiOiJhMjg1Yzg1N2QzYWFkNWM0LzE0NjAyYzA5YjRmZi9GS1JTLUVVLWludHJvZHVjdGlvbi1pbWFnZS5wbmciLCJvYmpfaWQiOiJhMjg1Yzg1N2QzYWFkNWM0IiwidHJhbnNmb3JtYXRpb25fZGVmaW5pdGlvbiI6eyJ3aWR0aCI6NjAwfX0%3D--c07842ea4cc97398d77e2ba176757116a81a439b',
    page: 'https://www.trox.de/en/fire-dampers/fkrs-eu-e44c04db778f79a6'
  },
  'KA2-EU': {
    image: 'https://www.trox.de/__scrivito/to_binary?encrypted_params=eyJiaW5hcnlfaWQiOiJjN2Q5ODkyZWMyMzlkMTE2L2U4OWIwZTAzOTUxNC9TY3JlZW5zaG90LTIwMjUtMDUtMDYtMTQwMTU2LnBuZyIsIm9ial9pZCI6ImM3ZDk4OTJlYzIzOWQxMTYiLCJ0cmFuc2Zvcm1hdGlvbl9kZWZpbml0aW9uIjp7IndpZHRoIjo2MDB9fQ%3D%3D--b88e6101d3b7a627b01f45ad5abafdaaa77f525e',
    page: 'https://www.trox.de/en/fire-dampers/ka2-eu-1ac28fd4d1bb18a5'
  },
  'EK-JZ': {
    image: 'https://www.trox.de/__scrivito/to_binary?encrypted_params=eyJiaW5hcnlfaWQiOiIzNTQ1NjkxMjAzYjkwODEzL2ZlOGM2ZjBhYjFlZS9FSy1KWl9pbWdfMTlwc2QucG5nIiwib2JqX2lkIjoiMzU0NTY5MTIwM2I5MDgxMyIsInRyYW5zZm9ybWF0aW9uX2RlZmluaXRpb24iOnsid2lkdGgiOjYwMH19--33d95c9f30f26119fb08e9b08113990a473d2643',
    page: 'https://www.trox.de/en/smoke-control-damper/ek-jz-605db13990db172d'
  },
  'EK2-EU': {
    image: 'https://cdn.trox.de/77999b79b47c76d4/04512dfd7970/v/1a733c7f6065/EK2-EU-introduction-image-english.png',
    page: 'https://www.trox.de/en/smoke-control-damper/ek2-eu-3d057b1570acb468'
  },
  'EK-JS': {
    image: 'https://www.trox.de/__scrivito/to_binary?encrypted_params=eyJiaW5hcnlfaWQiOiJjNGVhYzJlZmRiMjAxYzFlL2JiNzgwMzAzMDdlMi9FSy1KU19pbWdfMDFwc2QucG5nIiwib2JqX2lkIjoiYzRlYWMyZWZkYjIwMWMxZSIsInRyYW5zZm9ybWF0aW9uX2RlZmluaXRpb24iOnsid2lkdGgiOjYwMH19--7d9b45f724ea956776de3893a861d27b73daf63c',
    page: 'https://www.trox.de/en/smoke-control-damper/ek-js-fbd700e6e81da044'
  }
};

const docLinkStyle = 'font-size:11px;color:#0874ba;display:flex;flex-direction:column;gap:3px;text-decoration:none;';

function applyOfficialTroxMedia(container, headingSelector) {
  const heading = container.querySelector(headingSelector);
  if (!heading) return;
  const model = heading.textContent.trim();
  const product = troxProducts[model];
  if (!product) return;

  const image = container.querySelector('.product-image img, .detail-image img');
  if (image) {
    const localFallback = image.getAttribute('src');
    image.referrerPolicy = 'no-referrer';
    image.src = product.image;
    image.alt = `TROX ${model} — изображение изделия`;
    image.loading = 'lazy';
    image.style.objectFit = 'contain';
    image.style.background = '#fff';
    image.onerror = () => {
      image.onerror = null;
      image.src = localFallback;
    };
  }

  const docs = container.querySelector('.docs');
  if (docs) {
    docs.innerHTML = `
      <b>Документы TROX</b>
      <a style="${docLinkStyle}" href="${product.page}#downloads" target="_blank" rel="noopener noreferrer">Технический лист ↗</a>
      <a style="${docLinkStyle}" href="${product.page}#downloads" target="_blank" rel="noopener noreferrer">Сертификаты / DoP ↗</a>
      <a style="${docLinkStyle}" href="${product.page}#downloads" target="_blank" rel="noopener noreferrer">Монтажная инструкция ↗</a>
      <span>BIM / CAD <em>по запросу BOOM</em></span>`;
  }
}

document.querySelectorAll('.product-card').forEach((card) => applyOfficialTroxMedia(card, 'h2'));
document.querySelectorAll('.model-detail').forEach((detail) => applyOfficialTroxMedia(detail, 'h2'));

document.querySelectorAll('.product-card').forEach((card) => {
  const model = card.querySelector('h2')?.textContent.trim();
  const specs = [...card.querySelectorAll('.card-specs li')];

  if (model === 'EK-JZ') {
    const flowItem = specs.find((item) => item.textContent.trim().startsWith('Расход:'));
    if (flowItem) flowItem.textContent = 'Расход: до 131 544 м³/ч';
  }

  if (model === 'EK-JS') {
    const temperatureItem = specs.find((item) => item.textContent.trim().startsWith('Температура:'));
    if (temperatureItem) temperatureItem.textContent = 'Дымовые газы: до 600 °C';
  }

  if (model === 'FK2-EU') {
    const typeItem = specs.find((item) => item.textContent.trim().startsWith('Тип:'));
    if (typeItem) typeItem.textContent = 'Размеры: 200 × 100 – 1500 × 800 мм';
  }

  if (model === 'KA2-EU') {
    const platformItem = specs.find((item) => item.textContent.trim().startsWith('Платформа:'));
    if (platformItem) platformItem.textContent = 'Ширина: 250–1200 мм';
  }

  if (model === 'EK2-EU') {
    const dopItem = specs.find((item) => item.textContent.trim().startsWith('DoP:'));
    if (dopItem) dopItem.textContent = 'DoP: EK2-EU/DE/003';
  }
});

const ekJzDetail = document.querySelector('#details-ek-jz .tech-table');
if (ekJzDetail) {
  const row = [...ekJzDetail.querySelectorAll('div')].find((item) => item.querySelector('dt')?.textContent.trim() === 'Рабочие параметры');
  const dd = row?.querySelector('dd');
  if (dd) dd.textContent = 'До 131 544 м³/ч; рабочее давление −1000…+500 Па.';
}

const ekJsDetail = document.querySelector('#details-ek-js .tech-table');
if (ekJsDetail) {
  const row = [...ekJsDetail.querySelectorAll('div')].find((item) => item.querySelector('dt')?.textContent.trim() === 'Рабочие параметры');
  const dd = row?.querySelector('dd');
  if (dd) dd.textContent = '360–115 110 м³/ч; −1500…+500 Па; допускается применение в среде дымовых газов до 600 °C.';
}

const ka2Detail = document.querySelector('#details-ka2-eu .tech-table');
if (ka2Detail) {
  const row = [...ka2Detail.querySelectorAll('div')].find((item) => item.querySelector('dt')?.textContent.trim() === 'Размерный диапазон');
  const dd = row?.querySelector('dd');
  if (dd) dd.textContent = 'Ширина 250–1200 мм; высота 250–500 мм; длина 580 мм при H ≤ 400 мм или 680 мм при H = 500 мм.';
}

const ek2Detail = document.querySelector('#details-ek2-eu .tech-table');
if (ek2Detail) {
  const row = [...ek2Detail.querySelectorAll('div')].find((item) => item.querySelector('dt')?.textContent.trim() === 'Стандарты и классификация');
  const dd = row?.querySelector('dd');
  if (dd) dd.textContent = 'EN 12101-8 · EN 1366-10 · EN 1366-2 · DoP/EK2-EU/DE/003.';
}

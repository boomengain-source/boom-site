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
      const categories = (card.dataset.categories || '').split(' ');
      const isVisible = filter === 'all' || categories.includes(filter);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });
    if (resultCount) resultCount.textContent = `Показано: ${visibleCount} ${getModelWord(visibleCount)}`;
    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
  });
});

function getModelWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) return 'модель';
  if ([2,3,4].includes(count % 10) && ![12,13,14].includes(count % 100)) return 'модели';
  return 'моделей';
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
  mainNav.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
}

const headerLogo = document.querySelector('.site-header .logo img');
if (headerLogo) {
  headerLogo.src = 'assets/images/boom-engineering-logo.svg';
  headerLogo.alt = 'BOOM Engineering';
  headerLogo.style.width = '197px';
  headerLogo.style.height = '63px';
  headerLogo.style.objectFit = 'contain';
}

const phoneSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;width:22px;height:22px;flex:0 0 22px"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25A2.25 2.25 0 0 0 21.75 19.5v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"></path></svg>`;
const mailSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;width:23px;height:23px;flex:0 0 23px"><path d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75"></path></svg>`;

const phoneLink = document.querySelector('.contact-left a[href^="tel:"]');
if (phoneLink) {
  const text = phoneLink.textContent.replace(/^☎\s*/, '').trim();
  phoneLink.innerHTML = `${phoneSvg}${text}`;
}
const mailLink = document.querySelector('.contact-left a[href^="mailto:"]');
if (mailLink) {
  const text = mailLink.textContent.replace(/^✉\s*/, '').trim();
  mailLink.innerHTML = `${mailSvg}${text}`;
}

const defaultSeo = {title: document.title, description: document.querySelector('meta[name="description"]')?.content || ''};
function applyModelSeo() {
  const detail = location.hash ? document.querySelector(location.hash) : null;
  const meta = document.querySelector('meta[name="description"]');
  document.title = detail?.dataset.seoTitle || defaultSeo.title;
  if (meta) meta.content = detail?.dataset.seoDescription || defaultSeo.description;
}
window.addEventListener('hashchange', applyModelSeo);
applyModelSeo();

const troxProducts = {
  'FKA2-EU': {image:'assets/images/trox-official/fka2-eu.jpg',page:'https://www.trox.de/en/fka2-eu-d4d8a977788c4dee',datasheet:'https://cdn.trox.de/c4ea1008aa81ec70/575b601e6cd7/FKA2-EU_PD_2024_10_17_DE_en.pdf',dop:'https://cdn.trox.de/c1ccd758d98922d6/cded09c658d9/FKA2-EU_DoP_2025_05_DE_en.pdf',manual:'https://cdn.trox.de/c10c837c244cef45/59b164fe1e90/FKA2-EU_IOM_A00000092719_V1_2023_07_GB_en.pdf'},
  'FK2-EU': {image:'assets/images/trox-official/fk2-eu.jpg',page:'https://www.trox.de/en/fire-dampers/fk2-eu-6a7ebbadc72c1037',datasheet:'https://cdn.trox.de/4242a202e284570e/8e0ae5b65f4c/b04a033ad76a0aa177591b08f2c95745.pdf'},
  'FKR-EU': {image:'assets/images/trox-official/fkr-eu.png',page:'https://www.trox.de/en/fire-dampers/fkr-eu-69c6216a6d944cc9'},
  'FKRS-EU': {image:'assets/images/trox-official/fkrs-eu.png',page:'https://www.trox.de/en/fire-dampers/fkrs-eu-e44c04db778f79a6',datasheet:'https://cdn.trox.de/3a5b36ea741ff75f/59aef46c5a34/FKRS-EU_PD_2025_10_28_DE_en.pdf',manual:'https://cdn.trox.de/e040598b677afae7/f21a95a75149/FKRS-EU_IOM_A00000092709_V4.1_2025_11_GB_en.pdf'},
  'KA2-EU': {image:'assets/images/trox-official/ka2-eu.png',page:'https://www.trox.de/en/fire-dampers/ka2-eu-1ac28fd4d1bb18a5',downloadsPage:'https://www.trox.de/brandschutzklappen/ka2-eu-6a3320d221576495#downloads',datasheet:'https://cdn.trox.de/a21cd7187374574a/6820aa7817a4/KA2-EU_PD_2025_05_08_DE_en.pdf',manual:'https://cdn.trox.de/60370b283e9255e4/c7e11ec7bd73/KA2-EU_IOM_CD10090_V1_2025_05_GB_en.pdf'},
  'EK-JZ': {image:'assets/images/trox-official/ek-jz.png',page:'https://www.trox.de/en/smoke-control-damper/ek-jz-605db13990db172d'},
  'EK2-EU': {image:'assets/images/trox-official/ek2-eu.png',page:'https://www.trox.de/en/smoke-control-damper/ek2-eu-3d057b1570acb468',manual:'https://cdn.trox.de/76560e599d9357ce/f2fe2002c4ce/EK2-EU_IOM_A00000085080_V3_2026_05_GB_en.pdf'},
  'EK-JS': {image:'assets/images/trox-official/ek-js.png',page:'https://www.trox.de/en/smoke-control-damper/ek-js-fbd700e6e81da044',datasheet:'https://cdn.trox.de/898ccb2f86912107/8ff73cb109a4/EK-JS_PD_2024_03_15_DE_en.pdf'}
};

const verifiedSpecs = {
  'FKA2-EU':['Размеры: 200 × 100 – 1500 × 800 мм','Длина: 305 / 500 мм','Расход: до 51 840 м³/ч','Давление: до 2000 Па','Классификация: до EI 120','Срабатывание: 72/95 °C'],
  'FK2-EU':['Размеры: 200 × 100 – 1500 × 800 мм','Длина: 305 / 500 мм','Расход: до 51 840 м³/ч','Давление: до 2000 Па','Классификация: EI 30 – EI 240','Стандарт: EN 15650'],
  'FKR-EU':['Размеры: Ø 315–800 мм','Длина: 495 / 550 мм','Расход: до 21 600 м³/ч','Давление: до 2000 Па','Классификация: до EI 120','Срабатывание: 72/95 °C'],
  'FKRS-EU':['Размеры: Ø 100–315 мм','Длина: 400 мм','Расход: до 2 770 м³/ч','Давление: до 1500 Па','Классификация: до EI 120','Срабатывание: 72/95 °C'],
  'KA2-EU':['Размеры: 250 × 250 – 1200 × 500 мм','Длина: 580 / 680 мм','Расход: до 16 200 м³/ч','Скорость: до 7,5 м/с','Срабатывание: 72 °C; закрытие ≤ 3 с','Класс: K90; EN 15650'],
  'EK-JZ':['Размеры: 200 × 230 – 1200 × 2030 мм','Длина: 250 мм','Расход: до 131 544 м³/ч','Давление: −1000…+500 Па','Стандарт: EN 12101-8','Герметичность: Class 3 / C'],
  'EK2-EU':['Размеры: 200 × 200 – 1500 × 800 мм','Расход: до 43 200 м³/ч','Давление: −1500…+500 Па','Температура: −30…+50 °C','Стандарт: EN 12101-8','DoP: EK2-EU/001'],
  'EK-JS':['Размеры: 100 × 100 – 1250 × 2560 мм','Длина: 200 мм','Расход: 360–115 110 м³/ч','Давление: −1500…+500 Па','Дымовые газы: до 600 °C','DoP: EK-JS/001']
};

const detailUpdates = {
  'FKA2-EU':{'Размерный диапазон':'200 × 100 – 1500 × 800 мм; длина корпуса 305 или 500 мм.','Рабочие параметры':'До 51 840 м³/ч; перепад давления до 2000 Па; эксплуатация −20…+50 °C; срабатывание 72 или 95 °C.','Стандарты и классификация':'До EI 120 · EN 15650 · EN 1366-2 · DoP/FKA2-EU/DE/002.'},
  'FK2-EU':{'Размерный диапазон':'200 × 100 – 1500 × 800 мм; длина корпуса 305 или 500 мм.','Рабочие параметры':'До 51 840 м³/ч; перепад давления до 2000 Па; эксплуатация −20…+50 °C.','Стандарты и классификация':'EI 30 – EI 240 · EN 15650 · EN 1366-2 · EN 13501-3 · CE / DoP.'},
  'FKR-EU':{'Размерный диапазон':'Ø 315–800 мм; длина корпуса 495 или 550 мм.','Рабочие параметры':'До 21 600 м³/ч; перепад давления до 2000 Па; эксплуатация −20…+50 °C; срабатывание 72/95 °C.','Стандарты и классификация':'До EI 120 · EN 15650 · EN 1366-2 · EN 13501-3 · EN 1751.'},
  'FKRS-EU':{'Размерный диапазон':'Ø 100–315 мм; длина корпуса 400 мм.','Рабочие параметры':'До 2 770 м³/ч; перепад давления до 1500 Па; эксплуатация −20…+50 °C; срабатывание 72/95 °C.','Стандарты и классификация':'До EI 120 · EN 15650 · EN 1366-2 · EN 13501-3 · EN 1751.'},
  'KA2-EU':{'Размерный диапазон':'250 × 250 – 1200 × 500 мм; длина 580 мм при H ≤ 400 мм и 680 мм при H до 500 мм.','Рабочие параметры':'До 16 200 м³/ч; скорость до 7,5 м/с; эксплуатация +10…+50 °C; срабатывание 72 °C; закрытие не более 3 секунд.','Стандарты и классификация':'K90 · EN 15650 · EN 1366-2 · Z-41.3.-716 · VDI 6022.'},
  'EK-JZ':{'Рабочие параметры':'До 131 544 м³/ч; рабочее давление −1000…+500 Па; эксплуатация −30…+50 °C.','Стандарты и классификация':'EN 12101-8 · EN 1366-2 · EN 1366-10 · EN 1751 Class 3 · корпус Class C.'},
  'EK2-EU':{'Рабочие параметры':'До 43 200 м³/ч; −1500…+500 Па; эксплуатация −30…+50 °C.','Стандарты и классификация':'EN 12101-8 · EN 1366-10 · EN 1366-2 · DoP/EK2-EU/001.'},
  'EK-JS':{'Рабочие параметры':'360–115 110 м³/ч; −1500…+500 Па; применение в среде дымовых газов до 600 °C.','Стандарты и классификация':'EN 12101-8 · EN 1366-10 · EN 13501-4 · DoP/EK-JS/001.'}
};

const modelPages = {'FKA2-EU':'trox-fka2-eu.html','FK2-EU':'trox-fk2-eu.html','FKR-EU':'trox-fkr-eu.html','FKRS-EU':'trox-fkrs-eu.html','KA2-EU':'trox-ka2-eu.html','EK-JZ':'trox-ek-jz.html','EK2-EU':'trox-ek2-eu.html','EK-JS':'trox-ek-js.html'};
const docLinkStyle = 'font-size:11px;color:#0874ba;display:flex;flex-direction:column;gap:3px;text-decoration:none;';

function applyOfficialTroxMedia(container, headingSelector) {
  const heading = container.querySelector(headingSelector);
  if (!heading) return;
  const model = heading.textContent.trim();
  const product = troxProducts[model];
  if (!product) return;
  const image = container.querySelector('.product-image img, .detail-image img');
  if (image) {
    image.referrerPolicy = 'no-referrer'; image.src = product.image; image.alt = `TROX ${model} — изображение изделия`; image.loading = 'lazy'; image.style.objectFit = 'contain'; image.style.background = '#fff';
    image.onerror = () => { image.onerror = null; image.removeAttribute('src'); image.classList.add('image-unavailable'); image.alt = `Изображение TROX ${model} временно недоступно`; };
  }
  const downloadsPage = product.downloadsPage || `${product.page}#downloads`;
  const datasheetLink = product.datasheet || downloadsPage;
  const dopLink = product.dop || downloadsPage;
  const manualLink = product.manual || downloadsPage;
  const docs = container.querySelector('.docs');
  if (docs) docs.innerHTML = `<b>Документы TROX</b><a style="${docLinkStyle}" href="${datasheetLink}" target="_blank" rel="noopener noreferrer">Технический лист TROX ↗</a><a style="${docLinkStyle}" href="${dopLink}" target="_blank" rel="noopener noreferrer">DoP / сертификаты ↗</a><a style="${docLinkStyle}" href="${manualLink}" target="_blank" rel="noopener noreferrer">Монтаж и эксплуатация ↗</a><a style="${docLinkStyle}" href="${downloadsPage}" target="_blank" rel="noopener noreferrer">Все актуальные документы ↗</a><span>BIM / CAD <em>по запросу BOOM</em></span>`;
}
function applyVerifiedSpecs(card) {
  const model = card.querySelector('h2')?.textContent.trim();
  const values = verifiedSpecs[model];
  const list = card.querySelector('.card-specs');
  if (values && list) list.innerHTML = values.map((value)=>`<li>${value}</li>`).join('');
  const detailLink = card.querySelector('.detail-link');
  if (detailLink && modelPages[model]) detailLink.href = modelPages[model];
}
function applyDetailUpdates(detail) {
  const model = detail.querySelector('h2')?.textContent.trim();
  const updates = detailUpdates[model];
  if (!updates) return;
  detail.querySelectorAll('.tech-table > div').forEach((row)=>{const label=row.querySelector('dt')?.textContent.trim();const value=row.querySelector('dd');if(label&&value&&updates[label]) value.textContent=updates[label];});
}
document.querySelectorAll('.product-card').forEach((card)=>{applyOfficialTroxMedia(card,'h2');applyVerifiedSpecs(card);});
document.querySelectorAll('.model-detail').forEach((detail)=>{applyOfficialTroxMedia(detail,'h2');applyDetailUpdates(detail);});

// Visual QA mode for staging: append ?qa=1 to any catalogue URL.
// This catches missing images, failed loads, legacy placeholders and raster upscaling risks.
if (new URLSearchParams(window.location.search).get('qa') === '1') {
  window.addEventListener('load', () => {
    const productCardSelector = [
      '.product-card','.vav-card','.ad-card','.fd-card','.safe-card',
      '.ac-card','.cat-card','.ahu-card','.clean-card','.med-card'
    ].join(',');
    const issues = [];
    const qaCards = [...document.querySelectorAll(productCardSelector)];

    qaCards.forEach((card, index) => {
      const title = card.querySelector('h2,h3')?.textContent.trim() || `card-${index + 1}`;
      const img = card.querySelector('img');
      if (!img) {
        issues.push({severity:'ERROR', model:title, problem:'Нет изображения в товарной карточке'});
        return;
      }
      const src = img.currentSrc || img.src || '';
      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        issues.push({severity:'ERROR', model:title, problem:'Изображение не загрузилось', src});
        return;
      }
      if (/-product\.svg(?:$|\?)/i.test(src)) {
        issues.push({severity:'ERROR', model:title, problem:'Обнаружена legacy SVG-заглушка', src});
      }
      if (!img.alt || !img.alt.trim()) {
        issues.push({severity:'ERROR', model:title, problem:'Пустой alt', src});
      }
      const rect = img.getBoundingClientRect();
      const ratioX = rect.width ? img.naturalWidth / rect.width : 0;
      const ratioY = rect.height ? img.naturalHeight / rect.height : 0;
      const density = Math.min(ratioX || Infinity, ratioY || Infinity);
      if (density < 1.0) {
        issues.push({severity:'ERROR', model:title, problem:`Растровое изображение увеличено браузером (${density.toFixed(2)}× source/CSS)`, src});
      } else if (density < 1.25) {
        issues.push({severity:'WARN', model:title, problem:`Низкий запас резкости (${density.toFixed(2)}×); заменить источник или уменьшить вывод`, src});
      }
    });

    [...document.querySelectorAll('.model-detail')].forEach((detail, index) => {
      const title = detail.querySelector('h1,h2,h3')?.textContent.trim() || `detail-${index + 1}`;
      const img = detail.querySelector('img');
      if (!img) issues.push({severity:'ERROR', model:title, problem:'Нет изображения в детальной карточке'});
    });

    const errors = issues.filter(i => i.severity === 'ERROR').length;
    const warnings = issues.filter(i => i.severity === 'WARN').length;
    console.group(`BOOM TROX visual QA: ${errors} errors, ${warnings} warnings`);
    if (issues.length) console.table(issues); else console.info('PASS: visual image gates passed');
    console.groupEnd();

    const panel = document.createElement('div');
    panel.id = 'visual-qa-panel';
    panel.style.cssText = `position:fixed;z-index:99999;right:12px;bottom:12px;max-width:430px;max-height:45vh;overflow:auto;padding:12px 14px;border-radius:6px;font:12px/1.4 Arial,sans-serif;color:#fff;background:${errors ? '#a51616' : warnings ? '#9a6500' : '#147a42'};box-shadow:0 8px 30px rgba(0,0,0,.28)`;
    panel.innerHTML = `<b>Visual QA: ${errors ? 'FAIL' : warnings ? 'WARN' : 'PASS'}</b><br>Ошибок: ${errors}; предупреждений: ${warnings}` +
      (issues.length ? `<ol style="margin:8px 0 0;padding-left:18px">${issues.slice(0,12).map(i=>`<li><b>${i.model}</b>: ${i.problem}</li>`).join('')}</ol>` : '');
    document.body.appendChild(panel);
  });
}

# BOOM Engineering — ТЗ программисту по переносу SEO-каталога TROX

**Дата:** 11.09.2026  
**Production:** https://boom-eng.ru/  
**GitHub:** https://github.com/boomengain-source/boom-site  
**Контрольная версия staging перед переносом:** `2aa7d8bf99b70681e58b4f477ba432d75e83931d`

> Задача: перенести готовый TROX-каталог и SEO-посадочные из GitHub в действующий WordPress-сайт BOOM, сохранив текущую шапку/подвал, создав масштабируемую структуру каталога и открыв для индексации только production-домен `boom-eng.ru`.

## 1. Целевая архитектура WordPress

- Работать через child theme текущей темы.
- Custom Post Type: `trox_product`.
- Taxonomy: `trox_category`.
- Отраслевые и problem-based SEO-страницы — обычные WordPress Pages.
- Общие CSS/JS каталога подключать через `wp_enqueue_style` / `wp_enqueue_script`.
- Использовать существующие `header.php`, `footer.php`, меню, формы, аналитику и breadcrumbs сайта BOOM.
- Не создавать отдельный PHP-шаблон под каждую модель.

Рекомендуемая структура child theme:

```text
/wp-content/themes/boom-child/
  functions.php
  assets/css/trox-catalog.css
  assets/js/trox-catalog.js
  archive-trox_product.php
  single-trox_product.php
  taxonomy-trox_category.php
  page-trox-solutions.php
```

## 2. SEO-структура URL

Главный принцип — единый раздел `/trox/`, без `.html` и без дублей.

### Категории

- `/trox/`
- `/trox/fire-smoke-dampers/`
- `/trox/vav/`
- `/trox/air-diffusers/`
- `/trox/cav-air-distribution/`
- `/trox/cleanrooms/`
- `/trox/bibo-safe-change/`
- `/trox/sound-attenuators/`
- `/trox/labcontrol/`
- `/trox/healthcare/`
- `/trox/air-handling-units/`

### Карточки моделей

Предпочтительно вложенные URL, например:

- `/trox/vav/tvr/`
- `/trox/vav/tvj/`
- `/trox/cleanrooms/tfp/`
- `/trox/bibo-safe-change/ksfs/`
- `/trox/sound-attenuators/ms/`
- `/trox/fire-smoke-dampers/fka2-eu/`
- `/trox/air-handling-units/x-cube/`

### Отраслевые и problem-based страницы

- `/trox/solutions/`
- `/trox/solutions/pharma/`
- `/trox/solutions/laboratories/`
- `/trox/solutions/medical/`
- `/trox/solutions/microelectronics/`
- `/trox/solutions/biotech/`
- `/trox/solutions/cleanroom-pressure-control/`
- `/trox/solutions/hepa-h13-h14/`

## 3. Карта переноса

| Staging-файл | Production URL | Тип |
|---|---|---|
| `trox-catalog.html` | `/trox/` | Главный каталог |
| `trox-fire-smoke-dampers.html` | `/trox/fire-smoke-dampers/` | Категория |
| `trox-vav.html` | `/trox/vav/` | Категория |
| `trox-air-diffusers.html` | `/trox/air-diffusers/` | Категория |
| `trox-cav-air-distribution.html` | `/trox/cav-air-distribution/` | Категория |
| `trox-cleanrooms.html` | `/trox/cleanrooms/` | Категория |
| `trox-bibo-safe-change.html` | `/trox/bibo-safe-change/` | Категория |
| `trox-sound-attenuators.html` | `/trox/sound-attenuators/` | Категория |
| `trox-pressure-labcontrol.html` | `/trox/labcontrol/` | Категория |
| `trox-healthcare-operating-rooms.html` | `/trox/healthcare/` | Категория |
| `trox-air-handling-units.html` | `/trox/air-handling-units/` | Категория |
| `trox-industry-solutions.html` | `/trox/solutions/` | SEO-хаб |
| `trox-pharma-ventilation.html` | `/trox/solutions/pharma/` | SEO-страница |
| `trox-laboratory-ventilation.html` | `/trox/solutions/laboratories/` | SEO-страница |
| `trox-medical-ventilation.html` | `/trox/solutions/medical/` | SEO-страница |
| `trox-microelectronics-cleanrooms.html` | `/trox/solutions/microelectronics/` | SEO-страница |
| `trox-biotech-ventilation.html` | `/trox/solutions/biotech/` | SEO-страница |
| `trox-cleanroom-pressure-control.html` | `/trox/solutions/cleanroom-pressure-control/` | SEO-страница |
| `trox-hepa-h13-h14.html` | `/trox/solutions/hepa-h13-h14/` | SEO-страница |

## 4. Что переносить из HTML

Переносить:
- содержимое внутри `<main>...</main>`;
- H1/H2/H3;
- тексты, таблицы, карточки, CTA и внутреннюю перелинковку;
- `<title>` → SEO title;
- `<meta name="description">` → meta description.

Не переносить как есть:
- staging header/footer;
- ссылки `*.html`;
- staging `sitemap.xml` и `robots.txt`;
- временные внешние картинки как единственный источник;
- JavaScript-fallback на условную схему/заглушку вместо реального товара;
- `mailto`-CTA, если на production уже есть нормальная форма/CRM-интеграция.

## 5. Поля CPT `trox_product`

- модель;
- полное название;
- категория;
- краткое SEO-описание;
- полное описание;
- технические характеристики;
- главное изображение;
- галерея изображений при наличии;
- официальный URL TROX;
- PDF/документы;
- связанные модели;
- связанные отрасли;
- CTA/форма запроса;
- SEO title;
- meta description.

Реализовать через ACF или эквивалент текущей темы. Не хардкодить контент модели в PHP.

## 6. Обязательные SEO-настройки

- Уникальный SEO title и meta description.
- Ровно один H1.
- Логичная иерархия H2/H3.
- Self-referencing canonical только на `boom-eng.ru`.
- Breadcrumbs.
- 2–6 релевантных внутренних ссылок на странице.
- Нет orphan pages.
- HTTP 200 на всех опубликованных URL.
- Production `/trox/` не закрыт `robots`/`noindex`.
- GitHub staging остаётся закрытым от индексации.
- Production XML sitemap содержит только URL `boom-eng.ru`.

Schema.org:
- `Organization` — глобально;
- `BreadcrumbList` — внутренние страницы;
- `Product` — реальные карточки моделей;
- `Service` — при необходимости для проектного подбора/поставки.

## 7. Внутренняя перелинковка

```text
/trox/ → категория → модель ↔ отраслевое / problem-based решение
```

Примеры:
- Pharma → Cleanrooms → HEPA → Pressure control → X-CUBE CROFCU.
- Laboratories → LABCONTROL → EASYLAB TCU3 → VAV → воздухораспределение.
- Medical → Healthcare → HEPA → Pressure control → Fire/Smoke Dampers.
- Microelectronics → Cleanrooms → MFPCR → HEPA/ULPA → Pressure control.
- Biotech → Cleanrooms → Safe Change/BIBO → LABCONTROL → X-CUBE.

## 8. Изображения — критическое требование

На production нельзя использовать стилизованные схемы, буквенные заглушки, условные рисунки или SVG-имитации товара как основное изображение карточки.

Для каждой модели:
- использовать реальное изображение именно этой модели или официальное продуктовое изображение TROX;
- перед публикацией визуально сверить модель, привод, форму корпуса и тип изделия с названием карточки;
- после подтверждения права использования хранить финальные изображения локально в WordPress/Media Library либо в assets child theme;
- внешний hotlink допустим только на staging, но не как единственный источник production-изображения;
- использовать WebP/AVIF, при необходимости сохранять оригинал JPEG/PNG;
- указывать содержательный `alt`, например `TROX FK2-EU — противопожарный клапан`;
- задавать `width`/`height` или `aspect-ratio`, чтобы исключить CLS;
- применять `object-fit: contain`, не обрезать оборудование ради заполнения карточки;
- не lazy-load hero/LCP-изображение; изображения ниже первого экрана можно lazy-load;
- при ошибке загрузки не подменять товар чужим изображением или старой условной схемой: показывать нейтральное состояние «изображение временно недоступно»;
- итоговую карточку проверить минимум на desktop, tablet и mobile.

Особое внимание при переносе: FKA2-EU, FK2-EU, FKR-EU, FKRS-EU, KA2-EU, EK-JZ, EK2-EU, EK-JS, VDW, PURELINE35, TID, RFD-SIRIUS, KSF, KSFS, KSFSSP, CA, CK, CF, CAK, MS, XS, TS, TX.

## 9. Формы и аналитика

- CTA подключить к существующей production-форме/CRM.
- Сохранить Яндекс Метрику/GA4 и события отправки формы.
- Проверить успешную отправку тестовой заявки с desktop и mobile.
- Не оставлять staging `mailto:` как единственный канал заявки, если на основном сайте используется форма.

## 10. Старые URL и 301

До публикации собрать существующие TROX/товарные URL на `boom-eng.ru`.

- Старая страница заменяется новой → 301 на максимально релевантный новый URL.
- Не редиректить всё массово на `/trox/`, если есть точная категория/модель.
- Не удалять индексируемую страницу без проверки трафика, внешних ссылок и подходящего 301.
- После запуска обновить внутренние ссылки, чтобы не оставлять цепочки 301.

## 11. Порядок внедрения

1. Полный backup файлов и БД.
2. Развернуть изменения на закрытом staging WordPress (`noindex`).
3. Создать child theme, CPT, taxonomy, поля и шаблоны.
4. Перенести главный каталог, категории, карточки и SEO-страницы.
5. Локализовать и оптимизировать изображения.
6. Подключить формы, аналитику, breadcrumbs и SEO-плагин.
7. Выполнить пятиэтапную приёмку из раздела ниже.
8. Опубликовать на `boom-eng.ru`.
9. Обновить production sitemap.
10. Отправить sitemap в Яндекс Вебмастер и Google Search Console.

## 12. Обязательная пятиэтапная приёмка

### Проверка 1 — контент и идентичность оборудования
- Каждое изображение соответствует модели в H1/H2.
- Нет схем-заглушек, буквенных картинок и чужих моделей.
- Название, категория и ключевые технические параметры не противоречат друг другу.
- На странице модели нет изображения соседней серии.

### Проверка 2 — frontend и responsive
Проверить вручную минимум на ширинах 1440, 1024, 768 и 390 px:
- шапку и мобильное меню;
- H1/H2 без наложений и обрезания;
- карточки и изображения без выхода за контейнер;
- таблицы/характеристики;
- CTA;
- footer;
- отсутствие горизонтального скролла.

### Проверка 3 — техническая целостность
- Нет 404 внутренних ссылок.
- Нет битых локальных assets.
- Нет ошибок JavaScript в console.
- Все кнопки и формы работают.
- На каждой странице ровно один H1.
- У всех смысловых изображений есть `alt`.
- Нет дублирующихся `id`.

### Проверка 4 — SEO
- Уникальные title/description.
- Canonical ведёт на текущий URL `boom-eng.ru`.
- Breadcrumbs корректны.
- Production не содержит `noindex`/`Disallow` для TROX-раздела.
- XML sitemap содержит только production URL.
- GitHub staging остаётся закрытым от индексации.
- Нет дублей одной и той же страницы под разными URL.

### Проверка 5 — post-deploy контроль
После выкладки на production:
- crawl всего `/trox/`;
- HTTP 200/301/404 отчёт;
- повторная ручная проверка 10–15 ключевых страниц;
- PageSpeed/Core Web Vitals на главном каталоге, категории и карточке продукта;
- тестовая заявка;
- проверка Метрики/GA4;
- проверка sitemap в Яндекс Вебмастере и Google Search Console.

## 13. Финальный чек-лист приёмки

- [ ] Работает `/trox/` на production.
- [ ] Все категории открываются без 404.
- [ ] Карточки моделей выводятся через общий шаблон CPT.
- [ ] Перенесены отраслевые и problem-based страницы.
- [ ] Все staging `*.html` ссылки заменены production URL.
- [ ] На каждой странице корректны title, description, H1 и canonical.
- [ ] Breadcrumbs работают.
- [ ] Нет битых внутренних ссылок и orphan pages.
- [ ] Формы/CTA реально отправляют заявки.
- [ ] Все реальные продуктовые изображения соответствуют моделям.
- [ ] Нет визуальных схем-заглушек вместо товара.
- [ ] Изображения локальные и оптимизированы.
- [ ] Проверена мобильная версия.
- [ ] Нет случайного `noindex` на production TROX-страницах.
- [ ] GitHub staging не индексируется.
- [ ] Production sitemap содержит TROX URL и не содержит `github.io`.
- [ ] Старые URL сохранены либо имеют корректный 301.
- [ ] Выполнен crawl раздела и проверены HTTP-коды.
- [ ] Проверены PageSpeed/Core Web Vitals.
- [ ] Sitemap отправлен в Яндекс Вебмастер и Google Search Console.

## 14. Что нельзя делать

- Не использовать GitHub Pages как финальный production.
- Не индексировать одинаковый контент одновременно на `github.io` и `boom-eng.ru`.
- Не использовать staging `.html` URL как production.
- Не вставлять целые HTML-документы в Gutenberg/Classic Editor.
- Не создавать отдельный PHP-шаблон под каждую модель.
- Не копировать staging sitemap на основной домен.
- Не создавать дубли одной страницы в разных URL-схемах.
- Не менять уже проиндексированные URL без 301.
- Не использовать внешнюю картинку без локальной production-копии как единственную точку отказа.
- Не возвращать SVG/схему-заглушку при ошибке загрузки реальной фотографии товара.

## Критерий готовности

Раздел можно открывать поисковым роботам только после пятиэтапной приёмки: изображения и контент, responsive, техническая целостность, SEO и post-deploy контроль. Критические ошибки — неверная модель на изображении, 404, неработающая форма, случайный `noindex`, неправильный canonical или дубли — блокируют публикацию.
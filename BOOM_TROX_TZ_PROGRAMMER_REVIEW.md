# BOOM Engineering — ТЗ программисту по переносу SEO-каталога TROX

**Дата:** 10.09.2026  
**Production:** https://boom-eng.ru/  
**GitHub:** https://github.com/boomengain-source/boom-site  
**Контрольная версия:** `225078448cf944a9dbaa060ab4eb0931d11658d4`

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
- `mailto`-CTA, если на production уже есть нормальная форма/CRM-интеграция.

## 5. Поля CPT `trox_product`

- модель;
- полное название;
- категория;
- краткое SEO-описание;
- полное описание;
- технические характеристики;
- главное изображение;
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

## 8. Изображения, формы и аналитика

- Изображения TROX хранить локально после подтверждения права использования.
- WebP/AVIF, корректные `alt`, `width`, `height`.
- Не lazy-load hero/LCP-картинку.
- CTA подключить к существующей production-форме/CRM.
- Сохранить Яндекс Метрику/GA4 и события отправки формы.

## 9. Старые URL и 301

До публикации собрать существующие TROX/товарные URL на `boom-eng.ru`.

- Старая страница заменяется новой → 301 на максимально релевантный новый URL.
- Не редиректить всё массово на `/trox/`, если есть точная категория/модель.
- Не удалять индексируемую страницу без проверки трафика, внешних ссылок и подходящего 301.
- После запуска обновить внутренние ссылки, чтобы не оставлять цепочки 301.

## 10. Порядок внедрения

1. Полный backup файлов и БД.
2. Развернуть изменения на закрытом staging WordPress (`noindex`).
3. Создать child theme, CPT, taxonomy, поля и шаблоны.
4. Перенести главный каталог, категории, карточки и SEO-страницы.
5. Проверить URL, HTTP 200, canonical, robots, title/description/H1, breadcrumbs, ссылки, изображения, формы, mobile, Core Web Vitals.
6. Опубликовать на `boom-eng.ru`.
7. Обновить production sitemap.
8. Отправить sitemap в Яндекс Вебмастер и Google Search Console.

## 11. Финальный чек-лист приёмки

- [ ] Работает `/trox/` на production.
- [ ] Все категории открываются без 404.
- [ ] Карточки моделей выводятся через общий шаблон CPT.
- [ ] Перенесены отраслевые и problem-based страницы.
- [ ] Все staging `*.html` ссылки заменены production URL.
- [ ] На каждой странице корректны title, description, H1 и canonical.
- [ ] Breadcrumbs работают.
- [ ] Нет битых внутренних ссылок и orphan pages.
- [ ] Формы/CTA реально отправляют заявки.
- [ ] Изображения локальные и оптимизированы.
- [ ] Проверена мобильная версия.
- [ ] Нет случайного `noindex` на production TROX-страницах.
- [ ] GitHub staging не индексируется.
- [ ] Production sitemap содержит TROX URL и не содержит `github.io`.
- [ ] Старые URL сохранены либо имеют корректный 301.
- [ ] Выполнен crawl раздела и проверены HTTP-коды.
- [ ] Проверены PageSpeed/Core Web Vitals.
- [ ] Sitemap отправлен в Яндекс Вебмастер и Google Search Console.

## 12. Что нельзя делать

- Не использовать GitHub Pages как финальный production.
- Не индексировать одинаковый контент одновременно на `github.io` и `boom-eng.ru`.
- Не использовать staging `.html` URL как production.
- Не вставлять целые HTML-документы в Gutenberg/Classic Editor.
- Не создавать отдельный PHP-шаблон под каждую модель.
- Не копировать staging sitemap на основной домен.
- Не создавать дубли одной страницы в разных URL-схемах.
- Не менять уже проиндексированные URL без 301.

## Критерий готовности

Раздел можно открывать поисковым роботам только после проверки HTTP 200, canonical, robots/noindex, внутренних ссылок, изображений, форм, мобильной версии, sitemap и отсутствия дублей.
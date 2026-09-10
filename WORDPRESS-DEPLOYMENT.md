# BOOM / TROX — перенос каталога на основной WordPress-сайт

## 1. Что является источником

Репозиторий `boomengain-source/boom-site` — staging и источник утверждённой верстки/контента. GitHub Pages нужен для проверки до публикации. Основной SEO-трафик должен идти только на `https://boom-eng.ru/`.

## 2. Рекомендуемый способ публикации

Не вставлять полный HTML-файл целиком в редактор WordPress. Перенести каталог в текущую тему сайта (по текущим ссылкам на ресурсы используется тема `boom-theme`) или в child theme.

Структура:
- общий `header.php` / `footer.php` оставить от действующего сайта;
- общие стили каталога вынести в отдельный `assets/css/trox-catalog.css` и подключать через `wp_enqueue_style`;
- общий JS каталога вынести в `assets/js/trox-catalog.js` и подключать через `wp_enqueue_script`;
- содержимое между `<main>...</main>` переносить в WordPress-шаблоны;
- изображения сохранить локально в медиатеке/теме, не зависеть от временных внешних URL;
- title/description задавать через SEO-плагин или хуки WordPress, не дублировать вручную в body.

## 3. URL

На основном сайте использовать чистые URL без `.html`:
- `/trox-catalog/`
- `/trox-vav/`
- `/trox-cleanrooms/`
- `/trox-bibo-safe-change/`
- `/trox-sound-attenuators/`
- `/trox-air-diffusers/`
- `/trox-pressure-labcontrol/`
- `/trox-healthcare-operating-rooms/`
- `/trox-air-handling-units/`

Карточки моделей аналогично:
- `/trox-ms/`, `/trox-xs/`, `/trox-ca/` и т.д.

GitHub URL не использовать как canonical для основного сайта.

## 4. Самый быстрый вариант для программиста

1. Сделать резервную копию сайта и темы.
2. Создать шаблон `page-trox.php` либо несколько page templates внутри child theme.
3. Создать WordPress Pages с нужными slug.
4. В шаблоне вызвать `get_header()` и `get_footer()`.
5. Вставить утверждённый контент из соответствующего HTML-файла — только блок `<main>`.
6. Удалить из перенесённого HTML собственные `<header>`, `<footer>`, `<link rel="stylesheet">` и `<script>` — WordPress подключает их централизованно.
7. Перенести CSS из `styles.css` и локальных `<style>` в `trox-catalog.css`.
8. Перевести внутренние ссылки `trox-xxx.html` на WordPress URL `/trox-xxx/`.
9. Перенести изображения в локальную медиатеку или `/wp-content/themes/.../assets/images/trox/`.
10. Для каждой страницы заполнить SEO title и meta description из `<title>` и `<meta name="description">` staging-файла.
11. Включить страницы в меню/каталог и проверить breadcrumbs.
12. Обновить XML sitemap основного домена через SEO-плагин и отправить его в Яндекс Вебмастер / Google Search Console.

## 5. Правильная архитектура на перспективу

Если каталог будет расширяться дальше, лучше не создавать 100 отдельных PHP-шаблонов. Сделать Custom Post Type `trox_product` и taxonomy `trox_category`.

Рекомендуемые поля продукта:
- модель;
- категория;
- краткое описание;
- полное описание;
- технические параметры;
- изображение;
- официальный URL TROX;
- SEO title;
- meta description;
- PDF/документы;
- связанные продукты;
- CTA / форма запроса.

Шаблоны:
- `archive-trox_product.php` — общий каталог;
- `single-trox_product.php` — карточка модели;
- `taxonomy-trox_category.php` — страница категории.

Так каталог можно будет пополнять через админку WordPress без ручного редактирования HTML.

## 6. SEO при переносе

Обязательно:
- один индексируемый URL на одну страницу;
- canonical только на `boom-eng.ru`;
- уникальные title / description / H1;
- хлебные крошки;
- внутренняя перелинковка категория → товар → связанная категория;
- Product/Organization/Breadcrumb schema там, где применимо;
- WebP/AVIF изображения, width/height, lazy loading;
- sitemap только основного домена;
- не закрывать `/trox-*` через robots.txt;
- после публикации проверить HTTP 200, canonical, robots, mobile layout и Core Web Vitals.

## 7. Что НЕ делать

- Не направлять боевой домен на GitHub Pages как конечное решение.
- Не копировать `sitemap.xml` из staging с доменом github.io на основной сайт.
- Не вставлять целые HTML-документы в Gutenberg/Classic Editor.
- Не оставлять критичные изображения только на внешнем CDN TROX без локальной копии/резерва.
- Не создавать дубли вида `/trox-ms/`, `/trox-ms.html`, `?page=trox-ms` на основном домене.

## 8. Схема запуска

Этап A: staging GitHub → утверждение.
Этап B: перенос в WordPress на тестовый URL/noindex.
Этап C: техническая проверка.
Этап D: открытие индексации, sitemap, Search Console/Яндекс Вебмастер.
Этап E: мониторинг индексации и расширение SEO-кластеров.

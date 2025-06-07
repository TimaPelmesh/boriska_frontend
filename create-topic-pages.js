// Скрипт для создания страниц-заглушек для всех тем курса
const fs = require('fs');
const path = require('path');

// Темы HTML
const htmlTopics = [
    { file: 'html_multimedia.html', title: 'Мультимедиа и изображения в HTML' },
    { file: 'html_links.html', title: 'Гиперссылки в HTML' },
    { file: 'html_forms.html', title: 'Формы и элементы ввода' },
    { file: 'html_tables.html', title: 'Таблицы в HTML' },
    { file: 'html_semantic.html', title: 'Семантическая верстка HTML' },
    { file: 'html_meta_seo.html', title: 'Метатеги и SEO-основы' },
];

// Темы CSS
const cssTopics = [
    { file: 'css_properties.html', title: 'Свойства стилей CSS' },
    { file: 'css_box_model.html', title: 'Блочная модель CSS' },
    { file: 'css_positioning.html', title: 'Расположение элементов в CSS' },
    { file: 'css_flexbox.html', title: 'Flexbox' },
    { file: 'css_grid.html', title: 'Grid Layout' },
    { file: 'css_responsive.html', title: 'Адаптивный дизайн' },
    { file: 'css_animations.html', title: 'Анимация и переходы в CSS' },
    { file: 'css_methodology.html', title: 'CSS-методологии' },
];

// Темы JavaScript
const jsTopics = [
    { file: 'js_variables.html', title: 'Переменные и типы данных в JavaScript' },
    { file: 'js_conditionals.html', title: 'Условия и циклы в JavaScript' },
    { file: 'js_functions.html', title: 'Функции в JavaScript' },
    { file: 'js_arrays.html', title: 'Работа с массивами в JavaScript' },
    { file: 'js_objects.html', title: 'Работа с объектами в JavaScript' },
    { file: 'js_dom.html', title: 'DOM в JavaScript' },
    { file: 'js_events.html', title: 'События в JavaScript' },
    { file: 'js_forms.html', title: 'Формы и валидация в JavaScript' },
    { file: 'js_storage.html', title: 'LocalStorage и SessionStorage' },
    { file: 'js_async.html', title: 'Асинхронность в JavaScript' },
    { file: 'js_api.html', title: 'Работа с API в JavaScript' },
];

// Объединяем все темы
const allTopics = [...htmlTopics, ...cssTopics, ...jsTopics];

// Шаблон страницы-заглушки
function createTopicTemplate(title) {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" href="../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/topic.css">
    <style>
        .coming-soon {
            text-align: center;
            padding: 3rem 2rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            margin: 2rem 0;
            border: 2px dashed #6c757d;
        }
        
        .coming-soon h2 {
            color: #6c757d;
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .coming-soon p {
            color: #495057;
            font-size: 1.2rem;
        }
        
        .icon {
            font-size: 4rem;
            color: #6c757d;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="topic-container">
        <h1>${title}</h1>
        
        <div class="coming-soon">
            <div class="icon">🛠️</div>
            <h2>Тема в разработке</h2>
            <p>Материал по этой теме находится в процессе создания и скоро будет доступен.</p>
            <p>Пожалуйста, загляните позже или изучите другие разделы курса.</p>
        </div>
        
        <div class="section">
            <h2>Что будет в этой теме?</h2>
            <ul>
                <li>Подробное объяснение концепций</li>
                <li>Практические примеры</li>
                <li>Интерактивные упражнения</li>
                <li>Тесты для проверки знаний</li>
            </ul>
        </div>
        
        <div class="recommendations">
            <h2>Рекомендации</h2>
            <p>Пока эта тема находится в разработке, вы можете:</p>
            <ul>
                <li>Изучить предыдущие темы курса</li>
                <li>Проверить другие разделы</li>
                <li>Практиковаться с уже доступным материалом</li>
            </ul>
        </div>
    </div>
</body>
</html>`;
}

// Создаем директорию topics, если она еще не существует
const topicsDir = path.join(__dirname, 'topics');
if (!fs.existsSync(topicsDir)) {
    fs.mkdirSync(topicsDir);
}

// Создаем страницы-заглушки для всех тем
allTopics.forEach(topic => {
    const filePath = path.join(topicsDir, topic.file);
    
    // Проверяем, существует ли уже файл
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, createTopicTemplate(topic.title));
        console.log(`Создан файл: ${topic.file}`);
    } else {
        console.log(`Файл ${topic.file} уже существует, пропускаем.`);
    }
});

console.log('Все страницы-заглушки созданы успешно!'); 
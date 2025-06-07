// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Получаем все ссылки в боковом меню
    const topicLinks = document.querySelectorAll('#topics-list a');
    
    // Добавляем обработчик событий для каждой ссылки
    topicLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Удаляем активный класс у всех ссылок
            topicLinks.forEach(item => item.classList.remove('active'));
            
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
            
            // Обновляем заголовок в localStorage для сохранения текущей темы
            localStorage.setItem('currentTopic', this.getAttribute('href'));
            
            // На мобильных устройствах скрываем меню после выбора темы
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('open');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
        });
    });
    
    // Обработчики для переключения подменю
    const topicToggles = document.querySelectorAll('.topic-toggle');
    topicToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Переключаем класс open для текущего toggle
            this.classList.toggle('open');
            
            // Находим соседний submenu и переключаем его видимость
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('open');
            }
        });
    });
    
    // По умолчанию открываем первый блок тем
    if (topicToggles.length > 0) {
        topicToggles[0].classList.add('open');
        const firstSubmenu = topicToggles[0].nextElementSibling;
        if (firstSubmenu && firstSubmenu.classList.contains('submenu')) {
            firstSubmenu.classList.add('open');
        }
    }
    
    // Проверяем, есть ли сохраненная текущая тема
    const currentTopic = localStorage.getItem('currentTopic');
    if (currentTopic) {
        // Находим ссылку с этой темой
        const savedLink = document.querySelector(`#topics-list a[href="${currentTopic}"]`);
        if (savedLink) {
            // Имитируем клик по ссылке
            savedLink.click();
            
            // Раскрываем родительское подменю, если оно есть
            const parentSubmenu = savedLink.closest('.submenu');
            if (parentSubmenu) {
                parentSubmenu.classList.add('open');
                const parentToggle = parentSubmenu.previousElementSibling;
                if (parentToggle && parentToggle.classList.contains('topic-toggle')) {
                    parentToggle.classList.add('open');
                }
            }
        }
    } else {
        // Если нет сохраненной темы, открываем первую по умолчанию
        document.querySelector('#content-frame').src = 'topics/welcome.html';
    }
    
    // Обработчик для кнопки переключения меню
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике за его пределами (только на мобильных)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            const menuToggle = document.querySelector('.menu-toggle');
            if (sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                e.target !== menuToggle &&
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        }
    });
}); 
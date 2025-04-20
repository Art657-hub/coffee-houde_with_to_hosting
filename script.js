let currentLang = localStorage.getItem('language') || 'ru';

function updateContent(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Обновляем все элементы с атрибутом data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key];
    });

    // Обновляем кнопку переключения языка
    document.querySelector('.lang-switch').textContent = translations[lang]['langButton'];
}

document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const elements = document.querySelectorAll('[data-translate]');
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Получаем сохраненный язык из localStorage или используем русский по умолчанию
    let currentLanguage = localStorage.getItem('language') || 'ru';
    
    // Устанавливаем начальное состояние кнопки
    languageToggle.textContent = currentLanguage === 'ru' ? 'EN' : 'RU';
    
    // Применяем перевод при загрузке страницы
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Функция для закрытия меню
    function closeMenu() {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Обработчик клика по бургер-меню
    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Закрываем меню при клике на ссылку
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Закрываем меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Предотвращаем закрытие при клике внутри меню
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Закрываем меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('language', currentLanguage);
        
        languageToggle.textContent = currentLanguage === 'ru' ? 'EN' : 'RU';
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });
    });
}); 
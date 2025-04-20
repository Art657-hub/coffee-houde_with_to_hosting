// Объект для хранения переводов товаров меню
let menuTranslations = {
    en: {
        drinks: "DRINKS",
        desserts: "DESSERTS"
    },
    ru: {
        drinks: "НАПИТКИ",
        desserts: "ДЕСЕРТЫ"
    }
};

// Функция для загрузки переводов из базы данных
async function loadMenuTranslations() {
    try {
        const response = await fetch('get_menu_items.php');
        const data = await response.json();

        // Очищаем предыдущие переводы, кроме базовых
        menuTranslations.en = {
            drinks: "DRINKS",
            desserts: "DESSERTS"
        };
        menuTranslations.ru = {
            drinks: "НАПИТКИ",
            desserts: "ДЕСЕРТЫ"
        };

        // Обрабатываем напитки
        data.drinks.forEach(item => {
            const key = item.name.replace(/\s+/g, '');
            menuTranslations.en[key] = item.nameen;
            menuTranslations.ru[key] = item.nameru;
            menuTranslations.en[`${key}Desc`] = item.descriptionen;
            menuTranslations.ru[`${key}Desc`] = item.descriptionru;
        });

        // Обрабатываем десерты
        data.desserts.forEach(item => {
            const key = item.name.replace(/\s+/g, '');
            menuTranslations.en[key] = item.nameen;
            menuTranslations.ru[key] = item.nameru;
            menuTranslations.en[`${key}Desc`] = item.descriptionen;
            menuTranslations.ru[`${key}Desc`] = item.descriptionru;
        });

        // Обновляем переводы на странице
        updateMenuTranslations();
    } catch (error) {
        console.error('Ошибка при загрузке переводов меню:', error);
    }
}

// Функция для обновления переводов на странице
function updateMenuTranslations() {
    const currentLang = document.documentElement.lang;
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (menuTranslations[currentLang] && menuTranslations[currentLang][key]) {
            element.textContent = menuTranslations[currentLang][key];
        }
    });
}

// Функция для переключения языка меню
async function toggleMenuLanguage() {
    const currentLang = localStorage.getItem('language') || 'ru';
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;

    // Обновляем текст кнопки переключения языка
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.textContent = newLang === 'ru' ? 'EN' : 'RU';
    }

    // Перезагружаем меню с новым языком
    try {
        const response = await fetch('get_menu_items.php');
        const data = await response.json();

        // Обновляем контейнеры с напитками и десертами
        const drinksContainer = document.getElementById('drinks-container');
        const dessertsContainer = document.getElementById('desserts-container');

        // Функция для создания элемента меню с учетом языка
        const createMenuItem = (item) => {
            const key = item.name.replace(/\s+/g, '');
            return `
                <div class="menu-item">
                    <div class="menu-item-image">
                        <img src="${item.urlimg}" alt="${newLang === 'ru' ? item.nameru : item.name}">
                    </div>
                    <div class="menu-item-content">
                        <div class="menu-item-header">
                            <h3 data-translate="${key}">${newLang === 'ru' ? item.nameru : item.name}</h3>
                            <span class="price">${item.summ} ₽</span>
                        </div>
                        <p data-translate="${key}Desc">${newLang === 'ru' ? item.descriptionru : item.description}</p>
                    </div>
                </div>
            `;
        };

        drinksContainer.innerHTML = data.drinks.map(createMenuItem).join('');
        dessertsContainer.innerHTML = data.desserts.map(createMenuItem).join('');

        // Обновляем переводы
        loadMenuTranslations();
    } catch (error) {
        console.error('Ошибка при обновлении меню:', error);
    }
}

// Загружаем переводы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadMenuTranslations();

    // Добавляем обработчик для кнопки переключения языка
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleMenuLanguage);
    }
}); 
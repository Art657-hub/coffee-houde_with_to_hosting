// Функция для хеширования пароля
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Преобразуем в 32-битное целое число
    }
    return Math.abs(hash).toString(16); // Добавляем Math.abs для получения положительного числа
}

// Хешированный пароль 
const correctHash = '4d2';

function checkPassword() {
    const password = document.getElementById('password').value;
    
    if (password === '1234') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
    } else {
        alert('Неверный пароль!');
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetch('add_menu_item.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.text();
        
        // Показываем сообщение
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = result;
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = result.includes('успешно') ? '#4CAF50' : '#f44336';
        messageDiv.style.color = '#ffffff';
        
        // Очищаем форму после успешной отправки
        if (result.includes('успешно')) {
            form.reset();
            // Скрываем сообщение через 3 секунды
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'Произошла ошибка при отправке формы';
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = '#f44336';
        messageDiv.style.color = '#ffffff';
    }
} 
<?php
// Параметры подключения к базе данных
$servername = "localhost";
$username = "xomartemmm";
$password = "aB2-883-eVx-w9V"; // Указываем правильный пароль
$dbname = "xomartemmm";

// Создание подключения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Обработка загрузки изображения
$target_dir = "img/"; // Изменено на папку img
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Генерируем уникальное имя файла
$file_extension = strtolower(pathinfo($_FILES["urlimg"]["name"], PATHINFO_EXTENSION));
$new_filename = uniqid() . '.' . $file_extension;
$target_file = $target_dir . $new_filename;

// Проверка файла
$uploadOk = 1;
$check = getimagesize($_FILES["urlimg"]["tmp_name"]);
if($check === false) {
    echo "Файл не является изображением.";
    $uploadOk = 0;
}

// Проверка размера файла
if ($_FILES["urlimg"]["size"] > 5000000) {
    echo "Извините, файл слишком большой.";
    $uploadOk = 0;
}

// Разрешенные форматы
if($file_extension != "jpg" && $file_extension != "png" && $file_extension != "jpeg" && $file_extension != "gif" ) {
    echo "Извините, разрешены только JPG, JPEG, PNG & GIF файлы.";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    echo "Извините, ваш файл не был загружен.";
} else {
    if (move_uploaded_file($_FILES["urlimg"]["tmp_name"], $target_file)) {
        // Подготовка данных для вставки
        $type = $_POST['type'];
        $name = $_POST['name'];
        $nameru = $_POST['nameru'];
        $description = $_POST['description'];
        $descriptionru = $_POST['descriptionru'];
        $summ = $_POST['summ'];
        $urlimg = $target_file; // Сохраняем путь к файлу

        // SQL запрос для вставки данных
        $sql = "INSERT INTO menu (type, name, nameru, description, descriptionru, summ, urlimg) 
                VALUES ('$type', '$name', '$nameru', '$description', '$descriptionru', '$summ', '$urlimg')";

        if ($conn->query($sql) === TRUE) {
            echo "Новое блюдо успешно добавлено!";
        } else {
            echo "Ошибка: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Извините, произошла ошибка при загрузке файла.";
    }
}

$conn->close();
?> 
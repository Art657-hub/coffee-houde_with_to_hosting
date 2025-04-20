<?php
// Параметры подключения к базе данных
$servername = "localhost";
$username = "xomartemmm";
$password = "aB2-883-eVx-w9V";
$dbname = "xomartemmm";

// Создание подключения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получаем напитки (type = 0)
$drinks_sql = "SELECT * FROM menu WHERE type = 0";
$drinks_result = $conn->query($drinks_sql);

// Получаем десерты (type = 1)
$desserts_sql = "SELECT * FROM menu WHERE type = 1";
$desserts_result = $conn->query($desserts_sql);

$menu_items = array(
    'drinks' => array(),
    'desserts' => array()
);

// Собираем напитки
if ($drinks_result->num_rows > 0) {
    while($row = $drinks_result->fetch_assoc()) {
        $menu_items['drinks'][] = $row;
    }
}

// Собираем десерты
if ($desserts_result->num_rows > 0) {
    while($row = $desserts_result->fetch_assoc()) {
        $menu_items['desserts'][] = $row;
    }
}

$conn->close();

// Возвращаем данные в формате JSON
header('Content-Type: application/json');
echo json_encode($menu_items);
?> 
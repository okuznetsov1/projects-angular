<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

$path = '../../';
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

//Подключаем класс с настройками для проекта
require_once 'lib-bookmarks/settings.php';
//Подключаем классы для работы с базой данных
require_once 'lib-bookmarks/database.php';
require_once 'lib-bookmarks/queries.php';


$response = array();

//Получаем все данные по всем делам в системе
$Obj = new Query();
$arrayData = $Obj->getAllData();


foreach ($arrayData as $value) {

    $response[] = array(
        'id' => $value['id'],
        'url' => $value['url'],
        'description' => $value['description'],
        'completed' => $value['completed']
    );

}

echo json_encode($response);

?>

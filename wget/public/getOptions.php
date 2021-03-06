<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

$path = '../../';
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

//Подключаем класс с настройками для проекта
require_once 'lib-wget/settings.php';
//Подключаем классы для работы с базой данных
require_once 'lib-wget/database.php';
require_once 'lib-wget/queries.php';


$response = array();

//Получаем все данные по всем делам в системе
$Obj = new Query();
$arrayData = $Obj->getAllOptions();



foreach ($arrayData as $value) {

    $response[] = array(
        'id' => $value['id'],
        'id_sections' => $value['id_sections'],
        'name' => $value['name'],
        'name_full' => $value['name_full'],
        'description' => $value['description'],
        'status' => $value['status']
    );

}

echo json_encode($response);

?>

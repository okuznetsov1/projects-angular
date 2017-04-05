<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

//Подключаем класс с настройками для проекта
require_once '../../../lib/settings.php';
//Подключаем классы для работы с базой данных
require_once '../../../lib/database.php';
require_once '../../../lib/queries.php';


$response = array();

$Obj = new Query();
$arrayData = $Obj->getAllStatuses();

foreach ($arrayData as $value) {
    $response[] = array(
        'id' => $value['id'],
        'name' => $value['status_name']
    );
}

echo json_encode($response);

?>

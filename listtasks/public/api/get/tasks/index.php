<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

//Подключаем класс с настройками для проекта
require_once '../../../lib/settings.php';
//Подключаем классы для работы с базой данных
require_once '../../../lib/database.php';
require_once '../../../lib/queries.php';
require_once 'getTasks.class.php';


$response = array();

$getTasks = new getTasks();

//Получаем все данные по всем задачам в системе
$Obj = new Query();
$arrayData = $Obj->getAllData();

foreach ($arrayData as $value) {

    $response[] = array(
        'uuid' => $value['id'],
        'task_name' => htmlspecialchars_decode($value['task_name'],ENT_QUOTES),
        'priority_id' => htmlspecialchars_decode($value['priority_id'],ENT_QUOTES),
        'priority_name' => htmlspecialchars_decode($value['priority_name'],ENT_QUOTES),
        'status_id' => htmlspecialchars_decode($value['status_id'],ENT_QUOTES),
        'status_name' => htmlspecialchars_decode($value['status_name'],ENT_QUOTES),
        'tags_id' => $getTasks->getTags($value['id']),
        'tags_name' => ''
        //'tags' => array(
                    //array('tag_id'=>'111-1', 'tag_name'=>'tag1'),
                    //array('tag_id'=>'112-2', 'tag_name'=>'tag2'),
                    //array('tag_id'=>'113-3', 'tag_name'=>'tag3'),
                    //array('tag_id'=>'114-4', 'tag_name'=>'tag4'),
        //)
    );

}

echo json_encode($response);    

?>

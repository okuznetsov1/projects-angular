<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

//Подключаем класс с настройками для проекта
require_once '../../../lib/settings.php';
//Подключаем классы для работы с базой данных
require_once '../../../lib/database.php';
require_once '../../../lib/queries.php';
require_once 'editTask.class.php';


$data = json_decode(file_get_contents("php://input"));

$response = array();
$arrayTagsId = array();
$dataTags = array();

$task_id = $data->id;
$task_name = htmlspecialchars(stripslashes($data->task_name),ENT_QUOTES);
$priority_id = htmlspecialchars(stripslashes($data->priority_id),ENT_QUOTES);
$tags_id = $data->tags_id;
$status_id = htmlspecialchars(stripslashes($data->status_id),ENT_QUOTES);

//$task_id = '18cf6603-b819-4a99-ab43-ac30aa5401cd';
//$task_name = 'Тестовая задача №333';
//$priority_id = 'c1a0bbef-d9f7-4c59-b989-b64016d2f72e';
//$tags_id = array();
//$tags_id[0]['id'] = '44b81c7b-e223-4559-be69-1c5796abee78';
//$tags_id[0]['name'] = 'Тег 1';
//$tags_id[1]['id'] = '9abaf87d-b7f1-42c2-bbb6-fa41b092591a';
//$tags_id[1]['name'] = 'Тег 2';
////$tags_id[0]['id'] = 'd523f1f9-da60-410b-a932-018c08a45b07';
////$tags_id[0]['name'] = 'Тег 3';
////$tags_id[1]['id'] = '34b81c7b-e223-4559-be69-1c5796abee79';
////$tags_id[1]['name'] = 'Тег 4';
////$tags_id[2]['id'] = 's523f1f9-da60-410b-a932-018c08a45b03';
////$tags_id[2]['name'] = 'Тег 5';
//$status_id = 'ec1ba83d-ff70-4c1e-82e1-04713e50af88';

if( !empty($task_id) && !empty($task_name) && !empty($priority_id) && count($tags_id)>0 && !empty($status_id) ){

    $editTask = new editTask();

    //Получаем все теги по определенной задаче до их редактирования
    $Obj = new Query();
    $dataTags = $Obj->getAllTagsForTask($task_id);

    //Редактируем все данные по задаче (кроме тегов)
    $Obj = new Query();
    $task_id = $Obj->editDataTask($task_id, $task_name, $priority_id, $status_id);

    if($task_id){

        //Удаляем из таблицы теги которых больше нет у задачи с определенным ID
        $editTask->deleteTagsForTask($dataTags, $tags_id, $task_id);

        //Добавляем в таблицу новые теги для определенной задачи
        $arrayTagsId = $editTask->addTagsForTask($dataTags, $tags_id, $task_id);    

    }

    //Если условие выполняется, то значит данные успешно записались в таблицу
    if($task_id != 0 && $task_id != null && !empty($task_id) ){
            $response[] = array(
                'id' => $task_id,
                'status' => 'ok'            
            );
    }
    else{
            $response[] = array(
                'id' => $task_id,
                'status' => 'error'            
            );    
    }

}
else{
    $response[] = array(
        'id' => $task_id,
        'status' => 'error'
    );
}

echo json_encode($response);

?>
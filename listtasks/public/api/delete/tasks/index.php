<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

//Подключаем класс с настройками для проекта
require_once '../../../lib/settings.php';
//Подключаем классы для работы с базой данных
require_once '../../../lib/database.php';
require_once '../../../lib/queries.php';

$arrayTasksId = array();
$response = array();

$data = json_decode(file_get_contents("php://input"));

$arrayTasksId = $data->arrayTasksId;
//$arrayTasksId[0] = '54fbf943-9b20-48c1-af8d-f8b263728ec7';
//$arrayTasksId[1] = '24fd4f2b-0b5e-439d-a8a4-c55e02b38397';


//Если условие выполняется, то значит данные успешно записались в таблицу
if( count($arrayTasksId) > 0 ){

        foreach($arrayTasksId as $taskId) {

            //Получаем все теги по определенной задаче
            $Obj = new Query();
            $dataTags = $Obj->getAllTagsForTask($taskId);

            if( count($dataTags) > 0 ){
                //Удаляем из таблицы все теги у удаляемой задачи
                $Obj = new Query();
                $Obj->deleteAllTagsForTask($taskId);
            }

            //Удаляем из таблицы задачу с определенным id
            $Obj = new Query();
            $taskId = $Obj->deleteTask($taskId);

            if( $taskId !== 0 && $taskId !== null && !empty($taskId) ){
                $response[] = array(
                    'id' => $taskId,
                    'status' => 'ok'            
                );
            }
            else{
                    $response[] = array(
                        'id' => $taskId,
                        'status' => 'error'            
                    );    
            }
        }

}
else{
        $response[] = array(
            'id' => null,
            'status' => 'empty'            
        );    
}

echo json_encode($response);

?>
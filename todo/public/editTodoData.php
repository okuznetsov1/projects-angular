<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

$path = '../../';
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

//Подключаем класс с настройками для проекта
require_once 'lib-todo/settings.php';
//Подключаем классы для работы с базой данных
require_once 'lib-todo/database.php';
require_once 'lib-todo/queries.php';


$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$description = $data->description;

//$id = $_REQUEST['id'];
//$description= $_REQUEST['description'];
$response = array();

//Получаем все данные по всем делам в системе
$ObjTodo = new Query();
$idTodoData = $ObjTodo->editTodoData($id, $description);

//Если условие выполняется, то значит данные успешно записались в таблицу
if($idTodoData != 0 && $idTodoData != null ){
        $response[] = array(
            'id' => $idTodoData,
            'edit' => 'OK'            
        );
}
else{
        $response[] = array(
            'id' => $idTodoData,
            'edit' => 'NO'            
        );    
}

echo json_encode($response);

?>

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


$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$command = $data->command;
$description = $data->description;
//$id = $_REQUEST['id'];
//$description= $_REQUEST['description'];
$response = array();

//Получаем все данные по всем делам в системе
$Obj = new Query();

if(!empty($command)){
    $id = $Obj->editDataLastName($id, $command);
}
elseif(!empty($description)){
    $id = $Obj->editDataDescription($id, $description);    
}

//Если условие выполняется, то значит данные успешно записались в таблицу
if($id != 0 && $id != null && !empty($id) ){
        $response[] = array(
            'id' => $id,
            'edit' => 'OK'            
        );
}
else{
        $response[] = array(
            'id' => $id,
            'edit' => 'NO'            
        );    
}

echo json_encode($response);

?>

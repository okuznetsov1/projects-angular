<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

$path = '../../';
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

//Подключаем класс с настройками для проекта
require_once 'lib-tcpdump/settings.php';
//Подключаем классы для работы с базой данных
require_once 'lib-tcpdump/database.php';
require_once 'lib-tcpdump/queries.php';


$data = json_decode(file_get_contents("php://input"));

$genCommand = $data->genCommand;
$description = $data->description;
$response = array();

//Получаем все данные по всем контактам в системе
$Obj = new Query();
$id = $Obj->addData($genCommand, $description, $completed="false");

//Если условие выполняется, то значит данные успешно записались в таблицу
if($id != 0 && $id != null && !empty($id) ){
    
        $response[] = array(
            'id' => $id,
            'command' => $genCommand,
            'description' => $description,
            'completed' => $completed
        );

}

echo json_encode($response);

?>

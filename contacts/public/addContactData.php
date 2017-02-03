<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

$path = '../../';
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

//Подключаем класс с настройками для проекта
require_once 'lib-contacts/settings.php';
//Подключаем классы для работы с базой данных
require_once 'lib-contacts/database.php';
require_once 'lib-contacts/queries.php';


$data = json_decode(file_get_contents("php://input"));

$last_name = $data->last_name;
$name = $data->name;
$patronymic_name = $data->patronymic_name;
$address = $data->address;
$telephone = $data->telephone;                
$url = $data->url;
$description = $data->description;
$completed = $data->completed;
$response = array();

//$last_name = $_REQUEST['last_name'];
//$name = $_REQUEST['name'];
//$patronymic_name = $_REQUEST['patronymic_name'];
//$address = $_REQUEST['address'];
//$telephone = $_REQUEST['telephone'];                
//$url = $_REQUEST['url'];
//$description = $_REQUEST['description'];
//$completed = $_REQUEST['completed'];
//$response = array();

//Получаем все данные по всем контактам в системе
$Obj = new Query();
$id = $Obj->addData($last_name, $name, $patronymic_name, $address, $telephone, $url, $description, $completed);

//Если условие выполняется, то значит данные успешно записались в таблицу
if($id != 0 && $id != null && !empty($id) ){
    
        $response[] = array(
            'id' => $id,
            'last_name' => $last_name,
            'name' => $name,
            'patronymic_name' => $patronymic_name,
            'address' => $address,
            'telephone' => $telephone,
            'url' => $url,
            'description' => $description,
            'completed' => $completed
        );

}

echo json_encode($response);

?>

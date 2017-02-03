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

$numberAttemptSaveFile = $data->numberAttemptSaveFile;
$pathSaveFile = $data->pathSaveFile;
$url = $data->url;
$parametrs = $data->parametrs;
$description = $data->description;
$completed = $data->completed;
$response = array();
$command = '';

//$url = $_REQUEST['url'];
//$description = $_REQUEST['description'];
//$completed = $_REQUEST['completed'];
//$response = array();

$param = '';
foreach ($parametrs as $key => $value) {
    
    if($parametrs[$key]->name === '-V'){
        $param .= $parametrs[$key]->name.' ';
    }
    elseif($parametrs[$key]->name === '-h'){
        $param .= $parametrs[$key]->name.' ';
    }
    elseif($parametrs[$key]->name === '-b'){
        $param .= $parametrs[$key]->name.' ';
    }
    elseif($parametrs[$key]->name === '-t'){
        $param .= $parametrs[$key]->name . ' ' . $numberAttemptSaveFile . ' ';
    }
    elseif($parametrs[$key]->name === '-o' || $parametrs[$key]->name === '-a' ){
        $param .= $parametrs[$key]->name . ' ' . $pathSaveFile . ' ';
    }
    elseif($parametrs[$key]->name === '-c'){
        $param .= $parametrs[$key]->name.' ';
    }
    elseif($parametrs[$key]->name === '-N'){
        $param .= $parametrs[$key]->name.' ';
    }
    
}

$command = 'wget ' . $param . '' .$url;

//Получаем все данные по всем контактам в системе
$Obj = new Query();
$id = $Obj->addData($command, $description, $completed);

//Если условие выполняется, то значит данные успешно записались в таблицу
if($id != 0 && $id != null && !empty($id) ){
    
        $response[] = array(
            'id' => $id,
            'command' => $command,
            'description' => $description,
            'completed' => $completed
        );

}

echo json_encode($response);

?>

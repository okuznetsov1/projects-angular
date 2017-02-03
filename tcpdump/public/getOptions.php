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


$response = array();

//Получаем все данные по всем делам в системе
$Obj = new Query();
$arrayData = $Obj->getAllOptions(1);



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



//$response = array();
//
////Получаем все данные 
//$Obj = new Query();
//$arraySections = $Obj->getAllSections();
//
//foreach ($arraySections as $section) {
//
//    //Получаем все данные 
//    $Obj = new Query();
//    $arrayOptions = $Obj->getAllOptions($section['id']);
//
////    echo '<pre>';
////    print_r($arraySections);
////    echo '</pre>';
//    $a = array();
//    
//    foreach ($arrayOptions as $option) {
//
//        $a[] = array(
//            'id' => $option['id'],
//            'id_sections' => $option['id_sections'],
//            'name' => $option['name'],
//            'name_full' => $option['name_full'],
//            'description' => $option['description'],
//            'status' => $option['status']
//        );
////        array('sdsd'=>$response);
//
//    }
//    
//    $response[] = array($section['name_section'] => $a);
//    
//    unset($a);
//}
//
////    echo '<pre>';
////    print_r($response);
////    echo '</pre>';
//
//
//    
//echo json_encode($response);

?>

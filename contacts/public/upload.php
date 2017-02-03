<?php
//Подключаем класс с настройками для проекта
require_once 'settings.php';

$settings = new Settings(); 
$pathToFileImport = $settings->pathToFileImport;
        
$answer = [];

if ( !empty( $_FILES ) ) {
    
    // переместим файлы из временной директории в указанную
    foreach ($_FILES as $file) {

        $file_name = $file['name'];
        $tmp_name = $file['tmp_name'];
        $uploadPath = $pathToFileImport;

        if (move_uploaded_file($tmp_name, $uploadPath)) {                 

            $answer[] = array( 'answer' => 'File transfer completed ' . $file_name . ' from ' . $tmp_name);

        } else {

            $answer[] = array( 'answer' => 'No files');

        }

    }   

    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files2';

}
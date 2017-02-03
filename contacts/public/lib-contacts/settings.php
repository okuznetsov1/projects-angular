<?php

/**
*Настройки для проекта
*/
class Settings{

    //Доступ к базе данных
    public $host = "localhost";
    public $username = "userangulertasks";
    public $password = "12345";
    public $database = "anguler_tasks";

    //Путь к хранению файла для операции импорта в формате .csv
    public $pathToFileImport = '/var/www/sitegirlsgames/data/www/girlswantgames.com/anguler-tasks-contacts/files/import.csv';
}

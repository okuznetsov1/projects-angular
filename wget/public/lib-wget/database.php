<?php

//Подключаем класс с настройками для проекта
require_once 'settings.php';

/**
*Класс для подключения и работы с базой данных через PDO
*/
class Database{
    private $_connection;
    private static $_instance; //The single instance

    private $_host;
    private $_username;
    private $_password;
    private $_database;
    
    /*
    Get an instance of the Database
    @return Instance
    */
    public static function getInstance(){
        if (!self::$_instance) { // If no instance then make one
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct(){
        
        $settings = new Settings(); 
        $this->_host = $settings->host;
        $this->_username = $settings->username;
        $this->_password = $settings->password;
        $this->_database = $settings->database;
        
        try {
            $this->_connection  = new PDO("mysql:host=$this->_host;dbname=$this->_database;charset=utf8", $this->_username, $this->_password);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
 
    function __destruct() {
        $this->_connection = NULL;
    }
     
    // Magic method clone is empty to prevent duplication of connection
    private function __clone(){
    }
    
    // Get mysql pdo connection
    public function getConnection(){
        return $this->_connection;
    }
}

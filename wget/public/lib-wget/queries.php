<?php

/**
 * Содержит все SQL-запросы для работы с базой данных проекта
 */
class Query {
    private $_dbh = NULL;
     
    public function __construct(){
        $db = Database::getInstance();
        $this->_dbh = $db->getConnection();
    }
    
    /**
     * Получает все данные имеющиеся в таблице
     * @return array данные о делах
     */
    public function getAllData(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM wget WHERE completed=\"false\"";

        try {
            $arr = $this->_dbh->query($sql);
            

            foreach ($arr as $row) {
                $a[]= $row;
            }   
            /*** close the database connection ***/
            $this->_dbh = null;

        } 
        catch (PDOException $e) {
            echo $e->getMessage();
        }

        return $a;
    }    
    
    /**
     * Получает все данные по всем опциям имеющимся в таблице
     * @return array данные о делах
     */
    public function getAllOptions(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM wget_options WHERE status=\"false\" ORDER BY id ASC";

        try {
            $arr = $this->_dbh->query($sql);
            

            foreach ($arr as $row) {
                $a[]= $row;
            }   
            /*** close the database connection ***/
            $this->_dbh = null;

        } 
        catch (PDOException $e) {
            echo $e->getMessage();
        }

        return $a;
    }    
    
    /**
     * Добавляет в систему новую запись
     * @param string $description текстовое описание дела
     * @param string $completed статус выполнения или не выполнения дела
     * @return int уникальный идентификатор дела в системе
     */
    public function addData($command, $description, $completed){
        $row = '';
        $arr = array();
	$lid = 0;
        $sql = "INSERT INTO wget VALUES('',\"$command\", \"$description\",\"$completed\")";

        try {
            $arr = $this->_dbh->query($sql);
            $lid = $this->_dbh->query("SELECT LAST_INSERT_ID() as lid");
            foreach ($lid as $row) {
            }   

            /*** close the database connection ***/
            $this->_dbh = null;
        } 
        catch (PDOException $e) {
            echo $e->getMessage();
        }
	return $row[0];
    }
    
    /**
     * Удаляет соответствующую условию запись из таблицы
     * @param int $id Уникальный идентификатор команды
     */

    public function deleteData($id){
        
        $arr = array();

        $sql = "DELETE FROM wget WHERE id=" . $id;

        try {
            $arr = $this->_dbh->query($sql);
            
            //close the database connection
            $this->_dbh = null;
            
            return $id;
        } 
        catch (PDOException $e) {
            return 0; 
            //$e->getMessage();
        }
    }
    
    /**
     * Редактируем соответствующую условию запись
     * @param int $id Уникальный идентификатор дела
     */

    public function editDataDescription($id,$description){
        
       $arr = array();

       $sql = 'UPDATE wget SET description = "' . $description . '" WHERE id=' . $id;

        try {
            $arr = $this->_dbh->query($sql);
            
            //close the database connection
            $this->_dbh = null;
            
            return $id;
        } 
        catch (PDOException $e) {
            return 0; 
            //$e->getMessage();
        }
    }
    
    public function editDataLastName($id,$command){
        
       $arr = array();

       $sql = 'UPDATE wget SET command = "' . $command . '" WHERE id=' . $id;

        try {
            $arr = $this->_dbh->query($sql);
            
            //close the database connection
            $this->_dbh = null;
            
            return $id;
        } 
        catch (PDOException $e) {
            return 0; 
            //$e->getMessage();
        }
    }

}
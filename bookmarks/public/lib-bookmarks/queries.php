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
     * Получает все данные 
     * @return array данные 
     */
    public function getAllData(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM bookmarks_library WHERE completed=\"false\" ORDER BY id ASC";

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
     * @param string $description текстовое описание 
     * @param string $completed статус активного или не активного состояния
     * @return int уникальный идентификатор дела в системе
     */
    public function addData($url, $description, $completed){
        $row = '';
        $arr = array();
	$lid = 0;
        
        $sql = "INSERT INTO bookmarks_library VALUES('',\"$url\",\"$description\",\"$completed\")";

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
     * Удаляет соответствующую условию запись
     * @param int $id Уникальный идентификатор
     */

    public function deleteData($id){
        
        $arr = array();

        $sql = "DELETE FROM bookmarks_library WHERE id=" . $id;

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
     * @param int $id Уникальный идентификатор 
     */

    public function editDataDescription($id,$description){
        
       $arr = array();

       $sql = 'UPDATE bookmarks_library SET description = "' . $description . '" WHERE id=' . $id;

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
     * @param int $id Уникальный идентификатор
     */

    public function editDataUrl($id,$url){
        
       $arr = array();

       $sql = 'UPDATE bookmarks_library SET url = "' . $url . '" WHERE id=' . $id;

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
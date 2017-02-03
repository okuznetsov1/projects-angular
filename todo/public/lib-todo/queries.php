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
     * Получает все данные по всем делам имеющимся в таблице
     * @return array данные о делах
     */
    public function getAllTodoData(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM todo_list ORDER BY id ASC";

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
     * Добавляет в систему новое дело
     * @param string $description текстовое описание дела
     * @param string $completed статус выполнения или не выполнения дела
     * @return int уникальный идентификатор дела в системе
     */
    public function addTodoData($description,$completed){
        $row = '';
        $arr = array();
	$lid = 0;
        
        $sql = "INSERT INTO todo_list VALUES('',\"$description\",\"$completed\")";

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
     * @param int $id Уникальный идентификатор дела
     */

    public function deleteTodoData($id){
        
        $arr = array();

        $sql = "DELETE FROM todo_list WHERE id=" . $id;

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
     * Редактируем соответствующую условию запись из таблицы
     * @param int $id Уникальный идентификатор дела
     */

    public function editTodoData($id,$description){
        
       $arr = array();

       $sql = 'UPDATE todo_list SET description = "' . $description . '" WHERE id=' . $id;

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
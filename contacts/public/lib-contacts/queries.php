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
     * @return array данные обо всех контактах
     */
    public function getAllData(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM contacts_list WHERE completed=\"false\" ORDER BY id ASC";

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
     * Добавляет в систему новые данные
     * @param type $last_name
     * @param type $name
     * @param type $patronymic_name
     * @param type $address
     * @param type $telephone
     * @param type $url
     * @param string $description текстовое описание дела
     * @param string $completed статус контакта (активирован или нет)
     * @return int
     */
    public function addData($last_name, $name, $patronymic_name, $address, $telephone, $url, $description, $completed){
        $row = '';
        $arr = array();
	$lid = 0;
        $sql = "INSERT INTO contacts_list VALUES('',\"$last_name\", \"$name\", \"$patronymic_name\", \"$address\", \"$telephone\",\"$url\",\"$description\",\"$completed\")";

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
     * @param int $id Уникальный идентификатор дела
     */

    public function deleteData($id){
        
        $arr = array();

        $sql = "DELETE FROM contacts_list WHERE id=" . $id;

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

       $sql = 'UPDATE contacts_list SET description = "' . $description . '" WHERE id=' . $id;

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

    public function editDataUrl($id,$url){
        
       $arr = array();

       $sql = 'UPDATE contacts_list SET url = "' . $url . '" WHERE id=' . $id;

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
    
    public function editDataTelephone($id,$telephone){
        
       $arr = array();

       $sql = 'UPDATE contacts_list SET telephone = "' . $telephone . '" WHERE id=' . $id;

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
    
    public function editDataAddress($id,$address){
        
       $arr = array();

       $sql = 'UPDATE contacts_list SET address = "' . $address . '" WHERE id=' . $id;

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
    
    public function editDataPatronymicName($id,$patronymic_name){
        
       $arr = array();

       $sql = 'UPDATE contacts_list SET patronymic_name = "' . $patronymic_name . '" WHERE id=' . $id;

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
    
    public function editDataName($id,$name){
        
       $arr = array();

       $sql = 'UPDATE contacts_list SET name = "' . $name . '" WHERE id=' . $id;

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
    
    public function editDataLastName($id,$last_name){
        
       $arr = array();

       $sql = 'UPDATE contacts_list SET last_name = "' . $last_name . '" WHERE id=' . $id;

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
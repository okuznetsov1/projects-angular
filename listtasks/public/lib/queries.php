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
     * Получает все данные из таблицы
     * @return array все данные 
     */
    public function getAllData(){

        $arr = array();
        $a = array();
        
        $sql = 'SELECT
                    listtasks.id,
                    listtasks.task_name,
                    listtasks_priority.id as priority_id,
                    listtasks_priority.priority_name,
                    listtasks_status.id as status_id,
                    listtasks_status.status_name
                FROM
                    listtasks
                JOIN 
                    listtasks_priority ON listtasks.priority_id = listtasks_priority.id
                JOIN 
                    listtasks_status ON listtasks.status_id = listtasks_status.id
                WHERE
                    listtasks.completed = \'false\'
                ORDER BY
                    listtasks_status.status_name ASC,
                    listtasks_priority.priority_name ASC,
                    listtasks.task_name ASC';

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
     * Получает все теги по ID определенной задачи
     * @return array все данные 
     */
    public function getAllDataTags($id){

        $arr = array();
        $a = array();
        
        $sql = 'SELECT
                    listtasks_tags.listtasks_id,
                    listtasks_tags.id,
                    listtasks_tags_name.tag_name
                FROM
                    listtasks
                JOIN
                    listtasks_tags ON listtasks_tags.listtasks_id = listtasks.id
                JOIN 
                    listtasks_tags_name ON listtasks_tags_name.id = listtasks_tags.id
                WHERE
                    listtasks_tags.listtasks_id = "'.$id.'"';

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
     * Получает все данные по всем приоритетмам имеющимся в таблице
     * @return array данные о делах
     */
    public function getAllOptions(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM listtasks_priority ORDER BY priority_name ASC";

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
     * Получает все данные по всем тегам
     * @return array данные о делах
     */
    public function getAllTags(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT 
                    listtasks_tags_name.id,
                    listtasks_tags_name.tag_name
                FROM
                    listtasks_tags_name
                ORDER BY
                    listtasks_tags_name.tag_name ASC
                ";

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
     * Получает все данные по всем статусам имеющимся в таблице
     * @return array данные о делах
     */
    public function getAllStatuses(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM listtasks_status ORDER BY status_name ASC";

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
    public function getAllSections(){

        $arr = array();
        $a = array();
        
        $sql = "SELECT * FROM tcpdump_sections ORDER BY id ASC";

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
     * Добавляет в систему новую задачу
     * @return int уникальный идентификатор добавленной задачи в системе
     */
    public function addTask($task_id, $task_name, $priority_id, $status_id){

        $arr = array();
	$lid = 0;
        
        $sql = "INSERT INTO listtasks VALUES(\"$task_id\",\"$task_name\",\"$priority_id\",\"$status_id\",\"false\")";

        try {
            $arr = $this->_dbh->query($sql);
            $lid = $task_id;  

            /*** close the database connection ***/
            $this->_dbh = null;
        } 
        catch (PDOException $e) {
            echo $e->getMessage();
        }
	return $lid;
    }
    
    /**
     * Удаляет соответствующую условию запись 
     * @param int $id Уникальный идентификатор
     */

    public function deleteData($id){
        
        $arr = array();

        $sql = "DELETE FROM tcpdump WHERE id=" . $id;

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

       $sql = 'UPDATE tcpdump SET description = "' . $description . '" WHERE id=' . $id;

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

    public function editDataTask($id, $task_name, $priority_id, $status_id){
        
       $arr = array();

       $sql = 'UPDATE 
                    listtasks 
               SET 
                    task_name = "' . $task_name . '",
                    priority_id = "' . $priority_id . '",
                    status_id = "' . $status_id . '",
                    completed = "false"
               WHERE 
                    id="' . $id . '"';

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
     * Удаляет теги которых уже нет у задачи 
     * @param int $id Уникальный идентификатор
     */

    public function deleteTagsForTask($tag_id, $task_id){
        
        $arr = array();

        $sql = "DELETE FROM listtasks_tags WHERE id='" . $tag_id . "' AND listtasks_id='" . $task_id ."'";

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
     * Прикрепляем к задаче новый тег
     * @return int уникальный идентификатор тега
     */
    public function addTagsForTask($tag_id, $task_id){
        $row = '';
        $arr = array();
	$lid = 0;
        $sql = "INSERT INTO listtasks_tags VALUES(\"$tag_id\", \"$task_id\")";

        try {
            $arr = $this->_dbh->query($sql);
            $lid = $tag_id;

            /*** close the database connection ***/
            $this->_dbh = null;
        } 
        catch (PDOException $e) {
            echo $e->getMessage();
        }
	return $lid;
    }
    
    /**
     * Получает все теги по определенной задаче
     * @return array данные о делах
     */
    public function getAllTagsForTask($task_id){

        $a = array();
        $arr = array();
        
        $sql = 'SELECT
                    listtasks_tags.id,
                    listtasks_tags_name.tag_name
                FROM
                    listtasks
                JOIN 
                    listtasks_tags ON listtasks_tags.listtasks_id = listtasks.id
                JOIN 
                    listtasks_tags_name ON listtasks_tags_name.id = listtasks_tags.id
                WHERE
                    listtasks_tags.listtasks_id = "' . $task_id . '"';

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
    
//     /**
//     * Добавляет в систему теги для задачи
//     * @return int уникальный идентификатор тега
//     */
//    public function editDataTagsForTask($task_id, $tag_id){
//
//       $arr = array();
//
//       $sql = 'UPDATE 
//                    listtasks_tags 
//               SET 
//                    listtasks_id = "' . $task_id . '"
//               WHERE 
//                    id="' . $tag_id . '" AND listtasks_id="' . $task_id . '"';
//
//        try {
//            $arr = $this->_dbh->query($sql);
//            
//            //close the database connection
//            $this->_dbh = null;
//            
//            return $tag_id;
//        }
//        catch (PDOException $e) {
//            return 0; 
//            //$e->getMessage();
//        }
//        
//    }
    
}
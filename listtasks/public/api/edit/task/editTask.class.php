<?php

class editTask{
    
    public $response;
    
    public function __construct() {
        $this->response = array();
    }

    public function deleteTagsForTask($dataTags, $tags_id, $task_id){

        foreach($dataTags as $elementTable) {
            $run = 1;
            foreach($tags_id as $key => $elementUrl) {
                //$response[] = $tags_id[$key]->id;
                if($elementTable['id'] === $tags_id[$key]->id){
                //if($elementTable['id'] === $elementUrl['id']){
                   $run = 0;
                   break; 
                }
            }
            if($run){
                //echo 'Удаляем из таблицы тег которого больше нет у задачи id = ' . $elementTable['id'] . '<br>';
                $Obj = new Query();
                $id = $Obj->deleteTagsForTask($elementTable['id'], $task_id);
            }
        }

        return $response;
    }

    public function addTagsForTask($dataTags, $tags_id, $task_id){

        $tags = array();

        foreach($tags_id as $key => $elementUrl) {

            $run = 1;
            if(count($dataTags) > 0){
                foreach($dataTags as $elementTable) {
                    //if($elementTable['id'] === $tags_id[$key]['id']){
                    if($elementTable['id'] === $tags_id[$key]->id){
                       $run = 0;
                       break; 
                    }
                }
            }
            if($run){
                //Добавляем в таблицу новый тег id для определенной задачи
                $Obj = new Query();
                //$id = $Obj->addTagsForTask($tags_id[$key]['id'], $task_id);
                $id = $Obj->addTagsForTask($tags_id[$key]->id, $task_id);
                $tags[] = array('id'=>$id);
            }

        }

        return $tags;
    }


}
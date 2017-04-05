<?php

class getTasks{
    
    public $response;
    
    public function __construct() {
        $this->response = array();
    }

    public function getTags($taskId){

        $arrayTags = array();

        $Obj = new Query();
        $arrayData = $Obj->getAllDataTags($taskId);

        foreach ($arrayData as $value) {
            $arrayTags[] = array(
                'tag_id'=>$value['id'], 
                'tag_name'=>$value['tag_name']
            );
        }

        return $arrayTags; 
    }

}
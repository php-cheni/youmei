<?php
namespace app\youmei\controller;

class Error extends Common{
    public function index(){
        return $this->fetch('Index/error');
    }
}
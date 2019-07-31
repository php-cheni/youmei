<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class Responsibility extends Common{
    public function index(){
        $single=Db::name('single')->where('category',4)->column('id,title');
        $content=Db::name('single')->where('category',4)->find(input('id'));
        $this->assign([
            'single'=>$single,
            'content'=>$content,
            ]);
        return $this->fetch();
    }
}


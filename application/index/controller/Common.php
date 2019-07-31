<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class Common extends Controller{
    public function _initialize(){
    	$nav=Db::name('nav')->where(['show'=>1])->order('sort asc,id desc')->select();
    	$link=Db::name('link')->where(['show'=>1])->order('sort asc,id desc')->select();
    	$config=Db::name('config')->column('variable,value');
    	$this->assign([
    		'nav'=>$nav,
    		'link'=>$link,
    		'config'=>$config,
		]);
    }

    public function _empty(){
        return $this->fetch('Index/error');
    }
}

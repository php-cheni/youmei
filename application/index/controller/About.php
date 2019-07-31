<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class About extends Common{
    public function index(){
    	$id=input('id')?input('id'):Db::name('single')->where(['category'=>2])->value('en_title');
        $single=Db::name('single')->where('category',2)->column('en_title,title');
        $content=Db::name('single')->where(['category'=>2,'en_title'=>$id])->find();
        $tdk=Db::name('nav')->where('url','news')->find();
    	$this->assign([
            'single'=>$single,
            'content'=>$content,
    		'tdk'=>$tdk,
    		]);
    	return $this->fetch();
    }
}

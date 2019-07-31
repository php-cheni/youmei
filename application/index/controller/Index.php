<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class Index extends Common{
    public function index(){
    	$banner=Db::name('banner')->order('sort asc,id desc')->select();
    	$active=Db::name('active')->field('url,title,img')->select();
    	$settop=Db::name('article')->field('content',true)->where(['settop'=>1])->find();
    	$category=Db::name('category')->order('recommend asc')->limit(3)->select();
    	foreach ($category as $key => $value) {
    		$category[$key]['article']=Db::name('article')->field('id,title,date')->where(['category'=>$value['id']])->order('id desc')->limit(4)->select();
    	}
    	$icon=array_column($banner,'icon');
    	$url=array_column($banner,'url');
    	$img=array_column($banner,'img');
    	$title=array_column($banner,'title');
    	$content=array_column($banner,'content');
    	$introduce=array_combine($title,$content);
    	$img=array_combine($img,$url);
    	$this->assign([
    		'icon'=>$icon,
    		'introduce'=>$introduce,
    		'img'=>$img,
    		'settop'=>$settop,
    		'category'=>$category,
    		'active'=>$active,
    		]);
        return $this->fetch();
    }
}

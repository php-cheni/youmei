<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class Trends extends Common{
    public function index(){
        $trends=Db::name('trends')->select();
        $tdk=Db::name('nav')->where('url','news')->find();
        foreach ($trends as $key => $value) {
            $trends[$key]['img']=json_decode($value['img'],true);
        }
        $this->assign(['trends'=>$trends,'tdk'=>$tdk,'swiper'=>array_keys($trends)]);
    	return $this->fetch();
    }
}

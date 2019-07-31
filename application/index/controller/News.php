<?php
namespace app\index\controller;
use think\Controller;
use think\Db;

class News extends Common{
    public function index(){
        $category=Db::name('category')->column('id,name');
        $id=input('category')?input('category'):1;
        // 查询状态为1的用户数据 并且每页显示10条数据
        $news = Db::name('article')->where('category',$id)->order('id desc')->paginate(10,true);
        $content=Db::name('category')->find($id);
        $page=$news->render();
        $tdk=Db::name('nav')->where('url','news')->find();
    	$this->assign([
            'category'=>$category,
            'content'=>$content,
            'news'=>$news,
            'page'=>$page,
            'tdk'=>$tdk,
    		]);
    	return $this->fetch();
    }

    public function detail(){
        $id=input('id');
        $detail=Db::name('article')->find($id);
        $category=Db::name('category')->column('id,name');
        $content=Db::name('category')->find($detail['category']);
        $prev=Db::name('article')->where(['category'=>$detail['category'],'id'=>['lt',$id]])->order('id desc')->find();
        $next=Db::name('article')->where(['category'=>$detail['category'],'id'=>['gt',$id]])->order('id asc')->find();
        $this->assign([
            'category'=>$category,
            'detail'=>$detail,
            'content'=>$content,
            'prev'=>$prev,
            'next'=>$next,
            ]);
        return $this->fetch();
    }

    public function newsload(){
        $page=input('page');
        $article=Db::name('article')->field('content',true)->order('id desc')->page($page,10)->select();
        $category=Db::name('category')->column('id,name');
        foreach ($article as $key => $value) {
            $article[$key]['category']=$category[$value['category']];
            $article[$key]['url']='/m/'.lockcode($value['id']).'.html';
        }
        $result=$article?['success'=>'成功获取文章！','article'=>$article]:['msg'=>'没有更多文章了...'];
        return json($result);
    }
}
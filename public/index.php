<?php
if ($_SERVER['HTTP_HOST']=='bjyoumei.com' || $_SERVER['HTTP_HOST']=='www.bjyoumei.com') {
	header("Location: http://www.huolishuang.com");
}
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]

// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
switch ($_SERVER['SERVER_NAME']) {
    case 'www.bjyoumei.com':
        define('BIND_MODULE','index');
        break;
    case 'youmei.bjyoumei.com':
        define('BIND_MODULE','youmei');
        break;
}
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';

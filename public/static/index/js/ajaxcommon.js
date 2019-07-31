//设置将来的 Ajax 请求的默认值。
var ajaxSetup = {
    //默认值: "GET",请求方式 ("POST" 或 "GET")
    type: "GET",
    //默认值: true,默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
    async: true,
    //设置为 false 将不缓存此页面。
    cache: false,
    //返回 JSON 数据
    dataType: "text",
    //请求的地址
    url: "/Ajax/AjaxCommon.aspx"
}

/*  公用Ajax分页方法
调用方法： (job);  
AjaxPageList("JobList", "y", 1, 8, "", "AjaxSuccess");
_action:动作
_pageload:是否首次加载
_pageindex:当前页
_pagesize:每页条数
_where:条件
_method:回调方法
*/
function AjaxPageList(_action, _pageload, _pageindex, _pagesize, _where, _method) {
    $.ajax({
        type: ajaxSetup.type,
        async: ajaxSetup.async,
        cache: ajaxSetup.cache,
        dataType: ajaxSetup.dataType,
        url: ajaxSetup.url,
        data: { action: reCode(_action), pageload: _pageload, pageindex: _pageindex, pagesize: _pagesize, where: reCode(_where), method: _method },
        success: function(data) {
            window[_method](data);
        },
        error: function() {  //出错

        }
    });
}

/*  栏目Ajax分页方法
调用方法： (Fall);  
AjaxDataPageList("NewsList", "y", 1, 8, "100001","", "AjaxSuccess");
_action:动作
_pageload:是否首次加载
_pageindex:当前页
_pagesize:每页条数
_fid:栏目ID
_where:条件
_method:回调方法
*/
function AjaxDataPageList(_action, _pageload, _pageindex, _pagesize, _fid, _where, _method) {
    $.ajax({
        type: ajaxSetup.type,
        async: ajaxSetup.async,
        cache: ajaxSetup.cache,
        dataType: ajaxSetup.dataType,
        url: ajaxSetup.url,
        data: { action: reCode(_action), pageload: _pageload, pageindex: _pageindex, pagesize: _pagesize, fid: _fid, where: reCode(_where), method: _method },
        success: function(data) {
            window[_method](data);
        },
        error: function() {  //出错
        console.log("出错了");
        }
    });
}
/*Ajax提交表单
AjaxFormSubmit("#form1", "AjaxSuccess")
_form：表单元素
_method：回调方法
*/
var _formLoad = 0; //防止多次提交
function AjaxFormSubmit(_form, _method) {
    if (_formLoad == 0) {
        _formLoad = 1;
        $.post(ajaxSetup.url, $(_form).serializeArray(), function(data) {
            _formLoad = 0;
            window[_method](data);
        }, "json");
    }
};


/*
表单验证-非空     
用法：
$("#btn").click(function() {
$ValForm(form,method);   //form:表单   method:自定义验证方法
});

<input type="text"  name="Contact" nullmsg="姓名不能为空哦" />

//自定义验证方法  
function XXXX() {
var _msg = "";
if ($("input[name='XXX']").val() == "") { _msg += "XXXXXXXXX\n"; }
return _msg;
}
*/
function $ValForms(form, method) {
    var _msg = "";
    var $input = $(form + " input," + form + " textarea");
    $.each($input, function(i, e) {
        var _val = $(e).val();              //表单元素值               
        var _nullmsg = $(e).attr("nullmsg");  //表单元素值为空的提示
        if (_nullmsg != undefined) {
            if (_val == "") {
                _msg += _nullmsg + "\n";
            }
        }
    });
    //自定义验证方法,如果存在并且是function,则调用
    if (typeof method === 'function') {  //存在且是function
        _msg += method();
    }

    if (_msg != "") {
        _msg = "保存失败!\n可能是以下原因造成:\n" + _msg;
        alert(_msg);
        return false;
    } else {
        if (confirm("确定提交?")) {
            return true;
        } else {
            return false;
        }
    }
};

/* 给必填加*号
用法： class='nullmsg'
*/
$(function() {
    $("form .nullmsg").after("<b style='margin-left: 8px;line-height: 25px;height: 25px;overflow: hidden;color: rgb(248, 16, 62);font-size: 12px;position: absolute;font-weight: normal;font-style:normal;'>*</b>");
});


//字符编码
function reCode(s) {
    //特殊字符
    s = s.replace(/\+/g, "%2B");   // +
    s = s.replace(/\=/g, "%3D");   // =
    s = s.replace(/\!/g, "%21");   // !
    s = s.replace(/\'/g, "%27");   // '
    s = s.replace(/\(/g, "%28");   // (
    s = s.replace(/\)/g, "%29");   // )
    s = s.replace(/\*/g, "%2A");   // *
    s = s.replace(/\-/g, "%2D");   // -
    s = s.replace(/\./g, "%2E");   // .
    s = s.replace(/\_/g, "%5F");   // _
    s = s.replace(/\~/g, "%7E");   // ~
    //小写 
    s = s.replace(/a/g, "%61");   // 
    s = s.replace(/b/g, "%62");   // 
    s = s.replace(/c/g, "%63");   // 
    s = s.replace(/d/g, "%64");   // 
    s = s.replace(/e/g, "%65");   // 
    s = s.replace(/f/g, "%66");   // 
    s = s.replace(/g/g, "%67");   // 
    s = s.replace(/h/g, "%68");   // 
    s = s.replace(/i/g, "%69");   // 
    s = s.replace(/j/g, "%6a");   // 
    s = s.replace(/k/g, "%6b");   // 
    s = s.replace(/l/g, "%6c");   // 
    s = s.replace(/m/g, "%6d");   // 
    s = s.replace(/n/g, "%6e");   // 
    s = s.replace(/o/g, "%6f");   // 
    s = s.replace(/p/g, "%70");   // 
    s = s.replace(/q/g, "%71");   // 
    s = s.replace(/r/g, "%72");   // 
    s = s.replace(/s/g, "%73");   // 
    s = s.replace(/t/g, "%74");   // 
    s = s.replace(/u/g, "%75");   // 
    s = s.replace(/v/g, "%76");   // 
    s = s.replace(/w/g, "%77");   // 
    s = s.replace(/x/g, "%78");   // 
    s = s.replace(/y/g, "%79");   // 
    s = s.replace(/z/g, "%7a");   // 
    //大写
    s = s.replace(/A/g, "%41");   // 
    s = s.replace(/B/g, "%42");   //
    s = s.replace(/C/g, "%43");   // 
    s = s.replace(/D/g, "%44");   // 
    s = s.replace(/E/g, "%45");   // 
    s = s.replace(/F/g, "%46");   // 
    s = s.replace(/G/g, "%47");   // 
    s = s.replace(/H/g, "%48");   // 
    s = s.replace(/I/g, "%49");   // 
    s = s.replace(/J/g, "%4a");   // 
    s = s.replace(/K/g, "%4b");   // 
    s = s.replace(/L/g, "%4c");   // 
    s = s.replace(/M/g, "%4d");   // 
    s = s.replace(/N/g, "%4e");   // 
    s = s.replace(/O/g, "%4f");   // 
    s = s.replace(/P/g, "%50");   // 
    s = s.replace(/Q/g, "%51");   // 
    s = s.replace(/R/g, "%52");   // 
    s = s.replace(/S/g, "%53");   // 
    s = s.replace(/T/g, "%54");   // 
    s = s.replace(/U/g, "%55");   // 
    s = s.replace(/V/g, "%56");   // 
    s = s.replace(/W/g, "%57");   // 
    s = s.replace(/X/g, "%58");   // 
    s = s.replace(/Y/g, "%59");   //
    s = s.replace(/Z/g, "%5a");   //    
    //中文编码
    s = encodeURIComponent(s);
    s = encodeURIComponent(s);
    return s;
}

//字符解码
function deCode(s) {
    return decodeURIComponent(decodeURIComponent(s));
}

$(function(){
    $("#look-more").bind('click',function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $(this).children().addClass('down');
            $(".back-foot").addClass("cur");
            $(".footer_layer").animate({height:250});
        }
        else{
            $(this).removeClass('on');
            $(this).children().removeClass('down');
            $(".back-foot").removeClass("cur");
            $(".footer_layer").animate({height:25});
        }
        $('html,body').animate({scrollTop: $("#anchorId").offset().top}, 500);
    })
})
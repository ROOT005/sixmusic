

$(function(){
	//首先将#scrollUpf隐藏
    $("#scrollUp").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $("#scrollUp").fadeIn();
            } else {
                $("#scrollUp").fadeOut();
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#scrollUp .arrows").click(function() {
            $('body,html').animate({
                scrollTop: 0
            },
            500);
            return false;
        });
    });

    // 返回顶部加QQ客服
    $("#scrollUp .arrows").after('<a class="service" title="QQ" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1369535553&site=qq&menu=yes"><i class="icon-qq"></i></a>');
});
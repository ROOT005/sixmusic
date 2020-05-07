//详情页右侧浮动1
$(function() {
    //图片链接破损修复可加
    //   $('img').on('error', function () {
    //   $(this).prop('src', 'img/broken.png');
    // });
    // 点击评论
    $(".zbd_comments .zbd_two").click(function() {
        var display = $('.zbd_write').css('display');
        if (display == 'none') {
            $(".zbd_write").show();
            $(".ad-img").hide();
            $(".zbd_comments .zbd_one").css({ "border-bottom": "1px solid #eff3f5" });
            $(".zbd_comments .zbd_two").addClass('zbd');
            $(".zbd_write").find("textarea").focus();
        } else {
            $(".zbd_comments .zbd_two").removeClass('zbd');
            $(".zbd_comments .zbd_one").css({ "border-bottom": "1px solid #fff" });
            $(".zbd_write").hide();
            $(".ad-img").show();
        }
    })
    if($(window).scrollTop()>5361){
        $(".uptop").show();
        $(".uptop").addClass("fixed")
    }else{
        $(".uptop").removeClass("fixed")
    }
});

$(function(){
    var asideh = $(".works-author-aside").height(); //获取右侧上半部分高度313
    var navtop = $(".works-bottom").offset().top - 600; //上下转换位置
    if (navtop > asideh) {
        var foottop = $(".ft-wp").offset().top - 254;
        $('.uptop').css({ "position": "absolute", "top": navtop - 200 }); //固定uptop初始位置
        $(document).scroll(function() {
            h = $(window).scrollTop();
            if (h > 80 && h < navtop - asideh) {
                $('.works-author-aside').css({ "position": "static" });
                $('.works-author-aside').addClass("fixed1")
            } else if (h > navtop - asideh) {
                $('.works-author-aside').removeClass("fixed1")
                $('.works-author-aside').css({ "position": "absolute", "top": navtop - 120 - asideh, });
            } else if (h < 80) {
                $('.works-author-aside').removeClass("fixed1");
                $('.works-author-aside').css({ "position": "static" });
            }
        });
        $(window).scroll(function() {
            h = $(window).scrollTop();
            var asideh = $(".works-author-aside").height();
            var display = $('.zbd_write').css('display');
            var navtop2 = $(".works-author").offset().top - 600;
            if (display == 'none') { //评论隐藏状态
                if (h > navtop - asideh && h < navtop) {
                    // console.log(navtop);
                    $('.uptop').css({ "position": "static" });
                    $('.uptop').removeClass("fixed")
                    $(".uptop").css({ "position": "absolute", "top": navtop - 120, });
                    $(".uptop").fadeIn();
                } else if (h > navtop) {
                    $('.uptop').css({ "position": "static" });
                    $('.uptop').addClass("fixed")
                } else if (h < navtop) {
                    $(".uptop").fadeOut();
                    $('.uptop').removeClass("fixed")
                }
                //底部静止
                var maint = $('.works-main').offset().top;
                var mainh = $('.works-main').height();
                var zbd = $(".zbd_center").height();
                if (h > maint + mainh - zbd) {
                    $(".uptop").removeClass("fixed");
                    $(".uptop").css({ "position": "static" });
                    $(".uptop").css({ "position": "absolute", "top": maint + mainh - zbd - 120, });
                }
                // end
            } else { //评论显示状态
                // console.log(111);
                if (h > navtop2 - asideh && h < navtop2) {
                    // console.log(navtop);
                    $('.uptop').css({ "position": "static" });
                    $('.uptop').removeClass("fixed")
                    $(".uptop").css({ "position": "absolute", "top": navtop2 - 120, });
                    $(".uptop").fadeIn();
                } else if (h > navtop2) {
                    $('.uptop').css({ "position": "static" });
                    $('.uptop').addClass("fixed")
                } else if (h < navtop2) {
                    $(".uptop").fadeOut();
                    $('.uptop').removeClass("fixed")
                }
                //底部静止
                var maint = $('.works-main').offset().top;
                var mainh = $('.works-main').height();
                var zbd = $(".zbd_center").height();
                if (h > maint + mainh - zbd) {
                    $(".uptop").removeClass("fixed");
                    $(".uptop").css({ "position": "static" });
                    $(".uptop").css({ "position": "absolute", "top": maint + mainh - zbd - 120, });
                }
                // end
            }
        }); //下半部分隐藏结束
    } else { //作品高度低的时候
        $(document).scroll(function() {
            var asideh = $(".works-author-aside").height();
            var display = $('.zbd_write').css('display');
            h = $(window).scrollTop();
            if (h > 80 && h < asideh + 80) {
                $('.uptop').removeClass("fixed")
                $(".uptop").show();
                $('.uptop').css({ "position": "static" });
                $(".uptop").css({ "position": "absolute", "top": asideh });
            } else if (h > asideh + 80) {
                $('.uptop').addClass("fixed")
            } else {
                $('.uptop').hide();
            }
            //底部静止
            var maint = $('.works-main').offset().top;
            var mainh = $('.works-main').height();
            var zbd = $(".zbd_center").height();
            if (h > maint + mainh - zbd) {
                $(".uptop").removeClass("fixed");
                $(".uptop").css({ "position": "static" });
                $(".uptop").css({ "position": "absolute", "top": maint + mainh - zbd - 120, });
            }
            // end
        });
    } //判断结束
});
//加关注效果
$(function() {
    $(document).on("mouseover", ".z_follow", function() {
        var _rel = $(this).attr('_rel');
        if (_rel == 'havefollow') { //已关注
            $(this).addClass('z_red');
            $(this).find("i").removeClass('icon-ok-sign');
            $(this).find("i").addClass('icon-close-bold');
        } else if (_rel == 'mutualfollow') { // 相互关注
            $(this).removeClass("z_orange")
            $(this).addClass('z_red');
            $(this).find("i").removeClass('icon-relating-bold');
            $(this).find("i").addClass('icon-close-bold');
        }
    });

    $(document).on("mouseout", ".z_follow", function() {
        var _rel = $(this).attr('_rel');
        $(this).removeClass('z_red');
        if (_rel == 'havefollow') { //已关注
            $(this).find("i").removeClass('icon-close-bold');
            $(this).find("i").addClass('icon-ok-sign');
            $(this).removeClass('z_red');
        } else if (_rel == 'mutualfollow') { // 相互关注
            $(this).addClass("z_orange")
            $(this).find("i").removeClass('icon-close-bold');
            $(this).find("i").addClass('icon-relating-bold');
            $(this).removeClass('z_red');
        }
    });
    // 举报显示隐藏输入框
    $(".popup-info input").click(function() {
        var item = $("#examinetype4:radio:checked");
        var len = item.length;
        if (len > 0) {
            $("#textarea-report").show();
        } else {
            $("#textarea-report").hide();
        }
    });
});

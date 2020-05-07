// JavaScript Document

$(document).ready(function(){
    $(document).on('mouseenter', '.Inspir-list>li', function(){
        $(this).find('.iInspir-cover-user').addClass('col'); //用户名变颜色
        $(this).find('.iInspir-cover-user i').show();
        $(this).find('.iInspir-block')
            .stop()
            .animate({ opacity : '1'}, 300)
            .addClass('op');
        $(this).find('.zhe_zao').animate({
            "width":"290px",
            "height":"100%",
            "top": "-5px",
            "left": "-5px",
            "right": "-5px",
            "bottom": "-1px"},300);
        $(this).siblings().find(".new_item").css("display","none");
    });
    $(document).on('mouseleave', '.Inspir-list>li', function(){
        $(this).find('.iInspir-cover-user').removeClass('col');
        $(this).find('.iInspir-cover-user i').hide();
        $(this).find('.iInspir-block')
            .stop()
            .animate({ opacity : '0'}, 300)
            .removeClass('op');
        $(this).find('.zhe_zao').animate({
            "width":"280px",
            "height":"310px",
            "top": 0,
            "left": 0,
            "right": 0,
            "bottom": 0},300);
        $(this).siblings().find(".new_item").css("display","block");

    });


    /* 灵感 */
    $(document).on('mouseenter', '.content_list li', function(){
        $(this).find('.border')
            .stop()
            .animate({ opacity : '1'}, 300)
            .removeClass('hide')
            .addClass('show');
    });
    $(document).on('mouseleave', '.content_list li', function(){
        $(this).find('.border')
            .stop()
            .animate({ opacity : '0'}, 300)
            .removeClass('show')
            .addClass('hide');
    });

    //删除作品
    $(document).on('click', '.Inspir-list .del', function(){
            var del2 =  $(this).parent("li").parents("li").find("input");
            var type1 = parseInt(del2.attr("data_type"));
            actid = parseInt(del2.attr("data_actid"));
            pid = parseInt(del2.attr("data_pid"));
            var ll_number = parseInt(del2.attr("data_viewnum"));
            var dz_number = parseInt(del2.attr("data_likenum"));
            var pl_number = parseInt(del2.attr("data_commentnum"));
            if (ll_number<5&&dz_number==0&&pl_number==0) {
                firm();
            }else{
                $('body').addClass('modal-open').append('<div class="modal-backdrop"></div>');
                $(".modal_de").attr({
                    "id": 'modal-del',
                });
                // 获取弹框id
                var modalBox = $("#modal-del");
                var modalBoxPos = $(modalBox).find(".modal-effect");
                // 显示弹框
                modal_1(modalBox,modalBoxPos);
                if(type1==1){
                    $(".modal-effect").find(".title").text("删除作品");
                }else if(type1==2){
                    $(".modal-effect").find(".title").text("删除经验");
                }
                if(ll_number==0){
                    $(".viewnum1").css("display","none");
                }else{
                    $(".viewnum1").css("display","block");
                    $(".viewnum1 em").text(ll_number);
                }
                if(dz_number==0){
                    $(".likenum1").css("display","none");
                }else{
                    $(".likenum1").css("display","block");
                    $(".likenum1 em").text(dz_number);
                }
                if(pl_number==0){
                    $(".commentnum1").css("display","none");
                }else{
                    $(".commentnum1").css("display","block");
                    $(".commentnum1 em").text(pl_number);
                }
            }
            $(document).on('click', '.yes', function(){
                $.ajax({
                    type:"post",
                    url:"/delProject",
                    data:{'pid':pid,'uid':uid,'actid':actid},
                    dataType:"json",
                    success:function (msg) {
                        console.log(msg);
                        if(msg.code == 1){
                            globalTip(msg);
                        }else{
                            globalTip(msg);
                            return false;
                        }
                    }
                })
            });
        });
   
    function firm(){
            //利用对话框返回的值 （true 或者 false）
            if(confirm("您确定要删除作品吗")){
                $.ajax({
                    type:'post',
                    url:'/delProject',
                    data:{'pid':pid,'uid':uid,'actid':actid},
                    dataType:'json',
                    success:function(msg){
                        if(msg.code == 1){
                            globalTip(msg);
                        }else{
                            globalTip(msg);
                            return false;
                        }

                    }
                })
            }else{
                return false;
            }
        }
    modalPostion = function(pos) {
            //获取改变之后的宽度
            var changeWidth=$(window).width();
            var changeHeight=$(window).height();
            // 获取DIV宽度
            var smallW = $(pos).width();
            var smallH = $(pos).height();
            //计算宽度修改比例
            var divChangeWidth	=	(changeWidth - smallW) / 2;
            var divChangeHeight	=	(changeHeight - smallH) / 2;
            // 超过一屏幕的上下不居中给margin值
            if( divChangeHeight > 0 ) {
                $(pos).css('top', divChangeHeight);
                $(pos).css('left', divChangeWidth);
            } else {
                $(pos).css('left', divChangeWidth);
                $(pos).css('margin', "30px 0");
            }


        };
    modal_1 = function(box,pos) {
            // 浮动窗口定位
            modalPostion(pos);

            // 显示
            $('body').css('padding_right','15px');
            $(box).addClass("in");

            $(window).resize(function(){
                // 浮动窗口定位
                modalPostion(pos);
            });

            // 点击关闭按钮以及遮罩层时关闭浮动层
            $('.icon-close, .modal-backdrop').bind('click', function(){
                $(box).removeClass("in");
                $('.modal-backdrop').remove();
                $('body').removeClass("modal-open");
                $('body').css('padding_right','0');
            });

            // 点击关闭按钮以及遮罩层时关闭浮动层
            $('.close-btn, .modal-backdrop').bind('click', function(){
                $(box).removeClass("in");
                $('.modal-backdrop').remove();
                $('body').removeClass("modal-open");
                $('body').css('padding_right','0');
            });
        };
    $(document).on('click', '.Inspir-list .edit', function(){
            var del2 =  $(this).parent("li").parents("li").find("input");
            var type = parseInt(del2.attr("data_type"));
            actid = parseInt(del2.attr("data_actid"));
            pid = parseInt(del2.attr("data_pid"));
            $.post('/enedit', {'pid': pid, 'actid': actid}, function (data) {
                if (data.code == 1) {
                    globalTip({'msg': data.msg, 'setTime': data.setTime});
                } else {
                    if (type == 1) {
                        window.location.href = "http://upload.ui.cn/work.html?id="+pid;
                    } else if (type == 2) {
                        window.location.href = "http://upload.ui.cn/exp.html?id="+pid;
                    }
                }
            }, 'json')
        });
    $(document).on('click', '.Inspir-list .hid', function(){
            var _this = $(this);
            var del2 =  $(this).parent("li").parents("li").find("input");
            actid = parseInt(del2.attr("data_actid"));
            pid = parseInt(del2.attr("data_pid"));
            var hidnum = $(this).attr("data_hide");

            if(hidnum==0){
                $(this).attr("data_hide",1);
                $(this).find("span").text("取消隐藏")
            }else{
                $(this).attr("data_hide",0);
                $(this).find("span").text("隐藏");
            }
            $.ajax({
                type:"post",
                url:"/hideStatus",
                data:{'pid':pid,'uid':uid,'actid':actid,"hide":hidnum},
                dataType:"json",
                success:function (data) {
                    if(data.data_hide==0){
                        _this.parent("li").parents("li").find(".eye").fadeOut(500);
                        _this.parent("li").parents("li").find(".hide_con").addClass("hide");
                        _this.parent("li").parents("li").find(".zhe_zao").fadeOut();
                    }else{
                        _this.parent("li").parents("li").find(".hide_con").removeClass("hide");
                        _this.parent("li").parents("li").find(".zhe_zao").fadeIn();
                        _this.parent("li").parents("li").find(".eye").fadeIn(500);
                    }

                }
            })
        })
    $(document).on("click",".zhe_zao,.eye,.hide_con",function () {
        window.location =  $(this).parent("li").find(".iInspir-cover-pic>a").attr("href");
    })
})
$(function(){
	// 微信二维码分享框
	$(".icon-weixin1").click(function(event){

		$(this).parent().addClass("on");
		$(".weixin-box").show();

		$(".weixin-box").click(function(event){
			event.stopPropagation();
		})
		$(".icon-close").click(function(){
			infowx();
		});
		$(document).click(function(){
			infowx();
		});
		event.stopPropagation();

		function infowx(){
			$(".weixin-box").hide();
			$(".icon-weixin1").parent().removeClass("on");
		}
	});

	//详情页回复评论框显示隐藏
	// $(".comment-main").delegate(".p-replay","click",function(){
	// 	$(this).parents(".comment-cont").find(".comment-form-inner").slideDown();
	// 	$(this).parents(".item").siblings("li").find(".comment-form-inner").slideUp();
	// 	$(".comment-form-inner .btn-nature").on("click",function(){
	// 		$(this).parents(".comment-form-inner").slideUp();
	// 	});
	// })

	//侧边栏显示快速评论
	var QCommentBtn = $(".works-oper-aside a").last();
	QCommentBtn.click(function(){
		if( $(".comment-quick").hasClass("open")){
			$(".comment-quick").removeClass("open");
			$(".comment-quick").slideUp();
		} else {
			$(".comment-quick").addClass("open");
			$(".comment-quick").slideDown();
		}
		
	});


});
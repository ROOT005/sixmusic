
$(function(){
//表单点击关注
	var followBtn = $(".h-follow-check .check");
		// followBtn.find("em").hide();

	followBtn.click(function(){
		if($(this).siblings("input[type='checkbox']").attr("checked")==undefined){
		    $(this).find("em").show();
		    $(this).siblings("input[type='checkbox']").attr("checked",true)
		}else{
		    $(this).find("em").hide();
		    $(this).siblings("input[type='checkbox']").attr("checked",false)
		}
	});

// 鸡汤
	$(".h-soup li i").click(function(){
		var soupBtn = $(this).parent();
		$(".h-soup li").removeClass("open");
		soupBtn.addClass("open");
	});

//文章、设计师选项卡

	// tabSwitch('.h-article-btn a','.h-article-box ul');
	tabSwitch('.h-member-btn a','.h-member-box ul');

// 提示语点击一次后消失
	$('.switch-tip').click(function(){
		$(this).siblings('.tips').remove();
	});



});

// 选项卡切换
tabSwitch = function(btn,item) {
	$(item).hide();
	$(item).eq(0).show();
	$(btn).click(function(){
		var index = $(this).index();
		$(btn).removeClass('on');
		$(btn).eq(index).addClass('on');
		$(item).hide();
		$(item).eq(index).show();
	});
};


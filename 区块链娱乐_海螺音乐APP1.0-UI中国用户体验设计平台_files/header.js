// description: 新导航
// date: 2015-10-21
// header.v1.css
// update:3
$(function() {
	// 搜索输入隐藏下拉菜单
	$(".search-val").keydown(function(){
		$('.search-select ul').hide();
	});
	//滑过导航显示子导航
	$(".nav-hd li").hover( function () {
		$(this).addClass("open");
	    $(this).find(".subnav-hd").show();
	 },function () {
		$(this).removeClass("open");
	    $(this).find(".subnav-hd").hide();
	});

	$('#quickTab .tab-wrap').find('a').each(function(){
  		var tmpurl=$(this).attr('href') +'&random='+ Math.random();
  		$(this).attr('href',tmpurl);
	});

//兼容个人中心,立即激活的样式。
$(".jsemailverify").parent('div').parent('li').css("background","#fff7e7").find('a').addClass('f14').css('display','block');

$(".quick-item").hover( function () {
	$(this).addClass('on');
	$(this).find('.quick-menu').show();
},function () {
$(this).removeClass('on');
	$(this).find('.quick-menu').hide();
});


$(".quick-item").mouseenter(function(){
	if($(this).find('.quick-menu').attr('id')=='quickTab' && nav_loc.length>0){
		var navi = nav_loc.substr(0,1); // 获取第一个展开S
		navi = parseInt(navi);
		tabNav.eq(navi).trigger('click');//默认有动态 展开项
	}
});
	// 消息选项卡
	$(".quick-tab .tab-wrap .tab-cont").hide();
	$(".quick-tab .tab-wrap .tab-cont").eq(0).show();
	$(".quick-tab .tab-bar li").eq(0).addClass('on');

	var tabNav = $(".quick-tab .tab-bar li");
	tabNav.click(function(){
		var index = $(".quick-tab .tab-bar li").index(this);  //获取当前点击li的索引值

		tabNav.removeClass('on');
		tabNav.eq(index).addClass('on');
		$(".quick-tab .tab-wrap ul").hide();
		$(".quick-tab .tab-wrap ul").eq(index).show();
	});
	var timer;
	$(".search-hd").mouseover(function(ev){
      var ev = ev || event;// enent做兼容
      ev.stopPropagation(); // 阻止冒泡
      $(".pull").show();
      $(".pull input").focus();
      $(".search-hd .search-hd-btn").addClass("on");
	}).mouseleave(function(){
		$(".pull").show();
		timer =  window.setTimeout(function(){
			$(".pull").hide();
			$(".search-hd .search-hd-btn").removeClass("on");
		},500);
	});
	$(".pull").hover(function(){
		clearTimeout(timer);
		$(this).show();
	});
	$(".pull .right_exp span").click(function(){
		var text = $(this).text();
		$(".pull .right_exp input").val(text);
	});
	$(".pull .right_exp li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
	});
	$(".growthTip .icon-close").click(function(){
		$(".growthTip").hide();
	});
});



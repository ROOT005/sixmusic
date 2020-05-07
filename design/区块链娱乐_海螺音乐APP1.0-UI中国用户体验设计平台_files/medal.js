$(function(){
	var getMadelList = function(type = 1,clas=1){
		var userid = $('.fixed-medal').attr('rel');
		var data = {'type':type,'userid':userid};
		if (type == 1) {
			data.class = clas;
		}
		$.ajax({
            url: '//i.ui.cn/getmedallist',
            type: 'get',
            dataType: 'jsonp',
            async: true,
            data: data,
            success: function(data) {
                if (data.code == 0) {
                    // if (type == 1) {
                    	var str = '';
                    	for (var i = 0; i < data.data.length; i++) {
                    		str+='<li class="z">';
							str+='<p class="medal_list">';
							if (data.data[i].class != '') {
								if (data.data[i].obtain == 'y') {
									str+='<svg class="icon" aria-hidden="true">';
								} else {
									str+='<svg class="icon g" aria-hidden="true">';
								}
								str+='<use xlink:href="#icon-'+data.data[i].class+'"></use>';
								str+='</svg>';
							} else {
								if (data.data[i].obtain == 'y') {
									str+='<img src="'+data.data[i].img_url+'" class="icon">';
								} else {
									str+='<img src="'+data.data[i].img_url+'" class="icon g">';
								}
							}
							str+='</p>';
							str+='<p class="tittle">'+data.data[i].name+'</p>';
							str+='<p class="ask">'+data.data[i].explanation+'</p>';
							str+='<p class="time">'+data.data[i].dateline+'</p>';
							str+='<div class="shadow"></div>';
							str+='</li>';
                    	}
                    	
       //              } else {
       //              	var str = '';
       //              	for (var i = 0; i < data.data.length; i++) {
       //              		str+='<li class="z">';
							// str+='<p class="medal_list">';
							// if (data.data[i].class != '') {
							// 	str+='<svg class="icon" aria-hidden="true">';
							// 	str+='<use xlink:href="#icon-'+data.data[i].class+'"></use>';
							// 	str+='</svg>';
							// } else {
							// 	str+='<img src="'+data.data[i].img-url+'" class="icon">';
							// }
							// str+='</p>';
							// str+='<p class="tittle">原创小生</p>';
							// str+='<p class="ask">原创作品数<br>积累达到10个</p>';
							// str+='<p class="time">2018-08-02</p>';
							// str+='<div class="shadow"></div>';
							// str+='</li>';
       //              }
       					if (type == 1) {
       						$('.modal-list').html(str);
       					} else {
       						$('.special').html(str);
       					}
                } else {
                    var str = "";
					str+='<div class="emptyLogo">';
					str+='<div class="flexCon">';
					str+='<div>';
					str+='<img src="/Public/img/sleep.png">';
					str+='<p>勇士，沉睡的勋章正等待着你去唤醒</p>';
					str+='</div>';
					str+='</div>';
					str+='</div>';
                    $(".special").html(str);
                }
            },
            error: function() {
                // globalTip({ 'msg': '导出失败', 'setTime': 2 });
            }
        });
	};

	$('.medal > img,.zbd_medal > img').click(function(){
		$('.fixed-medal').show();
		getMadelList(4); 
	});

	$(".fixed-medal").on('click', function(e) {
	    var contentEle = $('.fixed-medal .medal');
	    if (contentEle !== e.target && contentEle.has(e.target).length === 0) {
	        $(".fixed-medal").hide();
	    };
	});

	$('ul.sel > ul > li').delegate('p', 'click', function(event){
    	event.stopPropagation();
    	var rel = $(this).attr('rel');
		var tdom = $(this).prop('outerHTML');
		var odom = $('ul.sel li').eq(0).children('p').eq(0).prop("outerHTML");
		$(this).replaceWith(odom);
		$('ul.sel li').eq(0).children('p').eq(0).replaceWith(tdom);

		$('ul.sel > li').addClass('on');

		$('ul.achievement > li').removeClass('on');

		if (rel == 1) {
			var c = $('unknow all li.on').attr('rel');
			getMadelList(rel,c);
			$('.unknow').removeClass('hide');
			$('.special').addClass('hide');
		} else {
			getMadelList(rel);
			$('.unknow').addClass('hide');
			$('.special').removeClass('hide');
		}
	});

    // 顶部选项卡列表中第一个项点击事件
    $('ul.sel > li').eq(0).delegate('p', 'click', function(event){
    	if (!$('ul.achievement > li').hasClass('on')) {
    		return false;
    	}

    	$('ul.achievement > li').removeClass('on');
    	$(this).parent('li').addClass('on');
    	var rel = $(this).attr('rel');
    	if (rel == 1) {
    		var c = $('unknow all li.on').attr('rel');
    		getMadelList(rel,c);
			$('.unknow').removeClass('hide');
			$('.special').addClass('hide');
		} else {
			getMadelList(rel);
			$('.unknow').addClass('hide');
			$('.special').removeClass('hide');
		}
    });

    // 已拥有点击事件
	$('ul.achievement > li > p').eq(0).click(function(event) {
		if ($(this).parent('li').hasClass('on')) {
			return false;
		}
		getMadelList('4');
		$(this).parent('li').addClass('on');
		$('ul.sel > li').removeClass('on');
		$('.unknow').addClass('hide');
		$('.special').removeClass('hide');
	});

	// 成就勋章左侧栏点击事件
	$('.unknow .all').not(".on").delegate('li:not(.on)', 'click', function(event){
		var c = $(this).attr('rel');
		$(this).addClass('on').siblings('li').removeClass('on');
		getMadelList('1',c);
	});
});

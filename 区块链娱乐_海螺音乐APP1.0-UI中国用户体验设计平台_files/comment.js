var replayid = '';
var comid = '';
//点击回复，在对应框下显示快速回复框
$(document).on('click', '.p-replay', function () {

	if (!userid) {

		globalTip({ 'msg': '我们不支持匿名评论,去登录以后再来评论吧!', 'setTime': 5, 'jump': true, 'URL': 'https://ui.cn/login.html' });
		return false;
	} else {

		comid = $(this).attr('id');
		replayid = $(this).attr('_rel');

		var html;
		html = '<form id="comment_inner" class="comment-form comment-form-inner pos" action="">';
		html += '<textarea id="textarea_inner" class="comment-area" name="" id=""></textarea>';
		html += '<p class="comment-warn">还可以输入<span id="rep-num">500</span>个字</p>';
		html += '<div class="mtm cl">';
		html += '<div class="uiem-btn z btn_inner"><i class="icon-face"></i>表情</div>';
		html += '<input style="display:none;" id="recode" class="comment-code-input z" name="recode" type="text">';
		html += '<span class="comment-code z" id="revcode" style="display:none;">';
		html += '<img src="/code" onclick=this.src="/code?"+Math.random() alt="验证码" title="点击刷新"></span>';
		html += '<input name="reiscode" type="hidden" id="reiscode" style="display:none;">';
		html += '<button class="btn btn-primary btn-fixed-100 y" id="rep-comment">回复</button>';
		html += '<a class="comment-tip y del-comment" href="javascript:;">取消</a></div></form>';

		if ($(this).parents(".comment-data").find(".comment-form-inner").length > 0) {
			return false;
		}


		$('#com-' + comid + ' form').remove();

		$('#com-' + comid + ' .comment-data').append(html);

		$('#com-' + comid + ' textarea').focus();
	}

});


//快速回复框隐藏
$(document).on('click', '.del-comment', function () {
	$(this).parents(".comment-form-inner").find('textarea_inner').val('');
	$(this).parents(".comment-form-inner").slideUp();
});



//评论快捷键提交
$(document).on('keydown', '#textarea', function (event) {

	if (event.ctrlKey && event.keyCode == 13) {

		$('#p-comment').trigger('click');
		return false;
	}

})


//作品评论
$(document).on('click', '#p-comment', function () {

	var code = $('input[name=code]').val().trim();
	var iscode = $('input[name=iscode]').val().trim();
	var codelen = code.length;
	if (iscode == 1) {
		if (!codelen) {
			globalTip({ 'msg': '请填写验证码!', 'setTime': 3 });
			return false;
		}
		if (codelen != 4) {
			globalTip({ 'msg': '验证码长度不符合!', 'setTime': 3 });
			return false;
		}
	}
	$this = $(this);

	//内容不为空的时候，点击加菊花
	$this.addClass('loading');
	$this.text('');
	$this.attr('disabled', true);

	/*
	  POST https://www.ui.cn/addComment

	  Content-type: application/x-www-form-urlencoded
			 POST_BODY:
			 pid=123&ownerid=efe6398127928f1b2e9ef3207fb82663
	 */

	var rContent = $('#textarea').val();
	$.ajax({
		type: 'post',
		url: '/addComment',
		data: { 'pid': pid, 'ownerid': uid, 'content': rContent, 'code': code, 'iscode': iscode },
		dataType: 'json',
		success: function (msg) {
			if (msg.code == 1) {
				$(".machine").show();
				$(".machine .ma").removeClass("hidden").addClass("show");
				$(".machine .ope").removeClass("hidden").addClass("show");
				window.setTimeout(function () {
					$(".machine .light").show();
				}, 1000);
				window.setTimeout(function () {
					$(".machine .ma").removeClass("show").addClass("hidden");
					$(".machine .ope").removeClass("show").addClass("hidden");
					$(".machine .light").hide();
				}, 3000);
				globalTip(msg);
				//隐藏验证码
				$('#rcode').focus();
				$('#vcode').hide();
				$('#rcode').hide();
				$('#iscode').hide();
				$('#iscode').val('0');
				// window.location.reload();

				$('#textarea').val('');
				//内容不为空的时候，点击加菊花
				$this.removeClass('loading');
				$this.text('评论');
				$this.removeAttr('disabled');
				$('#com-num').text(500);
				var html;
				html = '<li class="item cl" id="com-' + msg.commentid + '">';
				html += '<div class="comment-num"><i class="icon-hexagon-up up com-like" id="' + msg.commentid + '" rel="' + msg.id + '" data="add"><a class="num" href="javascript:;">0</a></i><i class="icon-hexagon-down down com-report" id="' + msg.commentid + '" rel="' + msg.id + '" data="add"></i></div>';
				html += '<a class="avatar-sm z" title="' + msg.username + '" href="https://i.ui.cn/ucenter/' + msg.id + '.html"><img src="' + msg.head + '" alt="' + msg.username + '"></a>';
				html += '<div class="comment-cont comment-data"><h5 class="user"><a href="https://i.ui.cn/ucenter/' + msg.id + '.html">' + msg.username + '</a><time>' + msg.time + '</time></h5>';
				html += '<p class="text">' + msg.content + '</p><div class="oper cl"><a class="comment-toggle p-replay" href="javascript:;" id="' + msg.commentid + '" _rel="' + msg.id + '"><i class="icon-comment"></i>回复</a><a href="javascript:;" class="com-sina" rel="' + msg.username + '">分享</a><span class="oper-hide"><a href="javascript:;" class="del-comm" id="' + msg.commentid + '" rel="' + msg.pid + '" _rel="' + msg.id + '">删除评论</a></span></div></div></li>';

				$('#com-list').prepend(html).slideDown();

			} else {



				//内容不为空的时候，点击加菊花
				$this.removeClass('loading');
				$this.text('评论');
				$this.removeAttr('disabled');
				$('#textarea').focus();

				//出验证码
				if (msg.iscode == 1) {
					$('#rcode').focus();
					$('#vcode').show();
					$('#rcode').show();
					$('#iscode').show();
					$('#iscode').val('1');
				}
				if (msg.code == 10) {
					var status = confirm("账户未激活，是否激活账户？");
					if (status) {
						window.location = 'https://account.ui.cn/basicinfo.html';
					}
					return false;
				}

				if (msg.code == 11) {
					var status = confirm("邮箱未激活，是否激活邮箱？");
					if (status) {
						window.location = 'https://account.ui.cn/accountinfo.html';
					}
					return false;
				}
				globalTip(msg);
			}

		}
	})

	return false;
})



//作品快速评论
$(document).on('click', '#fast-com', function () {

	var code = $('input[name=fast_code]').val().trim();
	var iscode = $('input[name=fast_iscode]').val().trim();
	var codelen = code.length;
	if (iscode == 1) {
		if (!codelen) {
			globalTip({ 'msg': '请填写验证码!', 'setTime': 3 });
			return false;
		}
		if (codelen != 4) {
			globalTip({ 'msg': '验证码长度不符合!', 'setTime': 3 });
			return false;
		}
	}
	$this = $(this);

	//内容不为空的时候，点击加菊花
	$this.addClass('loading');
	$this.text('');
	$this.attr('disabled', true);

	var rContent = $('#textcomment').val();
	$.ajax({
		type: 'post',
		url: '/addComment',
		data: { 'pid': pid, 'ownerid': uid, 'content': rContent, code: code, iscode: iscode },
		dataType: 'json',
		success: function (msg) {

			if (msg.code == 1) {
				globalTip(msg);
				//隐藏验证码
				$(".machine").show();
				$(".machine .ma").removeClass("hidden").addClass("show");
				$(".machine .ope").removeClass("hidden").addClass("show");
				window.setTimeout(function () {
					$(".machine .light").show();
				}, 1000);
				window.setTimeout(function () {
					$(".machine .ma").removeClass("show").addClass("hidden");
					$(".machine .ope").removeClass("show").addClass("hidden");
					$(".machine .light").hide();
				}, 3000);
				$('#com-list li form').remove();
				$('#fast_vcode').hide();
				$('#fast_rcode').hide();
				$('#fast_iscode').hide();
				$('#fast_iscode').val('0');
				$('#textcomment').val('');
				$('#textarea').val('');

				// window.location.reload();
				//内容不为空的时候，点击加菊花
				$this.removeClass('loading');
				$this.text('评论');
				$this.removeAttr('disabled');
				$('#com-num').text(500);

				var html;
				html = '<li class="item cl" id="com-' + msg.commentid + '">';
				html += '<div class="comment-num"><i class="icon-hexagon-up up com-like" id="' + msg.commentid + '" rel="' + msg.id + '" data="add"><a class="num" href="javascript:;">0</a></i><i class="icon-hexagon-down down com-report" id="' + msg.commentid + '" rel="' + msg.id + '" data="add"></i></div>';
				html += '<a class="avatar-sm z" title="' + msg.username + '" href="https://i.ui.cn/ucenter/' + msg.id + '.html"><img src="' + msg.head + '" alt="' + msg.username + '"></a>';
				html += '<div class="comment-cont comment-data"><h5 class="user"><a href="https://i.ui.cn/ucenter/' + msg.id + '.html">' + msg.username + '</a><time>' + msg.time + '</time></h5>';
				html += '<p class="text">' + msg.content + '</p><div class="oper cl"><a class="comment-toggle p-replay" href="javascript:;" id="' + msg.commentid + '" _rel="' + msg.id + '"><i class="icon-comment"></i>回复</a><a href="javascript:;" class="com-sina" rel="' + msg.username + '">分享</a><span class="oper-hide"><a href="javascript:;" class="del-comm" id="' + msg.commentid + '" rel="' + msg.pid + '" _rel="' + msg.id + '">删除评论</a></span></div></div></li>';

				$('#com-list').prepend(html).slideDown();


			} else {
				//内容不为空的时候，点击加菊花
				$this.removeClass('loading');
				$this.text('评论');
				$this.removeAttr('disabled');
				$('#textcomment').focus();

				//出验证码
				if (msg.iscode == 1) {

					$('#fast_vcode').show();
					$('#fast_rcode').show();
					$('#fast_rcode').focus();
					$('#fast_iscode').show();
					$('#fast_iscode').val('1');
				}

				globalTip(msg);
			}

		}
	})

	return false
})


//快速回复快捷键提交
$(document).on('keydown', '#textarea_inner', function (event) {

	if (event.ctrlKey && event.keyCode == 13) {

		$('#rep-comment').trigger('click');
		return false;
	}

})


//回复作品的评论
$(document).on('click', '#rep-comment', function () {
	var code = $('input[name=recode]').val().trim();
	var iscode = $('input[name=reiscode]').val().trim();
	var codelen = code.length;
	if (iscode == 1) {
		if (!codelen) {
			globalTip({ 'msg': '请填写验证码!', 'setTime': 3 });
			return false;
		}
		if (codelen != 4) {
			globalTip({ 'msg': '验证码长度不符合!', 'setTime': 3 });
			return false;
		}
	}
	$this = $(this);
	//内容不为空的时候，点击加菊花
	$this.addClass('loading');
	$this.text('');
	$this.attr('disabled', true);
	var rContent = $('#textarea_inner').val();
	$.ajax({
		type: 'post',
		url: '/repComment',
		data: { 'pid': pid, 'ownerid': uid, 'commid': comid, 'replayid': replayid, 'content': rContent, 'code': code, 'iscode': iscode },
		dataType: 'json',
		success: function (msg) {

			if (msg.code == 1) {
				$(".machine").show();
				$(".machine .ma").removeClass("hidden").addClass("show");
				$(".machine .ope").removeClass("hidden").addClass("show");
				window.setTimeout(function () {
					$(".machine .light").show();
				}, 1000);
				window.setTimeout(function () {
					$(".machine .ma").removeClass("show").addClass("hidden");
					$(".machine .ope").removeClass("show").addClass("hidden");
					$(".machine .light").hide();
				}, 3000);
				globalTip(msg);
				//隐藏验证码
				$('#recode').focus();
				$('#revcode').hide();
				$('#recode').hide();
				$('#reiscode').hide();
				$('#reiscode').val('0');

				$('#textarea_inner').val('');
				$this.parents(".comment-form-inner").slideUp();

				//内容不为空的时候，点击加菊花
				$this.removeClass('loading');
				$this.text('回复');
				$this.removeAttr('disabled');
				$('#rep-num').text(500);

				var html;
				html = '<li class="item cl" id="com-' + msg.commentid + '">';
				html += '<div class="comment-num"><i class="icon-hexagon-up up com-like" id="' + msg.commentid + '" rel="' + msg.id + '" data="add"><a class="num" href="javascript:;">0</a></i><i class="icon-hexagon-down down com-report" id="' + msg.commentid + '" rel="' + msg.id + '" data="add"></i></div>';
				html += '<a class="avatar-sm z" title="' + msg.username + '" href="https://i.ui.cn/ucenter/' + msg.id + '.html"><img src="' + msg.head + '" alt="' + msg.username + '"></a>';
				html += '<div class="comment-cont comment-data"><h5 class="user"><a href="javascript:;">' + msg.username + '</a><time>' + msg.time + '</time></h5>';
				html += '<div class="retext"><p><span>@' + msg.replyname + '：</span>' + msg.replycont + '</p></div>';
				html += '<p class="text">' + msg.content + '</p><div class="oper cl"><a class="comment-toggle p-replay" href="javascript:;" id="' + msg.commentid + '" _rel="' + msg.id + '"><i class="icon-comment"></i>回复</a><a href="javascript:;" class="com-sina" rel="' + msg.username + '">分享</a><span class="oper-hide"><a href="javascript:;" class="del-comm" id="' + msg.commentid + '" rel="' + msg.pid + '" _rel="' + msg.id + '">删除评论</a></span></div></div></li>';

				$('#com-list').prepend(html).slideDown();


			} else {
				//内容不为空的时候，点击加菊花
				$this.removeClass('loading');
				$this.text('回复');
				$this.removeAttr('disabled');
				$('#textarea_inner').focus();

				//出验证码
				if (msg.iscode == 1) {
					$('#recode').focus();
					$('#revcode').show();
					$('#recode').show();
					$('#reiscode').val('1');
				}
				globalTip(msg);
			}

		}
	})

	return false
})





//删除评论
$(document).on('click', '.del-comm', function () {
	var cid = $(this).attr('id');
	var pid = $(this).attr('rel');
	var uid = $(this).attr('_rel');

	if (confirm("确定要删除评论吗？")) {

		$.ajax({
			type: 'post',
			url: '/delComment',
			data: { 'comid': cid, 'pid': pid, 'uid': uid },
			dataType: 'json',
			success: function (msg) {

				if (msg.code == 1) {

					globalTip(msg);

					$('#com-' + cid).slideUp('slow', function () {
						$(this).remove();
					});
				} else if (msg.code == 2) {
					globalTip(msg);

					$('#com-' + cid).slideUp('slow', function () {
						$(this).remove();
					});

					$('#vcode').hide();
					$('#rcode').hide();
					$('#iscode').val('0');

				} else {

					globalTip(msg);
				}
			}
		})

	}

	return false;
});


//评论举报提交
$(document).on('click', '#report-submit', function () {
	comid = comid;
	var examine_type = $("input[name='examinetype']:checked").val();
	var contentVal = $('textarea[name=examinecomment]').val();
	var pid = $('.compid').attr('pid');
	if (examine_type == 4 && contentVal == '') {
		globalTip({ 'msg': '其他原因举报？给个理由先～～', 'setTime': 3 });
		return false;
	}

	$.ajax({
		type: 'post',
		url: '/reportComment',
		data: { 'cid': comid, 'tid': examine_type, 'content': contentVal, pid: pid },
		dataType: 'json',
		success: function (data) {

			if (data.code == 1) {
				globalTip(data);
				$('#modal-inform').removeClass("in");
				$('.modal-backdrop').remove();
				$('body').removeClass("modal-open");
				$('body').css('padding-right', '0');

				$('#modal-inform').find('textarea').val('');
				$('#c-' + comid).html('已举报（' + data.num + '）');
				$('#c-' + comid).removeAttr('data-target');
			} else {
				globalTip(data);
				return false;
			}
		}
	});
})

//评论举报快捷键提交
$(document).on('keydown', '#textarea-report', function (event) {

	if (event.ctrlKey && event.keyCode == 13) {

		$('#report-submit').trigger('click');
		return false;
	}

})


//查看更多评论（详情页）
page = 2;
$('.h-list-more').click(function () {
	var $obj = $(this),
		pid = $obj.attr('id');
	$obj.hide();
	$.ajax({
		url: '/ajaxCom',
		type: 'post',
		dataType: 'json',
		data: { 'pid': pid, 'page': page },
		success: function (msg) {
			$obj.show();
			if (msg.stats == 'ok') {
				$obj.parent('.more-border').before(msg.html);
				if(forb_id==1){
					$(".comment-cont .oper a.p-replay").hide();
					$(".comment-cont .oper a.com-sina").css({"padding-left":0});
				}
				if (msg.nomore == 1) {
					$obj.unbind();
					$obj.text('没有更多了');
					return false;
				} else {
					page++;
				}
			} else if (msg.stats == 'more') {
				globalTip(msg);
				$obj.unbind();
				$obj.text('没有更多了');
				return false;
			} else {
				globalTip(msg);
				$obj.text('加载失败,请重试!');
				return false;
			}
			$obj.text('更多评论');
		}
	});
});

//评论赞同
$(document).on('click', '.com-like', function () {

	var $this = $(this);
	var comid = $this.attr('id');
	var ownerid = $this.attr('rel');
	var stats = $this.attr('data');

	var num = parseInt($this.parent('.comment-num').find('a').text());

	//未登录或者账号被禁用
	if (!userid) {

		globalTip({ 'msg': '没登录不能操作,去登录以后再来吧！', 'setTime': 3, 'URL': 'https://ui.cn/login.html', 'jump': true });
		return false;
	}

	$.ajax({
		type: 'post',
		url: '/likeComment',
		data: { 'comid': comid, 'uid': ownerid, 'state': stats },
		dataType: 'json',
		success: function (msg) {
			//赞同
			if (msg.code == 1) {
				globalTip(msg);

				if (stats == 'add') {
					$this.attr('data', 'del');
					$this.addClass('on');
					num = num + 1;

					if (msg.is_like == 'ok') {

						$this.parent('.comment-num').find('.com-report').removeClass('on');
						$this.parent('.comment-num').find('.com-report').attr('data', 'add');
						$this.parent('.comment-num').find('.comment-num-down').removeClass('on');
						repnum = parseInt($this.parent('.comment-num').find('.comment-num-down').text());
						if (repnum > 1) {
							repnum = repnum - 1;
						} else {
							repnum = 0;
						}
						$this.parent('.comment-num').find('.comment-num-down').text(repnum);
					}

				} else {
					$this.attr('data', 'add');
					$this.removeClass('on');
					if (num > 1) {
						num = num - 1;
					} else {
						num = 0;
					}

				}

				$this.parent('.comment-num').find('a').text(num);


			} else {
				globalTip(msg);
			}

		}

	})

	return false;
})

//评论反对
$(document).on('click', '.com-report', function () {

	var $this = $(this);
	var comid = $this.attr('id');
	var ownerid = $this.attr('rel');
	var stats = $this.attr('data');

	var num = parseInt($this.parent('.comment-num').find('.comment-num-down').text());

	//未登录或者账号被禁用
	if (!userid) {

		globalTip({ 'msg': '没登录不能操作,去登录以后再来吧！', 'setTime': 3, 'URL': 'https://ui.cn/login.html', 'jump': true });
		return false;
	}

	$.ajax({
		type: 'post',
		url: '/unlikeComment',
		data: { 'comid': comid, 'uid': ownerid, 'state': stats },
		dataType: 'json',
		success: function (msg) {
			//赞同
			if (msg.code == 1) {
				globalTip(msg);
				var oppose = $this.next(".comment-num-down");
				if (stats == 'add') {
					$this.addClass('on');
					$this.attr('data', 'del');
					num = num + 1;
					$this.parent('.comment-num').find('.comment-num-down').text(num);
					oppose.addClass("on");

					if (msg.is_like == 'ok') {

						$this.parent('.comment-num').find('.com-like').removeClass('on');
						$this.parent('.comment-num').find('.com-like').attr('data', 'add');
						likenum = parseInt($this.parent('.comment-num').find('a').text());
						if (likenum > 1) {
							likenum = likenum - 1;
						} else {
							likenum = 0;
						}
						$this.parent('.comment-num').find('a').text(likenum);
					}

				} else {
					$this.removeClass('on');
					$this.attr('data', 'add');
					total_num = num - 1;
					if (total_num <= 0) {
						total_num = 0
					}

					$this.parent('.comment-num').find('.comment-num-down').text(total_num);

					oppose.removeClass("on");
				}

			} else {
				globalTip(msg);
			}

		}

	})

	return false;
})



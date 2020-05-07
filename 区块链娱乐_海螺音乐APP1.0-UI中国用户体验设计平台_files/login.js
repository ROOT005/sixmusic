$(function () {
	var xurl = "https://ui.cn";
	var tab = 'account_number';
	// 选项卡切换
	$(".account_number").click(function () {
		$('.tel-warn').addClass('hide');
		tab = $(this).attr('class').split(' ')[0];
		checkBtn();
		$(this).addClass("on");
		$(".message").removeClass("on");
		$(".form2").addClass("hide");
		$(".form1").removeClass("hide");
	});
	// 选项卡切换
	$(".message").click(function () {
		$('.tel-warn').addClass('hide');
		tab = $(this).attr('class').split(' ')[0];
		$(this).addClass("on");
		$(".account_number").removeClass("on");
		$(".form2").removeClass("hide");
		$(".form1").addClass("hide");
	});

	$('#num').keyup(function (event) {
		$('.tel-warn').addClass('hide');
		checkStatus();
	});

	$('#pass').keyup(function (event) {
		$('.tel-warn').addClass('hide');
		checkStatus();
	});
	var SlideVerifyPlug = window.slideVerifyPlug;
	var g = "", g_m = "";
	var slideVerify = new SlideVerifyPlug('#verify-wrap2', {
		wrapWidth: '340',//设置 容器的宽度 ,不设置的话，会设置成100%，需要自己在外层包层div,设置宽度，这是为了适应方便点；
		initText: '请向右滑动滑块',  //设置  初始的 显示文字
		sucessText: '验证通过',//设置 验证通过 显示的文字
		getSuccessState: function (res) {
			if (res) {
				g = res;
				checkStatus();
			}
			//当验证完成的时候 会 返回 res 值 true，只留了这个应该够用了 

			//    if(slideVerify.slideFinishState){
			// 		$('.value').html(slideVerify.slideFinishState)
			//    }
		}
	});
	var slideVerify2 = new SlideVerifyPlug('#verify-wrap', {
		wrapWidth: '340',//设置 容器的宽度 ,不设置的话，会设置成100%，需要自己在外层包层div,设置宽度，这是为了适应方便点；
		initText: '请向右滑动滑块',  //设置  初始的 显示文字
		sucessText: '验证通过',//设置 验证通过 显示的文字
		getSuccessState: function (res) {
			if (res) {
				g_m = res;
				var phone = $.trim($('#num2').val());
				if (phone != "") {
					$.ajax({
						url: 'https://ui.cn/mblogncheck',
						type: 'post',
						dataType: 'json',
						async: true,
						data: { phone: phone, type: "login" },
						success: function (data) {
							if (data.code == '1') {
								$(".m-code").removeClass("hide");
								$('.num2-err').addClass('hide');
							} else {
								$('.num2-err').removeClass('hide').find("em").text(data.msg);
								slideVerify.resetVerify();
								$(".log-btn").addClass("off");
								g_m = false;
							}
						},
						error: function () {
							status = false;
							// return false;
						}
					});
				} else {
					$(".m-code").addClass("hide");
					$('.num2-err').removeClass('hide').find("em").text("请输入手机号！");
				}
			}
		}
	});
	$('#veri2').keyup(function (event) {
		$('.tel-warn').addClass('hide');
		checkBtn();
	});

	$('#num2').keyup(function (event) {
		$('.tel-warn').addClass('hide');
		if ($(this).val().length == 11) {
			checkBtn();
		} else {
			$(".m-code").addClass("hide");
			return false;
		}

	});

	$('#veri-code').keyup(function (event) {
		console.log($(this).val().length);
		console.log(tab);
		if($(this).val().length==6){
			$(".log-btn").removeClass("off");
			sendBtn();
		}else{
			if(!$(".log-btn").hasClass("off")){
				$(".log-btn").addClass("off");
			}
		}
		// $('.tel-warn').addClass('hide');
		// if ($("#num2").val() != "" && g_m == true && $(this).val() != "") {
		// 	$(".log-btn").removeClass("off");
		// 	sendBtn();
		// }

	});
	function checkStatus() {
		var inp = $.trim($('#num').val());
		var pass = $.trim($('#pass').val());
		if (!$("#verify-wrap2").hasClass("hide")) {
			if (g) {
				if (inp != "" && pass != "") {
					$.ajax({
						url: 'https://ui.cn/logncheck',
						type: 'post',
						dataType: 'json',
						async: true,
						data: { phone: inp },
						success: function (data) {
							console.log(data);
							if (data.code == '1') {
								$(".log-btn").removeClass("off");
								$('.num-err').addClass('hide');
								checkBtn();
							} else {
								$('.num-err').removeClass('hide').find("em").text(data.msg);
								slideVerify.resetVerify();
								$(".log-btn").addClass("off");
								g = false;
							}
						},
						error: function () {
							status = false;
							// return false;
						}
					});
				}
			} else {
				$(".log-btn").addClass("off")
			}
		} else {
			if (inp != "" && pass != "") {
				$(".log-btn").removeClass("off")
			} else {
				$(".log-btn").addClass("off")
			}
			sendBtn();
		}


	}
	// 按钮是否可点击
	function checkBtn() {
		$(".log-btn").off('click');
		if (tab == 'account_number') {
			var inp = $.trim($('#num').val());
			var pass = $.trim($('#pass').val());
			if (inp != '' && pass != '') {
				if (!$('#verify-wrap2').hasClass('hide')) {
					if (g == true) {
						$(".log-btn").removeClass("off");
						sendBtn();
					} else {
						$(".log-btn").addClass("off");
					}
				} else {
					$(".log-btn").removeClass("off");
					sendBtn();
				}
			} else {
				$(".log-btn").addClass("off");
			}
		} else {
			var phone = $.trim($('#num2').val());
			var veri_code = $.trim($('#veri-code').val());
			if (g_m) {
				if (phone != "") {
					$.ajax({
						url: 'https://ui.cn/mblogncheck',
						type: 'post',
						dataType: 'json',
						async: true,
						data: { phone: phone, type: "login" },
						success: function (data) {
							if (data.code == '1') {
								$('.num2-err').addClass('hide');
								$(".m-code").removeClass("hide");
							} else {
								globalTip({ 'msg': data.msg, 'setTime': 3 });
								$('.num2-err').removeClass('hide').find("em").text(data.msg);
								$(".m-code").addClass("hide");
								$(".log-btn").addClass("off");
							}
						},
						error: function () {
							status = false;
							// return false;
						}
					});
				}
			} else {
				$(".log-btn").addClass("off")
			}

			if (phone != '' && g_m == "true" && veri_code != "") {
				$(".log-btn").removeClass("off");
				sendBtn();
			} else {
				$(".log-btn").addClass("off");
			}
		}
	}

	function checkAccount(username) {
		if (username == '') {
			$('.num-err').removeClass('hide').find("em").text('请输入账户');
			return false;
		} else {
			$('.num-err').addClass('hide');
			return true;
		}
	}

	function checkPass(pass) {
		if (pass == '') {
			$('.pass-err').removeClass('hide').text('请输入密码');
			return false;
		} else {
			$('.pass-err').addClass('hide');
			return true;
		}
	}

	function checkCode(code) {
		if (code == '') {
			// $('.tel-warn').removeClass('hide').text('请输入验证码');
			return false;
		} else {
			// $('.tel-warn').addClass('hide');
			return true;
		}
	}

	function checkPhone(phone) {
		var status = true;
		if (phone == '') {
			$('.num2-err').removeClass('hide').find("em").text('请输入手机号');
			return false;
		}
		var param = /^1[3456789]\d{9}$/;
		if (!param.test(phone)) {
			// globalTip({'msg':'手机号不合法，请重新输入','setTime':3});
			$('.num2-err').removeClass('hide');
			$('.num2-err').text('手机号不合法，请重新输入');
			return false;
		}
		$.ajax({
			url: xurl+'/checkPhone',
			type: 'post',
			dataType: 'json',
			async: false,
			data: { phone: phone, type: "login",note:note },
			success: function (data) {
				if (data.code == '0') {
					$('.num2-err').addClass('hide');
					// console.log('aa');
					// return true;
				} else {
					$('.num2-err').removeClass('hide').text(data.msg);
					// console.log('bb');
					status = false;
					// return false;
				}
			},
			error: function () {
				status = false;
				// return false;
			}
		});
		return status;
	}

	function checkPhoneCode(pCode) {
		if (pCode == '') {
			$('.error').removeClass('hide').text('请输入验证码');
			return false;
		} else {
			$('.error').addClass('hide');
			return true;
		}
	}

	// 登录点击事件
	function sendBtn() {
		console.log("ssss");
		if (tab == 'account_number') {
			$(".new_log_btn").unbind("click");
			$(".new_log_btn").on("click", function () {
				if ($(this).hasClass("off")) {
					return false;
				} else {
					// var type = 'phone';
					var inp = $.trim($('#num').val());
					var pass = $.md5($.trim($('#pass').val()));
					if (checkAccount(inp) && checkPass(pass)) {
						var ldata = { userinp: inp, password: pass };
						$.ajax({
							url: 'https://ui.cn/dologin',
							type: 'post',
							dataType: 'json',
							async: true,
							data: ldata,
							success: function (data) {
								if (data.code == '0') {
									// globalTip({'msg':'登录成功!','setTime':3,'jump':true,'URL':'http://www.ui.cn'});
									globalTip(data.msg);
								} else if (data.code == '2') {
									$(".log-btn").off('click').addClass("off");
									$('.pass-err').removeClass('hide').find('em').text(data.msg);
									$('.pass-err').find('i').attr('class', 'icon-warn').css("color", "#d9585b");
									$('#verify-wrap2').removeClass('hide');
									slideVerify.resetVerify();
									g = false;
									return false;
								} else if (data.code == '3') {
									$(".log-btn").off('click').addClass("off");
									$('.img-err').removeClass('hide').find('em').text(data.msg);
									$('.img-err').find('i').attr('class', 'icon-warn').css("color", "#d9585b");
									$('.code').removeClass('hide');
									$('.code').find('img').attr('src', '/verifyCode?' + Math.random()).click(function (event) {
										$(this).attr('src', '/verifyCode?' + Math.random());
									});
									return false;
								} else if (data.code == '1') {
									$(".log-btn").off('click').addClass("off");
									$('.num-err').removeClass('hide').find('em').text(data.msg);
									$('.num-err').find('i').attr('class', 'icon-warn').css("color", "#d9585b");
									slideVerify.resetVerify();
									g = false;
									return false;
								}
							},
							error: function () {

							}
						});
					} else {
						return false;
					}
				}
			});
		} else {
			$(".new_log_btn").unbind('click');
			$(".new_log_btn").on("click", function () {
				if ($(this).hasClass("off")) {
					return false;
				} else {
					// var type = 'phone';
					var phone = $.trim($('#num2').val());
					var pcode = $.trim($('#veri-code').val());
					if (checkPhone(phone) && checkPass(pcode)) {
						$.ajax({
							url: xurl+'/plogin',
							type: 'post',
							dataType: 'json',
							async: true,
							data: { phone: phone, code: pcode },
							success: function (data) {
								if (data.code == '0') {
									// globalTip({'msg':'登录成功!','setTime':3,'jump':true,'URL':'http://www.ui.cn'});
									globalTip(data.msg);
								} else if (data.code == '1') {
									$(".log-btn").off('click').addClass("off");
									$('.num2-err').removeClass('hide').text(data.msg);
									return false;
								} else if (data.code == '2') {
									$(".log-btn").off('click').addClass("off");
									$('.error').removeClass('hide').text(data.msg);
									return false;
								}
							},
							error: function () {

							}
						});
					} else {
						$(".log-btn").off('click').addClass("off");
						// $('.tel-warn').removeClass('hide').text('登录失败');
						return false;
					}
				}

			});
		}
	}

	// 登录的回车事件
	$(window).keydown(function (event) {
		if (event.keyCode == 13) {
			$('.log-btn').trigger('click');
		}
	});


	$(".form-data").delegate(".send", "click", function () {
		var phone = $.trim($('#num2').val());
		// var note = $('#note').val();
		if (checkPhone(phone)) {
			$.ajax({
				url: xurl+'/sendcode',
				type: 'post',
				dataType: 'json',
				async: true,
				data: { phone: phone, type: "login", note: note },
				success: function (data) {
					if (data.code == '1') {
						var oTime = $(".form-data .time"),
							oSend = $(".form-data .send"),
							num = parseInt(oTime.text()),
							oEm = $(".form-data .time em");
						$(".form-data .send").hide();
						oTime.removeClass("hide");
						var timer = setInterval(function () {
							var num2 = num -= 1;
							oEm.text(num2);
							if (num2 == 0) {
								clearInterval(timer);
								oSend.text("重新发送验证码");
								oSend.show();
								oEm.text("120");
								oTime.addClass("hide");
							}
						}, 1000);
					} else{
						globalTip({ 'msg': '验证码发送失败!', 'setTime': 3 });
					}
				},
				error: function () {
					globalTip({ 'msg': '验证码发送失败!', 'setTime': 3 });
				}
			});

		}
	});
	if(!nopop){
		if(!userid){
			$(".login-fixed").show();
			$("body").css("overflow","hidden");
		}
	}
	$(".login-fixed .cancle").click(function(){
		$(".login-fixed").hide();
		$("body").css("overflow","auto");
	})	
});
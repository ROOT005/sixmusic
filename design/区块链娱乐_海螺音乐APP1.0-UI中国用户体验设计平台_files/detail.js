	//发送私信
	$('#comm-submit').on('click', function(){
		
		var $this = $(this);
		var contentVal = $('textarea[name=lettersval]').val();

		if(!userid){
			globalTip({'msg':'登录后才能发私信！','setTime':3,'URL':'https://ui.cn/login.html','jump':true});
			return false;
		}
		
		if ( contentVal == '' ) {
			globalTip({'msg':'内容不能为空！','setTime':3});
			$('textarea[name=lettersval]').focus();
			return false;
		}

		if(contentVal.length >= 200){
			globalTip({'msg':'内容不能超过200字!','setTime':3});
			$('textarea[name=lettersval]').focus();
			return false;
		}

		//内容不为空的时候，点击加菊花
		$this.addClass('loading');
		$this.text('');

		var lettersData = {
			fromid		:	userid,
			toid		:	uid,
			content		:	contentVal
		};
		$.ajax({
			type: "post",
	        url:"https://i.ui.cn/jsonpSendlt",
	        dataType:'jsonp',  
	        data:lettersData,  
	        success:function(result) {  
	            if(result.code == 1){
					globalTip(result);

					$this.removeClass('loading');
					$this.text('确定');

					//关闭弹窗，恢复样式
					$('#modal-letter').removeClass("in");
					$('.modal-backdrop').remove();
					$('body').removeClass("modal-open");
					$('body').css('padding-right','0');

					//输入框清空
					$('textarea[name=lettersval]').val('');	
				}else{
					$this.removeClass('loading');
					$this.text('确定');

					$('textarea[name=lettersval]').focus();
					if(result.status == 10) {
                        var status = confirm("邮箱未激活不能发送私信，是否激活邮箱？");
                        if (status) {
                            window.location = 'https://account.ui.cn/accountinfo.html';
						}
						return false;
                    }
					globalTip(result);

					// $this.removeClass('loading');
					// $this.text('确定');

					// $('textarea[name=lettersval]').focus();
					return false;
				}
	        },
	        timeout:3000
	    });
		return false;
	});


	//私信快捷键提交
	$(document).on('keydown','#textarea-letter',function(event){

		if(event.ctrlKey && event.keyCode == 13) {
	        
	        $('#comm-submit').trigger('click');
	        return false;
		}
		
	})


	//作品收藏
	$(document).on('click', '#p-collect', function() {
		var $this = $(this);
		var data = $this.attr('data');
		var num = parseInt($('#favnum').text());		

		// 添加收藏
		if(data == 'add'){
			$.ajax({
				type:'post',
	            url:'/collect',
	            data:{'pid':pid,'ownerid':uid,'act':'add'},
	            dataType:'json',
	            success:function(msg){
	            	if(msg.code == 1){
	            		globalTip(msg);
	            		$this.addClass('on');
						$this.find('strong').text('已收藏');
						$(".ping-num").find('b').text('已收藏');
						$this.attr('data','del');
						$(".ping-num").attr("data","del");
	                	num = num+1;
						$('#favnum,#fav_num1').text(num);
						$(".file-out").show();
						$(".file-out .ope-l").removeClass("hide");
						$(".file-out .more-ope").addClass("hide");
						var t = "";
						$(".file-out .ope-l a.z span").off("click").click(function(){
							var str = "";
							$.ajax({
								url:"https://i.ui.cn/Uweb/Api/allBookMarkList",
								type:"get",
								xhrFields: {
						　　　　　　withCredentials: true
						　　　　},
								dataType:"json",
								data:{"projectid":pid,"type":type},
								success:function(data){
									t=data.type;
									if(data.code==1&&data.data){
										$.each(data.data,function(i,k){
											str+='<li class="cl pos">';
											str+='<div class="togChoose cl">';
											if(k.has==1){
												str+='<div class="z cl cli-choose on" data-id="'+k.id+'">';
											}else{
												str+='<div class="z cl cli-choose" data-id="'+k.id+'">';
											}
											str+='<i class="icon-check z"></i>';
											str+='<i class="icon-checked z"></i>';
											str+='<p class="z">'+k.name+'</p>';
											str+='</div>';
											str+='<a href="javascript:;" class="edit y">编辑</a>';
											str+='</div>';
											str+='<div class="abs">';
											str+='<input type="text" value="'+k.name+'">';
											str+='<i class="icon-no notfinish" title="取消"></i>';
                        					str+='<i class="icon-yes finish"  data-id="'+k.id+'" title="完成"></i>';
											str+='</div>';
											str+='</li>';
										});
										$("body").css({"overflow":"hidden"});
										$(".file-out .ope-l").addClass("hide");
										$(".file-out .more-ope").removeClass("hide");
										$(".file-out .files-list").empty().append(str);
									}
								}
							})
						});
						$(".file-out .more-ope .sure").click(function(){
							var arr= []
							$.each($(".files-list li"),function(i,k){
								var node = $(".files-list li").eq(i).find(".cli-choose");
								if(node.hasClass("on")){
									arr.push(node.attr("data-id"));
								}
							});
							$.ajax({
								url:"https://i.ui.cn/Uweb/Api/addToBookmark",
								type:"post",
								dataType:"json",
								xhrFields: {
						　　　　　　withCredentials: true
						　　　　},
								data:{"projectid":pid,"bookmark":arr,"type":t},
								success:function(data){
									if(data.code==1){
										globalTip({"msg":"收藏成功"});
										$(".file-out").hide();
										$("body").css({"overflow":"auto"});
									}
								}
							});
						});
						 // 修改文件夹名称
						 var gloabalName = "";
						 $(".file-out .more-ope").delegate(".edit","click",function(){
							var _this = $(this);
							_this.hide();
							_this.parent("div.togChoose").siblings(".abs").show();
							_this.parent("div.togChoose").siblings(".abs").find("input").focus();
							gloabalName =$.trim(_this.siblings(".cli-choose").find("p").text());
							_this.parent("div.togChoose").siblings(".abs").find("input").val(gloabalName);
						});
						$(".file-out .more-ope").delegate(".finish","click",function(){
							var _this = $(this);
							var fatherNode = _this.parent("div.abs");
							var bmId = _this.attr("data-id");
							var fileName = _this.siblings("input").val();
							if(gloabalName==fileName){
								fatherNode.hide();
								fatherNode.siblings(".togChoose").find(".edit").show();
							}else{
								if(_this.siblings("input").hasClass("new")){
									$.ajax({
										url:"https://i.ui.cn/Uweb/Api/createBookMark",
										type:"post",
										dataType:"json",
										xhrFields: {
							　　　　　　		withCredentials: true
							　　　　	},
										data:{"name":fileName,"type":t},
										success:function(data){
											if(data.code==1){
												globalTip({"msg":data.msg});
												fatherNode.hide();
												fatherNode.siblings(".togChoose").find(".cli-choose").attr("data-id",data.data);
												_this.attr("data-id",data.data);
												fatherNode.siblings(".togChoose").find(".edit").hide();
												fatherNode.siblings(".togChoose").find("p.z").text(fileName);
												_this.siblings("input").removeClass("new");
											}else{
												globalTip({"msg":data.msg});
												_this.siblings("input").focus();
											}
										}
									})
								}else{
									$.ajax({
										url:"https://i.ui.cn/index.php/Uweb/Api/editbookmark",
										type:"post",
										dataType:"json",
										xhrFields: {
							　　　　　　withCredentials: true
							　　　　},
										data:{"name":fileName,"id":bmId},
										success:function(data){
											if(data.code==1){
												globalTip({"msg":data.msg});
												fatherNode.hide();
												fatherNode.siblings(".togChoose").find(".cli-choose").attr("data-id",data.data);
												fatherNode.siblings(".togChoose").find(".edit").show();
												fatherNode.siblings(".togChoose").find("p.z").text(fileName);
											}else{
												globalTip({"msg":data.msg});
											}
										}
									})
								}
							}
							
							
						});
						$(".file-out .more-ope").delegate(".notfinish","click",function(){
							var _this = $(this);
							var fatherNode = _this.parent("div.abs");
							var ept = fatherNode.siblings(".togChoose").find(".cli-choose").attr("data-id");
							if(ept>0){
								fatherNode.hide();
								fatherNode.siblings(".togChoose").find(".edit").show();
							}else{
								_this.parents("li").remove();
							} 
						});
						$(".file-out .more-ope").delegate("input","blur",function(){
							var inValue = $.trim($(this).val());
							var putValue = $.trim($(this).parent("div.abs").siblings("div.togChoose").find(".cli-choose p").text());
							if($(this).hasClass("new")){
								if(inValue==""){
									$(this).parents("li").remove();
								}
							}else{
								if(inValue==putValue){
									$(this).parent("div.abs").hide();
								}
							}
						});
						$(".file-out .more-ope").delegate(".ope a.z","click",function(){
							var str = '<li class="cl pos">';
								str += '<div class="togChoose cl">';
								str += '<div class="z cl cli-choose on">';
								str += '<i class="icon-check z"></i>';
								str += '<i class="icon-checked z"></i>';
								str += '<p class="z">默认收藏夹</p>';
								str += '</div>';
								str += '<a href="javascript:;" class="edit y">编辑</a>';
								str += '</div>';
								str += '<div class="abs" style="display:block">';
								str += '<input type="text" class="new" autofocus>';
								str+='<i class="icon-no notfinish" title="取消"></i>';
                				str+='<i class="icon-yes finish" title="完成"></i>';
								str += '</div>';
								str += '</li>';
								$(".file-out .more-ope .files-list").prepend(str);
								setTimeout("$('.file-out .more-ope .files-list input.new').focus()",500);
						});
	            	}else{

	            		globalTip(msg);
	            	}
	                
					return false;
	            }
			})
		}

		// 取消收藏
		if(data == 'del'){
			$.ajax({
				type:'post',
	            url:'/collect',
	            data:{'pid':pid,'ownerid':uid,'act':'del'},
	            dataType:'json',
	            success:function(msg){

	            	if(msg.code == 1){

	            		globalTip(msg);
	            		$this.removeClass('on');
						$this.find('strong').text('收藏');
						$(".ping-num").find('b').text('收藏');
	                	$this.attr('data','add');
						$(".ping-num").attr("data","add");
	                	num = num-1;
	                	if(num < 0){
							num = 0;
						}
	                	$('#favnum,#fav_num1').text(num);
	            	}else{

	            		globalTip(msg);
	            	}
	                
					return false;
	            }
			})
		}
	
	});
	$(".file-out .cancle,.file-out .icon-close").click(function(){
		$(".file-out").hide();
		$("body").css({"overflow":"auto"});
    });
    $(".file-out").delegate(".togChoose .cli-choose","click",function(){
        $(this).toggleClass("on");
    });
	// 右侧点击出现作品收藏
	$(document).on('click', '.ping-num', function() {
		var $this = $(this);
		var data = $this.attr('data');
		var num = parseInt($('#favnum').text());		

		// 添加收藏
		if(data == 'add'){

			$.ajax({
				type:'post',
	            url:'/collect',
	            data:{'pid':pid,'ownerid':uid,'act':'add'},
	            dataType:'json',
	            success:function(msg){

	            	if(msg.code == 1){
						// if(msg.actnum&&msg.actnum<5){
						// 	$(".sun").show();
						// 	window.setTimeout(function(){
						// 		$(".sun").hide();
						// 	},3000);
						// }
	            		globalTip(msg);
	            		$("#p-collect").addClass('on');
						$("#p-collect").find('strong').text('已收藏');
						$(".ping-num").find('b').text('已收藏');
	                	$("#p-collect,.ping-num").attr('data','del');

	                	num = num+1;
						$('#favnum,#fav_num1').text(num);
						$(".file-out").show();
						$(".file-out .ope-l").removeClass("hide");
						$(".file-out .more-ope").addClass("hide");
						var t = "";
						$(".file-out .ope-l a.z span").off("click").click(function(){
							var str = "";
							$.ajax({
								url:"https://i.ui.cn/Uweb/Api/allBookMarkList",
								type:"get",
								xhrFields: {
						　　　　　　withCredentials: true
						　　　　},
								dataType:"json",
								data:{"projectid":pid,"type":type},
								success:function(data){
									t=data.type;
									if(data.code==1&&data.data){
										$.each(data.data,function(i,k){
											str+='<li class="cl pos">';
											str+='<div class="togChoose cl">';
											if(k.has==1){
												str+='<div class="z cl cli-choose on" data-id="'+k.id+'">';
											}else{
												str+='<div class="z cl cli-choose" data-id="'+k.id+'">';
											}
											str+='<i class="icon-check z"></i>';
											str+='<i class="icon-checked z"></i>';
											str+='<p class="z">'+k.name+'</p>';
											str+='</div>';
											str+='<a href="javascript:;" class="edit y">编辑</a>';
											str+='</div>';
											str+='<div class="abs">';
											str+='<input type="text" value="'+k.name+'">';
											str+='<i class="icon-no notfinish" title="取消"></i>';
                        					str+='<i class="icon-yes finish"  data-id="'+k.id+'" title="完成"></i>';
											str+='</div>';
											str+='</li>';
										});
										$("body").css({"overflow":"hidden"});
										$(".file-out .ope-l").addClass("hide");
										$(".file-out .more-ope").removeClass("hide");
										$(".file-out .files-list").empty().append(str);
									}
								}
							})
						});
						$(".file-out .more-ope .sure").click(function(){
							var arr= []
							$.each($(".files-list li"),function(i,k){
								var node = $(".files-list li").eq(i).find(".cli-choose");
								if(node.hasClass("on")){
									arr.push(node.attr("data-id"));
								}
							});
							$.ajax({
								url:"https://i.ui.cn/Uweb/Api/addToBookmark",
								type:"post",
								dataType:"json",
								xhrFields: {
						　　　　　　withCredentials: true
						　　　　},
								data:{"projectid":pid,"bookmark":arr,"type":t},
								success:function(data){
									if(data.code==1){
										globalTip({"msg":"收藏成功"});
										$(".file-out").hide();
										$("body").css({"overflow":"auto"});
									}
								}
							});
						});
						var gloabalName = "";
						 // 修改文件夹名称
						 $(".file-out .more-ope").delegate(".edit","click",function(){
							var _this = $(this);
							_this.hide();
							_this.parent("div.togChoose").siblings(".abs").show();
							gloabalName =$.trim(_this.siblings(".cli-choose").find("p").text());
							_this.parent("div.togChoose").siblings(".abs").find("input").focus();
							_this.parent("div.togChoose").siblings(".abs").find("input").val(gloabalName);
						});
						$(".file-out .more-ope").delegate(".finish","click",function(){
							var _this = $(this);
							var fatherNode = _this.parent("div.abs");
							var bmId = _this.attr("data-id");
							var fileName = _this.siblings("input").val();
							if(gloabalName==fileName){
								fatherNode.hide();
								fatherNode.siblings(".togChoose").find(".edit").show();
							}else{
								if(_this.siblings("input").hasClass("new")){
									$.ajax({
										url:"https://i.ui.cn/Uweb/Api/createBookMark",
										type:"post",
										dataType:"json",
										xhrFields: {
							　　　　　　		withCredentials: true
							　　　　	},
										data:{"name":fileName,"type":t},
										success:function(data){
											if(data.code==1){
												globalTip({"msg":data.msg});
												fatherNode.hide();
												fatherNode.siblings(".togChoose").find(".cli-choose").attr("data-id",data.data);
												fatherNode.siblings(".togChoose").find(".edit").hide();
												fatherNode.siblings(".togChoose").find("p.z").text(fileName);
												_this.attr("data-id",data.data)
												_this.siblings("input").removeClass("new");
											}else{
												globalTip({"msg":data.msg});
												_this.siblings("input").focus();
											}
										}
									})
								}else{
									$.ajax({
										url:"https://i.ui.cn/index.php/Uweb/Api/editbookmark",
										type:"post",
										dataType:"json",
										xhrFields: {
							　　　　　　withCredentials: true
							　　　　},
										data:{"name":fileName,"id":bmId},
										success:function(data){
											if(data.code==1){
												globalTip({"msg":data.msg});
												fatherNode.hide();
												fatherNode.siblings(".togChoose").find(".cli-choose").attr("data-id",data.data);
												fatherNode.siblings(".togChoose").find(".edit").show();
												fatherNode.siblings(".togChoose").find("p.z").text(fileName);
											}else{
												globalTip({"msg":data.msg});
											}
										}
									})
								}
							}
							
						});
						$(".file-out .more-ope").delegate(".notfinish","click",function(){
							var _this = $(this);
							var fatherNode = _this.parent("div.abs");
							var ept = fatherNode.siblings(".togChoose").find(".cli-choose").attr("data-id");
							if(ept>0){
								fatherNode.hide();
								fatherNode.siblings(".togChoose").find(".edit").show();
							}else{
								_this.parents("li").remove();
							} 
						});
						$(".file-out .more-ope").delegate("input","blur",function(){
							var inValue = $.trim($(this).val());
							var putValue = $.trim($(this).parent("div.abs").siblings("div.togChoose").find(".cli-choose p").text());
							if($(this).hasClass("new")){
								if(inValue==""){
									$(this).parents("li").remove();
								}
							}else{
								if(inValue==putValue){
									$(this).parent("div.abs").hide();
								}
							}
							
						});
						$(".file-out .more-ope").delegate(".ope a.z","click",function(){
							var str = '<li class="cl pos">';
								str += '<div class="togChoose cl">';
								str += '<div class="z cl cli-choose on">';
								str += '<i class="icon-check z"></i>';
								str += '<i class="icon-checked z"></i>';
								str += '<p class="z">默认收藏夹</p>';
								str += '</div>';
								str += '<a href="javascript:;" class="edit y">编辑</a>';
								str += '</div>';
								str += '<div class="abs" style="display:block">';
								str += '<input type="text" class="new" autofocus>';
								str+='<i class="icon-no notfinish" title="取消"></i>';
                				str+='<i class="icon-yes finish" title="完成"></i>';
								str += '</div>';
								str += '</li>';
								$(".file-out .more-ope .files-list").prepend(str);
								setTimeout("$('.file-out .more-ope .files-list input.new').focus()",500);
						});

	            	}else{

	            		globalTip(msg);
	            	}
	                
					return false;
	            }
			})
		}

		// 取消收藏
		if(data == 'del'){

			$.ajax({
				type:'post',
	            url:'/collect',
	            data:{'pid':pid,'ownerid':uid,'act':'del'},
	            dataType:'json',
	            success:function(msg){

	            	if(msg.code == 1){

	            		globalTip(msg);
	            		$("#p-collect").removeClass('on');
						$("#p-collect").find('strong').text('收藏');
						$(".ping-num").find('b').text('收藏');
	                	$("#p-collect,.ping-num").attr('data','add');

	                	num = num-1;
	                	if(num < 0){
							num = 0;
						}
	                	$('#favnum,#fav_num1').text(num);
	            	}else{

	            		globalTip(msg);
	            	}
	                
					return false;
	            }
			})
		}
	
	});

	//下载附件
	$('#p-down').click(function(){

		//未登录或者账号被禁用
		if(!userid){

			globalTip({'msg':'登录后才能下载！','setTime':3,'URL':'https://ui.cn/login.html','jump':true});
			return false;
		}

		if(state == 1){

			globalTip({'msg':'你的账户已被注销,请你使用反馈渠道联系管理员！','setTime':5});
			return false;
		}

	});

	// 作品点赞
	$(document).on('click', '.p-like', function() {

		var data = $(this).attr('data'), 
			$this = $(this);

			$.ajax({
				type:'post',
	            url:'/praise',
	            data:{'pid':pid,'ownerid':uid,'type':data},
	            dataType:'json',
	            success:function(msg){

	            	//登录
	            	if(msg.code == 1){
						// if(msg.actnum&&msg.actnum<5){
							$(".sun").show();
							window.setTimeout(function(){
								$(".sun").hide();
							},3000);
						// }
						console.log(msg);
	            		globalTip(msg);
	            		$('.p-like').attr('data', 'unlike');
						$('.p-like').find('.flower').removeClass().addClass(msg.stat);
						$('.p-like').find('.txt').text('已赞');
						$('.p-like').find('.like-num').text( msg.statInfo );

						$('.hexagon-btn').attr('data','unlike');
						$('.l-num').text(msg.num);
						$('.p-like').find('b').text('已赞');

	            	}else{

	            		globalTip(msg);
	            	}

	            	//未登陆
	            	if(msg.code == 2){
						globalTip(msg);
						
						$('.p-like').find('.flower').removeClass().addClass(msg.stat);
						$('.p-like').find('.txt').text('已赞');
						$('.p-like').find('.like-num').text( msg.statInfo );

						$('.l-num').text(msg.num);
						$('.p-like').find('b').text('已赞');

	            	}else{
	            		globalTip(msg);
	            	}

	            	//取消
	            	if(msg.code == 3){

	            		globalTip(msg);

	            		$('.p-like').attr('data', 'like');
						$('.p-like').find('.flower').removeClass().addClass(msg.stat);
						$('.p-like').find('.txt').text('赞');
						$('.p-like').find('.like-num').text( msg.statInfo );

						$('.hexagon-btn').attr('data','like');
						$('.l-num').text(msg.num);
						$('.p-like').find('b').text('赞');

	            	}else{
	            		globalTip(msg);
	            	}
	                
					return false;
	            }
			})

		return false;
	});
	

	//删除作品
	$(document).on('click','.mobtn .yes',function(){

		// if ( confirm ('确定删除该作品么？') ) {
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

		// }else{

		// 	return false;
		// }

	})
// 判断是不是0
$(document).ready(function(){
	var lP=$('.modal_de .contents p');
	for(var i=0;i<lP.length;i++){
		var Is=lP.eq(i).find('em').text();
		if(Is==0){
			lP.eq(i).remove();
		}
	}
})

	//延迟加载
	$(document).ready(function(){
	      $('.imgloadinglater').lazyload({
            threshold : -100, //距离100像素触发
            effect : "fadeIn" //显示特效
        });
    });

    $(document).ready(function(){
		$(".works-cont p").each(function(){
			if ($(this).has('img').length==0) {
						
	    		$(this).css({
	    			"width": '600px',
	    			"margin": '0 auto'
	    		});
			}else{
				$(this).children('img').css({
					"display": 'inline-block'
				});
				$(this).css({
					"text-align": 'center',
					"margin":"40px auto"
				});
			}	  			   
		});
		$(".works-cont h2").each(function(){
			$(this).css({
    			"width": '600px',
    			"margin": '20px auto'
    		});
		})
		$(".works-cont h3").each(function(){
			$(this).css({
    			"width": '600px',
    			"margin": '20px auto'
    		});
		})


	})
	// 星级评分
	$(function(){
		$(".star-fixed .star li").hover(function(){
            $(this).addClass('hon');
            $(this).prevAll().addClass('hon');
        },function(){
            $(this).removeClass('hon');
            $(this).prevAll().removeClass('hon');
        })

        $(".star-fixed .star li").click(function () {
            $(this).addClass('con');
            $(this).prevAll().addClass('con');
            $(this).nextAll().removeClass('con');
		});
		$(".works-bottom .oper li.recom").click(function(){
			$(".star-fixed").show();
		})
		$(".star-fixed .star .cancle").click(function(){
			$(".star-fixed").hide();
		});
		$("#in").on("input",function(){
			var str = $(this).val();
			var len = str.length;
			if(len>200){
				$(".star-fixed .star .tip em").text(200);
				$(this).val(str.substr(0,200));
			}else{
				$(".star-fixed .star .tip em").text(len);
			}
		});
		$(".star-fixed .star .sure").click(function(){
			var wzd_l = $(".star-fixed .wzd li.con").length;
			var qf_l = $(".star-fixed .qf li.con").length;
			var qfx_l = $(".star-fixed .qfx li.con").length;
			var pb_l = $(".star-fixed .pb li.con").length;
			var con = $("#in").val();
			$.ajax({
				url:"/Mycenter/Api/recommend",
				type:"post",
				dataType:"json",
				data:{"projectid":pid,"wzd":wzd_l,"qfx":qf_l,"jfx":qfx_l,"pbbj":pb_l,"content":con},
				success:function(msg){
					globalTip({"msg":msg.msg});
					if(msg.code==1){
						window.setTimeout(function(){
							window.location.reload();
						},1500)
					}
				}
			})
		});
	})


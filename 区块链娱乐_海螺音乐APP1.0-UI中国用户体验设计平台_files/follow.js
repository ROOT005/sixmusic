//详情页用户关注
$('.z_follow').click(function(){

	if(!userid){
		globalTip({'msg':'登录后才能关注！','setTime':3,'URL':'http://ui.cn/login.html','jump':true});
		return false;

	}else{

		if(userid == uid){

			globalTip({'msg':'不能关注自己啊!','setTime':3});
			return false;

		}else{
	
			var ct, 
				data = $(this).attr('data'), 
				$this = $('.z_follow'), 
				fansNum = parseInt( $('#fan-num').text() );
			// 关注状态
			if ( data == 'follow' ) {
				ct = 'add';
			}
			// 取消关注
			if ( data == 'unfollow' ) {
				ct = 'del';
			};

			var followData = {
				ct		:	ct,
				followid:	uid,	//被关注ID
				uid     :   userid 	//关注ID
			};
			
			if ( data == 'follow' ) {	// 关注
				$.ajax({
					type:'post',
					dataType:'jsonp',
					url:'//i.ui.cn/follow',
					data:followData,
					success:function(data){
						if ( data.code == '1' ) {
						
							// ta 关注俺了吗?
							if( data.isfollow != '2' ){

								$this.attr('_rel','havefollow');
								$this.addClass('z_green');
								$this.find('i').removeClass('icon-add-bold');
								$this.find('i').addClass('icon-ok-sign');

							}else{
								$this.attr('_rel','mutualfollow');
								$this.addClass('z_orange');
								$this.find('i').removeClass('icon-add-bold');
								$this.find('i').addClass('icon-relating-bold');
								
							}
							
							$this.attr('data','unfollow');
							num = fansNum + 1;
							
							$('#fan-num').text( num );
							$('#fan_num').text( num );

						}else{
							globalTip(data);
							return false;
						}
					}

				});

			}

			if ( data == 'unfollow' ) {	// 取消关注
				$.ajax({
					type:'post',
					dataType:'jsonp',
					url:'//i.ui.cn/follow',
					data:followData,
					success:function(data){
						if ( data.code == '1' ) {
							
							$this.attr('_rel','myfollow');
							$this.removeClass('z_green');
							$this.removeClass('z_orange');
							$this.find('i').removeClass();
							$this.find('i').addClass('icon-add-bold');
							$this.attr('data', 'follow');
							num = fansNum - 1;
							if(num < 0){
								num = 0;
							}
							$('#fan-num').text( num );
							$('#fan_num').text( num );

						}else{
							globalTip(data);
							return false;
						}
					}

				});

			}
			return false;
		}
	}
});
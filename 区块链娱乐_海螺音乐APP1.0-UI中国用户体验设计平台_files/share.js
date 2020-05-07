	var _listImgData = {
		content :   '',
		comuser :   '',
		author  :   '',
		url     :   'http://www.ui.cn',
		title   :   '',
		pic     :   '',
		pid     :   0
	};

	function shareSina() {
		var title= '《'+ _listImgData.title +'》 作者：'+ _listImgData.author +' - 更多大图 猛戳: '+_listImgData.url +' (分享来自 @UI中国 - 专业界面交互设计平台)';
		var pic = _listImgData.pic;
		var weibo_url = 'http://service.weibo.com/share/share.php?title='+ encodeURIComponent( title ) +'&source=bookmark&appkey=3664928472&pic='+encodeURIComponent( pic );
		window.open( weibo_url, "_blank", "height=495, width=510, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no" );
	};
	
	
	function shareDouban() {
		var title= '《'+ _listImgData.title +'》 作者：'+ _listImgData.author +' - 更多大图 猛戳: '+_listImgData.url +' (分享来自 @UI中国 - 专业界面交互设计平台)';
		var pic = _listImgData.pic;
		var teng_rul=  'http://www.douban.com/share/service?bm=&image='+ encodeURIComponent( pic ) +'&title='+ encodeURIComponent( title );
		window.open( teng_rul, "_blank", "height=495, width=510, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no" );
	};
	function sharehuaban() {
		var title= '《'+ _listImgData.title +'》 作者：'+ _listImgData.author +' - 更多大图 猛戳: '+_listImgData.url +' (分享来自 @UI中国 - 专业界面交互设计平台)';
		var pic = _listImgData.pic;
		var pid = _listImgData.pid;
		var teng_rul=  'http://huaban.com/bookmarklet/?url=http://www.ui.cn/project.php?id='+pid+'&md=ui.cn&description=&media='+encodeURIComponent( pic )+'&via=3';
		window.open( teng_rul, "_blank", "height=495, width=510, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no" );
	};

	//评论分享
	function shareCommentSina() {
		var title= _listImgData.content+'———'+_listImgData.comuser+'评论了《'+ _listImgData.title +'》，发布者：'+ _listImgData.author +'。欢迎来一起讨论'+_listImgData.url +' (分享来自 @UI中国 - 专业界面交互设计平台)';
		var pic = _listImgData.pic;
		var weibo_url = 'http://service.weibo.com/share/share.php?title='+ encodeURIComponent( title ) +'&source=bookmark&appkey=3664928472&pic='+encodeURIComponent( pic );
		window.open( weibo_url, "_blank", "height=495, width=510, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no" );
	};


	//评论分享
	$(document).on('click','.com-sina',function(){
		
		content = $(this).parents().prev('.text').html();
		_listImgData.url = location.href;
		_listImgData.content = content.substr(0,15);
		_listImgData.comuser = $(this).attr('rel').trim();
		_listImgData.title = $('#p-title').text().trim();
		_listImgData.author = $('#p-author').text().trim();
		shareCommentSina();
	});
	
	$("#share-sina").click(function() {
		_listImgData.url = location.href;
		_listImgData.author = $('#p-author').text().trim();
		_listImgData.title = $('#p-title').text().trim();
		_listImgData.pic = $('#p-content img').attr('src');
		shareSina();
	});
	
	$("#share-douban").click(function() {
		_listImgData.url = location.href;
		_listImgData.author = $('#p-author').text().trim();
		_listImgData.title = $('#p-title').text().trim();
		_listImgData.pic = $('#p-content img').attr('src');
		shareDouban();
	});
	$("#share-huaban").click(function() {
	    _listImgData.pid = $('#wrapper').attr('pid');
		_listImgData.url = location.href;
		_listImgData.author = $('#p-author').text().trim();
		_listImgData.title = $('#p-title').text().trim();
		_listImgData.pic = $('#p-content img').attr('src');
		sharehuaban();
	});

	
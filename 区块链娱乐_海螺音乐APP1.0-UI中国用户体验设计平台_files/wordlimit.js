$(function(){
	// 详情页评论输入字数限制
	$(document).on('focus','.comment-area', function() {
	 	var insertArea = $(this);
	 	var insertRemind = $(this).next(".comment-warn");
	 	         //输入框   限制字数   提醒框
	 	wordLimit(insertArea,500,insertRemind);
	});

	// 个人中心评论输入字数限制
	$(document).on('focus','.us-recent-mess textarea', function() {
	 	var insertArea_ucent = $(this);
	 	var insertRemind_ucent = $(this).next(".area-submit .area-submit-sum");
	 	         //输入框   限制字数   提醒框
	 	wordLimit(insertArea_ucent,200,insertRemind_ucent);
	});

	// 详情页、临摹发私信字数提醒
	$(document).on('focus','#textarea-letter', function() {
	 	var insertArea = $(this);
	 	var insertRemind = $(this).next(".word-warn");
	 	         //输入框   限制字数   提醒框
	 	wordLimit(insertArea,200,insertRemind);
	});

	// 个人中心、粉丝列表发私信字数提醒
	$(document).on('focus','.private-text', function() {
	 	var insertArea = $(this);
	 	var insertRemind = $(this).next(".word-warn");
	 	         //输入框   限制字数   提醒框
	 	wordLimit(insertArea,200,insertRemind);
	});


 	wordLimit = function(obj,num,chg){

 		obj.keyup(function(){
 			var content = obj.val();
				if(obj.val().length > num){
					obj.val(obj.val().substr(0, num));
				}else{
					chg.find("span").text(num - obj.val().length);
				}
 		});
 		if(obj.val().length >= 1 && obj.val().length <=num){
 			chg.find("span").text(num - obj.val().length);
 		}
 	};

});
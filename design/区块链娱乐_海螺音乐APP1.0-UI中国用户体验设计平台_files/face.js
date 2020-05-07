var em;
// $(function(){
    em = [
        {'id':1,'phrase':'[微笑]','url':'uiem001.svg'},
        {'id':2,'phrase':'[憨笑]','url':'uiem002.svg'},
        {'id':3,'phrase':'[愉快]','url':'uiem003.svg'},
        {'id':4,'phrase':'[可怜]','url':'uiem004.svg'},
        {'id':5,'phrase':'[调皮]','url':'uiem005.svg'},
        {'id':6,'phrase':'[流泪]','url':'uiem006.svg'},
        {'id':7,'phrase':'[悲伤]','url':'uiem007.svg'},
        {'id':8,'phrase':'[偷笑]','url':'uiem008.svg'},
        {'id':9,'phrase':'[坏笑]','url':'uiem009.svg'},
        {'id':10,'phrase':'[难过]','url':'uiem010.svg'},
        {'id':11,'phrase':'[发呆]','url':'uiem011.svg'},
        {'id':12,'phrase':'[发怒]','url':'uiem012.svg'},
        {'id':13,'phrase':'[惊讶]','url':'uiem013.svg'},
        {'id':14,'phrase':'[冷汗]','url':'uiem014.svg'},
        {'id':15,'phrase':'[生气]','url':'uiem015.svg'},
        {'id':16,'phrase':'[擦汗]','url':'uiem016.svg'},
        {'id':17,'phrase':'[晕]','url':'uiem017.svg'},
        {'id':18,'phrase':'[流汗]','url':'uiem018.svg'},
        {'id':19,'phrase':'[再见]','url':'uiem019.svg'},
        {'id':20,'phrase':'[亲吻]','url':'uiem020.svg'},
        {'id':21,'phrase':'[撇嘴]','url':'uiem021.svg'},
        {'id':22,'phrase':'[惊吓]','url':'uiem022.svg'},
        {'id':23,'phrase':'[白眼]','url':'uiem023.svg'},
        {'id':24,'phrase':'[抠鼻]','url':'uiem024.svg'},
        {'id':25,'phrase':'[傲慢]','url':'uiem025.svg'},
        {'id':26,'phrase':'[阴险]','url':'uiem026.svg'},
        {'id':27,'phrase':'[鄙视]','url':'uiem027.svg'},
        {'id':28,'phrase':'[可怜]','url':'uiem028.svg'},
        {'id':29,'phrase':'[发火]','url':'uiem029.svg'},
        {'id':30,'phrase':'[尴尬]','url':'uiem030.svg'},
        {'id':31,'phrase':'[抓狂]','url':'uiem031.svg'},
        {'id':32,'phrase':'[惊恐]','url':'uiem032.svg'},
        {'id':33,'phrase':'[委屈]','url':'uiem033.svg'},
        {'id':34,'phrase':'[害羞]','url':'uiem034.svg'},
        {'id':35,'phrase':'[鼓掌]','url':'uiem035.svg'},
        {'id':36,'phrase':'[咒骂]','url':'uiem036.svg'},
        {'id':37,'phrase':'[色]','url':'uiem037.svg'},
        {'id':38,'phrase':'[疑问]','url':'uiem038.svg'},
        {'id':39,'phrase':'[左哼哼]','url':'uiem039.svg'},
        {'id':40,'phrase':'[右哼哼]','url':'uiem040.svg'},
        {'id':41,'phrase':'[得意]','url':'uiem041.svg'},
        {'id':42,'phrase':'[闭嘴]','url':'uiem042.svg'},
        {'id':43,'phrase':'[睡]','url':'uiem043.svg'},
        {'id':44,'phrase':'[呕吐]','url':'uiem044.svg'},
        {'id':45,'phrase':'[困]','url':'uiem045.svg'},
        {'id':46,'phrase':'[嘘]','url':'uiem046.svg'},
        {'id':47,'phrase':'[打哈欠]','url':'uiem047.svg'},
        {'id':48,'phrase':'[笑哭]','url':'uiem048.svg'},
        {'id':49,'phrase':'[糗大了]','url':'uiem049.svg'},

        {'id':50,'phrase':'[luwei-不懂你的世界]','url':'luwei001.gif'},
        {'id':51,'phrase':'[luwei-不要管我]','url':'luwei002.gif'},
        {'id':52,'phrase':'[luwei-多谢救命之恩]','url':'luwei003.gif'},
        {'id':53,'phrase':'[luwei-踩死你]','url':'luwei004.gif'},
        {'id':54,'phrase':'[luwei-有钱任性]','url':'luwei005.gif'},
        {'id':55,'phrase':'[luwei-看好你]','url':'luwei006.gif'},
        {'id':56,'phrase':'[luwei-加班]','url':'luwei007.gif'},
        {'id':57,'phrase':'[luwei-跳舞]','url':'luwei008.gif'},
        {'id':58,'phrase':'[luwei-坦荡荡]','url':'luwei009.gif'},
        {'id':59,'phrase':'[luwei-按摩]','url':'luwei010.gif'},
        {'id':60,'phrase':'[luwei-造孽啊]','url':'luwei011.gif'},
        {'id':61,'phrase':'[luwei-别怕]','url':'luwei012.gif'},

        {'id':62,'phrase':'[huanxiong-比心]','url':'huanxiong001.png'},
        {'id':63,'phrase':'[huanxiong-打招呼]','url':'huanxiong002.png'},
        {'id':64,'phrase':'[huanxiong-大哭]','url':'huanxiong003.png'},
        {'id':65,'phrase':'[huanxiong-额。。]','url':'huanxiong004.png'},
        {'id':66,'phrase':'[huanxiong-鬼脸]','url':'huanxiong005.png'},
        {'id':67,'phrase':'[huanxiong-哼]','url':'huanxiong006.png'},
        {'id':68,'phrase':'[huanxiong-冷汗]','url':'huanxiong007.png'},
        {'id':69,'phrase':'[huanxiong-楼上的!]','url':'huanxiong008.png'},
        {'id':70,'phrase':'[huanxiong-请闭嘴]','url':'huanxiong009.png'},
        {'id':71,'phrase':'[huanxiong-神马]','url':'huanxiong010.png'},
        {'id':72,'phrase':'[huanxiong-哇]','url':'huanxiong011.png'},
        {'id':73,'phrase':'[huanxiong-委屈]','url':'huanxiong012.png'},
        {'id':74,'phrase':'[huanxiong-无聊啊]','url':'huanxiong013.png'},
        {'id':75,'phrase':'[huanxiong-心好痛]','url':'huanxiong014.png'},
        {'id':76,'phrase':'[huanxiong-疑问]','url':'huanxiong015.png'},
        {'id':77,'phrase':'[huanxiong-OK]','url':'huanxiong016.png'},

        {'id':78,'phrase':'[sum-666]','url':'sum001.gif'},
        {'id':79,'phrase':'[sum-备好纸巾]','url':'sum002.gif'},
        {'id':81,'phrase':'[sum-踩踩]','url':'sum004.gif'},
        {'id':86,'phrase':'[sum-呵呵去洗澡]','url':'sum009.gif'},
        {'id':89,'phrase':'[sum-快开门]','url':'sum012.gif'},
        {'id':90,'phrase':'[sum-快上来]','url':'sum013.gif'},
        {'id':96,'phrase':'[sum-帅醒了]','url':'sum019.gif'},
        {'id':99,'phrase':'[sum-又变帅了]','url':'sum022.gif'},

        {'id':80,'phrase':'[sum-笔芯]','url':'sum003.gif'},
        {'id':82,'phrase':'[sum-锻炼]','url':'sum005.gif'},
        {'id':87,'phrase':'[sum-呼呼大睡]','url':'sum010.gif'},
        {'id':88,'phrase':'[sum-加油]','url':'sum011.gif'},
        {'id':91,'phrase':'[sum-你需要去污粉]','url':'sum014.gif'},
        {'id':95,'phrase':'[sum-收下我的膝盖]','url':'sum018.gif'},
        {'id':97,'phrase':'[sum-掀桌]','url':'sum020.gif'},

        {'id':83,'phrase':'[sum-给跪了]','url':'sum006.gif'},
        {'id':84,'phrase':'[sum-鼓掌]','url':'sum007.gif'},
        {'id':85,'phrase':'[sum-哈哈哈]','url':'sum008.gif'},
        {'id':92,'phrase':'[sum-起不来]','url':'sum015.gif'},
        {'id':93,'phrase':'[sum-窃喜]','url':'sum016.gif'},
        {'id':94,'phrase':'[sum-惹不起]','url':'sum017.gif'},
        {'id':98,'phrase':'[sum-嘤嘤嘤]','url':'sum021.gif'},
        {'id':100,'phrase':'[sum-震惊]','url':'sum023.gif'},
        {'id':101,'phrase':'[sum-转圈圈]','url':'sum024.gif'}

    ];

    faceHtml = function(obj,opx,textareaid,top,left,start,end){
        //<div>鹿味人生</div>
        var faceHtml = '<div id="face" class="uiem-box">';
            faceHtml += '<div id="texttb" class="uiem-nav"><div>默认</div><div>浣熊妹</div><div>龙兄虎弟</div></div>';
            faceHtml += '<div id="facebox">';
            faceHtml += '<div id="face_detail" class="cl"><ul class="uiem-cont cl">';

        for( i = start-1; i < end-1; i++) {
            faceHtml += '<li text=' + em[i].phrase + ' type=' + i + '><img title=' + em[i].phrase + ' src="https://s9.ui.cn/uiem48/'+ em[i].url + '"  style="cursor:pointer; position:relative;"   /></li>';
        }

        faceHtml += '</ul></div>';
        faceHtml += '<div class="face_author"></div>'

        $(obj).find('#face').remove();
        $(obj).append(faceHtml);
        $(obj).find('#btn').hide();   //隐藏表情按钮
        $(obj).find('.btn_inner').hide();  //隐藏表情按钮

        $(obj).find("#face_detail ul >li").bind("click", function(e) {
            var txt = $(this).attr("text");
            var faceText = txt;

            var tclen = $(opx).val().length;
            
            var tc = document.getElementById(textareaid);
            var pos = 0;
            if(typeof document.selection != "undefined"){
                //IE
                $(opx).focus();
                //设置焦点
                setCursorPosition(tc, cpos);
                document.selection.createRange().text = faceText;
                //计算光标位置
                pos = getPositionForTextArea(tc); 
            }else{
                //火狐
                //计算光标位置
                pos = tc.selectionStart + faceText.length;
                $(opx).val($(opx).val().substr(0, tc.selectionStart) + faceText + $(opx).val().substring(tc.selectionStart, tclen));
            }

            cpos = pos;
            //设置焦点
            setCursorPosition(tc, pos);
            // $(obj).find("#face").remove();   //去掉对表情的移除
            e.stopPropagation();  //去掉对表情的移除

        });
            

        var offset = {};
        offset.top = top;
        offset.left = left;
        $(obj).find("#face").css(offset).show();

    }

    //textarea设置光标位置
    function setCursorPosition(ctrl, pos){
        if(ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos, pos);
        }else if(ctrl.createTextRange) {
            // IE Support
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    //评论框下的表情
    $(document).on('click','#btn',function(){

        faceHtml('#comment','#textarea','textarea',128,0,1,50);
        $('.face_author').hide();
    })

    //回复框下的表情
    $(document).on('click','.btn_inner',function(){
        faceHtml('#comment_inner','#textarea_inner','textarea_inner',130,0,1,50);
        $('.face_author').hide();
    })

    // $(document).on("click",'.uiem-nav div', function(e) {
    //         alert('aa');
    // });

    // 隐藏表情框
    $(document).on('click','#btn, .btn_inner', function(event){
        if($(this).hasClass('open')){
            $("#face").remove();
            $(this).removeClass('open');
            return false;
        }
        $(this).addClass('open');
        event.stopPropagation();
    });
    $("#face").click(function(event){
        event.stopPropagation();
    });
    $(document).on("click",'.uiem-nav div', function(event) {
        var parent_tag = $(this).parent().parent().parent().attr('id');
        if (parent_tag == 'comment') {
            if ($(this).text() == '默认') {
                faceHtml('#comment','#textarea','textarea',128,0,1,50);
                $('.face_author').hide();
            }else if($(this).text() == '鹿味人生'){
                faceHtml('#comment','#textarea','textarea',128,0,50,62);
            }else if($(this).text() == '浣熊妹'){
                faceHtml('#comment','#textarea','textarea',128,0,62,78);
                $('.face_author').text('作者：嘉顿小熊饼');
            }else{
                faceHtml('#comment','#textarea','textarea',128,0,78,102);
                $('.face_author').text('作者：SunMB');
            }
        } else{
            if ($(this).text() == '默认') {
                faceHtml('#comment_inner','#textarea_inner','textarea_inner',130,0,1,50);
                $('.face_author').hide();
            }else if($(this).text() == '鹿味人生'){
                faceHtml('#comment_inner','#textarea_inner','textarea_inner',130,0,50,62);
            }else if($(this).text() == '浣熊妹'){
                faceHtml('#comment_inner','#textarea_inner','textarea_inner',130,0,62,78);
                $('.face_author').text('作者：嘉顿小熊饼');
            }else{
                faceHtml('#comment_inner','#textarea_inner','textarea_inner',130,0,78,102);
                $('.face_author').text('作者：SunMB');
            }
        }
        // faceHtml('#comment','#textarea','textarea',128,0,50,62);
        event.stopPropagation();    //去掉对表情的隐藏
    });
    
    $('#p-comment').click(function(){
        $("#face").remove();    //移除表情
        $("#btn").removeClass('open');    //初始化表情状态,去掉open样式，返回初始状态
        $("#btn").show();      //显示表情按钮
        $('.btn_inner').show();  //显示表情按钮
        $(".btn_inner").removeClass('open');   //初始化表情状态,去掉open样式，返回初始状态
    });
    $(document).click(function(){
        $("#face").remove();   //移除表情
        $("#btn").show();     //显示表情按钮
        $('.btn_inner').show();     //显示表情按钮
        $("#btn").removeClass('open');    //初始化表情状态,去掉open样式，返回初始状态
        $(".btn_inner").removeClass('open');   //初始化表情状态,去掉open样式，返回初始状态
    });


        
// });
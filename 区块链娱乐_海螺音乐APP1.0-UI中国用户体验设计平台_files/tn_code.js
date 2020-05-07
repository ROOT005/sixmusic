/*! tncode 1.2 author:weiyingbin email:277612909@qq.com
//@ object webiste: http://www.39gs.com/archive/259.html
//@ https://github.com/binwind8/tncode
*/
var xurl = "https://ui.cn";
if(!document.getElementByClassName){
    function hasClass(elem, cls) {
      cls = cls || '';
      if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
      var ret = new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
      return ret;
    }
    document.getElementByClassName = function(className,index){
        var nodes=document.getElementsByTagName("*");//获取页面里所有元素，因为他会匹配全页面元素，所以性能上有缺陷，但是可以约束他的搜索范围；
        var arr=[];//用来保存符合的className；
        for(var i=0;i<nodes.length;i++){
            if(hasClass(nodes[i],className)) arr.push(nodes[i]);
        }
        if(!index)index=0;
        return index==-1?arr:arr[index];
    };
    function addClass( elements,cName ){
       if( !hasClass( elements,cName ) ){
          elements.className += " " + cName;
       };
    }
    function removeClass( elements,cName ){
       if( hasClass( elements,cName ) ){
          elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
       };
    }
}

function appendHTML(o,html) {
    var divTemp = document.createElement("div"), nodes = null
        , fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i=0, length=nodes.length; i<length; i+=1) {
       fragment.appendChild(nodes[i].cloneNode(true));
    }
    o.appendChild(fragment);
    nodes = null;
    fragment = null;
};



var _ajax = function() {};
_ajax.prototype = {
    request: function(method, url, callback, postVars) {
        var xhr = this.createXhrObject()();
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            (xhr.status === 200) ?
                callback.success(xhr.responseText, xhr.responseXML) :
                callback.failure(xhr,status);
        };
        if (method !== "POST"&&postVars) {
            url += "?" + this.JSONStringify(postVars);
            postVars = null;
        }
        xhr.open(method, url, true);
        xhr.send(postVars);
    },
    createXhrObject: function() {
        var methods = [
            function() { return new XMLHttpRequest(); },
            function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
            function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
        ],
        i = 0,
        len = methods.length,obj;
        for (; i < len; i++) {
            try {
                methods[i];
            } catch(e) {
                continue;
            }
            this.createXhrObject = methods[i];
            return methods[i];
        }
        throw new Error("ajax created failure");
    },
    JSONStringify: function(obj) {
        return JSON.stringify(obj).replace(/"|{|}/g, "")
                    .replace(/b:b/g, "=")
                    .replace(/b,b/g, "&");
    }
};


var tncode = {
    _obj:null,
    _tncode:null,
    _img:null,
    _img_loaded:false,
    _is_draw_bg:false,
    _is_moving:false,
    _block_start_x:0,
    _block_start_y:0,
    _doing:false,
    _mark_w:50,
    _mark_h:50,
    _mark_offset:0,
    _img_w:240,
    _img_h:150,
    _result:false,
    _err_c:0,
    _onsuccess:null,
    _phone:null,
    _stype:null,
    _bind:function(elm,evType,fn){
        //event.preventDefault();
        if (elm.addEventListener) {
            elm.addEventListener(evType, fn);//DOM2.0
            return true;
        }else if (elm.attachEvent) {
            var r = elm.attachEvent(evType, fn);//IE5+
            return r;
        }
    },
    _block_start_move:function(e){
      
        console.log(tncode._doing);
        console.log(tncode._img_loaded);
        if(tncode._doing||!tncode._img_loaded){

            return;
        }
      
        e.preventDefault();
        var theEvent = window.event || e;
        if(theEvent.touches){
            theEvent = theEvent.touches[0];
        }

        // console.log("_block_start_move");

        var obj = document.getElementByClassName('slide_block_text');
        obj.style.display="none";
        tncode._draw_bg();
        tncode._block_start_x = theEvent.clientX;
        tncode._block_start_y = theEvent.clientY;
        tncode._doing = true;
        tncode._is_moving = true;
    },
    _block_on_move:function(e){
        if(!tncode._doing)return true;
        if(!tncode._is_moving)return true;
        e.preventDefault();
        var theEvent = window.event || e;
        if(theEvent.touches){
            theEvent = theEvent.touches[0];
        }
        tncode._is_moving = true;
        console.log("_block_on_move");
                //document.getElementById('msg').innerHTML = "move:"+theEvent.clientX+";"+theEvent.clientY;
        var offset = theEvent.clientX - tncode._block_start_x;
        
        if(offset<0){
            offset = 0;
        }
        var max_off = tncode._img_w - tncode._mark_w;
        if(offset>max_off){
            offset = max_off;
        }
        var obj = document.getElementByClassName('slide_block');

        obj.style.cssText = "transform: translate("+offset+"px, 0px)";
        tncode._mark_offset = offset/max_off*(tncode._img_w-tncode._mark_w);
        tncode._draw_bg();
        tncode._draw_mark();
    },
    _block_on_end:function(e){
        if(!tncode._doing)return true;
        e.preventDefault();
        var theEvent = window.event || e;
        if(theEvent.touches){
            theEvent = theEvent.touches[0];
        }
        console.log("_block_on_end");
        tncode._is_moving = false;
        tncode._send_result();
    },
    _send_result:function(){
        var haddle = {success:tncode._send_result_success,failure:tncode._send_result_failure};
        tncode._result = false;
        var re = new _ajax();
        // // re.request('get',tncode._currentUrl()+'check.php?tn_r='+tncode._mark_offset,haddle);
        
        // wsj请求验证接口
        // var url='/Public/tn_code/check.php?tn_r='+tncode._mark_offset+"&phone="+tncode._phone;
        // re.request('get',url,haddle);
      
        var res = new Object();
        console.log("tttt");
        res.code=0;
        $.ajax({
            // headers:{'note':note},
            type:"POST",
            url:xurl+"/Web/Api/otherdocheck",
            data:{tn_r:tncode._mark_offset,phone:tncode._phone,note:note},
            dataType:"json",
            async:false,
            success:function(data){

                res = data;
            }
            
        });
        
        if(res.code==1){
            tncode._tncode.innerHTML = '√验证成功';
            tncode._showmsg('√验证成功',1);
            tncode._result = true;
            document.getElementByClassName('hgroup').style.display="block";
            setTimeout(tncode.hide,3000);
            if(tncode._onsuccess){
                tncode._onsuccess();
            }
            // $(".lang-btn").removeClass("off");
            // 显示发送验证码框
            if(tncode._stype=="reg"){
                $("#sendcode").removeClass("hide");
            }else if(tncode._stype=="login"){
                // $(".new_log_btn").removeClass("off");
                $(".pos").removeClass("hide");
            }else if(tncode._stype=="bind"){
                // $(".new_log_btn").removeClass("off");
                $(".pos").removeClass("hide");
            }
            
        }else{
            var obj = document.getElementById('tncode_div');
            addClass( obj,'dd');
            setTimeout(function(){
                removeClass( obj,'dd');
            },200);
            tncode._result = false;

            var showmsg = res.code?res.code:"验证失败";
            tncode._showmsg(showmsg);
            tncode._err_c++;
            if(tncode._err_c>5){
                tncode.refresh();
            }
            tncode._doing = false;

            // 隐藏发送验证码框
            // if(tncode._stype=="reg"){
            //     $("#sendcode").addClass("hide");
            // }
        }

    },
    _send_result_success:function(responseText,responseXML){
        tncode._doing = false;

        var obj = eval('(' + responseText + ')');
        console.log(obj);
        if(responseText=='ok'){
            tncode._tncode.innerHTML = '√验证成功';
            tncode._showmsg('√验证成功',1);
            tncode._result = true;
            document.getElementByClassName('hgroup').style.display="block";
            setTimeout(tncode.hide,3000);
            if(tncode._onsuccess){
                tncode._onsuccess();
            }
            // $(".lang-btn").removeClass("off");
        }else{
            var obj = document.getElementById('tncode_div');
            addClass( obj,'dd');
            setTimeout(function(){
                removeClass( obj,'dd');
            },200);
            tncode._result = false;
            tncode._showmsg('验证失败');
            tncode._err_c++;
            if(tncode._err_c>5){
                tncode.refresh();
            }
        }
    },
    _send_result_failure:function(xhr,status){

    },
    _draw_fullbg:function(){
        var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
        var ctx_bg = canvas_bg.getContext('2d');
        ctx_bg.drawImage(tncode._img, 0, tncode._img_h*2, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h);
    },
    _draw_bg:function(){
        if(tncode._is_draw_bg){
            return;
        }
        tncode._is_draw_bg = true;
        var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
        var ctx_bg = canvas_bg.getContext('2d');
        ctx_bg.drawImage(tncode._img, 0, 0, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h);
    },
    _draw_mark:function(){
        var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
        var ctx_mark = canvas_mark.getContext('2d');
        //清理画布
        ctx_mark.clearRect(0,0,canvas_mark.width,canvas_mark.height);
        ctx_mark.drawImage(tncode._img, 0, tncode._img_h, tncode._mark_w,tncode._img_h,tncode._mark_offset,0,tncode._mark_w, tncode._img_h);
        var imageData = ctx_mark.getImageData(0, 0, tncode._img_w, tncode._img_h);
          // 获取画布的像素信息
          // 是一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示
          // 如：图片由两个像素构成，一个像素是白色，一个像素是黑色，那么 data 为
          // [255,255,255,255,0,0,0,255]
          // 这个一维数组可以看成是两个像素中RBGA通道的数组的集合即:
          // [R,G,B,A].concat([R,G,B,A])
        var data = imageData.data;
        //alert(data.length/4);
        var x = tncode._img_h,y=tncode._img_w;
        for(var j = 0; j < x; j++) {
            var ii = 1,k1=-1;
            for(var k=0;k<y&&k>=0&&k>k1;){
              // 得到 RGBA 通道的值
                var i = (j*y+k)*4;
                k+=ii;
                var r = data[i]
                  , g = data[i+1]
                  , b = data[i+2];
                // 我们从最下面那张颜色生成器中可以看到在图片的右上角区域，有一小块在
                // 肉眼的观察下基本都是白色的，所以我在这里把 RGB 值都在 245 以上的
                // 的定义为白色
                // 大家也可以自己定义的更精确，或者更宽泛一些
                if(r+g+b<200) data[i+3] = 0;
                else{
                    var arr_pix = [1,-5];
                    var arr_op = [250,0];
                    for (var i =1; i<arr_pix[0]-arr_pix[1]; i++) {
                        var iiii = arr_pix[0]-1*i;
                        var op = parseInt(arr_op[0]-(arr_op[0]-arr_op[1])/(arr_pix[0]-arr_pix[1])*i);
                        var iii = (j*y+k+iiii*ii)*4;
                        data[iii+3] = op;
                    }
                    if(ii==-1){
                        break;
                    }
                    k1 = k;
                    k = y-1;
                    ii = -1;
                };
            }
        }
        ctx_mark.putImageData(imageData, 0, 0);
    },
    _reset:function(){
        tncode._mark_offset = 0;
        tncode._draw_bg();
        tncode._draw_mark();
        var obj = document.getElementByClassName('slide_block');
        obj.style.cssText = "transform: translate(0px, 0px)";
    },

    // wsj点击按钮弹出验证图片
    show:function(){
        
        // 验证手机号
        // var stype=document.getElementByClassName('tncode')[0].getAttribute("stype");
        // tncode._phone=document.getElementById("tel").value;
        var checkurl = "";
        if(tncode._stype=="reg"){  //注册对应的phone 元素
            tncode._phone=document.getElementById("tel").value;
            checkurl = xurl+"/mbregcheck";
        }else if(tncode._stype=="login"){ //验证码登录对应的phone 元素
            tncode._phone=document.getElementById("num2").value;
            checkurl = xurl+"/mblogncheck";
        }else if(tncode._stype=="bind"){ //验证码登录对应的phone 元素
            tncode._phone=document.getElementById("tel").value;
            checkurl = xurl+"/tmbregcheck";
        }
        
      
        var res = new Object();
        $.ajax({
            type:"POST",
            url:checkurl,
            data:{phone:tncode._phone},
            dataType:"json",
            async:false,
            success:function(data){
                res = data;
            }
        });

        if(res.code!="1"){
            globalTip({ 'msg': res.msg, 'setTime': 3 });
            return false;  
        }

        var obj = document.getElementByClassName('hgroup');
        if(obj){
            obj.style.display="none";
        }
        


        tncode.refresh();
        tncode._tncode = this;
        document.getElementById('tncode_div_bg').style.display="block";
        document.getElementById('tncode_div').style.display="block";
    },
   
    hide:function(){
        document.getElementById('tncode_div_bg').style.display="none";
        document.getElementById('tncode_div').style.display="none";
    },
    _showmsg:function(msg,status){
        if(!status){
            status = 0;
            var obj = document.getElementByClassName('tncode_msg_error');
        }else{
            var obj = document.getElementByClassName('tncode_msg_ok');
        }
        obj.innerHTML = msg;
        var setOpacity = function (ele, opacity) {
            if (ele.style.opacity != undefined) {
                ///兼容FF和GG和新版本IE
                ele.style.opacity = opacity / 100;

            } else {
                ///兼容老版本ie
                ele.style.filter = "alpha(opacity=" + opacity + ")";
            }
        };
        function fadeout(ele, opacity, speed) {
            if (ele) {
                var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100;
                v < 1 && (v = v * 100);
                var count = speed / 1000;
                var avg = (100 - opacity) / count;
                var timer = null;
                timer = setInterval(function() {
                    if (v - avg > opacity) {
                        v -= avg;
                        setOpacity(ele, v);
                    } else {
                        setOpacity(ele, 0);
                        if(status==0){
                            tncode._reset();
                        }
                        clearInterval(timer);
                    }
                }, 100);
            }
        }
        function fadein(ele, opacity, speed) {
            if (ele) {
                var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity;
                v < 1 && (v = v * 100);
                var count = speed / 1000;
                var avg = count < 2 ? (opacity / count) : (opacity / count - 1);
                var timer = null;
                timer = setInterval(function() {
                    if (v < opacity) {
                        v += avg;
                        setOpacity(ele, v);
                    } else {
                        clearInterval(timer);
                        setTimeout(function() {fadeout(obj, 0, 6000);},1000);
                    }
                }, 100);
            }
        }

        fadein(obj, 80, 4000);
    },
    _html:function(){
        var d = document.getElementById('tncode_div_bg');
        if(d)return;
        var html = '<div class="tncode_div_bg" id="tncode_div_bg"></div>\
        <div class="tncode_div" id="tncode_div">\
            <div class="loading">加载中</div>\
            <canvas class="tncode_canvas_bg"></canvas>\
            <canvas class="tncode_canvas_mark"></canvas>\
            <div class="hgroup"></div>\
            <div class="tncode_msg_error"></div>\
            <div class="tncode_msg_ok"></div>\
            <div class="slide">\
                <div class="slide_block"></div>\
                <div class="slide_block_text">拖动左边滑块完成上方拼图</div>\
            </div>\
            <div class="tools">\
                <div class="tncode_close"></div>\
                <div class="tncode_refresh"></div>\
                <div class="tncode_tips">\
                <a href="http:\/\/www.ui.cn" target=_blank>ui.cn</a>\
                </div>\
            </div>\
        </div>';
        var bo = document.getElementsByTagName('body');
        appendHTML(bo[0],html);
    },
    // 返回生成图片的地址
    _currentUrl:function(){
        var list = document.getElementsByTagName('script');
        
        
        for (var i in list) {
            var  d=list[i];
            if(d.src.indexOf('tn_code')!==-1){//js文件名一定要带这个字符
                var arr = d.src.split('tn_code');
                // console.log(arr[0]);
                // return arr[0];
                return arr[0]+"tn_code/";
            }
        }
    },
    refresh:function(){
        var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
        var _this = this;
        tncode._err_c = 0;
        tncode._is_draw_bg = false;
        tncode._result = false;
        tncode._img_loaded = false;
        var obj = document.getElementByClassName('tncode_canvas_bg');
        obj.style.display="none";
        obj = document.getElementByClassName('tncode_canvas_mark');
        obj.style.display="none";
        tncode._img = new Image();
        var img_url = tncode._currentUrl()+"tncode.php?t="+Math.random();
        if(!isSupportWebp){//浏览器不支持webp
            img_url+="&nowebp=1";
        }
        tncode._img.src = img_url;
        tncode._img.onload = function(){
            tncode._draw_fullbg();
            var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
            var ctx_mark = canvas_mark.getContext('2d');
            //清理画布
            ctx_mark.clearRect(0,0,canvas_mark.width,canvas_mark.height);
            tncode._img_loaded = true;
            obj = document.getElementByClassName('tncode_canvas_bg');
            obj.style.display="";
            obj = document.getElementByClassName('tncode_canvas_mark');
            obj.style.display="";
        };
        //alert("Hong Kong ForHarvest Technology and Culture Development Co. Limited".length);
        obj = document.getElementByClassName('slide_block');
        obj.style.cssText = "transform: translate(0px, 0px)";
        obj = document.getElementByClassName('slide_block_text');
        obj.style.display="block";
    },
    init:function(){
        var _this = this;
        if(!tncode._img){
            tncode._html();
            var obj = document.getElementByClassName('slide_block');

            tncode._bind(obj,'mousedown',_this._block_start_move);
            tncode._bind(document,'mousemove',_this._block_on_move);
            tncode._bind(document,'mouseup',_this._block_on_end);

            tncode._bind(obj,'touchstart',_this._block_start_move);
            tncode._bind(document,'touchmove',_this._block_on_move);
            tncode._bind(document,'touchend',_this._block_on_end);

            var obj = document.getElementByClassName('tncode_close');
            tncode._bind(obj,'touchstart',_this.hide);
            tncode._bind(obj,'click',_this.hide);
            var obj = document.getElementByClassName('tncode_refresh');

            tncode._bind(obj,'touchstart',_this.refresh);
            tncode._bind(obj,'click',_this.refresh);


            var objs = document.getElementByClassName('tncode',-1);
            for (var i in objs) {
                var o = objs[i];
                o.innerHTML = '点击按钮进行验证';

                tncode._stype=o.getAttribute("stype");

                tncode._bind(o,'touchstart',_this.show);
                tncode._bind(o,'click',_this.show);
            }
        }
    },
    result:function(){
        return tncode._result;
    },
    onsuccess:function(fn){
        tncode._onsuccess = fn;
    }
};
var $TN = tncode;
var _old_onload = window.onload;
window.onload = function(){
    if(typeof _old_onload == 'function'){
        _old_onload();
    }
    tncode.init();
};




// vim: set et sw=2 ts=2 sts=2 ff=unix fenc=utf8:
// Author: Paul Chan<paul@paulreina.com>
//         http://www.chztv.com
// Created on 13-09-04 AM1:19
// Modified on 13-9-04 


$("head").append('<style>'
    +'#toolbar .dl-aria2 {float: left;height: 38px;position: relative;width: 120px;}'  
    +'#toolbar .dl-aria2 span {color:#388fc9;display:inline-block;font-size:14px;margin-top:16px;margin-left:10px;text-decoration:underline}'
    +'.aria2-content {display:none;height:270px;left:-87px;overflow:hidden;position:absolute;top:40px;width:275px;z-index:100}'
    +'.aria2-content .caset {border-bottom:13px solid #ccc;border-right:13px dashed transparent;border-left:13px dashed transparent;height:0;margin-left:119px;overflow:hidden;width:0}'
    +'.aria2-content .caset-b {border-bottom:12px solid #fff;border-right:12px dashed transparent;border-left:12px dashed transparent;height:0;margin-left:120px;overflow:hidden;position:relative;top:-262px;width:0}'
    +'.aria2-body {background-color:#fff;border:1px solid #ccc;box-shadow:0 1px 4px rgba(0,0,0,.15);padding-bottom:13px;text-align:center;padding-top: 13px;}'
    +'</style>');

$('.dl-aria2').live("click",function(){		    
    $('.aria2-content').toggle();
} );

function aria2down1() {
 jsonrpc_path = TLE.getConfig("360_aria2_jsonrpc");
 aria2down1url = $("#aria2url1").attr("href");
	if (jsonrpc_path) {
	  alert("添加中...到YAAW界面查看是否添加成功");
	  $.getScript("https://raw.github.com/gist/3116833/aria2jsonrpc.js", function() {
		var aria2 = new ARIA2(jsonrpc_path);
		aria2.addUri(aria2down1url, {out: SYS_CONF.name});
	  });

	} else {
	  alert("尚未设置Aria2 JSONRPC地址");
	};
}

$('#aria2-download').live("click",function(){    
    var n = yunpan.fo.getSelectFile();
    jsonrpc_path = TLE.getConfig("360_aria2_jsonrpc");
    if (!n.length) {
        yunpan.tip.QuickTip.init({
            container: W("#toolbar .toolbar-box")
        }),
        yunpan.tip.QuickTip.show("\u8bf7\u9009\u62e9\u8981\u4e0b\u8f7d\u7684\u6587\u4ef6", "warning", 3e3);
        return
    }

    //alert('nid:'+ e +' size:'+ t);
    for (var j=0;j<n.length;j++){
        e = n[j].attr("data-nid");
        t = n[j].attr("data-size");
        t = parseInt(t || 0);
        filename = n[j].attr("data-title");
        $.ajax({
    		type: "POST",
    		url:"/share/downloadfile/",
    		data:{"shorturl":SYS_CONF.surl,"nid":e},
    		dataType: "json",
    		success:function(data){
	                //alert(data.data.downloadurl);
	            	if (jsonrpc_path) {
	            	  alert(filename+" 添加中...到YAAW界面查看是否添加成功");
	            	  
	            	  /*$.getScript("https://raw.github.com/gist/3116833/aria2jsonrpc.js", function() {
	            		var aria2 = new ARIA2(jsonrpc_path);
	            		aria2.addUri(data.data.downloadurl, {out: filename});
	            	  })*/;
	            
	            	} else {
	            	  alert("尚未设置Aria2 JSONRPC地址");
	            	};
                
    		 },
    		error:function(){
    			  XF.widget.msgbox.show("获取普通下载链失败,请重试!",2,2000);
    			 }
        });         
    }
    

} );

//保存按钮
$('.setting_button').live("click",function(){		    
	//获取选择的列表
	TLE.setConfig("360_aria2_jsonrpc", $("#360_aria2_jsonrpc").val());
	alert("设置成功!"+TLE.getConfig("360_aria2_jsonrpc"));
	$(".setting_panel").toggle();
} );

function settingshow() {
  $(".setting_panel").toggle();  
}

var TLE = TLE || {};


(function(TLE) {

  function init() {
    //css


    //setting
    TLE.getConfig = function(key) {
        //return getCookie(key);
        var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
  	if(arr != null) return unescape(arr[2]); return null;
    };
    TLE.setConfig = function(key, value) {
      if (navigator.cookieEnabled) {
        //window.localStorage.setItem(key, value);
          var Days = 30; //此 cookie 将被保存 30 天
  	  var exp  = new Date();    //new Date("December 31, 9998");
  	  exp.setTime(exp.getTime() + Days*24*60*60*1000);
	  document.cookie = key + "="+ escape(value) +";expires="+ exp.toGMTString()+";path=/;domain=.yunpan.cn";
      } else {
        setGdCookie(key, value, 86400*365);
      }
    };
    //set default config
    if(TLE.getConfig("360_aria2_jsonrpc")){
		var jsonrpc_path = TLE.getConfig("360_aria2_jsonrpc");
	} else {
		var jsonrpc_path = "http://192.168.1.1:6800/jsonrpc";
	};
	
	
	setting_panel = '<div class="panel panel-t1 setting_panel" id="setting_panel" style="display: none; z-index: 110; left: 423px; top: 172px;"><div class="panel-content" remark="oContent"><div class="hd" style="width: 516px;"><h3>设置</h3></div><div class="bd"><div class="msg-panel" id="msg-report"> <div class="win-report-info">360云盘是一个不错的网盘，空间大，下载速度快，这是一个支持Aria2c远程YAAW下载的设置内容，有需要的可以在下面设置您Aria2c的下载RPC地址。</div> <p class="win-report-title">Aria2 RPC 地址：</p> <div class="win-report-reason"><div><input type="text" id="360_aria2_jsonrpc" style="width: 350px" value="'+jsonrpc_path+'"></div></div> </div></div><div class="ft" style="width: 530px;"><span class="y-btn y-btn-blue setting_button">确定</span><span class="y-btn y-btn-gray">取消</span></div></div><span class="close"><a class="close-link" href="###" onclick="settingshow();"><span>关闭</span></a></span><span class="left-corner"></span><span class="right-corner"></span></div>';
    $("body").append(setting_panel);
    
  
	//普通下载按钮
	$('.btn_aria2').live("click",function(){		    
	//获取选择的列表
	    var checked_list=$(".file_list_checkbox:checked");
		if(checked_list.size()>0){
			checked_list.each(function(){
		      //var filename=checked_list.eq(0).parent().next().find("a").attr("title");
		      //var filehash=checked_list.eq(0).parent().next().find("a").attr("filehash");
		      var filename=$(this).parent().next().find("a").attr("title");
		      var filehash=$(this).parent().next().find("a").attr("filehash");
		      //开始统计
			  stat("NORMAL_DOWN\t" + filehash);
			  start_normal_down_paul(filename,filehash);
			});
		}else{
		    XF.widget.msgbox.show("您还没选择文件呢!",2,2000);
		}
	} );
	//QQ旋风下载链接获取并转推至aria2-jsonrpc
	function start_normal_down_paul(filename,filehash){
	$.ajax({
			type: "POST",
			url:API_URL.handler_url+"/getComUrl",
			cache: false,
			data:{"filename":filename,"filehash":filehash},
			timeout:3000,
			dataType: "json",
			success:function(data){
			  if(data&&data.ret==0){
				 $.cookie('FTN5K',data.data.com_cookie,{path:"/",domain:"qq.com"});
				 //window.location=data.data.com_url;
				 //显示Aria2c下载命令
				 //alert( "aria2c -c -s10 -x10 --out "+filename+" --header 'Cookie: FTN5K="+data.data.com_cookie+";' '"+data.data.com_url+"'\n");				
					if (jsonrpc_path) {
					  alert("添加中...到YAAW界面查看是否添加成功");
					  $.getScript("https://raw.github.com/gist/3116833/aria2jsonrpc.js", function() {
					  	jsonrpc_path = $("#QQ_aria2_jsonrpc").val();
						var aria2 = new ARIA2(jsonrpc_path);
						aria2.addUri(data.data.com_url, {out: filename, header: 'Cookie: FTN5K='+data.data.com_cookie});
					  });

					} else {
					  alert("尚未设置Aria2 JSONRPC地址");
					};
			  }
			 },
			error:function(){
				  XF.widget.msgbox.show("获取普通下载链失败,请重试!",2,2000);
				 }
	});
	}	
	
    // 新版YAAW下载
        $('#jisu_btn_chz').click(function() {
    	    var checked_list=$(".file_list_checkbox:checked");
    		if(checked_list.size()>0){
    			checked_list.each(function(){

    		      var filename=$(this).parent().next().next().find("a").attr("title");
    		      var filehash=$(this).parent().next().next().find("a").attr("filehash");
    		      start_normal_down_paul_V2(filename,filehash);
    		     
    			});
    		}else{
    		    alert("您还没选择文件呢!");
    		}            

        });

	//QQ旋风下载链接获取并转推至aria2-jsonrpc
	function start_normal_down_paul_V2(filename,filehash){
	$.ajax({
			type: "POST",
			url:"http://fenxiang.qq.com/upload/index.php/share/handler_c/getComUrl",
			cache: false,
			data:{"filename":filename,"filehash":filehash},
			timeout:3000,
			dataType: "json",
			success:function(data){
			  if(data&&data.ret==0){
				 $.cookie('FTN5K',data.data.com_cookie,{path:"/",domain:"qq.com"});
				 //window.location=data.data.com_url;
				 //显示Aria2c下载命令
				 //alert( "aria2c -c -s10 -x10 --out "+filename+" --header 'Cookie: FTN5K="+data.data.com_cookie+";' '"+data.data.com_url+"'\n"+","+$("#QQ_aria2_jsonrpc").val());				
					if (jsonrpc_path) {
					  alert("添加中...到YAAW界面查看是否添加成功");
					  $.getScript("https://raw.github.com/gist/3116833/aria2jsonrpc.js", function() {
					  	jsonrpc_path = $("#QQ_aria2_jsonrpc").val();
						var aria2 = new ARIA2(jsonrpc_path);
						aria2.addUri(data.data.com_url, {out: filename, header: 'Cookie: FTN5K='+data.data.com_cookie});
					  });

					} else {
					  alert("尚未设置Aria2 JSONRPC地址");
					};
			  }
			 },
			error:function(){
				  XF.widget.msgbox.show("获取普通下载链失败,请重试!",2,2000);
				 }
	});
	}	    
    
		
    //close menu binding
    $(document.body).bind("click",function(){
      $("div.TLE_p_getbtn, #TLE_batch_getbtn, #TLE_bt_getbtn").hide();
    });
    $("div.rw_list").click(function(e){
      $("div.TLE_p_getbtn, #TLE_batch_getbtn, #TLE_bt_getbtn").hide();
    });
    $("div.TLE_get_btnbox").click(function(e){e.stopPropagation();});
  };




if (SYS_CONF.isSingle) {
        $.ajax({
			type: "POST",
			url:"/share/downloadfile/",
			data:{"shorturl":SYS_CONF.surl,"nid":SYS_CONF.nid},
			dataType: "json",
			success:function(data){
                
                $(".qrcode-body").html('<img id="qrcode-img" src="http://c3.yunpan.360.cn/share/getDLinkQRcode?fullurl=http%3A%2F%2Fajnlsff3wa.l3.yunpan.cn%2Flk%2FQXig3WVxUZjW9"><p>链接可复制，可Aria2</p><a id="aria2url1" href="'+data.data.downloadurl+'" target="_blank" title="可复制下载地址">直接下载</a> | <a id="aria2down1" onclick="aria2down1();">Aria2</a> | <a id="setting" onclick="settingshow();">设置</a>');
			 },
			error:function(){
				  XF.widget.msgbox.show("获取普通下载链失败,请重试!",2,2000);
				 }
	    }); 
}else{
        alert('这是合辑分享，暂不支持');
        
        //$(".dl-qrcode").after('<div class="cmd dl-qrcode" data-cn="dl-aria2"><span>直链/Aria2下载</span></div>');
        $(".dl-qrcode").after('<div class="cmd dl-aria2" data-cn="dl-aria2"><span>直链/Aria2下载</span><div class="aria2-content" style="height: 270px; display: none;"><div class="caset"></div><div class="aria2-body"><p>仅支持单个文件下载，暂不支持打包</p><a href="#" title="可复制下载地址" id="aria2-download" onclick="return false;">直接下载</a> | <a id="setting" onclick="settingshow();">设置</a></div><div class="caset-b"></div></div></div>');
}
  
  
  init();
})(TLE);


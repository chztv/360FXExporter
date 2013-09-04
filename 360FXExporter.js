// vim: set et sw=2 ts=2 sts=2 ff=unix fenc=utf8:
// Author: Paul Chan<paul@paulreina.com>
//         http://www.chztv.com
// Created on 13-09-04 AM1:19
// Modified on 13-9-04 








//保存按钮
$('.setting_button').live("click",function(){		    
	//获取选择的列表
	TLE.setConfig("QQ_aria2_jsonrpc", $("#QQ_aria2_jsonrpc").val());
	XF.widget.msgbox.show("设置成功!"+TLE.getConfig("QQ_aria2_jsonrpc"),2,2000);
} );

var TLE = TLE || {};



(function(TLE) {

  function init() {
  	//$(".com_down").html('<dl><dt><a id="btn_normal" class="btn_normal" hidefocus="true" href="javascript:;"></a></dt><dd><a id="btn_normal2" class="btn_normal2" hidefocus="true" href="javascript:;">使用Aria2下载</a></dd></dl>');
  	$(".qrcode-body").html('<img id="qrcode-img" src="http://c3.yunpan.360.cn/share/getDLinkQRcode?fullurl=http%3A%2F%2Fajnlsff3wa.l3.yunpan.cn%2Flk%2FQXig3WVxUZjW9"><p>扫描二维码，将文件下载到手机</p><a href="http://shouji.so.com/search/index/?kw=二维码" target="_blank" title="显示下载地址">直接下载</a>');
    //css
    $("head").append('<style>'
          +'#jisu_btn_chz {background:url(https://raw.github.com/chztv/QQFXExporter/master/images/aria2_btn_V2.png) no-repeat left top;}'
          +'.btn_aria2 {background:url("https://raw.github.com/chztv/QQFXExporter/master/images/aria2_btn.png") no-repeat left top; width:112px; height: 34px;display: block;float: left;}'
          +'.TLE_getbtn {position: absolute; top:24px; left:0; border:1px #6FB2F3 solid; background:#fff; width:115px;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:2px 2px 3px #ddd;-webkit-box-shadow:2px 2px 3px #ddd;}'
          +'.TLE_getbtn a {display:block; height:22px; line-height:22px; padding-left:18px}'
          +'.TLE_getbtn a:hover {background:#E4EFF9 url(http://cloud.vip.xunlei.com/190/img/ic_dianbo.png) no-repeat 8px 8px; *background-position:8px 6px ; text-decoration:none}'
          +'.TLE_get_btnbox .TLE_getlink {width:98px; height:22px; float:left; line-height:21px;*line-height:24px;display:block;color:#000000; margin-right:5px; overflow:hidden;background:url(http://cloud.vip.xunlei.com/190/img/bg_btnall.png?197) no-repeat  0 -390px}'
          +'.TLE_get_btnbox .TLE_link_gettxt {float:left; display: inline ; width:53px; text-align:center; padding-left:24px; color:#000}'
          +'.TLE_get_btnbox .TLE_link_gettxt:hover {text-decoration:none}'
          +'.rwbox .rwset .TLE_link_getic {float:left; display:block; width:20px;height:22px;}'
          +'.TLE_hiden {display: none; }'
          +'.TLE_down_btn {background: url(http://cloud.vip.xunlei.com/190/img/lx/bg_rpx.png) no-repeat 0 999em; display: block; float: left; margin: 0 1px; overflow: hidden; color: white; height: 28px; padding-left: 8px; background-position: 0 -60px; text-decoration: none; }'
          +'.TLE_down_btn span {background: url(http://cloud.vip.xunlei.com/190/img/lx/bg_rpx.png) no-repeat 0 999em; display: block; float: left; height: 28px; line-height: 27px; cursor: pointer; padding-right: 8px; background-position:100% -60px; }'
          +'.TLE_down_btn:active {background-position:0 -28px; }'
          +'.TLE_down_btn:active span {background-position:right -28px;}'
          +'.TLE_icdwlocal { padding-left: 20px; display: inline-block; background: url(http://cloud.vip.xunlei.com/190/img/lx/bg_menu.png) no-repeat 0 999em; background-position: 0 -108px; }'
          +'.rwbtn.ic_redownloca { display: none !important; }'
          +'.menu { width: 700px !important; }'
          
        +'</style>');

    //setting
    TLE.getConfig = function(key) {
      if (window.localStorage) {
        return window.localStorage.getItem(key) || "";
      } else {
        return getCookie(key);
      }
    };
    TLE.setConfig = function(key, value) {
      if (window.localStorage) {
        window.localStorage.setItem(key, value);
      } else {
        setGdCookie(key, value, 86400*365);
      }
    };
    //set default config
    if(TLE.getConfig("QQ_aria2_jsonrpc")){
		var jsonrpc_path = TLE.getConfig("QQ_aria2_jsonrpc");
	} else {
		var jsonrpc_path = "http://192.168.1.8:6800/jsonrpc";
	};
    //jsonrpc设置span
    $("label.check_all_text").after('<span style="height:35px;line-height:35px;padding-left:10px;">Aria2 JSON-RPC Path:<input type="text" id="QQ_aria2_jsonrpc" style="width: 200px" value="'+jsonrpc_path+'"/>  <a href="javascript:;" hidefocus="true" class="setting_button" id="setting_button" title="保存设置" style="color:#666">保存</a></span>');
    $("span.total_size").after('<span style="height:35px;line-height:35px;padding-left:10px;">Aria2 JSON-RPC Path:<input type="text" id="QQ_aria2_jsonrpc" style="width: 200px" value="'+jsonrpc_path+'"/>  <a href="javascript:;" hidefocus="true" class="setting_button" id="setting_button" title="保存设置" style="color:#666">保存</a></span>');

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

$.ajax({
			type: "POST",
			url:"/share/downloadfile/",
			data:{"shorturl":SYS_CONF.surl,"nid":SYS_CONF.nid},
			dataType: "json",
			success:function(data){
                alert(data.data.downloadurl);
			 },
			error:function(){
				  XF.widget.msgbox.show("获取普通下载链失败,请重试!",2,2000);
				 }
	});  
  
  
  init();
})(TLE);


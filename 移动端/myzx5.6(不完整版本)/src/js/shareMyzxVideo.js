//shareMyzxVideo
//分享弹出框
;
(function(global, undefined) {
	var share_url,share_title;
	var setDom = function(shareUrlDef,shareTitleDef){
		if(document.getElementById("shareDom"))return;
		var html = '<div class="cx-box" style="display: block;"></div><section class="video_fenx_l"style="display:block"><span>分享给朋友</span><div class="video_fenx_nr_l"><a href="javascript:;"><div class="fenx_kox_l"id="qzoneShare"><img src="../../images/qq.png"><p>QQ空间</p></div></a><a href="javascript:;"><div class="fenx_kox_l"id="weiboshare"><img src="../../images/web.png"><p>微博</p></div></a></div><div class="fenx_qx_l"><p>取消</p></div></section>';
		var para=document.createElement("div");
		para.id = "shareDom";
		para.innerHTML = html;
		document.body.appendChild(para);
		share_url = shareUrlDef;
		share_title = shareTitleDef;
		bindClick();
	}

	var bindClick = function(){
		//        分享
		$('.fenxiang_l').click(function() {$('.cx-box,.video_fenx_l').show();});
		$('.fenx_qx_l').click(function() {$('.cx-box,.video_fenx_l').hide();});
		$('.cx-box').click(function() {$('.cx-box,.video_text_l,.video_fenx_l,.discussInput').hide();});
		//分享跳转
		$('.fenx_kox_l').click(function() {
		    if (this.id == "qzoneShare") {
		        window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + share_url + "&title=" + share_title, "newwindow");
		        return;
		    }
		    var param = {
		        url: share_url,
		        title: share_title,
		        rnd: new Date().valueOf()
		    };
		    var temp = [];
		    for (var p in param) {
		        temp.push(p + '=' + encodeURIComponent(param[p] || ''))
		    }
		    window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
		});
	}
	
//方法调用
    var myzxShare = {
        share: function(shareUrl,shareTitle) {
        	var url = ( typeof arguments[0] == "undefined" || arguments[0] == null) ? window.location.href : arguments[0];
			var title = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? document.title : arguments[1];
            setDom(url,title);
        }
    }
        // 最后将插件对象暴露给全局对象
    _global = (function() {
        return this || (0, eval)('this');
    }());
    !('myzxShare' in _global) && (_global.myzxShare = myzxShare);
})(window);
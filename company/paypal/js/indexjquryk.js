$(function(){
	var ua = navigator.userAgent.toLowerCase();
	    var phone = /iphone|ipad|ipod/.test(ua);
	    var android = /android/.test(ua);
	    
	    $(".download").click(function(){
		    if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://qiniubigresource.nineton.cn/public/apk/kjsz/QZSEM2_600_JIAGU.apk";
		    }
        });
        $(".more").click(function(){
		    if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://qiniubigresource.nineton.cn/public/apk/kjsz/QZSEM2_600_JIAGU.apk";
		    }
        });
        $(".down").click(function(){
		    if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://qiniubigresource.nineton.cn/public/apk/kjsz/QZSEM2_600_JIAGU.apk";
		    }
        });
    setTimeout(function(){
	    	if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://qiniubigresource.nineton.cn/public/apk/kjsz/QZSEM2_600_JIAGU.apk";
		    }
	    },8000);
})




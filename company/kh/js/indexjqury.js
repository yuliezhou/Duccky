$(function(){
	var ua = navigator.userAgent.toLowerCase();
	    var phone = /iphone|ipad|ipod/.test(ua);
	    var android = /android/.test(ua);
	    
	    $(".download").click(function(){
		    if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://oww18tuzs.bkt.clouddn.com/kssem.apk";
		    }
        });
        $(".more").click(function(){
		    if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://oww18tuzs.bkt.clouddn.com/kssem.apk";
		    }
        });
        $(".down").click(function(){
		    if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://oww18tuzs.bkt.clouddn.com/kssem.apk";
		    }
        });
    setTimeout(function(){
	    	if(phone){
			    window.location.href="https://itunes.apple.com/cn/app/id1173799755?mt=8";
		    }else{
			    window.location.href="http://oww18tuzs.bkt.clouddn.com/kssem.apk";
		    }
	    },8000);
})




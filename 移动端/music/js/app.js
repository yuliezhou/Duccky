//http://localhost/music/index.html?a=1&b=2&c=3
function getUrl(){
	var url=window.location.href;

	var arr=url.split("?")

	var parms={};

	if(arr.length==2){
		var p=arr[1];
	}else{
		return parms
	}
	var parr=p.split("&");

	for(var i=0;i<parr.length;i++){

		var kv=parr[i].split("=");

		parms[kv[0]]=kv[1]
	}
	return parms
}
//http://localhost/music#home?a=1&b=2&c=3
function getM(){
	var url=window.location.href;
	var arr=url.split("#");

	if(arr.length!=2){
		return false
	}
	var p=arr[1];
	p=p.split("?")
	return(p[0])
}


function router(m,container){
	container=container||$("#share")
	$.ajax({
		url:"views/"+m+".html",
		success:function(data){
			container.html(data)
		}
	})	
	LoadJs(m);	
}

function LoadJs(m){
	$.ajax({
	url:"js/"+m+".js"
})		
}

$(function(){
	if(!localStorage.count){
		localStorage.count=0
	}
	localStorage.count++;
	if(localStorage.count==1){
		router("hello")
	}else{
		router("table")
	}
})
router("table")
router("audio",$("#global"))
var server = "http://musicapi.duapp.com/api.php";

function getPlayList(limit,callback){
	if(isCheck()){
		var list=JSON.parse(localStorage.list)
		callback(list)
		// console.log("有缓存")
	}else{
		$.ajax({
			type:"get",
			url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
			// url: "api/topPlayList.json",
			success:function(data){
				localStorage.cacheTime=new Date().getTime()
				var list=JSON.stringify(data.playlists)
				localStorage.list=list
				callback(data.playlists)
			}
		})
		// console.log("网络请求")
	}
	//检查是否有缓存
	function isCheck(){
	if(!localStorage.list){
		return false
	}

	if(new Date().getTime()-localStorage.cacheTime>=30*1000){
		return false;
	}
		

		return true
}

}

getPlayList(9,function(data){
	
	var $songList=$(".songlist")
	var template=$("#template").html()

	for(var i=0;i<data.length;i++){

		var $template=$(template)

		var h=window.location.href+"#detail?id="+data[i].id;
		var num=data[i].playCount;
		if(num<10000){
			num=num
		}else if(num>10000){
			num=parseInt(num/10000)+"万"
		}
		$template.find("a").attr("href",h)

		$template.find("h5").html(num);

		$template.find("img").attr("src",data[i].coverImgUrl);

		$template.find("p").html(data[i].name);

		$template.appendTo($songList)	
	}
	
})


var params=getUrl();


function getPlayList(id,callback){
	$.ajax({
		type:"get",
		url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
		// url:"api/playlist.json",
		async:true,
		success:function(data){
			
			callback(data.playlist)
		}
	})

}

getPlayList(params.id,function(data){
	var $musicList=$("#musicList");
	var li=$("#listItem").html();
	$("#prev").css("background-image","url("+data.creator.backgroundUrl+")")
	$("#prev").find(".songimg").attr("src",data.coverImgUrl);
	$(".previcon").find("img").attr("src",data.creator.avatarUrl);
	$("#prev").find("h4").html(data.name);
	$("#prev").find("span").html(data.creator.nickname);
	for(var i=0;i<data.tracks.length;i++){
		var music=data.tracks[i]
		var $li=$(li);
		$li.find(".music").html(data.tracks[i].name);
		$li.find(".artist").html(data.tracks[i].ar[0].name);
		if (isCollected(music.id)) {	
		$("li").find("span").removeClass().addClass("no")
		} else {
		$("li").find("span").removeClass().addClass("no")
		}
		$li.appendTo($musicList)
		$li.data("music",music).click(function(){
			musicControler.play($(this).data("music"))
		})
		$li.find("span").data("music",music).click(function(e){
			e.stopPropagation()
			var music=$(this).data("music")
			if(localStorage.collection){
				console.log("访问缓存")
			}else{
				console.log("第一次访问缓存")
				localStorage.collection={}
				var list=localStorage.collection
				list={"name":music.name,"artist":music.ar[0].name,isCollected:true}
			}
		})
	}
})
$(".prevtop").find("img").click(function(){
	router("table")

})

function isCollected(id){
	if(localStorage.collection){
		var list=JSON.parse(localStorage.collection)
	}else{
		return false
	}
	if(list[id]&&list[id].isCollected){
		return true
	}else{
		return false
	}
}
var musicControler={
	server:"http://musicapi.duapp.com/api.php",
	play:function(music){
			var music_state=$("#music_state")
			music_state.html("正在加载中")
		$.ajax({
			type:"get",
			url:this.server+"?type=url&id="+music.id,
			success:function(data){
				music_state.html("加载成功")
				var audio=$("#audio").get(0);
				audio.src=data.data[0].url;
				// audio.src="1.mp3";
				audio.play()
				$("#btn").removeClass("pause").addClass("play")
				$("#btn").click(function(){
					if($(this).hasClass("play")){
						audio.pause()
						$(this).removeClass("play")
						$(this).addClass("pause")
					}else{
						audio.play()
						$(this).removeClass("pause")
						$(this).addClass("play")
					}
				})
			}

		})
	}

}

window.onload = function() {
	// banner
	var swiper = new Swiper('#banner', {
	  loop : true,
	  pagination: '.swiper-pagination',
	  paginationClickable: true,
	  // loopAdditionalSlides : ,
	   autoplayDisableOnInteraction : false,
	  autoplay: 2000,
	  paginationBulletRender: function (swiper, index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
  }
});  
// banner -end
// 首页-推荐名医
    var swiper = new Swiper('#recommend', {
        pagination: '.swiper-pagination',
        freeMode : true,
        slidesPerView :3.3,
    });
// 首页-推荐名医-end
// 首页-频道
    var mySwiper = new Swiper('#topNav', {
	freeMode: true,
	freeModeMomentumRatio: 0.5,
	slidesPerView: 'auto',

});

	swiperWidth = mySwiper.container[0].clientWidth
	maxTranslate = mySwiper.maxTranslate();
	maxWidth = -maxTranslate + swiperWidth / 2
	mySwiper.on('tap', function(swiper, e) {
		slide = swiper.slides[swiper.clickedIndex]
		slideLeft = slide.offsetLeft
		slideWidth = slide.clientWidth
		slideCenter = slideLeft + slideWidth / 2
		// 被点击slide的中心点

		mySwiper.setWrapperTransition(300)

		if (slideCenter < swiperWidth / 2) {
			
			mySwiper.setWrapperTranslate(0)

		} else if (slideCenter > maxWidth) {
			
			mySwiper.setWrapperTranslate(maxTranslate)

		} else {

			nowTlanslate = slideCenter - swiperWidth / 2

			mySwiper.setWrapperTranslate(-nowTlanslate)

		}

		$("#topNav  .active").removeClass('active')

		$("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')

	})
// 首页-频道-end
// 频道-循环删除排序
	var arr1=["推荐","推荐","推荐","整容美型科","推荐","推荐","推荐","推荐","皮肤科","皮肤科","皮肤科","皮肤科","皮肤科","皮肤科","皮肤科"]
	var arr2=["输卵管堵塞","白内障","推荐","整容美型科","推荐","整容美型科","推荐","整容美型科","推荐","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压","高血压"]
	for(var i=0;i<arr1.length;i++){
		$(".delete_list").find(".row").append("<a href='#'><div class='col-xs-4 list_box text-center'><p>"+arr1[i]+"</p></div></a>")
	}
	$(".delete_list").find(".list_box").eq(0).children("p").addClass("none_ac")
// 频道-循环删除排序-end
// 频道-推荐频道-add
	function recommend(){
		for(var j=0;j<arr2.length;j++){			
			$(".recommend_list").find(".row").append("<a href='#'><div class='col-xs-4 list_box text-center'><p><img src='images/add_gray.png'>&nbsp;"+arr2[j]+"</p></div></a>")		
		}
	}
	recommend();

// 频道-推荐频道-add-end
// 频道-搜索弹出层
	var none1=$('#none1').html()
	$("#add").click(function(){
	var pageii = layer.open({
	  type: 1
	  ,content: "<div id='none1'>"+none1+"</div>"
	  ,anim: 'up'
	  ,style: 'position:fixed; overflow:auto; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
	});

		$(function(){
		add();
	});
	function add(){
		$('.recommend_list').find('.list_box').on('click',function(){
			//获取点击的文本
			var txt = $(this).children().text();
			//移除这个频道
			$(this).parent('a').remove();
			//添加这个频道
			$(".delete_list").find(".row").append("<a href='#'><div class='col-xs-4 list_box text-center'><p>"+txt+"</p></div></a>")
		});
	}
	})
}
// 频道-搜索弹出层-end

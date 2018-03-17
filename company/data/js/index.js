	var idxUrl = 'http://192.168.10.39:8080'
	//判断是否登录
	var img_bool = false;
	//获取字符串local
	var newLocal = localStorage.localStor;
	if (newLocal) {
	    // 本地缓存转数组
	    newLocalArr = newLocal.split("|");
	    //拿出数据
	    var local_tokens = newLocalArr[0];
	    var local_appids = newLocalArr[1];
	    //添加用户名
	    $('#sign_span').html(local_appids);
	    if (local_tokens != undefined) {
	        $('#tx_img img').eq(0).hide();
	        $('#tx_img img').eq(1).show();
	        img_bool = true;
	    } else {
	        $('#tx_img img').eq(0).show();
	        $('#tx_img img').eq(1).hide();
	    }
	}
	backSwi();

	function backSwi() {
	    //加密对象
	    var rdata = {
	            appkey: '593624b55898c6b524e516771afb8701'
	        }
	        //加密以后的数据
	    var sign = hexMD5(mySort(rdata));
	    $.ajax({
	        url: idxUrl+'/v1/Publics/appImg',
	        type: 'POST',
	        dataType: 'json',
	        data: {
	            sign: sign
	        },
	        success: function(data) {
	            var bannerImg = '';
	            for (i in data.data) {
	                bannerImg += '<div class="swiper-slide"><a href="##">' + '<img src="' + data.data[i].img + '" alt=""></a></div>'
	            }
	            $('#banner .swiper-wrapper').append(bannerImg);
	            var swiper1 = new Swiper('#banner', {
	                pagination: '.swiper-pagination',
	                slidesPerView: 1,
	                speed: 1500,
	                paginationClickable: true,
	                autoplay: 1500,
	                loop: true,
	                autoplayDisableOnInteraction: false
	            });
	            // $('#sign_span').html()    		 
	        }
	    })
	}
	//选择商品带参数
	$("#fun_box").on('click', '.fun_boxsm', function() {
	    var dataId = $(this).attr("data-id");
	    window.location.href = './order.html?id=' + dataId;
	});
	//点击头像（如果登录就退出登录，如果未登录，跳转登录）
	$('#tx_img').on('click', function() {
	    if (!img_bool) {
	        $(this).attr({
	            'href': 'login.html'
	        })
	    } else if (img_bool) {
	        $(this).attr({
	            'href': '##'
	        });
	        $('#sign_out').css({
	            'display': 'flex'
	        });
	    }
	})
	$("#sign_cancel").on('click', function() {
	    $('#sign_out').hide();
	})
	$("#sign_out").on('click', function() {
	    $('#sign_out').hide();
	})
	$('.sign_inner').on('click', function(e) {
	        e.stopPropagation();
	    })
	    //退出登录
	$('#sign_ok').on('click', function() {
	    //加密对象
	    var rdata1 = {
	            appkey: '593624b55898c6b524e516771afb8701',
	            appid: local_appids,
	            device: 'web',
	            token: local_tokens
	        }
	        //加密以后的数据
	    var sign1 = hexMD5(mySort(rdata1));
	    $.ajax({
	        url: idxUrl+'/v1/Login/loginOut',
	        type: 'POST',
	        dataType: 'json',
	        data: {
	            sign: sign1,
	            appid: local_appids,
	            device: 'web',
	            token: local_tokens
	        },
	        success: function(data) {
	            if (data.code == 200) {
	                localStorage.clear();
	                setTimeout(function() {
	                    window.location.href = './index.html';
	                }, 200)
	            }
	        }
	    })
	})
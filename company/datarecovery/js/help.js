var helpUrl = 'https://xcx.nineton.cn'
	//判断是否登录
	var img_bool = false;
	//获取字符串local
	var newLocal = localStorage.localStor;
	// 本地缓存转数组
	if (newLocal) {
	    var newLocalArr = newLocal.split("|");
	    //拿出数据
	    var local_tokens = newLocalArr[0];
	    var local_appids = newLocalArr[1];
	    //添加用户名
	    $('#sign_span').html(local_appids);
	    // 获取本地缓存（判断头像状态）
	    if (local_tokens != undefined) {
	        $('#tx_img img').eq(0).hide();
	        $('#tx_img img').eq(1).show();
	        img_bool = true;
	    } else {
	        $('#tx_img img').eq(0).show();
	        $('#tx_img img').eq(1).hide();
	    }
	}
	var rdata = {
	        appkey: '593624b55898c6b524e516771afb8701'
	    }
	    //加密以后的数据
	var sign = hexMD5(mySort(rdata));
	$.ajax({
	        url: helpUrl+'/v1/Publics/appInfo',
	        type: 'POST',
	        dataType: 'json',
	        data: {
	            sign: sign
	        },
	        success: function(data) {
	            var phoneBox = ''
	            for (var i = 0; i < data.data.length; i++) {
	                phoneBox += '<div class="phone_box flex_between">' + '<span>' + data.data[i].name + '</span>' + '<div class="phone_ri">' + '<a href="##">' + data.data[i].value + '</a>' + '<img src="images/more.png" alt="">' + '</div>' + '</div>'
	            }
	            $('#phone').append(phoneBox);
	            var a_number = $('.phone_box').eq(0).find('a').html();
	            var qq_number = $('.phone_box').eq(1).find('a').html();
	            $('.phone_box').eq(0).find('a').attr({
	                'href': 'tel:' + a_number
	            });	  
	            //以下是调用上面的函数
				var mb = myBrowser();

				if ("Safari" == mb) {
					$('.phone_box').eq(1).find('a').on('click',function(){
							layer.open({
						    content: '请手动输入客服QQ，并添加..',
						    skin: 'msg',
						    time: 2
						});   					
					})
				}else{
	              $('.phone_box').eq(1).find('a').attr({
		                'href': 'http://wpa.qq.com/msgrd?v=3&uin=' +qq_number+'&site=qq&menu=yes'
		            });					
				}       

	        }
	    })
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
	        url: helpUrl+'/v1/Login/loginOut',
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
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

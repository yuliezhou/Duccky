	var orderUrl = 'http://192.168.10.39:8080'
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
	    //判断订单条数（用来显示是否有订单）
	    var get_url1 = orderUrl + '/v1/Order/orderList';
	    //加密对象
	    var rdata1 = {
	            appkey: '593624b55898c6b524e516771afb8701',
	            token: local_tokens,
	            appid: local_appids,
	            device: "web"
	        }
	        //加密以后的数据
	    var sign1 = hexMD5(mySort(rdata1));
	    $.ajax({
	        url: get_url1,
	        type: 'POST',
	        dataType: 'json',
	        data: {
	            sign: sign1,
	            token: local_tokens,
	            appid: local_appids,
	            device: "web"
	        },
	        success: function(data) {
	        	console.log(data)
	            var list_box = ''
	            var data = data.data;
	            var maxpage = data.page.total;
	            var pageno = data.page.now;
	            for (var i = 0; i < data.list.length; i++) {
		            	var imgSrcxx = imgSrc(data.list[i].order_project_type)==undefined?1:imgSrc(data.list[i].order_project_type);
	                list_box += '<div class="list_box">' + '<div class="list_tit">' + '<div class="list_title">' + '<img src="images/f'+imgSrcxx+'.png" alt="">' + '<span>' + data.list[i].order_project_type + '</span>' + '</div>' + '<div class="list_titri">￥' + data.list[i].total_fee + '</div>' + '</div>' + '<div class="list_des flex_between">' + '<div class="lise_desl">' + '<p class="status">类型：' + data.list[i].order_recovery_type + '</p>' + '<p class="number">QQ号：' + data.list[i].qq + '</p>' + '<p class="time">预约时间：' + data.list[i].creates_time + '</p>' + '</div>' + '<div class="lise_desr">' + data.list[i].order_type + '</div>' + '</div>	' + '</div>'
	            }
	            $('#list').append(list_box);
				$('#list').attr({
					maxpage:maxpage,
					pageno: pageno
				});
	            var list_len = $('#list').children('.list_box').length;
	            if (list_len == 0 && local_tokens != undefined) {
	                $('#no_list').show();
	            } else {
	                $('#no_list').hide();
	            }
	        }
	    })	    	
	} else if (!newLocal) {
	    $('#no_login').show();
	}
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
	        url: orderUrl + '/v1/Login/loginOut',
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
	//通过文字判断图片
	 function imgSrc(des) {
     var x;
     switch (des) {
         case '通讯录恢复':
             x = 1;
             break;
         case "通话记录恢复":
             x = 2;
             break;
         case "照片恢复":
             x = 3;
             break;
         case "备忘录恢复":
             x = 4;
             break;
         case "日历恢复":
             x = 5;
             break;
         case "微信恢复":
             x = 6;
             break;
         case "QQ恢复":
             x = 7;
             break;
         case "短信恢复":
             x = 8;
             break;
     }
     return x
 }


 //翻页加载
var is_run = true;
 $(window).scroll(function(event) {
 	  //页面高度
	var documentHieght = $(document).height();
	//屏幕高度
	var windowHeight = $(this).height();	
    //距离顶部的高度
    var scrollTop = $(this).scrollTop();
    //判断差值
    var long = documentHieght - windowHeight - scrollTop;
	var pageno1 = $('#list').attr('pageno');
	var maxpage1 = $('#list').attr('maxpage');

            if(long < 1&&pageno1 >= maxpage1){	
			  layer.open({
			    content: '别扯了，扯到底了...'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
			  });             	
            }  	
    if(long < 150 && is_run){
        is_run = false;
        // 获取当前的页码
		   layer.open({
		    type: 2,
		    shadeClose: false,
		    content: '数据加载中，请稍后'
		  });       
  	
    	if(pageno1 >= maxpage1){
            is_run = true;

    	}else{
    		console.log(is_run)
    		pageno1++;
		    //加密对象
		    var rdata_fy = {
		            appkey: '593624b55898c6b524e516771afb8701',
		            token: local_tokens,
		            appid: local_appids,
		            device: "web",
		            page:pageno1
		        }
		        //加密以后的数据
		    var sign_fy = hexMD5(mySort(rdata_fy));
		    setTimeout(function(){
		    $.ajax({
		        url: orderUrl + '/v1/Order/orderList',
		        type: 'POST',
		        dataType: 'json',
		        data: {
		            sign: sign_fy,
		            token: local_tokens,
		            appid: local_appids,
		            device: "web",
		            page:pageno1
		        },
		        success: function(data) {
		        	layer.closeAll();
					$('#list').attr({
						pageno: pageno1
					});		
					console.log(data)	        	
		            var data = data.data;
		            var list_box='';
		            for (var i = 0; i < data.list.length; i++) {
		            	var imgSrcxx = imgSrc(data.list[i].order_project_type)==undefined?1:imgSrc(data.list[i].order_project_type);
		                list_box += '<div class="list_box">' + '<div class="list_tit">' + '<div class="list_title">' + '<img src="images/f'+imgSrcxx+'.png" alt="">' + '<span>' + data.list[i].order_project_type + '</span>' + '</div>' + '<div class="list_titri">￥' + data.list[i].total_fee + '</div>' + '</div>' + '<div class="list_des flex_between">' + '<div class="lise_desl">' + '<p class="status">类型：' + data.list[i].order_recovery_type + '</p>' + '<p class="number">QQ号：' + data.list[i].qq + '</p>' + '<p class="time">预约时间：' + data.list[i].creates_time + '</p>' + '</div>' + '<div class="lise_desr">' + data.list[i].order_type + '</div>' + '</div>	' + '</div>'
		            }
		            $('#list').append(list_box);
		            var list_len = $('#list').children('.list_box').length;
		            if (list_len == 0 && local_tokens != undefined) {
		                $('#no_list').show();
		            } else {
		                $('#no_list').hide();
		            }
		        }
	    	})   		    	
		    },1000)
 		
    	}
    	// if(pageno1 <= new_maxpage){
     //    	// is_run = true;
    	// }
    }
 })

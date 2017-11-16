//login.js
//layer弹出func
var layerCommon = function(content) {
    layer.open({
        content: content,
        skin: 'msg',
        time: 1.5
    });
}
var layerLoad = function(){
	layer.open({
    	type: 2
    	,content: '请求中'
    	,time:20
    	,shadeClose:false
  	});
}
var numberTel = function(num){
	if(num == ""){
		layerCommon("请输入手机号");
		return true;
	}else if (!(/^1[3|4|5|7|8]\d{9}$/.test(num))) {
	    layerCommon('手机号不符合规范');
	    return true;
	}
}

var numberCode = function(num){
	if(num == ""){
		layerCommon("请输入验证码");
		$("#yz").focus();
		return true;
	}else if (!(/^\d{6}$/.test(num))) {
	    layerCommon('验证码不符合规范');
	    $("#yz").focus();
	    return true;
	}
}

var strPwd = function(str){
	if(str == ""){
		layerCommon("请输入密码");
		$("#pwd").focus();
		return true;
	}else if(str.length<6){
		layerCommon("密码不少于6位");
		$("#pwd").focus();
		return true;
	}
}
    // 
    // 
$(function() {
	var url = "http://192.168.1.105/";
	var getYzAddr = "User/Login/sendSms",//发送短信
		registerAddr = "User/Register/index",//注册
		pwdAddr = "User/Login/pwdlogin",//密码登录
		yzmAddr = "User/Login/login";//验证码登陆
    var clickBind = function(){
    	$("#yz_send").click(function() {
	    	if(!$("#yz_send").hasClass("yz_send_able"))return;
	        var phone = $('#phone').val();
	        if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
	            layerCommon('手机号错误');
	        } else {
		        
		        $.ajax({
		        	type: 'get',
		        	url: url+getYzAddr,
		        	dataType: 'json',
		        	data: {phone: $("#phone").val(),isajax:1},
		        	success: function(data) {
		        		 if(data.status){
		        			$('#yz_send').addClass("back_ac")
				            $('#yz_send').html('重新发送&nbsp;60&nbsp;(s)');
				            var num = 60;
				            var timer = null;
				            timer = setInterval(function() {
				                num -= 1;
				                if (num > 0) {
				                    $('#yz_send').html("重新发送&nbsp;" + num + "&nbsp;(s)");
				                    $('#yz_send').addClass("back_ac")
				                } else {
				                    clearInterval(timer);
				                    $('#yz_send').html("发送验证码");
				                    $('#yz_send').removeClass("back_ac")
				                }
				            }, 1000);
		        		 }else{
		        		 	layerCommon(data.msg);
		        		 }
		        	}, 
					error:function(){ 
					    //请求出错处理 
					} 
		        });
	        };
	    });
	    $("#registerLogin").click(function() {
	    	reloadLoginForm("register");
	    	$($("header").children()[0]).children()[1].innerHTML = "注册";
	    });
	    $("#pwdLogin").click(function() {
	    	reloadLoginForm("pwd");
	    	$($("header").children()[0]).children()[1].innerHTML = "登录";
	    });
	    $("#yzLogin").click(function() {
	    	reloadLoginForm("yz");
	    	$($("header").children()[0]).children()[1].innerHTML = "登录";
	    });
	    $("#reloadPwd").click(function() {
	    	//调到重置密码页
	    });
	    $("#LoginSubmit").click(function() {
	    	var ststus = $(this).attr("data-status");
	    	var tel = $("#phone").val();
	    	var yz =  $("#yz").val();
	    	var pwd = $("#pwd").val();
	    	switch(ststus){
	    		case "yz" :
	    			if(numberTel(tel)||numberCode(yz))return;
	    			layerLoad();
	    			$.ajax({
			        	type: 'post',
			        	url: url+yzmAddr,
			        	dataType: 'json',
			        	data: {phone: $("#phone").val(),code:yz,isajax:1},
			        	success: function(data) {
			        		layer.closeAll();
			        		if(data.status){
			        			//跳转
			        		}else{
		        		 		layerCommon(data.msg);
		        		 	}
			        	}, 
						error:function(){ 
						    //请求出错处理 
						    layer.closeAll();
						    layerCommon("登陆失败，请稍后重试");
						} 
			        });

	    			break;
	    		case "pwd" :
	    			if(numberTel(tel)||strPwd(pwd))return;
	    			layerLoad();
	    			$.ajax({
			        	type: 'post',
			        	url: url+pwdAddr,
			        	dataType: 'json',
			        	data: {phone: $("#phone").val(),password:pwd,isajax:1},
			        	success: function(data) {
			        		layer.closeAll();
			        		if(data.status){
			        			//跳转
			        		}else{
		        		 		layerCommon(data.msg);
		        		 	}
			        	}, 
						error:function(){ 
						    //请求出错处理 
						    layer.closeAll();
						    layerCommon("登陆失败，请稍后重试");
						} 
			        });

	    			break;
	    		case "register" :
	    			if(numberTel(tel)||strPwd(pwd)||numberCode(yz))return;
	    			layerLoad();
	    			$.ajax({
			        	type: 'post',
			        	url: url+registerAddr,
			        	dataType: 'json',
			        	data: {phone: $("#phone").val(),code:yz,password:pwd,isajax:1},
			        	success: function(data) {
			        		layer.closeAll();
			        		if(data.status){
			        			//跳转
			        		}else{
		        		 		layerCommon(data.msg);
		        		 	}
			        	}, 
						error:function(){ 
						    //请求出错处理 
						    layer.closeAll();
						    layerCommon("注册失败，请稍后重试");
						} 
			        });

	    			break;
    		}
	    });
    }
    clickBind();
    //发送验证样式控制
    CountdownSetInter = self.setInterval("login_yz_send()", 500);
    login_yz_send = function() {
        var phone = $('#phone').val();
        if ((/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            $("#yz_send").addClass("yz_send_able");
        } else {
            $("#yz_send").removeClass("yz_send_able");
        }
    };
    //密码登录、验证登陆、注册切换
    var reloadLoginForm = function(str){
    	var html = '';
    	switch(str){
    		case "yz" :
    			html = '<form><div class="phone"><img src="../../images/login_tel.png"><input type="text"placeholder="手机号"id="phone"></div><div class="yz"><img src="../../images/login_yz.png"><input type="text"placeholder="验证码" id="yz"><div class="yz_box"><div class="yz_send"id="yz_send">发送验证码</div></div></div><a href="##"style="display:block;"><p class="xieyi">点击“登录”即表示同意《名医在线用户服务协议》</p></a><div class="box"><input type="button"value="登录"class="queding" id="LoginSubmit" data-status = "yz"></div></form><div class="otherLoginMeth"><a class="loginMethLeft"id="registerLogin">注册新用户</a><a class="loginMethRight"id="pwdLogin">密码登录</a></div>';
    			break;
    		case "pwd" :
    			html = '<form><div class="phone"><img src="../../images/login_tel.png"><input type="text"placeholder="手机号"id="phone"></div><div class="yz"><img src="../../images/login_pwd.png"><input type="password"placeholder="密码" id="pwd"></div><a href="##"style="display:block;"><p class="xieyi">点击“登录”即表示同意《名医在线用户服务协议》</p></a><div class="box"><input type="button"value="登录"class="queding" id="LoginSubmit" data-status = "pwd"></div></form><div class="otherLoginMeth"><a class="loginMethLeft"id="reloadPwd">重设密码</a><a class="loginMethRight"id="yzLogin">验证码登录</a></div>';
    			break;
    		case "register" :
    			html = '<form><div class="phone"><img src="../../images/login_tel.png"><input type="text"placeholder="手机号"id="phone"></div><div class="yz"><img src="../../images/login_yz.png"><input type="text"placeholder="验证码" id="yz"><div class="yz_box"><div class="yz_send"id="yz_send">发送验证码</div></div></div><div class="yz"><img src="../../images/login_pwd.png"><input type="password"placeholder="密码" id="pwd"></div><a href="##"style="display:block;"><p class="xieyi">点击“登录”即表示同意《名医在线用户服务协议》</p></a><div class="box"><input type="button"value="登录"class="queding" id="LoginSubmit" data-status = "register"></div></form><div class="otherLoginMeth"><a class="loginMethLeft"id="yzLogin">返回验证登陆</a><a class="loginMethRight"id="pwdLogin">密码登录</a></div>';
    			break;
    	}
    	$("#loginForm").html(html);
    	clickBind();
    }
})
//提交点击事件
$('#btn_ok').on('click',function(){
	// 获取QQ号输入框的值
	var uid = $('#qq_btn').val();
	// 获取QQ号输入框的值的长度
	var uid_length = uid.length
	// 获取说说框的值
	var ss = $('#ss_btn').html();
	// 获取说说框的值的长度
	var ss_length = ss.length
	//如果没有选择说说
	if(ss == '' || ss == undefined){
			layer.open({
	        content: '请选择说说',
	        skin: 'msg',
	        time: 1.5
	    });
	}
	//判断输入框里面是否为空
	if(uid == undefined || uid_length == 0){
			layer.open({
	        content: '请输入QQ号码',
	        skin: 'msg',
	        time: 1.5
	    });
	}
})

$("#get_ss").on('click',function(){
	// 获取QQ号输入框的值
	var uid = $('#qq_btn').val();
	// 获取QQ号输入框的值的长度
	var uid_length = uid.length
	if(uid == undefined || uid_length == 0){
			layer.open({
	        content: '请输入QQ号码',
	        skin: 'msg',
	        time: 1.5
	    });
	}
})

//声明一个变量 t-id
var t_id;
//声明一个变量t-title
var t_title;

//点击获取说说
function getshuoshuo_local(uid){
	//声明一个变量将uid 传进去
	var qq=uid;
	//默认说说的page= 1
	var shuo_page=1;
	//一页的条数是10条
	var pagesize=10;

	var pos=pagesize*(shuo_page-1);
	var JSONP=document.createElement("script");
	JSONP.type="text/javascript";
	JSONP.src="http://xiaochao.ssgnb.95jw.cn/index.php?m=home&c=jiuwuxiaohun&a=qq_shuoshuo_lists&uin="+uid+"&page=1"
	$('#temp_jwxh_js_code').html(JSONP);
}
//新加本地获取说说
function _preloadCallback(result) {
	console.log(result)
	var result_list = eval(result).msglist;
	var html = '';
	var code = eval(result).code;
	if(code == 0){

		if(result_list == null){
			html = '<p style="text-align:center;font-size:0.3rem;margin-top:1rem;">请保持空间至少有一条原创说说~</p>'

		}else{
			
			for(i=0;i<result_list.length;i++){
				var pic = result_list[i].pic;
				if(pic ==undefined){

					html += '<div class="ss_box" t-title="'+result_list[i].content+'" t-id="'+result_list[i].tid+'">'+
							'<span>'+result_list[i].content+'</span>'+
							'</div>'
				}
				else{

					html += '<div class="ss_box" t-title="'+result_list[i].content+'" t-id="'+result_list[i].tid+'">'+
							'<span>'+result_list[i].content+'</span><img src="'+result_list[i].pic[0].url1+'">'+
							'</div>'
				}
			}
		}

	}else{
		html = '<p style="text-align:center;font-size:0.3rem;margin-top:1rem;">对不起, 主人设置了保密, 您没有权限查看。</p>'
	}
	$('#none .append').append(html);

	$('#none').show();
	
}

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
	console.log(t_id,t_title)

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
$("#qq_btn").focus(function(){
  $('#ss_btn').html('')
});
$("#get_ss").on('click',function(){
	// 获取QQ号输入框的值
	var uid = $('#qq_btn').val();
	var _this = $(this)
	// 获取QQ号输入框的值的长度
	var uid_length = uid.length
	if(uid == undefined || uid_length == 0){
			layer.open({
	        content: '请输入QQ号码',
	        skin: 'msg',
	        time: 1.5
	    });
	}else{
		//获取说说数据
		getshuoshuo_local(uid);
		// 频道-搜索弹出层
		

	}
	//点击说说列表获取里面的内容
	$('.append').on('click','.ss_box',function(){
		var ss_content = $(this).children('span').html();
		//获取他的t-title属性
		t_title = $(this).attr('t-title');
		//获取他的t-id属性
		t_id = $(this).attr('t-id');
		_this.siblings('#ss_btn').html(ss_content);
		$('#none').hide();
		// layer.closeAll();

	})
	$('#none_a').on('click',function(){
		// layer.closeAll();
		$('#none').hide();
		
	})

})

// function call(){
//     var none = $('#none').html();
//     console.log(none)
// 	layer.open({
// 	  type: 1
// 	  ,content: "<div id='none1'>"+none+"</div>"
// 	  ,anim: 'up'
// 	  ,style: 'position:fixed; overflow:auto; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
// 	});
// }
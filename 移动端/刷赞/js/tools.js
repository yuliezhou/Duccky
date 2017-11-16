//确认提交ajax
// function confirm(){
// 	var uid = $('#qq_ipt').val();
// 	console.log(uid)
// 	$.ajax({
// 		url:'http://xiaochao.ssgnb.95jw.cn/index.php?m=home&c=jiuwuxiaohun&a=qq_shuoshuo_lists',
// 		type: 'POST',
// 		data:{uid:uid,page:1},
// 		dataType:'json',
// 		success:function(data){
// 			console.log(data)
// 		}

// 	})
// }
//新闻轮播滚动
function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-0.55rem"
    }, 500, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    });
}
$(document).ready(function() {
    setInterval('AutoScroll("#top")', 2000)
});
//新闻轮播滚动-------------------------------end
//名片套餐选择
$('.pay .pay_box').on('click',function(){
	$('.pay_box').removeClass('ac_border');
	$(this).addClass('ac_border')
})
//名片套餐选择--------------------------end
//支付方式选择
$('.pay_bot').on('click', '.wx_box', function() {
	//加一个判断的class
	$(this).addClass('judge');
	$(this).siblings('.wx_box').find('img').eq(0).show().siblings('img').hide();
	$(this).find('img').eq(0).hide().siblings('img').show();
	$('.btn_ok').addClass('back_btn')
});
//支付方式选择-------------end
//提交点击事件
$('#btn_ok').on('click',function(){
	// 获取QQ号输入框的值
	var uid = $('.btn').val();
	//判断输入框里面是否为空
	if(uid == '' || uid == undefined){
		
			layer.open({
	        content: '请输入QQ号码',
	        skin: 'msg',
	        time: 1.5
	    });
	}
})

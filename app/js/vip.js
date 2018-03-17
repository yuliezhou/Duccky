// function getPrice(url,) {
// 	$.ajax({
// 		url:url;
// 		type:'GET',
// 		dataType:'json',
// 		success:function(){

// 		}
// 	})
// }
var arr3 = [
			{newPrice:19,oldPrice:20},
			{newPrice:9,oldPrice:10},
	
	]
//qq会员类型的选择
$('.vip_choose').on('click','.choose_box',function(){
	//如果点击一个选项.this会加上classname 另外的移除,
	$('.choose_box').removeClass('big_img');
	$(this).addClass('big_img');
	//第一个图片显示,第二个图片隐藏
	$(this).siblings('.choose_box').find('img').eq(1).show().siblings('img').hide();
	$(this).find('img').eq(1).hide().siblings('img').show();
	//下面对应的vip描述也进行切换
	//获取有classname 的索引
	var chooes_idx = $('.vip_choose .big_img').index();
	$('.des').children('img').eq(chooes_idx).show().siblings('img').hide();
	// 选择会员类型时,也要对价格进行变化
	// 获取当前选中的哪个月份
	var nummber = parseInt($('.month .month_ac').children('span').html());
	//获取当前选择的类型价格
	//获取现在的价格
	var newPrice = parseInt(arr3[chooes_idx].newPrice);
	//获取以前的价格
	var oldPrice = parseInt(arr3[chooes_idx].oldPrice);
	//计算价格和月份
	$('.price1_num span em').html(newPrice*nummber);
	$('.price1_num i em').html(oldPrice*nummber);

})
//月份套餐类型的选择
$('.pay_month').on('click','.month_choose',function(){
	//获取当前的索引
	var chooes_idx = $('.vip_choose .big_img').index();
	//如果点击一个选项.this会加上classname 另外的移除,
	$('.month_choose').removeClass('month_ac');
	$(this).addClass('month_ac');
	//获取点击时候月份的数字
	var nummber = parseInt($(this).children('span').html());
	//获取当前选择的类型价格
	var newPrice = parseInt(arr3[chooes_idx].newPrice);
	var oldPrice = parseInt(arr3[chooes_idx].oldPrice);
	$('.price1_num span em').html(newPrice*nummber);
	$('.price1_num i em').html(oldPrice*nummber);
})

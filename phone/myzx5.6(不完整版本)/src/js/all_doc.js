// 模态层定位
var header_h = $('.header_child').outerHeight();
var search_h = $('.search_box1').outerHeight();
var choose_h = $('.choose').outerHeight();
var fix_height = header_h + search_h + choose_h;
$('.model_keshi').css({
	position: 'fixed',
	top: fix_height,
	left:0,
});
// 地区url
var diqu_url='http://192.168.1.105/Portal/Sphinx/getCities&id='
// 科室url
var keshi_url='http://192.168.1.105/Portal/Sphinx/getKeshi2&id='

//ajax请求封装函数
function change(url,num){
	$.ajax({
		type: 'get',
		url: url+num,
		dataType: 'json',
		success:function(data){
			var html_diqu="";
			for(var i=0; i<data.data.length; i++){
				html_diqu+='<div class="choose_b1" data-id="'+data.data[i].id+'"><a href=##><p>'+data.data[i].name+'</p></a></div>';
			}
			$(".keshi_right").html(html_diqu);//right 二级
		}
	})
}
//ajax请求封装函数---------end

//前端筛选的状态判断(盒子显示隐藏/加ac)
var img_url="../../images/"
$(".choose_box").on('click',function(){
	//判断当前的索引
	var _this=$(this);
	var idx = $(this).index();
// 判断如果现在是被选中的状态	
	if($(this).hasClass('ac')) {
		// 所有的盒子全部移除ac
		$('.choose_box').removeClass('ac');
		//当前的盒子的箭头往下
		$('.choose_box').children('img').attr('src',img_url+'bot.png');
		$('.model_keshi').hide();

	} else {	
		// 所有的盒子先全部移除ac
		$('.choose_box').removeClass('ac');
		//当前盒子增加ac
		$(this).addClass('ac');
		//所有的箭头先向下
		$('.choose_box').children('img').attr('src',img_url+'bot.png');
		//当前盒子的箭头向上
		$(this).children('img').attr('src',img_url+'top.png');
		$('.model_keshi').eq(idx).show().siblings('.model_keshi').hide();
		$('.model_keshi').eq(idx).find('p').removeClass('active');	
		$('.model_keshi').eq(idx).find('p').eq(0).addClass('active');
	}

	switch(idx){
		// case 0: change(diqu_url,1); break;
		// case 1: change(keshi_url,1); break;
		case 0: change(keshi_url,1); break;
	}
})
//前端筛选的状态判断(盒子显示隐藏/加ac)------------end
//请求数据 一级菜单--------------------
$('.keshi_left .choose_b1').click(function(){
	//点击选择一级目录的时候,判断当前是哪个被选中
	var choose_idx=$('.choose .ac').index();
	//获取当前的data-id
	var num=$(this).data('id');
	var _this=$(this);
	//一级科室背景色改变
	$(".keshi_left").find("p").removeClass("active");
	//一级科室背景色改变
	_this.children("p").addClass('active');
	switch(choose_idx){
		// case 0: change(diqu_url,num); break;
		// case 1: change(keshi_url,num); break;
		case 0: change(keshi_url,num); break;
		
	}
});

//请求数据 一级菜单--------------------
// 请求数据 发送菜单

$('.keshi_right').on('click', '.choose_b1', function() {
	var id_child = $(this).data('id');
	var id_parent = $()
	console.log(id_child)
	// $.ajax({
	// 	url: '/path/to/file',
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	data: {diqu_desc: 'value1'},
	// 	success:function(){

	// 	}
	// })
	
});
// 请求数据 发送菜单---------------------end
//加关注 ---状态判断
$('.box1_right').on('click',function(){
	//如果是未关注状态,点击时候判断是否为灰色
	if($(this).children('span').hasClass('ac_span')){
		$(this).children('span').removeClass('ac_span');
		$(this).children('img').eq(0).show().siblings('img').hide();
	}else{
		$(this).children('span').addClass('ac_span');
		$(this).children('img').eq(0).hide().siblings('img').show();
	}
})
 //翻页
var fanye = true;
var page = 2;
$(window).scroll(function () {
    var ks_area = $(window).height(); //屏幕高度
    var scrolltop = $(window).scrollTop(); //下拉条高度
    if (scrolltop > ks_area) {
        $('.back-top').show();
    } else {
        $('.back-top').hide();
    }
    var scrollTop = $(this).scrollTop(); //
    var scrollHeight = $(document).height(); //文档高度
    var windowHeight = $(this).height();
    var kid = 0 ? 0 : 0;
    if ( scrollHeight - (windowHeight + scrollTop) < 200 && fanye) {
        fanye = false;
        $.ajax({
            type: 'get',
            url: "/home/index/getdoctorlist/kid/" + kid + '/page/'+page,
            dataType: 'json',
            success: function (res) {
                if (res.data.pager.maxPage <= page) {
                    fanye = false;
                    //$('#dro_box').show();
                    layer.open({
                        content: '没有更多了'
                        , skin: 'msg'
                        , time: 1 //2秒后自动关闭
                    });
                } else {
                    fanye = true;
                }
                page ++ ;
                var html = "";
                for (var i = 0; i < res.data.list.length; i++) {
                    var item = res.data.list[i];
                    html += '<div class="doc_list">'+
                        '<a href="/home/doctor/index/id/'+item.id+'" style="display: block;width: 80%;">'+
                        '<div class="list_left" style="width:100%;">';
                    if (item.tiny) {
                        html +='<img src="http://v.myzx.cn//'+item.tiny+'" alt="">';
                    } else {
                        html +='<img src="/public/v2/images/doctor.png" alt="">';
                    }
                    html +='<div class="text_11">'+
                        '<p>'+item.name+'</p>'+
                        '<div class="span_box">'+
                        '<span style="margin-right: 0.5rem;">'+item.tidname+'</span>'+
                        '<span>'+item.kid2name+'</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</a>'+
                        '<div class="list_right doc_att" data-id="'+item.id+'">'+
                        '+关注'+
                        '</div>'+
                        '</div>';
                }
                $("#dro_box").before(html);//right 二级
            }
        })
    }
});

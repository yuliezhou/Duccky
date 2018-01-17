
//顶部导航点击
$('.open_li').mouseleave(function() {
    $(this).removeClass('open')
});
//语言点击切换
$('.language').on('click',function(){
    var _this = $(this);
    _this.children('.langbox').eq(1).slideToggle();
    _this.children('.langbox').eq(0).children('.top_img').toggleClass('rotare_img');
    _this.children('.langbox').eq(1).children('.top_img').hide();
    setTimeout(function(){
          if(_this.children('.langbox').eq(1).show()){
            $(".langbox_china").attr('href','##1');
            $(".langbox_usa").attr('href','##2');
        }      
    },0)

})
//控制banner的高度
//获取当前屏幕的宽度
var width = document.body.clientWidth;
//获取banner高度
var banner_H = (width*700) /1920;
//将高度赋值给banner
$('.banner').height(banner_H)
//回到顶部按钮
$('#fun_top').on('click',function(){
    $('body,html').animate({'scrollTop':0},800)
})
//底部三块切换
$('#idx_intro').on('click','.idx_introbox',function(){
    //获取当前的索引
    var itr_idx = $(this).index();
    //this
    var _this = $(this);
    if(itr_idx == 0){
        //开始先移除第一个的动画（right）
        $('#idx_intro .idx_introbox').eq(0).removeClass('animated fadeInRight fadeInLeft');
        //移除第二个的动画（left）
        $('#idx_intro .idx_introbox').eq(1).removeClass('animated fadeInLeft fadeInRight');
        $('#idx_intro .idx_introbox').eq(1).after(_this);
        // 先添加第一个的动画（right）
        setTimeout(function(){
        $('#idx_intro .idx_introbox').eq(0).addClass('animated fadeInRight');
        // 先添加第二个的动画（left）
        $('#idx_intro .idx_introbox').eq(1).addClass('animated fadeInLeft');
    },0)
    }else if(itr_idx ==2){
        //23对调位置
        // //开始先移除第一个的动画（right）
        $('#idx_intro .idx_introbox').eq(1).removeClass('animated fadeInRight fadeInLeft');

        //移除第二个的动画（left）
        $('#idx_intro .idx_introbox').eq(2).removeClass('animated fadeInLeft fadeInRight ');

        $('#idx_intro .idx_introbox').eq(0).after(_this);
        // 先添加第二个的动画（right）
        setTimeout(function(){
            $('#idx_intro .idx_introbox').eq(1).addClass('animated fadeInRight');
            // 先添加第三个的动画（left）
            $('#idx_intro .idx_introbox').eq(2).addClass('animated fadeInLeft');

        },0)
    }
})

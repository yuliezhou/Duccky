//下拉顶部变成黑色
var width = document.body.clientWidth;
if(width<767){
$('.ml_span').hide();
    $(".empty").show();
    var m = 0;//做判断
    //下拉列表点击
    $('#top_span').on('click',function(){
        if(m == 0){
            $('.news_wep i').addClass('ac_rota');
            // $('.news_wep').addClass('ac_span1');
            $(this).siblings('.ml_span').slideDown(500);
            m =1;
        }else{
            $('.news_wep i').removeClass('ac_rota');
            // $('.news_wep').removeClass('ac_span1');
            $(this).siblings('.ml_span').slideUp(500);
            
            m=0;
        }
    })
    $('#news11 .ml_span').on('click',function(){
        $(this).addClass('ac_span').siblings().removeClass('ac_span')
    })

}
//定时器
var likes_num = 0;
var pop_num  = 0;
var timer;
var timer1;
function run(){
    likes_num += 17;
    pop_num += 2;
    if(likes_num >=9000){
        clearInterval(timer);
        likes_num = 9000;
    }
    if(pop_num >= 800){
        clearInterval(timer1);
        pop_num = 850
    }
    $('#likes_num').html(likes_num);
    $('#pop_num').html(pop_num);
}
timer=setInterval(run,10);
timer1=setInterval(run,10);

$('.from_txt input').focus(function() {

    $(this).parents('.from_txt').addClass('ipt_top');

});
$('.from_txt input').blur(function() {

    $(this).parents('.from_txt').removeClass('ipt_top');

});
//底部轮播图
var swiper2 = new Swiper('.bot_swipwer', {
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true,
    loop:true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});
// 联系我们 -QUESTIONS
$('.ques_h').on('click',function(){
    //改变小框的颜色
    $(this).children('span').toggleClass('ac_spani');
    //改变加减的符号
    $(this).children('span').children('i').toggleClass('none_i');
    //对应的信息的显示与隐藏
    $(this).siblings('.toggle_box').slideToggle();
})
//屏幕滚动按钮
$('.next_a').on('click',function(){
    //获取点击按钮的父级元素的下一个兄弟元素距离顶部的距离
    var scoll_height = $(this).parents().next('.fun_box').offset().top;

    $('body,html').animate({'scrollTop':scoll_height},800)
})

//评论星星.***************************************
var star_num = 1;
//评论星星点击事件********************************
$('#star').on('click','i',function(){
    //让所有星星移除class
    $('#star i').removeClass('star_active');
    //获取点击星星时候的索引
    var star_idx = $(this).index()+1;
    //执行一个循环，加上颜色
    for(var i= 0;i<star_idx;i++){
        $('#star i').eq(i).addClass('star_active');
    }
    //选中的星星的个数(提交表单要传的参数)
    star_num = $('#star .star_active').length;
})

//评论星星hover事件********************************
$('#star i').hover(function() {
    //让所有星星移除class
    $('#star i').removeClass('star_active');
    //记录当前被选中的active的个数
    var star_num1 = $('#star .star_active').length;
    //hover 进入的时候获取到的索引
    var num_hov = $(this).index()+1;
    //执行一个循环，加上颜色
    for(var i= 0;i<num_hov;i++){
        $('#star i').eq(i).addClass('star_active');
    }
}, function() {
    //让所有星星移除class
    $('#star i').removeClass('star_active');
    //将hover时有颜色的个数传进循环里面
    for(var i= 0;i<star_num;i++){
        $('#star i').eq(i).addClass('star_active');
    }
});
// 首页
$(function() {
        // 轮播图
        $('.carousel').carousel({
            interval: 2000
        });
        demo();
    })
    //页面向下滑动，header背景变为黑色
function demo() {
    $(window).resize(function() {
        var width = $(this).width();
        var height = $(this).height();
        width = parseInt(width);
        if (width <= 765) {
            $('#header').removeClass('navbar-fixed-top');
            $('#header').removeClass('navbar-inverse-transparent');
        } else {
            $('#header').addClass('navbar-fixed-top');
            $('#header').addClass('navbar-inverse-transparent');
            var p = 0,
                t = 0;
            $(window).scroll(function(e) {
                p = $(this).scrollTop();
                if (t <= p) { //下滚  
                    $('#header').removeClass('navbar-inverse-transparent');
                } else { //上滚  
                    $('#header').addClass('navbar-inverse-transparent');
                }
                setTimeout(function() {
                    t = p;
                }, 0);
            });
        }
    });
}
$("#header li a").click(function(){
    return true;
})
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
$(window).scroll(function() {
        var scrollH = $(window).scrollTop();
        if (scrollH > 0) {
            $("#header").addClass('back_header');
            $('.son-menu.dropdown-menu a').addClass('white_a');
            $('.son-menu.dropdown-menu').addClass('men_back');
        } else {
            $("#header").removeClass('back_header');
            $('.son-menu.dropdown-menu').removeClass('men_back');
            $('.son-menu.dropdown-menu a').removeClass('white_a');
        }
        // 判断滚动的距离。
        // banner 的高度
       var bannerH = $('.banner1').height();
       if(scrollH >= bannerH/2){
           // 动画效果-公司简介
           $('.tran_box3').addClass('animated fadeInUp');
           $('.tran_box4').addClass('animated fadeInRight');
            // 动画效果-加入我们
            $('.join_tran1').addClass('animated1 fadeInDown');       
            $('.join_tran2').addClass('animated2 fadeInDown');       
            $('.join_tran3').addClass('animated3 fadeInDown');       
            $('.join_tran4').addClass('animated4 fadeInDown');   
            $('.ditu').addClass('animated4 fadeInDown');   
       }
        
    })
//分享
window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": "",
        "bdMini": "2",
        "bdMiniList": false,
        "bdPic": "",
        "bdStyle": "2",
        "bdSize": "24"
    },
    "share": {}
};
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~ ( - new Date() / 36e5)];
// 首页-end------------------------------
//一级二级分类切换
$('.pro_tit2').hide();
$("#pro_class2 .pro_tit2").eq(1).show().siblings('.pro_tit2').hide();

$('#pro_class1 .pro_tit1').hover(function() {

    $(this).addClass('class_ac').siblings('.pro_tit1').removeClass('class_ac');
    var idx = $('.class_ac').index();
    $('.pro_tit2').hide();
    $(this).children('.pro_tit2').show();
}, function() {
    $(this).addClass('class_ac').siblings('.pro_tit1').removeClass('class_ac');
    var idx = $('.class_ac').index();

});


$('.pro_tit2').hide();

//有这class类名的兄弟元素 （即二级分类显示）
$('.class_ac').siblings('.pro_tit2').show();

$('#pro_class1 .pro_tit1').on('click',function(){

    $('.pro_tit1 a').removeClass('class_ac');
    //当前一级菜单加class
    $(this).children('a').addClass('class_ac')

     $('.pro_tit2').hide();
     // 取出class_ac的索引
     var _this = $(this);
     if(_this.children('a').hasClass('class_ac')){
        _this.children('.pro_tit2').show()
     }
})

 

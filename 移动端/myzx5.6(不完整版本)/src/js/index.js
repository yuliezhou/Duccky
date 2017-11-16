//顶部搜索框固定
//搜索框的高度
var serchbox_height = $(".search").outerHeight();
//top-nav的高度
var topnav_height = $(".top_navpar").outerHeight();
//将搜索框的高度赋值给定位的空盒子
$(".fixed_box").height(serchbox_height);
$(".fixed_box1").height(topnav_height);
//搜索框距离顶端的距离
var searchTop = $(".search").offset().top;
//top-nav 距离顶部的距离
var navTop = $(".top_navpar").offset().top;
//滚轮事件
$(window).scroll(function() {
    //窗口滚动的高度
    var scrollH = $(window).scrollTop();

    if (scrollH > searchTop) {
        //如果滚动条高度大于搜索框的高度
        //搜索框定位在最上面
        $(".search").addClass('fixed_ac');
        //第一个定位盒子显示
        $(".fixed_box").show();
        // 头部隐藏
        $("header").hide();
    }else{
        $(".search").removeClass('fixed_ac')
        $(".fixed_box").hide();
        $("header").show();
      
    }

    if(scrollH > navTop){
        //如果滚动条高度大于top-nav的高度
        //top-nav定位到搜索框下面
        $(".top_navpar").addClass('fixed_ac1')
        $(".fixed_box1").show();
    }else {
        $(".top_navpar").removeClass('fixed_ac1')
        $(".fixed_box1").hide();
    }
})
//顶部搜索框固定--------------------end
//首页广告轮播图
var mySwiper1 = new Swiper('.ad', {
    autoplay: 20000, //可选选项，自动滑动
    loop: true, //环路
})
//首页广告轮播图---------------------------end
//新闻轮播滚动
function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-1.25rem"
    }, 500, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    });
}
$(document).ready(function() {
    setInterval('AutoScroll("#news_right")', 2000)
});
//新闻轮播滚动-------------------------------end
//推荐视频关注按钮切换
$(".video_top").on("click" ,".gz" ,function() {
    //获取当前对象
    var _this = $(this);
    //切换改变图片
    _this.children("img").toggle()
    //判断状态如果bor_none属性存在,改变为关注
    if (_this.hasClass('bor_none')) {
        //增加边框,改变颜色为蓝色
        _this.removeClass('bor_none');
        _this.children("i").html("关注");
        //判断状态如果bor_none属性不存在,改变为已关注
    } else {
        //取消边框,改变颜色为灰色
        _this.addClass('bor_none');
        _this.children("i").html("已关注");
    }
})
//推荐视频关注按钮切换----------------------------end

//推荐视频
// 推荐视频顶部切换按钮
var mySwiper = new Swiper('#top_nav', {
    pagination: '.swiper-pagination1',
    freeMode: true,
    freeModeMomentumRatio: 0.5,
    slidesPerView: 'auto'
});
swiperWidth = mySwiper.container[0].clientWidth
maxTranslate = mySwiper.maxTranslate();
maxWidth = -maxTranslate + swiperWidth / 2
mySwiper.on('tap', function(swiper, e) {
    slide = swiper.slides[swiper.clickedIndex]
    slideLeft = slide.offsetLeft
    slideWidth = slide.clientWidth
    slideCenter = slideLeft + slideWidth / 2
    // 被点击slide的中心点
    mySwiper.setWrapperTransition(300)
    if (slideCenter < swiperWidth / 2) {
        mySwiper.setWrapperTranslate(0)
    } else if (slideCenter > maxWidth) {
        mySwiper.setWrapperTranslate(maxTranslate)
    } else {
        nowTlanslate = slideCenter - swiperWidth / 2
        mySwiper.setWrapperTranslate(-nowTlanslate)
    }
    $("#top_nav  .active").removeClass('active')
    $("#top_nav .swiper-slide").eq(swiper.clickedIndex).addClass('active')
})
// 推荐视频顶部切换按钮----------------------------end
// 推荐视频底部内容切换
var mySwipers = new Swiper('#main-nav', {
    onSlideChangeStart: function(swiper) {
        $('#top_nav .swiper-slide').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
        slide = $('#top_nav .swiper-slide')[swiper.activeIndex];
        slideLeft = slide.offsetLeft
        slideWidth = slide.clientWidth
        slideCenter = slideLeft + slideWidth / 2
        mySwiper.setWrapperTransition(300)
        if (slideCenter < swiperWidth / 2) {
            mySwiper.setWrapperTranslate(0)
        } else if (slideCenter > maxWidth) {
            mySwiper.setWrapperTranslate(maxTranslate)
        } else {
            nowTlanslate = slideCenter - swiperWidth / 2
            mySwiper.setWrapperTranslate(-nowTlanslate)
        }
        $("#top_nav  .active").removeClass('active')
        $("#top_nav .swiper-slide").eq(swiper.activeIndex).addClass('active')
    }
});
$('#top_nav .swiper-slide').click(function() {
    var index_this = $(this).index();
    mySwipers.slideTo(index_this, 500, false);
});
// 推荐视频底部内容切换----------------------------end
//人生阶段图标切换
var swiper = new Swiper('#life_icon', {
    pagination: '.swiper-pagination1',
    freeMode: true,
    freeModeMomentumRatio: 0.5,
    slidesPerView: 'auto'
});
swiperWidth = swiper.container[0].clientWidth
maxTranslate = swiper.maxTranslate();
maxWidth = -maxTranslate + swiperWidth / 2
swiper.on('tap', function(swiper, e) {
    slide = swiper.slides[swiper.clickedIndex]
    slideLeft = slide.offsetLeft
    slideWidth = slide.clientWidth
    slideCenter = slideLeft + slideWidth / 2
    // 被点击slide的中心点
    swiper.setWrapperTransition(300)
    if (slideCenter < swiperWidth / 2) {
        swiper.setWrapperTranslate(0)
    } else if (slideCenter > maxWidth) {
        swiper.setWrapperTranslate(maxTranslate)
    } else {
        nowTlanslate = slideCenter - swiperWidth / 2
        swiper.setWrapperTranslate(-nowTlanslate)
    }
    $("#life_icon .icon_ac").removeClass('icon_ac');
    $("#life_icon .swiper-slide").eq(swiper.clickedIndex).addClass('icon_ac')
})
//人生阶段图标切换---------------------------------end
// 人生阶段视频切换
var swipers = new Swiper('#life-nav', {
    onSlideChangeStart: function(swiper) {
        $('#life_icon .swiper-slide').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
        slide = $('#life_icon .swiper-slide')[swiper.activeIndex];
        slideLeft = slide.offsetLeft
        slideWidth = slide.clientWidth
        slideCenter = slideLeft + slideWidth / 2
        mySwiper.setWrapperTransition(300)
        if (slideCenter < swiperWidth / 2) {
            mySwiper.setWrapperTranslate(0)
        } else if (slideCenter > maxWidth) {
            mySwiper.setWrapperTranslate(maxTranslate)
        } else {
            nowTlanslate = slideCenter - swiperWidth / 2
            mySwiper.setWrapperTranslate(-nowTlanslate)
        }
        $("#life_icon  .active").removeClass('active')
        $("#life_icon .swiper-slide").eq(swiper.activeIndex).addClass('active')
    }
});
$('#life_icon .swiper-slide').click(function() {
    var index_this = $(this).index();
    swipers.slideTo(index_this, 500, false);
});
// 人生阶段视频切换--------------------------------end

// ajax请求部分人生阶段请求部分
//人生阶段 封装ajax方法
//list_page----当前页  data_id---data    idx--------索引
function change(list_page,data_id,idx){
    $.ajax({
        url: 'http://lab.myzx.cn:85/Portal/Index/getVideosByTagid&pageNo='+list_page+'&tagid='+data_id,
        type: 'GET',
        dataType: 'json',
        success:function(data){
            var life_html="";
            for(i in data.list){
                if(i< 4){
                    life_html+= '<div class="life_box">'+
                        '<a href="##">'+
                        '<div class="img_box">'+
                        '<img src="'+data.list[i].img+'" alt="">'+
                        '<img src="images/rebo.png" class="red_box"/>'+
                        '<span class="time">'+data.list[i].video_long+'</span>'+
                        '<span class="fen">'+data.list[i].click+'播放</span>'+
                        '</div>'+
                        '<p class="elli">'+data.list[i].title+'</p>'+
                        '<i class="elli">'+data.list[i].click+'副标题副标题副标题副标题副标题副标题</i>'+
                        '</a>'+
                        '</div>'
                }
            }
            // life_cont.attr('maxPage', data.pager.maxPage).attr('pageNo', data.pager.pageNo).attr('count', data.pager.count);
            $('#life-nav .swiper-slide').eq(idx).attr({
                maxPage:data.pager.maxPage,
                pageNo:data.pager.pageNo,
                count:data.pager.count
            });
            $('#life-nav .swiper-slide').eq(idx).children('.life_content').empty().append(life_html);
        }
    })
}
//人生阶段 封装ajax方法---------------------------------end

//初始化人生阶段显示,函数调用
var idx_ac_1 = $("#life_icon .icon_ac").index();
var data_id_1 = $("#life_icon .swiper-slide").eq(idx_ac_1).attr("data");
change(1,data_id_1,idx_ac_1);
//初始化人生阶段显示,函数调用-----------------------------end

//人生阶段图标切换请求部分
$("#life_icon .swiper-slide").on('click',function(){
    //人生阶段图标切换索引
    var index = $(this).index();
    //获取当前的data_id
    var data_id = $(this).attr("data");
    //获取对应的视频块
    var life_cont = $('#life-nav .swiper-slide').eq(index);
    //如果视频块有内容,点击切换时则不重新加载
    if (life_cont.attr('count')) {
        return false;
    }
    change(1,data_id,index)
})
//人生阶段图标切换请求部分-----------------------------end

// 人生阶段换一批功能
$("#change").on('click',function(){
    //获取有icon_ac这个类名的索引位置
    var idx_ac = $("#life_icon .icon_ac").index();
    // console.log(idx_ac);
    //获取对应的视频块的最大页数
    var new_maxpage= $('#life-nav .swiper-slide').eq(idx_ac).attr('maxpage');
    //获取对应的视频块的当前页数
    var list_page = $('#life-nav .swiper-slide').eq(idx_ac).attr('pageno');
    //获取有icon_ac这个类名对应的data-id
    var data_id_change = $("#life_icon .swiper-slide").eq(idx_ac).attr("data");
    //每点击一次,当前页面加一次
    list_page++;
    //页码判断.如果当前页码大于最大页面时,当前页面返回到首页
    if(new_maxpage < list_page){
        list_page=1;
    }
    //调用ajax函数
    change(list_page,data_id_change,idx_ac)
})
// 人生阶段换一批功能--------------------------------------end
// ajax请求部分人生阶段请求部分------------------------------------end

// ajax请求推荐视频部分
//推荐视频 封装ajax方法
//list_page----当前页  data_id---data    idx--------索引
function changeVideo(list_page,data_id,idx){
    $.ajax({
        url: 'http://lab.myzx.cn:85/Portal/Index/getVideosByTagid&pageNo='+list_page+'&tagid='+data_id,
        type: 'GET',
        dataType: 'json',
        success:function(data){
            var video_html="";
            for(i in data.list){
                video_html+= '<div class="video_box">'+
                    '<div class="video_top flex_between">'+
                    '<a href="##" class="video_a">'+
                    '<div class="video_tople flex_between">'+
                    '<img src="images/img1.png" alt="">'+
                    '<div class="p_box">'+
                    '<h3>魏琳&nbsp;<span>副主任医师</span></h3>'+
                    '<span>重庆市第一人民医院</span>'+
                    ' </div>'+
                    '</div></a>'+
                    '<div class="flex_mid gz">'+
                    ' <img src="images/add.png" alt="">'+
                    '<img src="images/gou.png" alt="" style="display: none;">&nbsp;'+
                    ' <i>关注</i>'+
                    ' </div>'+
                    '</div>'+
                    '<div class="video_text">'+
                    '<p>'+
                    '<em>眼科</em>&nbsp;'+
                    '<span>半飞秒激光手术适合哪些患者</span>'+
                    '<a href="##">#眼科#</a>'+
                    '<i>,,,半飞秒激光的价格比全飞秒激光低将近一半，经济条件不是那么宽裕的人，完全可以选择半飞秒激光光..</i>'+
                    '<a href="##">查看全文</a>'+
                    '</p>'+
                    '</div>'+
                    '<div class="video_img">'+
                    '<a href="##">'+
                    ' <img src="'+data.list[i].img+'" alt="">'+
                    '<div class="video_icon flex_mid">'+
                    '<img src="images/video_icon.png" alt="">'+
                    '</div>'+
                    '</a>'+
                    '</div>'+
                    '<div class="video_bot flex_between">'+
                    '<div class="video_function flex_mid">'+
                    ' <a href="##">'+
                    '<i class="flex_mid">'+
                    ' <img src="images/func1.png" alt="">'+
                    '1588'+
                    '</i>'+
                    '</a>'+
                    ' </div>'+
                    ' <div class="video_function flex_mid">'+
                    '<a href="##" class="flex_mid">'+
                    '<i class="flex_mid">'+
                    ' <img src="images/func2.png" alt="">'+
                    '1588'+
                    '</i>'+
                    '</a>'+
                    '</div>'+
                    '<div class="video_function flex_mid">'+
                    '<a href="##" class="flex_mid">'+
                    '<i class="flex_mid">'+
                    ' <img src="images/func3.png" alt="">'+
                    '1588'+
                    '</i>'+
                    '</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
            }
            $('#main-nav .swiper-slide').eq(idx).attr({
                maxPage:data.pager.maxPage,
                pageNo:data.pager.pageNo,
                count:data.pager.count
            });
            $('#main-nav .swiper-slide').eq(idx).children('.load_none').before(video_html);
        }
    })
}
//推荐视频 封装ajax方法---------------------------------end

//初始化推荐视频显示,函数调用
var idx_vid1 = $("#top_nav .active").index();
var id_vid1 = $("#top_nav .swiper-slide").eq(idx_vid1).attr("data");
changeVideo(1,id_vid1,idx_vid1);

//初始化推荐视频显示,函数调用----------------------end
//
//推荐视频图标切换请求部分
$("#top_nav .swiper-slide").on('click',function(){

    // $("#main-nav").css("height",700)
    //推荐视频图标切换索引
    var index = $(this).index();
    //获取当前的data_id
    var data_id = $(this).attr("data");

    //获取对应的视频块
    var life_cont = $('#main-nav .swiper-slide').eq(index);

    // $('body,html').animate({'scrollTop':navTop+topnav_height},1500)

    $('body,html').scrollTop(navTop+topnav_height);

    $('.fixed_box1').show();

    $('#main-nav .swiper-slide .video_box').hide();

    $('#main-nav .swiper-slide').eq(index).children('.zzz').show();

     $('#main-nav .swiper-slide').eq(index).children('.video_box').show();
           

    //如果视频块有内容,点击切换时则不重新加载
    if (life_cont.attr('count')) {  
        $('#main-nav .swiper-slide').children('.zzz').hide();
        return false;
    }
    changeVideo(1,data_id,index);
    setTimeout(function(){
    $('#main-nav .swiper-slide').children('.zzz').hide();
    },1000)

})
//推荐视频图标切换请求部分-----------------------------end

//推荐视频翻页加载

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
    //选中的索引值
    var idx_vi = $('#top_nav .swiper-slide.active').index();
    //插入的父级盒子
    var main_vi = $('#main-nav .swiper-slide').eq(idx_vi);
    // 当前的data
    var data_vid = parseInt($("#top_nav .swiper-slide").eq(idx_vi).attr("data"));
    //console.log(idx_vi)
    var new_maxpage= parseInt($('#main-nav .swiper-wrapper .swiper-slide').eq(idx_vi).attr('maxpage'));
    //当前页数.        
    var list_page = parseInt($('#main-nav .swiper-wrapper .swiper-slide').eq(idx_vi).attr('pageno'));
    //总条数
    var count = parseInt($('#main-nav .swiper-wrapper .swiper-slide').eq(idx_vi).attr('count')); 
    //load_none 的高度
    var load_height = $('.load_none').height();
    //一个视频盒子的高度
    var videoBoxHeight = $('.video_box').height();   
    //总条数 的余数    
    var yushu = count%9;
    //给main-nav 的高度
    var main_height;
        
    if(long < 700 && is_run){
        is_run = false;
        //最大页数
        //当前页数.        
         list_page = $('#main-nav .swiper-wrapper .swiper-slide').eq(idx_vi).attr('pageno');
        // $("#main-nav").css("height",'100%');
        if(list_page >= new_maxpage){
            is_run = true;
            $('.load_none').show();
        }else{
            list_page++;
            
            $('#main-nav .swiper-wrapper .swiper-slide').eq(idx_vi).attr('pageno',list_page);
            $('.load_none').hide();
            changeVideo(list_page,data_vid,idx_vi);
            setTimeout(function(){
                is_run = true;
            }, 1500);
        }
    }

      // //如果最大页小于1
      // if(new_maxpage<1){
      //   alert('2')

      //   //高度就为加载盒子高度+总数*盒子高度+20
      //    main_height = count*videoBoxHeight+load_height+20;
        
      // }

      // //如果能被9整除.高度就为当前页数*盒子高度*9+20+加载盒子高度
      // if(yushu == 0){
      //   alert('1')
      //    main_height = list_page*9*videoBoxHeight+load_height+20;
         
      // }

      // //如果不能被9整除.
      // if(yushu != 0){

      //   //高度就为当前页数*盒子高度*9+20+加载盒子高度

      //    main_height = list_page*9*videoBoxHeight+load_height+20;
      //       //当当前页和最大页数相等时
      //       if(list_page == new_maxpage){
      //           //总高度就为 当前页-1 *9*盒子高度 + 余数*盒子高度+加载盒子高度+20
      //           main_height = (list_page - 1)*9*videoBoxHeight + yushu*videoBoxHeight+load_height+20
      //       }         
      // }
      //    console.log(main_height+"122222222222")
      
      // $("#main-nav").height(main_height)    


});
//推荐视频翻页加载----------------------end
// ajax请求推荐视频部分-------------------------end


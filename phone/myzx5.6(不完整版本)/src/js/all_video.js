//推荐视频 封装ajax方法
//list_page----当前页  data_id---data
function changeVideo(list_page,data_id){
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
            $('#main-nav').attr({
                maxPage:data.pager.maxPage,
                pageNo:data.pager.pageNo,
                count:data.pager.count
            });
            $('#main-nav').children('.load_none').before(video_html);
        }
    })
}
//推荐视频 封装ajax方法---------------------------------end
changeVideo(1,1);
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
    // var idx_vi = $('#top_nav .swiper-slide.active').index();
    //插入的父级盒子
    // var main_vi = $('#main-nav .swiper-slide').eq(idx_vi);
    // 当前的data
    var data_vid = $("#main-nav").attr("data-id");
    //console.log(idx_vi)
    console.log(long)
    if(long < 50 && is_run){
        is_run = false;
        //最大页数
        var new_maxpage= $('#main-nav').attr('maxpage');
        console.log(new_maxpage+'+++++++++++++++new_maxpage')
        //当前页数.        
        var list_page = $('#main-nav').attr('pageno');

        if(list_page >= new_maxpage){
            is_run = true;
            $('.load_none').show();
        }else{

            list_page++; 
             console.log(list_page+'+++++++++++++++list_page')
            $('#main-nav').attr('pageno',list_page);
            $('.load_none').hide();
            changeVideo(list_page,data_vid);
            setTimeout(function(){
                is_run = true;
            }, 1500);
        }
    }
});
//推荐视频翻页加载----------------------end
//推荐视频关注按钮切换
$("body").on("click" ,".gz" ,function() {
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

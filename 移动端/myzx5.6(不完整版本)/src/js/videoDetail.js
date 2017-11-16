// 切换显示视频详情
var vedioDetailChange = function() {
        var dom = $(".m_video_detail_funcShow");
        if (dom.css("transform") == "none" || dom.css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
            $(".video_info").hide()
            dom.css({
                transform: 'rotate(180deg)'
            });
        } else {
            $(".video_info").show();
            dom.css({
                transform: 'rotate(0deg)'
            });
        }
    }
    //显示所有评论 显示弹出 9/7
var showDiscussAll = function() {
        //先检查的$("#discussFrame") 的data-discussId是否相同 不同再ajax 再渲染dom 再show
        var discussId = $("#discussFrame").attr("data-discussId");
        if(true){//这里判断要打开的评论id和discussId是否相同
            $("#discussFrame").toggle("slow");
        }else{
            $("#discussFrame").html("");
            $("#discussFrame").attr("data-discussId","");//把新的id赋值
            $("#discussFrame").toggle("slow");
        }
        
    }
    //相关视频加载更多 9/7
    $("#videoAboutMore").click(function(event) {
        var videoAboutHtml = '';
        //ajax请求  补全videoAboutHtml 
        videoAboutHtml = '<div class="doc_list_main">'
                         +   '<div class="doc_list_imgBox">'
                         +       '<a class="doc_list_img_a" href="#"><img class="videoLog" src="http://img1.myzx.cn/video/admin/20170904/59ad0be4de35d_200_200.jpg" /></a>'
                         +   '</div>'
                         +   '<div class="showbox_time">01:17</div>'
                         +   '<div class="video_main_cont_wrap">'
                         +       '<div class="cont_top">'
                         +          '<a class="text-highlight" href="#"><span class="ellipsis-2 top_title">如何在小儿癫痫发作时急救？发现时急救？</span></a>'
                         +       '</div>'
                         +       '<div class="cont_bottom">'
                         +           '<ul class="bottom_txt_list">'
                         +               '<li><span class="list_zsjm ellipsis">运动可以把人体多余的的沙发上从小生长出的是</span></li>'
                         +               '<li><span class="list_zsjm ellipsis">乔思宇&nbsp;·&nbsp;21万字播放</span></li>'
                         +           '</ul>'
                         +       '</div>'
                         +   '</div>'
                         +'</div>';
        //end
        $("#videoAbout").html(videoAboutHtml);
    });
    //视频详情切换显示
$("#m_video_toggle").click(function(event) {
    vedioDetailChange();
});
//我要评分评分界面呼出
$("#giveGradeToggle").click(function(event) {
    //获取分数
    $("#star").toggle("fast");
    $("#issueGrade").toggle("slow");
    if ($($("#giveGradeToggle").children()[0]).css("transform") == "none" || $($("#giveGradeToggle").children()[0]).css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
        $($("#giveGradeToggle").children()[0]).css({
                transform: 'rotate(180deg)'
            });
    } else {
        $($("#giveGradeToggle").children()[0]).css({
            transform: 'rotate(0deg)'
        });
    }   
});
//提交评分
$("#issueGrade").click(function(event) {
    var grade = $('#star input').val(); //分数
    //提交后
    layerCommon("评分成功！");
    $("#issueGrade").parent().hide();
    $(".video_grade").hide();
    //$("#gradeStarDraw").html();
    $(".gradeStar").show();
});
//点赞
$(".video_inputimg1_l").click(function(event) {
    var goodOrNot = $(this).attr("data-statue"); //是点赞还是取消点赞
    //点赞请求 
    goodOrNot == "true" ?layerCommon("取消成功"):layerCommon("点赞成功");
    goodOrNot == "true" ? goodOrNot = "false" : goodOrNot = "true";
    $(this).attr("data-statue", goodOrNot);
    this.src = goodOrNot == "true" ? "../../images/func3_active.png" : "../../images/func3.png"
});
//*************************************************************************************
$(".video_zan_l").click(function(event) {
    var followStatus = $(this).attr("data-status");
    var spanHtml = parseInt(this.children[1].innerHTML);
    //ajax请求关注或者不关注
    if (followStatus == "false") {
        //ajax请求点赞
        layerCommon("点赞成功");
        this.children[0].src = "../../images/func3_active.png";
        $(this.children[1]).html(spanHtml + 1);
    } else {
        //ajax请求取消点赞
        layerCommon("取消成功")
        this.children[0].src = "../../images/func3.png";
        $(this.children[1]).html(spanHtml - 1);
    }
    followStatus == "true" ? followStatus = "false" : followStatus = "true";
    $(this).attr("data-status", followStatus);
});
//*************************************************************************************
//关注
$("#DocFollow").click(function(event) {
    var followStatus = $(this).attr("data-status");
    //ajax请求关注或者不关注
    if (followStatus == "false") {
        $(this.children[0]).hide();
        $(this.children[1]).show();
        $(this.children[2]).html("已关注");
        layerCommon("关注成功");
        $(this.children[2]).css({
            color: '#b4b4b4'
        });
    } else {
        $(this.children[0]).show();
        $(this.children[1]).hide();
        $(this.children[2]).html("关注");
        layerCommon("已取消");
        $(this.children[2]).css({
            color: '#2e84d1'
        });
    }
    followStatus == "true" ? followStatus = "false" : followStatus = "true";
    $(this).attr("data-status", followStatus);
});
//推荐视频关注
$("#videoDocFollow").click(function(event) {
    var followStatus = $(this).attr("data-status");
    if(followStatus)return;
    //ajax请求关注或者不关注
    if (followStatus == "false") {
        $(this.children[0]).hide();
        $(this.children[1]).show();
        $(this.children[2]).html("已关注");
        layerCommon("关注成功");
        $(this.children[2]).css({
            color: '#b4b4b4'
        });
        $(this).removeClass('followBorder');
    } else {
        $(this.children[0]).show();
        $(this.children[1]).hide();
        $(this.children[2]).html("关注");
        layerCommon("已取消");
        $(this.children[2]).css({
            color: '#2e84d1'
        });
        $(this).addClass('followBorder');
    }
    followStatus == "true" ? followStatus = "false" : followStatus = "true";
    $(this).attr("data-status", followStatus);
});
//视频评论切换
$("#videoDetail").click(function(event) {
    $("#videoDetailControl").show();
    $("#videoDiscussControl").hide();
    $("#videoDiscussActive").removeClass('chooseActiveLeft');
    $("#videoDetailActive").addClass('chooseActiveLeft');
    $("#videoDiscuss").removeClass('chooseActive');
    $("#videoDetail").addClass('chooseActive');
})
$("#videoDiscuss").click(function(event) {
        $("#videoDetailControl").hide();
        $("#videoDiscussControl").show();
        $("#videoDetailActive").removeClass('chooseActiveLeft');
        $("#videoDiscussActive").addClass('chooseActiveLeft');
        $("#videoDetail").removeClass('chooseActive');
        $("#videoDiscuss").addClass('chooseActive');
    })
//        分享
        $('.fenxiang_l').click(function() {
            myzxShare.share();
        });
//留言
$(".video_discuss_2").click(function() {
    //显示评论输入框置底显示覆盖置底菜单栏 discussInput
    $('.cx-box,.discussInput').show();
});
$(".video_discuss_2").click(function() {
    //显示评论输入框置底显示覆盖置底菜单栏 discussInput
    $('.cx-box,.discussInput').show();
});
$(".video_sc_l").click(function() {
    //显示评论输入框置底显示覆盖置底菜单栏 discussInput
    $('.cx-box,.discussInput').show();
});
$(".pinglum").click(function() {
    //显示评论输入框置底显示覆盖置底菜单栏 discussInput
    $('.cx-box,.discussInput').show();
});
$("#discussSubmit").click(function() {
    //获取值 发送，关闭
    var inputValue = $(".discussInput").children()[0].value;
    $('.cx-box,.discussInput').hide();
});
/**********************************评分**********************************************************/
$("#star").raty({
    score: function() {
        return $(this).attr("data-score");
    },
    starOn: '../../images/star-on.png',
    starOff: '../../images/star-off.png',
    readOnly: false,
    halfShow: false,
    size: 34,
});
$(".pingx").raty({
    score: function() {
        return $(this).attr("data-num");
    },
    starOn: '../../images/star-on.png',
    starOff: '../../images/star-off.png',
    readOnly: true,
    halfShow: false,
    size: 34,
});
//改变星星文字标注-FFW
$("#star img").on("click", function() {
    var idx = $(this).index();
    var span_html = $("#star span")
    switch (idx) {
        case 1:
            span_html.html("很差");
            break;
        case 2:
            span_html.html("较差");
            break;
        case 3:
            span_html.html("还行");
            break;
        case 4:
            span_html.html("很棒");
            break;
        case 5:
            span_html.html("力荐");
            break;
    }
});

//layer弹出func
var layerCommon = function(content){
    layer.open({
        content: content,
        skin: 'msg',
        time: 1.5
    });
}
//
$("#videoStart").on("click", function() {
    document.getElementById("playVideo").play();
    $("#videoStart").hide("slow");


});

//检查是否到页面底部了 9/7
$(window).scroll(function(event) {
    var isRun = $("#videoDetail").hasClass("chooseActive ");
    var isAjax = true;
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();//页面高度
    var windowHeight = $(this).height();//当前屏幕高度
    if((scrollHeight-windowHeight) - scrollTop < 150 && isRun &&isAjax){
        isAjax = false;
        //ajax请求
        $(".recommendVideo").last().append('<div class="recommendVideo"><div class="attebox"style="border:0px;"><a href="/home/doctor/index/id/205130"style="display: block;"><div class="box1_left"><div class="img_box1"><img src="http://v.myzx.cn//admin/20170827/59a283bfe089d_100_100.jpg"alt="胡东鹏2"></div><div class="info"><h4 class="">胡东鹏2</h4><p>主任医师</p></div></div></a><div id="videoDocFollow"class="box1_right followBorder"data-status="false"><img src="../../images/add.png"alt=""style="height: 0.3rem;width: 0.3rem"><img src="../../images/gou.png"alt=""style="display: none;"><span>关注</span></div></div><div class="ellipsis introduce_title"><h4><em style="font-size: 15px;">【眼科1】</em>如何在小儿癫痫是进行急救？什么时候急救</h4></div><div style="padding: 0.1rem 0.2rem;position: relative;"><img class="recommendLog"src="http://img1.myzx.cn/video/admin/20170904/59ad0be4de35d_200_200.jpg"><div class="showbox_Discuss">热评</div><div class="img_model"><img src="../../images/video_icon.png"alt=""class="img-responsive"></div></div><div class="showbox_time_unbackg">01:17</div></div>');
    }
});
// ffw
$('.cx-box').on('click',function(){
    $(this).hide();
    $('.discussInput').hide()
})
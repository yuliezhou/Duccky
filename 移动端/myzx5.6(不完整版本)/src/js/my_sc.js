$(function(){
        $("#bianji").on("click",function(){
            var val=$(this).html();
            //判断文字为编辑状态时
            if(val=="编辑"){
                //先移除背景色和勾图片
                // $(".img_choose").removeClass("ac_back");
                // $(".img_choose img").hide();
                //将文字内容变为完成
                $(this).html("完成");
                //选择按钮显示出来
                $(".choose_1").show();
                //底部全选删除按钮显示
                $("#fot").show();
            }else{
                //文字变为编辑
                $(this).html("编辑")
                //选择按钮隐藏
                $(".choose_1").hide();
                //底部选择隐藏
                $("#fot").hide();
            }
        })

		var qx = 0;
        //全选点击
        $(".all").click("click",function(){
            if(qx == 0){
                $(".img_choose img").show();
                $(".img_choose").addClass("ac_back");
                $('.all').html('取消全选');
                $(".del").css("color","red");
                qx =1;
			}else{
                $(".img_choose img").hide();
                $(".img_choose").removeClass("ac_back");
                $('.all').html('全选');
                $(".del").css("color","#888484");
                qx = 0;
			}
        })

        //单选点击
        $(".img_choose").on("click",function(){
            $(this).children("img").toggle();
            $(this).toggleClass("ac_back");

            var len = $('.img_choose').children('img').length;
            var ck_len = $(".ac_back").length;

            if(ck_len>0){
                $(".del").css("color","red");
			}else{
                $(".del").css("color","#888484");
			}

            if(ck_len == len){
                qx = 1;
                $('.all').html('取消全选');
			}else{
                qx = 0;
                $('.all').html('全选');
			}
        })
        //删除事件
        $("#del").click("click",function(){
            //判断盒子是否加上ac.加上了删除
            //$(".ac_back").parent(".choose_1").parent(".sc_content").parent(".sc_box").remove();

            layer.open({
                content: '确定删除？'
                ,btn: ['确定', '取消']
                ,yes: function(index){
                    if($(".choose_1 .ac_back").length > 0){
                        var vid = [];
                        $(".choose_1 .ac_back").each(function (i, e) {
                            vid.push($(e).attr('vid'));
                        })
                    }

                    $.ajax({
                        url:MODULE+'/User/delete_collect',
                        dataType:'json',
                        type:'POST',
                        data: {vid:vid},
                        success:function (data) {
                            console.log(data)
                            if(data.status == 1){
                                layer.open({
                                    content: '删除成功',
                                    skin: 'msg',
                                    time: 2,
                                    end:function(){
                                        location.reload();
                                    }
                                });
                            }else{
                                layer.open({
                                    content: '删除失败',
                                    skin: 'msg',
                                    time: 2,
                                });
                                return false;
                            }
                        }
                    });
                }
            });
        })


        var sock = 0;
        $(window).scroll(function () {
            var ks_area = $(window).height();
            var scrolltop = $(window).scrollTop();
            if (scrolltop > ks_area) {
                $('.top').show();
            } else {
                $('.top').hide();
            }
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();


            if($("#bianji").html() == '完成'){
                layer.open({
                    content: '对不起，未编辑完无法加载下一页！',
                    skin: 'msg',
                    time: 3,
                });
			}else{
                //获取指针
                if (scrollTop + windowHeight == scrollHeight && !sock) {
                    sock = 1;
                    var page = $('.page').val();
                    if(page>0){
                        setTimeout(function () {
                            $.ajax({
                                url:MODULE+'/User/next_collect',
                                type:"post",
                                data:{page:page},
                                dataType:"json",
                                success:function(json) {
                                    ///home/video/newinfo/id/987"
                                    ///home/doctor/index/id/'+item.id+'
                                    var html = '';
                                    $.each(json.info, function (i, item) {
                                        html += '<div class="sc_box">' +
                                            '<div class="sc_content">' +
                                            '<div class="choose_1" style="display: none;">' +
                                            '<div class="img_choose" vid="' + item.id + '">' +
                                            '<img src="/public/images/gou.png" alt="" style="display: none;" class="gou">' +
                                            '</div>' +
                                            '</div>' +
                                            '<a href="/home/video/newinfo/id/'+item.collect+'">' +
                                            '<div class="sc_imgbox">' +
                                            '<img src="http://v.myzx.cn/'+item.img+'" alt="">' +
                                            '<div class="sc_modl">' +
                                            '<img src="/public/images/u50.png" alt="">' +
                                            '</div>' +
                                            ' <div class="sc_time">' +
                                            '<img src="/public/images/sanjiao.png" alt="">&nbsp;' +
                                            '<span>' + item.minutes + '</span>' +
                                            '</div>' +
                                            '<em class="sc_num">8.6</em>' +
                                            '</div>' +
                                            '</a>' +
                                            '<a href="" class="width_a">' +
                                            '<div class="sc_text">' +
                                            '<div class="sc_text_top">' +
                                            '<img src="http://v.myzx.cn/' + item.docimg + '" alt="">' +
                                            '<div class="text1">' +
                                            '<h4' + item.name + '</h4>' +
                                            '<p>' + item.kid1name + '&nbsp;' + item.tidname + '</p>' +
                                            '</div>' +
                                            '</div>' +
                                            '<p style="padding-top:0.2rem;">' + item.title + '</p>' +
                                            '<div class="sc_text_bot">' +
                                            '<span><em>' + item.click + '</em>次播放ky</span>' +
                                            '<span>' + item.create_time + '</span>' +
                                            '</div>' +
                                            '</div>' +
                                            '</a>' +
                                            '</div>' +
                                            '<div class="back_box">' +
                                            '</div>' +
                                            '</div>';
                                    });
                                    if (json.page == 0) {
                                        $('.bot_none').show()
                                    }
                                    $('.page').val(json.page);
                                    $('.par_box').append(html);
                                    sock = 0;

                                }
                            });
                        },1000)
                    }
                }
			}
        });
    })

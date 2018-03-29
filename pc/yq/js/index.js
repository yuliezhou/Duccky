    //回到顶部
    $('#top').on('click',function() {
         $('body,html').animate({'scrollTop':0},1000)
    });
    //顶部导航栏
    var headerH = $("#header").offset().top;
    $(window).scroll(function(e) {
        p = $(this).scrollTop();
        if (p >headerH ) { //下滚  
            $('.empty').show();
            $('.logo_inner').css({
                display: 'inline-block'
            });
            $('#header').addClass('pofixed');
        } else { //上滚  
            $('.empty').hide();
            $('.logo_inner').css({
                display: 'none'
            });         
            $('#header').removeClass('pofixed');
        }
    });
    //提交表单验证
    $('#submit').on('click',function(){
        var zz1 = $('#zz1').val();
        var zz2 = $('#zz2').val();
        var name = $('#name').val();
        var phone = $('#phone').val();
        if(zz1 == ''){
            layer.msg('请输入您的资质类型');
        }else if(zz2 == ''){
            layer.msg('请输入您的资质等级');
        }else if(name == ''){
            layer.msg('请输入您的姓名');
        }else if(phone == ''){
            layer.msg('请输入您的电话号码');
        }
    })
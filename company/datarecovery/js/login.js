var loginUrl = 'https://xcx.nineton.cn';
var layerCommon = function(content) {
    layer.open({
        content: content,
        skin: 'msg',
        time: 1.5
    });
}
var numberTel = function(num) {
    if (num == "") {
        layerCommon("请输入手机号");
        return true;
    } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(num))) {
        layerCommon('手机号不符合规范');
        return true;
    }
}
var numberCode = function(num) {
    if (num == "") {
        layerCommon("请输入验证码");
        $("#yz").focus();
        return true;
    } else if (!(/^\d{6}$/.test(num))) {
        layerCommon('验证码不符合规范');
        $("#yz").focus();
        return true;
    }
}
var phone;
$("#get_code").on('click', function() {
    var _this = this;
    // var code_number;
    var get_html = $('#get_code').html();
    //获取验证码的状态
    if (get_html == '获取验证码') {
        phone = $('.num_btn').val();
        var get_url = loginUrl+'/v1/Publics/getCode';
        //加密对象
        var rdata = {
                appkey: '593624b55898c6b524e516771afb8701',
                phone: phone,
            }
            //加密以后的数据
        var sign = hexMD5(mySort(rdata));
        //手机号码验证
        if (phone == "") {
            layerCommon("请输入手机号");
            return true;
        } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            layerCommon('手机号不符合规范');
            return true;
        } else {
            //手机号码正确，请求验证码
            $.ajax({
                url: get_url,
                type: 'POST',
                dataType: 'json',
                data: {
                    phone: phone,
                    sign: sign
                },
                success: function(data) {
                    console.log(data)
                        //返回状态
                    var code = data.code;
                    // code_number = data.data.code;
                    if (code == 200) {
                        //提示
                        layerCommon("发送成功");
                        //倒计时显示
                        $('.djs').show();
                        //倒计时定时器
                        var num = 60;
                        var timer;
                        //显示登录按钮
                        $('#get_code').html('登录');
                        //验证码发送至
                        $('.show_txt').html('验证已发送至  ' + phone);
                        //改变placeholder
                        $('.num_btn').val('')
                        $('.num_btn').attr({
                            placeholder: '请输入验证码'
                        });
                        $("#djs").removeClass('back_ac');
                        timer = setInterval(function() {
                            num--;
                            if (num > 0) {
                                $('#djs').html(num + '秒后重新发送');
                            } else {
                                //关闭定时器
                                clearInterval(timer);
                                $('#djs').html('重新发送');
                                $("#djs").addClass('back_ac');
                            }
                        }, 1000);
                    } else {
                        layerCommon("发送失败，请稍后再试")
                    }
                }
            })
        }
    } else if (get_html == '登录') {
        var code_number = $('.num_btn').val();
        if (code_number == "") {
            layerCommon("请输入验证码");
            return true;
        } else {
            var get_url1 = loginUrl+'/v1/Login/login';
            //加密对象
            var rdata1 = {
                    appkey: '593624b55898c6b524e516771afb8701',
                    phone: phone,
                    code: code_number,
                    device: "web"
                }
                //加密以后的数据
            var sign1 = hexMD5(mySort(rdata1));
            console.log(sign1)
                //验证码格式正确
            $.ajax({
                url: get_url1,
                type: 'POST',
                dataType: 'json',
                data: {
                    phone: phone,
                    sign: sign1,
                    code: code_number,
                    device: "web"
                },
                success: function(data) {
                    console.log(data)
                    var code = data.code;
                    var msg = data.msg;
                    if (code == 200) {
                        //获取token
                        var local_token = data.data.token;
                        var local_appid = data.data.appid;
                        localStor = local_token + '|' + local_appid
                            //设置本地缓存
                        localStorage.localStor = localStor;
                        //获取字符串local
                        var newLocal = localStorage.localStor;
                        // 本地缓存转数组
                        newLocalArr = newLocal.split("|");
                        //拿出数据
                        var local_tokens = newLocalArr[0];
                        var local_appids = newLocalArr[1];
                        layer.open({
                            content: '登录成功',
                            skin: 'msg',
                            time: 0.8
                        });
                        setTimeout(function() {
                            window.location.href = './index.html';
                        }, 1000)
                    } else {
                        layerCommon('验证码输入错误，请重新输入')
                    }
                }
            })
        }
    }
})
$('#djs').on('click', function() {
    if ($(this).hasClass('back_ac')) {
        var get_url = loginUrl+'/v1/Publics/getCode';
        //加密对象
        var rdata = {
                appkey: '593624b55898c6b524e516771afb8701',
                phone: phone,
            }
            //加密以后的数据
        var sign = hexMD5(mySort(rdata));
        $.ajax({
            url: get_url,
            type: 'POST',
            dataType: 'json',
            data: {
                phone: phone,
                sign: sign
            },
            success: function(data) {
                console.log(data)
                    //返回状态
                var code = data.code;
                // code_number = data.data.code;
                if (code == 200) {
                    //提示
                    layerCommon("发送成功");
                    //倒计时显示
                    $('.djs').show();
                    //倒计时定时器
                    var num = 60;
                    var timer;
                    //显示登录按钮
                    $('#get_code').html('登录');
                    //验证码发送至
                    $('.show_txt').html('验证已发送至  ' + phone);
                    //改变placeholder
                    $('.num_btn').val('')
                    $('.num_btn').attr({
                        placeholder: '请输入验证码'
                    });
                    $("#djs").removeClass('back_ac');
                    timer = setInterval(function() {
                        num--;
                        if (num > 0) {
                            $('#djs').html(num + '秒后重新发送');
                        } else {
                            //关闭定时器
                            clearInterval(timer);
                            $('#djs').html('重新发送');
                            $("#djs").addClass('back_ac');
                        }
                    }, 1000);
                } else {
                    layerCommon("发送失败，请稍后再试")
                }
            }
        })
    }
})
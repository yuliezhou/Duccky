var layerCommon = function(content) {
    layer.open({
        content: content,
        skin: 'msg',
        time: 1.5
    });
}
$(function () {
    let userNo = localStorage.userNo;
    let loginPwd = localStorage.loginPwd;
    $('#account').val(userNo)
    $('#password').val(loginPwd)
    //点击登陆
    $('#login').on('click', function () {
        var t = this;
        var userNo = $('#account').val();
        if (userNo == '') {
            layerCommon('登录账号不能为空');
            return;
        } else if (!testMobileNum.test(userNo)) {
            layerCommon('登录账号格式错误');
            return;
        }
        var loginPwd = $('#password').val();
        if (loginPwd == "") {
            layerCommon('登录密码不能为空');
            return;
        }
        $.ajax({
            url: "http://chadan.wang/user/getPublicKey",
            type: "POST",
            data: {
                userNo: userNo
            },
            cache: false,
            dataType: 'JSON',
            success: function (result) {
                var rsa = new JSEncrypt();
                rsa.setPublicKey(result.data.public_key);
                var resloginPwd = encodeURIComponent(rsa.encrypt(loginPwd + result.data.random_str));
                $.ajax({
                    url: 'http://chadan.wang/user/login',
                    type: "POST",
                    data: {
                        userNo: userNo,
                        loginPwd: resloginPwd
                    },
                    cache: false,
                    dataType: 'JSON',
                    success: function (result) {
                        if (result.errorCode === 200) {
                            window.location.href = 'index.html'
                            localStorage.jsonid = result.data.remark;
                            localStorage.userNo = userNo;
                            localStorage.loginPwd = loginPwd;
                        }
                    },
                    error: function (res) {
                        
                    }
                })
            },
            error: function (res) {
            }
        })
    });
});
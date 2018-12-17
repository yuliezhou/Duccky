/*
* 时间格式转换函数  publicTimeFormat(date, format) format传值为 “yyyy-mm-dd hh:mm:ss”等

* 触底加载功能将下面代码复制到自己的js中；callback换成自己的触底是要执行的函数
window.onscroll = function () {
    if (getScrollHeight() == getWindowHeight()) {
        return;
    }
    if (getScrollHeight() <= getWindowHeight() + getDocumentTop()+1) {
        $('body').append(
            '<div id="publicBottomLoadingTips">加载中,请稍后...</div>'
        );
        callback
    }
};

* 页面轻提示语功能  publicShowToast('show/hidden','提示语',ms)
* 页面遮罩显示     publicShade('show/hidden',ms)
* 手机号码3-4-4格式 <input maxlength="13" onkeyup="publicPhoneNumForamt(event,this)" placeholder="请输入充值号码" />
* 验证手机号码正则
* 验证登录密码(8~16位数字字母组合)
* 验证身份证号码
* 验证Email
* 验证支付密码
* input禁止输入数字 <input onkeyup="value=value.replace(/\d/g,'')" type="text">
* input只能输入数字 <input onkeyup="value=value.replace(/[^\d]/g,'')" type="text">
* input禁止输入汉字 <input onpaste="return false" ondragenter="return false"  onkeyup="this.value=this.value.replace(/[^x00-x80]/gi,'')">
* 清空输入框的内容
* 密码框明文密文切换
* jQuery Cookie Plugin v1.3.1
*/

window.onload = function () {
    $('body').animate({opacity: 1})
};

//根据Cookie判定登录状态
function cookieLogged() {
    if ($.cookie('logged') === null) {
        publicShowToast("show", "请先登录再操作", 1000);
        setTimeout(function () {
            window.location.href = "/wang/login"
        }, 1000);
        return
    }
};


// 时间格式转换
function publicTimeFormat(date, format) {
    var time = new Date(date);
    var year = time.getFullYear();
    var month = '' + (time.getMonth() + 1);
    if (month.length == 1) {
        month = '0' + month
    }
    var day = '' + time.getDate();
    if (day.length == 1) {
        day = '0' + day
    }
    var hour = '' + time.getHours();
    if (hour.length == 1) {
        hour = '0' + hour
    }
    var min = '' + time.getMinutes();
    if (min.length == 1) {
        min = '0' + min
    }
    var sec = '' + time.getSeconds();
    if (sec.length == 1) {
        sec = '0' + sec
    }
    switch (format) {
        case "yyyy-mm-dd":
            return year + '-' + month + '-' + day;
            break;
        case "yyyy/mm/dd":
            return year + '/' + month + '/' + day;
            break;
        case "yyyy-mm-dd hh:mm":
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min;
            break;
        case "yyyy/mm/dd hh:mm":
            return year + '/' + month + '/' + day + ' ' + hour + ':' + min;
            break;
        case "yyyy-mm-dd hh:mm:ss":
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
            break;
        case "yyyy/mm/dd hh:mm:ss":
            return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
            break;
        case "yyyymmddhhmmss":
            return year + month + day + hour + min + sec;
            break;
        default:
            return year + '-' + month + '-' + day;
            break
    }
}

// ------触底加载开始------
function getDocumentTop() {//文档高度
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

function getWindowHeight() {//可视窗口高度
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

function getScrollHeight() {//滚动条滚动高度
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

// ------触底加载结束------

//轻提示语
function publicShowToast(status, str, ms) {
    if (status == 'show') {
        $('body').append(
            '<div id="publicShowToast">' +
            '<div>' + str + '</div>' +
            '</div>'
        );
        if (ms == '' || ms == null || ms == undefined) {
            return;
        } else {
            var t = setTimeout("$('#publicShowToast').remove()", ms);
        }
    } else if (status == 'hidden') {
        $('#publicShowToast').remove()
    }
    //监听滚动事件,禁止触摸到遮罩页面滚动
    document.getElementById('publicShowToast').addEventListener('touchmove', function (event) {
        event.preventDefault();
    });
}

//遮罩层
function publicShade(status, ms) {
    if (status == "show") {
        $('body').append(
            '<div id="publicShade"></div>'
        );
        if (ms == '' || ms == null || ms == undefined) {
            return;
        } else {
            var t = setTimeout("$('#publicShade').remove()", ms);
        }
        //监听滚动事件,禁止触摸到遮罩页面滚动
        document.getElementById('publicShade').addEventListener('touchmove', function (event) {
            event.preventDefault();
        });
    } else if (status == 'hidden') {
        $('#publicShade').remove()
    }
}

//手机号码3-4-4
function publicPhoneNumForamt(event, obj) {
    var value = $(obj).val();
    //校验不是数字和空格
    var reg = /^[\d\s]+$/;
    if (!reg.test(value)) {
        var tempVal = value.replace(/[^\d\s]/g, "");
        $(obj).val(tempVal);
        return;
    }
    value = value.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
        if (i == 3 || i == 7) {
            result.push(" " + value.charAt(i));
        }
        else {
            result.push(value.charAt(i));
        }
    }
    obj.value = result.join("");
}

//验证手机号码正则
var testMobileNum = /^((0\d{10})|(1[3456789]\d{9}))$/;
//验证登录密码(8~16位数字字母组合)
var testDLPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
// 验证身份证号码
var testIDcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 验证Email
var testEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//验证支付密码
var testCashPW = /^\d{6}$/;
$('input').focus(function () {
    $(this).siblings('.clearInput').css('display', 'block')
})
$('input').blur(function () {
    var val = $(this).val();
    if (val == "") {
        $(this).siblings('.clearInput').css('display', 'none')
    }
})
//清空输入框内容
$('.clearInput').on('touchstart', function () {
    $(this).siblings('input').val("")
});
// 密码框明文密文切换
$('.eyes').on('touchstart', function () {
    var inpuyType = $(this).siblings('input').attr('type');
    if (inpuyType == 'password') {
        $(this).attr('src', '/img/xianshi.png');
        $(this).siblings('input').attr('type', 'text');
    } else if (inpuyType == 'text') {
        $(this).attr('src', '/img/yincang.png');
        $(this).siblings('input').attr('type', 'password');
    }
});

// jQuery Cookie Plugin v1.3.1
(function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
    }

    function unRfc2068(value) {
        if (value.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        return value;
    }

    function fromJSON(value) {
        return config.json ? JSON.parse(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? null : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = fromJSON(cookie);
                break;
            }

            if (!key) {
                result[name] = fromJSON(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };

})(jQuery, document);
(function () {
    var clientWidth = document.documentElement.clientWidth;
    if (1200 < clientWidth) {
        clientWidth = 2560
    } else if (800 <= clientWidth && clientWidth <= 1200) {
        clientWidth = 1300
    } else {
        clientWidth = 750
    }
    setWidth(clientWidth, clientWidth);
})()

function setWidth(designWidth, maxWidth) {

    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;
    //浏览器竖屏与横屏转换的BUG。
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width > maxWidth && (width = maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
        // document.html.style.fontSize = rem + 'px';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function () {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function (e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
};

//自定义公共函数
var api = "https://mis.nineton.cn/home/aboutwe/";

    function showTime() {
        nowtime = new Date();
        year = nowtime.getFullYear();
        month = nowtime.getMonth() + 1;
        date = nowtime.getDate();
        document.getElementById("timer").innerText = year + "年" + month + "月" + date + " " + nowtime.toLocaleTimeString();
    }
    setInterval("showTime()", 1000);
    var n = 0;
    var images = document.getElementsByClassName('banimg');
    images[0].style.display = 'block';
    var timer = setInterval(function() {
        images[n].style.display = 'none';
        n = ++n == 3 ? 0 : n;
        images[n].style.display = 'block';
    }, 2000);
    var leftbtn = document.getElementById('leftbtn');
    var rightbtn = document.getElementById('rightbtn');
    leftbtn.onclick = function() {
        for (var j = 0; j < images.length; j++) {
            images[j].style.display = 'none';
        }
        clearInterval(timer)
        n--;
        if (n < 0) {
            n = 2
        }
        images[n].style.display = 'block';
    }
    rightbtn.onclick = function() {
        for (var j = 0; j < images.length; j++) {
            images[j].style.display = 'none';
        }
        clearInterval(timer)
        n++;
        if (n > 2) {
            n = 0
        }
        images[n].style.display = 'block';
    }
    var input_box = document.getElementById('input_box');
    var close = document.getElementById('close');
    var ad = document.getElementById('ad');
    var ad1 = document.getElementById('ad1');
    close.onclick = function() {
        ad.style.display = 'none';
        ad1.style.display = 'none';
    }
    var close1 = document.getElementById('close1');
    close1.onclick = function() {
        ad.style.display = 'none';
        ad1.style.display = 'none';
    }
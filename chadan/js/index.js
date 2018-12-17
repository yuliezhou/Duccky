    var layerCommon = function(content) {
        layer.open({
            content: content,
            skin: 'msg',
            time: 1.5
        });
    }
    var myAuto = document.getElementById('myaudio');
    var timer;
    $("#carried").click(function() {
        let num = 0;
        myAuto.pause();
        myAuto.load();
        let jsonid = localStorage.jsonid;
        let faceValue = $("#faceValue  option:selected").text();
        let operator = $("#operator  option:selected").text();
        let amount = $("#amount  option:selected").text();
        let timenum = $("#timenum  option:selected").text();
        let success_status = $("#success_status  option:selected").text();
        switch (operator) {
            case '移动':
                operator = 'MOBILE'
                break;
            case '联通':
                operator = 'UNICOM'
                break;
            case '电信':
                operator = 'TELECOM'
                break;
        }
        switch (timenum) {
            case '17s':
                timenum = 17000
                break;
            case '10s':
                timenum = 10000
                break;
            case '18s':
                timenum = 18000
                break;
            case '5s':
                timenum = 5000
                break;
        }
        let datas = {
            JSESSIONID: jsonid,
            faceValue: faceValue,
            operator: operator,
            amount: amount,
            channel: 1
        }
        $("#phone_number").html('请求 ' + num + ' 次')
        carried(datas, success_status)
        timer = setInterval(res => {
            num++;
            $("#phone_number").html('请求 ' + num + ' 次')
            carried(datas, success_status)
        }, timenum)
    })
    // MOBILE
    // UNICOM
    $("#stop").click(function() {
        clearInterval(timer)
    })
    $("#change").click(function() {
        window.location.href = 'login.html'
    })
    let carried = function(datas, success_status) {
        $.ajax({
            url: 'http://old.chadan.wang/order/getOrderdd623299',
            type: 'POST',
            dataType: 'json',
            data: datas,
            success: function(data) {
                let errorCode = data.errorCode;
                if (errorCode == 200) {
                    let dataLen = data.data.length;
                    if (dataLen > 0) {
                        let phone_number = data.data[0].rechargeAccount;
                        if (success_status == '语音') {
                            myAuto.play();
                        } else {
                            alert('抢单成功！')
                        }
                        $("#phone_number").html(phone_number)
                        clearInterval(timer)
                        return;
                    }
                } else if (errorCode == 2000) {
                    layerCommon('登录超时，请重新登录');
                    setTimeout(res => {
                        window.location.href = 'login.html'
                    }, 1000)
                }
            }
        })
    }
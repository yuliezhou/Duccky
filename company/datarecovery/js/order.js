 var qqLocal = localStorage.qq;
 if (qqLocal) {
     $('#qq_ipt').val(qqLocal)
 } else {
     $('#qq_ipt').val('')
 }
 var orderUrl = 'https://xcx.nineton.cn';
 //判断是否登录
 var img_bool = false;
 //获取字符串local
 var newLocal = localStorage.localStor;
 if (newLocal) {
     // 本地缓存转数组
     newLocalArr = newLocal.split("|");
     //拿出数据
     var local_tokens = newLocalArr[0];
     var local_appids = newLocalArr[1];
 }

 function getValue(key) { //  在地址栏中 通过key 获取value  ...html?key=3&lab=8  可以获取 key 和lab 的值
     var str = window.location.search;
     str = str.replace('?', '');
     var params = str.split('&');
     var requests = {},
         channel = '';
     for (var i = 0; i < params.length; i++) {
         if (params[i].indexOf("=")) {
             var tmp = params[i].split("=");
             requests[tmp[0]] = tmp[1];
         }
     }
     // 返回 undefinde 说明没有对应的key
     // 返回 '' 说明对应的值为空 但是有 key
     return requests[key]
 }
 // var titleArr=['通讯录还原','通话记录还原','']
 function objeckType(id) {
     var x = "";
     switch (id) {
         case 1:
             x = "通讯录";
             break;
         case 2:
             x = "通话记录";
             break;
         case 3:
             x = "照片";
             break;
         case 4:
             x = "备忘录";
             break;
         case 5:
             x = "日历";
             break;
         case 6:
             x = "微信";
             break;
         case 7:
             x = "QQ";
             break;
         case 8:
             x = "短信";
             break;
     }
     return x + "恢复"
 }
 dataonload()

 function dataonload() {
     //获取页面id
     var projectId = parseInt(getValue('id'));
     //获取标题
     var title_ser = objeckType(projectId);
     //设置标题
     $('#show_pril span').html(title_ser)
     $('#show_pril img').attr({'src':'images/f'+projectId+'.png'})
     var url = orderUrl + '/v1/Publics/price'
         //加密对象
     var rdata = {
             appkey: '593624b55898c6b524e516771afb8701',
             projectId: projectId
         }
         //加密以后的数据
     var sign = hexMD5(mySort(rdata));
     $.ajax({
         url: url,
         type: 'POST',
         dataType: 'json',
         data: {
             projectId: projectId,
             sign: sign
         },
         success: function(data) {
             pushHtml(data);
         }
     })
 }

 function pushHtml(data) {
         //滚动新闻
     var news_html = "";
     //价格区间
     var priceNote = data.data.priceNote;
     $('#show_prir span').html(priceNote);
     for (i in data.data.advertList) {
         news_html += '<li>' + data.data.advertList[i].content + '</li>'
     }
     for (j in data.data.priceList) {
         $('#choose_boxp .choose_boxc').eq(j).attr({
             price: data.data.priceList[j].price,
             note: data.data.priceList[j].note,
             priceid: data.data.priceList[j].id
         });
         $('#pay_boxleft i').html(data.data.priceList[0].price);
         $('#del p').html(data.data.priceList[0].note);
     }
     $('#top .news_ul').html('');
     $('#top .news_ul').append(news_html);
     var newsUl = $.trim($('#news_ul').html());
     var newsUl_copy = newsUl;
     $('#top .news_ul').append(newsUl_copy);
     
     // if(newsUl == ''){
     //    $('.news_gd').hide();
     // }else{
     //    $('.news_gd').show();
     // }
 }
 var news_ul = $.trim($('#news_ul').html());
 if(news_ul == ''){
    $('.news_gd').hide();
}else{
  $('.news_gd').show();

}
 //新闻轮播滚动
 function AutoScroll(obj) {
     $(obj).find("ul:first").animate({
         marginTop: "-1rem"
     }, 1000, function() {
         $(this).css({
             marginTop: "0px"
         }).find("li:first").appendTo(this);
     });
 }
 $(document).ready(function() {
     setInterval('AutoScroll("#top")', 2000)
 });
 //新闻轮播滚动-------------------------------end
 //业务选择
 $("#choose_boxp").on('click', '.choose_boxc', function() {
         $(this).addClass('ac_choose').siblings('.choose_boxc').removeClass('ac_choose name');
         var idx = $(this).index();
         var price = $(this).attr('price');
         var note = $(this).attr('note');
         var choose_i = '';
         var choose_span = '';
         if(idx == 0){
            choose_i = '预约此项服务即可同时获得'
            choose_span = '"数据恢复PC版软件授权"'
            $("#del2").show();          
         }else if(idx == 1){
            choose_i = '预约紧急恢复不仅可以获得单项加急，并且还可以获得'
            choose_span = '"数据恢复PC版软件授权"'
            $("#del2").show();          
         }else{
            choose_i = ''
            choose_span = ''  
            $("#del2").hide();          
         }
        $('.reduction_des').show();
        $('.redu_title').show();
         $('#pay_boxleft i').html(price);
         $('#del p').html(note);
         $('.reduction_des i').html(choose_i);
         $('.reduction_des span').html(choose_span);
         if(choose_i == ''||choose_span == ''){
            $('.reduction_des').hide()
            $('.redu_title').hide()
         }
     })
     //业务选择-------------------end
     //下单弹出支付方式
 $('#pay_btn').on('click', function() {
     var qq_num = $('#qq_ipt').val();
     if (qq_num != '') {
         if (!/^[1-9][0-9]{4,14}$/.test(qq_num)) {
             layer.open({
                 content: '请输入正确的QQ号码',
                 skin: 'msg',
                 time: 1
             });
         } else {
             $('.pay_choose').addClass('ac_paychoose');
         }
     } else {
         layer.open({
             content: '请输入QQ号码',
             skin: 'msg',
             time: 1
         });
     }
 })
 $('.pay_choose').on('click', function(e) {
     $('.pay_choose').removeClass('ac_paychoose');
 });
 $('#close').on('click', function(e) {
     $('.pay_choose').removeClass('ac_paychoose');
 });
 $('.pay_choosebox').on('click', function(e) {
         e.stopPropagation();
     })
     //支付
     //加密对象
 var rdata2 = {
         appkey: '593624b55898c6b524e516771afb8701'
     }
     //加密以后的数据
 var sign2 = hexMD5(mySort(rdata2));
 $.ajax({
     url: orderUrl + '/v1/Publics/payType',
     type: 'POST',
     dataType: 'json',
     data: {
         sign: sign2
     },
     success: function(data) {
         var pay_box = '';
         for (i in data.data) {
             pay_box += '<div class="pay_icon" data-id="' + data.data[i].id + '" paykeywords="' + data.data[i].paykeywords + '">' + '<img src="images/a' + data.data[i].id + '.png" alt="">' + '<p>' + data.data[i].name + '</p>' + '</div>'
         }
         $('#pay_choos3').append(pay_box);
         $('.pay_icon').on('click', function() {
             //qq
             var qq = $('#qq_ipt').val();
             var projectId = parseInt(getValue('id'));
             //price_id
             var price_id = $('.ac_choose').attr('priceid');
             //id
             var id = $(this).attr('data-id');
             //paykeywords
             var paykeywords = $(this).attr('paykeywords');
             //设置本地缓存
             localStorage.qq = qq;
             if(local_appids ==undefined || local_tokens == undefined){
                 layer.open({
                     content: '请先登录',
                     skin: 'msg',
                     time: 1.5
                 });
             }else{
                  //加密对象
                 var rdata_pay = {
                         appkey: '593624b55898c6b524e516771afb8701',
                         appid: local_appids,
                         device: 'web',
                         token: local_tokens,
                         payType: id,
                         projectType: projectId,
                         priceId: price_id,
                         channel: paykeywords,
                         qq: qq
                     }
                     //加密以后的数据
                 var sign_pay = hexMD5(mySort(rdata_pay));                
                var ua = navigator.userAgent.toLowerCase();
                //判断是否在微信
                var isWeixin = ua.indexOf('micromessenger') != -1;
                if(id == 2){
                    if (isWeixin) {
                        $('.wx_prompt').addClass('ac_paychoose');
                        $(".wx_prompt").on('click',function(){
                            $(this).removeClass('ac_paychoose');
                        })
                    }else{
                     $.ajax({
                         url: orderUrl + '/v1/Order/orderAdd',
                         type: 'POST',
                         dataType: 'json',
                         data: {
                             sign: sign_pay,
                             appid: local_appids,
                             device: 'web',
                             token: local_tokens,
                             payType: id,
                             projectType: projectId,
                             priceId: price_id,
                             channel: paykeywords,
                             qq: qq
                         },
                         success: function(data) {
                             var payUrl = data.data.paystr.url + '?' + data.data.paystr.body;
                             window.location.href = payUrl;
                         }
                    })                         
                    }                   
                }else{
                     $.ajax({
                         url: orderUrl + '/v1/Order/orderAdd',
                         type: 'POST',
                         dataType: 'json',
                         data: {
                             sign: sign_pay,
                             appid: local_appids,
                             device: 'web',
                             token: local_tokens,
                             payType: id,
                             projectType: projectId,
                             priceId: price_id,
                             channel: paykeywords,
                             qq: qq
                         },
                         success: function(data) {
                             var payUrl = data.data.paystr.url + '?' + data.data.paystr.body;
                             window.location.href = payUrl;
                         }
                    }) 
                }

              
             }

         })
     }
 })
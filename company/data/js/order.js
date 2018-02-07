 var qqLocal = localStorage.qq;
 if (qqLocal) {
     $('#qq_ipt').val(qqLocal)
 } else {
     $('#qq_ipt').val('')
 }
 var orderUrl = 'http://192.168.10.39:8080';
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
     console.log(data)
         //滚动新闻
     var news_html = "";
     //价格区间
     var priceNote = data.data.priceNote;
     $('#show_prir span').html(priceNote)
     for (i in data.data.advertList) {
         news_html += '<li>' + data.advertList[i].content + '</li>'
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
     $('#top .news_ul').html();
     $('#top .news_ul').append(news_html);
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
         var price = $(this).attr('price');
         var note = $(this).attr('note');
         $('#pay_boxleft i').html(price);
         $('#del p').html(note);
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
         console.log(data)
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
         })
     }
 })
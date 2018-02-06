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
     var url = 'http://192.168.10.39:8080/v1/Publics/price'
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
            note: data.data.priceList[j].note
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
     $('.pay_choose').addClass('ac_paychoose');
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
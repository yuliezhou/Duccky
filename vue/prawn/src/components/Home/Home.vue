<template>
    <div class="all_wrap" >
        <!-- 提现tips -->
        <div class="withdraw_tips flex_between" v-if="showWithdrawTips" @click="go_withdraw_tips">
            <div class="left_msg flex_ali_center" >
                <img src="http://static.dxshiwan.com/static/img/home_radio.png">
                <i>{{tipTitle}}</i>
            </div>
            <img class="cancel" src="http://static.dxshiwan.com/static/img/home_cancel.png" @click.stop="close_withdraw_tips">
        </div>
        <div class="need_safari_shade" v-if="needSafari"></div>
        <div class="need_safari_tips" v-if="needSafari">
            <div>
                <p>1、点击右上角的</p>
                <p>2、选择<img class="icon" src="http://static.dxshiwan.com/static/img/home_safari.png">在Safari中打开即可开始大虾试玩</p>
                <img class="arrow_tips" src="http://static.dxshiwan.com/static/img/home_arrow_tips.png">
                <img class="arrow" src="http://static.dxshiwan.com/static/img/home_arrow3.png">
            </div>
        </div>
        <div id="head_banner" class="head_banner flex_between" :class="showWithdrawTips? 'mt_2':''" >
            <img v-if="!headchange" class="prawn" src="http://static.dxshiwan.com/static/img/home_logo.png">
            <div class='head_wrap' @click="go_own">
                <img class="my_head" :src="userInfo.avatar">
                <img class="back" src="http://static.dxshiwan.com/static/img/home_back.png">
            </div>
        </div>
        <header class="Home_header">
            <i class="tips" @click="test">账户余额(元)</i>
            <span class="blance">{{userInfo.balance}}</span>
            <div class="btn flex_jus_ali" @click="go_withdraw">提现</div>
            <div class="income_detail">
                <div class='income_wrap flex_jus_ali'><p>今日收入(元) <span>{{userInfo.todaySumMoney}}</span></p></div>
                <div class='income_wrap flex_jus_ali'><p>累计收入(元) <span>{{userInfo.total_balance}}</span></p></div>
            </div>
        </header>

        <div class="task_list_wrap">
            <div class="task_item flex_between task_fixed">    
                <div class="fixed_wrap flex_column" @click="go_apprentice"><img src="./img/home_fixed.png"><p>收徒任务</p></div>
                <div class="fixed_wrap flex_column" @click="go_callback"><img src="./img/home_callBack.png"><p>回调任务</p></div>
                <div class="fixed_wrap flex_column" @click="go_comment"><img src="./img/home_comment.png"><p>评论任务</p></div>
                <div class="fixed_wrap flex_column" @click="go_alliance"><img src="./img/home_alliance.png"><p>联盟任务</p></div>
            </div>
            <div v-cloak v-if="fastnowdatacul.length > 0">
                <div class="task_item flex_between" data-item="item" v-for="(item,index) in fastnowdatacul" @click="go_task(item)" :key="index">
                    <div class="left_msg">
                        <img class="task_img" ref="item" :src="item.img_src">
                        <div class="word_msg">
                            <p class="name">{{item.taskname}}</p>
                            <div>
                                <div  class="tips" v-for="(it,index) in item.tags" :key="index" :class="it.classname">{{it.tagname}}</div>
                                <!--<div v-else class="tips">付费</div>-->
                                <!--<div class="tips">剩{{item.remaining_number}}份</div>-->
                            </div>
                        </div>
                    </div>
                    <div class="right_msg">
                        <p v-if="item.tasking===1"><span class="ing">进行中</span></p>
                        <p v-else><i>+</i><span class="value">{{item.tuser_price}}</span><span>元</span></p>
                    </div>
                </div>
            </div>
            <div class="notask" v-else>
                    <img src="http://static.dxshiwan.com/static/img/home_notask.png">
                    <p>暂时没有任务</p>
            </div>
            <!-- 即将开始的任务 -->
            <div v-cloak v-if="after.length > 0">
                <div class="after_tips">以下任务即将开始</div>
                <div class="task_item flex_between"  v-for="(item,index) in unreadyTask"  :key="index">
                    <div class="left_msg">
                        <img src="http://static.dxshiwan.com/static/img/home_wen.png">
                        <div class="word_msg">
                            <p class="name">{{item.name}}</p>
                            <div>
                                <div class="tips">{{item.time}}</div>
                                <div class="tips">剩{{item.remaining_number}}份</div>
                            </div>
                        </div>
                    </div>
                    <div class="right_msg">
                        <p v-if="item.tasking"><span class="ing">进行中</span></p>
                        <p v-else><i>+</i><span class="value">{{item.tuser_price}}</span><span>元</span></p>
                    </div>
                </div>
            </div>            
        </div>
   </div>
</template>

<script>
import md5 from '@/common/js/md5.js'
import { MessageBox } from 'mint-ui';
export default {
    components: {
      
    },
    data(){
        return {
            userInfo:{},            //用户信息
            hastasking:0,
            fastnowdata:[],         //快速任务
            fastdianrudata:[],      //点入
            fastwanpudata:[],      //万普
            after:[],               //即将开始任务
            headchange:false,       //顶部改变样式
            needSafari:true,        //检测是否为safari浏览器
            showWithdrawTips:false, //显示顶部提现tips
            tipTitle:'',
            taskImgSrc:[]           //快速任务图片地址
        }
    },

    updated(){
        this.$Indicator.close()             //关闭loading弹窗
    },
    mounted(){
        this.init();
        //点入
        this.getdianruapilist();
        var _this = this;
        var timer = setInterval(function () {
            if(_this.fastnowdata.length < 1) {
                clearInterval(timer);
                //万普
                _this.wanpuapitasklist();
                
            }
        }, 1000);
        window.addEventListener('scroll', this.handleScroll);
    },
    computed:{
        fastnowdatacul:function(){
            var returndata = [];            
             if(this.fastnowdata.length > 0){
                for(var j = this.fastnowdata.length -1; j >= 0; j --){
                    returndata.push(this.fastnowdata[j]);
                }
            }
            //点入
            if(this.fastdianrudata.length > 0){
                for(var j = this.fastdianrudata.length -1; j >= 0; j --){
                    returndata.push(this.fastdianrudata[j]);
                }
            }
            //万普
            if(this.fastwanpudata.length > 0){
                for(var j = this.fastwanpudata.length -1; j >= 0; j --){
                    returndata.push(this.fastwanpudata[j]);
                }
            }
            returndata.sort(function (a,b) {
                if(a.listordertype == b.listordertype) {
                    if (a.type == "fasktask" && b.type == "fasktask") {
                        if (a.tasking == b.tasking) {
                            return parseInt(b.remain_number) - parseInt(a.remain_number);
                        } else {
                            return b.tasking - a.tasking;
                        }
                    } else {
                        return b.listordertype - a.listordertype;
                    }
                }else{
                    //处理快速任务排序
                    if(a.type == "fasktask" && b.type != "fasktask"){
                        if(parseInt(a.remain_number) == 0 ){
                            return 1;
                        }else{
                            return -1;
                        }
                    }
                    if(a.type != "fasktask" && b.type == "fasktask"){
                        if(parseInt(b.remain_number) == 0 ){
                            return -1;
                        }else{
                            return 1;
                        }
                    }
                    return b.listordertype - a.listordertype;
                }
            });
            return returndata;
        },
        hasnotask:function(){
            if(this.fastnowdatacul.length == 0){
                return true;
            }else{
                return false;
            }
        },
        // 即将开始任务时间处理
        unreadyTask(){
            var list = this.after;
            list.forEach(item => {
                var time = new Date(item.start_time*1000);
                var hour = time.getHours();
                hour = hour<10? ('0'+hour) : hour;
                var minute = time.getMinutes();
                minute = minute<10? ('0'+minute):minute; 
                var time = hour+':'+minute
                item.time = time;
            });
            return list
        },
    },
    methods:{
        test() {
            this.$MessageBox.confirm('132465').then(()=>{
                console.log('qwj')
            })
            .catch(()=>{
                console.log('error')
            })
        },

        //顶部大虾banner处理
       　handleScroll () {
            this.$nextTick(()=>{
                //图片懒加载
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var imgarr = document.getElementsByClassName("task_img");
                var seeHeight = document.body.clientHeight || document.documentElement.clientHeight;
                var accept_data =  this.fastnowdatacul;
                for(var i = 0; i < imgarr.length; i++ ){
                    if(imgarr[i].offsetTop < scrollTop + seeHeight){
                        if(!accept_data[i].img_src){
                            console.log('img_src还未赋值')
                            this.$set(this.fastnowdatacul[i],'img_src',this.fastnowdatacul[i].icon)
                        }else{
                            continue
                        }   
                    }else{
                    //    this.$set(this.fastnowdatacul[i],'img_src','')
                    }
                }
                //顶部大虾显示隐藏
                if(scrollTop>195){
                this.headchange=true;
                }else if(scrollTop<195){
                    this.headchange=false
                }
            })
        },
        wanpuapitasklist:function(){
             var _this = this;
            _this.$.get(this.consts.appinfourl).then(function (response) {
                if(response.status == 1){
                    _this.$.get(_this.consts.clientBaseurl+"/v2deviceinfo").then(function (response) {
                        if(response.status == 1){
                            var postdata ={
                                dv : response.data.dv,
                                osv : response.data.osv,
                                wifi : response.data.wifi,
                                devicename : response.data.devicename,
                                jb : response.data.jb,
                                user : response.data.user,
                                openudid : response.data.openudid,
                                ifa : response.data.ifa
                            };
                                //var postdata = {};
                            _this.sendGet("/Unionapi/waiputasklist.html",{params:postdata}).then(function (response) {
                                var resole = response.data;
                                if(resole.status == 1){
                                    var drdata = resole.data;
                                        for (var i = 0; i < drdata.length; i++) {
                                            var additem = {};
                                            additem.taskid = drdata[i].adid;
                                            if(drdata[i].searchWord != ''){
                                                additem.taskname = "搜索'"+drdata[i].searchWord.replace(/[&\|\\\*^%$#@amp;\-]/g,"")+"'";
                                            }else{
                                                additem.taskname = drdata[i].app_name;
                                            }

                                            additem.tuser_price = (drdata[i].points/100).toFixed(2);
                                            additem.tags = [];
                                            additem.tags.push({tagname:"免费",classname:"tag-yellow"});
                                            //additem.tags.push({tagname:"剩余" + drdata[i].remain + "份"});
                                            additem.remain_number = drdata[i].remain;
                                            additem.icon = drdata[i].app_icon;
                                            additem.boundid = drdata[i].identifier;
                                            additem.gourl = drdata[i].click_url;
                                            additem.type = "wanpufask";
                                            additem.listordertype = 96;
                                            _this.fastwanpudata.push(additem);
                                        }
                                }
                            })




                        }
                    })

                }
            })
        },
        getdianruapilist:function(){
            return true;
            var _this = this;
            //var dianru = this.consts.clientBaseurl+"/v2drapilist";
            var dianru = "http://localhost:35941/v2drapilist";
            _this.$.get(this.consts.appinfourl).then(function (response) {
                if(response.status == 1){
                    _this.$.get(dianru).then(function (response) {
                        if(response.status == 1){
                            if(response.data.table != ''){
                                var drdata = response.data.table;

                                if(drdata.length>0){
                                    for (var i = 0; i < drdata.length; i++) {                                    
                                        var additem = {};
                                        additem.taskid = drdata[i].adid;
                                        additem.taskname = "搜索'"+drdata[i].keywords.replace(/[&\|\\\*^%$#@amp;\-]/g,"")+"'";

                                        additem.tuser_price = (drdata[i].price/100).toFixed(2);
                                        additem.tags = [];
                                        additem.tags.push({tagname:"免费",classname:"tag-yellow"});
                                        additem.tags.push({tagname:"剩余" + drdata[i].remain + "份"});
                                        additem.remain_number = drdata[i].remain;
                                        additem.icon = drdata[i].icon;
                                        additem.boundid = drdata[i].bundleid;
                                        additem.gourl = "/Uniontask/fastdianruapidetail.html?adid=" + additem.taskid ;
                                        additem.type = "dianrufask";
                                        additem.listordertype = 97;
                                        _this.fastdianrudata.push(additem);
                                    }
                                }
                                
                            }       
                        }
                    })

                }
            })
        },
        init(){
                //检查是否是PC端
            if(!this.isMobile()){
                this.$router.replace('./PC')
                return
            }
                //检查是否为Safari浏览器
            if (window.navigator.userAgent.indexOf("Safari") != -1) {
                this.needSafari=false
            }else{
                return 
            }
            this.$Indicator.open('加载中')        //loading弹窗
               // 首先检查助手
             var isClientLogin=this.isClientLogin();
             if(isClientLogin.status==0){
                 this.$pop();
                 return;
             }
            //获取数据的时候检查服务端登录状态和版本
            this.sendPost("/index/index/time/1531277279.html",{})
            .then((res)=>{
                if(res.data.data.systemAnnouncements){
                    this.showWithdrawTips=true;
                    this.tipTitle=res.data.data.systemAnnouncements
                }
                if(res.data.status==-1&& res.data.data==1000){
                    //检查登录和版本
                    this.check_version();
                    return;
                }
                var userInfo = res.data.data;
                this.userInfo = userInfo;
                var app=this;
                this.sendGet("/index/tasklist.html")
                .then((response)=>{
                    console.log(response)
                
                    if(response.data.status==-2){
                        return
                    }else if(response.data.status==1){
                        this.after=response.data.data.after;        //即将开始的任务列表
                    //处理进行中任务
                    if (response.data.data.now.length > 0) {
                        for (var i = 0; i < response.data.data.now.length; i++) {
                            var adddata = {};
                            adddata.taskid = response.data.data.now[i].id;
                            adddata.taskname = response.data.data.now[i].name;
                            if (response.data.data.now[i].tasking == 1) {
                                adddata.tasking = 1;
                                app.hastasking = 1;
                            } else {
                                adddata.tasking = 0;
                            }
                            adddata.tags = [];
                            adddata.remain_number = response.data.data.now[i].remaining_number;
                            if(response.data.data.now[i].remaining_number > 0){
                                adddata.tags.push({tagname:"有剩余",classname:"tag-pink"});
                            }else{
                                adddata.tags.push({tagname:"剩余0份",classname:"tag-pink"});
                            }

                            if(response.data.data.now[i].is_charge == 1){
                                adddata.tags.push({tagname:"付费",classname:"tag-yellow"});
                            }else{
                                //adddata.tags.push({tagname:"免费",classname:"tag-yellow"});
                            }
                            if(response.data.data.now[i].has_belongtask){
                                adddata.tags.push({tagname:"专属",classname:"tag-yellow"});
                            }
                            adddata.app_price = response.data.data.now[i].app_price;
                            adddata.tuser_price = response.data.data.now[i].tuser_price;
                            adddata.appstoreId = response.data.data.now[i].appstoreId;
                            adddata.boundid = response.data.data.now[i].boundid;
                            adddata.icon = response.data.data.now[i].icon;
                            adddata.type = "fasktask";
                            adddata.listordertype = 99;
                            app.fastnowdata.push(adddata);
                            app.$nextTick(() => {
                                app.handleScroll();
                            })
                        }
                    }
                    }else if(response.data.status==-1){
                        //todo 进行登录
                        MessageBox.alert('未登录')
                    }
                })            
            })
        },

    　　isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            if(flag){
                return true
            }else{
                return false
            };
        },
        go_withdraw(){
            this.$router.push('./withdraw')
        },
        go_own(){
            this.$router.push('./own')
        },
        go_apprentice(){
            this.$router.push('./ApprenticeTask')
        },
        go_callback(){
            //MessageBox.alert("尽请期待", '系统提示');
            // return
            this.$router.push('./CallbackList')
        },
        go_comment(){
            //MessageBox.alert("尽请期待", '系统提示');
            // return
            this.$router.push('./CommentList')
        },
        go_alliance(){
            this.$router.push('./AllianceList')
        },
        go_task(e){
            switch (e.type){
                case "fasktask":
                    this.$Indicator.open('加载中')        //loading弹窗
                    var taskid = e.taskid;
                    var _this=this;
                    if(e.tasking){
                        this.$Indicator.close()
                        this.$router.push({path:'./detail',query:{taskid:taskid}})
                        return
                    }else if(this.hastasking==1){
                        MessageBox.confirm('当前有进行中的任务，确定放弃之前任务执行此任务，取消返回之前的任务')
                        .then(res => {
                             this.$Indicator.close()
                            _this.canceltask(e,_this);
                        })
                        .catch(res=>{
                             this.$Indicator.close()
                            console.log('error')
                        })
                    }else {
                        this.dostarttask(e,_this);
                    }
                    break;
                case "dianrufask":
                    this.$router.push({path:'./dianrudetail',query:{adid:taskid}})
                    break;
                case "wanpufask":
                    window.location.href = e.gourl;
                    break;

            }
        },
        dostarttask(item,_this){
            var taskid = item.taskid;
            var timestamp = Date.parse(new Date());
            var session_id = document.cookie;
            session_id =  session_id.substr(10);
            var code = session_id + timestamp + taskid;
            code = md5.hexMD5(code);
            this.sendGet("/task/starttask.html",{
                params:{
                    time:timestamp,
                    taskid:taskid,
                    code:code
                }
            }).then((res)=>{
                console.log(res)
                this.$Indicator.close()
                if(res.data.status==1){
                    _this.hastasking = 1;
                    item.tasking = 1;
                    _this.$router.push({path:'./detail',query:{taskid:taskid}})
                }
                if(res.data.status==0){
                    MessageBox.alert(res.data.info);
                }
            })
        },
        canceltask(item,app){
            this.sendGet("/task/untask.html")
            .then((response)=>{
                if (response.data.status == 1) {
                for (var i =0; i< app.fastnowdata.length; i ++) {
                    app.fastnowdata[i].tasking = 0;
                }
                app.hastasking = 0;
                app.dostarttask(item,app);
            } else {
                //放弃任务错误
                MessageBox.alert(response.data.info);
            }
            }).catch(function () {
                MessageBox.alert("服务器繁忙,请稍后再试");
            })
        },
        go_withdraw_tips(){
            this.$router.push('./withdraw_tips')
        },
        close_withdraw_tips(){
            this.showWithdrawTips=false
        },
        check_version:function(){
            var _this=this;
            _this.$.get(this.consts.appinfourl)
            .then(function (response) {
                var date = new Date();
                var hour = date.getHours();
                if( (hour > 15 && hour < 18) || _this.compareversion(response.data.version,"1.1.1") ){
                    _this.dologin();
                }else{
                    MessageBox({title:'系统提示',message:'大虾试玩助手最新版为1.1.1，请先在桌面删除旧版本，然后再下载安装最新版，继续做任务',confirmButtonText:'下载安装'})
                    .then(action => {
                        _this.$router.push('./install');
                    })
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        dologin:function () { 
            var _this=this;
            _this.$.get(_this.consts.clientloginurl)
                    .then(function (response) {
                        if (response.data.status == 1) {
                            if(response.data.newlogin != true){
                                MessageBox({
                                    title: '系统提示',
                                    message: '大虾试玩助手未能连接服务器,请关闭重试!',
                                });
                            }
                        }else{
                            //登录服务器
                            var openudid = response.data.openudid;
                            var idfa = response.data.idfa;
                            var type = 0;
                            var isjailbreak = 1;
                            if (response.data.type) type = response.data.type;
                            if (type == 1) type = 2;//客户端1是ipad ，服务端2是ipad
                            if (type == 2) type = 1;
                            if (response.data.isjailbreak) isjailbreak = response.data.isjailbreak;
                            if (isjailbreak == 2) {
                                MessageBox({
                                    title: '系统提示',
                                    message: '大虾试玩暂时不支持越狱设备.',
                                });
                                return false;
                            }
                            //登录服务器
                            var nowDate = new Date();
                            var nowTime = nowDate.getTime() / 1000;
                            var logindata = {openudid:openudid,idfa:idfa,type:type,time:nowTime};
                            _this.dologinserver(logindata);
                        }
                    })
                    .catch(function (err) {
                        MessageBox.alert(err);
                        return;
                    });
        },
        dologinserver:function (data) {
            this.sendGet('/Guide/dologin.html',{params:data}).then(function (response) {
                if(response.data.status == 1){
                    //登录成功,从新取取首页数据
                    document.location.reload();
                }else{
                    //登录错误
                    MessageBox({
                        title: '系统提示',
                        message: response.data.info,
                    });
                }
            }).catch(function (err) {
                MessageBox({
                    title: '系统提示',
                    message: '服务器繁忙,稍后再试.',
                });
            });
        },
    }
}
</script>

<style scoped>
.all_wrap{
    width: 100%;
    height: 100%;
}
.withdraw_tips{
    width: 100%;
    height:2.71rem;
    background:rgba(255,233,194,1);
    opacity:0.9;
    padding: 0 1rem;
    box-sizing: border-box;
}
.withdraw_tips .left_msg{
    color: #333333
}
.withdraw_tips .left_msg img{
    height: 1.14rem;
    margin-right: 0.714rem
}
.withdraw_tips .left_msg i{
    font-size: 1.08rem;
}
.cancel{
    height: 1.1rem;
    padding: 0.3rem;
    margin-right: -0.5rem
}
.mt_2{
    top: 3.71rem!important;
}
.head_banner{
    width: 100%;
    height: 3rem;
    position: fixed;
    top: 1rem;
    left: 0;
    align-items: center;
    z-index: 100;
}
.prawn{
    height: 2rem;
    margin-left: 1rem
}
.Home_header{
    width: 100%;
    height: 18rem;
    background:url(http://static.dxshiwan.com/static/img/home_header_bac.png);
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 30px 0;
    box-sizing: border-box;
    font-size: 0.93rem;
    line-height: 18px;
    position: relative;
}
.head_wrap{
    width:4.71rem;
    height:2.29rem;
    background:rgba(255,255,255,1);
    border-radius:7.14rem 0rem 0rem 7.14rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    right: 0;
}
.head_wrap .my_head{
    width:2.14rem;
    height:2.14rem;
    border-radius: 50%;
}
.head_wrap .back{
    width: 0.71rem;
    height: 1.14rem;
    margin-right: 0.8rem;
}
.Home_header .tips{
    margin-top: 2.2rem
}
.Home_header .blance{
    font-size: 3.29rem;
    line-height: 53px;
    margin-top: 10px;
    font-family: 'dxb'
}
.Home_header .btn{
    width:12.57rem;
    height:2.86rem;
    background:rgba(255,255,255,1);
    border-radius:19px;
    color: #3098FF;
    font-size: 1.14rem;
    font-weight: bold;
    margin-top: 1.3rem;
}
.income_detail{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 0.6rem;
    width:25.36rem;
    height:4rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem 0.29rem 0.57rem 0rem rgba(45,167,253,0.1);
    border-radius:0.29rem;
    position: absolute;
    left: 50%;
    margin-left: -12.68rem;
    bottom: -2rem
}
.income_wrap{
    width:12.29rem;
    height:3.07rem;
    color: #3F4552;
    font-size:0.86rem;
    line-height: 1.21rem;
}
.income_wrap span{
    font-size: 1.14rem;
    font-weight: 600;
    line-height:1.36rem;
    font-family: 'dxb'
}
.task_list_wrap{
    background: white;
    margin-top: 3.57rem;
}
.task_item{
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
    align-items: center;
    margin-bottom: 2.14rem;
}
.task_fixed{
    padding: 0 2rem;    
}
.task_fixed img{
    width: 3.714rem;
    height: 3.714rem;
    border-radius: 0.5rem;
}
.task_fixed p{
    margin-top: 0.71rem
}
.task_item .left_msg{
    display: flex
}
.task_item .left_msg img{
    width: 3.714rem;
    height: 3.714rem;
    border-radius: 0.5rem
}
.task_item .left_msg .word_msg{
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #190D15;
    padding-top: 0.4rem;
}
.task_item .left_msg .word_msg .name{
    font-size: 1.14rem;
    color: #190D15;
}
.task_item .left_msg .word_msg .tips{
    font-size:0.79rem;
    background:rgba(249,250,252,1);
    display: inline-block;
    padding: 0.06rem 0.6rem;
    border-radius: 2px;
    color: #9FA8B7;
    line-height:1.14rem;
    margin-right: 0.4rem;
}
.task_item .right_msg p{
    color: #F24C4C
}
.task_item .right_msg i{
    font-size: 1rem;
}
.task_item .right_msg span{
    font-size: 0.86rem;
}
.task_item .right_msg .value{
    font-size: 1.71rem;
    font-weight: 600;
    font-family: 'dxb';
    font-weight: 600;
}
.after_tips{
    width: 100%;
    height: 3rem;
    background:#F0F0F0;
    display: flex;
    align-items: center;
    padding-left: 0.6rem;
    margin-bottom: 1.5rem;
    font-size: 0.88rem;
    color: #9FA8B7;
}
.fixed_tips{
    font-size:0.79rem;
    color: #9FA8B7;
}
.ing{
    font-size: 1.285rem!important;
    color: #3098FF;
    font-family:'dx';
}
.notask{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.142rem;
    color: #D9DFE8;
}
.notask img{
    transform: scale(0.7);
}
.need_safari_shade{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 999;
}
.need_safari_tips{
    position: fixed;
    color: white;
    z-index: 1000;
    top:24%;
    left: 1rem; 
    font-size: 1.9rem;
    line-height: 3rem;
    padding-right: 0.4rem;
}
.need_safari_tips .icon{
    height: 2.2rem;
    margin: 0 0.6rem;
}
.arrow_tips{
    position: absolute;
    right: 8rem;
    top: 0rem;
    width: 3.5rem;
}
.arrow{
    position: absolute;
    height: 9rem;
    right: 3rem;
    top: -8rem;
}
</style>
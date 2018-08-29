<template>
<div>
   <app-header :title = "'任务详情'"></app-header>
    <div class="task_wrap">
            <div class="left_msg">
                <img :src="task.app.icon">
                <span>{{task.app.name}}</span>
            </div>
            <div class="right_msg">
                <p><i>+</i><span class="value">{{task.app.price}}</span><span>元</span></p>  
            </div>
    </div>
    <div class="nav">
        <p class="left_word">任务步骤</p>
        <p class="right_word" >倒计时:<i>{{time.fen}}</i>分<i>{{time.miao}}</i>秒</p>
    </div>

    <div class="task_step">
       <div v-for="(item,index) in task.template" :key="index">{{item.key}}<p v-html="item.value"></p></div>
    </div>
    <div v-if="task.app.keyword" v-cloak>
        <div class="map_wrap flex_jus_ali"  @click='copy_word'>{{task.app.keyword}}</div>
        <p class="copy_word">复制搜索关键词，<span style="color: red">AppStore排名约：第{{task.app.ranking}}位</span></p>

        <div @click="go_search" class='btn flex_jus_ali'>去AppStore搜索</div>
    </div>
    <div v-else>
        <!--<div class="map_wrap flex_jus_ali" >{{task.app.keyword}}</div>-->
        <!--<p class="copy_word">复制搜索关键词</p>-->
        <div @click="go_search" class='btn flex_jus_ali'>去AppStore下载</div>
    </div>
    <!-- 底部按钮 -->

    <div @click="open_app" class='btn flex_jus_ali' :class="[ cantOpen?'': 'cantOpen' ]">打开app</div>
    <div @click="activetask" class='btn flex_jus_ali red last' :class="[ cantActive?'': 'cantActive' ]">领取奖励</div>
    <div class="placeholder_div"></div>

</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    name: 'App',
    data(){
        return {
            task:{app:{}},
            lefttime:0,
            configtask:{},
            cantOpen:false,
            cantActive:false,
            isUntask:true,
            time:{fen:{},miao:{}}
        }
    },
    beforeRouteLeave (to, from, next) {
        if(this.isUntask){
            MessageBox.confirm('当前任务正在进行，是否放弃此任务','')
            .then(res => {  
                this.sendGet("/Task/untask.html")
                .then(()=>{
                    next()
                })
            })
            .catch(res=>{
                next(false)
            })
        }else {
            next()
        }

    },
    mounted(){
        this.$Indicator.open('加载中')  //loading弹窗
        var taskid = this.$route.query.taskid;
        if(taskid==undefined||taskid==''){
            this.isUntask=false;
            this.$router.push('/');
            return;
        }
        var _this=this;
         this.sendGet("/task/detail.html",{params:{taskid:taskid}})
         .then((res)=>{
             console.log(res)
        var task = res.data.data;
        console.log(task)
        if(res.data.status!=1){
            this.isUntask=false;
           MessageBox.alert(res.data.info).then(action=>{
                if(res.data.status=5){
                _this.sendGet("/Task/untask.html");
                _this.$router.push('/')
            }else {
                _this.$router.push('/')
            }
        }).catch (res=>{
                _this.$router.push('/')
        })
            return;
        }
            this.task = task;
            //时间初始化
            var lefttime = res.data.data.app.task_endtime
            this.lefttime = lefttime;
            var fen = parseInt(lefttime/60);
            var miao = lefttime%60;
            var time={
                fen:fen,
                miao:miao
            }
            this.time = time;
            this.configtask={
                //      installAppUrl:task.installAppUrl,
                //      removetimewithbundleidurl:clientBaseurl + '/removetimewithbundleid?bundleid='+'{$appios.boundid}',
                //      activeAppUrl:'{$activeAppUrl}',
                //      isOpenUrl:'{$isOpenUrl}',
                //      getOpenAppTimeUrl:'{$getOpenAppTimeUrl}',
                //      boundid:'{$appios.boundid}',
                //      taskprice:'{$app.price}',
            }
        if(!this.task.isIos11){
            if(this.PcVersion){
                return
            }
            _this.checktaskinstall(this.task.installAppUrl)
        }
        })
        
        this.countdown()
    
    },
    updated(){
        this.$Indicator.close()             //关闭loading弹窗
    },
    methods:{
        go_search(){
            if(this.task.isIos11){
                this.cantOpen=true;
            }
            if(this.task.app.keyword){
                window.location.href ='https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?media=software&country=CN&mt=8&term=';
            }else {
                window.location.href = this.task.app.appstore_url;
            }
        },
        open_app(){
            var _this=this;
            if(_this.cantOpen==false){
                return;
            }
            if(_this.task.isIos11){
                this.checkIos11taskinstall(_this.task.installAppUrl)
            }else {
                var openAppUrl=_this.task.openUrl;
                var ios11openAppUrl=_this.task.commonopenurl;
                _this.$.get(openAppUrl,function(data){
                    if(data.status == 1){
                        //推送信息(存在则推送)
                        var localpushurl = _this.task.localpushurl;
                        if(localpushurl){
                            _this.$.get(localpushurl,function(){
                                
                            })
                        }
                        // MessageBox.alert('返回桌面，打开应用');
                        _this.$.get(ios11openAppUrl);
                    }else{
                        if(data.data == -51){
                           MessageBox.alert("广告标识符修改过，请放弃任务，重新登录", '系统提示');
                        }else if(data.data == -50){
                           MessageBox.alert("数据错误", '系统提示');
                        }else if(data.data == -100){
                           MessageBox.alert("网络超时", '系统提示');
                        }else{
                           MessageBox.alert('数据错误'+data.data, '系统提示');
                        }
                    }
                },"json");
            }

            
        },
        copy_word(){
            this.$copynewkeyword(this.task.app.keyword)
            .then(()=>{
               MessageBox.confirm('复制成功，是否现在去Appstore搜索')
               .then(()=>{
                   this.go_search()
               })
            })
        },
        checktaskinstall:function (installAppUrl) {
            var _this=this;
            var isInstallTimer = setInterval(function () {
                _this.$.ajax({
                    url: installAppUrl,
                    dataType: 'json',
                    type: 'get',
                    success: function (r) {
                        if (r.status == 1) {
                            clearInterval(isInstallTimer);
                            _this.cantOpen=true;
                            _this.openapptimecheck();
                        }else{
                            if(r.data == -52){
                                _this.isUntask=false;
                                clearInterval(isInstallTimer);
                                _this.sendGet("/Task/untask.html");
                               MessageBox.alert("该设备以前安装过此应用,无法完成任务.").then(action=>{
                                    _this.$router.push('/')
                            }).catch (res=>{
                                    _this.$router.push('/')
                            })
                            }
                            if(r.data == -9999){
                                _this.isUntask=false;
                                clearInterval(isInstallTimer);
                                _this.sendGet("/Task/untask.html");
                               MessageBox.alert("该设备以前安装过此应用,无法完成任务.").then(action=>{
                                    _this.$router.push('/')
                            }).catch (res=>{
                                    _this.$router.push('/')
                            })
                            }
                        }
                    }
                });
            }, 1500);
        },
        openapptimecheck:function () {
            var _this=this;
            var docheck = function () {
                _this.$.ajax({
                    url: _this.task.isOpenUrl,
                    success: function (r) {
                        if (r.status != 1) {
                            return false;
                        }
                        if(openTimer != 0){
                            clearInterval(openTimer);
                        }
                        //如果应用已经打开，三分钟后开始判断激活是否成功
                        var ac = function () {
                            _this.$.ajax({
                                url: _this.task.getOpenAppTimeUrl,
                                success: function (r) {
                                    if (r.status != 1) return false;
                                    var time = parseInt(r.data) + 180;
                                    var nowDate = new Date();
                                    var nowTime = nowDate.getTime() / 1000;
                                    var openAppTime = parseInt(time - nowTime);
                                    if (openAppTime <= 0) {
                                        if(ACTIVE_TIMER_GET != 0){
                                            clearInterval(ACTIVE_TIMER_GET);
                                        }
                                        _this.cantActive=true;
                                    } else {
                                        console.log('试玩时间未到');
                                    }
                                }
                            });
                        }
                        ac();
                        var ACTIVE_TIMER_GET = setInterval(ac, 3000);
                    }
                });
            };
            docheck();
            var openTimer = setInterval(docheck,1500);
        },
        activetask:function () {
            var _this=this;
            if(_this.cantActive==false){
                return true;
            }
            var nowDate = new Date();
            var nowTime = nowDate.getTime();
            this.$Indicator.open('正在领取奖励');
            if(!_this.task.isIos11){
                // _this.$.get(_this.consts.clientBaseurl+'/moneyopenapp?'+_this.task.boundid,{}, function (r) {});
                _this. $.ajax({
                    url: _this.task.activeAppUrl + "&t=" + nowTime,
                    success: function (data) {
                        if (data.status == 1 || data.status == -11) {
                            _this.$.ajax({
                                type: 'get',
                                url: _this.consts.clientBaseurl+'/removetimewithbundleid?bundleid='+_this.task.boundid,
                                success: function (d) {
                                },
                                dataType:"json"
                            });
                            _this.$Indicator.close()
                            MessageBox.alert("任务完成,即将返回列表", '系统提示').then(()=>{
                                _this.isUntask=false;                        
                                _this.$router.replace('/')
                            })                       
                        } else {
                            _this.$Indicator.close()
                            if(data.data == -100){
                               MessageBox.alert("网络不好，请检查网络", '系统提示');
                            }
                            if(data.data == -55){
                                if(data.error.version == 9 || data.error.version == 7){
                                   MessageBox.alert("试玩时间未到,请再去试玩", '系统提示');
                                }else{
                                    _this.isUntask=false;
                                   MessageBox.alert("试玩时间未到,请打开大虾试玩.").then(action=>{
                                        document.location.href = "daxiashiwan://";
                                }).catch (res=>{
                                        document.location.href = "daxiashiwan://";
                                })
                                }
                            }
                            var result = $.parseJSON(data.data);
                            if(result.status == 0){
                               MessageBox.alert(result.info, '系统提示');
                            }
                        }
                    },
                    dataType:"json"
                });
            }else {
                _this.$.ajax({
                    url: _this.task.activeAppUrl + "&t=" + nowTime,
                    success: function (data) {
                        if (data.status == 1 || data.status == -11 || data.status ==2) {
                            _this.$.ajax({
                                type: 'get',
                                url: _this.consts.clientBaseurl+'/removetimewithbundleid?bundleid='+_this.task.boundid,
                                success: function (d) {
                                },
                                dataType:"json"
                            });
                            if(data.status == 2){
                                _this.isUntask=false;
                                var msg = "你为非首次安装，不会获得奖励";
                                MessageBox.alert(msg).then(action=>{
                                    _this.$router.push('/')
                                }).catch (res=>{
                                   MessageBox.alert(msg, '系统提示');
                                })
                            }else{
                                _this.isUntask=false;
                                _this.$Indicator.close()
                                MessageBox.alert("任务完成,领奖成功,即将返回列表", '系统提示');
                                setTimeout(function () {
                                    _this.$router.push('/')
                                },1500);
                            }
                        } else {
                            _this.$Indicator.close()
                            if(data.data == -100){
                               MessageBox.alert("网络不好，请检查网络", '系统提示');
                            }
                            if(data.data == -55){
                                if(data.error.version == 9 || data.error.version == 7){
                                   MessageBox.alert("试玩时间未到,请再去试玩", '系统提示');
                                }else{
                                    _this.isUntask=false;
                                   MessageBox.alert("试玩时间未到,请打开大虾试玩.").then(action=>{
                                        document.location.href = "daxiashiwan://";
                                }).catch (res=>{
                                        document.location.href = "daxiashiwan://";
                                })
                                }
                            }
                            var result = $.parseJSON(data.data);
                            if(result.status == 0){
                               MessageBox.alert(result.info, '系统提示');
                            }
                        }
                    },
                    dataType:"json"
                });
            }
        },
        checkIos11taskinstall: function (installAppUrl) {
            var _this=this;
            var localpushurl = this.task.localpushurl;
            var openUrl =  this.task.openUrl;
            _this.$.ajax({
                url: installAppUrl,
                dataType: 'json',
                type: 'get',
                cache:false,
                success: function (r) {
                      var str = JSON.stringify(r);
                    if (r.data == true) {
                        _this.$.get(openUrl,function(data){                           
                            if(data.status == 1){                                  
                                //doMessageBox.alert('返回桌面，打开应用');
                                if(localpushurl){
                                    _this.$.get(localpushurl,function(){
                                        
                                    })
                                }
                                _this.ios11openapptimecheck();
                            }else{
                                if(data.data == -51){
                                    MessageBox.alert('广告标识符修改过，请放弃任务，重新登录');
                                }else if(data.data == -50){
                                    MessageBox.alert('数据错误');
                                }else if(data.data == -100){
                                    MessageBox.alert('网络超时');
                                }else{
                                    MessageBox.alert('数据错误'+data.data);
                                }
                            }
                        })

                    }else{
                        MessageBox.alert('APP未安装，请先安装APP');
                    }
                },
                error: function (err) {
                    console.log(JSON.stringify(err))
                }
            });
        },
        ios11openapptimecheck: function () {
            //如果应用已经打开，三分钟后开始判断激活是否成功
            var _this = this;
            var ac = function () {
                _this.$.ajax({
                    url: _this.task.getOpenAppTimeUrl,
                    success: function (r) {
                        if (r.status != true) return false;
                        var time = parseInt(r.data) + 180;
                        var nowDate = new Date();
                        var nowTime = nowDate.getTime() / 1000;
                        var openAppTime = parseInt(time - nowTime);
                        if (openAppTime <= 0) {
                            if(ACTIVE_TIMER_GET != 0){
                                clearInterval(ACTIVE_TIMER_GET);
                            }
                            _this.cantActive=true;
                        } else {
                            console.log('试玩时间未到');
                        }
                    }
                });
            }
            var ACTIVE_TIMER_GET = setInterval(ac, 3000);
        },
        //倒计时
        countdown(){
            let timer = setInterval(()=>{
                var time = this.time;
                var miao = time.miao;
                var fen = time.fen;
                if(miao==0){
                    miao = 60;
                    fen = fen-1;
                }else if(fen<0){
                    this.sendGet("/Task/untask.html")
                    time.fen='0',
                    time.miao='00'
                    this.time = time; 
                    clearInterval(timer)  
                   MessageBox.alert('任务时间已结束').then(()=>{
                        this.$router.push('/')           
                    })                                                   
                }else{
                    miao = miao-1
                }
                time.fen = fen;
                time.miao =miao;
                this.time = time; 
            },1000)  
        }
    },
    computed: {

    },
}
</script>

<style scoped>
.task_wrap{
    width:25.36rem;
    height:5.86rem;
    background:rgba(249,250,252,1);
    border-radius:0.29rem;
    margin: 1rem auto 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    box-sizing: border-box;
}
.task_wrap .left_msg{
    display: flex;
    align-items: center;
    font-size: 1.142rem
}
.task_wrap .left_msg img{
    width: 3.71rem;
    height: 3.71rem;
    margin-right: 1rem;
    border-radius: 0.4rem
}
.task_wrap .right_msg p{
    color: #F24C4C
}
.task_wrap .right_msg i{
    font-size: 1rem;
}
.task_wrap .right_msg span{
    font-size: 0.86rem;
}
.task_wrap .right_msg .value{
    font-size: 1.71rem;
    font-weight: 600;
    font-family: 'dx'
}
.nav{
    padding: 0 1rem;
    width: 25rem;
    height: 3.5rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 0.08rem solid #F1F1F1
}
.nav .left_word{
    font-size: 1.14rem;
}
.nav .right_word{
    font-size: 0.71rem;
    display: flex;
    align-items: center;
}
.nav .right_word i{
    display: flex;
    justify-content:center;
    align-items: center;
    border: 1px solid rgba(255,176,34,1);
    border-radius: 4px;
    width: 1.571rem;
    height: 1.428rem;
    margin: 0 0.4rem;
    font-size: 0.857rem;
    font-family: 'dx'
}
.task_step{
    padding: 1rem 1.2rem 0 2rem;
    font-size:1.07rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:1.79rem;
}
.task_step div{
    display: flex
}
.task_step .bold{
    color: #F24C4C!important
}
.map_wrap{
    width: 9rem;
    height:4.29rem;
    background:rgba(249,250,252,1);
    border:0.11rem dashed rgba(234,234,234,1);
    font-size:1.57rem;
    margin: 2rem auto 0;
    font-family: 'dx';
    text-align: center;
}
.copy_word{
    font-size:0.86rem;
    color:rgba(159,168,183,1);
    margin-top: 1rem ;
    margin-bottom: 2rem;
    text-align: center;
}
.btn{
    width:17.5rem;
    height:3.14rem;
    background:rgba(48,152,255,1);
    color: white;
    border-radius:1.57rem;
    margin: 1rem auto 0;
    font-family: 'dx'
}
.red{
    background: red
}
.cantOpen{
    background: #D1D7E2;
}
.cantActive{
    background: #D1D7E2;
}
.placeholder_div{
    width: 100%;
    height: 3rem;
}
</style>

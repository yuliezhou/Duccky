<template>
<div>
   <app-header :title = "'回调任务'"></app-header>
    <div class="task_wrap">
            <div class="left_msg">
                <img :src="task.appios.icon">
                <span>{{task.appios.name}}</span>
            </div>
            <div class="right_msg">
                <p><i>+</i><span class="value">{{task.taskmain.price_tuser}}</span><span>元</span></p>  
            </div>
    </div>
    <div class="nav">
        <p class="left_word">任务步骤</p>
        <!-- <p class="right_word" >倒计时:<i>{{time.fen}}</i>分<i>{{time.miao}}</i>秒</p> -->
    </div>

    <div class="task_step">
       <div v-for="(item,index) in task.template" :key="index">{{item.key}}<p v-html="item.value"></p></div>
    </div>
    <div v-if="task.keywords.keyword" v-cloak>
        <div class="map_wrap flex_jus_ali" @click="copy_word">{{task.keywords.keyword}}</div>
        <p class="copy_word">复制搜索关键词，<span style="color: red">AppStore排名约：第{{task.keywords.ranking}}位</span></p>

        <div @click="go_search" class='btn flex_jus_ali'>去AppStore搜索</div>
    </div>
    <div v-else>
        <!--<div class="map_wrap flex_jus_ali" >{{task.app.keyword}}</div>-->
        <!--<p class="copy_word">复制搜索关键词</p>-->
        <div @click="go_search" class='btn flex_jus_ali'>去AppStore下载</div>
    </div>
    <!-- 底部按钮 -->

    <div @click="open_app" class='btn flex_jus_ali' :class="[ cantOpen?'': 'cantOpen' ]">打开app</div>
    <div @click="activetask" class='btn flex_jus_ali red last' :class="[ cantActive?'': 'cantActive' ]">提交审核</div>
    <div class="placeholder_div"></div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App',
    data(){
        return {
            task:{appios:{},taskmain:{},keywords:{}},
            configtask:{},
            cantOpen:false,
            cantActive:false,
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
         this.sendGet("/Ctask/callbackdetail?taskid="+taskid)
         .then((res)=>{
            console.log(res)
            var task = res.data.data;
            if(res.data.status!=1){
                this.$router.push('/CallbackList')
                return;
            }
            this.task = task;

            if(!this.task.isIos11){
                //是否为PC测试
                if(this.PcVersion){
                    console.log('PCVersion')
                    return
                }

                this.$checktaskinstall(this.task.installAppUrl)             //检查app是否安装
                .then((res)=>{
                    if(res == 1){
                        this.cantOpen = true;
                    }else if(res==-52||res==-9999){
                       MessageBox.alert("该设备以前安装过此应用,无法完成任务.").then(action=>{
                            this.$router.push('/')
                        }).catch (res=>{
                            this.$router.push('/')
                        })       
                    }
                })
            }
         })
    },
    updated(){
        this.$Indicator.close()             //关闭loading弹窗
    },
    methods:{
        go_search(){
            if(this.task.isIos11){
                this.cantOpen=true;
            }
            if(this.task.keywords.keyword.length>0){
                window.location.href ='https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?media=software&country=CN&mt=8&term=';
            }else {
                window.location.href = this.task.appios.appstore_url;
            }

        },
            //复制关键词
        copy_word(){
            this.$copynewkeyword(this.task.keywords.keyword)
            .then(()=>{
               MessageBox.confirm('复制成功，是否现在去Appstore搜索')
               .then(()=>{
                   this.go_search()
               })
            })
        },
        open_app(){
            var _this=this;
            if(_this.cantOpen==false){
                return;
            }
            var openAppUrl=_this.task.openUrl;
            var installAppUrl=_this.task.installAppUrl;
            if(_this.task.isIos11){
                this.checkIos11taskOpen(openAppUrl)
            }else {
                //检测是否安装
                _this.$.get(installAppUrl,function(data){
                    if(data.status == 1){
                        _this.$.get(openAppUrl);
                        _this.sendGet("/Ctask/callbackopen?taskid="+_this.task.taskmain.id)
                        .then((res)=>{                       
                            if(res.data.status==0){
                                MessageBox.alert(res.data.info, '系统提示');
                            }else if(res.data.status==1){
                                _this.cantActive=true;
                        }
                    })
                    }else{                 
                       MessageBox.alert("APP未安装，请先安装APP", '系统提示');
                    }
                },"json");
            }
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
        //提交审核
        activetask:function () {
            var _this=this;
            if(_this.cantActive==false){
                return true;
            }
           MessageBox.alert('回调任务已提交审核，后续会自动发放奖励到账户')
            .then(()=>{
                this.$router.push('./CallbackList')
            })
        },

        checkIos11taskinstall: function (installAppUrl) {
            var _this=this;
            _this.$.ajax({
                url: installAppUrl,
                dataType: 'json',
                type: 'get',
                cache:false,
                success: function (r) {
                    if (r.data == true) {
                        $.get(node.data("href"),function(data){
                            if(data.status == 1){
                                //doMessageBox.alert('返回桌面，打开应用');
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
                        });

                    }else{
                        MessageBox.alert('APP未安装，请先安装APP');
                    }
                },
                error: function (err) {
                    console.log(JSON.stringify(err))
                }
            });
        },
        //IOS11打开任务
        checkIos11taskOpen: function (openUrl) {
            return new Promise((resolve,reject)=>{
                var _this=this;
                this.$checkIos11Open(openUrl)
                .then((res=>{
                    if(res==true){
                        _this.sendGet("/Ctask/callbackopen?taskid="+this.task.taskmain.id)
                        .then((res)=>{
                            if(res.data.status==0){
                                MessageBox.alert(res.data.info, '系统提示');
                                resolve()
                            }else if(res.data.status==1){
                                _this.cantActive=true;
                                resolve()
                            }
                        })
                    }else{
                        resolve()
                        MessageBox.alert('APP未安装，请先安装APP');       
                    }
                }))  
            })
        },
        ios11openapptimecheck: function () {
            //如果应用已经打开，三分钟后开始判断激活是否成功
            var _this=this;
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
            ac();
            var ACTIVE_TIMER_GET = setInterval(ac, 3000);
        },

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
    width:7.43rem;
    height:4.29rem;
    background:rgba(249,250,252,1);
    border:0.11rem dashed rgba(234,234,234,1);
    font-size:1.57rem;
    margin: 2rem auto 0;
    font-family: 'dx'
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

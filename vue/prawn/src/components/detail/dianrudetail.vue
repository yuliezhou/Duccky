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
<!--     <div class="nav">
        <p class="left_word">任务步骤</p>
        <p class="right_word" >倒计时:<i>{{time.fen}}</i>分<i>{{time.miao}}</i>秒</p>
    </div> -->

    <div class="task_step">
       <div v-for="(item,index) in task.template" :key="index">{{item.key}}<p v-html="item.value"></p></div>
    </div>
    <div v-if="task.app.keyword" v-cloak>
        <div class="map_wrap flex_jus_ali"  @click='copy_word'>{{task.app.keyword}}</div>
        <p class="copy_word">复制搜索关键词，<span style="color: red">AppStore排名约：第{{task.app.ranking}}位</span></p>

        <div @click="go_search" class='btn flex_jus_ali'>去AppStore搜索</div>
    </div>
    <div v-else>
        <div class="map_wrap flex_jus_ali" >{{task.app.keyword}}</div>
        <p class="copy_word">复制搜索关键词</p>
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
        next();
    },
    mounted(){
        this.init();
    },
    methods:{
        init:function(){
            var _this = this;
            var adid = this.$route.query.adid;
            this.sendGet("/Uniontask/fastdianruapidetail?adid="+adid).then(function (response) {
                    var resole = response.data;
                    if(resole.status == 1){
                        if(resole.data == 1){
                            MessageBox.alert("您已做过该任务！");
                           _this.$router.push('./') 
                        }
                    }
            })
        }
    },
    computed:{
            test2:function(){
                alert(2);
            }
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

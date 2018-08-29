<template>
<div>
    <app-header :title = "'提现'"></app-header>
    <div class="balance_wrap flex_column">
        <i>我的余额</i>
        <p><span>￥</span>{{info.balance}}</p>
    </div>

    <div class="btn flex_jus_ali" @click="go_wechat">微信提现</div>
    <div class="btn white_bac flex_jus_ali" @click="go_Account">账户明细</div>

    <div class="shade" v-if="show_pop"></div>   
    <div class="pop" v-if="show_pop">
         <img class="cancel" src="./img/cancel.png" @click="close_pop">
         <img class="pig" src="./img/pig.png">
         <p class="time_tips">已有一笔{{price}}元提现正在进行中，预计{{time}}到账</p>
         <div class="btn2 flex_jus_ali"  @click="close_pop">我知道了</div>
         <i class="tips">注: 提现到账后，才能提第二笔</i>
    </div> 
   
</div>    
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App',
    
    data(){
        return {
            info:{},
            userid:'',
            show_pop:false,
            price:0,
            time:""
        }
    },
    mounted(){
        this.$Indicator.open('加载中')        //loading弹窗
        this.sendGet("/cash/index.html")
        .then((res)=>{
            this.info = res.data.data;
        })
    },
    updated() {
        this.$Indicator.close();
    },
    methods:({
        go_wechat(){
            this.sendGet("/cash/wxpay.html")
            .then((res)=>{
                    var resole = res.data;
                    if(resole.status == -1){
                        //正在提现中
                        this.price = resole.data.money;
                            this.time = resole.data.dotime;
                        this.show_pop=true;
                        return false;
                    }else if(resole.status == -2){
                        //未绑定微信
                                        if (confirm("您没有绑定微信，确定绑定微信？")) { 
                                    var _this = this;
                                    var getwxurl = this.consts.clientBaseurl + "/getWXdic?";
                                    var openWx = false;
                                        var getWeiXinTimer = setInterval(()=>{
                                        this.$.ajax({
                                            url: getwxurl,
                                            dataType: 'json',
                                            type: 'get',
                                            success: function (r) {
                                                if (r.status != 1){
                                                    if(r.data == -101){
                                                        if(!openWx){
                                                            openWx = true;
                                                            document.location.href="daxiashiwan://openWeiXin?"
                                                            // if(developfrom == "redenvelopes"){
                                                            //     document.location.href="redEnvelopes://openWeiXin?"
                                                            // }else{
                                                            //     document.location.href="moneymaster://openWeiXin?"
                                                            // }
                                                        }
                                                        return;
                                                    }else{
                                                        if(r.msg == "wx expire"){
                                                            // lmmodal.tip("请从新绑定");
                                                        }else{
                                                            //lmmodal.tip(r.msg);
                                                            clearInterval(getWeiXinTimer);
                                                        }
                                                    }
                                                }else{
                                                    clearInterval(getWeiXinTimer);
                                                    var postdata = {};
                                                    postdata.avatar = r.data.icon;
                                                    postdata.name = r.data.username;
                                                    postdata.wxid = r.data.unionId;
                                                        _this.sendPost("/User/savewx.html",postdata)
                                                        .then((res)=>{
                                                            var resole= res.data;
                                                            if(resole.status == 1){
                                                                //lmmodal.tip(data.info);
                                                                setTimeout(function () {
                                                                    document.location.reload();
                                                                },1000);
                                                            }else{
                                                                MessageBox.alert(resole.info);
                                                            }
                                                        })
                                                }

                                            }
                                        });
                                        }, 1500);
                                                
                                        }else { 
                                                
                                            } 
                    }else if(resole.status == -3){
                        //未绑定微信公众号
                        this.$router.push({path:'./wechat_bind',query:{userid:this.info.userid}})
                    }else if (resole.status == -4){
                        MessageBox.confirm(resole.info)
                                .then(res => {
                            this.$router.push('./phoneBind')
                    })
                    .catch(res=>{

                        console.log('error')
                    })
                    }else{
                        this.$router.push('./wechat_withdraw')
                    }
            })
                
        },
        go_Account(){
            this.$router.push('./Account_detail')
        },
        //关闭弹窗
        close_pop(){
            this.show_pop=false
        }
    })
}
</script>

<style scoped>
.balance_wrap {
    margin-top: 5.5rem;
    margin-bottom: 4rem;
}
.balance_wrap i{
    font-size:1rem;
    color:rgba(63,69,82,1);
    margin-bottom: 1rem
}
.balance_wrap p{
    color: #3F4552;
    font-size:3.43rem;
    font-weight: 600;
    font-family: 'dx'
}
.balance_wrap span{
    font-size:2.57rem;
    color: #3F4552;
}
.btn{
    width:17.5rem;
    height:3.14rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;
    color: white;
    font-size:1.07rem;
    margin: 0 auto;
}
.white_bac{
    border: 0.08rem solid rgba(48,152,255,1);
    color: rgba(48,152,255,1);
    background: white!important;
    margin-top: 2rem;
}
.shade{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
}
.pop{
    padding-top: 1.6rem;
    width:17.64rem;
    height:21.07rem;
    background:rgba(255,255,255,1);
    border-radius:0.43rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 210!important;
    top: 21%;
    left: 50%;
    margin-left: -8.82rem;
    position: relative;
    position: fixed;
}
.pop .cancel{
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    padding: 0.2rem;
}
.pop .pig{
    width: 8.5rem;
    height: 7.9rem;
}
.time_tips{
    width: 13.35rem;
    margin-top: 1.5rem;
    font-size: 1.05rem;
    line-height: 1.3rem
}
.btn2{
    width:12.14rem;
    height:2.71rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;
    color: white;
    font-size: 1.07rem;
    margin-top: 1.7rem;
}
.tips{
    font-size:0.93rem;
    color:rgba(159,168,183,1);
    margin-top: 1.5rem;
}
</style>

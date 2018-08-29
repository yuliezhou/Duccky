<template>
<div>
    <app-header :title = "'微信绑定'"></app-header>
    <div class="step1">
        <img class="head_banner" src="./img/head_banner.png">
        <i class="title">步骤一</i>
        <p class="tips1">
        长按保存二维码，在微信扫一扫二维码关注公众号，或微信搜索“大虾试玩”
        </p>

        <img class="qr_code" src="./img/qr_code.png">
    </div>
    <div class="step1 mt20">
        <img class="head_banner" src="./img/head_banner.png">
        <i class="title">步骤二</i>
        <p class="tips1">
            关注成功后，在微信公众号回复“大虾{{replay_msg}}”，验证账户
        </p>
        <div class="step2Img">
            <p class="step2word">大虾{{replay_msg}}</p>
        </div>
    </div>  

    <div class="btn flex_jus_ali" @click="checkUser">验证账户</div>
    <div class="placeholder"></div>
</div>    
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App',
    data(){
    return {
        qr_code:'',
        replay_msg:''  //微信公众号需回复的内容
    }
    },
    mounted(){
        this.replay_msg = this.$route.query.userid;
    },
    methods:{
        checkUser(){
            this.sendGet("/cash/authbindwx.html")
            .then((res)=>{
                var info = res.data;
                if(info.status == 1){
                    alert("绑定成功！");
                    this.$router.push('./withdraw')
                }else{
                     alert(info.info);
                }
            })
        }
    }

}
</script>

<style scoped>
.step1{
    width:23.9rem;
    background:rgba(249,250,252,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 1rem 1.05rem;
    margin: 1rem auto 0;
    box-sizing: border-box
}
.title{
    position: absolute;
    top: 1.5rem;
    left: 1rem;
    color: #3098FF;
    font-size: 1.05rem;
    font-weight: 600;
}
.head_banner{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.26rem;
}
.tips1{
    margin-top: 3.3rem;
    font-size: 1.05rem;
    text-indent: -0.3em;
    line-height: 1.8rem;
}
.qr_code{
    width: 10rem;
    height: 10rem;
    margin-top: 0.7rem
}
.step2Img{
    width: 100%;
    height: 3rem;
    margin-top: 1.6rem;
    background: url('./img/input.png');
    background-size: 100% 100%
}
.step2word{
    position: absolute;
    bottom: 1.9rem;
    left: 7.2rem;
    font-size: 1.1rem
}
.mt20{
    margin-top: 1.8rem
}
.btn{
  width:22.5rem;
    height:3.14rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;  
    color: white;
    margin: 1.9rem auto;
    font-size: 1.14rem;
}
.placeholder{
    width: 100%;
    height: 2rem;
}
</style>

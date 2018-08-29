<template>
<div>
    <app-header :title = "'提现失败'"></app-header>
    <div class="balance_wrap flex_column">
    </div>
    <div class="img-center">
        <img class="fail" src="./img/fail.png">
        <span class="text-fail">提现失败</span>
    </div>
    <div class="btn flex_jus_ali" @click="go_home">重试</div>

</div>    
</template>

<script>
export default {
    name: 'App',
  
    data(){
        return {
        }
    },
    mounted(){
    },
    methods: {
        go_home: function(){
            this.$router.replace('/wechat_withdraw')
        }
    }
}
</script>

<style scoped>
.balance_wrap {
    margin-top: 2.5rem;
    margin-bottom: 3rem;
}
.balance_wrap i{
    font-size:1rem;
    color:rgba(63,69,82,1);
    margin-bottom: 1rem
}
.balance_wrap p{
    color: #3F4552;
    font-size:3.43rem;
    font-weight: 600
}
.balance_wrap span{
    font-size:2.57rem;
    color: #3F4552;
}
.btn{
    width:12.14rem;
    height:2.71rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;
    color: white;
    margin: 0 auto;
    margin-top: 1.7rem;;
}
.text-fail{
    width: 5.21rem;
    height: 1.78;
    font-weight: bold;
    font-size: 1.28rem;
    color: #F24C4C;
    margin-top: 1.7rem;
}
.text-date{
   color: #9FA8B7;
   margin-top: 1.7rem;
   font-size: 1.07rem;
   font-weight: bold;
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
.fail{
   width: 8.55rem;
   height: 8.26rem;
   margin: auto;
}
.img-center{
   display: flex;
   flex-direction: column;
   align-items: center;
}
</style>

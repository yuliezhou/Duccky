<template>
<div class="wrap">
    <div class="head"></div>

    <div class="content">
        <div class="tips1"><span class="grey">下载安装：</span><i class="blue">大虾试玩</i></div>
        <div class="btn flex_jus_ali" @click="install()">立即安装</div>
    </div>
    <img class="bottom_arrow" src="./img/bottom_arrow.png">
    <div class="content">
        <span class="grey">安装完成以后，请点击 去信任 在描述文件中找到“大虾试玩”并信任</span>
        <!-- <i class="tips2">设置<img class="b_arr" src="./img/blue_arrow.png">通用<img class="b_arr" src="./img/blue_arrow.png">描述文件<img class="b_arr" src="./img/blue_arrow.png">信任</i> -->
        <img class="believe" src="./img/step2.jpg">
        <div class="flex_jus_ali" :class="[ show?'btn': 'btn2' ]" @click="shezhi()">去信任</div>
    </div>
    <img class="bottom_arrow" src="./img/bottom_arrow_grey.png" >
    <div class="content mb15">
        <div class="tips1"><i class="blue">成功信任后</i></div>
        <div class="flex_jus_ali" @click="open()" :class="[ show?'btn': 'btn2' ]">打开大虾试玩</div>
    </div>
</div>    
</template>

<script>
export default{

    data(){
        return {
            show:false
        }
    },
    methods:{
        install(){
            location.href='itms-services://?action=download-manifest&url=https://oi7tiikk9.qnssl.com/bjmoneymaster_2.1.3_aaa.plist';
            this.show=true;
        },
        open(){
            location.href='daxiashiwan://';
        },
        shezhi(){
            location.href='http://dxshiwan.oss-cn-hangzhou.aliyuncs.com/dx/dxsw.mobileprovision';
        }
    }
}    
</script>

<style scoped>
.b_arr{
    width: 0.5rem;
    height: 0.7rem;
    margin: 0 0.4rem;
}
.wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #EEEEEE;
    width: 100%;
}
.head{
    background: url('./img/head_bac.png');
    background-size: 100% 100%;
    width: 100%;
    height: 7.8rem;
    margin-bottom: 1rem;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    width:23.21rem;
    background:rgba(255,255,255,1);
    border-radius:0.57rem;    
    padding-top: 1.7rem;
}
.tips1{
    margin-bottom: 1rem;
}
.tips2{
    color: #3098FF;
    font-weight: 600;
    margin: 0.68rem 0 1rem
}
.tips1 span{
   color: #AAAAAA
}
.grey{
    color: #AAAAAA;
    font-size: 1.1rem;
    text-align: center;
    width: 80%;
    margin-bottom: 1.1rem
}
.tips1 i{
    color: #3098FF
}
.btn{
    width:16.79rem;
    height:2.71rem;
    background:rgba(48,152,255,1);
    border-radius:1.36rem;
    color: white;
    margin-bottom: 1rem
}
.btn2{
    width:16.79rem;
    height:2.71rem;
    background:rgba(209,215,226,1);
    border-radius:1.36rem;
    color: white;
    margin-bottom: 1rem
}
.bottom_arrow{
    width: 1.5rem;
    height: 1.3rem;
    display: inline-block;
    margin: 0.7rem 0;
}
.believe{
    display: inline-block;
    height: 14.55rem;
    margin-bottom: 1rem;
}
.mb15{
    margin-bottom: 1.5rem
}
</style>

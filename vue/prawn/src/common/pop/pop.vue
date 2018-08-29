<template>
<div>

    <div v-if="show" class="shade"></div>
    <div v-if="show" class="pop">
        <!-- <img class="cencel" @click="cancel" src="./img/cancel.png" > -->
        <img class="san" src="./img/bac.png">
        <p class="tips1">您的助手未开启</p>
        <div class="start_up flex_jus_ali" @click="open()">开启助手</div>
        <p class="tips2"><i>无法启动请<span @click="down()">重新下载助手</span></i></p>
    </div>

</div>    
</template>

<script>
export default{
    data(){
        return {
            show:true
        }
    },
    methods:{
        cancel(){
            this.show=false
        },
        open(){
            location.href='daxiashiwan://';
        },
        down(){
            window.location.href='/install'
        }
    }

}

</script>

<style scoped>
.shade{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
}
.pop{
    width:17.64rem;
    height:20.57rem;
    background:rgba(255,255,255,1);
    border-radius:0.43rem;
    position: fixed;
    top: 30%;
    left: 50%;
    margin-left: -8.82rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 201;
}
.cencel{
    position: absolute;
    width: 1.1rem;
    height: 1.1rem;
    right: 0.8rem;
    top: 0.7rem;
}
.san{
    width: 7rem;
    height: 7rem;
    margin-top: 1.8rem
}
.tips1{
    font-size: 1.1rem;
    color: #333333;
    margin-top: 1.4rem;
}
.start_up{
    width:12.14rem;
    height:2.71rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;
    color: white;
    font-size: 1.1rem;
    margin-top: 2rem;
}
.tips2{
    margin-top: 1.5rem;
}
.tips2 i{
    color: #9FA8B7;
    font-size: 1rem;
}
.tips2 span{
    color:rgba(48,152,255,1);
    text-decoration: underline;
}
</style>

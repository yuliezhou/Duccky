<template>
    <div class="detail_head" >
        <img src="./img/back.png" @click="back">
        <p>{{title}}</p>
        <p class="placeholder"></p>
    </div>  
</template>

<script>
export default {
    props:["title"],
    data(){
        return {
         
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    }

}
</script>
<style>
.detail_head{
    width: 100%;
    height: 3rem;
    background: url(img/header_bac.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  0 0.8rem;
    box-sizing: border-box;
    color: white;
    font-size: 1.21rem;
}
.detail_head img{
    width: 0.8rem;
    height: 1.2rem;
    padding: 0.5rem 0.6rem 0.5rem 0.2rem;
}
.placeholder{
    width: 0.8rem;
    height: 1.2rem;
}
</style>

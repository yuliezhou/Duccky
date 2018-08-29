<template>
<div class="all_wrap" v-if="show">
    <div class="box">
        <div class="loader-03"></div>
        <p class='content'>{{content}}</p>
    </div>
</div>   
</template>

<script>
 export default{
    data(){
        return {
            show:true,
            content:'加载中',
        }
    },

 }
 
</script>


<style scoped>
.all_wrap{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
}
.content{
    font-size: 1.3rem;
    margin-top: 1.6rem;
}
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 24%;
    height: 17vh;
    border: 1px solid currentcolor;
    border-radius: 6px;
    font-size: 2.14rem;
    color: white;
    padding-top: 1.2rem;
    margin-bottom: .25em;
    vertical-align: top;
    -webkit-transition: .3s color, .3s border;
    transition: .3s color, .3s border;
    box-sizing: border-box;
    background: rgba(51,51,51,0.7);
}
[class*="loader-"] {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    vertical-align: middle;
    pointer-events: none;
}

.loader-03 {
    border: .12em solid currentcolor;
    border-bottom-color: transparent;
    border-radius: 50%;
    -webkit-animation: 1s loader-03 linear infinite;
    animation: 1s loader-03 linear infinite;
    position: relative;
}

@keyframes loader-03 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>

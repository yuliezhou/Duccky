<template>
<div>
    <app-header :title = "'链接收徒'"></app-header>
    <div class="content flex_jus_ali">
        <p class="link_wrap">{{url}}</p>
    </div>
    <div class="btn flex_jus_ali" @click="copyLink">
        点击复制链接
    </div>
</div>    
</template>

<script>
    import { Toast } from 'mint-ui';
export default{
    data(){
        return {
        url:''
        }
    },
    mounted(){
        this.sendGet("/User/inviteQr.html?type=link")
                .then((res)=>{
            this.url = res.data.data;
        console.log(res)
    })
    },
    methods:{
        copyLink(){
            this.$copynewkeyword(encodeURIComponent(this.url)).then(()=>{
                Toast({
                    message: '复制成功，快去分享吧!',
                    position: 'middle',
                    duration: 2000
                });
            })
        }

    }
  

}

</script>

<style scoped>
.content{
    width:21.79rem;
    height:6.93rem;
    background:rgba(249,250,252,1);
    border:0.07rem dashed rgba(225,229,237,1);
    margin: 3rem auto 0;
    font-size: 1.21rem
}
.btn{
    width:21.79rem;
    height:3.14rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;
    color: white;
    margin: 2rem auto 0
}
.link_wrap{
    width: 18.57rem;
    white-space: break-word;
    word-break: break-all;
    line-height: 1.8rem
}
</style>

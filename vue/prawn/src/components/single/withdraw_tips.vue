<template>
<div>
    <app-header :title = "title"></app-header>
    <div class="content">
        <p v-html="content"></p>
    </div>
</div>
</template>

<script>
export default{
    data(){
    return {      
        title:'提现详情',
        content:''     
        }
    },
    mounted(){
        this.sendGet("/Index/notice")
        .then((res)=>{
          var info = res.data;
            if(info.status == 1){
                this.title = info.data.title;
                this.content = info.data.msg;
            }else{
               this.$router.replace('/')
            }
            console.log(this.content);
        })
    },
    methods: {

    },


}
</script>
<style scoped>
.content {
    text-indent: 1.6rem;
    padding: .5rem;
}
.content  p {
    font-size: 16px;
    line-height: 26px;
    color: #000000;
}
</style>
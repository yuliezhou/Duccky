<template>
<div>
    <app-header :title = "title"></app-header>
    <div class="content">
        <p v-html="content"></p>
    </div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default{
      data(){
        return {      
            title:'',
            content:''     
          }
      },
    mounted(){
        var q = this.$route.query.q;
        this.sendGet("/Index/detail.html?q="+q)
        .then((res)=>{
          var info = res.data;
            if(info.status == 1){
                this.title = info.data.title;
                this.content = info.data.content;
            }else{
                MessageBox.alert(info.info);
            }
            console.log(this.pageInfo);
        })
    },
    methods: {
        go_task: function(p){
            MessageBox.alert(p);
        }
    },
    beforeRouteLeave(to,from,next){
        //MessageBox.alert(1);
        console.log(to);
        to.meta.keepAlive = false;
        next();
    }

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
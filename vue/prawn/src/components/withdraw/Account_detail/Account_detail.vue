<template>
<div>
  <app-header :title = "'账户明细'"></app-header>
   <div class="Account_list">
       <div class="item flex_between" :key="index" v-for="(item, index) in itemList">
           <div class="left_msg">
               <p>{{ item.description }}</p>
               <i>{{ item.time }}</i>
           </div>
           <div class="right_msg">
              <p><i v-if="item.stj == 1">+</i><i v-else-if="item.stj == 0">-</i>{{ item.money }}<span>元</span></p>
           </div>
       </div>
<!--        <div class="item flex_between">
           <div class="left_msg">
               <p>限时任务</p>
               <i>2017-06-03 12:30</i>
           </div>
           <div class="right_msg">
              <p><i>+</i>0.80<span>元</span></p>
           </div>
       </div>  -->      
   </div>

   <p class="more tc_center" @click="findMore">查看更多</p>
</div>    
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return {      
            pageInfo:{          
            next:0,
            now:0,
            pre:0,
            total:0
            },
            itemList:{}     
        }
    },
    mounted(){      
        this.$Indicator.open('加载中')        //loading弹窗
        this.sendGet("/User/rechargelist.html")
        .then((res)=>{
            console.log(res)
        var info = res.data;
            if(info.status == 1){
                if(info.data.childList != ''){
                this.itemList = info.data.childList;
                this.pageInfo.next = info.data.childPage.next;
                this.pageInfo.now = info.data.childPage.now;
                this.pageInfo.pre = info.data.childPage.pre;
                this.pageInfo.total = info.data.childPage.total;
                }
            }
            console.log(this.pageInfo);
        })
    },
    updated(){
        this.$Indicator.close()
    },
    methods:{
        findMore(){
            if(this.pageInfo.total == this.pageInfo.now){
                MessageBox.alert("没有啦！");
                return false;
            }
                this.sendGet("/User/rechargelist.html?page="+this.pageInfo.next)
                .then((res)=>{
                var info = res.data;
                    if(info.status == 1){
                        if(info.data.childList != ''){
                        this.itemList = info.data.childList;
                        this.pageInfo.next = info.data.childPage.next;
                        this.pageInfo.now = info.data.childPage.now;
                        this.pageInfo.pre = info.data.childPage.pre;
                        this.pageInfo.total = info.data.childPage.total;
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                        }
                    }
                    console.log(this.pageInfo);
                })
        }
    }
}


</script>

<style scoped>
.Account_list{
    padding: 1rem;
}
.item{
    padding: 1.2rem 0;
    border-bottom: 0.08rem solid #F1F1F1
}
.left_msg{
    display: flex;
    flex-direction: column
}
.left_msg p{
    font-size:1.14rem;
    color: #3F4552;
}
.left_msg i{
    font-size:0.86rem;
    color: #9FA8B7;
    margin-top: 0.8rem
}
.right_msg{
    color: #F24C4C;
    font-size: 1.71rem;
    font-family: 'dx'
}
.right_msg i{
    font-size: 1rem
}
.right_msg span{
    font-size: 0.86rem;
}
.more{
    color: #3098FF;
    margin-top: 1rem;
}
</style>

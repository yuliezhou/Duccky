<template>
<div>
    <app-header :title = "title"></app-header>

    <div class="wrap" v-cloak v-if="list.length > 0">
        <div class="task_item flex_between" data-item="item"  v-for="(item,index) in list" @click="go_task(item)" :key="index">
            <div class="left_msg">
                <img :src="item.icon">
                <div class="word_msg">
                    <p class="name">{{item.name}}</p>
                    <span class="surplus">剩余{{item.remain}}份</span>
                </div>
            </div>
            <div class="right_msg">
                <p v-if="item.tasking"><span class="ing">进行中</span></p>
                <p v-else><i>+</i><span class="value">{{item.tuser_price}}</span><span>元</span></p>
            </div>
        </div>
    </div>
    <div class="notask" v-else>
            <img src="./img/notask.png">
            <p>暂时没有任务</p>
    </div>    
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default{
      data(){
        return {      
            title:'评论任务', 
            list:[],
          }
      },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.sendGet("/Comment/commentlist.html")
            .then((res=>{
                console.log(res)
                var list = res.data.data;
                    this.list = list;
            }))
        },
        go_task(e){
            var taskid = e.id;
            this.sendGet("/Comment/starttask.html",{params:{taskid:taskid}})
            .then((res)=>{
                console.log(res)
                if(res.data.status==1){
                    // return
                    this.$router.push({path:'./CommentDetail',query:{taskid:taskid}})
                }else{
                    MessageBox.alert(res.data.info)
                }
            })

        },

    }
}
</script>
<style scoped>
.wrap{
    margin-top: 2rem
}
.task_item{
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
    align-items: center;
    margin-bottom: 2.14rem;
}
.task_fixed{
    padding: 0 2.5rem;    
}
.task_fixed img{
    width: 3.714rem;
    height: 3.714rem;
    border-radius: 0.5rem;
}
.task_fixed p{
    margin-top: 0.71rem
}
.task_item .left_msg{
    display: flex
}
.task_item .left_msg img{
    width: 3.714rem;
    height: 3.714rem;
    border-radius: 0.5rem
}
.task_item .left_msg .word_msg{
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #190D15;
    padding-top: 0.4rem;
}
.name{
    font-size: 1.05rem;
    width: 13.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #190D15;
}
.task_item .left_msg .word_msg .tips{
    font-size:0.79rem;
    background:rgba(249,250,252,1);
    display: inline-block;
    padding: 0.06rem 0.6rem;
    border-radius: 2px;
    color: #9FA8B7;
    line-height:1.14rem;
    margin-right: 0.4rem;
}
.task_item .right_msg p{
    color: #F24C4C
}
.task_item .right_msg i{
    font-size: 1rem;
}
.task_item .right_msg span{
    font-size: 0.86rem;
}
.task_item .right_msg .value{
    font-size: 1.71rem;
    font-weight: 600;
    font-family: 'dxb';
    font-weight: 600;
}
.fixed_tips{
    font-size:0.79rem;
    color: #9FA8B7;
}
.ing{
    font-size: 1.285rem!important;
    color: #3098FF;
    font-family:'dx';
}
.notask{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.142rem;
    color: #D9DFE8;
}
.notask img{
    transform: scale(0.7);
}
.surplus{
    font-size: 0.8rem;
    background:rgba(249,250,252,1);
    color:#9FA8B7;
    width: 4.5rem;
    padding: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
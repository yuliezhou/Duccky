<template>
    <div>
        <app-header :title = "'我的徒弟'"></app-header>
        <div class="all_wrap">
            <div class="item flex_between"  :key=index v-for="(item, index) in itemList">
                <div class="left_msg flex">
                    <img :src="item.avatar" >
                    <div class="word_msg">
                        <p>{{item.name}}</p>
                        <p class="time">{{item.reg_time}}</p>
                    </div>
                </div>
                <div class="right_msg">
                    <p><i>+</i>{{item.father_money}}<span>元</span></p>
                </div>
            </div>
        </div>
        <p class="more tc_center" @click="findMore">查看更多</p>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import md5 from '@/common/js/md5.js'
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
            this.sendGet("/User/apprenticeList.html")
                    .then((res)=>{
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
        methods:{
            findMore(){
                if(this.pageInfo.total == this.pageInfo.now){
                    MessageBox.alert("没有啦！");
                    return false;
                }
                this.sendGet("/User/apprenticeList.html?page="+this.pageInfo.next)
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
    .all_wrap{
        padding: 0 1rem;
    }
    .item{
        padding: 1.4rem 0;
        border-bottom: 0.08rem solid #F4F4F4;
        font-size: 1rem;
    }
    .left_msg img{
        width:2.6rem;
        height:2.6rem;
        border-radius: 50%;
        margin-right: 0.8rem;
    }
    .time{
        margin-top: 0.5rem;
        font-size: 0.71rem;
        color:#9FA8B7;
    }
    .right_msg{
        color: #F24C4C;
        font-size: 1.71rem;
        font-weight: 600
    }
    .right_msg i{
        font-size: 1rem
    }
    .right_msg span{
        font-size:0.86rem;
    }
    .more{
        color: #3098FF;
        margin-top: 1rem;
    }
</style>
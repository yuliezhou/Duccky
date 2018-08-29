<template>
<div>
    <app-header :title = "title"></app-header>

    <div class="Alliance_tips">
        <p class="tips_content">收益到账略有延迟，请耐心等待。少数任务可能无法获得收益，可能的原因有：</p>
        <p class="step">1. 非首次安装</p>
        <p class="step">2. 未按任务要求完成所有步骤</p>
    </div>

    <div class="wrap" v-cloak v-if="fastnowdatacul.length > 0">
        <div class="task_item flex_between" data-item="item"  v-for="(item,index) in fastnowdatacul" @click="go_task(item)" :key="index">
            <div class="left_msg">
                <img :src="item.icon">
                <div class="word_msg">
                    <p class="name">{{item.taskname}}</p>
                    <div>
                        <div class="tips" v-for="(it,index) in item.tags" :key="index" :class="it.classname">{{it.tagname}}</div>
                        <!--<div v-else class="tips">付费</div>-->
                        <!--<div class="tips">剩{{item.remaining_number}}份</div>-->
                    </div>

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
    components: {
      
    },
    data(){
    return {      
        title:'联盟任务', 
        list:[],
        fastdianrudata:[],
        fastwanpudata:[],
        }
    },
    updated(){
        this.$Indicator.close()             //关闭loading弹窗
    },
    mounted(){
        this.wanpuapitasklist();
    },
    computed:{
        fastnowdatacul:function(){
            var returndata = []; 
            //万普
            if(this.fastwanpudata.length > 0){
                for(var j = this.fastwanpudata.length -1; j >= 0; j --){
                    returndata.push(this.fastwanpudata[j]);
                }
            }
            returndata.sort(function (a,b) {
                if(a.listordertype == b.listordertype) {
                    if (a.type == "fasktask" && b.type == "fasktask") {
                        if (a.tasking == b.tasking) {
                            return parseInt(b.remain_number) - parseInt(a.remain_number);
                        } else {
                            return b.tasking - a.tasking;
                        }
                    } else {
                        return b.listordertype - a.listordertype;
                    }
                }else{
                    //处理快速任务排序
                    if(a.type == "fasktask" && b.type != "fasktask"){
                        if(parseInt(a.remain_number) == 0 ){
                            return 1;
                        }else{
                            return -1;
                        }
                    }
                    if(a.type != "fasktask" && b.type == "fasktask"){
                        if(parseInt(b.remain_number) == 0 ){
                            return -1;
                        }else{
                            return 1;
                        }
                    }
                    return b.listordertype - a.listordertype;
                }
            });
            return returndata;
        }
    },
    methods: {

        wanpuapitasklist(){
             this.$Indicator.open('加载中')  
             var _this = this;
            _this.$.get(this.consts.appinfourl).then(function (response) {
                if(response.status == 1){
                    _this.$.get(_this.consts.clientBaseurl+"/v2deviceinfo").then(function (response) {
                        if(response.status == 1){
                            var postdata ={
                                dv : response.data.dv,
                                osv : response.data.osv,
                                wifi : response.data.wifi,
                                devicename : response.data.devicename,
                                jb : response.data.jb,
                                user : response.data.user,
                                openudid : response.data.openudid,
                                ifa : response.data.ifa
                            };
                                //var postdata = {};
                            _this.sendGet("/Unionapi/waiputasklist.html",{params:postdata}).then(function (response) {
                                 _this.$Indicator.close()
                                var resole = response.data;
                                if(resole.status == 1){                                
                                    var drdata = resole.data;
                                        for (var i = 0; i < drdata.length; i++) {
                                            var additem = {};
                                            additem.taskid = drdata[i].adid;
                                            if(drdata[i].searchWord != ''){
                                                additem.taskname = "搜索'"+drdata[i].searchWord.replace(/[&\|\\\*^%$#@amp;\-]/g,"")+"'";
                                            }else{
                                                additem.taskname = drdata[i].app_name;
                                            }
                                
                                            additem.tuser_price = (drdata[i].points/100).toFixed(2);
                                            additem.tags = [];
                                            additem.tags.push({tagname:"免费",classname:"tag-yellow"});
                                            //additem.tags.push({tagname:"剩余" + drdata[i].remain + "份"});
                                            additem.remain_number = drdata[i].remain;
                                            additem.icon = drdata[i].app_icon;
                                            additem.boundid = drdata[i].identifier;
                                            additem.gourl = drdata[i].click_url;
                                            additem.type = "wanpufask";
                                            additem.listordertype = 96;
                                            _this.fastwanpudata.push(additem);
                                        }
                                }
                            })
                        }
                    })
                }
            })
        },
        go_task(e){
            switch (e.type){
                case "fasktask":
                    this.$Indicator.open('加载中')        //loading弹窗
                    var taskid = e.taskid;
                    var _this=this;
                    if(e.tasking){
                        this.$Indicator.close()
                        this.$router.push({path:'./detail',query:{taskid:taskid}})
                        return
                    }else if(this.hastasking==1){
                        MessageBox.confirm('当前有进行中的任务，确定放弃之前任务执行此任务，取消返回之前的任务')
                        .then(res => {
                             this.$Indicator.close()
                            _this.canceltask(e,_this);
                        })
                        .catch(res=>{
                             this.$Indicator.close()
                            console.log('error')
                        })
                    }else {
                        this.dostarttask(e,_this);
                    }
                    break;
                case "dianrufask":
                    this.$router.push({path:'./dianrudetail',query:{adid:taskid}})
                    break;
                case "wanpufask":
                    window.location.href = e.gourl;
                    break;

            }
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
.task_item .left_msg .word_msg .name{
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
.Alliance_tips{
    width: 90%;
    padding: 1rem;
    box-sizing: border-box;
    margin: 1rem auto;
    /* background: ghostwhite */
    border: 1px solid ghostwhite
}
.tips_content{
    font-size: 1.1rem;
    line-height: 1.8rem;

}
.step {
    color: red;
    line-height: 1.8rem;
}
</style>
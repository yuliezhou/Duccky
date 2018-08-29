<template>
<div>
<app-header :title = "'评论任务详情'"></app-header>
    <div class="task_wrap">
            <div class="left_msg">
                <img :src="task.appios.icon">
                <span>{{task.commenttask.name}}</span>
            </div>
            <div class="right_msg">
                <p><i>+</i><span class="value">{{task.commenttask.tuser_price}}</span><span>元</span></p>  
            </div>
    </div>
    <div class="nav">
        <p class="left_word">任务步骤</p>
        <p class="right_word" >倒计时:<i>{{time.fen}}</i>分<i>{{time.miao}}</i>秒</p>
    </div>
    <div class="tips">
        <div class="item">1、 下载应用，并安装使用；</div>
        <div class="item"><p>2、</p> <div class="right"><i>复制下面评论内容必含的关键词</i>，打开APP Store对应用进行评论；</div></div>
        <div class="item">3、 填写完评论后，按示例样式截图；</div>
        <div class="item">4、 <div class="right"><i>在下面评论内容，输入你评论的好评标题及内容，并上传截图凭证</i>，提交审核。</div></div>
    </div>

    <div class="comment">
        <p class="title">评论内容</p>
        <div class="content_wrap">
            <div class="content_tips" v-if="task.commenttask.keywords">
                <p>标题必含关键字</p>
                <div class="tips_icon" v-for="(item,index) in accept_word" :key="index" @click="keyword_title($event)">{{item}}</div>
            </div>
            <div class="content">
                <input type="text" v-model="title" :disabled="cantChange" >
                <span class="right_msg" @click="copy_title">复制</span>
            </div>
            <div class="content_tips" v-if="task.commenttask.keywords">
                <p>内容必含关键字</p>
                <div class="tips_icon" v-for="(item,index) in accept_content" :key="index" @click="keyword_content($event)">{{item}}</div>
            </div>            
            <div class="content">
                <input type="text" v-model="content" :disabled="cantChange">
                <span class="right_msg" @click="copy_content">复制</span>
            </div>
        </div>
        <div class='btn flex_jus_ali' @click="go_download">免费下载应用</div>
        <p class="title mt2">提交审核</p>
    </div>

    <div class='upload'>
        <p class="upload_tips">上传截图凭证 <i>（评论、应用二合一图，如样式图）</i></p>
        <div class="pic_wrap">
            <div class="pic"><img src="./img/pic.jpg" ></div>
            <div class="pic">
                <form action="" enctype="multipart/form-data">
                    <input type="file"  @change="changeImg($event)" ref="file" id="file" accept="image/* " >
                    <img v-if="!imgsrc" src="./img/add.png" >
                    <img v-else :src="imgsrc" >
                </form>
            </div>
        </div>
    </div>

    <div :class="cansubmit? 'blue':''" class='btn flex_jus_ali last_btn grey' @click="submit_result">提交审核</div>

    <div class="placeholder_div"></div>
</div>   
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios';
import $ from 'jquery';
export default{
    data(){
        return{
            TaskIng:true,
            task:{appios:{},commenttask:{},detail:{}},
            time:{},
            title:'',
            content:'',
            imgsrc:'',
            accept_word:null,          
            accept_content:null,
            cantChange:false,
            hadimg:[],
        }
    },
    mounted(){
        this.init();
        this.countdown()
    },
    beforeRouteLeave (to, from, next) {
        if(this.TaskIng&&!this.cansubmit){
            MessageBox.confirm('当前任务正在进行，是否放弃此任务','')
                .then(res => {
                this.sendGet("/Comment/untask.html?id="+this.task.detail.taskid)
                .then((res)=>{
                    console.log(res)
                    next()
                })
        })
        .catch(res=>{
                next(false)
        })
        }else {
            next()
        }        
    },
    methods:{
        init(){
            var taskid = this.$route.query.taskid;
            if(taskid==undefined||taskid==''){
                this.isUntask=false;
                this.$router.push('/');
                return;
            }
            this.sendGet("/Comment/detail.html?id="+taskid)  
            .then((res)=>{
                console.log(res)
                if(res.data.status!=1){
                    this.$router.push('/CallbackList')
                    return;
                }else{
                    var task = res.data.data;
                    this.task = res.data.data;
                    this.hadimg = task.detail.images;
                    if( this.hadimg.length!=0){
                        this.imgsrc = this.hadimg[0]
                    }
                    this.title = res.data.data.detail.title;
                    this.content = res.data.data.detail.content;
                    if(this.title){
                        this.cantChange=true
                    }         
                    this.accept_word =task.commenttask.keywords;
                       console.log(this.accept_word)
                    this.accept_content =task.commenttask.keywordscontent;
                    //时间初始化
                    var lefttime = this.task.detail.remain_time;
                    var fen = parseInt(lefttime/60);
                    var miao = lefttime%60;
                    var time={
                        fen:fen,
                        miao:miao
                    };
                    this.time = time; 
                }
            })   

        },
        //点击放入标题关键字
        keyword_title(e){
           if(this.cantChange){
               return
           }
            console.log(e.target.textContent)
            console.log(this.title)
            this.title = this.title + e.target.textContent
            console.log(this.title)
        },
        //点击放入内容关键字
        keyword_content(e){
          if(this.cantChange){
               return
           }
            this.content += e.target.textContent
        },

       // 截图处理
        changeImg(e){
            this.$Indicator.open('正在上传图片') 
            var _this = this;
            var detailid = this.task.detail.id;            
            if(this.hadimg.length!=0){      //存在图片 需先删除后再上传
                this.deleteImg()
                .then((res)=>{
                    console.log(res)
                    if(res.data.status==1){
                        this.hadimg.pop();
                        this.addImg(e).then(()=>{
                            this.$Indicator.close()
                        })
                    }
                })    
            }else{
                this.addImg(e).then(()=>{
                    this.$Indicator.close()
                })
            }

        },
        //添加图片
        addImg(e){
            return new Promise((resolve,reject)=>{
                var _this = this;
                var detailid = this.task.detail.id;
                var hadimg = this.hadimg;
                var file=e.target.files[0];
                let param = new FormData(); //创建form对象
                param.append('taskfile',file,);//通过append向form对象添加数据
                param.append('detailid',detailid)
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头            
                var reads= new FileReader();
                reads.readAsDataURL(file);
                reads.onload= function (e) {
                _this.imgsrc = this.result
                _this.sendPost("/Comment/uploadimg.html",param,config)
                .then((res)=>{
                    console.log(res)
                    if(res.data.status==1){
                        let imgurl = res.data.data.url;
                        _this.hadimg.push(imgurl)
                        resolve()
                    }
                }) 
                }
            })
        },
        //删除图片
        deleteImg(){
            return  new Promise((resolve,reject)=>{
                var url = this.hadimg[0];
                var detailid = this.task.detail.id;
                this.sendGet('/Comment/deleteimg.html?detailid='+detailid+'&img='+url)
                .then((res)=>{
                    resolve(res)
                })    
            })
        },

        //复制title
        copy_title(){
            var title = this.title
            this.$copynewkeyword(title)
            .then(()=>{
               Toast({
                message: '复制成功',
                position: 'middle',
                duration: 2000
                });
            })
        },
        //复制content
        copy_content(){
            var content = this.content
            this.$copynewkeyword(content)
            .then(()=>{
               Toast({
                message: '复制成功',
                position: 'middle',
                duration: 2000
                });
            })
        },  
        //下载应用 
        go_download(){
            var url = this.task.appios.appstore_url;
             window.location.href = url
        },    
        
        //提交审核
        submit_result(){
            var taskid = this.task.detail.id;
            var title = this.title;
            var content = this.content;
            console.log(typeof(title))
            if(this.cansubmit){
                this.sendGet(`/Comment/dosubmit.html?taskid=${taskid}&title=${title}&content=${content}`)
                .then((res)=>{
                    console.log(res)
                    if(res.data.status==1){
                       MessageBox.alert(res.data.info).then(()=>{
                            this.$router.replace('./CommentList')
                        })
                    
                    }else{
                       MessageBox.alert(res.data.info)
                    }
                })
            }else{
               MessageBox.alert('请输入标题关键字和内容关键字，并且上传截图')
            }
            
        },
        //倒计时
        countdown(){
            let timer = setInterval(()=>{
                var time = this.time;
                var miao = time.miao;
                var fen = time.fen;
                if(miao==0){
                    miao = 60;
                    fen = fen-1;
                }else if(fen<0){
                    this.sendGet("/Task/untask.html")
                    time.fen='0',
                    time.miao='00'
                    this.time = time; 
                    clearInterval(timer)  
                   MessageBox.alert('任务时间已结束').then(()=>{
                        this.$router.push('/')           
                    })                                                   
                }else{
                    miao = miao-1
                }
                time.fen = fen;
                time.miao =miao;
                this.time = time; 
            },1000)  
        }

    },
    computed:{
        //是否可以提交审核判断
        cansubmit(){
            if(this.title&&this.content&&this.hadimg.length){
                return true
            }else{
                return false
            }
        }
    }


}    

</script>

<style scoped>
.task_wrap{
    width:25.36rem;
    height:5.86rem;
    background:rgba(249,250,252,1);
    border-radius:0.29rem;
    margin: 1rem auto 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    box-sizing: border-box;
}
.task_wrap .left_msg{
    display: flex;
    align-items: center;
    font-size: 1.142rem
}
.task_wrap .left_msg img{
    width: 3.71rem;
    height: 3.71rem;
    margin-right: 1rem;
    border-radius: 0.4rem
}
.task_wrap .right_msg p{
    color: #F24C4C
}
.task_wrap .right_msg i{
    font-size: 1rem;
}
.task_wrap .right_msg span{
    font-size: 0.86rem;
}
.task_wrap .right_msg .value{
    font-size: 1.71rem;
    font-weight: 600;
    font-family: 'dx'
}
.nav{
    padding: 0 1rem;
    width: 25rem;
    height: 3.5rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 0.08rem solid #F1F1F1
}
.nav .left_word{
    font-size: 1.14rem;
}
.nav .right_word{
    font-size: 0.71rem;
    display: flex;
    align-items: center;
}
.nav .right_word i{
    display: flex;
    justify-content:center;
    align-items: center;
    border: 1px solid rgba(255,176,34,1);
    border-radius: 4px;
    width: 1.571rem;
    height: 1.428rem;
    margin: 0 0.4rem;
    font-size: 0.857rem;
    font-family: 'dx'
}
.tips{
    padding: 1rem 1.8rem;
    font-size:1.07rem;
    line-height:1.79rem;
}
.tips p{
    display: inline-block;
    height: 100%;
}
.tips i{
    color: #F24C4C
}
.tips .item{
    display: flex
}
.tips .right{
    display: inline-block
}
.comment{
    padding: 0 1.8rem;
    margin-top: 1rem;
}
.comment .title{
    font-size:1.14rem;
    font-weight: 600;
    padding-bottom: 0.714rem;
    border-bottom: 0.5px solid #F1F1F1
}
.content_wrap{
    margin-top: 1rem;
}
.content_wrap .content{
    width:23.93rem;
    height:3.71rem;
    background:rgba(241,248,251,1);
    border-radius:0.29rem;
    margin: 0.55rem auto 0;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
}
.content .right_msg{
    position: absolute;
    font-size: 1.15rem;
    right: 1rem;
    padding: 0.2rem 0 0.2rem 0.71rem;
    color: #3CA2E8;
    border-left: 0.01rem solid rgba(204,225,234,1)
}
.btn{
    width:22.5rem;
    height:3.14rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;
    color:white;
    font-size:1.14rem;    
    margin: 1.42rem auto 0
}
.mt2{
    margin-top: 2.1rem;
}
.upload{
    padding: 1.28rem 1.78rem;
}
.upload_tips{
    color: #545454
}
.upload_tips i{
    color: #9FA8B7;
}
.pic_wrap{
    margin-top: 0.78rem;
    display: flex;
}
.pic_wrap .pic{
    width: 7.38rem;
    height: 12.96rem;
    margin-right: 1.5rem;
    position: relative;
}
.pic_wrap .pic form{
    width: 100%;
    height: 100%;
}
.pic img{
    width: 100%;
    height: 100%;
}
.content_tips{
    padding: 1rem 0;
    display: flex;
    align-items: center;
}
.content_tips p{
    color: #9FA8B7;
    margin-right: 0.6rem
}
.tips_icon{
    padding: 0.3rem 0.5rem;
    border: 1px solid rgba(48,152,255,1);
    color: #3098FF;
    border-radius: 7.14rem;
    margin-right: 0.7rem;
}
.content input{
    width: 17.85rem;
    outline: none;
    border:0;
    background: rgba(241,248,251,1);
    position: absolute;
    left: 1rem;
    height:90%;
    top: 0;
}
.pic input{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
}
/* .last_btn{
    margin-bottom: 6.78rem;
} */
.grey{
    background: #D1D7E2;
}
.placeholder_div{
    height: 6.78rem;
    width: 100%;
}
.blue{
    background: rgba(48,152,255,1);
}
</style>

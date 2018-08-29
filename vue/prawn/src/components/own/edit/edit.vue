<template>
<div>
    <app-header :title = "'编辑资料'"></app-header>
    <div class="wrap">
        <div class="item flex_between">
            <p class="left_msg">头像</p>
            <div class="right_msg flex_ali_center">
                <img class="head" :src="userInfo.avatar">
<!--                 <img class="arrow" src="./img/arrow.png"> -->
            </div>
        </div>
        <div class="item flex_between">
            <p class="left_msg">昵称</p>
            <div class="right_msg flex_ali_center">
                <p>{{userInfo.name}}</p>
<!--                 <img class="arrow" src="./img/arrow.png"> -->
            </div>
        </div>
        <div class="item flex_between">
            <p class="left_msg">性别</p>
            <div class="right_msg flex_ali_center" @click="show_sex">
                <p v-if="userInfo.gender==1">男</p>
                <p v-else>女</p>
                <img class="arrow" src="./img/arrow.png">
            </div>
        </div> 
        <div class="item flex_between" @click="go_bind">
            <p class="left_msg">手机绑定</p>
            <div class="right_msg flex_ali_center">
                <p>{{userInfo.phone}}</p>
                <img class="arrow" src="./img/arrow.png"  v-if="userInfo.phone =='未绑定'">
            </div>
        </div>   
        <div class="item flex_between"  @click="wxbindre">
            <p class="left_msg">微信绑定</p>
            <div class="right_msg flex_ali_center">
                <p :class="[userInfo.wxid.length>20? 'small':'']">{{userInfo.wxid}}</p>
                <img class="arrow" src="./img/arrow.png" v-if="!wxbind">
            </div>
        </div>   
 
    </div>
    <div class="btn flex_jus_ali"  @click="submits">
        保存
    </div>
    
    <div class="shade" v-if="show_sex_select" @click="close_sex"></div>
    <div class="bottom_select" v-if="show_sex_select">
        <div class="content bot_line flex_jus_ali" @click="choise_man">男</div>
        <div class="content flex_jus_ali" @click="choise_women">女</div>
    </div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App',
    data(){
        return {
            userInfo:{wxid:'',phone:'',gender:''},
            sex:'',
            show_sex_select:false,
            wxbind:false,

        }
    },
    mounted(){     
        this.$Indicator.open('加载中')        //loading弹窗
        this.sendGet("/User/userInfoDetail.html")
        .then((res)=>{
            this.userInfo = res.data.data;
            if(this.userInfo.wxid == '' || this.userInfo.wxid == undefined || this.userInfo.wxid == null){
                this.userInfo.wxid='未绑定';
                this.wxbind = false;
            }else {
                this.userInfo.wxid='已绑定';
                this.wxbind = true;
            }

            if(this.userInfo.phone == '' || this.userInfo.phone == undefined || this.userInfo.phone == null){
                this.userInfo.phone='未绑定'
            }
        })
    },
    updated(){
        this.$Indicator.close()
    },
    methods:{
        wxbindre(){
            var _this = this;
            if(!this.wxbind){
                var getwxurl = this.consts.clientBaseurl + "/getWXdic?";
                var openWx = false;
                var getWeiXinTimer = setInterval(()=>{
                    this.$.ajax({
                        url: getwxurl,
                        dataType: 'json',
                        type: 'get',
                        success: function (r) {
                            if (r.status != 1){
                                if(r.data == -101){
                                    if(!openWx){
                                        openWx = true;
                                        document.location.href="daxiashiwan://openWeiXin?"
                                        // if(developfrom == "redenvelopes"){
                                        //     document.location.href="redEnvelopes://openWeiXin?"
                                        // }else{
                                        //     document.location.href="moneymaster://openWeiXin?"
                                        // }
                                    }
                                    return;
                                }else{
                                    if(r.msg == "wx expire"){
                                        // lmmodal.tip("请从新绑定");
                                    }else{
                                        //lmmodal.tip(r.msg);
                                        clearInterval(getWeiXinTimer);
                                    }
                                }
                            }else{
                                clearInterval(getWeiXinTimer);
                                var postdata = {};
                                postdata.avatar = r.data.icon;
                                postdata.name = r.data.username;
                                postdata.wxid = r.data.unionId;
                                    _this.sendPost("/User/savewx.html",postdata)
                                    .then((res)=>{
                                        var resole= res.data;
                                        if(resole.status == 1){
                                            //lmmodal.tip(data.info);
                                            setTimeout(function () {
                                                document.location.reload();
                                            },1000);
                                        }else{
                                            MessageBox.alert(resole.info);
                                        }
                                    })
                            }

                        }
                    });
                }, 1500);



            }
        },
        show_sex(){
            this.show_sex_select = true
        },
        close_sex(){
            this.show_sex_select = false
        },
        choise_man(){
            this.userInfo.gender=1;
            this.close_sex()
        },
        choise_women(){
            this.userInfo.gender=2;
            this.close_sex()
        },
        //跳转手机绑定
        go_bind(){
                if(this.userInfo.phone == '未绑定'){
                    this.$router.push('./phoneBind')
                }
        },
        submits(){
            this.$axios.get("/User/saveinfo.html?gender="+this.userInfo.gender)
            .then((res)=>{
                var resole = res.data;
                if(resole.status == 1){
                    this.userInfo.gender=resole.data;
                    MessageBox.alert("成功！");
                }else{
                    this.userInfo.gender=resole.data;
                    MessageBox.alert("失败！");
                }
            })
        }
    }

}
</script>
<style scoped>
.small{
    font-size: 0.5rem
}
.wrap{
    padding-left: 1.35rem;
}
.item{
    font-size: 1.14rem;
    padding: 1.55rem 1.35rem 1.55rem 0;
    border-bottom: 0.08rem solid #F1F1F1;
}
.head{
    width:4.57rem;
    height:4.57rem;
    border-radius: 50%;
}
.right_msg{
    font-size: 1.07rem;
    color: #9FA8B7;
}
.arrow{
    width: 0.7rem;
    height: 1.1rem;
    margin-left: 1rem;
}
.btn{
    width:21.79rem;
    height:3.54rem;
    background:rgba(48,152,255,1);
    border-radius:1.57rem;
    color: white;
    font-size: 1.1rem;
    margin: 3rem auto 
}
.shade{
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(104,104,104,0.6)
}
.bottom_select{
    width: 90%;
    height: 8rem;
    background: white;
    position: fixed;
    bottom: 0.1rem;
    left: 50%;
    margin-left: -45%;
    z-index: 120;
    border-radius: 1.2rem
}
.bottom_select .content{
    width: 100%;
    height: 50%;
    font-size: 1.4rem;
}
.bot_line{
    border-bottom: 0.1rem solid #D1D7E2;
}
</style>

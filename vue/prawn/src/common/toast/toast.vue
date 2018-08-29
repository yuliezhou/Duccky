<template>
<div v-if="alertShow||confirmShow" class="shade" @touchmove.prevent>
    <!-- alert弹窗 -->
    <div class="alert" v-if="alertShow">
        <h2 class="title">提示</h2>
        <p  class='content'>{{alert_text}}</p>
        <div ref="alert_sure" class="btn_wrap" @click.stop="alertsure">
            确认
        </div>
    </div>
    <!-- confirm弹窗 -->
    <div class="confirm" v-if="confirmShow">
        <p class="content">{{confirm_text}}</p>
        <div class="confirm_btn_warp">
            <div ref="confirm_cancel" class="flex_jus_ali left" @click.stop="confirmCancel">取消</div>
            <div ref="confirm_sure" class="flex_jus_ali right" @click.stop="confirmSure">确定</div>
        </div>    
    </div>
</div>
  
</template>

<script>
export default{
    data(){
        return {
            alertShow:false,
            alert_text:'',
            confirmShow:false,
            confirm_text:'',
        }
    },

    methods:{
        //  test(){
        //     this.showConfirm('sihioahsashkan')
        //     .then(()=>{
        //         console.log('ok')
        //     })
        // },

        //alert点击确认
        alertsure(){
            this.alertShow=false
        },

        //confirm点击确认
        confirmSure(){
            this.confirmShow = false
        },
        //confirm点击取消
        confirmCancel(){
            this.confirmShow = false
        },

        //显示alert弹窗
        showAlert(content){
            return new Promise((resolve,reject)=>{
                this.alertShow=true;
                this.alert_text = content;
                this.$nextTick(()=>{    
                    var alertSure = this.$refs.alert_sure;
                    alertSure.addEventListener("click",function(){
                       resolve()
                    })         
                })
            })
        },
        //confirm弹窗
        showConfirm(content){
            return new Promise((resolve,reject) => {
                this.confirmShow=true;
                this.confirm_text = content;
                this.$nextTick(()=>{    
                    var confirm_sure = this.$refs.confirm_sure;
                    var confirm_cancel = this.$refs.confirm_cancel;
                    confirm_sure.addEventListener("click",function(){
                       resolve()
                    });
                    confirm_cancel.addEventListener("click",function(){
                        reject()
                    })
                })
            })
        }
    }

}

</script>

<style scoped>
.all_wrap{
    width: 100%;
    height: 100vh;
}
.shade{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
}
.alert{
    width: 74%;
    height: 24vh;
    position: fixed;
    top: 30%;
    left: 50%;
    margin-left: -37%;
    background: white;
    z-index: 300;
    border-radius: 0.6rem
}
.alert .title{
    text-align: center;
    font-size: 1.4rem;
    margin-top: 0.9rem;
}
.alert .content{
    margin-top: 1.1rem;
    padding: 0 2rem;
    font-size: 1.2rem;
    text-align: center;
    line-height: 1.8rem
}
.alert .btn_wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.15rem;
    color:deepskyblue;
    border-top: 1px solid gainsboro;
}
.confirm{
    width:17.64rem;
    background:rgba(255,255,255,1);
    border-radius:0.43rem;
    position: fixed;
    top: 30%;
    left: 50%;
    margin-left: -8.82rem;
    z-index: 300;
    padding: 1.42rem 1.42rem 4.81rem;
    box-sizing: border-box;
    position: fixed;
}
.confirm .content {
    font-size:1.14rem;
    color:rgba(63,69,82,1);
    line-height:1.57rem;
}
.confirm_btn_warp{
    width: 100%;
    height: 3.21rem;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(238,238,238,1);
}
.confirm_btn_warp div{
    width: 50%;
    height: 100%;
    font-size:1.14rem;
}
.confirm_btn_warp .left{
    border-right: 0.5px solid rgba(238,238,238,1);
    color: #9FA8B7;
}
.confirm_btn_warp .right{
    color: #3098FF;
    font-weight: 600
}
</style>
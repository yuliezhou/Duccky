<template>
<div>
    <app-header :title = "'我的'"></app-header>
    <div class="head_msg flex_between" @click="goset">
        <div class="left_msg flex">
            <img :src="userInfo.avatar" >
            <div class="left_word">
                <p class="name">{{userInfo.name}}</p>
                <p class="id">ID: {{userInfo.id}}</p>
            </div>
        </div>
        <div class="right_msg" >
            <img class="qr_code" src="./img/qr_code.png" @click.stop='go_qrcode'>
            <img class="arrow" src="./img/arrow.png">
        </div>
    </div>

    <div class="blance">
        <p class='tips'>账户余额</p>
        <div class="detail flex_between">
            <p>￥ {{userInfo.balance}}</p>
            <div class="flex_jus_ali" @click="go_withdraw">提现</div>
        </div>  
    </div>

    <div class="nav flex_between">
        <div class="nav_item"  @click='go_account_det'>
            <img src="./img/bill.png">
            <p>账单明细</p>
        </div>
        <div class="nav_item">
            <img src="./img/help.png"  @click='go_help'>
            <p>帮助中心</p>
        </div>
        <div class="nav_item" @click="goset">
            <img src="./img/set.png">
            <p>账户设置</p>
        </div>      
    </div>
    <div class="nav2">   
      <div class="nav_item">
          <img src="./img/business.png"  @click='go_shangwu'>
          <p>商务合作</p>
      </div>
      <div class="nav_item last">
          <img src="./img/about.png"  @click='go_guanyu'>
          <p>关于大虾</p>
      </div>
    </div>
</div>    
</template>

<script>
export default {
  name: 'App',
    data(){
        return {
            userInfo:{},
        }
    },
    mounted(){
        this.$Indicator.open('加载中')        //loading弹窗
        this.sendGet("/User/userInfo.html")
        .then((res)=>{
            console.log(res)
            this.userInfo = res.data.data;
            console.log(this.userInfo)
        })        
    },
    updated(){
        this.$Indicator.close() //关闭弹窗
    },
    methods:{
      go_withdraw(){
          this.$router.push('./withdraw')
      },
      goset(){
          this.$router.push('./edit')
      },
      go_qrcode(){
          this.$router.push('./qrcode')
      },
      go_account_det(){
        this.$router.push('./Account_detail?t='+Date.parse(new Date()))
      },
      go_help(){
        this.$router.push('./helpList')
      },
      go_shangwu(){
//        this.$router.push({path:'./help_detail',query:{q:'shangwu'}})
          location.href='mqqwpa://im/chat?chat_type=wpa&uin=2290747606&version=1&src_type=web&web_src=oicqzone.com';
      },
      go_guanyu(){
        this.$router.push({path:'./help_detail',query:{q:'guanyu'}})
      }
  }

}
</script>

<style scoped>
.head_msg{
    width: 24rem;
    height: 7rem;
    margin: 0 auto;
    box-sizing: border-box;
    border-bottom: 0.06rem solid #F1F1F1;
}
.head_msg .left_msg img{
    width: 3.71rem;
    height: 3.71rem;
    border-radius: 50%;

}
.left_msg .left_word{
    height: 3.45rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;
}
.left_word .name{
    font-size:1.14rem;
    color: #3F4552;
}
.left_word .id{
    font-size: 0.93rem;
    color: #9FA8B7
}
.right_msg{
    display: flex;
    align-items: center;

}
.right_msg .arrow{
    width:  0.57rem;
    height: 1rem;
}
.right_msg .qr_code{
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
}
.tips{
    color: #3F4552;
}
.blance{
    padding: 1.5rem 2rem;
}
.blance .detail {
    padding: 1rem 0 1.5rem;
    border-bottom: 0.08rem solid #F1F1F1;
}
.blance .detail p{
    font-size: 2.14rem;
    font-weight: 600;
    margin-left: -0.5rem;
    font-family: 'dx';
}
.blance .detail div{
    width:5rem;
    height:2.43rem;
    background:rgba(48,152,255,1);
    border-radius:7.14rem;
    color: white;
    font-size: 1.07rem
}
.nav{
    padding: 0 3rem;
    margin-bottom: 2rem;
}
.nav_item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
}
.nav_item img{
    width: 2.71rem;
    height: 2.71rem;
    margin-bottom: 0.8rem;
}
.nav2{
    display: flex;
    padding: 0 3rem;
}
.nav2 .nav_item{
    margin-right: 4.4rem
}
</style>


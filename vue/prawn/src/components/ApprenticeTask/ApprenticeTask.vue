<template>
<div>
  <app-header :title = "'收徒任务'"></app-header>

  <div class="head_msg flex_jus_ali">
      <div class="detail_msg left">
        <p>{{userInfo.tsummoney}}</p>
        <i>收徒奖励(元)</i>
      </div>

      <div class="detail_msg" @click="go_myApprentice">
        <p>{{userInfo.tchildcount}}</p>
        <i>我的徒弟(名)</i>
      </div>
  </div>
  <!-- 奖励规则 -->
  <div class="rule">
    <p>奖励规则</p>
    <p class="detail">用户通过扫码或访问您分享出去的链接，即可成为您的徒弟；徒弟每完成一个试玩任务，您获得任务奖金的50%，每名徒弟贡献提成上限10元，多收多得。</p>
  </div>

  <!--<div class="share">-->
    <!--<div class='share_apprent'>-->
      <!--<img src="./img/share_head.png" >-->
      <!--<i>分享收徒</i>-->
    <!--</div>-->
    <!--<div class="share_method flex_between">-->
      <!--<div class="method">-->
        <!--<img src="./img/monments.png" >-->
        <!--<p>朋友圈</p>-->
      <!--</div>-->
      <!--<div class="method">-->
        <!--<img src="./img/wechat.png" >-->
        <!--<p>微信</p>-->
      <!--</div>-->
      <!--<div class="method">-->
        <!--<img src="./img/qq.png" >-->
        <!--<p>QQ</p>-->
      <!--</div>-->
      <!--<div class="method">-->
        <!--<img src="./img/qq_room.png" >-->
        <!--<p>QQ空间</p>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->

  <div class="get_Apprentice">
    <div class="get_item flex_between" @click="smshoutu">
      <div class="left_msg">
        <img src="./img/qr_code.png">
        <p>扫码收徒</p>
      </div>
      <img class="arrow" src="./img/arrow.png" >
    </div>
    <div class="get_item flex_between" @click="go_linkApprentice">
      <div class="left_msg">
        <img src="./img/link.png" >
        <p>链接收徒</p>
      </div>
      <img class="arrow" src="./img/arrow.png" >
    </div>
  </div>

</div>
</template>

<script>
export default {
    name: 'App',
    data(){
      return {
        userInfo:{}
      }

    },
    mounted(){
      this.$Indicator.open('加载中')        //loading弹窗
      this.$axios.get("/User/invite.html")
        .then((res)=>{
        this.userInfo = res.data.data;
        console.log(this.userInfo)
      })
    },
    updated(){
      this.$Indicator.close()
    },
    methods:{
        go_myApprentice(){
            this.$router.push('./my_Apprentice')
        },

        go_linkApprentice(){
          this.$router.push('./link_Apprentice')
        },

        smshoutu(){
        this.$router.push('./qrcode')
      },

    }

}
</script>

<style scoped>
.head_msg{
  width: 100%;
  height: 3.5rem;
  margin-top: 2rem;
}
.head_msg .detail_msg{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size:2rem;
  font-weight: 600
}
.head_msg .left{
  border-right: 1px solid #ECEFF6
}
.head_msg .detail_msg i{
  color: #9FA8B7;
  font-size: 0.86rem;
  font-weight: 400
}
.rule{
  margin: 1rem auto 0;
  width: 26rem;
  height: 14.5rem;
  background: url(./img/rule_bac.png);
  background-size: 100% 100%;
  padding-top: 2.7rem;
  padding-left: 2.4rem;
  padding-right: 1rem;
  box-sizing: border-box;
}
.rule p{
  font-size: 1.21rem;
  line-height:1.71rem;
  color: white;
  font-weight: bold;
}
.rule .detail{
  color: white;
  line-height:1.46rem;
  font-size: 1rem;
  font-weight:400;
  margin-top: 0.8rem;
}
.share{
  margin-top: 1.5rem;
}
.share_apprent {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 1.14rem;
}
.share .share_apprent img{
  width: 1.3rem;
  height: 1.8rem;
  margin-right: 1rem;
}
.share_method{
  padding: 0 2rem;
  font-size: 0.93rem;
  margin-top: 1.8rem;
}
.share_method img{
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.8rem;
}
.share_method .method{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.get_Apprentice{
  width: 24rem;
  margin: 2.5rem auto 0;
  border-top: 1px solid #F1F1F1;
}
.get_item{
  width: 100%;
  padding: 1.35rem 0;
  font-size: 1.14rem;
  border-bottom: 1px solid #F1F1F1;
  box-sizing: border-box;
}
.get_item .left_msg {
  display: flex
}
.get_item .left_msg img{
  width: 1.38rem;
  height: 1.38rem;
  margin-right: 1rem;
}
.arrow{
  width: 0.57rem;
  height: 1rem;
}
</style>


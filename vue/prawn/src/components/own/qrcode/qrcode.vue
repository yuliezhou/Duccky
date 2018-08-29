<template>
<div>
    <app-header :title = "'二维码'"></app-header>
    <div class="qr_code">
        <img src="http://m.dxshiwan.com/User/inviteQr.html" width="100%" height="100%">
    </div>

    <p class="tips">扫一扫，我们一起赚钱吧</p>
</div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
        qr_code:''
    }
  },
  
  mounted(){
  
  },

}
</script>

<style scoped>
.qr_code{
  width:13.73rem;
  height:13.73rem;
  margin: 4rem auto;
}
.tips{
  margin-top: 2rem;
  text-align: center; 
  color: #9FA8B7;
}

</style>

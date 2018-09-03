<template>
  <div id="app">
    <router-view></router-view>
    <Tabbar></Tabbar>
    <div class="empty"></div>
  </div>
</template>

<script>
import Tabbar from'./components/tabbar'
export default {
  name: 'app',
  created:function(){
    this.$router.push('/')
  },
  components:{
    Tabbar
  }
}
</script>


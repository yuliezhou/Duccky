<template>
  <div id="app">
    <router-view></router-view>
    <Tabber></Tabber>
    <div class="empty"></div>
  </div>
</template>

<script>
import Tabber from'./components/tabber'
export default {
  name: 'app',
  created:function(){
    this.$router.push('/')
  },
  components:{
    Tabber
  }
}
</script>

<style>

</style>

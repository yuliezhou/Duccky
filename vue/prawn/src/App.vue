<template>
  <div id="app">
 <!--使用keep-alive会将页面缓存-->
   
    <router-view v-if="$route.meta.keepAlive"></router-view>
       <!-- <img class="all_common_head" @click="go_kefu" src="./head.png"> -->
     <router-view v-if="!$route.meta.keepAlive"></router-view>
  
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
  
    }
  },
  methods:{
    go_kefu(){
      window.location.href='https://static.meiqia.com/dist/standalone.html?_=t&eid=117420'

    }
  }

}
</script>

<style>
#app {
  height:100%;
}
.all_common_head{
  width: 2rem;
  position: fixed;
  bottom: 10%;
  left: 88%;
}
</style>

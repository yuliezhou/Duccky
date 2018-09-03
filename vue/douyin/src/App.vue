<template>
  <div id="app">
	<Myheader></Myheader>
    <router-view></router-view>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
	import Myheader from './components/Header'
	import MyFooter from './components/Footer'
	export default {
	  name: 'App',
	    created:function(){
	    this.$router.push('/')
	  },
	  components:{
	  	Myheader,
	  	MyFooter
	  }
	}
</script>


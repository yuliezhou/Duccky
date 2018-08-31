<template>
  <div id="app">
	<Myheader></Myheader>
    <router-view></router-view>
  </div>
</template>

<script>
	import Myheader from './components/Header'
	export default {
	  name: 'App',
	    created:function(){
	    this.$router.push('/')
	  },
	  components:{
	  	Myheader
	  }
	}
</script>


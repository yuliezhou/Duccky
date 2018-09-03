<template>

</template>
<script type="text/javascript">
	import Item from './Item.vue'
	export default {
		data:function(){
			return {
				selected:'home',	
				tabbarDes:[
					{
						txt:'首页',
						page:'home'
						
					},				
					{
						txt:'功能',
						page:'function'
					},
					{
						txt:'查看演示',
						page:'thesaurus'
					},
					{
						txt:'登录/注册',
						page:'account'
					}
				]
			}
		},
		components:{
			Item
		},
		methods:{
			changePage:function (res) {
				this.selected = res;
			}
		}		
	}
</script>
<style lang="less">
	.tabbarWarp{
		float: right;
	}
</style>
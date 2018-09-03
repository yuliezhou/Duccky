<template>
	<div class="headerWarp" :style='{background: col}'>
		<div class="logo_box flex_center">
			<img src="../assets/logo.png" alt="">
			<span>抖音助手</span>
		</div>
		<div class="tabbarWarp">
			<Item v-for='item in tabbarDes' :page='item.page' :txt='item.txt' @change='changePage' :sel='selected'>
			</Item>
		</div>		
		<div class="clear"></div>
	</div>
</template>
<script type="text/javascript">
	import Item from '../components/Item.vue'
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
						page:'myfunction'
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
		props:{
			col:{
				type:String,
				default:'#fff'
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
<style scoped lang="less">
	.headerWarp{
		padding: 30px 0;
		width: 100%;
		border-bottom: 1px solid #ccc;
		.logo_box{
			float: left;
			padding-left: 50px;
			height: 50px;
			display: flex;
			align-items: center;
			img{
				width: 50px;
			}
			span{
				color:#333;
				font-weight: bold;
				font-size: 18px;
				margin-left: 20px;
			}
		}
		.tabbarWarp{
			float: right;
		}		
	}
</style>
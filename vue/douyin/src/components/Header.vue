<template>
	<div class="headerWarp flex_between" :style='{background: col}'>
		<div class="logo_box flex_center">
			<img src="../assets/logo.png" alt="">
			<span>抖音助手</span>
		</div>
		<div class="tabbarWarp" v-if='!loginStatus'>
			<Item v-for='item in tabbarDes' :page='item.page' :txt='item.txt' @change='changePage' :sel='selected'>
			</Item>
		</div>	
		<div class="user" v-if='loginStatus'>
			<img src="../assets/user.jpg" alt="" class="user_img">
			<span class="user_name">D.</span>	
			<i class="ivu-icon ivu-icon-ios-arrow-down"></i>
			<div class="user_absolute">
				<span>退出登录</span>
				<span>退出登录</span>
				<span>退出登录</span>
			</div>
		</div>	
	</div>
</template>
<script type="text/javascript">
	import Item from '../components/Item.vue'
	export default {
		data:function(){
			return {
				selected:'home',
				loginStatus:true,	
				theme1: 'light',
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
		padding: 10px 0;
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
		.user{
			float: right;
			display: flex;
			align-items: center;
			margin-right: 60px;
			position: relative;
			.user_img{
				width: 80px;
				height: 80px;
				border-radius: 50%;				
			}
			.user_name{
				font-size: 20px;
				color: #333;
				margin: 0 10px;				
			}
			i{
				font-size: 28px;
				transition: all 0.5s;
			}
			&:hover i{
				transform: rotate(180deg);
			}
			&:hover .user_absolute{
				display: block;
			}
			.user_absolute{
				position: absolute;
				top: calc(100% + 10px);
				left: 0;
				width: 100%;
				background: #fff;
				box-shadow: 0 0 10px #ccc;
				display: none;
				span{
					width: 100%;
					display: inline-block;
					height: 60px;
					line-height: 60px;
					color:#333;
					font-size: 16px;
					text-align: center;
					margin: 0;
				}
			}
		}
	}
</style>
<template>
	<div class="headerWarp" :style='{background: col}'>
		<div class="logo_box flex_center">
			<img src="../assets/logo.png" alt="">
			<span>抖音助手</span>
		</div>
		<div class="clear"></div>
		<slot></slot>	
	</div>
</template>
<script type="text/javascript">
	export default {
		props:{
			col:{
				type:String,
				default:'#fff'
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

	}
</style>
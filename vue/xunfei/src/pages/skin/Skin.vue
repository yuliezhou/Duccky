<template>
	<div>
		<div class="fixed_top"></div>
		<Myheader col='#fff'>
			<div class="title">
				<router-link to='/Skin/Local'>
					<div class="tit_box">本地</div>
				</router-link>
				<router-link to='/Skin/Tuijian'>
					<div class="tit_mid tit_box">推荐</div>
				</router-link>
				<router-link to='/Skin/Ranking'>
					<div class="tit_box">排行</div>
				</router-link>
			</div>
		</Myheader>
		<router-view></router-view>
	</div>
	
</template>
<script type="text/javascript">
	import Myheader from '../../components/Header'
	
	export default{
		components:{
			//命名不能用header ，会导致与原生的header标签冲突
			Myheader
		},
		mounted(){
			this.$router.push("/Skin/Tuijian")
		}
	}
</script>
<style type="text/css">
	*{
		margin: 0;
		padding:0;
	}
	body{
		background: #eee;
	}
	.fixed_top{
		height: 50px;
		width: 100%;
	}
	.title{
		border-radius: 5px;
		border:1px solid #3783f6;
		font-size: 14px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.title a{
		color: #3783f6;
	}
	.title .tit_box{
		padding:4px 8px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.router-link-active>div{
		background: #3783f6;
		color: #fff;
	}
	.title .tit_mid{
		border-left: 1px solid #3783f6;
		border-right: 1px solid #3783f6;
		box-sizing: border-box;
	}
</style>
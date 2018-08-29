<template>
	<div>
		<div class="fixed_top"></div>
		<Myheader col='#fff'>
			<div class="header_tit">词库</div>
		</Myheader>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import Myheader from '../../components/Header'
	export default{
		components:{
			Myheader
		}
	}
</script>
<style type="text/css">
	.header_tit{
		width: 100%;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
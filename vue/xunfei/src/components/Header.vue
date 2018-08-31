<template>
	<div class="headerWarp" :style='{background: col}'>
		<slot></slot>	
	</div>
</template>
<script type="text/javascript">
	export default {
		props:{
			col:{
				type:String,
				default:'#000'
			}
		}
	}
</script>
<style type="text/css">
	.headerWarp{
		height: 50px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 3;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
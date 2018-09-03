<template>
	<div class="itemWarp">
		<span class="item" :class='bol?"active":""' @click='changePage' v-text='txt'></span>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'Item',
		props:{
			txt:{
				type:String
			},
			sel:{
				type:String 
			},
			page:{
				type:String
			}
		},
		computed:{
			bol: function(){
				if(this.sel == this.page){
					return true;
				}
				return false;
			}
		},		
		methods:{
			changePage:function(res){
				//点击跳转对应的页面
				this.$router.push('/'+this.page);
				this.$emit('change',this.page)
			}
		}
	}
</script>
<style lang="less">
	.itemWarp{
		display: inline-block;
		height: 50px;
		line-height: 50px;
		.item{
			padding: 10px 20px;
			text-align: center;
			font-size: 16px;
			border-radius: 4px;
			cursor: pointer;
			&:hover{
				background: #2d8cf0;
				color:#fff;	
				transition: all 0.5s;
			}
		}
		.active{
			background: #2d8cf0;
			color:#fff;
		}
	}
</style>

<template>
	<div class="tabberWarp" >
		<div class="warp">
			<Item :txt='item.txt' :page='item.page' @change='getVal' v-for='item in tabbarDes':sel='selected'>
				<img :src="item.normalImg" slot='normalImg'>
				<img :src="item.activeImg" slot='activeImg'>
			</Item>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Item from './Item.vue'
	export default{
		components:{
			Item
		},
		data:function(){
			return{
				selected:'skin',
				tabbarDes:[
					{
						txt:'表情',
						page:'skin',
						normalImg:require('../assets/images/zz_07.jpg'),
						activeImg:require('../assets/images/22_03.jpg')
						
					},				
					{
						txt:'皮肤',
						page:'phiz',
						normalImg:require('../assets/images/download_skin_ic.png'),
						activeImg:require('../assets/images/112_26.jpg')
					},
					{
						txt:'词库',
						page:'thesaurus',
						normalImg:require('../assets/images/zz_09.jpg'),
						activeImg:require('../assets/images/icon2_03.jpg')
					},
					{
						txt:'账号',
						page:'account',
						normalImg:require('../assets/images/zz_11.jpg'),
						activeImg:require('../assets/images/cion_03.jpg')
					},
					{
						txt:'设置',
						page:'setup',
						normalImg:require('../assets/images/zz_13.jpg'),
						activeImg:require('../assets/images/22_03.jpg')
					}
				]
			}
		},
		methods:{
			getVal:function(res){
				this.selected = res;
			}
		}
	}
</script>
<style type="text/css">
	.warp{
		width: 100%;
		border-top: 1px solid #eee;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 0;
	}
	.warp img{
		width: 20px;
		height: 20px;
	}
	.tabberWarp img{
		margin-top: 10px;
		margin-bottom: 5px;

	}
	.tabberWarp{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: 5px;
		background: #fff;
	}
</style>
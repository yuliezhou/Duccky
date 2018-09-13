<template>
	<div>
		<div class="container">
			<div class="add_account">
				<div class="add_account_inner">+ 添加账户</div>
			</div>
		</div>		
		<div v-for='(item,index) in userDes' @click='toChart(item.id,item.name)'>{{item.name}}</div>
		<router-view></router-view>
	</div>
</template>
<style scoped lang="less">
	.add_account{
		padding: 50px 0;
		text-align: center;
		.add_account_inner{
			display: inline-block;
			width: 706px;
			height: 56px;
			text-align: center;
			line-height: 56px;
			color: #fff;
			font-size: 20px;
			background: linear-gradient(37deg,rgba(247,97,139,1) 0%,rgba(42,122,255,1) 100%);
		}		
	}	
</style>
<script type="text/javascript">
	export default{
		  mounted(){
		  },
		data(){
			return{
				userDes:
				[
					{
						id:1,
						name:'duccky1'
					},		
					{
						id:2,
						name:'duccky2'
					},		
				]
			}
		},		
		components:{
		},
		methods:{
		    toChart(id,name){
				this.$router.push(
					{
						name:'Table',
						params:{
							id:id,
							name:name
						}
					}
				);
		    }
		}
	}
</script>

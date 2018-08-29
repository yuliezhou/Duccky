<template>
	<div>
		<!-- 不能再template下执行v-for循环 需要包含一个盒子-->
		<div class="skin_box" v-for='item in arr' >
			<div class="skinbox_tit">
				<div class="tit_p">
					{{ item.des }}
				</div>
				<div v-text='txt' class="right_p">
				</div>
			</div>
			<div class="img_box">
				<div class="imgbox_sm" v-for='item2 in item.arr1'  @click='showToggle(item2.desp)'>
					<img :src='item2.myurl'>
					<p>
						{{ item2.desp }}
					</p>
				</div>
			</div>
		</div>
		<div class="fix_left" v-bind:class="[isShowing ? blurClass : bkClass]" >
			<div @click='con1'>x</div>
			<div v-for='item in arr3'>{{ item }}</div>
			<div  v-for="item2 in arr2">
				{{item2.data.list[0].title}}
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">

	export default {
		props:{
			txt:{
				default:'查看更多'
			},
			txt2:{

			}
		},
		data:function(){
			return{
				arr:[
					{
						des:'新品来袭',
						arr1:[
							{
								myurl:require("../assets/images/img_03.jpg"),	
								desp:"FILCO(菲尔可)迷彩"
							},
							{
								myurl:require("../assets/images/img_05.jpg"),	
								desp:"FILCO(菲尔可)YUKO粉"
							},
							{
								myurl:require("../assets/images/img_09.jpg"),	
								desp:"FILCO(菲尔可)经典黑"
							},
							{
								myurl:require("../assets/images/img_10.jpg"),	
								desp:"WpStyle"
							}
						]
					},
					{
						des:'经典怀旧',
						arr1:[
							{
								myurl:require("../assets/images/back_03.jpg"),	
								desp:"英雄梦"
							},
							{
								myurl:require("../assets/images/back_05.jpg"),	
								desp:"异星要塞"
							},
							{
								myurl:require("../assets/images/back_09.jpg"),	
								desp:"台球俱乐部"
							},
							{
								myurl:require("../assets/images/back_10.jpg"),	
								desp:"魂斗罗"
							}
						]
					},
				],
				arr2:[],
				arr3:[],
				 isShowing: false,
			      bkClass: 'bk',
			      blurClass: 'blur'
			}
		},
		methods:{
			showToggle:function(desp){
				var _this = this
					_this.arr2 = [];
					_this.arr3 = [];
					_this.arr3.push(desp)
				this.axios.post('https://api.douban.com/v2/movie/in_theaters')
				  .then(function(response){
				     console.log(response.data.list[0].title)
					_this.arr2.push(response)
					_this.isShowing = !_this.isShowing

				  })
				  .catch(function(err){
				    console.log(err);
				  });
			},
			con1:function(){
				this.isShowing = !this.isShowing;

			}
		}

	}
</script>
<style type="text/css">
	.bk {
		right: -999px !important;
		opacity: 0;
	}

	.blur {
	  /*filter: blur(2px);*/
	  right: 0!important;
	  opacity: 1;
	}
	.fix_left{
		position: fixed;
		right:0;
		bottom: 0;
		background: #fff;
	    transition: all 0.6s ease-out;
	    height: 100%;
	    width: 100%;
		z-index: 999;
	}
	.skin_box{
		padding-left: 15px;
		font-size: 14px;
		background: #fff;
		margin-top: 10px;
	}
	.skin_box .skinbox_tit{
		border-bottom: 1px solid #eee;
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		color: #666;
	}
	.skin_box .skinbox_tit .tit_p{
		color: #000;
		font-size: 14px;
	}
	.skin_box .skinbox_tit .right_p{
		padding-right: 15px;
	}
	.img_box{
		padding-right: 15px;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 15px;
	}
	.img_box .imgbox_sm{
		display: flex;
		width: 45%;
		align-items: center;
		flex-direction: column;
		margin-top: 15px;


	}
	.img_box .imgbox_sm img{
		width: 100%;
	}
	.img_box .imgbox_sm p{
		margin-top: 5px;
		color:#666;
	}
</style>
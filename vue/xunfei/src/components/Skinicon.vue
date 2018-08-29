<template>
	<div>
		<ul class="skin_icon">
			<li v-for='(item,index) in arr'  @click='con(item.des,index)'>
				<img :src='item.myurl'>
				<span>{{ item.des }}</span>
			</li>
		</ul>
		<div class="fix_left" v-bind:class="[isShowing ? blurClass : bkClass]" >
			<div class="fix_header">
				<div @click='con1' class="back">
					<img src="../assets/images/back_03.png" alt="">&nbsp;
					返回
				</div>
				<div v-for='item in arr1' class="title1">{{ item }}</div>
			</div>
			<div class="img_box">
				<div class="imgbox_sm" v-for='item3 in arr2[0]'>
				<img :src="item3.img">
					<p>
						{{item3.doc_name}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data:function(){
			return{
				arr:[
				
					{myurl:require("../assets/images/icon_05.jpg"),des:"设计创意"},
					{myurl:require("../assets/images/icon_07.jpg"),des:"清新时尚"},
					{myurl:require("../assets/images/icon_09.jpg"),des:"动漫游戏"},
					{myurl:require("../assets/images/icon_11.jpg"),des:"明星人物"},
					{myurl:require("../assets/images/icon_17.jpg"),des:"音乐皮肤"},
					{myurl:require("../assets/images/icon_18.jpg"),des:"动态皮肤"},
					{myurl:require("../assets/images/icon_19.jpg"),des:"百变皮肤"},
					{myurl:require("../assets/images/icon_20.jpg"),des:"时节气象"}
				],
			arr1:[],
			arr2:[],
			 isShowing: false,
		      bkClass: 'bk',
		      blurClass: 'blur'
			}
		},
		methods:{
			con:function(des,index){
				// this.name = this.des
				var _this = this;
					_this.arr1 = [];
					_this.arr2 = [];
					_this.arr1.push(des);
				this.axios.get('https://api.douban.com/v2/movie/in_theaters')
				  .then(function(response){
					_this.arr2.push(response.data.list)
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
	.skin_icon{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	.skin_icon li{
		width: 25%;
		padding: 10px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.skin_icon li img{
		height: 50px;
		width: 50px;
	}
	.skin_icon li span{
		margin-top: 5px;
		font-size: 12px;

	}
	.fix_header{
		height: 50px;
		width: 100%;
		background: #fff;
		border-bottom: 1px solid #eee;
		text-align: center;
	}
	.back{
		width: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		color:#3783f6;
		font-size: 14px;
		margin-left: 10px;
		float: left;
	}
	.back img{
		width: 10px;
		height: 16px;

	}
	.title1{
		margin:0 auto;
		height: 50px;
		line-height: 50px;
		width: 100px;
	}
</style>
<template>
<div class="all_wrap">
<Slider :pagination-visible="true" :loop='true' :pagination-clickable="true">
	<div class="swiper1_wrap">
		<div class="head_nav">
			<div class="left_msg">
				<img src="http://static.dxshiwan.com/static/img/logo.png"/>			
			</div>
	
			<div class="right_msg">
				<li class="right_nav nav1">
					首页
				</li>			
				<div class="right_nav nav3" @click="go_aboutus">
					商务合作			
				</div>
			</div>
		</div>	        		
		<img class="bg1" src="http://static.dxshiwan.com/static/img/BG1.png"/>
		<p class="BG1_tips">一款随时随地可以赚钱的手机软件</p>
		<div class="BG1_btn" :class="overshow? 'mouseover': ''" @click="showpop" @mouseover="mouseover" @mouseout="mouseout">
			开始赚钱
		</div>	
	</div>
	<div class="swiper2_wrap">
		<img class="head_pic" src="http://static.dxshiwan.com/static/img/BG2_head.png"/>
		<p class="BG2_tips">零投入，现金奖励参与既得</p>
		<img class="bac" src="http://static.dxshiwan.com/static/img/BG2.png"/>
	</div>
	<div class="swiper3_wrap">
		<p class="BG3_tips">支持微信提现</p>
		<p class="BG3_tips tips2">已累计为用户返现20.156.781.03元</p>
		<img src="http://static.dxshiwan.com/static/img/BG3.png"/>
	</div>
	<div class="swiper4_wrap">
		<p class="BG4_tips">邀请好友参与，一起赚钱</p>
		<p class="BG4_tips tips2">把大虾试玩分享给好友，赚得更多</p>
		<img src="http://static.dxshiwan.com/static/img/BG4.png"/>
		<div class="bottom flex_jus_ali">
			<i>2018-2019 北京十三号线信息科技有限公司 京ICP备18037743号</i> 
		</div>		
	</div>		
</Slider>
		<!-- 弹窗 -->
		<div class="shade" v-if="show_pop" @click="closepop"></div>
		<div class="pop" v-if="show_pop">
			<img class="qr_code" src="http://static.dxshiwan.com/static/img/qr_code.png">
			<img class='prawn' src="http://static.dxshiwan.com/static/img/prawn.png">			
			<p>手机扫描二维码，开始赚钱</p>
			<img class="close" src="http://static.dxshiwan.com/static/img/close.png" @click="closepop">
		</div>
		<!-- 鼠标滑过窗口 -->
		<div class="pop overpop" :class="overshow? 'overpop2':''">
			<img class="qr_code" src="http://static.dxshiwan.com/static/img/qr_code.png">
			<img class='prawn' src="http://static.dxshiwan.com/static/img/prawn.png">
			<p>手机扫描二维码，开始赚钱</p>
		</div>	
</div>
</template>

<script>
import Slider from 'vue-plain-slider'
export default{
	name: 'slider-demo',
	components: {Slider },
    data(){
        return {
			show_pop:false,	//显示弹窗
			overshow:false,	//鼠标是否滑过
        }
	},	
    methods: {
		showpop(){			//弹窗
			this.show_pop=true
		},
		closepop(){			//关闭弹窗
			this.show_pop=false
		},
		mouseover(){	
			this.overshow=true
		},
		mouseout(){
			this.overshow=false
		},
		go_aboutus(){
			this.$router.push('/about')
		}
    }
}
</script>

<style scoped>
.all_common_head{
	display: none!important;
}
.all_wrap{
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}
.slider {
  height: 100%;
  width: 100%;
}
.mouseover{
	background: rgb(216,216,216,0.8)!important
}
.shade{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.6);
	z-index: 99;
}
.pop{
	padding-top: 40px;
	position: fixed;
	left: 50%;
	width: 274px;
	height: 314px;
	top: 30vh;
	margin-left: -137px;
	background: white;
	z-index: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 15px;
	border-radius:10px;
	box-sizing: border-box
}
.overpop{
	left: 70%;
	top: 22vh;
	color: #969697;
	font-size: 0.6rem;
	opacity: 0;
	transition: all 0.8s;
}
.overpop2{
	left: 66%;
	opacity: 1!important;
}
.pop .qr_code{
	width:192px;
	height:192px;	
}
.pop .prawn{
	position: absolute;
	left: 50%;
	margin-left: -15px;
	top: 38%
}
.pop .close{
	width: 23px;
	height: 23px;
	position: absolute;
	bottom: -55px;
}
.pop p{
	margin-top: 30px
}
html {
  height: 100%;
  width: 100%;
  display: table;
}
body {
	line-height: 1;
	height: 100%;
	width: 100%;
	overflow-y: hidden;
}

ol, ul {
	list-style: none;
}
.head_nav{
	width: 100%;
	height: 80px;
	background:rgba(51,51,51,1);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	padding: 0 215px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}
.left_msg{
	height: 100%;
}
.left_msg img{
	 height:30px!important ;
	 bottom: 50%!important;
	 margin-bottom: -15px!important;
}
.right_msg{
	height: 100%;
	display: flex;
	align-items: center;
	font-weight: 600
}
.right_nav{
	position: relative;
	cursor: pointer;
}
.right_msg .nav1{
	width:100px;
	height:36px;
	background:white;
	border-radius:20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size:16px;
	font-weight: 600;	
	color: black;
	margin-right: 60px;
}
.right_msg .nav3{
	color: white;
	font-size: 16px;
}
.right_msg .nav2{
	color: white;
	font-size: 16px;
	margin-right: 60px;
}
.right_msg .nav2 .line1{
	display: none;
}

.line1{
	width:100%;
	height:3px;
	background:rgba(255,255,255,1);
	position: absolute;
	bottom: -19px;
}
.head_nav img{
	height: 100%;
}
.swiper-container {
    width: 100%;
    height: 100%;
  	
}

.swiper-pagination{
	position: fixed!important;
}
.swiper1_wrap{
	background-image: linear-gradient(rgba(89,98,252),rgba(8,202,255));
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	position: relative;
}
.swiper1_wrap img{
	bottom: 0;
	position: absolute;
	left: 5%;
}
.bg1{
	width: 86%;
	height: 70%;
	/* left: 50%;
	margin-left: -520px; */
}
.swiper2_wrap{
	background-image: linear-gradient(rgba(245,88,68),rgba(255,179,135));
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	position: relative;
}
.swiper2_wrap .bac{
	bottom: 0;
	left: 50%;
	margin-left: -630px;
	position: absolute;
}
.swiper2_wrap .head_pic{
	top: 0;
	left: 50%;
	margin-left: -334.5px;
	position: absolute;
}
.swiper3_wrap{
	background-image: linear-gradient(rgba(38,212,206),rgba(92,229,181));
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	position: relative;
}
.swiper3_wrap img{
	bottom: 0;
	left: 50%;
	margin-left: -378px;
	position: absolute;
}
.swiper4_wrap{
	background-image: linear-gradient(rgba(255,164,61),rgba(255,199,62));
	width: 100%;
	height: 100vh;
	position: relative;
}
.swiper4_wrap .bottom{
	position: absolute;
	bottom: 0;
	left: 0;
	height:132px;
	width: 100%;
    background:rgba(51,51,51,1);
    color: white;
    font-size:22px;	
}
.swiper4_wrap img{
	bottom: 74px;
	left: 50%;
	margin-left: -356px;
	position: absolute;
}
.BG1_tips{
	text-align: center;
	font-size:48px;
	color: white;
	margin: 140px auto 0;

}
.BG2_tips{
	text-align: center;
	font-size:48px;
	color: white;
	margin: 185px auto 0;	
}
.BG3_tips{
	text-align: center;
	font-size:48px;
	color: white;
	margin: 126px auto 0;	
}
.BG4_tips{
	text-align: center;
	font-size:48px;
	color: white;
	margin: 106px auto 0;		
}
.tips2{
	margin-top: 36px;
}
.BG1_btn{
	width:220px;
	height:56px;
	background:rgba(255,255,255,1);
	border-radius:28px;	
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 36px auto 0;
	font-size: 20px;
	color: #3098FF;
	z-index: 50;
}


</style>

<template>
<div>
    <div class="head_nav">
        <div class="left_msg">
            <img src="http://static.dxshiwan.com/static/img/about_logo.png"/>			
        </div>
        <div class="right_msg">
            <li class="right_nav nav1" @click="go_home">
                首屏
            </li>			
            <li class="right_nav nav2 flex_jus_ali">
                商务合作
                <div class="line1">
                </div>					
            </li>
        </div>
    </div>	

    <div class="head_wrap">
        <img class="big_word" src="http://static.dxshiwan.com/static/img/big_word.png">
        <p class="tips">专业的APP试玩平台</p>
        <p class="tips">开发者提供最专业的ASO搜素优化服务</p>
        <img class="contact" @click="contact_us" src="http://static.dxshiwan.com/static/img/contack.png">
    </div>

    <div class="mid_content flex_column_center">
        <p class="title">我们的服务</p>
        <div class="mid_banner flex">
            <i class="line"></i>
            <p>OUR SERVICE</p>
            <i class="line"></i>
        </div>
        <div class="service flex_between">
            <div class="item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/onload.png">
                <p>获取优质流量</p>
                <i>100%真实用户下载安装，在短时间内完成大量级CPA或指定用户行为CPSA,达到推广目标</i>
            </div>
            <div class="item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/rank.png">
                <p>提升榜单排名</p>
                <i>提升免费、付费、总榜、分类榜排名，获得大量品牌曝光，提升产品影响力及自然下载量。</i>
            </div>
            <div class="item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/ASO.png">
                <p>优化ASO排名</p>
                <i>提升免费、付费、总榜、分类榜排名，获得大量品牌曝光，提升产品影响力及自然下载量。</i>
            </div>                        
        </div>
    </div>

    <div class="mid_content ouruser_wrap flex_column_center">
        <p class="title">服务的客户</p>
        <div class="mid_banner flex">
            <i class="line"></i>
            <p>OUR CUSTOMER</p>
            <i class="line"></i>
        </div>
        <div class="icon_wrap flex_between">
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/shuxiang.png" >
                <i>书香云集</i>
            </div>
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/wannian.png" >
                <i>万年历</i>
            </div>
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/wether.png" >
                <i>中央天气预报</i>
            </div>
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/map.png" >
                <i>百度地图</i>
            </div>  
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/baye.jpg" >
                <i>霸业单机</i>
            </div>                                                             
        </div>
        <div class="icon_wrap flex_between">
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/go_where.png" >
                <i>去哪儿</i>
            </div>
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/QQ_read.png" >
                <i>QQ阅读</i>
            </div>
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/mgTV.png" >
                <i>芒果TV</i>
            </div>
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/momo.png" >
                <i>默默</i>
            </div>  
            <div class="icon_item flex_column_center">
                <img src="http://static.dxshiwan.com/static/img/huajiao.jpg" >
                <i>花椒直播</i>
            </div>                                                           
        </div>            
    </div>

    <div class="mid_content about_us flex_column_center">
        <p class="title">关于我们</p>
        <div class="mid_banner flex">
            <i class="line"></i>
            <p>ABOUT US</p>
            <i class="line"></i>
        </div>    
        <img src="http://static.dxshiwan.com/static/img/reduce.png"> 
    </div>

    <div class="mid_content contact_us flex_column_center">
        <p class="title">联系我们</p>
        <div class="mid_banner flex">
            <i class="line"></i>
            <p>CONTACT US</p>
            <i class="line"></i>
        </div>    
        <div>
            <div class="contact_item mt73">
                <img src="http://static.dxshiwan.com/static/img/email.png" >
                <p>Email：business@13line.com</p>
            </div>
            <div class="contact_item">
                <img src="http://static.dxshiwan.com/static/img/QQ.png" >
                <p>QQ：2290747606 </p>
            </div>
            <div class="contact_item">
                <img src="http://static.dxshiwan.com/static/img/location.png" >
                <p>地址：北京市昌平区回龙观龙域中街1号院一号楼龙域中心B座506 </p>
            </div>
        </div>
    </div>    

    <div class="bottom flex_jus_ali">
        <i>2018-2019 北京十三号线信息科技有限公司 京ICP备18037743号</i> 
    </div>
</div>    
</template>

<script>
    export default{
    data(){
        return {

        }
    },
    methods: {
		go_home(){
			this.$router.push('/PC')
        },
        contact_us(){
            window.scrollTo(0,document.documentElement.scrollHeight)
        }
    }

    }
</script>

<style scoped>
.head_nav{
	width: 100%;
	height: 80px;
	background:rgba(51,51,51,1);
	z-index: 10;
	padding: 0 215px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}
.left_msg{
    height: 100%;
    display: flex;
    align-items: center;
}
.left_msg img{
	 height:45px!important ;
}
.right_msg{
	height: 100%;
	display: flex;
	align-items: center;

}
.right_nav{
	position: relative;
	cursor: pointer;
}
.right_msg .nav3{
	width:100px;
	height:36px;
	background:white;
	border-radius:20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size:16px;
	font-weight: 600;
}
.right_msg .nav2{
	color: black;
	font-size: 16px;
    margin-right: 60px;
    width:100px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:20px;    
    font-weight: 600
}
.right_msg .nav2 .line1{
	display: none;
}
.right_msg .nav1{
	color: white;
	font-size: 16px;
	margin-right: 60px;
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
.head_wrap{
    width: 100%;
    height: 774px;
    background: url('http://static.dxshiwan.com/static/img/head_bac.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 188px;
    box-sizing: border-box;
}
.big_word{
    width: 407px;
    margin-bottom: 20px;
}
.head_wrap .tips{
    font-size: 38px;
    line-height: 56px;
    color: white;
}
.contact{
    width: 267px;
    margin-top: 60px;
}
.mid_content{
    width: 100%;
    height: 774px;
    box-sizing: border-box;
    padding: 133px 360px 0;
    background: #FAFAFA;
}
.mid_content .title{
    color: #4497FD;
    font-size: 38px;
    text-align: center;
}
.mid_banner{
    align-items: center;
    margin-top: 20px;
}
.mid_banner i{
    display: inline-block;
    width:200px;
    height:1px;
    background:rgba(204,204,204,1);
}
.mid_banner p{
    font-size: 24px;
    color: #CCCCCC;
    margin: 0 43px;
    white-space: nowrap;
}
.service{
    width: 100%;
    margin-top: 70px;
}
.service .item img{
    width: 160px;
    height: 160px;
}
.service .item p{
    font-size: 24px;
    color: #555555;
    margin: 43px 0 21px
}
.service .item i{
    font-size:18px;
    color:rgba(153,153,153,1);
    line-height:26px;
    width: 260px;
}
.ouruser_wrap{
    height: 877px;
    background: white;
    padding-left: 400px;
    padding-right: 400px;
}
.icon_wrap{
    width: 100%;
    margin-top: 74px;
}
.icon_item img{
    width: 133px;
    height: 133px;
}   
.icon_item i{
    font-size:24px;
    color:rgba(85,85,85,1);  
    margin-top: 20px; 
}
.about_us{
    height: 546px;
    background: #FAFAFA;
}
.about_us img{
    width: 1000px;
    margin-top: 63px;
}
.contact_us{
    height: 760px;
    background: white;
}
.contact_item{
    display: flex;
    align-items: center;
    margin-bottom: 40px
}
.contact_item img{
    width: 53px;
    height: 53px;
    margin-right: 44px
}
.contact_item p{
    font-size:38px;
    color:rgba(102,102,102,1);
    width: 704px;
    line-height:64px;
}
.mt73{
    margin-top: 73px;
}
.bottom{
    height:132px;
    background:rgba(51,51,51,1);
    color: white;
    font-size:22px;
}
</style>

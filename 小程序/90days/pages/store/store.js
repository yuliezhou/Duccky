const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
    	imgUrls:['../../images/swiper.png','../../images/swiper.png','../../images/swiper.png'],
    	areaList:['重庆','成都'],
    	storeList:[
			{
				imgurl:'../../images/swiper.png',
				name:'重庆光电园1',
				address:'重庆市渝北区龙山街道冉家坝 爱奇艺9楼'
			},
			{
				imgurl:'../../images/swiper.png',
				name:'重庆光电园2',
				address:'重庆市渝北区龙山街道冉家坝 爱奇艺9楼重庆市渝北区龙山街道冉家坝 爱奇艺9楼'
			},
			{
				imgurl:'../../images/swiper.png',
				name:'重庆光电园3',
				address:'重庆市渝北区龙山街道冉家坝 爱奇艺9楼'
			},
			{
				imgurl:'../../images/swiper.png',
				name:'重庆光电园4',
				address:'重庆市渝北区龙山街道冉家坝 爱奇艺9楼'
			},
    	]
    },
    onLoad: function(res) {

    },
    //回到首页
    backIndex:function(){
    	console.log(1)
        wx.switchTab({
             url: '../index/index',
         })  
    }
})
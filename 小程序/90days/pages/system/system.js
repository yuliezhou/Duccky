const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
    	chooseIdx:0,
		typeList:[
			{
				id:1,//用于网络请求
				name:'健身小白'
			},
			{
				id:2,
				name:'一键减脂'
			},
			{
				id:3,
				name:'增肌达人'
			},
			{
				id:4,
				name:'塑形美体'
			},
			{
				id:5,
				name:'健身小白'
			},
		],
		courseList:[
			{
				imgurl:'../../images/swiper.png',
				title:'腹肌塑造初级',
				des:'找到腹肌发力的感觉'
			},
			{
				imgurl:'../../images/swiper.png',
				title:'有氧操·Fit 01',
				des:'零基础有氧课程'
			},
			{
				imgurl:'../../images/swiper.png',
				title:'热舞操·燃脂爵士 01',
				des:'能让你变瘦的热舞'
			},
		],
    },
    onLoad: function(res) {

    },
    chooseType:function(res){
    	var id = res.currentTarget.dataset.id;
    	this.setData({
    		chooseIdx:id
    	})		
    }
})
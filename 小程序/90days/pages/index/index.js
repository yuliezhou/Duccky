const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
    	imgUrls:['../../images/swiper.png','../../images/swiper.png','../../images/swiper.png'],
    	today:'',
		courseIdx:1,
		courseList1:[
			{
				timer:'14:40',
				courseTitle:'高效燃脂11',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true,
				tagShow:true
			},
			{
				timer:'14:50',
				courseTitle:'高效燃脂12',
				course_p:'塑形·舞蹈·体态纠正2',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:false,
				tagShow:false
			},
		],
		courseList2:[
			{
				timer:'14:40',
				courseTitle:'高效燃脂21',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true,
				tagShow:false
			},
			{
				timer:'14:50',
				courseTitle:'高效燃脂22',
				course_p:'塑形·舞蹈·体态纠正2',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:false,
				tagShow:true
			},
		],
		courseList3:[
			{
				timer:'14:40',
				courseTitle:'高效燃脂31',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true,
				tagShow:true
			},
			{
				timer:'14:50',
				courseTitle:'高效燃脂32',
				course_p:'塑形·舞蹈·体态纠正2',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:false,
				tagShow:false
			},
		],  
		dateList:[
			{
				date:31,
				week:'周五'
			},
			{
				date:1,
				week:'周六'
			},
			{
				date:2,
				week:'周日'
			},
			{
				date:3,
				week:'周一'
			},
			{
				date:4,
				week:'周二'
			},
			{
				date:5,
				week:'周三'
			},
			{
				date:6,
				week:'周四'
			},
		]  	
    },
    onLoad: function(res) {
		var date = new Date();
		var today = date.getDay();
		this.setData({
			today:today
		})
    },
    //筛选课程
    chooseCourse:function (res) {
    	var id = res.currentTarget.dataset.id;
    	this.setData({
    		courseIdx:id
    	})
    },    
    //预约
    reserve:function () {
		wx.showToast({
		      title: '预约成功',
		      icon: "none",
		      duration: 1500
		  });     	
    },
    //跳转门店
    toStore:function(){
		wx.navigateTo({
       		 url: '../store/store',
   		 }) 
   	},
    //跳转详情
    toDetails:function(){
		wx.navigateTo({
       		 url: '../course-details/course-details',
   		 })     	
    }   	  	
})

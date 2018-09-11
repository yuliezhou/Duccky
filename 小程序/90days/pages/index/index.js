const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
    	imgUrls:['../../images/swiper.png','../../images/swiper.png','../../images/swiper.png'],
    	today:'',
    	dateIdx:0,
		courseIdx:1,
		medalModal:true,//勋章弹窗
		courseList1:[
			{
				timer:'14:40',
				coursetype:'',
				courseTitle:'高效燃脂11',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true,
				tagShow:true
			},
			{
				timer:'14:50',
				coursetype:'single',
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
				coursetype:'single',
				courseTitle:'高效燃脂21',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true,
				tagShow:false
			},
			{
				timer:'14:50',
				coursetype:'',
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
				coursetype:'single',
				courseTitle:'高效燃脂31',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true,
				tagShow:true
			},
			{
				timer:'14:50',
				coursetype:'single',
				courseTitle:'高效燃脂32',
				course_p:'塑形·舞蹈·体态纠正2',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:false,
				tagShow:false
			},
		],  
		dateList:[
			{
				date:6,
				week:'周四'
			},
			{
				date:7,
				week:'周五'
			},
			{
				date:8,
				week:'周六'
			},
      {
        date: 9,
        week: '周日'
      },
      {
        date: 10,
        week: '周一'
      },
      {
        date: 11,
        week: '周二'
      },
      {
        date: 12,
        week: '周三'
      },
		]  	
    },
    onLoad: function(res) {
    	var dateList = this.data.dateList;
		var date = new Date();
		var today = date.getDate();
		console.log(today)
		var dateIdx;
		for(var i=0;i<dateList.length;i++){
			if(today == dateList[i].date){
				dateIdx = i
			}
		}
		this.setData({
			dateIdx:dateIdx,
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
    reserve:function (res) {
    	var coursetype = res.currentTarget.dataset.coursetype;
		wx.navigateTo({
       		 url: `../pay/pay?coursetype=${coursetype}`,
   		 }) 		     	
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
    },
    //跳转勋章墙
    toMedalWall:function(){
		wx.navigateTo({
       		 url: '../medalwall/medalwall',
   		 })    	
    },
    //日期选择
    dateChoose:function(res){
    	var courseIdx = this.data.courseIdx;
    	if(courseIdx!=3){
	    	var id = res.currentTarget.dataset.id;
	    	this.setData({
	    		dateIdx:id
	    	})
    	}
    },
    //关闭勋章弹窗
    closeMedal:function(){
    	this.setData({
    		medalModal:false
    	})
    }  	  	
})

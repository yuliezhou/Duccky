const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
		courseIdx:1,
		modalShow:false,
		courseList1:[
			{
				date:'8月16日',
				week:'周一',
				timer:'14:40',
				courseTitle:'高效燃脂11',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true
			},
			{
				date:'8月17日',
				week:'周二',
				timer:'14:50',
				courseTitle:'高效燃脂12',
				course_p:'塑形·舞蹈·体态纠正2',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:false
			},
		],
		courseList2:[
			{
				date:'8月16日',
				week:'周一',
				timer:'14:40',
				courseTitle:'高效燃脂21',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true
			},
			{
				date:'8月17日',
				week:'周二',
				timer:'14:50',
				courseTitle:'高效燃脂22',
				course_p:'塑形·舞蹈·体态纠正2',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:false
			},
		],
		courseList3:[
			{
				date:'8月16日',
				week:'周一',
				timer:'14:40',
				courseTitle:'高效燃脂31',
				course_p:'塑形·舞蹈·体态纠正1',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:true
			},
			{
				date:'8月17日',
				week:'周二',
				timer:'14:50',
				courseTitle:'高效燃脂32',
				course_p:'塑形·舞蹈·体态纠正2',
				coursePrice:'18:00-19:00 ¥69',
				viewBool:false
			},
		],
    },
    onLoad: function(res) {

    },
    chooseCourse:function (res) {
    	var id = res.currentTarget.dataset.id;
    	this.setData({
    		courseIdx:id
    	})
    },
    viewQR:function () {
    	this.setData({
    		modalShow:true
    	})
    },
    closeModal:function(){
    	this.setData({
    		modalShow:false
    	})    	
    },
    reserve:function () {
      wx.showToast({
          title: '预约成功',
          icon: "none",
          duration: 1500
      });     	
    }    
})
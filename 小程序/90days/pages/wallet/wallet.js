const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
		recordingIdx:1,
		rechargeList:[
			{
				time:'2018-08-13 23:12',
				price:19
			},
			{
				time:'2018-08-13 23:12',
				price:2
			},
			{
				time:'2018-08-13 23:12',
				price:500
			},
		],
		costList:[
			{
				time:'2018-08-13 23:12',
				price:10
			},
			{
				time:'2018-08-13 23:12',
				price:200
			},
			{
				time:'2018-08-13 23:12',
				price:500
			},
		],
    },
    onLoad: function(res) {

    },
    //跳转到充值页面
    toRecharge:function(){
        wx.navigateTo({
            url: '../recharge/recharge',
        })
    },
    //选择记录类型
	chooseRecording:function(res){
    	var id = res.currentTarget.dataset.id;
    	this.setData({
    		recordingIdx:id
    	})
	}
})
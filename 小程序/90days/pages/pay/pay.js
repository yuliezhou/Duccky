const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
		coursetype:'single'
    },
    onLoad: function(res) {
		// 通过路径传递参数 -->我约定为coursetype-->可以自己约定(用于判断页面显示为单次课程还是其他,默认可以不传)
		var coursetype = res.coursetype;	
		if(!!coursetype){
			this.setData({
				coursetype:coursetype
			})
		}	
    }
})
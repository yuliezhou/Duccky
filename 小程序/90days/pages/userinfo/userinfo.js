const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
    	enddate: '',
    },
    onLoad: function(res) {
        //设置结束日期
        var enddate = this.getnowdate();
        console.log(enddate)
        this.setData({
        	enddate:enddate
        })
    },
	// 获取当前时间
	 getnowdate:function () {
	  var myTime = new Date();
	  var iYear = myTime.getFullYear();
	  var iMonth = myTime.getMonth() + 1;
	  var iDate = myTime.getDate();
	  var str = iYear + '-' + this.toTwo(iMonth) + '-' + this.toTwo(iDate);
	  return str
	},
	toTwo:function(n){
		return n < 10 ? '0' + n : '' + n;
	},
	//返回上一页
	backUp:function(){
		wx.switchTab({
		  url: '../personal/personal'
		})		
	}
})
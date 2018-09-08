const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {

    },
    onLoad: function(res) {
		// 通过路径传递参数 -->我约定为coursetype-->可以自己约定(用于判断页面显示为单次课程还是其他,默认可以不传)
		var coursetype = res.coursetype;	
		if(!!coursetype){
			this.setData({
				coursetype:coursetype
			})
		}	
    },
    addNum:function(){
    	var peopleNum = this.data.peopleNum;
    	// 限制个数最多为99-->可以修改
    	if(peopleNum<99){
    		peopleNum++;
	    	this.setData({
	    		peopleNum:peopleNum
	    	})
    	}
    },
    cutNum:function(){
    	var peopleNum = this.data.peopleNum;
    	// 限制个数最小为99-->可以修改
    	if(peopleNum>1){
    		peopleNum--;
	    	this.setData({
	    		peopleNum:peopleNum
	    	})
    	}
    }
})
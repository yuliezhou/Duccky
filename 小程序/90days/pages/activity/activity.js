const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {

    },
    onLoad: function(res) {
    	var type = res.type;
    	this.setData({
    		type:type
    	})
    },

})
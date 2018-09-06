const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
        modalShow: false
    },
    onLoad: function(res) {

    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
	        this.setData({
	            modalShow: true
	        })            
        }
        return {
            title: '抽奖吧',
            path: '/page/user?id=123'
        }
    },
    lottery: function() {
        this.setData({
            modalShow: false
        })
    }
})
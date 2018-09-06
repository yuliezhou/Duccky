const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {

    },
    onLoad: function(res) {

    },
    //跳转分享页面
    toShare:function(){
 		wx.navigateTo({
       		 url: '../share-details/share-details',
   		 })    	
    }
})
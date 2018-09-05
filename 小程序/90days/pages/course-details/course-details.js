const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {

    },
    onLoad: function(res) {

    },
    toShare:function(){
 		wx.navigateTo({
       		 url: '../share-details/share-details',
   		 })    	
    }
})
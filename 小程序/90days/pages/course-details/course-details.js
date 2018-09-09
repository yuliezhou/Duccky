const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
      collectBool:false
    },
    onLoad: function(res) {

    },
    //跳转分享页面
    toShare:function(){
 		wx.navigateTo({
       		 url: '../share-details/share-details',
   		 })    	
    },
    toPay:function(){
  		wx.navigateTo({
       		 url: '../pay/pay',
   		 })    	
    },
    //收藏
    collect:function(){
      var collectBool = this.data.collectBool;
      wx.showToast({
        title: collectBool?'取消收藏':'已收藏',
        icon:'none',
        duration: 2000
      }) 
      this.setData({
        collectBool:!collectBool
      })
    }
})
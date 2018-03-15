// pages/area/area.js
Page({
  data:{
    a: 1
  },
  onLoad: function(options){
    console.log('area onLoad')
  },
  onReady: function(){
    console.log('area onReady') 
  },
  onShow: function(){
    console.log('area onShow') 
  },
  onHide: function(){
    console.log('area onHide') 
  },
  onUnload: function(){
    console.log('area onUnload') 
  },
  goBack: function(){  
    wx.redirectTo({
      url:'../index/index',
      success: function(res){
        wx.setStorage({
          key: 'currentArea',
          data: '北京'
        })
      }
    })
  }
})
//index.js
//获取应用实例
const app = getApp()
//豆瓣电影top250
var top250_url = 'https://api.douban.com/v2/movie/top250?star=0&count=10';
//正在上映
var ing_url = 'https://api.douban.com/v2/movie/in_theaters';
//即将上映
var soon_url = 'https://api.douban.com/v2/movie/coming_soon';
//北美票房榜
var usa_url = 'https://api.douban.com/v2/movie/us_box';
Page({
  data: {
    movies:[],
  },
  onReachBottom:function(){
    
  },
  onLoad:function(){
    var _this = this
    wx.showToast({
      title: "加载中...",
      icon:"loading",
      duration:3000
    });
    //初始化请求豆瓣电影top250
    wx.request({
      url: top250_url,
      data:{},
      header:{
         'Content-Type': 'application/json' // 默认值
      },
      success:function(res){
          var data = res.data;
          _this.setData({
            movies:data.subjects
          })
      }
    })
    //初始化请求正在上映电影
      wx.request({
      url: ing_url,
      data:{},
      header:{
         'content-type': 'json' // 默认值
      },
      success:function(res){
         
          var data = res.data;
          _this.setData({
            movies_ing:data.subjects
          })
      }
    })
    //初始化请求即将上映电影
      wx.request({
      url: soon_url,
      data:{},
      header:{
         'content-type': 'json' // 默认值
      },
      success:function(res){
          var data = res.data;
          _this.setData({
            movies_soon:data.subjects
          })
      }
    })    
    //初始化请求北美票房榜
      wx.request({
      url: usa_url,
      data:{},
      header:{
         'content-type': 'json' // 默认值
      },
      success:function(res){
        wx.hideToast()
          var data = res.data;
          _this.setData({
            movies_usa:data.subjects
          })
      }
    })
  }
})

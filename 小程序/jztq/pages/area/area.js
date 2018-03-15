// pages/area/area.js
var area_list=[];
var app = getApp()
var md5 = require('../index/md5.js')
var util = require('../../utils/util.js')
var getWeatherImage = util['getWeatherImage']
var prepareAllCityCode = util['prepareAllCityCode']
Page({
  data:{
    default_img:"http://oi2f6lsr3.bkt.clouddn.com/%E6%96%B0%E9%BB%98%E8%AE%A4icon.png",
    isLongTap:false,
    allCityCode: {status: 'init'},
    favoriteAreaList: [],
    loadingHidden: false,
  },
  onLoad: function(options){
    console.log('area onLoad')
    //prepareAllCityCode(this)
  },
  onReady: function(){
    console.log('area onReady') 
    var thisPage = this
    wx.getStorage({
      key: 'favoriteAreaList',
      success: function(res){ 
        app.globalData.favoriteAreaList = res.data 
      }
    })
      thisPage.setData({
        favoriteAreaList: app.globalData.favoriteAreaList,
        loadingHidden: true
        })
      thisPage.getTempList()
      /*
      if(app.globalData.currentArea==null){
        thisPage.getLocation()
      }else{
        thisPage.setData({currentArea: app.globalData.currentArea})
      } 
      */ 
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
  goBack: function(cityName){
    var thisPage = this
    wx.redirectTo({
      url: '../index/index',
      success: function(res){
        wx.setStorage({
          key: 'currentArea',
          data: cityName
        })
        wx.setStorage({
          key: 'favoriteAreaList',
          data: thisPage.data.favoriteAreaList
        })
        app.globalData.favoriteAreaList=thisPage.data.favoriteAreaList
        app.globalData.currentArea=cityName
        let favoriteAreaList = thisPage.data.favoriteAreaList
        for (var i = 0; i < favoriteAreaList.length; i++) {
          if (favoriteAreaList[i].cityName == cityName) {
            wx.setStorageSync("currentCityIdKey", favoriteAreaList[i].cityId);
            thisPage.setDefault(cityName);
          }
        }  
      }
    })   
  },
  setDefault: function(cityName) {
    var favoriteAreaList = this.data.favoriteAreaList
    for (var i = 0; i < favoriteAreaList.length; i++){
      if (favoriteAreaList[i].cityName == cityName) {
        favoriteAreaList[i].isDefault = true
      } else {
        favoriteAreaList[i].isDefault = false
      }
    }    
    wx.setStorage({
      key: 'favoriteAreaList',
      data: favoriteAreaList
    })
    this.setData({
      favoriteAreaList: favoriteAreaList
    })
     app.globalData.favoriteAreaList=favoriteAreaList    
  },
  tapArea: function(e) {
    var cityName = e.currentTarget.id
    if (this.data.isLongTap) {
      this.setDefault(cityName)      
    } else {
      this.goBack(cityName)
    }
  },
  // bindViewTap: function(){
  //   var page =  getCurrentPages();
  //   if(page.length<3){
  //     wx.navigateTo({
  //       url: '../add_area/add_area'
  //     });
  //   }else{
  //     wx.redirectTo({
  //        url: '../add_area/add_area'
  //     })
  //   }
  // },
  longtap: function(e){
    this.setData({
      isLongTap: !this.data.isLongTap
    })
  },
  close: function(e){
    var favoriteAreaList = this.data.favoriteAreaList
    var close = e.target.dataset.close;
    for (var n = 0; n <  favoriteAreaList.length; n++){
      if (favoriteAreaList[n].cityName == close){
        favoriteAreaList.splice(n,1)
      }
    }  
    this.setData({
      favoriteAreaList: favoriteAreaList
    })
    wx.setStorage({
      key: 'favoriteAreaList',
      data: favoriteAreaList
    })
    app.globalData.favoriteAreaList=favoriteAreaList        
  },
  getTempList: function() {
    for (var i = 0; i < this.data.favoriteAreaList.length; i++) {
      console.log(this.data.favoriteAreaList[i])
      var temp = new Date().valueOf() - this.data.favoriteAreaList[i].lastUpdateArea
      if (temp > 120*1000) {
        this.getTemp(this.data.favoriteAreaList[i])
        console.log('area network...')
      }
    }
  },
  getTemp: function(x){
    // console.log(x);
    var thisPage=this
    wx.request({
      url: 'https://admin.melonblock.com/Weather/v2/all',
      data: {
        city: x.cityId,
        key: md5(x.cityId+"all"+"ninetonweather2016"),
        language: 'zh-chs',
        aqi: 'city',
        alarm: '1'
      },
      success: function(res) {
        var data = res.data.weather[0].future[0]
        var areaObj = x
        areaObj.src = getWeatherImage(data.text.split("/")[0])
        areaObj.high = data.high
        areaObj.low = data.low
        areaObj.lastUpdateArea = new Date().valueOf()
        // console.log(areaObj)
        //担心异步更新会出错，所以循环3次
        for(var i = 0; i < 3; i++){
          if (thisPage.updateTemp(areaObj)) {
            break
          }
        }
      },
      fail: function(res) {
        wx.redirectTo({
          url:'../notfound/notfound'
        })
      }                                                         
    })
  },
  updateTemp: function(areaObj){
    var favoriteAreaList = this.data.favoriteAreaList
    var favoriteAreaListCheck = this.data.favoriteAreaList
    for (var i = 0; i < favoriteAreaList.length; i++){
      if (favoriteAreaList[i].cityName == areaObj.cityName){
        favoriteAreaList[i] = areaObj
        break
      }
    }
    if (favoriteAreaListCheck == this.data.favoriteAreaList){
      this.setData({
        favoriteAreaList: favoriteAreaList
      })
      return true
    }
    return false
  },
  back_index:function(){
    var defaultArea = ''
    var thisPage = this
    for (var i = 0; i < this.data.favoriteAreaList.length; i++) {
      if (this.data.favoriteAreaList[i].isDefault) {
        defaultArea = this.data.favoriteAreaList[i].cityName
        break
      }
    }
    wx.redirectTo({
      url: '../index/index',
      success: function(res){
        wx.setStorage({
          key: 'currentArea',
          data: defaultArea
        })
        wx.setStorage({
          key: 'favoriteAreaList',
          data: thisPage.data.favoriteAreaList
        })
        app.globalData.favoriteAreaList=thisPage.data.favoriteAreaList   
        app.globalData.currentArea = defaultArea
        let favoriteAreaList = thisPage.data.favoriteAreaList
        for (var i = 0; i < favoriteAreaList.length; i++) {
          if (favoriteAreaList[i].isDefault) {
            wx.setStorageSync("currentCityIdKey", favoriteAreaList[i].cityId);
          }
        }      
      }
    })
  }
})
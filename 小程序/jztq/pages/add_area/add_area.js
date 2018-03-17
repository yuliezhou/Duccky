// pages/add_area/add_area.js
var util = require('../../utils/util.js')
var distinct = util['distinct']
var prepareAllCityCode = util['prepareAllCityCode']
var getCityCode = util['getCityCode']
var areaList = [['重庆', 'WM7B0X53DZW2'], ['北京', 'WX4FBXXFKE4F'], ['上海', 'WTW3SJ5ZBJUY'], ['天津', 'WWGQDCW6TBW1'], ['沈阳', 'WXRVB9QYXKY8'], ['大连', 'WWYMRT0VRMUG'], ['长春', 'WZC1EXZ0P9HU'], ['哈尔滨', 'YB1UX38K6DY1'], ['郑州', 'WW0V9QP93VS8'], ['武汉', 'WT3Q0FW9ZJ3Q'], ['长沙', 'WT029G15ETRJ'], ['广州', 'WS0E9D8WN298'], ['深圳', 'WS10730EM8EV'], ['南京', 'WTSQQYHVQ973'], ['杭州', 'WTMKQ069CCJ7'], ['福州', 'WSSU6EXX52RE'], ['成都', 'WM6N2PM3WY2K'], ['济南', 'WWE0TGW4PX6N'], ['石家庄', 'WWC2MYYCM6J5'], ['南昌', 'WT47HJP3HEMP'], ['昆明', 'WK3N92NQV6RQ'], ['呼和浩特', 'WRR2Q2Z7CXWM'], ['贵阳', 'WKEZD7MXE04F'], ['兰州', 'WQ3V4QR6VR6G']]
var app=getApp()
Page({
  data:{
    area: areaList,
    searchAreas: [],
    isInput: false,
    autoLocation: false,
    currentArea: '未定位', 
    currentCityId : '',
    favoriteAreaList: [],
    locationSuccessHidden: true,
    locationFailHidden: true,
    allCityCode: {status: 'init'},
  },
  onLoad:function(options){
    var thisPage = this
    console.log('add_area onLoad')
    //prepareAllCityCode(this)
    wx.getStorage({
      key: 'favoriteAreaList',
      success: function(res){
        thisPage.setData({
          favoriteAreaList: res.data
        })        
      }
    })
    thisPage.setData({
      favoriteAreaList:app.globalData.favoriteAreaList
    })
  },
  onReady:function(){
    console.log('add_area onReady')    
  },
  onShow:function(){
    console.log('add_area onShow')
  },
  onHide:function(){
    console.log('add_area onHide')
  },
  onUnload:function(){
    console.log('add_area onUnload')
  },
  onPullDownRefresh: function() {
    console.log('add_area onPullDownRefresh');
  },
  onReachBottom: function() {
    console.log('add_area onReachBottom');
  },
  onShareAppMessage: function() {
    console.log('add_area onShareAppMessage');
  },
  tapDefaultCity: function(e) {
    let index = e.currentTarget.id
    let cityName = this.data.area[index][0]
    let cityId = this.data.area[index][1]
    this.openIndex(cityId, cityName)
  },
  tapSearchCity: function (e) {
    let cityId = e.currentTarget.id
    let cityName = ""
    for (var i = 0; i < this.data.searchAreas.length; i++) {
      if (this.data.searchAreas[i].cityid == cityId) {
        cityName = this.data.searchAreas[i].cityname
      }
    }
    this.openIndex(cityId, cityName)
  },
  openIndex: function (cityId, cityName) {
    var isExist = false
    var favoriteAreaList = this.data.favoriteAreaList
    for (var i = 0; i < favoriteAreaList.length; i++) {
      favoriteAreaList[i].isDefault = false
    }
    for (var i = 0; i < favoriteAreaList.length; i++) {
      if (favoriteAreaList[i].cityId == cityId) {
        isExist = true
        favoriteAreaList[i].isDefault = true
      }      
    }
    if (!isExist) {
      favoriteAreaList.push({
        cityName: cityName,
        cityId: cityId,
        src: '../images/temp_icon/lunar.png',
        high: 10,
        low: 5,
        isDefault: true,
        lastUpdateArea: 0,
        lastUpdateIndex: 0,
      })
    }
    wx.redirectTo({
      url: '../area/area',
      success: function(res){
        wx.setStorage({
          key: 'currentArea',
          data: cityName
        })
        wx.setStorage({
          key: 'favoriteAreaList',
          data: favoriteAreaList
        })
      app.globalData.favoriteAreaList=favoriteAreaList
      app.globalData.currentArea=cityName              
      }
    })
  },
  feed: function(e){
    var value = e.detail.value;
    if(value == "") {
      this.setData({
        isInput:false,
        searchAreas: [] 
      })
      return
    }

    let thisPage = this;

    thisPage.setData({
      isInput: true
    });

    wx.request({
      url: 'https://newweather.nineton.cn/index/geosearch.json',
      data: {
        keyword: value
      },
      success: function (res) {
        thisPage.setData({ searchAreas: res.data.data })
        console.log(res.data.data);

        /*
        if (res.data.status_code == 'AP010010') {
          thisPage.setData({
            currentArea: '定位失败',
            locationFailHidden: false
          })
          return
        }
        thisPage.setData({
          currentArea: res.data.results[0].location.name,
          currentCityId: res.data.results[0].location.id,
          locationSuccessHidden: false
        })
        thisPage.setData({ autoLocation: false })
        */
      },
      fail: function (res) {
        /*
        thisPage.setData({
          currentArea: '定位失败',
          locationFailHidden: false
        })
        thisPage.setData({ autoLocation: false })
        */
      }
    });

    return;
    var searchList = [];
    if (this.data.allCityCode.status != 'init') {
      searchList = this.data.allCityCode.cityList.filter(function(item){
        return item.cityname.indexOf(value) != -1
      }).map(function(item){
        return item.cityname
      })
    } else {
      for(var i = 0; i < areaList.length; i++){
        if(areaList[i][0].indexOf(value) != -1){
          searchList.push(areaList[i][0])
        }
      }
    }
    searchList = distinct(searchList)
    console.log(searchList)
    this.setData({
      searchAreas:searchList
    })
    this.setData({
      isInput:true,
    })
  },
  getLocation: function() {
    var thisPage = this
    this.setData({autoLocation: true})
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        wx.request({
          url: 'https://api.seniverse.com/v3/weather/now.json',
          data: {
            location: res.latitude + ':' + res.longitude,
            key: 'DEE0GZ5YKL',
            language: 'zh-chs',
            unit: 'c'
          },
          success: function(res) {
            if (res.data.status_code == 'AP010010'){
              thisPage.setData({
                currentArea: '定位失败',
                locationFailHidden: false
              })
              return
            }
            thisPage.setData({
              currentArea: res.data.results[0].location.name,
              currentCityId: res.data.results[0].location.id,
              locationSuccessHidden: false
            })
            thisPage.setData({autoLocation: false})  
          },
          fail: function(res) {
            thisPage.setData({
              currentArea: '定位失败',
              locationFailHidden: false
            })
            thisPage.setData({autoLocation: false})  
          }
        })
      },
      fail: function(msg){
       
        thisPage.setData({
          currentArea: '定位失败',
          locationFailHidden: false
        })
        thisPage.setData({autoLocation: false})  
      }
    })
  },
  locationSubmit: function() {
    this.setData({
      locationSuccessHidden: true
    })
    this.openIndex(this.data.currentCityId, this.data.currentArea);
  },
  locationCannel: function() {
    this.setData({
      currentArea: '放弃定位',
      locationSuccessHidden: true
    })
  },
  locationFail: function() {
    this.setData({
      locationFailHidden: true
    })
  },
  back_index:function(){
    
    wx.redirectTo({
      url: '../area/area',
    })
  }
})
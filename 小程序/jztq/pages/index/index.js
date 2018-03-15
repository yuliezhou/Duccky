//加载函数
var CN_Date = require('getCNDate.js')
var md5 = require('md5.js')
var util = require('../../utils/util.js')
var getWeatherImage = util['getWeatherImage']
var getTimeArray = util['getTimeArray']
var prepareAllCityCode = util['prepareAllCityCode']
var getCityCode = util['getCityCode']
var date = getTimeArray(new Date())
var formatTime = util['formatTime']
var get_hl = require(`hl${date[0]}.js`)
var should_list=get_hl(date[1]+date[2]).y.split('.')
var not_list=get_hl(date[1]+date[2]).j.split('.')
var nongliDetail=CN_Date(date[0], date[1], date[2])
var app = getApp()
Page({
  data: {
    favoriteAreaList: [],
    currentArea: '北京',
    currentCityId: 'WX4FBXXFKE4F',
    currentAreaIndex: 0,
    day: {},
    week: {},
    detail:{},  
    should: should_list,
    not: not_list,
    nongli: nongliDetail.slice(0,10),
    animals: nongliDetail.slice(10,13),
    today: date[1] + '月' + date[2] + '号',
    allCityCode: {status: 'init'},
    loadingHidden: false,
    locationSuccessHidden: true,
    locationFailHidden: true,
    autoLocation: false,
    needLocation: false
  },
  onReady:function(e){
    console.log('index onReady');
    console.log(app.globalData);
    console.log('log onReady');

    var thisPage = this;

    // 自动定位缓存 1小时
    let currentTime = Date.parse(new Date()) / 1000;
    if (wx.getStorageSync("needLocationKey") == ''){
      thisPage.data.needLocation = true;
      wx.setStorageSync("needLocationKey", currentTime);
    }
    else
    {
      let lastTime = parseInt(wx.getStorageSync("needLocationKey"));
      if((currentTime - lastTime) > 3600*1){
        thisPage.data.needLocation = true;
        wx.setStorageSync("needLocationKey", currentTime);
      }
    }

    // 获取当前 cityId
    let currentCityId = wx.getStorageSync("currentCityIdKey");
    if(currentCityId != ''){
      thisPage.data.currentCityId = currentCityId;
    }

    wx.getStorage({
      key: 'favoriteAreaList',
      success: function (res) {
        //app.globalData.favoriteAreaList = res.data
        thisPage.data.favoriteAreaList = res.data
      }
    })
    
    /*
    thisPage.setData({
      favoriteAreaList: app.globalData.favoriteAreaList,
      });
      */
    // wx.getStorage({
    //   key: 'favoriteAreaList',
    //   success: function(res){
    console.log(wx.getStorageSync("needLocationKey"));
    console.log(thisPage.data.needLocation);
    //thisPage.getLocation();
    if (thisPage.data.needLocation){
      thisPage.getLocation();
      //thisPage.refreshPage()  
    }else{
      //thisPage.setData({currentArea: app.globalData.currentArea})
      thisPage.refreshPage();
    }  
    // wx.getStorage({
    //   key: 'favoriteAreaList',
    //   success: function(res){ 
    //     app.globalData.favoriteAreaList = res.data
    //     console.log(app.globalData.favoriteAreaList)
    //     thisPage.setData({favoriteAreaList: res.data})
    //     wx.getStorage({
    //       key: 'currentArea',
    //       success: function(res){
    //         if (res.data == '未定位'){
    //           thisPage.getLocation()
    //         } else {  
    //           thisPage.setData({currentArea: res.data})
    //           thisPage.refreshPage()  
    //         }       
    //       }
    //     })
    //   },
    //   fail: function(e){
    //     wx.getStorage({
    //       key: 'currentArea',
    //       success: function(res){
    //         if (res.data == '未定位'){
    //           thisPage.getLocation()
    //         } else {
    //           thisPage.setData({currentArea: res.data})
    //           app.globalData.favoriteAreaList = res.data
    //           thisPage.refreshPage()  
    //         }       
    //       }
    //     })
    //   }
    // })
  },
  //页面加载函数
  onLoad:function(options){
    console.log('index onLoad')
    //prepareAllCityCode(this)
  },
  onShow: function() {
        var _this = this;
        //加载登录者的头像以及名称
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
              console.log("success")
              console.log(res)
            },
            fail: res => {
              console.log("fail")
              console.log(res)
                wx.showLoading({
                  title: "加载中,请稍后",
                  mask: true
              });
            }
        })
  },
  onHide: function() {
    console.log('index onHide');
  },
  onUnload: function() {
    console.log('index onUnload');
  },
  onPullDownRefresh: function() {
    console.log('index onPullDownRefresh');
  },
  onReachBottom: function() {
    console.log('index onReachBottom');
  },
  onShareAppMessage: function() {
    console.log('index onShareAppMessage');
  },
  getFutureWeek: function() { //7天内天气
    var thisPage=this;
    wx.request({
      url: 'https://admin.melonblock.com/Weather/v2/all',
      data: {
        city: this.data.favoriteAreaList[this.data.currentAreaIndex].cityCode,
        key: md5(this.data.favoriteAreaList[this.data.currentAreaIndex].cityCode+"all"+"ninetonweather2016"),
        language: 'zh-chs',
        aqi: 'city',
        alarm: '1'
      },
      success: function(res) {
        var myDate = new Date();
        var day = myDate.getDay(); 
        switch(day){
          case 1:
          day="周一";
          break;
          case 2:
          day="周二";
          break;
          case 3:
          day="周三";
          break;
          case 4:
          day="周四";
          break;
          case 5:
          day="周五";
          break;
          case 6:
          day="周六";
          break;
          case 7:
          day="周日";
          break;       
        }
        var data = res.data.weather[0].future
        var week_list_aray = []
        for(var i=0;i<7;i++){  
           if(week_list_aray.length<7){
             var w={}
             if(data[i].day==day){
               w.week ="今天";
               data[i+1].day="明天"
             }else{
               w.week=data[i].day;
             }             
              w.high=data[i].high;
              w.low=data[i].low;
              data[i].text=data[i].text.split("/")[0];
              w.src = getWeatherImage(data[i].text);
              w.text=data[i].text
              week_list_aray.push(w);             
           }                                                                   
        }
        //生活卡片——除去空气质量
        var life= res.data.weather[0].today.suggestion;
        var detailObj={
          'car_washing':life.car_washing.brief,
          'flu':life.flu.brief,
          'sport':life.sport.brief,
          'travel':life.travel.brief,
          'uv':life.uv.brief
        }
        var favoriteAreaList = thisPage.data.favoriteAreaList
        favoriteAreaList[thisPage.data.currentAreaIndex].detail = detailObj
        favoriteAreaList[thisPage.data.currentAreaIndex].week = week_list_aray
        thisPage.setData({
          week:week_list_aray,
          detail:detailObj,
          favoriteAreaList: favoriteAreaList
        })                         
      },
      fail: function(res){
        wx.redirectTo({
          url:'../notfound/notfound'
        })
      }
    })
  },
  getFutureDay: function() {  //未来24小时天气
    var thisPage=this;
    wx.request({
      url: 'https://admin.melonblock.com/Weather/v2/future24h', 
      data: {
        city: this.data.favoriteAreaList[this.data.currentAreaIndex].cityCode,
        key: md5(this.data.favoriteAreaList[this.data.currentAreaIndex].cityCode+"future24h"+"ninetonweather2016"),
        language: 'zh-chs',
        aqi: 'city',
        alarm: '1'
      },
      success: function(res){
        var data_day = res.data.hourly;
        var day_list_aray = []
        for(var i=0;i<data_day.length;i++){
          if(day_list_aray.length<24){
            var day_list = {};
            day_list.time = data_day[i].time.slice(11,-3);
            day_list.temperature = data_day[i].temperature;
            day_list.code = data_day[i].code;
            day_list.src = getWeatherImage(data_day[i].text);
            day_list_aray.push(day_list);
          }
        }
        var temperature_List={
          temp:res.data.hourly[0].temperature,
          text:res.data.hourly[0].text,
          src:getWeatherImage(res.data.hourly[0].text)
        }
        var favoriteAreaList = thisPage.data.favoriteAreaList
        favoriteAreaList[thisPage.data.currentAreaIndex].day = day_list_aray
        favoriteAreaList[thisPage.data.currentAreaIndex].temp = temperature_List
        thisPage.setData({
          day:day_list_aray,
          temp:temperature_List,
          favoriteAreaList: favoriteAreaList
        })
      },
      fail: function(res){
        wx.redirectTo({
          url:'../notfound/notfound'
        })
      }
    })
  },
  getAirQuality: function() {
    var thisPage=this;
    wx.request({
      url: 'https://admin.melonblock.com/Weather/v2/airQuality',
      data: {
        city: this.data.favoriteAreaList[this.data.currentAreaIndex].cityCode,
        key: md5(this.data.favoriteAreaList[this.data.currentAreaIndex].cityCode+"airQuality"+"ninetonweather2016"),
        language: 'zh-chs',
        aqi: 'city',
        alarm: '1'        
      },
      success: function(res){
        var favoriteAreaList = thisPage.data.favoriteAreaList
        var agv=res.data.data.agv.quality;
        var detailObj=thisPage.data.detail;
        detailObj.air=agv
        favoriteAreaList[thisPage.data.currentAreaIndex].detail = detailObj
        favoriteAreaList[thisPage.data.currentAreaIndex].lastUpdateIndex = new Date().valueOf()
        thisPage.setData({
          detail:detailObj,
          favoriteAreaList: favoriteAreaList
        })
      },
      fail:function(res){
        console.error(res);
        wx.redirectTo({
          url:'../notfound/notfound'
        })
      }
    })
  }, 
  
  //Update by wudasong 2018/2/7
  //begin
  getDataFromNewApi: function (cityId) {
    var thisPage = this;
    wx.request({
      url: 'https://newweather.nineton.cn/index/index.json',
      data: {
        cityid: cityId
      },
      success: function (res) {
        console.log(res);
        let cacheKey = "api_data_"+cityId;
        let currentTime = Date.parse(new Date()) / 1000;
        let dt = {"time":currentTime,"data":res.data.data};
        wx.setStorage({
          key: cacheKey,
          data: JSON.stringify(dt),
          success: function() {
            thisPage.updatePageData();
          }
        });
      },
      fail: function (res) {
        console.error(res);
        wx.redirectTo({
          url: '../notfound/notfound'
        })
      }
    })
  }, 

  updatePageData: function(){
    var thisPage = this;
    let currentCityId = thisPage.data.currentCityId;
    let cacheKey = "api_data_" + currentCityId;
    wx.getStorage({
      key: cacheKey,
      success: function (res) {
        let dt = JSON.parse(res.data);
        let currentTime = Date.parse(new Date()) / 1000;
        if ((currentTime - dt.time) > 300) {
          // 缓存失效时间 300 秒
          thisPage.getDataFromNewApi(currentCityId)
        }
        else
        {
          console.log("获取缓存");
          console.log(dt.data);
          let fav = thisPage.getFavoriteArea(dt);
          console.log(fav);
          thisPage.setFavoriteAreaList(fav);
          thisPage.setPageData(fav);
          //thisPage.refreshPage();
          thisPage.setData({
            loadingHidden: true
          });
          //console.log(formatTime(new Date()).substring(0, 10));
        }
      },
      fail: function () {
        thisPage.getDataFromNewApi(currentCityId)
      }
    });
  },

  getTodayWeather(data){
    let today = formatTime(new Date()).substring(0, 10);
    for (var i = 0; i < data.length; i++) {
      var w = {};
      if (data[i].date == today) {
        return data[i];
      }
    }
    return data[data.length-1];
  },

  getWeekWeather(data) {
    var week_list_aray = [];
    let today = formatTime(new Date()).substring(0, 10);
    for (var i = 0; i < data.length; i++) {
      var w = {};
      if (data[i].date == today) {
        week_list_aray[i - 1].week = "昨天";
        w.week = "今天";
        //data[i + 1].date = "明天";
      } else {
        if (data[i].date != "明天") {
          w.week = data[i].date.substring(8, 10) + "日";
        }
      }
      w.high = data[i].high;
      w.low = data[i].low;
      //data[i].text = data[i].text.split("/")[0];
      w.src = getWeatherImage(data[i].text_day);
      w.text = data[i].text_day
      week_list_aray.push(w);
    }
    return week_list_aray;
  },

  get24hoursTemperature(data_day) {
    var day_list_aray = [];
    for (var i = 0; i < data_day.length; i++) {
      if (day_list_aray.length < 24) {
        var day_list = {};
        day_list.time = data_day[i].time.substring(11, 16);
        day_list.temperature = data_day[i].temperature;
        day_list.code = data_day[i].code;
        day_list.src = getWeatherImage(data_day[i].text);
        day_list_aray.push(day_list);
      }
    }
    return day_list_aray;
  },

  getSuggestion(data) {
    let detail = {
      'car_washing': data.car_washing.brief,
      'flu': data.flu.brief,
      'sport': data.sport.brief,
      'travel': data.travel.brief,
      'uv': data.uv.brief,
      'air': data.air_pollution.brief,
    };
    return detail;
  },

  getFavoriteArea: function (dt) {
    let now = dt.data.weatherNow.now;
    let today = this.getTodayWeather(dt.data.weatherDaily.daily);
    var favoriteArea = {
      src: getWeatherImage(now.text),
      high: today.high,
      low: today.low,
      cityName: dt.data.weatherDaily.cityname,
      cityId: dt.data.weatherDaily.cityid,
      isDefault: true,
      lastUpdateIndex: 0,
      lastUpdateArea: 0,
      week: this.getWeekWeather(dt.data.weatherDaily.daily),
      day: this.get24hoursTemperature(dt.data.weatherHourly.hourly),
      temp: {
        'temp': now.temperature,
        'text': now.text,
        'src': getWeatherImage(now.text)
      },
      detail: this.getSuggestion(dt.data.lifeSuggestion.suggestion)
    };
    return favoriteArea;
  },

  setFavoriteAreaList: function(dt) {
    for (var i = 0; i < this.data.favoriteAreaList.length; i++) {
      if (this.data.favoriteAreaList[i].cityId == dt.cityId){
        this.data.favoriteAreaList[i] = dt;
        return;
      }
    }
    this.data.favoriteAreaList.push(dt);
  },

  setPageData: function (areaObj) {
    this.setData({
      currentArea: areaObj.cityName,
      detail: areaObj.detail,
      week: areaObj.week,
      day: areaObj.day,
      temp: areaObj.temp,
      loadingHidden: true
    });
  },

  //end

  refreshPage: function() {
    this.updatePageData();
    return;

    console.log(this.data.favoriteAreaList.length);
    console.log(this.data.favoriteAreaList);
    //return;

    if (this.data.favoriteAreaList.length == 0){
      this.updatePageData();
      return;
    }
  
    for (var i = 0; i < this.data.favoriteAreaList.length; i++) {
      if (this.data.favoriteAreaList[i].cityId == this.data.currentCityId) {
        this.setData({currentAreaIndex: i})
        break
      }
    }

    var areaObj = this.data.favoriteAreaList[this.data.currentAreaIndex];
    console.log(this.data.favoriteAreaList);
    this.setData({
      currentArea: areaObj.cityName,
      detail: areaObj.detail,
      week: areaObj.week,
      day: areaObj.day,
      temp: areaObj.temp,
      loadingHidden: true
    });

    console.log('index refreshPage complete: ' + this.data.currentAreaIndex + '|' + this.data.currentArea)
  },

  getLocation: function() {
    console.log("开始定位");
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
            console.log(res);
            if (res.data.status_code == 'AP010010'){
              thisPage.setData({
                currentArea: '定位失败',
                loadingHidden: true,
                locationFailHidden: false
              })
              return;
            }
            wx.setStorageSync("currentCityIdKey", res.data.results[0].location.id);
            thisPage.setData({
              currentArea: res.data.results[0].location.name,
              currentCityId: res.data.results[0].location.id,
              loadingHidden: true,
              locationSuccessHidden: true
            })
            thisPage.updatePageData();
            thisPage.setData({autoLocation: false})
          },
          fail: function(res) {
            thisPage.setData({
              currentArea: '定位失败',
              loadingHidden: true,
              locationFailHidden: false
            })
            thisPage.setData({autoLocation: false})
          }
        })
      },
      fail: function (msg) {
        console.log("定位失败");
        thisPage.setData({
          loadingHidden: true,
          locationFailHidden: false
        })
        thisPage.setData({autoLocation: false})
      }
    })
  },
  locationSubmit: function() {
    this.setData({
      loadingHidden: false,
      locationSuccessHidden: true
    })
    //this.firstAreaList()
    this.refreshPage()
  },
  locationCannel: function() {
    this.setData({
      currentArea: '北京',
      loadingHidden: false,
      locationSuccessHidden: true
    })
    //this.firstAreaList()
    this.refreshPage()
  },
  locationFail: function() {
    this.setData({
      //currentArea: '北京',
      loadingHidden: false,
      locationFailHidden: true
    })
    //this.firstAreaList()
    this.refreshPage()
  },
  firstAreaList: function() {
    var favoriteAreaList = [{
      src: '../images/temp_icon/lunar.png',
      high: 10,
      low: 5,
      cityName: this.data.currentArea,
      //cityCode: getCityCode(this.data.allCityCode, this.data.currentArea),
      currentCityId: this.data.currentCityId,
      isDefault: true,
      lastUpdateIndex: 0,
      lastUpdateArea: 0,
      week: function() {
        var wList = []
        for(var i = 0; i < 7 ; i++){
          var w = {}    
          w.high = 10
          w.low = 5
          w.src = getWeatherImage('阴天')
          w.text = '阴天'
          w.week = '明天'
          wList.push(w)
        }
        return wList
      }(),
      day:function(){
        var dList = []
        for (var i = 0 ; i < 24; i++){
          var d = {}
          d.time = '00:00'
          d.temperature = 5
          d.code = 4
          d.src = getWeatherImage('阴天')
          dList.push(d)
        }
        return dList
      }(),
      temp: {
        'temp': 5,
        'text': '阴天',
        'src': getWeatherImage('阴天')
      },
      detail:{  
        'car_washing':'较适宜',
        'flu':'易发',
        'sport':'较适宜',
        'travel':'较适宜',
        'uv':'较强',
        'air':'轻度污染'
        }
    }]
    console.log(favoriteAreaList)
    this.setData({favoriteAreaList: favoriteAreaList})
  },
  openSet:function(){
    wx.redirectTo({
      url: '../set/set',
    })
  },
  openArea: function(){
    var thisPage = this
    wx.redirectTo({
      url:'../area/area',
      success: function() {
        wx.setStorage({
          key: 'favoriteAreaList',
          data: thisPage.data.favoriteAreaList
        })
        wx.setStorage({
          key: 'currentAreaIndex',
          data: thisPage.data.currentAreaIndex
        })
        app.globalData.favoriteAreaList=thisPage.data.favoriteAreaList
        app.globalData.currentArea=thisPage.data.currentArea,
        app.globalData.currentAreaIndex=thisPage.data.currentAreaIndex
      }
    })
  },
  onPullDownRefresh: function(e) {
    this.refreshPage()
    console.log( "下拉刷新...." )
    wx.stopPullDownRefresh()
  },
  onShow:function(){}
})
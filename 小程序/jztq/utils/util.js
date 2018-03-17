/*
获取时间数组
*/
function getTimeArray(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day, hour, minute, second].map(formatNumber);
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
/* 
格式化时间
*/
function formatTime(date) {
  var t = getTimeArray(date);
  return [t[0], t[1], t[2]].map(formatNumber).join('-') + ' ' + [t[3], t[4], t[5]].map(formatNumber).join(':')
}


/*
获取天气图标,默认是返回阴天
weather : string
*/
function getWeatherImage(weather) {
  var imgPath = "../images/temp_icon/"
  var imgName = "lunar.png";
  switch(weather){
    case "晴":
      imgName="sun.png";
      break;
    case "多云":
      imgName="cloudy.png";
      break;
    case "阴":
      imgName="lunar.png";
      break;
    case "小雨":
      imgName="light_rain.png";
      break;
    case "中雨":
      imgName="moderate_rain.png";
      break;
    case "大雨":
      imgName="heavy_rain.png";
      break;
    case "阵雨":
      imgName="shower.png";
      break;
    case "雷阵雨":
      imgName="thundershower.png";
      break;
    case "暴雨":
      imgName="rainstorm.png";
      break;
    case "雨夹雪":
      imgName="rain_and_snow.png";
      break;
    case "小雪":
      imgName="scouther.png";
      break;
    case "大雪":
      imgName="heavy_snow.png";
      break;
    case "中雪":
      imgName="moderate_snow.png";
      break;
    case "暴雪":
      imgName="heavy_snowfall.png";
      break;
    case "夜间多云":
      imgName="night_cloudy.png";
      break;
    case "夜间晴":
      imgName="night_sun.png";
      break;
  }
  return imgPath + imgName;
}

/*
数组去重
*/
function distinct(arr){
  var self = arr;
  var list = self.concat().sort();
  list.sort(function(a, b){
    if(a === b){
      var ind = self.indexOf(a);
      self.splice(ind, 1);
    }
  });
  return self;
}

/*
获取城市列表
*/
function prepareAllCityCode(thisPage) {
  wx.getStorage({
    key: 'allCityCode',
    success: function(res){
      // success
      thisPage.setData({
        allCityCode: res.data
      })
    },
    fail: function() {
      // fail
      wx.request({
        url: 'https://admin.melonblock.com/Weather/v2/getAllCityCode',
        data: {
          key: 'a4aa8380fc06c815c1cb919c067e5577'
        },
        success: function(res){
          wx.setStorageSync('allCityCode', res.data)
          thisPage.setData({
            allCityCode: res.data
          })
        },
        fail:function(msg){
          // console.log(msg)
          wx.redirectTo({
            url:'../notfound/notfound'
          })
        }
      })
    }
  })
}
/*
获取城市Code
 */
function getCityCode(allCityCode, cityName) {
  var cityCode = 'CHBJ000000'
  if (allCityCode.status != 'init') {
    for (var i = 0; i < allCityCode.cityList.length; i++){
      if (allCityCode.cityList[i].cityname == cityName){
        cityCode = allCityCode.cityList[i].v2id
      }
    }
  }
  return cityCode  
}


module.exports = {
  getTimeArray : getTimeArray,
  formatTime: formatTime,
  getWeatherImage: getWeatherImage,
  distinct: distinct,
  prepareAllCityCode: prepareAllCityCode,
  getCityCode: getCityCode
}

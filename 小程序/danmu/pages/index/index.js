//index.js
//获取应用实例
const app = getApp()
var n=0;
var timer;
var bool_bottom = false;
Page({
  data: {
      colorArray: ['#fff', '#d0054a', '#ff5722', '#ffeb3b', '#00bcd4','#8bc34a'],
      sizeArr:[
          {
              size: '220rpx',
              name: "小"
          },
          {
              size: '240rpx',
              name: "中"
          },
          {
              size: '260rpx',
              name: "大"
          },{
              size:'280rpx',
              name:'特大'
          },{
              size: '300rpx',
              name: '超大'
          }
          ],
      input:'弹幕助手',
      size:"240rpx",
      scrollTop:1,
      bool:true,
  },
  set:function(){
      var bottom = -400
      if(bool_bottom == false){
          bottom = 0;
      }else{
          bottom = -400
      }
      bool_bottom = !bool_bottom;
      this.setData({
          bottom:bottom
      })
  },
  input:function(e){

      this.setData({
          input: e.detail.value,
          input_value:''
      })
    //   定时器函数调用
      var _this = this;
      clearInterval(timer);
      var query = wx.createSelectorQuery();
      query.select('.text_show').boundingClientRect();
      query.exec(function (res) {
          var height = res[0].height;
          n = 0;
          timer = setInterval(function () {
              n++;
              if (n >= height * 2) {
                  n = 0;
              }
              _this.setData({
                  scrollTop: n + 1,
              })
          }, 1)
      })
    //   定时器函数调用-end
  },
  color: function (event){
        var id = event.currentTarget.dataset.id;
        this.setData({
            color: this.data.colorArray[id]
        })
        //   定时器函数调用
        var _this = this;
        clearInterval(timer);
        var query = wx.createSelectorQuery();
        query.select('.text_show').boundingClientRect();
        query.exec(function (res) {
            var height = res[0].height;
            n = 0;
            timer = setInterval(function () {
                n++;
                if (n >= height * 2) {
                    n = 0;
                }
                _this.setData({
                    scrollTop: n + 1,
                })
            }, 1)
        })
    //   定时器函数调用-end
    },
    size:function(e){
        var id = e.currentTarget.dataset.id;
        this.setData({
            size: this.data.sizeArr[id].size
        })
        //   定时器函数调用
        var _this = this;
        clearInterval(timer);
        var query = wx.createSelectorQuery();
        query.select('.text_show').boundingClientRect();
        query.exec(function (res) {
            var height = res[0].height;
            n = 0;
            timer = setInterval(function () {
                n++;
                if (n >= height * 2) {
                    n = 0;
                }
                _this.setData({
                    scrollTop: n + 1,
                })
            }, 1)
        })
    //   定时器函数调用-end
    },
    onLoad:function(){
        var _this = this;
        clearInterval(timer);
        var query = wx.createSelectorQuery();
        query.select('.text_show').boundingClientRect();
        query.exec(function (res) {
            var height = res[0].height;
            n = 0;
            timer = setInterval(function () {
                n++;
                if (n >= height * 2) {
                    n = 0;
                }
                _this.setData({
                    scrollTop: n + 1,
                })
            }, 1)
        })
    },
    change:function(){

    }
})

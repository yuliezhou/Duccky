//index.js
//获取应用实例
const app = getApp()
var n=0;
var timer;
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
              size:'320rpx',
              name:'特大'
          },{
              size: '360rpx',
              name: '超大'
          }
          ],
      speedArr:[
          {
              speed: '25',
              name: "慢"
          },
          {
              speed: '5',
              name: "正常"
          },
          {
              speed: '1',
              name: "快"
          }
      ],
      input:'弹幕助手',
      size:"240rpx",
      scrollTop:1,
      speed:'5',
      speedTab:1,//切换圆圈加ac
      sizeTab:1,//切换圆圈加ac
      colorTab:0,//切换圆圈加ac
      bool:true,
      isbarout:false
  },
  //是否弹出 底部文字输入按钮框组
  barout:function(e){
    this.setData({
      bool:!this.data.bool,
      bottom: -1000
    })
  },
  set_btn:function(){
      this.setData({
          bottom:0,
          bool:false
      })
  },
  complete:function(){
      this.setData({
          bottom: -1000,
          bool: true
      })
  },
  input:function(e){

      this.setData({
          input: e.detail.value,
          input_value:''
      })
    //   定时器函数调用
      var _this = this;
      var speed = _this.data.speed;
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
                  scrollTop: n +1,
              })
          }, speed)
      })
    //   定时器函数调用-end
  },
  color: function (event){
        var id = event.currentTarget.dataset.id;
        this.setData({
            colorTab:id,
            color: this.data.colorArray[id]
        })
        //   定时器函数调用
        var _this = this;
        var speed = _this.data.speed;
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
                    scrollTop: n +1,
                })
            }, speed)
        })
    //   定时器函数调用-end
    },
    size:function(e){
        var id = e.currentTarget.dataset.id;
        this.setData({
            sizeTab:id,
            size: this.data.sizeArr[id].size
        })
        //   定时器函数调用
        var _this = this;
        var speed = _this.data.speed;
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
                    scrollTop: n +1,
                })
            },speed)
        })
    //   定时器函数调用-end
    },
    speed: function (e) {
        var id = e.currentTarget.dataset.id;
        this.setData({
            speedTab:id,
            speed: this.data.speedArr[id].speed
        })
        //   定时器函数调用
        var _this = this;
        var speed = _this.data.speed
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
            }, speed)
        })
        //   定时器函数调用-end
    },
    onLoad:function(e){
        // var _this = this;
        // var speed = _this.data.speed
        // clearInterval(timer);
        // var query = wx.createSelectorQuery();
        // query.select('.text_show').boundingClientRect();
        // query.exec(function (res) {
        //     var height = res[0].height;
        //     n = 0;
        //     timer = setInterval(function () {
        //         n++;
        //         if (n >= height * 2) {
        //             n = 0;
        //         }
        //         _this.setData({
        //             scrollTop: n +1,
        //         })
        //     }, speed)
        // })
    }
})

//index.js
//获取应用实例
const app = getApp()
var timer;
var animate_top = 1;
var speed = 5;
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
              speed: '8',
              name: "慢"
          },
          {
              speed: '5',
              name: "正常"
          },
          {
              speed: '2',
              name: "快"
          }
      ],
      input:'九吨科技',
      size:"240rpx",
      scrollTop:1,
      bottom:-1000,
      speedTab:1,//切换圆圈加ac
      sizeTab:1,//切换圆圈加ac
      colorTab:0,//切换圆圈加ac
      bool:true,
      animate_top:1,
      isbarout:false,
      speed:5
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
      this.double();
      var _this = this;
      //初始化降文字置于最底下
      _this.setData({
          animate_top: ''
      })
      setTimeout(function () {
        _this.setData({
            input: e.detail.value,
            input_value:'',
            animate_top:animate_top
        })
      }, 500)
  },
  color: function (event){
        this.double();
        var _this = this;
        var id = event.currentTarget.dataset.id;

        _this.setData({
            colorTab: id,
            animate_top: ''
        })
        setTimeout(function(){
            _this.setData({
                color: _this.data.colorArray[id],
                animate_top: animate_top
            })
        },500)
    },
    size:function(e){
        this.double();
        var _this = this;
        var id = e.currentTarget.dataset.id;
        _this.setData({
            sizeTab:id,
            animate_top: ''
        })
        setTimeout(function(){
            _this.setData({
                size: _this.data.sizeArr[id].size,
                animate_top:animate_top
            })
        },500)
    },
    speed: function (e) {
        this.double();
        var _this = this;
        var id = e.currentTarget.dataset.id;
        _this.setData({
            speedTab:id,
            animate_top: ''
        })
        setTimeout(function () {
            _this.setData({
                speed: _this.data.speedArr[id].speed,
                animate_top:animate_top
            })
        }, 500)
    },
    double:function(){
        var _this = this
        var query = wx.createSelectorQuery();
        query.select('.text_box').boundingClientRect();
        query.exec(function (res) {
            //获取文字的高度
            var height = res[0].height;
            console.log(height)
            if(height>0&&height<300){
                animate_top = 0
            }else if(height>300&&height<600){
                  animate_top = 1 
            }else if(height>600&&height<900){
                  animate_top = 2 
            }else if(height>900&&height<1200){
                  animate_top = 3 
            }else if(height>1200&&height<1500){
                  animate_top = 4 
                  speed = 7
            }else if(height>1400&&height<1700){
                  animate_top = 5 
                  speed = 9
            }else if(height>1700&&height<2000){
                  animate_top = 6 
                  speed = 11
            }else if(height>2000&&height<2300){
                  animate_top = 7 
                  speed = 13
            }else if(height>2300){
                  animate_top = 8 
                  speed = 15
            }
        })
    },
    onLoad:function(e){
        this.double();
        this.setData({
            animate_top:animate_top,
            speed:speed
        })
    }
})

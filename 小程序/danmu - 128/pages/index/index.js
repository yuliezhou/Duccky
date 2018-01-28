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
      speed:2,
      old_speed:5
  },
      double:function(){
        var _this = this
        var query = wx.createSelectorQuery();
        query.select('.text_box').boundingClientRect();
        query.exec(function (res) {
            //获取文字的高度
            var height = res[0].height;
            if(height>0&&height<200){
                animate_top = 0
                speed = 3
            }else if(height>200&&height<400){
                  animate_top = 1 
                  speed = 4.5
            }else if(height>400&&height<600){
                  animate_top = 2 
                  speed = 6
            }else if(height>600&&height<800){
                  animate_top = 3 
                  speed = 7.5
            }else if(height>800&&height<1000){
                  animate_top = 4 
                  speed = 9
            }else if(height>1000&&height<1200){
                  animate_top = 5 
                  speed = 10.5
            }else if(height>1200&&height<1400){
                  animate_top = 6 
                  speed = 12
            }else if(height>1400&&height<1600){
                  animate_top = 7 
                  speed = 13.5
            }else if(height>1800&&height<2000){
                  animate_top = 8 
                  speed = 15
            }else if(height>2000){
                  animate_top = 9 
                  speed = 16.5
            }
            _this.setData({
              old_speed:speed
            })
        })
    },
    onLoad:function (e) {
        this.double();
        this.setData({
            animate_top: animate_top,
            speed: speed
        })
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
      var _this = this;
      var speed_sd1 = _this.data.speed_sd;
      //初始化降文字置于最底下
      _this.setData({
          input: e.detail.value,
          animate_top: '',
          input_value:'',
          speedTab:1
      })
      setTimeout(function () {
        _this.double();
      },100)
      setTimeout(function () {
        _this.setData({
            animate_top:animate_top,
            speed:speed
        })
      }, 200)
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
        },200)
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
        },200)
    },
  speed: function (e) {
        this.double();
        var _this = this;
        var id = e.currentTarget.dataset.id;
        var old_speed1 = _this.data.old_speed;
        _this.setData({
            speedTab:id,
            animate_top: ''
        })
        setTimeout(function () {
            if(id == 2){
              var new_speed = old_speed1/2
              _this.setData({
                  speed: new_speed,
                  animate_top:animate_top,
              })         
            }else if(id == 0){
              var new_speed = old_speed1+2
              _this.setData({
                  speed: new_speed,
                  animate_top:animate_top
              })  
            }else if(id == 1){
              var new_speed = old_speed1
              _this.setData({
                  speed: new_speed,
                  animate_top:animate_top
              })  
            }
        }, 200)
    },
})

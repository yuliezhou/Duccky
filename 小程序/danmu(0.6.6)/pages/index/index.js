//index.js
//获取应用实例
const app = getApp()
var timer;
var animate_top = 1;
var speed = 5;
var maxwidth = 2030;
Page({
    data: {
        colorArray: ['#fff', '#d0054a', '#ff5722', '#ffeb3b', '#00bcd4', '#8bc34a'],
        sizeArr1: [{
            size: '100px',
            name: "小"
        }, {
            size: '120px',
            name: "中"
        }, {
            size: '140px',
            name: "大"
        }, {
            size: '320rpx',
            name: '特大'
        }, {
            size: '360rpx',
            name: '超大'
        }],
        speedArr: [{
            speed: '8',
            name: "慢"
        }, {
            speed: '5',
            name: "正常"
        }, {
            speed: '2',
            name: "快"
        }],
        input: '让弹幕飞',
        input_value:'让弹幕飞',
        // input_value:'',
        size: "120px",
        scrollTop: 1,
        bottom: -1000,
        speedTab: 1, //切换圆圈加ac
        sizeTab: 1, //切换圆圈加ac
        colorTab: 0, //切换圆圈加ac
        bool: true,
        animate_top: 1,
        isbarout: false,
        speed: 2,
        old_speed: 5,
        maxwidth:2000,
        texts: [{
            name: "让",
            color: "#ec4498"
        }, {
            name: "弹",
            color: "#ec4498"
        }, {
            name: "幕",
            color: "#ec4498"
        }, {
            name: "飞",
            color: "#ec4498"
        }, {
            name: "！",
            color: "#ec4498"
        }],
        //搜索框的字体颜色
        colors: ['#ec4498', '#2196f3', '#8ddc39', '#ff9800', '#673ab7'],
        //shadow对应的颜色
        shadowColor: ['shadow0', 'shadow0', 'shadow0', 'shadow0', 'shadow0'],
        sizeArr: [{
            name: '小',
            size: '200rpx'
        }, {
            name: '中',
            size: '240rpx'
        }, {
            name: '大',
            size: '280rpx'
        }],
        number: 5,
        //切换圆圈加ac
        currentTab: 2,
        currentTab1: 0,
        len: 0,
        vheight: 0,
        isonet: false,
        fonsize: "100px",
        ttype: 1, // 字体大小
        // 底部输入框组的判断条件
        isbarout: false,
        // 弹出颜色输入框组的判断条件
        iscolorout: false,
        // 弹出字体选择框组的判断条件
        issizeout: false,
         // 选中的文字的索引
        tindex: 1,
        sizename: '小',
        bool_bodyer: false,
        bool_home: true
    },
    double: function() {
        var _this = this
        var query = wx.createSelectorQuery();
        query.select('.text_box').boundingClientRect();
        query.exec(function(res) {
            //获取文字的高度
            var height = res[0].height;
            console.log(height)
            if (height > 0 && height <=500) {
                animate_top = 0
                speed = 5
            } else if (height > 500 && height <=600) {
                animate_top = 1
                speed = 5.5
            } else if (height > 600 && height <=700) {
                animate_top = 2
                speed = 6
            } else if (height > 700 && height <=800) {
                animate_top = 3
                speed = 6.5
            } else if (height > 800 && height <=900) {
                animate_top = 4
                speed = 7
            } else if (height > 900 && height <=1000) {
                animate_top = 5
                speed = 7.5
            } else if (height > 1000 && height <= 1100) {
                animate_top = 6
                speed = 8
            } else if (height > 1100 && height <= 1200) {
                animate_top = 7
                speed = 8.5
            } else if (height > 1200 && height <= 1300) {
                animate_top = 8
                speed = 9
            } else if (height > 1300 && height <= 1400) {
                animate_top = 9
                speed = 9.5
            } else if (height > 1400 ) {
                animate_top = 10
                speed = 10
            }
                _this.setData({
                    old_speed: speed,
                    animate_top: animate_top,
                    speed: speed
                })

        })
    },
    onLoad: function(e) {
       var _this = this;
       //文字高度
       var size_vh='';
       //文字小大
       var font_sizenume='';
       //文字名称
       var size_nameidx='';
       //文字索引
       var border_size = 0;
       var share_value = app.globalData.share_input ;
       
       var bool_bodyer_value = app.globalData.bool_bodyer_val;

       var bool_home_value = app.globalData.bool_home_val;

       var share_numidx = app.globalData.shareNum;

       if(share_numidx==5){
            size_vh="18vh"
            font_sizenume="200rpx"
            size_nameidx='小'
            border_size=0
       }
       if(share_numidx==4){
            size_vh = "22.5vh";
            font_sizenume="240rpx"
            size_nameidx='中'
            border_size=1

       }
       if(share_numidx==3){
            vh = "30vh";
            font_sizenume="280rpx"
            size_nameidx='大'
            border_size=2
       }
       //获取字符串
       var share_homr = app.globalData.shareStr;

       var share_homeArr='';
       //转换为数组
       share_homeArr = share_homr.split(",");
        for(var j=0;j<share_homeArr.length-1;j++){
            var texts_id1 = "texts[" + j + "].name"
            var arr_name = share_homeArr[j]
            _this.setData({
                [texts_id1]: arr_name
            }) 
        }
        //获取荧光字颜色字符串
       var share_homecol = app.globalData.shadowCol;

       var share_colArr='';
       //转数组
       share_colArr = share_homecol.split(",");
         for(var m=0;m<share_colArr.length-1;m++){
            var color_id = "shadowColor[" + m + "]"
            var color_name1 = share_colArr[m]
            _this.setData({
                [color_id]: color_name1
            }) 
        }      
        // 获取荧光字输入框颜色字符串
         var sizeCol_ipt = app.globalData.sizeiptCol
         var sizeCol_iptArr = ''
         sizeCol_iptArr = sizeCol_ipt.split(",");
         for (var n = 0; n < sizeCol_iptArr.length - 1; n++) {
             var sizeipt_id = "texts[" + n + "].color"
             var sizeiput1 = sizeCol_iptArr[n]
             _this.setData({
                 [sizeipt_id]: sizeiput1
             })
         } 
       //将数值转换为bool
       if (bool_bodyer_value == 'true') {
           bool_bodyer_value = true
       } else if (bool_bodyer_value == 'false') {
           bool_bodyer_value = false
       }
       if (bool_home_value == 'true') {
           bool_home_value = true
       } else if (bool_home_value == 'false') {
           bool_home_value = false
       }

        var leng = this.data.texts.length;
        var vh = "";
        var fonsize = "";
        if (this.data.ttype == 1) {
            vh = "18vh";
            fonsize = "200rpx"
        } else if (this.data.ttype == 2) {
            vh = "22.5vh";
            fonsize = "240rpx"
        } else {
            vh = "30vh";
            fonsize = "280rpx"
        }  
           _this.setData({
           input_value: share_value,
           input: share_value,
           bool_bodyer: bool_bodyer_value,
           bool_home: bool_home_value,
           vheight: size_vh,
            number: share_numidx,
            fonsize: font_sizenume,
            currentTab1:border_size,
            len: leng, //根据子的个数设置宽高
            sizename:size_nameidx,
            animate_top: '',
            speed: 20
       })  
       if(bool_bodyer_value==false){
           setTimeout(function(){
                _this.double()       
           },1000)
       }
    },
    changehome: function() {
        var input_txt =this.data.input
        this.setData({
            bool_bodyer: true,
            bool_home: false,
            input_value:input_txt
        })
    },
    changebodyer: function() {
        var _this = this
        this.setData({
            bool_bodyer: false,
            bool_home: true
        })
           setTimeout(function(){
                _this.double()       
           },1000)
    },
    //设置 字的高宽
    setHeight: function() {
        var leng = this.data.texts.length;
        var vh = "";
        if (ttype == 1) {
            vh = "18vh";
        } else if (ttype == 2) {
            vh = "22.5vh";
        } else {
            vh = "30vh";
        }
        this.setData({
            len: leng, //根据子的个数设置宽高
            vheight: vh,
            isonet: leng == 1 ? true : false,
            fonsize: 150 - leng * 10 + 'px'
        })
    },
    //是否弹出 底部文字输入按钮框组
    barout1: function(e) {
        this.setData({
            isbarout: !this.data.isbarout,
            iscolorout: false,
            issizeout: false
        })
    },
    sizechoose: function() {
        this.setData({
            issizeout: !this.data.issizeout,
            iscolorout: false
        })
    },
    // 将输入框的值赋予到页面上
    bindKeyInput: function(e) {
        var id = e.currentTarget.dataset.id;
        var texts_id = "texts[" + id + "].name"
        this.setData({
            [texts_id]: e.detail.value
        })
    },
    //获取焦点，弹出颜色选择框，增加边框线
    inputfocus: function(e) {
        var id = e.currentTarget.dataset.id;
        this.setData({
            currentTab: id,
            iscolorout: true,
            tindex: id,
            issizeout:false
        })
    },
    //改变颜色
    chanecolor: function(e) {
        var id = e.currentTarget.dataset.id;
        var tin = this.data.tindex;
        this.setData({
            ['texts[' + tin + '].color']: this.data.colors[id],
            ['shadowColor[' + tin + ']']: 'shadow' + id,
        })
    },
    //改变字体
    changesize: function(e) {
        var id = e.currentTarget.dataset.id;
        var vh = "";
        // this.setData({
        //   len: leng,        //根据子的个数设置宽高
        //   isonet: leng == 1 ? true : false,
        //   fonsize: 150 - leng * 10 + 'px'
        // })
        if (id == 0) {
            this.setData({
                vheight: "18vh",
                number: 5
            })
        } else if (id == 1) {
            this.setData({
                vheight: "22.5vh",
                number: 4
            })
        } else if (id == 2) {
            this.setData({
                vheight: "30vh",
                number: 3
            })
        }
        this.setData({
            currentTab1: id,
            fonsize: this.data.sizeArr[id].size,
            sizename: this.data.sizeArr[id].name
        })
    },
    //是否弹出 底部文字输入按钮框组
    barout: function(e) {
        var input_txt =this.data.input
        this.setData({
            bool: !this.data.bool,
            bottom: -1000,
            input_value:input_txt
        })
    },
    set_btn: function() {
        this.setData({
            bottom: 0,
            bool: false
        })
    },
    complete: function() {
        var input_txt =this.data.input
        this.setData({
            bottom: -1000,
            bool: true,
            input_value:input_txt
        })
    },
    input: function(e) {
        var _this = this;
        var speed_sd1 = _this.data.speed_sd;
        //初始化降文字置于最底下
        _this.setData({
            input: e.detail.value,
            animate_top: '',
            speedTab: 1
        })
        setTimeout(function() {
            _this.double();
        }, 100)
        setTimeout(function() {
            _this.setData({
                animate_top: animate_top,
                speed: speed
            })
        }, 200)
    },
    color: function(event) {
        var _this = this;
        var id = event.currentTarget.dataset.id;
        _this.setData({
            colorTab: id,
            animate_top: ''
        })
        setTimeout(function() {
            _this.setData({
                color: _this.data.colorArray[id],
                animate_top: animate_top
            })
        }, 200)
    },
    size: function(e) {
        var _this = this;
        var id = e.currentTarget.dataset.id;
        if(id==2){
            maxwidth = 2020
        }else if(id==0){
            maxwidth=2020
        }else{
            maxwidth = 2030
        }
        _this.setData({
            sizeTab: id,
            maxwidth: maxwidth
        })
        setTimeout(function() {
            _this.setData({
                size: _this.data.sizeArr1[id].size,
            })
        }, 0)
    },
    speed: function(e) {
        var _this = this;
        var id = e.currentTarget.dataset.id;
        var old_speed1 = _this.data.old_speed;
        console.log(id)
        _this.setData({
            speedTab: id,
            animate_top: ''
        })
        setTimeout(function() {
            if (id == 2) {
                var new_speed = old_speed1 / 2
                _this.setData({
                    speed: new_speed,
                    animate_top: animate_top,
                })
            } else if (id == 0) {
                var new_speed = old_speed1 + 2
                _this.setData({
                    speed: new_speed,
                    animate_top: animate_top
                })
            } else if (id == 1) {
                var new_speed = old_speed1
                _this.setData({
                    speed: new_speed,
                    animate_top: animate_top
                })
            }
             console.log(new_speed)

        }, 200)
    },
    onShareAppMessage: function () {
        var _this = this
        //获取荧光字的内容
        var share_json = this.data.texts

        //获取荧光字的个数
        var share_number = this.data.number
        //荧光字数值
        var share_str='';
        //荧光字颜色
        var ygClolor = '';
        var share_colorstr='';
        //获取荧光字文字数组
        for (var i = 0; i < share_json.length; i++) {
            share_str = share_str + share_json[i].name + ','
        }
        //获取荧光字颜色数组
        for (var n = 0; n < share_json.length; n++) {
            ygClolor = ygClolor + share_json[n].color + ','
        }
        console.log(ygClolor)
        //获取颜色数组
        var shadowcolorArr = this.data.shadowColor
        //将shadow数组转化为字符串，用作传参
        for(var j=0;j<shadowcolorArr.length;j++){
          share_colorstr =share_colorstr+shadowcolorArr[j]+','
        }
        //转发的时候获取当前input的
        var input_val = _this.data.input
        //转发的时候获取bool状态，用来判断当前显示哪个页面
        var bool_bodyer = _this.data.bool_bodyer
        var bool_home = _this.data.bool_home
        return {
            title: '快点开看我说了啥',
            desc: '让弹幕飞一会吧!',
            path: '/pages/index/index?id=' + input_val + '&bool_bodyeron=' + bool_bodyer + '&bool_homeon=' + bool_home + '&share_stron=' + share_str + '&share_numberon=' + share_number + '&shadowcoloron=' + share_colorstr + '&ygCloloron=' + ygClolor,
            success: function (res) {

            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
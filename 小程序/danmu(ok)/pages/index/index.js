//index.js
//获取应用实例
const app = getApp()
var timer;
var animate_top = 1;
var speed = 5;
Page({
    data: {
        colorArray: ['#fff', '#d0054a', '#ff5722', '#ffeb3b', '#00bcd4', '#8bc34a'],
        sizeArr: [{
            size: '220rpx',
            name: "小"
        }, {
            size: '240rpx',
            name: "中"
        }, {
            size: '260rpx',
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
        input: '九吨科技',
        size: "240rpx",
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
        texts: [{
            name: "九",
            color: "#ec4498"
        }, {
            name: "吨",
            color: "#ec4498"
        }, {
            name: "科",
            color: "#ec4498"
        }, {
            name: "技",
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
        bool_bodyer: true,
        bool_home: false
    },
    changehome: function() {
        this.setData({
            bool_bodyer: false,
            bool_home: true
        })
    },
    changebodyer: function() {
        this.setData({
            bool_bodyer: true,
            bool_home: false
        })
    },
    double: function() {
        var _this = this
        var query = wx.createSelectorQuery();
        query.select('.text_box').boundingClientRect();
        query.exec(function(res) {
            //获取文字的高度
            var height = res[0].height;
            if (height > 0 && height < 200) {
                animate_top = 0
                speed = 3
            } else if (height > 200 && height < 400) {
                animate_top = 1
                speed = 4.5
            } else if (height > 400 && height < 600) {
                animate_top = 2
                speed = 6
            } else if (height > 600 && height < 800) {
                animate_top = 3
                speed = 7.5
            } else if (height > 800 && height < 1000) {
                animate_top = 4
                speed = 9
            } else if (height > 1000 && height < 1200) {
                animate_top = 5
                speed = 10.5
            } else if (height > 1200 && height < 1400) {
                animate_top = 6
                speed = 12
            } else if (height > 1400 && height < 1600) {
                animate_top = 7
                speed = 13.5
            } else if (height > 1800 && height < 2000) {
                animate_top = 8
                speed = 15
            } else if (height > 2000) {
                animate_top = 9
                speed = 16.5
            }
            _this.setData({
                old_speed: speed
            })
        })
    },
    onLoad: function(e) {
        var _this = this;
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
        _this.double();
        setTimeout(function() {
            _this.setData({
                animate_top: animate_top,
                speed: speed,
                len: leng, //根据子的个数设置宽高
                vheight: vh,
                fonsize: fonsize
            })
        }, 200)
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
        this.setData({
            bool: !this.data.bool,
            bottom: -1000
        })
    },
    set_btn: function() {
        this.setData({
            bottom: 0,
            bool: false
        })
    },
    complete: function() {
        this.setData({
            bottom: -1000,
            bool: true
        })
    },
    input: function(e) {
        var _this = this;
        var speed_sd1 = _this.data.speed_sd;
        //初始化降文字置于最底下
        _this.setData({
            input: e.detail.value,
            animate_top: '',
            input_value: '',
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
        this.double();
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
        this.double();
        var _this = this;
        var id = e.currentTarget.dataset.id;
        _this.setData({
            sizeTab: id,
            animate_top: ''
        })
        setTimeout(function() {
            _this.setData({
                size: _this.data.sizeArr[id].size,
                animate_top: animate_top
            })
        }, 200)
    },
    speed: function(e) {
        this.double();
        var _this = this;
        var id = e.currentTarget.dataset.id;
        var old_speed1 = _this.data.old_speed;
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
        }, 200)
    },
})
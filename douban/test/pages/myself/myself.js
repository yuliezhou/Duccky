var api_url1 = 'https://api.douban.com/v2/movie/top250';
Page({
    onReady: function (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
    },
    data:{
        citys:["北京","上海","广州"],
        time:"09:01",
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        date:"2018-01-15"
    },
    bindtime:function(e){
        this.setData({
            time: e.detail.value
        })
    },
    binddate:function(e){
        this.setData({
            date: e.detail.value
        })
    },
    showAction:function(){
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function (res) {
                console.log(res.tapIndex)
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    showModal:function(){
        wx.showModal({
            title: '提示',
            content: '我是一个模态弹框',
            showCancel: true,
            cancelText: '取消',
            cancelColor: 'red',
            confirmText: '确定',
            confirmColor: 'green',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    showToast:function(){
        wx.showToast({
            title: '操作成功',
            icon:'loading',
            duration:100000,
            success:function(){
            }
        })
        wx.request({
            url: api_url1,
            data:{},
            header:{
                'content-type':'    json'
            },
            success:function(res){
                console.log(res.data)
                wx.hideToast()
            }
        })
    }
})
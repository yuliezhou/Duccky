// pages/test/test.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabBarIdx: 'a',
        tabBar: [{
            selectedIconPath: '../../images/acmine.png',
            iconPath: '../../images/mine.png',
            text: '首页',
            current: 'a'
        }, {
            selectedIconPath: '../../images/acmine.png',
            iconPath: '../../images/mine.png',
            text: '首页1',
            current: 'b'
        }, {
            selectedIconPath: '../../images/acmine.png',
            iconPath: '../../images/mine.png',
            text: '首页2',
            current: 'c'
        }, {
            selectedIconPath: '../../images/acmine.png',
            iconPath: '../../images/mine.png',
            text: '首页3',
            current: 'd'
        }, ]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    clickUrl: function(res) {
        let current = res.currentTarget.dataset.id
        this.setData({
            tabBarIdx: current
        })
        this.requestFor(current)
    },
    requestFor: function(current) {
        console.log(current)
        switch (current) {
            case 'a':
                this.testA();
                break;
            case 'b':
                this.testB();
                break;
            case 'c':
                this.testC();
                break;
            case 'd':
                this.testD();
                break;
        }
    },
    testA: function() {
        wx.showToast({
            title: '请求a模块接口',
            icon: 'none',
            duration: 1500
        })
    },
    testB: function() {
        wx.showToast({
            title: '请求b模块接口',
            icon: 'success',
            duration: 1500
        })
    },
    testC: function() {
        wx.showToast({
            title: '请求c模块接口',
            icon: 'loading',
            duration: 1500
        })
    },
    testD: function() {
        wx.showToast({
            title: '请求d模块接口',
            icon: 'none',
            duration: 1500
        })
    },
})
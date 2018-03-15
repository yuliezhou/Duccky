App({
    onLaunch: function() {
        console.log('App_onLaunch')
        var that = this
        that.getPromission()
        wx.setStorage({
            key: 'currentArea',
            data: '未定位'
        })
        wx.getStorage({
            key: 'favoriteAreaList',
            success: function(res) {
                that.globalData = res.data
            }
        })
    },
    getPromission: function() {
        var _this = this;
        wx.login({
            success: res => {
                if (res.code) {
                    //如果登录成功，获取用户登录后的code
                    var code = res.code;
                    // console.log(code);
                    // return
                    //获取用户信息 (先登录---->后获取用户信息)
                    wx.getUserInfo({
                        //获取用户信息成功
                        success: data => {
                            //获取用户信息(传递参数)
                            var ldata = {
                                    code: code,
                                    avatarUrl: data.userInfo.avatarUrl,
                                    nickName: data.userInfo.nickName
                                }
                                //服务器登录
                                // 设置缓存(存用户信息)
                            wx.setStorage({
                                key: 'userInfo',
                                data: data.userInfo
                            })
                        },
                        //获取用户信息失败
                        fail: res => {
                            // 显示提示弹窗（重新授权）
                            wx.showModal({
                                title: '用户未授权',
                                content: '如需正常使用精准天气预报的功能，请按确定并在授权管理中选中“用户信息以及地理位置”，然后点按确定。最后再重新进入小程序即可正常使用。',
                                showCancel: false,
                                success: res => {
                                    if (res.confirm) {
                                        //点击取消，重新获取授权
                                        wx.openSetting({
                                            success: data => {
                                                console.log(data)
                                                if (data) {
                                                    if (data.authSetting["scope.userInfo"] == true &&data.authSetting["scope.userLocation"] == false) {
                                                        //再次获取用户信息
                                                        wx.getUserInfo({
                                                            success: data => {
                                                                console.info(data);
                                                                var ldata = {
                                                                        code: code,
                                                                        avatarUrl: data.userInfo.avatarUrl,
                                                                        nickName: data.userInfo.nickName,
                                                                        // encryptedData: data.encryptedData,
                                                                        // iv: data.iv
                                                                    }
                                                                    //设置缓存（用户信息）
                                                                wx.setStorage({
                                                                        key: 'userInfo',
                                                                        data: data.userInfo
                                                                    })
                                                                    //
                                                            },
                                                            fail: function() {}
                                                        });
                                                    } else if (data.authSetting["scope.userInfo"] == false &&data.authSetting["scope.userLocation"] == true) {
                                                        _this.getLocation()
                                                    }else if(data.authSetting["scope.userInfo"] == true &&data.authSetting["scope.userLocation"] == true){
                                                        wx.getUserInfo({
                                                            success: data => {
                                                                console.info(data);
                                                                var ldata = {
                                                                        code: code,
                                                                        avatarUrl: data.userInfo.avatarUrl,
                                                                        nickName: data.userInfo.nickName,
                                                                        // encryptedData: data.encryptedData,
                                                                        // iv: data.iv
                                                                    }
                                                                    //设置缓存（用户信息）
                                                                wx.setStorage({
                                                                        key: 'userInfo',
                                                                        data: data.userInfo
                                                                    })
                                                                    //
                                                            },
                                                            fail: function() {}
                                                        });
                                                        _this.getLocation()
                                                    }
                                                }
                                            },
                                            fail: function() {
                                                console.info("设置失败返回数据");
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            },
            fail: function() {
                console.info("登录失败返回数据");
            }
        });
    },
    getLocation: function() {
        console.log("开始定位");
        var thisPage = this
        thisPage.setData({
            autoLocation: true
        })
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
                        // if (res.data.status_code == 'AP010010') {
                        //     thisPage.setData({
                        //         currentArea: '定位失败',
                        //         loadingHidden: true,
                        //         locationFailHidden: false
                        //     })
                        //     return;
                        // }
                        // wx.setStorageSync("currentCityIdKey", res.data.results[0].location.id);
                        // thisPage.setData({
                        //     currentArea: res.data.results[0].location.name,
                        //     currentCityId: res.data.results[0].location.id,
                        //     loadingHidden: true,
                        //     locationSuccessHidden: true
                        // })
                        // thisPage.updatePageData();
                        // thisPage.setData({
                        //     autoLocation: false
                        // })
                    },
                    fail: function(res) {
                        // thisPage.setData({
                        //     currentArea: '定位失败',
                        //     loadingHidden: true,
                        //     locationFailHidden: false
                        // })
                        // thisPage.setData({
                        //     autoLocation: false
                        // })
                    }
                })
            },
            fail: function(msg) {
                console.log("定位失败");
                thisPage.setData({
                    loadingHidden: true,
                    locationFailHidden: false
                })
                thisPage.setData({
                    autoLocation: false
                })
            }
        })
    },
    globalData: {
        favoriteAreaList: [],
        currentAreaIndex: 0,
        userInfo: null,
        currentArea: null,
        lodata: ''
    }
})
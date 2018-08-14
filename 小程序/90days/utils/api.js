var app = getApp();
const {
    APIURL
} = require('config.js');
let mobile = wx.getSystemInfoSync()['model'];
var api = {
    wxlogin() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: res => {
                    resolve(res)
                }
            })
        })
    },
    //注册
    register(datas) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${APIURL}/Login/login`,
                method: 'POST',
                data: datas,
                success: res => {
                    // console.log(res)
                    if (res.statusCode === 200 && res.data.code == 200) {
                        resolve(res.data.data.token)
                    } else {
                        console.log('注册失败')
                    }
                },
                fail: err => {
                    reject(err);
                }
            })
        })
    },
    //登录初始化
    loginInit(pathid) {
        return new Promise((resolve, reject) => {
            this.wxlogin().then((res) => {
                var datas = {
                    code:res.code,
                    pathid:pathid,
                    mpid:2
                }
                return this.register(datas)
            }).then((res) => {
                console.log('登录初始化完成')
                wx.setStorageSync('token_storage', res)
                resolve(res)
            })
        })
    },
    //打开小程序
    openVisit(pathid){
        var token = wx.getStorageSync('token_storage');
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${APIURL}/Game/openVisit`,
                method: 'POST',
                data: {
                    mobile:mobile,
                    pathid:pathid,
                    token:token
                },
                success: res => {
                    // console.log(res)
                    if (res.statusCode === 200 && res.data.code == 200) {
                        resolve(res)
                    }
                },
                fail: err => {
                    reject(err);
                }

            })                
        })        
    },
    //关闭小程序
    closeVisit(visitid){
        var token = wx.getStorageSync('token_storage');
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${APIURL}/Game/closeVisit`,
                method: 'POST',
                data: {
                    mobile:mobile,
                    visitid:visitid,
                    token:token
                },
                success: res => {
                    // console.log(res)
                    if (res.statusCode === 200 && res.data.code == 200) {
                        resolve(res)
                    } else {
                        console.log('未知错误')
                    }
                },
                fail: err => {
                    reject(err);
                }

            })                
        })        
    },
    //打开小游戏
    openGame(datas){
        var token = wx.getStorageSync('token_storage');
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${APIURL}/Game/openGame`,
                method: 'POST',
                data: datas,
                success: res => {
                    // console.log(res)
                    if (res.statusCode === 200 && res.data.code == 200) {
                        resolve(res)
                    }
                },
                fail: err => {
                    reject(err);
                }

            })                
        })        
    },

    //游戏列表
    indexList(){
        var token = wx.getStorageSync('token_storage');
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${APIURL}/Game/indexList`,
                method: 'POST',
                data:{
                    token:token
                },
                success: res => {
                    // console.log(res)
                    if (res.statusCode === 200 && res.data.code == 200) {
                        resolve(res)
                    } else {
                        console.log('未知错误')
                    }
                },
                fail: err => {
                    reject(err);
                }

            })                
        })        
    },

    //获取版本控制消息
    getConfigInfo() {
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'POST',
                url: configUrl,
                data: {
                    keyfields: 'weather_open_share_v3_2_1,weather_farm_open_change,weather_open_farm_v3_2_1'
                },
                success: res => {
                    if (res.statusCode === 200 && res.data.code == 200) {
                        resolve(res)
                    }
                    resolve(res)
                },
                fail: res => {
                    // console.log(res)
                }
            })
        })
    }

};
module.exports = api
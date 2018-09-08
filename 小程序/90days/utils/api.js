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

};
module.exports = api
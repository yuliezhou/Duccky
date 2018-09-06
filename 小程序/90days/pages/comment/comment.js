const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
        photoUrl: '', //照片地址
        funIndex: 1, //趣味指数
        trainIndex: 1, //训练强度
        courseIndex: 1, //课程氛围
        coachIndex: 1 //教练指数
    },
    onLoad: function(res) {},
    chooseFun: function(res) {
        var id = res.currentTarget.dataset.id;
        this.setData({
            funIndex: id
        })
    },
    chooseTrain: function(res) {
        var id = res.currentTarget.dataset.id;
        this.setData({
            trainIndex: id
        })
    },
    chooseCourse: function(res) {
        var id = res.currentTarget.dataset.id;
        this.setData({
            courseIndex: id
        })
    },
    chooseCoach: function(res) {
        var id = res.currentTarget.dataset.id;
        this.setData({
            coachIndex: id
        })
    },
    //上传照片
    uploadPhoto: function(res) {
        var _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var photoUrl = res.tempFilePaths[0];
                _this.setData({
                    photoUrl: photoUrl
                })
            }
        })
    }
})
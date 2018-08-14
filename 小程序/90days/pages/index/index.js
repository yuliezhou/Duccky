const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
        visitid: '', //访问ID
        allList: '', //所有数据
        modalBool:false,//模态层显示隐藏
    },
    onLoad: function(res) {
        var pathid = res.pathid;
        api.loginInit(pathid).then(res => {
            return api.openVisit(pathid)
        }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
                this.setData({
                    visitid: res.data.data.visitid
                })
            }
            return api.indexList()
        }).then(res => {
            if (res.data.code == 200) {
                this.setData({
                    allList: res.data.data
                })
            }
        });
        wx.setEnableDebug({
            enableDebug: true
        })
    },
    onHide: function() {
        api.closeVisit(this.data.visitid)


    },
    showModal:function(){
    	this.setData({
    		modalBool:!this.data.modalBool;
    	})
    }
})
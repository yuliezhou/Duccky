//获取应用实例
const app = getApp();
const api_url = 'https://api.douban.com/v2/movie/search?q=';
Page({
    data:{
        movies:[]
    },
    search:function(e){
        if(!e.detail.value){
            return;
        }
        wx.showToast({
            title: '加载中',
            icon:"loading",
            duration:2000
        });
        var _this = this;
        wx.request({
            url: api_url + e.detail.value,
            data:{},
            header:{
                'content-type':"json"
            },
            success:function(res){
                console.log(res.data)
                wx.hideToast();
                _this.setData({
                    movies:res.data.subjects
                })
            }
        })
    }
})
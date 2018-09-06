const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
    	imgUrls:['../../images/swiper.png','../../images/swiper.png','../../images/swiper.png'],
    	functionList:['个人钱包','辅助选课','训练记录','体测记录','排行榜','勋章墙']
    },
    onLoad: function(res) {

    },
    //底部功能区点击跳转不同的页面
    toOtherPage:function(res){
		var id = res.currentTarget.dataset.id;
		this.toPage(id);
    },
    //底部功能区点击跳转不同的页面
    toPage:function(id){
		switch (id) {
			case 0:
		        wx.navigateTo({
		            url: '../wallet/wallet',
		        })
			break;
			case 1:
		        wx.navigateTo({
		            url: '../choosecourse/choosecourse',
		        })
			break;
			case 2:
		        wx.navigateTo({
		            url: '../training/training',
		        })
			break;
			case 3:
		        wx.navigateTo({
		            url: '../sportstest/sportstest',
		        })
			break;
			case 4:
		        wx.navigateTo({
		            url: '../ranking/ranking',
		        })
			break;
			case 5:
		        wx.navigateTo({
		            url: '../medalwall/medalwall',
		        })
			break;
		}
    },
    //点击余额 跳转到钱包(如不需要可删除)
    toWallet:function(){
        wx.navigateTo({
            url: '../wallet/wallet',
        })
    },
    //跳转到个人信息页
    toUserinfo:function(){
        wx.navigateTo({
            url: '../userinfo/userinfo',
        })    	
    }
})
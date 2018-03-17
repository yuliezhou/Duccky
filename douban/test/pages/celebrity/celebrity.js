var api_url = 'https://api.douban.com/v2/movie/celebrity/';
Page({
	data:{
        movie:{

        }
	},
	onLoad:function(params){
        var _this = this;
        wx.showToast({
	      title: "加载中...",
	      icon:"loading",
     	  duration:3000
	    });
		wx.request({
		  url: api_url+params.id,
		  data: {

		  },
		  header: {
		      'Content-Type': 'json' // 默认值
		  },
		  success: function(res) {
		    wx.hideToast();
            _this.setData({
                celebrity:res.data
            })
		  }
		})
	}
})
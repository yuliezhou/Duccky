var api_url1 = 'https://api.douban.com/v2/movie/subject/';
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
		  url: api_url1+params.id,
		  data: {

		  },
		  header: {
		      'Content-Type': 'application/json' // 默认值
		  },
		  success: function(res) {
		    wx.hideToast();
            _this.setData({
                movie:res.data
            })
		  }
		})
	}
})
const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
		priceList:[
			{
				pay_money:100,
				get_money:100
			},
			{
				pay_money:500,
				get_money:520
			},
			{
				pay_money:1000,
				get_money:1100
			},
			{
				pay_money:2000,
				get_money:2500
			},
		],
		priceIdx:0
    },
    onLoad: function(res) {

    },
    //选择充值金额
    choosePrice:function (res) {
    	var id = res.currentTarget.dataset.id;
    	this.setData({
    		priceIdx:id
    	})
    },    
})
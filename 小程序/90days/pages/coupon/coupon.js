const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
		//可以使用的优惠券列表
		couponList:[
			{
				name:'新手礼包券1',
				rule:'满20元使用',
				money:'15',
				time:'2018年9月20日'
			},
			{
				name:'新手礼包券2',
				rule:'满20元使用',
				money:'15',
				time:'2018年9月20日'
			}
		],
		//不可以使用的优惠券列表
		couponFalse:[
			{
				name:'新手礼包券1',
				rule:'满20元使用',
				money:'15',
				time:'2018年9月20日'
			}
		],
		couponIdx:0,
		type:''//判断是哪个页面跳转过来的(支付页面/钱包页)
    },
    onLoad: function(res) {
    	var type = res.type;
    	this.setData({
    		type:type
    	})
    },
    backPay:function(){
    	// 表示从支付页跳转过来的
    	var type = this.data.type;
    	if(type == 'pay'){
			wx.navigateBack({
			  delta: 1
			})     	
    	}
    },
    backPayFalse:function(){
		wx.showToast({
		  title: '不符合使用规则,请选择其他优惠券',
		  icon: 'none',
		  duration: 2000
		})    	
    }
})
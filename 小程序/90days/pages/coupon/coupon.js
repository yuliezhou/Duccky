const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
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
			},
			{
				name:'新手礼包券3',
				rule:'满20元使用',
				money:'15',
				time:'2018年9月20日'
			},
		]
    },
    onLoad: function(res) {

    },
    backPay:function(){
        wx.navigateTo({
             url: '../pay/pay',
         })      	
    }
})
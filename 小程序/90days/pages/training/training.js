const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
		trainingList:[
			{
				time:'0816 19:00',
				name:'燃烧体脂燃烧体脂',
				cal:200,
				heart:120
			},
			{
				time:'0817 19:00',
				name:'燃烧体脂',
				cal:300,
				heart:120
			},
			{
				time:'0818 19:00',
				name:'燃烧体脂',
				cal:500,
				heart:120
			},
			{
				time:'0818 19:00',
				name:'燃烧体脂',
				cal:600,
				heart:120
			},
		]
    },
    onLoad: function(res) {

    }
})
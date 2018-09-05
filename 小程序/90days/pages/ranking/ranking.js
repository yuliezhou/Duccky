const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
		bigIdx:1,
		smallIdx:1,
		rankingList:[
			{
				ranking_num:1,
				userimg:'../../images/user.jpg',
				usericon:'../../images/per5.png',
				username:'Ducky',
				medal:['../../images/medal1.png','../../images/medal2.png','../../images/medal3.png','../../images/medal4.png'],
				training_times:128
			},
			{
				ranking_num:2,
				userimg:'../../images/user.jpg',
				usericon:'../../images/per5.png',
				username:'Duccky',
				medal:['../../images/medal1.png','../../images/medal3.png','../../images/medal4.png'],
				training_times:27
			},
			{
				ranking_num:3,
				userimg:'../../images/user.jpg',
				usericon:'../../images/per5.png',
				username:'Ducky',
				medal:['../../images/medal2.png','../../images/medal3.png','../../images/medal4.png'],
				training_times:26
			},
			{
				ranking_num:4,
				userimg:'../../images/user.jpg',
				usericon:'../../images/per5.png',
				username:'Ducky',
				medal:['../../images/medal4.png'],
				training_times:6
			},
		]
    },
    onLoad: function(res) {

    },
    changeBigType:function(res){
    	var id = res.currentTarget.dataset.id;
    	this.setData({
    		bigIdx:id
    	})
    },
    changeSmallType:function(res){
    	var id = res.currentTarget.dataset.id;
    	this.setData({
    		smallIdx:id
    	})
    },
})
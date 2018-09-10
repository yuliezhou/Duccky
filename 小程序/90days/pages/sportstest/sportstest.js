const app = getApp()
var api = require('../../utils/api.js')
Page({
    data: {
    	bmi:13,//bmi指数
    	whr:0.4,//腰臀比指数
    	bmipositon:'',
    	whrpositon:'',
    	lineUnit:[0,20,60],
    	lineData:[0,10,20],
    	canvasLineWidth:'',//后台返回的折线图.需要根据数据量动态计算.
        weightTagicon:'up',//体重
        fatTagicon:'down'//脂肪
    },
    onLoad: function(res) {
    	// 如果后端数据为 [0,20,60] -->为你做了数组逆序处理 .如不需要直接删除
    	var lineUnit = this.data.lineUnit;
    	var lineData = this.data.lineData;
    	lineUnit.reverse();
    	lineData.reverse();
    	this.setData({
    		lineUnit:lineUnit,
    		lineData:lineData
    	})
    	// ---end
    	
    	// canvasimg 宽度计算
    	var lineWidthUnit = 98; //一条数据的宽度大概在86rpx;
    	var dataNum = 6;//假如有6条数据 
    	// 50为最后一个圆点宽度,加上左右两边留白.根据你后面canvas返回图片来确定最终数据.也许需要微调一下
    	var canvasLineWidth = lineWidthUnit * (dataNum - 1)  + 50;
    	this.setData({
    		canvasLineWidth:canvasLineWidth
    	})
    	// canvasimg 宽度计算 --end

    	// 指数气泡定位计算
    	var bmi = this.data.bmi;
    	var whr = this.data.whr;
    	var bmipositon = this.bmiPosition(bmi);
    	var whrpositon = this.whrPosition(whr);
    	this.setData({
    		bmipositon:bmipositon,
    		whrpositon:whrpositon
    	})
    },
    // bmi计算
    bmiPosition:function(bmi){
    	var position;
    	if(bmi<19){
    		position = bmi / 19 * 33.33;
    	}else if(bmi>=19 && bmi<=24){
    		var diff = bmi - 19;
    		position = diff / 5 * 33.33 + 33.33;
    	}else{
    		position = 83.36
    	}
    	return  position;
    },
    // 腰臀比计算
    whrPosition:function(whr){
    	var position;
    	if(whr<0.8){
    		position = whr / 0.8 * 33.33;
    	}else if(whr>=0.8 && whr<=0.9){
    		var diff = whr - 0.8;
    		position = diff / 0.1 * 33.33 + 33.33;
    	}else{
    		position = 83.36
    	}
    	return  position;
    },
})
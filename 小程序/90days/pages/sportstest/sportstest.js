const app = getApp()
var api = require('../../utils/api.js')
var util = require('../../utils/util.js')
const ctx = wx.createCanvasContext('canvasWeather');
Page({
    data: {
    	bmi:13,//bmi指数
    	whr:0.4,//腰臀比指数
    	bmipositon:'',
    	whrpositon:'',
    	lineUnit:[],
    	lineData:[],
        dateArr:['1/12','2/12','3/12','4/12','5/12','6/12','7/12','8/12'],
    	canvasLineWidth:'',//后台返回的折线图.需要根据数据量动态计算.
        canvasSaveimg:'',
        weightList:[50,60,90,80,60,70,50,30],
        fatList:[1,2,2,3,4,5,5,3,],
        weightTagicon:'up',//体重
        fatTagicon:'down'//脂肪
    },
    onLoad: function(res) {
        var _this = this;
        var weightList = this.data.weightList;
        var fatList = this.data.fatList;
        let mobile = wx.getSystemInfoSync();
        //比例
        let ratio = mobile.windowWidth / 375;
        //X轴的距离-长度(px)
        var xUnitLen = 51 * ratio;
        //x轴的长度
        var xLen = xUnitLen*(weightList.length-1) + xUnitLen* ratio;
        console.log(xLen)
        var maxWeight = util.maxNum(weightList);
        maxWeight = Math.ceil(maxWeight/10)*10;
        var maxFat = util.maxNum(fatList);
        maxFat = Math.ceil(maxFat);
        var avFat = maxFat/2
        var avWeight = maxWeight/2
        var lineData = [0,avFat,maxFat]
        var lineUnit = [0,avWeight,maxWeight]
        lineUnit.reverse();
        lineData.reverse();  
        console.log(lineUnit) 
        console.log(lineData)      
        this.setData({
            canvasLineWidth:xLen,
            lineData:lineData,
            lineUnit:lineUnit,
        })        
    	// 指数气泡定位计算
    	var bmi = this.data.bmi;
    	var whr = this.data.whr;
    	var bmipositon = this.bmiPosition(bmi);
    	var whrpositon = this.whrPosition(whr);
    	this.setData({
    		bmipositon:bmipositon,
    		whrpositon:whrpositon
    	})
        setTimeout(function(){
            _this.drawCanvasLine()
        },1000)

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
    //绘制折线图
    drawCanvasLine: function() {
        var _this = this;
        var weightList = this.data.weightList;
        var fatList = this.data.fatList;
        let mobile = wx.getSystemInfoSync();
        //比例
        let ratio = mobile.windowWidth / 375;
        //Y轴的距离-长度(px)
        var yUnitLen = 10 * ratio;
        //X轴的距离-长度(px)
        var xUnitLen = 51 * ratio;
        //x轴的长度
        var xLen = xUnitLen*(weightList.length-1) +20;
        //y轴的长度
        var yLen = 100; 
        var maxWeight = util.maxNum(weightList);
        var maxFat = util.maxNum(fatList);
        //最小值
        this.drawLine(weightList, xUnitLen, maxWeight, yLen, ratio, "#FFAA2F")
        this.drawBlock(weightList, yLen,xUnitLen,ratio,maxWeight, "#FFAA2F")
        this.drawLine(fatList,xUnitLen, maxFat, yLen, ratio, '#28B998')
        this.drawBlock(fatList, yLen,xUnitLen,ratio,maxFat, '#28B998')
        ctx.setFillStyle('#666666');
        // this.drawText(ratio, weightList, xUnitLen)
        // draw回调
        ctx.draw(false, function(e) {
            wx.canvasToTempFilePath({
                canvasId: 'canvasWeather',
                success: (res) => {
                    // console.log(res.tempFilePath)
                    var shareTempFilePath = res.tempFilePath;
                    _this.setData({
                        canvasSaveimg: shareTempFilePath
                    })
                }
            })
        });
        // console.log('绘制结束')
    },
    //画出折线 
    drawLine: function(weightList, xUnitLen, maxWeight, yLen, ratio, color) {
        // console.log('折线')
        //根据折线的数据量来画
        for (var i = 0; i < weightList.length - 1; i++) {
            //起始坐标  
            var numsY = yLen + 10 * ratio - (weightList[i]) * yLen / maxWeight; //Y轴每一格数量算作100(y轴一段距离为10)
            var numsX = i * xUnitLen +xUnitLen/2 * ratio; //X轴坐标
            //终止坐标  
            var numsNY = yLen + 10 * ratio - (weightList[i + 1])  * yLen / maxWeight; //下一条数据的终点
            var numsNX = (i + 1) * xUnitLen +xUnitLen/2 * ratio; //下一条数据的终点
            ctx.beginPath();
            ctx.moveTo(numsX, numsY);
            ctx.lineTo(numsNX, numsNY);
            ctx.setLineWidth(1)
            ctx.setStrokeStyle(color);
            ctx.stroke();
            ctx.closePath();
        }
    },
    //绘制折线点的菱形和数值，横坐标值，纵坐标值 
    drawBlock: function(weightList, yLen,xUnitLen,ratio,maxWeight,color) {
        // console.log('圆点')
        for (var i = 0; i < weightList.length; i++) {
            var numsY = yLen + 10 * ratio - (weightList[i]) * yLen / maxWeight; //Y轴每一格数量算作100(y轴一段距离为10)
            var numsX = i * xUnitLen +xUnitLen/2 * ratio; //X轴坐标  起始位置50+35 x距离50
            // 画出折线上的小圆点 
            ctx.moveTo(numsX - 4, numsY);
            ctx.setFontSize(10)
            ctx.setFillStyle('#ffffff');
            ctx.beginPath();
            ctx.arc(numsX, numsY, 4, 0, 4 * Math.PI);
            ctx.setFillStyle(color);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    },
    //画出温度文字
    drawText: function(ratio, weightList, xUnitLen) {
        // console.log('温度文字')
        for (var i = 0; i < 15; i++) {
            var numsY = 20; //Y轴每一格数量算作100(y轴一段距离为10)
            var numsX = i * xUnitLen + xUnitLen / 2; //X轴坐标  起始位置50+35 x距离50
            ctx.setFontSize(14 * ratio)
            ctx.setTextAlign('center')
            ctx.fillText(weightList[i], i * xUnitLen + xUnitLen / 2,134);
        }
    },    
})
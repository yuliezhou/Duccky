
Page({
  data: {
    texts: [
      { name: "九", color: "#ec4498"},
      { name: "吨", color: "#ec4498"},
      { name: "科", color: "#ec4498"},
      { name: "技", color: "#ec4498"},
      { name: "！", color: "#ec4498"}
    ],
    //搜索框的字体颜色
    colors: ['#ec4498', '#2196f3', '#8ddc39', '#ff9800', '#673ab7'],
    //shadow对应的颜色
    shadowColor:['shadow0','shadow0','shadow0','shadow0','shadow0'],
    sizeArr:[
      {
        name:'小',size:'200rpx'
      },
      {
        name:'中',size:'240rpx'
      },
      {
        name:'大',size:'280rpx'
      }
    ],
    number:5,
    //切换圆圈加ac
    currentTab:2,
    currentTab1:0,
    len:0,
    vheight:0,
    isonet:false,
    fonsize:"100px",
    ttype:1, // 字体大小
    // 底部输入框组的判断条件
    isbarout: false, 
    // 弹出颜色输入框组的判断条件
    iscolorout:false, 
    // 弹出字体选择框组的判断条件
    issizeout:false,
    tindex:1,// 选中的文字的索引
    sizename:'小'
  },
  onLoad: function () {
    var leng = this.data.texts.length;
    var vh = "";
    var fonsize = "";
    if (this.data.ttype ==1){
      vh= "18vh";
      fonsize="200rpx"
    } else if (this.data.ttype == 2){
      vh = "22.5vh";
      fonsize = "240rpx"
    }else{
      vh = "30vh";
      fonsize = "280rpx"
    }
    setTimeout(function () {
        _this.setData({
            len: leng,        //根据子的个数设置宽高
            vheight: vh,
            fonsize: fonsize
        })
    }, 200)
  },
  //设置 字的高宽
  setHeight:function(){
    var leng = this.data.texts.length;
    var vh = "";
    if (ttype == 1) {
      vh = "18vh";
    } else if (ttype == 2) {
      vh = "22.5vh";
    } else {
      vh = "30vh";
    }
    this.setData({
      len: leng,        //根据子的个数设置宽高
      vheight: vh,
      isonet: leng == 1 ? true : false,
      fonsize: 150 - leng * 10 + 'px'
    })
  },
  //是否弹出 底部文字输入按钮框组
  barout:function(e){
    this.setData({
      isbarout:!this.data.isbarout,
      iscolorout: false,
      issizeout:false
    })
  },
  sizechoose:function(){
      this.setData({
      issizeout: !this.data.issizeout,
      iscolorout: false
    })
  },
  // 将输入框的值赋予到页面上
  bindKeyInput: function (e) {
    var id = e.currentTarget.dataset.id;
    var texts_id = "texts[" + id + "].name"
    this.setData({
      [texts_id]:e.detail.value
    })
  },
  //获取焦点，弹出颜色选择框，增加边框线
  inputfocus: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentTab:id,
      iscolorout: true,
      tindex: id
    })
  },
  //改变颜色
  chanecolor:function(e){
    var id = e.currentTarget.dataset.id;
    var tin = this.data.tindex;
    this.setData({
      ['texts[' + tin + '].color']: this.data.colors[id],
      ['shadowColor[' + tin + ']']: 'shadow'+id,
    })
  },  
  //改变字体
  changesize:function(e){
    var id = e.currentTarget.dataset.id;
    var vh = "";
    // this.setData({
    //   len: leng,        //根据子的个数设置宽高
    //   isonet: leng == 1 ? true : false,
    //   fonsize: 150 - leng * 10 + 'px'
    // })
    if(id == 0){
        this.setData({
          vheight: "18vh",
          number:5
        })
    }else if( id ==1 ){
        this.setData({
          vheight: "22.5vh",
          number:4
        })
    }else if(id == 2){
        this.setData({
          vheight: "30vh",
          number:3
        })
    }
    this.setData({
      currentTab1:id,
      fonsize: this.data.sizeArr[id].size,
      sizename:this.data.sizeArr[id].name
    })
  }
})

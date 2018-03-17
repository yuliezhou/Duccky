Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  switchChange: function (e) {
    var status = e.detail.value;
    if (status == true){
        console.log('推送')
    }else{
      console.log('不推送')
    }
  },
})
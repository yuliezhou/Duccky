//app.js
App({
    onLaunch:function(res){
        
        //输入框的值
        var input_value = res.query.id
        //首页的显示状态
        var bool_bodyer_valapp = res.query.bool_bodyeron
        //荧光页的显示状态
        var bool_home_valapp = res.query.bool_homeon
        console.log(bool_home_valapp)
        if (input_value == undefined) {
            input_value = '让弹幕飞'
        }
        if (bool_bodyer_valapp == undefined) {
            bool_bodyer_valapp = true
        }
        if (bool_home_valapp == undefined) {
            bool_home_valapp = false
        }
        //将输入框的值设置到全局变量share_input
        this.globalData.share_input = input_value
        //将首页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_bodyer_val = bool_bodyer_valapp
        //将荧光页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_home_val = bool_home_valapp
    },
    onShow:function(res){
        //输入框的值
        var input_value = res.query.id
        //首页的显示状态
        var bool_bodyer_valapp = res.query.bool_bodyeron
        //荧光页的显示状态
        var bool_home_valapp = res.query.bool_homeon
        //荧光字的内容
        var share_strapp = res.query.share_stron

        if (input_value == undefined) {
            input_value = '让弹幕飞'
        }
        if (bool_bodyer_valapp == undefined) {
            bool_bodyer_valapp = true
        }
        if (bool_home_valapp == undefined) {
            bool_home_valapp = false
        }      
        if (share_strapp == undefined) {
            share_strapp = '让,弹,幕,飞,！,'
        }
        //将输入框的值设置到全局变量share_input
        this.globalData.share_input = input_value
        //将首页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_bodyer_val = bool_bodyer_valapp
        //将荧光页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_home_val = bool_home_valapp
        //将荧光页数值设置到全局变量shareStr
        this.globalData.shareStr = share_strapp

    },
    globalData:{
        share_input: '',
        bool_bodyer_val:'',
        bool_home_val:'',
        shareStr:''
    }
})
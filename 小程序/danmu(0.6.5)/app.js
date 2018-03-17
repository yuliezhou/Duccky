//app.js
App({
    onLaunch:function(res){
        //输入框的值
        var input_value = res.query.id
        //首页的显示状态
        var bool_bodyer_valapp = res.query.bool_bodyeron
        //荧光页的显示状态
        var bool_home_valapp = res.query.bool_homeon
        //荧光字的内容
        var share_strapp = res.query.share_stron
        //荧光字的个数
        var share_numapp = res.query.share_numberon
        //荧光字的颜色
        var shadowColorapp = res.query.shadowcoloron
        //荧光字输入框的颜色
        var ygClolorapp = res.query.ygCloloron
        if (input_value == undefined) {
            input_value = '让弹幕飞'
        }
        if (bool_bodyer_valapp == undefined) {
            bool_bodyer_valapp = false
        }
        if (bool_home_valapp == undefined) {
            bool_home_valapp = true
        }      
        if (share_strapp == undefined) {
            share_strapp = '让,弹,幕,飞,！,'
        }
        if (share_numapp == undefined) {
            share_numapp = '5'
        }
        if (shadowColorapp == undefined) {
            shadowColorapp = 'shadow0, shadow0, shadow0, shadow0, shadow0,'
        }
        if (ygClolorapp == undefined) {
            ygClolorapp = '#ec4498,#ec4498,#ec4498,#ec4498,#ec4498,'
        }

        //将输入框的值设置到全局变量share_input
        this.globalData.share_input = input_value
        //将首页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_bodyer_val = bool_bodyer_valapp
        //将荧光页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_home_val = bool_home_valapp
        //将荧光页数值设置到全局变量shareStr
        this.globalData.shareStr = share_strapp
        //将荧光字个数设置到全局变量shareNum
        this.globalData.shareNum = share_numapp
        //设置荧光字颜色
        this.globalData.shadowCol = shadowColorapp    
        //设置荧光字输入框颜色
        this.globalData.sizeiptCol = ygClolorapp

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
        //荧光字的个数
        var share_numapp = res.query.share_numberon
        //荧光字的颜色
        var shadowColorapp = res.query.shadowcoloron
        //荧光字输入框的颜色
        var ygClolorapp = res.query.ygCloloron
        if (input_value == undefined) {
            input_value = '让弹幕飞'
        }
        if (bool_bodyer_valapp == undefined) {
            bool_bodyer_valapp = false
        }
        if (bool_home_valapp == undefined) {
            bool_home_valapp = true
        }      
        if (share_strapp == undefined) {
            share_strapp = '让,弹,幕,飞,！,'
        }
        if (share_numapp == undefined) {
            share_numapp = '5'
        }
        if (shadowColorapp == undefined) {
            shadowColorapp = 'shadow0, shadow0, shadow0, shadow0, shadow0,'
        }
        if (ygClolorapp == undefined) {
            ygClolorapp = '#ec4498,#ec4498,#ec4498,#ec4498,#ec4498,'
        }

        //将输入框的值设置到全局变量share_input
        this.globalData.share_input = input_value
        //将首页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_bodyer_val = bool_bodyer_valapp
        //将荧光页状态设置到全局变量bool_bodyer_val
        this.globalData.bool_home_val = bool_home_valapp
        //将荧光页数值设置到全局变量shareStr
        this.globalData.shareStr = share_strapp
        //将荧光字个数设置到全局变量shareNum
        this.globalData.shareNum = share_numapp
        //设置荧光字颜色
        this.globalData.shadowCol = shadowColorapp    
        //设置荧光字输入框颜色
        this.globalData.sizeiptCol = ygClolorapp

    },
    globalData:{
        share_input: '',
        bool_bodyer_val:'',
        bool_home_val:'',
        shareStr:'',
        shareNum:'',
        shadowCol:'',
        sizeiptCol:''
    }
})
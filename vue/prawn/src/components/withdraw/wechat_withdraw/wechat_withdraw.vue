<template>
<div>
    <app-header :title = "'微信提现'"></app-header>
    <div class="my_balance">
        <p>我的账户余额：{{balance}}元</p>
    </div>

    <div class="head_tips" v-if="balancefleg">
        <img src="./img/tips.png">
        <p>余额{{balance}}元，您当前余额不足！</p>
    </div>

    <div class="recharge_wrap flex_between">
        <div class="recharge_item"  @click="cashWx(10)">
            <div class="money flex_column">
                <p>10元</p>
                <!-- <i>支付：8.50元</i> -->
            </div>
        </div>
        <div class="recharge_item"  @click="cashWx(20)">
            <div class="money flex_column">
                <p>20元</p>
                <!-- <i>支付：30.00元</i> -->
            </div>
        </div>        
    </div>
    <div class="recharge_wrap flex_between">
        <div class="recharge_item"  @click="cashWx(30)">
            <div class="money flex_column">
                <p>30元</p>
                <!-- <i>支付：59.50元</i> -->
            </div>
        </div>
        <div class="recharge_item"  @click="cashWx(50)">
            <div class="money flex_column">
                <p>50元</p>
                <!-- <i>支付：498.00元</i> -->
            </div>
        </div>        
    </div>
</div>    
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App',
    data(){
        return {
            balance:0,
            balancefleg:false,
            wxbind:false,
            price:{
                one:10,
                two:20,
                three:30,
                five:50,
            }
        }
    },

    mounted(){
        this.init()
    },
    updated(){
        this.$Indicator.close()
    },
    methods:{

        init(){
            this.$Indicator.open('加载中')        //loading弹窗
            this.sendGet("/cash/index.html")
            .then((res)=>{
                this.balance = res.data.data.balance;
                if(this.balance<10){
                    this.balancefleg = true;
                }
            })
            this.sendGet("/cash/wxpay.html")
            .then((res)=>{
                var resole=res.data;
                if(resole.status == 0){
                   MessageBox.alert('请在个人中心绑定微信！');
                    return false;
                }else{
                    this.wxbind=true;
                }
               
            })
        },

        cashWx(num){
                if(!this.wxbind){
                    MessageBox.alert('请在个人中心绑定微信！');
                    return false;
                }
                if(this.balance<num){
                    MessageBox.alert('余额不足!');
                    return false;
                }
                this.sendPost("/cash/dowxpay.html",{money:num})
                .then((res)=>{
                        var resole=res.data;
                        if(resole.status == 0){
                            MessageBox.alert(resole.info);
                            return false;
                        }else if(resole.status == 1){
                            this.$router.push('./withdraw_success');
                        }else{
                            this.$router.push('./withdraw_fail');
                        }
                })
        } 
    }

}
</script>

<style scoped>
.my_balance{
    margin-top: 2.1rem;
    padding-left: 1.8rem;
    color: #3F4552;
    font-size: 1rem;
}
.recharge_wrap{
    margin-top:1.5rem;
    padding: 0 1rem;
     
}
.recharge_wrap .recharge_item{
    width: 11.7rem;
    height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid black;
    border-radius: 1rem
}
.money p{
    color: #222222;
    font-size: 1.57rem;
    line-height:2.14rem;
    font-family: 'dx';
}
.money i{
    color: #222222;
    font-size:0.79rem;
    margin-top: 0.4rem
}
.head_tips{
    width: 100%;
    height: 3.14rem;
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    position: absolute;
    background:rgba(255,238,218,1);
    top: 3rem;
    left: 0;

}
.head_tips img{
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.5rem
}
.head_tips p{
    color: #F24C4C;
    font-size: 1rem
}
</style>

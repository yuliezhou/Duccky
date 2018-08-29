<template>
<div>
    <app-header :title = "'手机绑定'"></app-header>
    <div class="input_content">
        <input type="number"  v-model="phone" ref="content" placeholder="输入手机号码">
        <img v-show="phone.length!=0"  @click="cancelphone" class="cancel1" src="./img/cancel.png" >
    </div>
    <div class="input_content check">
        <input class='check_code' v-model="code" type="number" placeholder="输入验证码" >
        <p v-if="!send"   @click="sendCode">发送验证码</p>
        <div v-if="send" class="send"><img class='cancel2' src="./img/cancel.png" ><p >{{miao}}秒重新发送</p></div>
    </div>

    <div class="btn flex_jus_ali"  v-bind:class="{ blue: send}"  @click="bindphone">绑定</div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'App',
  data(){
    return {
            phone:"",
            miao:10,
            send:false, //控制验证码右边的提示内容
            timer: null,
            code:''
    }
  },
  mounted(){

  },
  directives: {
    focus: {
        inserted: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
    },
  methods:{
        sendCode(){
            if(this.phone == ''){
                MessageBox.alert("请输入手机号！");
                return false;
            }
            var myreg=/^[1][0-9]{10}$/;
            if (!myreg.test(this.phone)) {
                MessageBox.alert("手机格式错误！");
                return false;
            }
            this.sendGet("/User/sendcode.html?phone="+this.phone)
                .then((res)=>{
                    var userinfo = res.data;
                    if(userinfo.status == 0){
                        MessageBox.alert(userinfo.info);
                    }else{
                        this.miao=60;
                        this.send = true;
                        this.loopmiao();
                    }
                    
                })
        },
        bindphone(){
            if(this.send == false){
                MessageBox.alert("请先获取验证码！");
                return false;
            }
            this.sendGet("/User/savephone.html?phone="+this.phone+"&code="+this.code)
                .then((res)=>{
                    var userinfo = res.data;
                    if(userinfo.status == 0){
                        MessageBox.alert(userinfo.info);
                    }else{
                        MessageBox.alert("成功！");
                        this.$router.push('./edit')
                    }
                    
                })
        },
        loopmiao(){
            this.timer = setInterval(()=>{
                console.log(this.miao);
                var miao = this.miao;
                if(this.miao<1){
                    clearInterval(this.timer);
                    this.send=true;
                }else{
                    this.miao--;
                }
            }, 1000);
        },
        // 清除输入的手机号
        cancelphone(){
            this.phone='';
            this.$refs.content.focus()
        },
 
  }

}
</script>

<style  scoped>
.input_content{
   width: 22.5rem;
   margin: 2rem auto 0;
   padding-bottom: 1rem;
   border-bottom: 0.08rem solid #F1F1F1;
   position: relative;
}
input{
    border: none;
    font-size: 1.29rem;
    outline: none;
}
input::-webkit-input-placeholder{
    font-size: 1.29rem;
    color:rgba(204,204,204,1);
}
.check{
    position: relative
}
.check p{
    color: #3098FF;
    font-size: 1rem;
    position: absolute;
    right: 0;
    top: 0;
}
.btn{
    width:22.5rem;
    height:3.14rem;
    background:rgba(209,215,226,1);
    border-radius:1.57rem;
    color: white;
    font-size: 1.3rem;
    margin: 3rem auto
}
.cancel1{
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: 0;
    top: 0.5rem;
}
.send{
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    white-space: nowrap
}
.send p{
    color: #CCCCCC;
}
.check_code{
    width: 50%;
}
.cancel2{
    position: absolute;
    right: 7.5rem;
    width: 1rem;
    height: 1rem;
}
.blue{
    background: #3098FF;
    color: white;
}
</style>

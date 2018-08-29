import vue from 'vue'
import toastComponent from './toast.vue'
import { resolve } from 'url';
//返回一个扩展实例构造器
const ToastConstructor = vue.extend(toastComponent)

    //定义弹出组件的函数 接收1个参数要显示的文本
    const myToast = {
        alert: function(content){
            //实例化一个toast.vue
            return new Promise((resolve,reject) => {
                const toastDom = new ToastConstructor({
                    el: document.createElement('div'),
                    data() {
                        return {
                            alert_text:content,
                            alertShow:false
                        }
                    }
                })
                //把实例化的toast.vue 添加到body里
                toastDom.showToast(content)
                .then(()=>{
                    resolve()
                })
                document.body.appendChild(toastDom.$el)    
            })
        },
        confirm: function(content){
            return new Promise((resolve,reject)=>{
                const confirmDom = new ToastConstructor({
                    el: document.createElement('div'),
                    data(){
                        return{
                            confirm_text:content,
                            confirmShow:false
                        }
                    }
                })
                //把实例添加到body里
                confirmDom.showConfirm(content)
                .then(()=>{
                    resolve()
                })
                .catch(()=>{
                    reject()
                })
                document.body.appendChild(confirmDom.$el)    
            })
        }
    }



    //注册为全局组件的函数
    function registryToast() {
        // 将组件注册到vue的原型链
        vue.prototype.$MessageBox = myToast
    }

    export default registryToast
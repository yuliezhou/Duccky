// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import axios from 'axios'
// import $ from 'jquery'
import App from './App'
import Header from './common/header/Header'
import pop from './common/pop/pop'
import toast from './common/toast/toast.vue'
import mytoast from './common/toast/index.js'
import divpop from './common/pop/divpop'
import api from './common/js/api'
import consts from './common/js/consts'
import { ajax } from './api/ajax.js'
import {Indicator} from 'mint-ui'
import loadding from './common/loadding/loadding'
Vue.config.productionTip = false

Vue.component("app-header",Header)
Vue.use(VueRouter)
Vue.use(divpop)
Vue.use(mytoast)
Vue.use(api)
Vue.prototype.$axios = axios
Vue.prototype.$ = $
Vue.prototype.consts = consts
Vue.prototype.ajax = ajax
Vue.prototype.$Indicator=Indicator

const  routes = [
  {path:"*",redirect:'/'},
  {path:"/",component:resolve => require(['./components/Home/Home'],resolve),},
  {path:"/install",component:resolve => require(['./components/install/install'],resolve)},
  {path:"/detail",component:resolve => require(['./components/detail/detail'],resolve)},
  {path:"/dianrudetail",component:resolve => require(['./components/detail/dianrudetail'],resolve)},
  {path:"/CallbackList",component:resolve => require(['./components/Task/CallbackTask/CallbackList/CallbackList'],resolve)},
  {path:"/CallbackDetail",component:resolve => require(['./components/Task/CallbackTask/CallbackDetail/CallbackDetail'],resolve)},
  {path:"/CommentList" ,component:resolve => require(['./components/Task/CommentTask/CommentList/CommentList'],resolve)},
  {path:"/CommentDetail",component:resolve => require(['./components/Task/CommentTask/CommentDetail/CommentDetail'],resolve)},
  {path:"/AllianceList",component:resolve => require(['./components/Task/AllianceList/AllianceList'],resolve)},
  {path:"/ApprenticeTask",component:resolve => require(['./components/ApprenticeTask/ApprenticeTask'],resolve)},
  {path:"/my_Apprentice",component: resolve => require(['./components/ApprenticeTask/my_Apprentice/my_Apprentice'],resolve)},
  {path:"/link_Apprentice",component: resolve => require(['./components/ApprenticeTask/link_Apprentice/link_Apprentice'],resolve)},
  {path:"/own",component: resolve => require(['./components/own/own'],resolve)},
  {path:"/edit",component: resolve => require(['./components/own/edit/edit'],resolve)},
  {path:"/qrcode",component: resolve => require(['./components/own/qrcode/qrcode'],resolve)},
  {path:"/phoneBind",component: resolve => require(['./components/own/phoneBind/phoneBind'],resolve)},
  {path:"/withdraw",component: resolve => require(['./components/withdraw/withdraw'],resolve)},
  {path:"/withdraw_success",component: resolve => require(['./components/withdraw/withdraw_success/withdraw_success'],resolve)},
  {path:"/withdraw_fail",component: resolve => require(['./components/withdraw/withdraw_fail/withdraw_fail'],resolve)},
  {path:"/wechat_withdraw",component: resolve => require(['./components/withdraw/wechat_withdraw/wechat_withdraw'],resolve)},
  {path:"/wechat_bind",component: resolve => require(['./components/withdraw/wechat_bind/wechat_bind'],resolve)},
  {path:"/Account_detail", component: resolve => require(['./components/withdraw/Account_detail/Account_detail'],resolve)},
  {path:"/helpList", component:resolve => require(['./components/single/helpList'],resolve),meta:{keepAlive:false}},
  {path:"/help_detail", component:resolve => require(['./components/single/detail'],resolve),meta:{keepAlive:false}},
  {path:"/withdraw_tips", component:resolve => require(['./components/single/withdraw_tips'],resolve),},
  {path:"/PC",component:resolve => require(['./components/PC/pc'],resolve)},
  {path:"/about",component:resolve => require(['./components/PC/about/about'],resolve)},
  {path:"/toast",component:toast},
  {path:"/loadding",component:loadding}

  // {path:"*",redirect:'/'},
  // {path:"/",component:Home,},
  // {path:"/install",component:install},
  // {path:"/detail",component:detail},
  // {path:"/CallbackList",component:CallbackList},
  // {path:"/CallbackDetail",component:CallbackDetail},
  // {path:"/CommentList" ,component:CommentList},
  // {path:"/CommentDetail",component:CommentDetail},
  // {path:"/ApprenticeTask",component:ApprenticeTask},
  // {path:"/my_Apprentice",component:my_Apprentice},
  // {path:"/link_Apprentice",component:link_Apprentice},
  // {path:"/own",component:own},
  // {path:"/edit",component:edit},
  // {path:"/qrcode",component:qrcode},
  // {path:"/phoneBind",component:phoneBind},
  // {path:"/withdraw",component:withdraw},
  // {path:"/withdraw_success",component:withdraw_success},
  // {path:"/withdraw_fail",component:withdraw_fail},
  // {path:"/wechat_withdraw",component:wechat_withdraw},
  // {path:"/wechat_bind",component:wechat_bind},
  // {path:"/Account_detail", component:Account_detail},
  // {path:"/helpList", component:helpList,meta:{keepAlive:false}},
  // {path:"/help_detail", component:help_detail,meta:{keepAlive:false}},
  // {path:"/withdraw_tips", component:withdraw_tips,},
  // {path:"/PC",component:PC},
  // {path:"/about",component:about},
  // {path:"/toast",component:toast}  
]

const router = new VueRouter({
  mode:"history",
  routes,
  linkActiveClass:"active"
})

  //全局检测是否开启助手
router.beforeEach((to,from,next) => {
  if(to.path == '/'||to.path == '/PC'||to.path == '/install'||to.path == '/about'){
    next();
    return
  }
  if(api.PcVersion){
    next()
    return
  }
  var isClientLogin = api.isClientLogin();    
    if(isClientLogin.status==0){
      next(false)
      router.replace('/');
      return;
    }else{
      next()
    }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home.vue'
import MyFunction from '../pages/myfunction/MyFunction.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/myfunction',
      name: 'MyFunction',
      component: MyFunction
    }
  ]
})

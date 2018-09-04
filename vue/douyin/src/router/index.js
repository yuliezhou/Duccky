import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home'
import Table from '../pages/table/Table'
import Chart from '../pages/chart/Chart'
import Videolist from '../pages/videolist/Videolist'
import Videodes from '../pages/videodes/Videodes'
import MyFunction from '../pages/myfunction/MyFunction'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/MyFunction',
      name: 'MyFunction',
      component: MyFunction
    },
    {
      path: '/Table',
      name: 'Table',
      component: Table
    },
    {
      path: '/Chart',
      name: 'Chart',
      component: Chart,
      children:[
        {
          path: '/',
          name: 'Videolist',
          component: Videolist
        },        
        {
          path: 'videolist',
          name: 'Videolist',
          component: Videolist
        },        
      ]
    },
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index' 
import orderFood from '@/router/orderFood/orderFood'

Vue.use(VueRouter)

const routes = [

 
  {
     // 首页路由
    path: '/',
    name: 'home',
    component:Index 
  },

  // 其他页路由
  // orderFood页路由
  orderFood,

  {
    // 404路由
    path:'*',
    component:Index
  }
]

const router = new VueRouter({
  mode:'hash',
  routes
})

export default router

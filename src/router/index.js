import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login'
import Home from '../views/Home'
// import LookRoom from '../views/LookRome/index.vue'
// import Consulting from '../views/Consulting/index.vue'
// import Mys from '../views/Mys/index.vue'
// import HomePage from '../views/HomePage'
// import City from '@/views/city'
// import favorate from '@/views/favorate'
// import map from '@/views/map'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home/page' },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/house',
        component: () => import('../views/LookRome/index.vue')
      },
      {
        path: '/home/message',
        component: () => import('../views/Consulting/index.vue')
      },
      {
        path: '/home/profile',
        component: () => import('../views/Mys/index.vue')
      },
      { path: '/home/page', component: () => import('../views/HomePage') }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login')
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  },
  {
    path: '/favorate',
    component: () => import('@/views/favorate')
  },
  {
    path: '/map',
    component: () => import('@/views/map')
  }
]

const router = new VueRouter({
  routes
})

export default router

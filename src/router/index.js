import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    redirect:"/student",            //重定向到"/student"
    children:[
      {path: 'student',name: 'student',component: () => import('../views/Student.vue')},   //学生管理
      {path: 'analysis',name: 'analysis',component: () => import('../views/Analysis.vue')},  //数据分析
      {path: 'TestTable',name: 'TestTable',component: () => import('../views/TestTable.vue')},  //量表管理
      {path: 'booking',name: 'booking',component: () => import('../views/Booking.vue')},  //咨询室预约
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('../views/SignInView.vue')
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('../views/PersonView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

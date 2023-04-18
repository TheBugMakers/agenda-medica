import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/PublicTemplate.vue')
  },
  {
  path: '/calendar',
  name: 'calendar',
  component: () => import('@/views/CalendarView.vue')
  },
  {
    path: '/appointment/:appointment_id',
    name: 'appointment_detail',
    component: () => import('@/views/AppointmentDetail.vue')
  },
  {
    path: '/clientview',
    name: 'clientview',
    component: ()=> import('@/views/ClientView.vue')
  },
]

//router.beforeEach()

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

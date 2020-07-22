import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import List from '../components/saler/List'
import Login from '../components/Login'
import AdminRegister from '../components/admin/AdminRegister'
import AdminIndex from '../components/admin/surface/AdminIndex'
import AdminDashboard from '../components/admin/index'
import SalerRegister from '../components/saler/SalerRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register/saler',
      name: 'SalerRegister',
      component: SalerRegister
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/register/admin',
      name: 'AdminRegister',
      component: AdminRegister
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: AdminDashboard,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})

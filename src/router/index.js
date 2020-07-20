import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/user/Login'
import AdminLogin from '../components/admin/AdminLogin'
import AdminIndex from '../components/admin/surface/AdminIndex'
import AdminDashboard from '../components/admin/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/index',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/index/dashboard',
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

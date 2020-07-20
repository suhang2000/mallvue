import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import List from '../components/List'
import Login from '../components/user/Login'
import AdminLogin from '../components/admin/AdminLogin'

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import List from '../components/saler/List'
import Login from '../components/Login'
import PwdReset from '../components/pwdReset'
import AdminRegister from '../components/admin/AdminRegister'
import AdminIndex from '../components/admin/surface/AdminIndex'
import AdminDashboard from '../components/admin/index'
import SalerRegister from '../components/saler/SalerRegister'
import UserRegister from '../components/user/UserRegister'
import Home from '../components/user/Home'

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
      path: '/pwdReset',
      name: 'PwdReset',
      component: PwdReset
    },
    {
      path: '/register/user',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/register/saler',
      name: 'SalerRegister',
      component: SalerRegister
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
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
          // meta: {
          //   requireAuth: true
          // }
        }
      ]
    }
  ]
})

// 用于创建默认路由
// export const createRouter = routes => new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/hello',
//       name: 'HelloWorld',
//       component: HelloWorld,
//       meta: {
//         requireAuth: true
//       }
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/saler/login',
//       name: 'SalerLogin',
//       component: SalerLogin
//     },
//     {
//       path: '/list',
//       name: 'List',
//       component: List
//     },
//     {
//       path: '/admin/login',
//       name: 'AdminLogin',
//       component: AdminLogin
//     },
//     {
//       path: '/admin/register',
//       name: 'AdminRegister',
//       component: AdminRegister
//     },
//     {
//       path: '/admin',
//       name: 'Admin',
//       component: AdminIndex,
//       meta: {
//         requireAuth: true
//       },
//       children: [
//         {
//           path: '/admin/dashboard',
//           name: 'Dashboard',
//           component: AdminDashboard,
//           meta: {
//             requireAuth: true
//           }
//         }
//       ]
//     }
//   ]
// })

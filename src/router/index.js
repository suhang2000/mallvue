import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import PwdReset from '../components/pwdReset'

import UserRegister from '../components/user/UserRegister'
import SalerRegister from '../components/saler/SalerRegister'
import AdminRegister from '../components/admin/AdminRegister'

import Home from '../components/user/Home'
import Index from '../components/user/common/Index'
import Cart from '../components/user/common/Cart'
import Order from '../components/user/common/Order'
import UserInfo from '../components/user/common/UserInfo'

import AdminIndex from '../components/admin/AdminIndex'
import AdminDashboard from '../components/admin/function/dashbordIndex'
import OrderManage from '../components/admin/function/OrderManage'
import ProductManage from '../components/admin/function/ProductManage'
import SalerManage from '../components/admin/function/SalerManage'
import UserManage from '../components/admin/function/UserManage'
import AdminManage from '../components/admin/function/AdminManage'

import SalerIndex from '../components/saler/SalerIndex'
import SalerDashboard from '../components/saler/function/dashboardIndex'
import SalerInfo from '../components/saler/function/SalerInfo'
import SalerOrder from '../components/saler/function/SalerOrder'
import SalerProduct from '../components/saler/function/SalerProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'whitePage',
      redirect: '/login',
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
      path: '/register/admin',
      name: 'AdminRegister',
      component: AdminRegister
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/index',
      children: [
        {
          path: '/home/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/home/cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/home/order',
          name: 'Order',
          component: Order
        },
        {
          path: '/home/userinfo',
          name: 'UserInfo',
          component: UserInfo,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/saler',
      name: 'Saler',
      component: SalerIndex,
      redirect: '/saler/dashboard',
      // meta: {
      //   requireAuth: true
      // },
      children: [
        {
          path: '/saler/dashboard',
          name: 'Dashboard',
          component: SalerDashboard
        },
        {
          path: '/saler/order',
          name: 'SalerOrder',
          component: SalerOrder
        },
        {
          path: '/saler/product',
          name: 'SalerProduct',
          component: SalerProduct
        },
        {
          path: '/saler/salerinfo',
          name: 'SalerInfo',
          component: SalerInfo
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      redirect: '/admin/dashboard',
      // meta: {
      //   requireAuth: true
      // },
      children: [
        {
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: AdminDashboard
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/admin/product',
          name: 'ProductManage',
          component: ProductManage
        },
        {
          path: '/admin/user',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: '/admin/saler',
          name: 'SalerManage',
          component: SalerManage
        },
        {
          path: '/admin/order',
          name: 'OrderManage',
          component: OrderManage
        },
        {
          path: '/admin/admininfo',
          name: 'AdminManage',
          component: AdminManage
        },
        /*
        {
          path: '/admin/logout',
          name: 'AdminLogout',
          component: AdminLogout
        }*/
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

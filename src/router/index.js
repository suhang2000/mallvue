import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import List from '../components/saler/List'
import Login from '../components/Login'
import PwdReset from '../components/pwdReset'
import AdminRegister from '../components/admin/AdminRegister'
import AdminIndex from '../components/admin/AdminIndex'
import AdminDashboard from '../components/admin/function/dashbordIndex'
import AdminManage from '../components/admin/function/AdminManage'
import OrderManage from '../components/admin/function/OrderManage'
import ProductManage from '../components/admin/function/ProductManage'
import SalerManage from '../components/admin/function/SalerManage'
import UserManage from '../components/admin/function/UserManage'
import SalerRegister from '../components/saler/SalerRegister'
import UserRegister from '../components/user/UserRegister'
import Home from '../components/user/Home'
import Index from '../components/user/common/Index'
import Cart from '../components/user/common/Cart'
import Order from '../components/user/common/Order'
import UserInfo from '../components/user/common/UserInfo'
import GoodsInfo from '../components/saler/GoodsInfo'

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
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/list/apple',
      name: 'apple',
      component: GoodsInfo
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
          path: '/admin/admin',
          name: 'AdminManage',
          component: AdminManage
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

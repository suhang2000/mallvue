// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

// 这里要根据admin和saler的具体返回值（名字）来改
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.uname) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})

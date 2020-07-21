import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 仿照user添加admin和saler的session存储信息，然后在main.js里改认证判断
    user: {
      uname: window.SessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.SessionStorage.getItem('user' || '[]')).uname
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.SessionStorage.setItem('user', JSON.stringify(user))
    }
  }
})

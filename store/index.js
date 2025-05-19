// store/index.js (Vuex 示例)
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRole: uni.getStorageSync('userRole') || 'normal' // 默认普通用户
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role
      uni.setStorageSync('userRole', role)
    }
  }
})
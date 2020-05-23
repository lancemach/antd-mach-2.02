/*
 * @Author: lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime:-11-04 10:56:18
 * @LastEditors: Please set LastEditors
 * @Description: 开启动态菜单
 * @FilePath: .\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import i18n from './modules/i18n'
// import Settings from '@/config/defaultSettings'

// default router permission control
// import permission from './modules/permission'

// dynamic router permission control (Experimental)

import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    i18n,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})

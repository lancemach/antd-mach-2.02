/*
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 2020-05-23 23:08:11
 * @LastEditors: Please set LastEditors
 * @Description: 系统按需加载配置
 * @FilePath: .\src\main.js
 */
// ie polyfill
// import '@babel/polyfill' // 不需要兼容IE，减少体积

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import * as global from './utils/publicFinalStatic' // 配置基础公共常量

import bootstrap from './core/bootstrap'
import './core/lazy_use' // <==按需加载组件(减少编译和加载速度和提神性能)   ./core/use <== 全部加载组件
import './permission' // permission control
import './utils/filter' // global filter
import i18n from './locales' // i18n vue 国际化

// mock 判断环境不是 开发(MOCK)环境及加载 mock 服务
if (process.env.NODE_ENV !== 'production' && process.env.VUE_APP_MOCK === 'true') {
  require('./mock')
  // import './mock'
}

Vue.config.productionTip = false
// eslint-disable-next-line no-unused-vars
Vue.prototype.GLOBAL = global // 全局常量 挂载实例

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')

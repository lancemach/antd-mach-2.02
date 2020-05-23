/*
 * @Author: your name
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 2020-05-23 22:39:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\src\mock\index.js
 */
import Mock from 'mockjs2'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
// if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true' ) {
// 判断环境不是 开发(MOCK)环境及，加载 mock 服务
// if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_MOCK === 'true') {
// 使用同步加载依赖
// 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
console.log('mock mounting')
require('./services/auth')
require('./services/user')
require('./services/manage')
require('./services/other')
require('./services/tagCloud')
require('./services/article')

Mock.setup({
  timeout: 800 // setter delay time
})
console.log('mock mounted')
// }

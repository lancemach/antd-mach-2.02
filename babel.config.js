/*
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 2020-05-23 23:04:31
 * @LastEditors: Please set LastEditors
 * @Description: 移除 polyfill ，不需要兼容IE减少体积
 * @FilePath: .\babel.config.js
 */
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/app' // ,
    // [
    // '@babel/preset-env',
    // {
    //   'useBuiltIns': 'entry'
    // }
    // ]
  ],
  plugins
  // if your use import on Demand, Use this code
  // ,
  // plugins: [
  //   [ 'import', {
  //     'libraryName': 'ant-design-vue',
  //     'libraryDirectory': 'es',
  //     'style': true // `style: true` 会加载 less 文件
  //   } ]
  // ]
}

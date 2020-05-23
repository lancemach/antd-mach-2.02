/*
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 2020-5-22 11:40:07
 * @LastEditors: Please set LastEditors
 * @Description: 按需加载组件
 * @FilePath: .\src\core\lazy_use.js
 */
import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import '@/core/lazy_lib/components_use'
import Viser from 'viser-vue'
import 'ant-design-vue/dist/antd.less'

// ext library
import VueClipboard from 'vue-clipboard2'
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'

VueClipboard.config.autoSetContainer = true

Vue.use(Viser)

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)

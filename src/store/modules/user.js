/*
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 2020-5-22 16:31:23
 * @Description: In User Settings Edit
 * @FilePath: .\src\store\modules\user.js
 */
import Vue from 'vue'
import { Base64 } from 'js-base64'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, USER_SECRET } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    remember: '',
    secret: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_LOGIN_REMEMBER: (state, remember) => {
      state.remember = remember
    },
    SET_SECRET: (state, secret) => {
      state.secret = secret
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const rememberMe = userInfo.rememberMe
        delete userInfo.rememberMe
        login(userInfo).then(response => {
          const time = 7 * 24 * 60 * 60 * 1000
          const result = process.env.VUE_APP_MOCK === 'true' ? response.result : response
          if (result.code === process.env.VUE_APP_API_RESPONSE_CODE) {
            const token = result.data.token
            Vue.ls.set(ACCESS_TOKEN, token, time)
            commit('SET_TOKEN', token)
            if (rememberMe === true) {
              const secret = Base64.encode(userInfo.username) + '@' + userInfo.password
              Vue.ls.set(USER_SECRET, secret, time)
            } else {
              Vue.ls.remove(USER_SECRET)
            }
          }
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = process.env.VUE_APP_MOCK === 'true' ? response.result : response.data
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user

/*
 * @Author: Lance Ma
 * @Date:-09-10 09:30:06
 * @LastEditTime:-11-04 13:53:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\src\store\modules\i18n.js
 */
import { loadLanguageAsync } from '@/locales'

const i18n = {
  state: {
    lang: 'zh-CN'
  },
  mutations: {
    SET_LANG: (state, lang) => {
      state.lang = lang
    }
  },
  actions: {
    // 设置界面语言
    SetLang ({ commit }, lang) {
      return new Promise(resolve => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    }
  }
}

export default i18n

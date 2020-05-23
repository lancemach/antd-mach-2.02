/*
 * @Author: Lance Ma
 * @Date: 2020-5-22 10:59:19
 * @LastEditTime: 2020 16:23:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\antd-mach-2.02\src\locales\index.js
 */
/**
 * Vue i18n loader
 * created by @musnow
 * https://github.com/musnow
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Setting from '@/config/defaultSettings'
// default setting language
import zhCN from './lang/zh-CN'
// change default accept-language
import { axios } from '@/utils/request'

Vue.use(VueI18n)

export const defaultLang = 'zh-CN'

const messages = {
  'zh-CN': {
    ...zhCN
  }
}

const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

export default i18n

const loadedLanguages = [defaultLang]
const defaultSettingsLang = Setting.settings.lang
// 从缓存設置中加载当前语言
if (defaultSettingsLang !== null && defaultLang !== defaultSettingsLang) {
  loadLanguageAsync(defaultSettingsLang, true)
}
function getStrLanguage (str) {
  return str.substring(0, str.lastIndexOf('-'))
}
function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  const HTML = document.querySelector('html')
  const HTMLCLASS = HTML.classList
  const LANG = 'lang-' + lang.toLocaleLowerCase()
  const LANGCLASS = HTMLCLASS.value.split(' ').filter(item => item.indexOf('lang-') === -1)
  const LANGUAGE = [LANG, getStrLanguage(LANG), ...LANGCLASS]
  HTMLCLASS.value = LANGUAGE.join(' ')
  HTML.setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang = defaultLang, type = false) {
  return new Promise(resolve => {
    // 缓存语言设置
    if (type === false) {
      Vue.ls.set('lang', lang)
    }
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

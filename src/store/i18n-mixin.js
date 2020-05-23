/*
 * @Author: your name
 * @Date: 2020-5-22 13:47:02
 * @LastEditTime:-11-04 10:58:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\src\store\i18n-mixin.js
 */
import { mapState } from 'vuex'

const mixin = {
  computed: {
    ...mapState({
      currentLang: state => state.app.lang
    })
  },
  methods: {
    setLang (lang) {
      this.$store.dispatch('SetLang', lang)
    }
  }
}

export { mixin }

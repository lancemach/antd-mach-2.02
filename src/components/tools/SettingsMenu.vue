<!--
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 12:03:18
 * @LastEditors: Please set LastEditors
 * @Description: 系统配置
 * @FilePath: .\src\components\tools\SettingsMenu.vue
 -->
<template>
  <span class="settings-box">
    <a-dropdown overlayClassName="header-dropdown-menu">
      <span class="action setting">
        <a-icon type="setting" style="font-size: 16px"/>
      </span>
      <a-menu slot="overlay" style="width: 150px;">
        <a-menu-item key="zh-CN" @click="handleLangSelect">
          <lm-icon :type="`lfma-lang-${languages.langIcon}-cyclo`" /> {{ languages.langText }}
        </a-menu-item>
        <a-menu-item>
          <a-icon type="question-circle" /> 使用说明
        </a-menu-item>
        <a-menu-item>
          <a-icon type="info-circle" /> 关于...
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <lang-select :languages.sync="languages" />
  </span>
</template>

<script>
import PIcon from '@/components/PlmIcon/PlmIcon'
import langConfig from '@/locales/lang/lang-config'
import LangSelect from '@/components/tools/LangSelect'

export default {
  name: 'SettingsMenu',
  data () {
    return {
      langList: langConfig.config,
      listeningLang: this.$store.state,
      lang: this.$ls.get('lang') || this.$store.state.i18n.lang,
      languages: {
        modal: false,
        langIcon: 'cn',
        langText: '简体中文',
        languages: '请选择语言'
      }
    }
  },
  components: {
    'lang-select': LangSelect,
    'lm-icon': PIcon
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    handleLangSelect () {
      this.languages.modal = true
      console.log('点击语言菜单了')
    }
  }
}
</script>

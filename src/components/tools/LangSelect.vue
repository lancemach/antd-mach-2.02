<!--
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 2020-05-23 23:09:16
 * @LastEditors: Please set LastEditors
 * @Description: 启动预览国际化
 * @FilePath: .\src\components\tools\LangSelect.vue
 -->
<template>
  <a-modal
    class="lang-modal"
    :title="languages.selectLanguage"
    :footer="null"
    :maskClosable="false"
    :width="760"
    @cancel="handleCancelModal"
    centered
    v-model="languages.modal"
  >
    <a-row class="lang-box" type="flex" justify="start">
      <a-col :class="['lang-item', 'lang-item-real', langSelected === lang.key ? 'selected' : '']" v-for="lang in langList" :key="lang.key" @click="SwitchLang(lang.key)">
        <p class="lang-icon"><lm-icon :type="`lfma-lang-${ lang.icon }`" /></p>
        <p>{{ lang.text }}</p>
      </a-col>
      <a-col class="lang-item lang-stay-tuned">
        <p class="lang-icon"><lm-icon type="lfma-lang" /></p>
        <p>stay tuned ...</p>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { mixin as langMixin } from '@/store/i18n-mixin'
import langConfig from '@/locales/lang/lang-config'
import PIcon from '@/components/PlmIcon/PlmIcon'
import defaultConfig from '@/config/defaultSettings'

export default {
  name: 'LangSelect',
  // eslint-disable-next-line
  props: ['languages'],
  components: {
    'lm-icon': PIcon
  },
  mixins: [langMixin],
  data () {
    return {
      langSelected: '',
      langList: []
    }
  },
  mounted () {
    console.log('sdfsd', typeof this.$t('selectLanguage'))
    const STLANG = this.$store.state.i18n.lang // 当前状态 语言
    const LSLANG = this.$ls.get('lang') // 缓存语言
    const DELANG = defaultConfig.settings.lang // 系统默认配置语言
    const langData = langConfig.config
    const languages = {
      modal: this.languages.modal,
      langText: langConfig.config[STLANG],
      langIcon: this.langToIcon(STLANG)
    }
    this.langSelected = STLANG
    console.log(langData[STLANG], this.langToIcon(STLANG))
    if (LSLANG && LSLANG !== STLANG) {
      this.SwitchLang(LSLANG)
      languages.langText = langConfig.config[LSLANG]
      languages.langIcon = this.langToIcon(LSLANG)
    }
    if (!LSLANG && DELANG !== STLANG) {
      this.SwitchLang(DELANG)
      languages.langText = langConfig.config[DELANG]
      languages.langIcon = this.langToIcon(DELANG)
    }
    this.$emit('update:languages', languages)
    for (const key in langData) {
      if (langData.hasOwnProperty(key)) {
        this.langList.push({ key: key, icon: this.langToIcon(key), text: langData[key] })
      }
    }
  },
  methods: {
    handleEmitLanguages (obj = {}) {
      this.$emit('update:languages', obj)
    },
    handleCancelModal () {
      const languages = { modal: false }
      this.handleEmitLanguages(languages)
    },
    SwitchLang (key) {
      this.langSelected = key
      const languages = {
        modal: true,
        langText: langConfig.config[key],
        langIcon: this.langToIcon(key)
      }
      this.$emit('update:languages', languages)
      this.setLang(key)
    },
    langToIcon (str = 'CN') {
      const length = str.lastIndexOf('-')
      const langicon = str.substring(length + 1, str.length).toLocaleLowerCase()
      const icon = langicon === 'tw' ? 'cn' : langicon
      return icon
    }
  }
}
</script>

<style lang="less">
@import '../index.less';
.lang-modal .ant-modal-title{
  font-weight: 400
}
html[class|="lang-zh"] .lang-modal .ant-modal-title{
  font-weight: 500
}
.lang-box {
  padding: 25px 20px 50px
}
.lang-item p {
  margin-bottom: 0;
}
.lang-item {
  padding: 25px;
  margin: 15px 10px;
  min-height: 65px;
  border: 1px dashed transparent;
  border-radius: 5px;
  text-align: center;
  transition: all .3s
}
.lang-item-real {
  cursor: pointer;
}
.lang-item-real:hover {
  border-color: #d2d2d2;
}
.lang-item.selected {
  border-color: @primary-color;
}
.lang-icon .anticon svg {
  font-size: 60px;
  height: 60px;
}
.lang-stay-tuned p {
  color: #b2b2b2
}
.lang-stay-tuned .lang-icon svg {
  font-size: 52px;
  opacity: .6
}
</style>

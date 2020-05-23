<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <logo :title="title" :logo="logo" />
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"></s-menu>
    <div class="system-version">
      <p>{{ version }}</p>
    </div>
  </a-layout-sider>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'
import defaultSettings from '@/config/defaultSettings'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      title: defaultSettings.settings.software.subhead,
      logo: defaultSettings.settings.logo,
      version: defaultSettings.settings.version
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style lang="less">
  @import "../index.less";
.ant-layout-sider.ant-layout-sider-dark {
  .ant-menu-submenu:not(.ant-menu-submenu-selected) {
    .ant-menu-submenu-title {
      &:hover {
        background: rgba(255, 255, 255, .03)
      }
    }
  }
  .ant-menu-submenu.ant-menu-submenu-selected:not(.ant-menu-submenu-open) {
    .ant-menu-submenu-title {
      z-index: 1;
      background: none;
      &:after {
        position: absolute;
        z-index: 2;
        content: '';
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: @primary-color;
        opacity: .2;
      }
      &:before {
        position: absolute;
        z-index: -1;
        content: '';
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-image:-webkit-linear-gradient(left, rgba(255, 255, 255, 0.06) 0, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0) 100%)
      }
    }
  }
}
</style>

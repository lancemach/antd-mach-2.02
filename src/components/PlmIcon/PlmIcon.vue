<template>
  <plm-icon :type="type" />
</template>
<script>
import { Icon } from 'ant-design-vue'
import IconFontUtl from '@/assets/iconfont/iconfont'
const PlmIcon = Icon.createFromIconfontCN({
  scriptUrl: IconFontUtl
})
export default {
  components: {
    PlmIcon
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
</style>

<template>
  <div class="logo">
    <router-link :to="{name:''}" type="flex" justify="start">
      <PIcon class="logo-icon" :type="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import PIcon from '@/components/PlmIcon/PlmIcon'
export default {
  name: 'Logo',
  components: {
    PIcon
  },
  props: {
    title: {
      type: String,
      default: '管理系统',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    logo: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

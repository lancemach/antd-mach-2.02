<template>
  <div class="copyright">
    <div class="footer">
      <p> {{ settings.copyright }} {{ settings.company.name }} </p>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/config/defaultSettings'
export default {
  name: 'GlobalFooter',
  data () {
    return {
      settings: defaultSettings.settings
    }
  }
}
</script>

<style lang="less" scoped>
@import "../index.less";
.footer {
  padding: 0 16px;
  margin: 48px 0 12px;
  text-align: center;
  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>

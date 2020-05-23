<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <a-row class="container" type="flex" justify="center" align="middle">
      <div class="login-box">
        <div class="top">
          <a-row class="header" type="flex" justify="start">
            <PIcon class="logo" :type="settings.logo" />
            <p class="title"> {{ settings.software.title }} </p>
          </a-row>
          <div class="desc"> {{ settings.software.values }} </div>
        </div>
        <route-view></route-view>
      </div>
    </a-row>
    <div class="footer">
      <div class="copyright"> {{ settings.copyright }} {{ settings.company.name }} </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'
import defaultSettings from '@/config/defaultSettings'
import PIcon from '@/components/PlmIcon/PlmIcon'

export default {
  name: 'UserLayout',
  components: {
    RouteView,
    PIcon
  },
  mixins: [mixinDevice],
  data () {
    return {
      settings: defaultSettings.settings
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;
    position: relative;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      position: relative;
      .login-box {
        position: relative;
        top: -15px;
      }
      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            font-size: 45px;
            line-height: 100%;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            position: relative;
            top: 2px;
            font-weight: 600;
            text-shadow: 1px 5px 5px rgba(0, 0, 0, .05)
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }
    }
    .footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
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
  }
</style>

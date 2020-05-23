<!--
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime:  09:16:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: .\src\views\user\Login.vue
 -->
<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入登录用户名"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: '请输入用户名' }], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="登录密码"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <p class="remember-me"><a-checkbox
          v-decorator="[
            'rememberMe',
            {
              valuePropName: 'checked',
              initialValue: remember
            }
          ]"
        >自动登录<span class="tips">(公用电脑请勿勾选此项) </span></a-checkbox></p>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Vue from 'vue'
import md5 from 'md5'
import { Base64 } from 'js-base64'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { USER_SECRET } from '@/store/mutation-types'
export default {
  components: {},
  data () {
    return {
      loginBtn: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false
      },
      secret: Vue.ls.get(USER_SECRET),
      remember: false
    }
  },
  created () {
    this.$nextTick(() => {
      if (this.secret) {
        this.remember = true
        const userSecret = this.secret.split('@')
        this.form.setFieldsValue({
          username: Base64.decode(userSecret[0]),
          password: userSecret[1]
        })
      } else {
        this.remember = false
      }
    })
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password', 'rememberMe']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          loginParams.password = this.secret && this.secret.split('@')[1] === values.password ? values.password : md5(values.password)
          Login(loginParams)
            .then((res) => res.code === this.GLOBAL.RESPONSE_CODE ? this.loginSuccess(res) : this.loginFailed(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      this.$router.push({ name: process.env.VUE_APP_ROUTER_NAME }, () => {
        this.$notification['success']({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
    },
    loginFailed (res) {
      this.$notification['error']({
        message: '登录操作失败！',
        description: res.msg + '，请稍后再试',
        duration: 4
      })
    },
    requestFailed (err) {
      console.log(err)
      this.$notification['error']({
        message: '请求数据失败！',
        description: err + '，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less">
.user-layout-login {
  label {
    font-size: 12px;
  }
  .ant-input-lg {
    padding: 8px 11px;
    height: 45px;
  }
  .forge-password {
    font-size: 14px;
  }
  .remember-me {
    margin: 0;
    .tips {
      margin-left: 10px;
    }
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 44px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>

/*
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @Description: In User Settings Edit
 * @FilePath: .\src\mock\services\auth.js
 */
import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['21232f297a57a5a743894a0e4a801fc3', '8914de686ab28dc22f30d3d8e107ff6c', 'e10adc3949ba59abbe56e057f20f883e'] // admin, ant.design, 123456

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ 'code': '10401', 'msg': '账户或密码错误' }, '账户或密码错误', 200)
  }
  console.log('模拟登录返回数据', builder({
    'code': process.env.VUE_APP_API_RESPONSE_CODE,
    'msg': '数据通信成功，读取正常 ...',
    'data': {
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'username': 'admin',
      'password': '',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin',
      'createTime': 1497160610259,
      'deleted': 0,
      'roleId': 'admin',
      'lang': 'zh-CN',
      'token': '4291d7da9005377ec9aec4a71ea837f'
    }
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') }))
  return builder({
    'code': process.env.VUE_APP_API_RESPONSE_CODE,
    'msg': '数据通信成功，读取正常 ...',
    'data': {
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'username': 'admin',
      'password': '',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin',
      'createTime': 1497160610259,
      'deleted': 0,
      'roleId': 'admin',
      'lang': 'zh-CN',
      'token': '4291d7da9005377ec9aec4a71ea837f'
    }
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)

/*
 * @Author: Lance Ma
 * @Date: 2020-5-22 12:47:49
 * @LastEditTime: 2020-5-22 16:54:49
 * @FilePath: .\src\utils\domUtil.js
 */
export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export const domTitle = process.env.VUE_APP_DOM_TITLE ? process.env.VUE_APP_DOM_TITLE : '管理系统'

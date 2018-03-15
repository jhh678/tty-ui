/*
 * @Author: jhh678
 * @Date: 2017-11-08 18:56:01
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-01-16 15:44:07
 */
import router from '@/router'
import api from './rest-api'
import {
  sessionStore
} from '@/utils'
import {
  Message
} from '@/components'

const auth = {
  isLogined() {
    return !!sessionStore.get('token')
  },
  goLogin() {
    // let uriParams = encodeURIComponent(location.href)
    // location.href = config.envConfig.unifiedLoginUrl + '?url=' + uriParams
    router.push({
      path: '/login?router=' + router.history.current.path
    })
  },
  async getUserInfo() {
    if (!sessionStore.get('userInfo')) {
      let _this = this
      await api('getUserInfo').post({
        token: sessionStore.get('token')
      }).then((res) => {
        if (res.data.code === 200) {
          let userInfo = res.data.data.userInfo
          let permissions = {}
          userInfo.permissions.forEach((item) => {
            permissions[item.per_code] = true
          })

          userInfo.permissions = permissions
          sessionStore.set('userInfo', userInfo)
          return true
        } else {
          Message({
            message: '用户信息获取失败，请尝试重新登陆',
            type: 'error'
          })
          setTimeout(() => {
            _this.goLogin()
          }, 3000)
          return false
        }
      })
    }

    return true
  }
}

export default auth

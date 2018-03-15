import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import config from '@/config'
import apiUrls from '@/service/api-urls'
import {
  cookieStore
} from '@/utils'
import {
  Loading,
  Message
} from '@/components'
let loadingInstance
let timerId = {}
const TIMEOUT = 8000 // 接口8秒超时
// const NODE_ENV = (process.env.NODE_ENV || 'development').trim()
const BASE_URL = config.envConfig.apiOrigin
axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = TIMEOUT
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.transformRequest = [(data) => {
  // Do whatever you want to transform the data
  return qs.stringify(data)
}]
// 添加请求拦截
axios.interceptors.request.use(function (config) {
  // 请求之前处理
  // 添加Loading
  if (loadingInstance) {
    loadingInstance.close()
  }
  loadingInstance = Loading({
    message: '拼命加载中...'
  })
  // 设置接口超时的错误提示。
  timerId[config.url] = setTimeout(() => {
    loadingInstance.close()
    Message({
      message: '链接超时！',
      type: 'warning'
    })
  }, TIMEOUT)
  return config
}, function (error) {
  // 请求发生错误处理
  return Promise.reject(error)
})
// 添加响应拦截
axios.interceptors.response.use(function (response) {
  // 请求正确响应时处理
  clearTimeout(timerId[response.config.url])
  loadingInstance.close()
  if (response.status === 200) {
    // modify response
    const code = response.data.code
    const msg = response.data.msg || '请求异常，请稍后再试！'
    // 如果token过期，重新授权
    if (code === 101) {
      Message({
        message: 'token过期，请重新登录',
        type: 'info'
      })
      return
    } else if (code !== 200) {
      Message({
        message: msg,
        type: 'error'
      })
    }
  } else {
    let msg = response.statusText || '请求异常，请稍后再试！'
    Message({
      message: msg,
      type: 'error'
    })
  }
  return response
}, function (error) {
  // 响应发生错误处理
  Message({
    message: error.msg,
    type: 'error'
  })
  return Promise.reject(error)
})

// sessionStore.set('token', '870b53a6-58e9-4e7a-8a2e-a4b17b127ca9')

let createAxios = (baseURL, url) => {
  return {
    /*
     * axios get 请求
     * @param {Object} data - 需要的传参，选传，默认值为空对象
     * @param {Object} config - 其他配置项，选传，默认值为空对象
     * */
    get(data = {}, config = {}) {
      let token = cookieStore.get('SESSION')
      return axios.get(url, Object.assign({}, {
        token: token
      }, data), Object.assign({}, {
        baseURL: baseURL
      }, config))
    },
    /*
     * axios post 请求
     * @param {Object} data - 需要的传参，选传，默认值为空对象
     * @param {Object} config - 其他配置项，选传，默认值为空对象
     * */
    post(data = {}, config = {}) {
      let token = cookieStore.get('SESSION')
      return axios.post(url, Object.assign({}, {
        token: token
      }, data), Object.assign({}, {
        baseURL: baseURL
      }, config))
    }
  }
}

const api = (key) => {
  return createAxios(BASE_URL, apiUrls[key])
}

export default api

Vue.prototype.$api = api

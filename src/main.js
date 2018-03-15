import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/common'
import './assets/css/bootstrap'
import '@/components/message'
import '@/components/message-box'
import '@/utils/vue-global'
import '@/service/rest-api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

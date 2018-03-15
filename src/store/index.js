import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

// modules
import BasicData from './modules/basic-data'
import FinanceManage from './modules/finance-manage'
import MemberMarketing from './modules/member-marketing'
import Purchase from './modules/purchase'
import Sales from './modules/sales'
import StatisticalAnalysis from './modules/statistical-analysis'
import Storage from './modules/storage'
import Demo from './modules/demo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openedTabs: [{
      name: '首页',
      path: '/home'
    }],
    currentTabIndex: 0
  },
  getters,
  actions,
  mutations,
  modules: {
    BasicData,
    FinanceManage,
    MemberMarketing,
    Purchase,
    Sales,
    StatisticalAnalysis,
    Storage,
    Demo
  }
})

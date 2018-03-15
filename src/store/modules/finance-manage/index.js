/**
 * @file 财务管理模块
 * @author jhh678
 * @date 2017/9/22
 */

// state
const state = {
  shopCar: []
}

// getters
const getters = {}

// actions
const actions = {
  addShop({
    commit,
    state
  }, products) {
    commit('ADD_SHOP', products)
  },
  // 异步删除产品
  deleShop({
    commit,
    state
  }, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const arr = state.shopCar.filter(item => item.id !== id)
        commit('DELE_SHOP', arr)
        resolve(arr)
      }, 1000)
    })
  }
  // 让然也可以用 async 的方法
}

// mutations
const mutations = {
  ADD_SHOP(state, product) {
    state.shopCar.push(product)
  },
  DELE_SHOP(state, arr) {
    state.shopCar = arr
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
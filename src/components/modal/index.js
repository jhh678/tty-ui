import BModal from './modal'

/* istanbul ignore next */
BModal.install = function (Vue) {
  Vue.component(BModal.name, BModal)
}

export default BModal

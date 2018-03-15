import Vue from 'vue'
import msgboxVue from './message-box'
import {
  isVNode
} from '@/utils'

const MessageBoxConstructor = Vue.extend(msgboxVue)

let currentMsg, instance
let msgQueue = []
const defaults = {
  title: '提示',
  message: '',
  messageAlign: 'center',
  type: '',
  showInput: false,
  showClose: true,
  modalFade: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  closeOnHashChange: true,
  inputValue: null,
  inputPlaceholder: '',
  inputType: 'text',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: '确定',
  cancelButtonText: '关闭',
  confirmButtonClass: '',
  cancelButtonClass: '',
  customClass: '',
  beforeClose: null,
  dangerouslyUseHTMLString: false,
  center: false,
  roundButton: false
}

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        if (instance.showInput) {
          currentMsg.resolve({
            value: instance.inputValue,
            action
          })
        } else {
          currentMsg.resolve(action)
        }
      } else if (action === 'cancel' && currentMsg.reject) {
        currentMsg.reject(action)
      }
    }
  }
}

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })

  instance.callback = defaultCallback
}

const showNextMsg = () => {
  if (!instance) {
    initInstance()
  }
  instance.action = ''

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()

      let options = currentMsg.options
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop]
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback
      }

      let oldCb = instance.callback
      instance.callback = (action, instance) => {
        oldCb(action, instance)
        showNextMsg()
      }
      if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message]
        instance.message = null
      } else {
        delete instance.$slots.default
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true
        }
      })
      document.body.appendChild(instance.$el)
      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

const MessageBox = function (options, callback) {
  if (Vue.prototype.$isServer) return
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    }
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => { // eslint-disable-line
      msgQueue.push({
        options: Object.assign({}, defaults, MessageBox.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      })

      showNextMsg()
    })
  } else {
    msgQueue.push({
      options: Object.assign({}, defaults, MessageBox.defaults, options),
      callback: callback
    })

    showNextMsg()
  }
}

MessageBox.setDefaults = defaults => {
  MessageBox.defaults = defaults
}

MessageBox.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return MessageBox(Object.assign({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options))
}

MessageBox.confirm = (message, title = '操作确认提示', options = {}) => {
  if (typeof title === 'object') {
    options = title
    title = '操作确认提示'
  }
  options.confirmButtonText = options.confirmButtonText || '是'
  options.cancelButtonText = options.cancelButtonText || '否'
  return MessageBox(Object.assign({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options))
}

MessageBox.prompt = (message, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return MessageBox(Object.assign({
    title: title,
    message: message,
    showCancelButton: true,
    showInput: true,
    $type: 'prompt'
  }, options))
}

MessageBox.close = () => {
  instance.visible = false
  msgQueue = []
  currentMsg = null
}

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

export default MessageBox

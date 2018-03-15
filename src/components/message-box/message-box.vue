<template>
  <b-modal v-model="visible" :title="title" size="sm" :ok-text="confirmButtonText" :cancel-text="cancelButtonText" @ok-click="handleAction('confirm')" @cancel-click="handleAction('cancel')" vertical-align="middle" :show-confirm-button="showConfirmButton" :show-cancel-button="showCancelButton">
    <div class="b-message-box__wrapper">
      <div class="b-message-box" :class="[customClass]">
        <div class="b-message-box__content" v-if="message !== ''">
          <slot>
            <p v-if="!dangerouslyUseHTMLString" class="b-message-box__text" :style="{'textAlign': messageAlign}">
              <template v-if="Array.isArray(message)">
                <div v-for="(msg, index) of message" :key="index" class="b-message-box__textitem">{{msg}}</div>
              </template>
              <template v-else>
                {{ message }}
              </template>
            </p>
            <p v-else v-html="message"></p>
          </slot>
          <div class="b-message-box__input" v-show="showInput">
            <b-input
              v-model="inputValue"
              :type="inputType"
              @compositionstart.native="handleComposition"
              @compositionupdate.native="handleComposition"
              @compositionend.native="handleComposition"
              @keyup.enter.native="handleKeyup"
              :placeholder="inputPlaceholder"
              ref="input"></b-input>
            <div class="b-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import BInput from '@/components/input'
import BModal from '@/components/modal'
import domUtils from '@/utils/domUtils'

let typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}
export default {
  name: 'BMessageBox',
  componentName: 'BMessageBox',
  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    }
  },
  components: {
    BModal,
    BInput
  },
  computed: {
    typeClass() {
      return this.type && typeMap[this.type] ? `iconfont icon-${typeMap[this.type]}` : ''
    },
    confirmButtonClasses() {
      return `btn-primary ${this.confirmButtonClass}`
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`
    }
  },
  methods: {
    handleComposition(event) {
      if (event.type === 'compositionend') {
        setTimeout(() => {
          this.isOnComposition = false
        }, 100)
      } else {
        this.isOnComposition = true
      }
    },
    handleKeyup() {
      !this.isOnComposition && this.handleAction('confirm')
    },
    getSafeClose() {
      const currentId = this.uid
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose()
        })
      }
    },
    doClose() {
      this._closing = true
      this.onClose && this.onClose()
      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow
            document.body.style.paddingRight = this.bodyPaddingRight
          }
          this.bodyOverflow = null
          this.bodyPaddingRight = null
        }, 200)
      }
      this.opened = false
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
    },
    handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return
      }
      this.action = action
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose()
        this.beforeClose(action, this, this.close)
      } else {
        this.doClose()
      }
    },
    validate() {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
          domUtils.addClass(this.$refs.input.$el, 'has-error')
          return false
        }
        var inputValidator = this.inputValidator
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue)
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
            domUtils.addClass(this.$refs.input.$el, 'has-error')
            return false
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult
            return false
          }
        }
      }
      this.editorErrorMessage = ''
      domUtils.removeClass(this.$refs.input.$el, 'has-error')
      return true
    }
  },
  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && val !== null) {
            this.validate()
          }
        })
      }
    },
    visible(val) {
      if (val) {
        this.uid++
        this.focusAfterClosed = document.activeElement
      }
      // prompt
      if (this.$type !== 'prompt') return
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.$refs.input.$el.querySelector('input').focus()
          }
        }, 500)
      } else {
        this.editorErrorMessage = ''
        domUtils.removeClass(this.$refs.input.$el, 'has-error')
      }
    }
  },
  mounted() {
    if (this.closeOnHashChange) {
      window.addEventListener('hashchange', this.close)
    }
  },
  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
  },
  data() {
    return {
      visible: false,
      uid: 1,
      title: undefined,
      message: '',
      messageAlign: '',
      type: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '',
      cancelButtonText: '',
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false
    }
  }
}
</script>

<style lang="scss" scoped>
.b-message-box {
  .b-message-box__content {
    margin: 20px 0;
    .b-message-box__text {
      margin: 0;
      text-align: center;
      color: #333;
      line-height: 1;
      .b-message-box__textitem:not(:first-child) {
        margin-top: 10px;
      }

      & + .b-message-box__input {
        margin-top: 10px;
      }
    }

    .b-message-box__errormsg {
      margin-top: 2px;
      color: #f00;
    }
  }
}
</style>

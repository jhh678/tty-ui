<template>
  <transition name="b-message-fade">
    <div
      :class="[
        'b-message',
        type && !iconClass ? `b-message-${ type }` : '',
        customClass]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="message"
    >
      <!-- <i class="iconfont" :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i> -->
      <!-- <i class="iconfont icon-gou"></i> -->
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="b-message__content" tabindex="0">{{ message }}</p>
        <p v-else v-html="message" class="b-message__content"  tabindex="0"></p>
      </slot>
      <i v-if="showClose" class="b-message__closeBtn iconfont icon-close hover-layer" @click="close" tabindex="0" role="button" aria-label="close" @keydown.enter.stop="close"></i>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}
export default {
  name: 'BMessage',
  componentName: 'BMessage',
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false,
      initFocus: null,
      originFocus: null
    }
  },
  computed: {
    typeClass() {
      return this.type && !this.iconClass
        ? `b-message__icon iconfont icon-${typeMap[this.type]}`
        : ''
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
      this.originFocus && this.originFocus.focus() // 键盘焦点回归
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer() // detele 取消倒计时
      } else if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      } else {
        this.startTimer() // 恢复倒计时
      }
    }
  },
  mounted() {
    this.startTimer()
    this.originFocus = document.activeElement
    // this.initFocus = this.showClose ? this.$el.querySelector('.icon-close') : this.$el.querySelector('.b-message__content')
    // setTimeout(() => {
    //   this.initFocus && this.initFocus.focus()
    // })
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>

<style lang="scss" scoped>
.b-message {
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  min-width: 300px;
  padding: 10px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #fff;
  transition: opacity 0.3s, transform 0.4s;
  overflow: hidden;

  &.b-message-success {
    background-color: #f0f9eb;
    border-color: #008c1b;
    color: #00a53c;
  }

  &.b-message-info {
    background-color: #d9edf7;
    border-color: #bce8f1;
    color: #31708f;
  }

  &.b-message-warning {
    background-color: #fcf8e3;
    border-color: #faebcc;
    color: #8a6d3b;
  }

  &.b-message-error {
    background-color: #ffe6cc;
    border-color: #f00;
    color: #f00;
  }

  .b-message__content {
    display: inline-block;
    margin: 0;
    outline: none;
  }
}

.b-message__group {
  margin-left: 38px;
  position: relative;
  height: 20px;
  line-height: 20px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.b-message__group p {
  font-size: 14px;
  margin: 0 34px 0 0;
  white-space: nowrap;
  color: rgb(131, 165, 148);
  text-align: justify;
}

.b-message__group.is-with-icon {
  margin-left: 0;
}

.b-message__icon {
  vertical-align: middle;
  margin-right: 8px;
}

.b-message__closeBtn {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  transform: translateY(-50%);
  color: rgb(191, 217, 203);
}

.b-message__closeBtn:hover {
  color: rgb(151, 190, 171);
}

.b-message-fade-enter,
.b-message-fade-leave-active {
  opacity: 0;
  -ms-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%);
}
</style>

<template>
  <transition name="alert-fade">
    <div role="alert" :class="alertClass" v-show="realShow">
      <button type="button" class="close" aria-label="Close" v-if="closable" @click="closeAlert"><span aria-hidden="true">&times;</span></button>
      <slot>
        <template v-if="message">{{message}}</template>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BAlert',
  componentName: 'BAlert',
  props: {
    show: {
      Boolean,
      'default': false
    },
    closable: {
      type: Boolean,
      'default': true
    },
    duration: {
      type: Number,
      'default': 3000
    },
    type: {
      type: String,
      'default': 'info'
    },
    message: {
      type: String,
      'default': ''
    }
  },
  data() {
    return {
      timeout: 0,
      visible: true
    }
  },
  computed: {
    realShow() {
      return this.show === this.visible
    },
    alertClass() {
      return `alert alert-${this.type}`
    }
  },
  watch: {
    'realShow'(newVal, oldVal) {
      if (newVal && this.duration > 0) {
        this.timeout = setTimeout(this.closeAlert, this.duration)
      }
    }
  },
  methods: {
    closeAlert() {
      clearTimeout(this.timeout)
      this.visible = !this.show
      this.$emit('close')
    }
  },
  destroyed() {
    clearTimeout(this.timeout)
  }
}
</script>
<style scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  border-radius: 0;
}

.alert-fade-enter,
.alert-fade-leave-active {
  opacity: 0;
}
</style>

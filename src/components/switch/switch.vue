<template>
  <div
    class="b-switch"
    :class="{ 'is-disabled': disabled, 'is-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="disabled"
    @click="switchValue"
  >
    <input
      class="b-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      @keydown.enter="switchValue"
    >
    <span
      :class="['b-switch__label', 'b-switch__labb--left', checked ? 'is-active' : '']"
      v-show="checked"
      v-if="showText && (activeIconClass || activeText)">
      <i class="iconfont" :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="checked">{{ activeText }}</span>
    </span>    
    <span class="b-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
      <span class="b-switch__button" :style="{ transform }"></span>
    </span>
    <span
      :class="['b-switch__label', 'b-switch__labb--right', !checked ? 'is-active' : '']"
      v-show="!checked"
      v-if="showText && (inactiveIconClass || inactiveText)">
      <i class="iconfont" :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="!checked">{{ inactiveText }}</span>
    </span>
  </div>
</template>
<script>

export default {
  name: 'BSwitch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    showText: { type: Boolean, default: false },
    activeText: { type: String, default: '开' },
    inactiveText: { type: String, default: '关' },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      coreWidth: this.width
    }
  },
  created() {
    if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
      this.$emit('input', this.inactiveValue)
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue
    },
    transform() {
      return this.checked ? `translate3d(${this.coreWidth - 22}px, 0, 0)` : ''
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor()
      }
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('input', !this.checked ? this.activeValue : this.inactiveValue)
      this.$emit('change', !this.checked ? this.activeValue : this.inactiveValue)
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        this.$refs.input.checked = this.checked
      })
    },
    setBackgroundColor() {
      let newColor = this.checked ? this.activeColor : this.inactiveColor
      this.$refs.core.style.borderColor = newColor
      this.$refs.core.style.backgroundColor = newColor
    },
    switchValue() {
      this.$refs.input.click()
    }
  },
  mounted() {
    /* istanbul ignore if */
    this.coreWidth = this.width || 40
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor()
    }
    this.$refs.input.checked = this.checked
  }
}
</script>

<style lang="scss" scoped>
.b-switch {
  display: inline-block;
  position: relative;
  font-size: 14px;
  line-height: 22px;
  height: 22px;
  margin: 4px auto;
  vertical-align: middle;
}
.b-switch__label,
.b-switch__label * {
  position: absolute;
  font-size: 14px;
  display: inline-block;
  z-index: 1;
}
.b-switch .labb-fade-enter,
.b-switch .labb-fade-leave-active {
  opacity: 0;
}
.b-switch.is-disabled .b-switch__core {
  border-color: #ccc !important;
  background: #f5f5f5 !important;
}
.b-switch.is-disabled .b-switch__core span {
  background-color: #ccc !important;
}
.b-switch.is-disabled .b-switch__core ~ .b-switch__label * {
  color: #ccc !important;
}
.b-switch.is-checked .b-switch__core {
  border-color: #00a53c;
  background-color: #00a53c;
}
.b-switch.is-disabled .b-switch__core,
.b-switch.is-disabled .b-switch__label {
  cursor: not-allowed;
}
.b-switch__core,
.b-switch__label {
  width: 40px;
  height: 22px;
  cursor: pointer;
}
.b-switch__label {
  transition: 0.2s;
  left: 0;
  top: 0;
}
.b-switch__label * {
  line-height: 1;
  top: 4px;
  color: #fff;
}
.b-switch__labb--left i {
  left: 5px;
}
.b-switch__labb--right i {
  right: 5px;
}
.b-switch__input {
  display: none;
}
.b-switch__core {
  margin: 0;
  display: inline-block;
  position: relative;
  border: 1px solid rgb(191, 217, 203);
  outline: 0;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgb(191, 217, 203);
  transition: border-color 0.3s, background-color 0.3s;
}
.b-switch__core .b-switch__button {
  top: 2px;
  left: 2px;
  position: absolute;
  border-radius: 100%;
  transition: transform 0.3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}
.b-switch .b-switch__label.b-switch__labb--left span {
  left: 5px;
}
.b-switch .b-switch__label.b-switch__labb--right span {
  right: 5px;
}
</style>

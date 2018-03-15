<template>
  <label v-if="defineTpye === 'button'" class="b-checkbox-button" :class="{'is-checked': isChecked,'is-disabled': disabled}">
    <input
        v-if="trueLabel || falseLabel"
        class="b-checkbox-original"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange">
    <input
        v-else
        class="b-checkbox-original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange">
    <span class="b-checkbox-button-label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default && showLabel">{{label}}</template>
    </span>
  </label>
  <label v-else class="b-checkbox" :style="{ width: defineWidth }">
    <span class="b-checkbox-input"
      :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate
      }"
    >
      <span class="b-checkbox-inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="b-checkbox-original"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange">
      <input
        v-else
        class="b-checkbox-original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange">
    </span>
    <span class="b-checkbox-label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default && showLabel">{{label}}</template>
    </span>
  </label>
</template>
<script>
import Emitter from '@/utils/mixins/emitter'
export default {
  name: 'BCheckbox',
  componentName: 'BCheckbox',
  mixins: [Emitter],
  data() {
    return {
      selfModel: false
    }
  },
  computed: {
    model: {
      get() {
        return this.isGroup
          ? this.store
          : this.value !== undefined ? this.value : this.selfModel
      },
      set(val) {
        if (this.isGroup) {
          let isLimitExceeded = false
          if (
            this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min
          ) {
            isLimitExceeded = true
          }

          if (
            this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max
          ) {
            isLimitExceeded = true
          }

          if (!isLimitExceeded) {
            this.dispatch('BCheckboxGroup', 'input', [val])
          }
        } else {
          this.$emit('input', val)
          this.selfModel = val
        }
      }
    },
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel
      }
    },
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'BCheckboxGroup') {
          parent = parent.$parent
        } else {
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },
    defineTpye() {
      return this.isGroup ? this._checkboxGroup.type || this.type : this.type
    },
    defineWidth() {
      return this.isGroup
        ? this._checkboxGroup.width || this.width
        : this.width
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
    }
  },
  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    showLabel: {
      type: Boolean,
      default: true
    },
    type: String,
    width: String
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label)
      } else {
        this.model = this.trueLabel || true
      }
    },
    handleChange(ev) {
      this.$emit('change', ev)
      if (this.isGroup) {
        this.$nextTick(_ => {
          this.dispatch('BCheckboxGroup', 'change', [
            this._checkboxGroup.value,
            this._checkboxGroup.index
          ])
        })
      }
    }
  },
  created() {
    this.checked && this.addToStore()
  }
}
</script>

<style lang="scss" scoped>
.b-checkbox,
.b-checkbox-input {
  cursor: pointer;
  display: inline-block;
  position: relative;
}

.b-checkbox {
  height: 30px;
  line-height: 30px;
  margin: 0;
  font-size: 14px;
  white-space: nowrap;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.b-checkbox:not(:last-child) {
  margin-right: 15px;
}

.b-checkbox-input {
  white-space: nowrap;
  outline: 0;
  line-height: 1;
  vertical-align: middle;
}

.b-checkbox-input.is-indeterminate .b-checkbox-inner {
  background-color: #fff;
  border-color: #00a53c;
}

.b-checkbox-input.is-indeterminate .b-checkbox-inner::before {
  content: "";
  position: absolute;
  display: block;
  border: 1px solid #00a53c;
  margin-top: -1px;
  left: 2px;
  right: 2px;
  top: 50%;
}

.b-checkbox-input.is-indeterminate .b-checkbox-inner::after {
  display: none;
}

.b-checkbox-input.is-checked .b-checkbox-inner {
  border-color: #00a53c;
}

.b-checkbox-input.is-checked .b-checkbox-inner::after {
  border-color: #00a53c;
  -ms-transform: rotate(45deg) scaleY(1);
  transform: rotate(45deg) scaleY(1);
}

.b-checkbox-input.is-disabled .b-checkbox-inner {
  background-color: #f5f5f5;
  border-color: #ccc;
  cursor: not-allowed;
}

.b-checkbox-input.is-disabled .b-checkbox-inner::after {
  cursor: not-allowed;
  border-color: #ccc;
}

.b-checkbox-input.is-disabled .b-checkbox-inner + .b-checkbox-label {
  cursor: not-allowed;
}

.b-checkbox-input.is-disabled.is-checked .b-checkbox-inner {
  background-color: #f5f5f5;
  border-color: #ccc;
}

.b-checkbox-input.is-disabled.is-checked .b-checkbox-inner::after {
  border-color: #ccc;
}

.b-checkbox-input.is-disabled.is-indeterminate .b-checkbox-inner {
  background-color: #f5f5f5;
  border-color: #ccc;
}

.b-checkbox-input.is-disabled.is-indeterminate .b-checkbox-inner::before {
  border-color: #ccc;
}

.b-checkbox-input.is-disabled + .b-checkbox-label {
  color: #ccc;
  cursor: not-allowed;
}

.b-checkbox-inner {
  display: inline-block;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  background-color: #fff;
  z-index: 1;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}

.b-checkbox:hover .b-checkbox-inner {
  border-color: #00a53c;
}

.b-checkbox-inner::after {
  box-sizing: content-box;
  content: "";
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 8px;
  left: 4px;
  position: absolute;
  top: 1px;
  -ms-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  width: 4px;
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
  -ms-transform-origin: center;
  transform-origin: center;
}

.b-checkbox-original {
  opacity: 0;
  outline: 0;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  left: -999px;
}

.b-checkbox-button {
  position: relative;
  border: 1px solid #ccc;
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  margin: 10px auto 0;
  padding: 0 20px;

  &:not(:first-child) {
    margin-right: 10px;
  }

  &.is-checked {
    border-color: #00a53c;
    .b-checkbox-button-label {
      color: #00a53c;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    .b-checkbox-button-label {
      color: #ccc;
    }
  }
}
</style>

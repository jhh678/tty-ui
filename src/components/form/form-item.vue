<template>
  <div class="form-group" :class="{
    'has-success': validateState === 'success',
    'has-error': validateState === 'error',
    'required': isRequired || required
  }">
    <label class="control-label" :for="prop" v-bind:style="labelStyle" v-if="label || $slots.label">
      <slot name="label">{{label}}</slot>
    </label>
    <div class="form-item" v-bind:style="contentStyle">
      <slot></slot>
      <transition name="b-fade-in">
        <i v-if="showValidateIcon && (validateState === 'success' || validateState === 'error')" class="validation-icon iconfont" :class="{'icon-zhengque': validateState === 'success', 'icon-cuowu': validateState === 'error',}"></i>
      </transition>
      <transition name="b-zoom-in-top">
        <div class="validation-info" v-if="validateState === 'error' && showMessage && form.showMessage">{{validateMessage}}</div>
      </transition>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import emitter from '@/utils/mixins/emitter'
function getPropByPath(obj, path) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')
  let keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      throw new Error('please transfer a valid prop path to form item!')
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  }
}
export default {
  name: 'BFormItem',
  componentName: 'BFormItem',
  mixins: [emitter],
  props: {
    width: {
      type: String
    },
    label: String,
    labelWidth: String,
    prop: String,
    required: Boolean,
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    showValidateIcon: {
      type: Boolean,
      default: true
    },
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    error(value) {
      this.validateMessage = value
      this.validateState = value ? 'error' : ''
    },
    validateStatus(value) {
      this.validateState = value
    }
  },
  computed: {
    labelStyle() {
      var ret = {}
      if (this.form.labelPosition === 'top') return ret
      var labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },
    contentStyle() {
      var ret = {}
      const label = this.label
      if (this.form.labelPosition === 'top' || this.form.inline) return ret
      if (!label && !this.labelWidth && this.isNested) return ret
      var labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.marginLeft = labelWidth
      }
      if (this.width) {
        ret.width = this.width
      }
      return ret
    },
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'BForm') {
        if (parentName === 'BFormItem') {
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    fieldValue: {
      cache: false,
      get() {
        var model = this.form.model
        if (!model || !this.prop) { return }
        var path = this.prop
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.')
        }
        return getPropByPath(model, path).v
      }
    },
    isRequired() {
      let rules = this.getRules()
      let isRequired = false
      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false
    }
  },
  methods: {
    validate(trigger, callback = () => { }) {
      var rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        callback()
        return true
      }
      var descriptor = {}
      descriptor[this.prop] = rules
      var validator = new AsyncValidator(descriptor)
      var model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, (errors, fields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    resetField() {
      this.validateState = ''
      this.validateMessage = ''
      let model = this.form.model
      let value = this.fieldValue
      let path = this.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }
      let prop = getPropByPath(model, path)
      if (Array.isArray(value)) {
        this.validateDisabled = true
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        this.validateDisabled = true
        prop.o[prop.k] = this.initialValue
      }
    },
    getRules() {
      var formRules = this.form.rules
      var selfRules = this.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(selfRules || formRules || [])
    },
    getFilteredRule(trigger) {
      var rules = this.getRules()
      return rules.filter(rule => {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      })
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('BForm', 'b.form.addField', [this])
      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })
      let rules = this.getRules()
      if (rules.length) {
        this.$on('b.form.blur', this.onFieldBlur)
        this.$on('b.form.change', this.onFieldChange)
      }
    }
  },
  beforeDestroy() {
    this.dispatch('BForm', 'b.form.removeField', [this])
  }
}
</script>
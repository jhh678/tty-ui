<template>
  <b-input class="b-date-editor" :class="'b-date-editor--' + type" :readonly="readonly" :disabled="disabled" :size="size" v-clickoutside="handleClose" :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur" @keydown.native="handleKeydown" :value="displayValue" @change.native="displayValue = $event.target.value" :validateEvent="false" ref="reference">
    <i slot="icon" class="b-input__icon iconfont input-group-inner-addon" @click="handleClickIcon" :class="[showClose ? 'icon-close' : triggerClass]" @mouseenter="handleMouseEnterIcon" @mouseleave="showClose = false" v-if="haveTrigger"></i>
  </b-input>
</template>

<script>
  import Vue from 'vue'
  import Clickoutside from '@/utils/directives/clickoutside'
  import { formatDate, parseDate, getWeekNumber, equalDate, isDate } from './util'
  import Popper from '@/utils/popper/vue-popper'
  import Emitter from '@/utils/mixins/emitter'
  import BInput from '@/components/input'
  const NewPopper = {
    props: {
      appendToBody: Popper.props.appendToBody,
      offset: Popper.props.offset,
      boundariesPadding: Popper.props.boundariesPadding
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
  }
  const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    time: 'HH:mm:ss',
    week: 'yyyywWW',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    datetimerange: 'yyyy-MM-dd HH:mm:ss',
    year: 'yyyy'
  }
  const HAVE_TRIGGER_TYPES = [
    'date',
    'datetime',
    'time',
    'time-select',
    'week',
    'month',
    'year',
    'daterange',
    'timerange',
    'datetimerange'
  ]
  const DATE_FORMATTER = function(value, format) {
    return formatDate(value, format)
  }
  const DATE_PARSER = function(text, format) {
    return parseDate(text, format)
  }
  const RANGE_FORMATTER = function(value, format, separator) {
    if(Array.isArray(value) && value.length === 2) {
      const start = value[0]
      const end = value[1]
      if(start && end) {
        return formatDate(start, format) + separator + formatDate(end, format)
      }
    }
    return ''
  }
  const RANGE_PARSER = function(text, format, separator) {
    const array = text.split(separator)
    if(array.length === 2) {
      const range1 = array[0]
      const range2 = array[1]
      return [parseDate(range1, format), parseDate(range2, format)]
    }
    return []
  }
  const TYPE_VALUE_RESOLVER_MAP = {
    default: {
      formatter(value) {
        if(!value) return ''
        return '' + value
      },
      parser(text) {
        if(text === undefined || text === '') return null
        return text
      }
    },
    week: {
      formatter(value, format) {
        let date = formatDate(value, format)
        const week = getWeekNumber(value)
        date = /WW/.test(date) ? date.replace(/WW/, week < 10 ? '0' + week : week) : date.replace(/W/, week)
        return date
      },
      parser(text) {
        const array = (text || '').split('w')
        if(array.length === 2) {
          const year = Number(array[0])
          const month = Number(array[1])
          if(!isNaN(year) && !isNaN(month) && month < 54) {
            return text
          }
        }
        return null
      }
    },
    date: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    datetime: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    daterange: {
      formatter: RANGE_FORMATTER,
      parser: RANGE_PARSER
    },
    datetimerange: {
      formatter: RANGE_FORMATTER,
      parser: RANGE_PARSER
    },
    timerange: {
      formatter: RANGE_FORMATTER,
      parser: RANGE_PARSER
    },
    time: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    month: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    year: {
      formatter: DATE_FORMATTER,
      parser: DATE_PARSER
    },
    number: {
      formatter(value) {
        if(!value) return ''
        return '' + value
      },
      parser(text) {
        let result = Number(text)
        if(!isNaN(text)) {
          return result
        } else {
          return null
        }
      }
    }
  }
  const PLACEMENT_MAP = {
    left: 'bottom-start',
    center: 'bottom',
    right: 'bottom-end'
  }
  // only considers date-picker's value: Date or [Date, Date]
  const valueEquals = function(a, b) {
    const aIsArray = a instanceof Array
    const bIsArray = b instanceof Array
    if(aIsArray && bIsArray) {
      return new Date(a[0]).getTime() === new Date(b[0]).getTime() &&
        new Date(a[1]).getTime() === new Date(b[1]).getTime()
    }
    if(!aIsArray && !bIsArray) {
      return new Date(a).getTime() === new Date(b).getTime()
    }
    return false
  }
  export default {
    mixins: [Emitter, NewPopper],
    props: {
      size: String,
      format: String,
      readonly: Boolean,
      placeholder: String,
      disabled: Boolean,
      clearable: {
        type: Boolean,
        default: true
      },
      popperClass: String,
      align: {
        type: String,
        default: 'left'
      },
      value: {},
      defaultValue: {},
      rangeSeparator: {
        default: ' - '
      },
      pickerOptions: {}
    },
    components: {
      BInput
    },
    directives: {
      Clickoutside
    },
    data() {
      return {
        pickerVisible: false,
        showClose: false,
        currentValue: '',
        unwatchPickerOptions: null
      }
    },
    watch: {
      pickerVisible(val) {
        if(!val) this.dispatch('BFormItem', 'b.form.blur')
        if(this.readonly || this.disabled) return
        val ? this.showPicker() : this.hidePicker()
      },
      currentValue(val) {
        if(val) return
        if(this.picker && typeof this.picker.handleClear === 'function') {
          this.picker.handleClear()
        } else {
          this.$emit('input')
        }
      },
      value: {
        immediate: true,
        handler(val) {
          this.currentValue = isDate(val) ? new Date(val) : val
        }
      },
      displayValue(val) {
        this.$emit('change', val)
        this.dispatch('BFormItem', 'b.form.change')
      }
    },
    computed: {
      reference() {
        return this.$refs.reference.$el
      },
      refInput() {
        if(this.reference) return this.reference.querySelector('input')
        return {}
      },
      valueIsEmpty() {
        const val = this.currentValue
        if(Array.isArray(val)) {
          for(let i = 0, len = val.length; i < len; i++) {
            if(val[i]) {
              return false
            }
          }
        } else {
          if(val) {
            return false
          }
        }
        return true
      },
      triggerClass() {
        return this.type.indexOf('time') !== -1 ? 'icon-time' : 'icon-calendar'
      },
      selectionMode() {
        if(this.type === 'week') {
          return 'week'
        } else if(this.type === 'month') {
          return 'month'
        } else if(this.type === 'year') {
          return 'year'
        }
        return 'day'
      },
      haveTrigger() {
        if(typeof this.showTrigger !== 'undefined') {
          return this.showTrigger
        }
        return HAVE_TRIGGER_TYPES.indexOf(this.type) !== -1
      },
      displayValue: {
        get() {
          const value = this.currentValue
          if(!value) return
          const formatter = (
            TYPE_VALUE_RESOLVER_MAP[this.type] ||
            TYPE_VALUE_RESOLVER_MAP['default']
          ).formatter
          const format = DEFAULT_FORMATS[this.type]
          return formatter(value, this.format || format, this.rangeSeparator)
        },
        set(value) {
          if(value) {
            const type = this.type
            const parser = (
              TYPE_VALUE_RESOLVER_MAP[type] ||
              TYPE_VALUE_RESOLVER_MAP['default']
            ).parser
            const parsedValue = parser(value, this.format || DEFAULT_FORMATS[type], this.rangeSeparator)
            if(parsedValue && this.picker) {
              this.picker.value = parsedValue
            }
          } else {
            this.$emit('input', value)
            this.picker.value = value
          }
          this.$forceUpdate()
        }
      }
    },
    created() {
      // vue-popper
      this.popperOptions = {
        boundariesPadding: 0,
        gpuAcceleration: false
      }
      this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left
    },
    methods: {
      handleMouseEnterIcon() {
        if(this.readonly || this.disabled) return
        if(!this.valueIsEmpty && this.clearable) {
          this.showClose = true
        }
      },
      handleClickIcon(event) {
        if(this.readonly || this.disabled) return
        if(this.showClose) {
          this.currentValue = this.$options.defaultValue || ''
          this.showClose = false
        } else {
          this.pickerVisible = !this.pickerVisible
          if(this.pickerVisible) {
            event.target.parentNode.querySelector('input').focus()
          }
        }
      },
      dateChanged(dateA, dateB) {
        if(Array.isArray(dateA)) {
          let len = dateA.length
          if(!dateB) return true
          while(len--) {
            if(!equalDate(dateA[len], dateB[len])) return true
          }
        } else {
          if(!equalDate(dateA, dateB)) return true
        }
        return false
      },
      handleClose() {
        this.pickerVisible = false
      },
      handleFocus() {
        const type = this.type
        if(HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
          this.pickerVisible = true
        }
        this.$emit('focus', this)
      },
      handleBlur() {
        this.$emit('blur', this)
      },
      handleKeydown(event) {
        const keyCode = event.keyCode
        // TAB or ESC
        if(keyCode === 9 || keyCode === 27) {
          this.pickerVisible = false
          event.stopPropagation()
        }
      },
      hidePicker() {
        if(this.picker) {
          this.picker.resetView && this.picker.resetView()
          this.pickerVisible = this.picker.visible = false
          this.destroyPopper()
        }
      },
      showPicker() {
        if(this.$isServer) return
        if(!this.picker) {
          this.mountPicker()
        }
        this.pickerVisible = this.picker.visible = true
        this.updatePopper()
        if(this.currentValue instanceof Date) {
          this.picker.date = new Date(this.currentValue.getTime())
        } else {
          this.picker.value = this.currentValue
        }
        this.picker.resetView && this.picker.resetView()
        this.$nextTick(() => {
          this.picker.ajustScrollTop && this.picker.ajustScrollTop()
        })
      },
      mountPicker() {
        this.panel.defaultValue = this.defaultValue || this.currentValue
        this.picker = new Vue(this.panel).$mount()
        this.picker.popperClass = this.popperClass
        this.popperElm = this.picker.$el
        this.picker.width = this.reference.getBoundingClientRect().width
        this.picker.showTime = this.type === 'datetime' || this.type === 'datetimerange'
        this.picker.selectionMode = this.selectionMode
        if(this.format) {
          this.picker.format = this.format
        }
        const updateOptions = () => {
          const options = this.pickerOptions
          if(options && options.selectableRange) {
            let ranges = options.selectableRange
            const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser
            const format = DEFAULT_FORMATS.timerange
            ranges = Array.isArray(ranges) ? ranges : [ranges]
            this.picker.selectableRange = ranges.map(range => parser(range, format, this.rangeSeparator))
          }
          for(const option in options) {
            if(options.hasOwnProperty(option) &&
              // 忽略 time-picker 的该配置项
              option !== 'selectableRange') {
              this.picker[option] = options[option]
            }
          }
        }
        updateOptions()
        this.unwatchPickerOptions = this.$watch('pickerOptions', () => updateOptions(), {
          deep: true
        })
        this.$el.appendChild(this.picker.$el)
        this.picker.resetView && this.picker.resetView()
        this.picker.$on('dodestroy', this.doDestroy)
        this.picker.$on('pick', (date = '', visible = false) => {
          // do not emit if values are same
          if(!valueEquals(this.value, date)) {
            this.$emit('input', date)
          }
          this.pickerVisible = this.picker.visible = visible
          this.picker.resetView && this.picker.resetView()
        })
        this.picker.$on('select-range', (start, end) => {
          this.refInput.setSelectionRange(start, end)
          this.refInput.focus()
        })
      },
      unmountPicker() {
        if(this.picker) {
          this.picker.$destroy()
          this.picker.$off()
          if(typeof this.unwatchPickerOptions === 'function') {
            this.unwatchPickerOptions()
          }
          this.picker.$el.parentNode.removeChild(this.picker.$el)
        }
      }
    }
  }
</script>
<style lang="scss">
  .b-month-table,
  .b-year-table {
    margin: -1px;
    border-collapse: collapse
  }

  .b-date-picker table,
  .b-date-range-picker table {
    table-layout: fixed;
    width: 100%
  }

  .b-date-table {
    font-size: 12px;
    min-width: 224px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  .b-date-table td {
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer
  }

  .b-date-table td.next-month,
  .b-date-table td.prev-month {
    color: #ddd
  }

  .b-date-table td.today {
    color: #00a53c;
    position: relative
  }

  .b-date-table td.today:before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: .5em solid #00a53c;
    border-left: .5em solid transparent
  }

  .b-month-table td .cell,
  .b-year-table td .cell {
    width: 48px;
    height: 32px;
    display: block;
    line-height: 32px
  }

  .b-date-table td.available:hover {
    background-color: rgb(228, 241, 236)
  }

  .b-date-table td.in-range {
    background-color: rgb(204, 237, 216)
  }

  .b-date-table td.in-range:hover {
    background-color: rgb(204, 237, 216)Hover
  }

  .b-date-table td.current:not(.disabled),
  .b-date-table td.end-date,
  .b-date-table td.start-date {
    background-color: #00a53c!important;
    color: #fff
  }

  .b-date-table td.disabled {
    background-color: #f4f4f4;
    opacity: 1;
    cursor: not-allowed;
    color: #ccc
  }

  .b-date-table td.week {
    font-size: 80%;
    color: rgb(131, 165, 148)
  }

  .b-date-table th {
    padding: 5px;
    color: rgb(131, 165, 148);
    font-weight: 400;
    text-align: center;
  }

  .b-date-table.is-week-mode .b-date-table__row:hover {
    background-color: rgb(228, 241, 236)
  }

  .b-date-table.is-week-mode .b-date-table__row.current {
    background-color: rgb(204, 237, 216)
  }

  .b-month-table {
    font-size: 12px
  }

  .b-month-table td {
    text-align: center;
    padding: 20px 3px;
    cursor: pointer
  }

  .b-month-table td .cell {
    color: rgb(72, 106, 89)
  }

  .b-month-table td .cell:hover {
    background-color: rgb(228, 241, 236)
  }

  .b-month-table td.disabled .cell {
    background-color: #f4f4f4;
    cursor: not-allowed;
    color: #ccc
  }

  .b-month-table td.current:not(.disabled) .cell {
    background-color: #00a53c!important;
    color: #fff
  }

  .b-year-table {
    font-size: 12px
  }

  .b-year-table .b-icon {
    color: rgb(151, 190, 171)
  }

  .b-year-table td {
    text-align: center;
    padding: 20px 3px;
    cursor: pointer
  }

  .b-year-table td .cell {
    color: rgb(72, 106, 89)
  }

  .b-year-table td .cell:hover {
    background-color: rgb(228, 241, 236)
  }

  .b-year-table td.disabled .cell {
    background-color: #f4f4f4;
    cursor: not-allowed;
    color: #ccc
  }

  .b-year-table td.current:not(.disabled) .cell {
    background-color: #00a53c!important;
    color: #fff
  }

  .b-time-spinner.has-seconds .b-time-spinner__wrapper {
    width: 33%
  }

  .b-time-spinner.has-seconds .b-time-spinner__wrapper:nth-child(2) {
    margin-left: 1%
  }

  .b-time-spinner__wrapper {
    max-height: 190px;
    display: inline-block;
    width: 50%;
    vertical-align: top;
    position: relative
  }

  .b-time-spinner__wrapper .b-scrollbar__wrap:not(.b-scrollbar__wrap--hidden-default) {
    box-sizing: content-box;
    padding-bottom: 15px;
  }

  .b-time-spinner__list {
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center
  }

  .b-time-spinner__list::after,
  .b-time-spinner__list::before {
    content: '';
    display: block;
    width: 100%;
    height: 80px
  }

  .b-time-spinner__item {
    height: 32px;
    line-height: 32px;
    font-size: 12px
  }

  .b-time-spinner__item:hover:not(.disabled):not(.active) {
    background: rgb(228, 241, 236);
    cursor: pointer
  }

  .b-time-spinner__item.active:not(.disabled) {
    color: #fff
  }

  .b-time-spinner__item.disabled {
    color: rgb(209, 229, 219);
    cursor: not-allowed
  }

  .b-date-editor {
    position: relative;
  }

  .b-date-editor .b-picker-panel {
    position: absolute;
    min-width: 180px;
    box-sizing: border-box;
    box-shadow: 0 2px 6px #ccc;
    background: #fff;
    z-index: 10;
    top: 41px
  }

  .b-date-editor.b-input {
    width: 193px !important;
  }

  .b-date-editor--daterange.b-input {
    width: 220px !important;
  }

  .b-date-editor--datetimerange.b-input {
    width: 350px !important;
  }

  .b-picker-panel {
    color: rgb(72, 106, 89);
    border: 1px solid rgb(209, 229, 219);
    box-shadow: 0 2px 6px #ccc;
    background: #fff;
    border-radius: 2px;
    line-height: 20px;
    margin: 5px 0;
  }

  .b-picker-panel__body-wrapper::after,
  .b-picker-panel__body::after {
    content: "";
    display: table;
    clear: both;
  }

  .b-picker-panel__content {
    position: relative;
    margin: 15px;
  }

  .b-picker-panel__footer {
    border-top: 1px solid #e4e4e4;
    padding: 4px;
    text-align: right;
    background-color: #fff;
    position: relative;
  }

  .b-picker-panel__shortcut {
    display: block;
    width: 100%;
    border: 0;
    background-color: transparent;
    line-height: 28px;
    font-size: 14px;
    color: rgb(72, 106, 89);
    padding-left: 12px;
    text-align: left;
    outline: 0;
    cursor: pointer;
  }

  .b-picker-panel__shortcut:hover {
    background-color: rgb(228, 241, 236);
  }

  .b-picker-panel__shortcut.active {
    background-color: #e6f1fe;
    color: #00a53c;
  }

  .b-picker-panel__btn {
    border: 1px solid #dcdcdc;
    color: #333;
    line-height: 24px;
    border-radius: 2px;
    padding: 0 20px;
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    font-size: 12px;
  }

  .b-picker-panel__btn[disabled] {
    color: #ccc;
    cursor: not-allowed;
  }

  .b-picker-panel__icon-btn {
    font-size: 12px;
    color: rgb(151, 190, 171);
    border: 0;
    background: 0 0;
    cursor: pointer;
    outline: 0;
  }

  .b-date-picker__header-label.active,
  .b-date-picker__header-label:hover,
  .b-picker-panel__icon-btn:hover {
    color: #00a53c;
  }

  .b-picker-panel__link-btn {
    cursor: pointer;
    color: #00a53c;
    text-decoration: none;
    padding: 15px;
    font-size: 12px;
    &:hover, &:active {
      text-decoration: none;
    }
  }

  .b-picker-panel [slot=sidebar],
  .b-picker-panel__sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 110px;
    border-right: 1px solid #e4e4e4;
    box-sizing: border-box;
    padding-top: 6px;
    background-color: rgb(250, 253, 251);
    overflow: auto;
  }

  .b-picker-panel [slot=sidebar]+.b-picker-panel__body,
  .b-picker-panel__sidebar+.b-picker-panel__body {
    margin-left: 110px;
  }

  .b-date-picker {
    min-width: 254px;
  }

  .b-date-picker .b-picker-panel__content {
    min-width: 224px;
  }

  .b-date-picker.has-sidebar.has-time {
    min-width: 434px;
  }

  .b-date-picker.has-sidebar {
    min-width: 370px;
  }

  .b-date-picker.has-time {
    min-width: 324px;
  }

  .b-date-picker__editor-wrap {
    position: relative;
    display: table-cell;
    padding: 0 5px;
  }

  .b-date-picker__time-header {
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 8px 5px 5px;
    display: table;
    width: 100%;
    box-sizing: border-box;
  }

  .b-date-picker__header {
    margin: 12px;
    text-align: center;
  }

  .b-date-picker__header-label {
    font-size: 14px;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
  }

  .b-date-picker__prev-btn {
    float: left;
  }

  .b-date-picker__next-btn {
    float: right;
  }

  .b-date-picker__time-wrap {
    padding: 10px;
    text-align: center;
  }

  .b-date-picker__time-label {
    float: left;
    cursor: pointer;
    line-height: 30px;
    margin-left: 10px;
  }

  .b-date-range-picker {
    min-width: 520px;
  }

  .b-date-range-picker .b-picker-panel__body {
    min-width: 513px;
  }

  .b-date-range-picker .b-picker-panel__content {
    margin: 0;
  }

  .b-date-range-picker.has-sidebar.has-time {
    min-width: 766px;
  }

  .b-date-range-picker.has-sidebar {
    min-width: 620px;
  }

  .b-date-range-picker.has-time {
    min-width: 660px;
  }

  .b-date-range-picker__header {
    position: relative;
    text-align: center;
    height: 28px;
  }

  .b-date-range-picker__header button {
    float: left;
  }

  .b-date-range-picker__header div {
    font-size: 14px;
    margin-right: 50px;
  }

  .b-date-range-picker__content {
    float: left;
    width: 50%;
    box-sizing: border-box;
    margin: 0;
    padding: 16px;
  }

  .b-date-range-picker__content.is-right .b-date-range-picker__header button {
    float: right;
  }

  .b-date-range-picker__content.is-right .b-date-range-picker__header div {
    margin-left: 50px;
    margin-right: 50px;
  }

  .b-date-range-picker__content.is-left {
    border-right: 1px solid #e4e4e4;
  }

  .b-date-range-picker__editors-wrap {
    box-sizing: border-box;
    display: table-cell;
  }

  .b-date-range-picker__editors-wrap.is-right {
    text-align: right;
  }

  .b-date-range-picker__time-header {
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 8px 5px 5px;
    display: table;
    width: 100%;
    box-sizing: border-box;
  }

  .b-date-range-picker__time-header>.b-icon-arrow-right {
    font-size: 20px;
    vertical-align: middle;
    display: table-cell;
    color: rgb(151, 190, 171);
  }

  .b-date-range-picker__time-picker-wrap {
    position: relative;
    display: table-cell;
    padding: 0 5px;
  }

  .b-date-range-picker__time-picker-wrap .b-picker-panel {
    position: absolute;
    top: 13px;
    right: 0;
    z-index: 1;
    background: #fff;
  }

  .b-input__inner,
  .b-textarea__inner {
    box-sizing: border-box;
    background-image: none;
  }

  .b-time-range-picker {
    min-width: 354px;
    overflow: visible;
  }

  .b-time-range-picker__content {
    position: relative;
    text-align: center;
    padding: 10px;
  }

  .b-time-range-picker__cell {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 7px 7px;
    width: 50%;
    display: inline-block;
  }

  .b-time-range-picker__header {
    margin-bottom: 5px;
    text-align: center;
    font-size: 14px;
  }

  .b-time-range-picker__body {
    border-radius: 2px;
    border: 1px solid rgb(209, 229, 219);
  }

  .b-time-panel {
    margin: 5px 0;
    border: 1px solid rgb(209, 229, 219);
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 2px;
    position: absolute;
    width: 180px;
    left: 0;
    z-index: 1000;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .b-time-panel__content {
    font-size: 0;
    position: relative;
    overflow: hidden;
  }

  .b-time-panel__content::after,
  .b-time-panel__content::before {
    content: ":";
    top: 50%;
    color: #fff;
    position: absolute;
    font-size: 14px;
    margin-top: -15px;
    line-height: 16px;
    background-color: #00a53c;
    height: 32px;
    z-index: -1;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding-top: 6px;
    text-align: left;
  }

  .b-time-panel__content::after {
    left: 50%;
    margin-left: -2px;
  }

  .b-time-panel__content::before {
    padding-left: 50%;
    margin-right: -2px;
  }

  .b-time-panel__content.has-seconds::after {
    left: 66.66667%;
  }

  .b-time-panel__content.has-seconds::before {
    padding-left: 33.33333%;
  }

  .b-time-panel__footer {
    border-top: 1px solid #e4e4e4;
    padding: 4px;
    height: 36px;
    line-height: 25px;
    text-align: right;
    box-sizing: border-box;
  }

  .b-time-panel__btn {
    border: none;
    line-height: 28px;
    padding: 0 5px;
    margin: 0 5px;
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    font-size: 12px;
    color: rgb(131, 165, 148);
  }

  .b-time-panel__btn.confirm {
    font-weight: 800;
    color: #00a53c;
  }

  .time-select {
    margin: 5px 0;
    min-width: 0
  }

  .time-select .b-picker-panel__content {
    max-height: 200px;
    margin: 0
  }

  .time-select-item {
    padding: 8px 10px;
    font-size: 14px
  }

  .time-select-item.selected:not(.disabled) {
    background-color: #00a53c;
    color: #fff
  }

  .time-select-item.selected:not(.disabled):hover {
    background-color: #00a53c
  }

  .time-select-item.disabled {
    color: rgb(209, 229, 219);
    cursor: not-allowed
  }

  .time-select-item:hover {
    background-color: rgb(228, 241, 236);
  }
</style>
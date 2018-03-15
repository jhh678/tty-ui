<template>
  <div class="b-radio-group">
    <slot></slot>
  </div>
</template>
<script>
  import Emitter from '@/utils/mixins/emitter'
  export default {
    name: 'BRadioGroup',
    componentName: 'BRadioGroup',
    mixins: [Emitter],
    props: {
      value: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean,
      width: String
    },
    watch: {
      value(value) {
        this.$emit('change', value)
        this.dispatch('BFormItem', 'b.form.change', [this.value])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-radio-group {
    display: inline-block;
    font-size: 0;
    line-height: 1;
    vertical-align: middle;
  }
</style>
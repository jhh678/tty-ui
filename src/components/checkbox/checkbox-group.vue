<template>
  <div class="b-checkbox-group" :class="{'b-checkbox-button-group' : type==='button'}">
    <h4 class="tips" v-if="type==='button' && tips">{{tips}}</h4>
    <slot></slot>
  </div>
</template>

<script>
  import Emitter from '@/utils/mixins/emitter'
  export default {
    name: 'BCheckboxGroup',
    componentName: 'BCheckboxGroup',
    mixins: [Emitter],
    props: {
      value: {},
      min: Number,
      max: Number,
      size: String,
      fill: String,
      type: String,
      tips: String,
      width: String,
      index: Number
    },
    watch: {
      value(value) {
        this.dispatch('BFormItem', 'b.form.change', [value])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-checkbox-button-group {
    overflow-y: auto;
    max-height: 110px;
    padding: 10px;
    border-radius: 4px;
    background: #f5f5f5;

    .tips {
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-weight: normal;
      color: #333;
    }
  }
</style>

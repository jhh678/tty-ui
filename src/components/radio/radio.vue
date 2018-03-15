<template>
  <label class="b-radio" :style="{ width: defineWidth }">
    <span class="b-radio-input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="b-radio-inner"></span>
      <input
        class="b-radio-original"
        :value="label"
        type="radio"
        v-model="model"
        :name="name"
        :disabled="isDisabled">
    </span>
    <span class="b-radio-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '@/utils/mixins/emitter'
  export default {
    name: 'BRadio',
    componentName: 'BRadio',
    mixins: [Emitter],
    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      width: String
    },
    data() {
      return {
      }
    },
    computed: {
      isGroup() {
        let parent = this.$parent
        while(parent) {
          if(parent.$options.componentName !== 'BRadioGroup') {
            parent = parent.$parent
          } else {
            this._radioGroup = parent
            return true
          }
        }
        return false
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value
        },
        set(val) {
          if(this.isGroup) {
            this.dispatch('BRadioGroup', 'input', [val])
          } else {
            this.$emit('input', val)
          }
        }
      },
      isDisabled() {
        return this.isGroup ? this._radioGroup.disabled || this.disabled : this.disabled
      },
      defineWidth() {
        return this.isGroup ? this._radioGroup.width || this.width : this.width
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-radio,
  .b-radio-input {
    white-space: nowrap;
    cursor: pointer;
  }

  .b-radio,
  .b-radio-inner,
  .b-radio-input {
    position: relative;
    display: inline-block;
  }

  .b-radio {
    height: 30px;
    line-height: 30px;
    margin: 0;
    font-size: 10px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .b-radio:not(:last-child) {
    margin-right: 15px;
  }

  .b-radio-input {
    outline: 0;
    line-height: 1;
    vertical-align: middle;
  }

  .b-radio-input.is-checked .b-radio-inner {
    border-color: #00a53c;
  }

  .b-radio-input.is-checked .b-radio-inner::after {
    -ms-transform: translate(-50%, -50%) scale(1);
    transform: translate(-50%, -50%) scale(1);
  }

  .b-radio-input.is-disabled .b-radio-inner {
    background-color: #f5f5f5;
    border-color: #ccc;
    cursor: not-allowed;
  }

  .b-radio-input.is-disabled .b-radio-inner::after {
    cursor: not-allowed;
    background-color: #ccc;
  }

  .b-radio-input.is-disabled .b-radio-inner+.b-radio-label {
    cursor: not-allowed;
  }

  .b-radio-input.is-disabled.is-checked .b-radio-inner {
    background-color: #f5f5f5;
    border-color: #ccc;
  }

  .b-radio-input.is-disabled.is-checked .b-radio-inner::after {
    background-color: #ccc;
  }

  .b-radio-input.is-disabled+.b-radio-label {
    color: #ccc;
    cursor: not-allowed;
  }

  .b-radio-inner {
    width: 16px;
    height: 16px;
    border: 1px solid #666;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;
  }

  .b-radio:hover .b-radio-inner {
    border-color: #00a53c;
  }

  .b-radio-inner::after {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #00a53c;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%) scale(0);
    transform: translate(-50%, -50%) scale(0);
    transition: transform .15s cubic-bezier(.71, -.46, .88, .6);
  }

  .b-radio-original {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }

  .b-radio-label {
    font-size: 14px;
    padding-left: 5px;
  }
</style>
<!--/**
* @file
* @author jhh678
* @date 2017/9/26
*/
<template>
	<div class="checkwramp" :class="isTrue ? 'active' : ''">
		<i class="checkbox iconfont"></i>
		<slot></slot>
	</div>
</template>

<script>
  export default{
    props: {
      isTrue: {
        type: Boolean,
        default: false
      },
      isDisable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
	.checkwramp{
		display: flex;
		align-items: center;
	}
	.checkwramp.active{
		color: #1caf4c;
		i{
			border-color: #1caf4c;
			display: flex;
			justify-content: center;
			align-items: center;
			&:after{
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				background: #1caf4c;
				border-radius: 8px;
			}
		}
	}
	.checkbox{
		width: 16px;
		height: 16px;
		border: 1px solid #7b7b7b;
		text-align: center;
		line-height: 15px;
		font-size: 12px;
		border-radius: 10px;
		cursor: pointer;
		display: inline-block;
		overflow: hidden;
		box-sizing: border-box;
		background: #ffffff;
		margin-right: 5px;
	}
	.checkbox:hover{
		color: #1caf4c;
		border-color: #1caf4c;
	}
</style>-->
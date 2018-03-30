/*
 * @Author: jhh678
 * @Date: 2018-03-28 11:08:11
 * @Last Modified by:   jhh678
 * @Last Modified time: 2018-03-28 11:08:11
 */

<template>
  <div class="sub-page-wrap">
    <h4>基础用法</h4>
    <div class="text-muted">由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-radio class="radio" v-model="radio1" label="1">备选项</b-radio>
        <b-radio class="radio" v-model="radio1" label="2">备选项</b-radio>
      </div>
    </div>
    <h4>禁用状态</h4>
    <div class="text-muted">单选框不可用的状态。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-radio disabled v-model="radio2" label="禁用">备选项</b-radio>
        <b-radio disabled v-model="radio2" label="选中且禁用">备选项</b-radio>
      </div>
    </div>
    <h4>单选框组</h4>
    <div class="text-muted">适用于在多个互斥的选项中选择的场景</div>
    <div class="row">
      <div class="col-sm-24">
        <b-radio-group v-model="radio3">
          <b-radio :label="3">备选项</b-radio>
          <b-radio :label="6">备选项</b-radio>
          <b-radio :label="9">备选项</b-radio>
        </b-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { BRadio, BRadioGroup } from '@/components/radio'
export default {
  components: {
    BRadio,
    BRadioGroup
  },
  data() {
    return {
      radio1: '1',
      radio2: '禁用',
      radio3: 6
    }
  }
}
</script>

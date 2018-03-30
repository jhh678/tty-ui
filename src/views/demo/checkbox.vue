/*
 * @File: 多选框示例
 * @Author: jhh678
 * @Date: 2018-03-28 11:36:53
 * @Last Modified by:   jhh678
 * @Last Modified time: 2018-03-28 11:36:53
 */

<template>
  <div class="sub-page-wrap">
    <h4>基础用法</h4>
    <div class="text-muted">单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-checkbox v-model="checkbox1">备选项</b-checkbox>
      </div>
    </div>
    <h4>禁用状态</h4>
    <div class="text-muted">多选框不可用状态。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-checkbox v-model="checkbox2" disabled>备选项1</b-checkbox>
        <b-checkbox v-model="checkbox3" disabled>备选项2</b-checkbox>
      </div>
    </div>
    <h4>多选框组</h4>
    <div class="text-muted">适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-checkbox-group v-model="checkboxList">
          <b-checkbox label="复选框 A"></b-checkbox>
          <b-checkbox label="复选框 B"></b-checkbox>
          <b-checkbox label="复选框 C"></b-checkbox>
          <b-checkbox label="禁用" disabled></b-checkbox>
          <b-checkbox label="选中且禁用" disabled></b-checkbox>
        </b-checkbox-group>
      </div>
    </div>
    <h4>indeterminate 状态</h4>
    <div class="text-muted">indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果</div>
    <div class="row">
      <div class="col-sm-24">
        <b-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</b-checkbox>
        <div style="margin: 15px 0;"></div>
        <b-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <b-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</b-checkbox>
        </b-checkbox-group>
      </div>
    </div>
    <h4>可选项目数量的限制</h4>
    <div class="text-muted">使用 min 和 max 属性能够限制可以被勾选的项目的数量。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-checkbox-group v-model="checkedCities1" :min="1" :max="2">
          <b-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</b-checkbox>
        </b-checkbox-group>
      </div>
    </div>
    <h4>按钮样式（用于角色选择）</h4>
    <div class="text-muted">使用 min 和 max 属性能够限制可以被勾选的项目的数量。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-checkbox-group v-model="checkedRoles" type="button" tips="至少选择一种角色">
          <b-checkbox v-for="role in roles" :label="role.label" :key="role.value">{{role.label}}</b-checkbox>
        </b-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { BCheckbox, BCheckboxGroup } from '@/components/checkbox'

const cityOptions = ['上海', '北京', '广州', '深圳']

export default {
  components: {
    BCheckbox,
    BCheckboxGroup
  },
  data() {
    return {
      checkbox1: true,
      checkbox2: false,
      checkbox3: true,
      checkboxList: ['选中且禁用', '复选框 A'],
      checkAll: true,
      checkedCities: ['上海', '北京'],
      checkedCities1: ['广州', '深圳'],
      cities: cityOptions,
      roles: [
        { value: 1, label: '系统管理员' },
        { value: 2, label: '采购主管' },
        { value: 3, label: '采购专员' },
        { value: 4, label: '店长' },
        { value: 5, label: '销售经理' },
        { value: 6, label: '销售' },
        { value: 7, label: '财务经理' },
        { value: 8, label: '会计' }
      ],
      checkedRoles: [],
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

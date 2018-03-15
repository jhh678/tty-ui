<template>
  <div class="sub-page-wrap">
    <div class="search-wrap">
      <b-form :model="formInline" :inline="true" label-width="100px" ref="formInline" class="demo-form-inline">
        <b-form-item label="关键字：" prop="name">
          <b-input v-model="formInline.name" size="sm" placeholder="请输入商品编号、商品名"></b-input>
        </b-form-item>
        <b-form-item label="状态：" prop="isStart" :show-validate-icon="false" style="margin: 0 20px;">
          <b-select v-model="formInline.isStart" size="sm" placeholder="请选择">
            <b-option label="仅显示启用" value="1"></b-option>
            <b-option label="近显示禁用" value="0"></b-option>
            <b-option label="启用和禁用" value="2"></b-option>
          </b-select>
        </b-form-item>
        <b-form-item label="组织：" prop="region" :show-validate-icon="false">
          <b-select v-model="formInline.region" size="sm" placeholder="请选择">
            <b-option label="全部" value="beijing"></b-option>
            <b-option label="上海" value="shanghai"></b-option>
            <b-option label="广州" value="guangzhou"></b-option>
            <b-option label="深圳" value="shenzhen"></b-option>
          </b-select>
        </b-form-item>
        <b-form-item style="font-size: 0;">
          <button type="button" class="btn btn-primary btn-sm" @click="onSearch">检索</button>
          <button type="button" class="btn btn-default btn-sm" @click="resetForm('formInline')">重置</button>
        </b-form-item>
      </b-form>
    </div>

    <div class="option-btns-wrap">
      <button type="button" class="btn btn-primary btn-sm" @click="add"><i class="iconfont icon-xinzeng"></i>新增</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchDelete"><i class="iconfont icon-close"></i>删除</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchDisable"><i class="iconfont icon-jinyong"></i>禁用</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchEnable"><i class="iconfont icon-qiyong"></i>启用</button>
    </div>

  </div>
</template>

<script>

import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
import { BSelect, BOption } from '@/components/select'

export default {
  components: {
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption
  },
  data() {
    return {
      formInline: {
        name: '',
        isStart: '仅显示启用',
        region: '全部'
      }
    }
  },
  methods: {
    resetForm() {

    },
    onSearch() {
      console.log('search data:')
    },
    add() {
      this.$router.push('/basic-data/goods-mgr/add')
    },
    batchDelete() {

    },
    batchDisable() {

    },
    batchEnable() {

    }
  }
}
</script>
<style>

</style>
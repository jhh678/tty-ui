/** * @file 页面布局demo * @author jhh678 * @date 2017/9/27 */
<template>
  <div class="sub-page-wrap">
    <div class="search-wrap">
      <b-form :model="formInline" :inline="true" label-width="100px" ref="formInline" class="demo-form-inline">
        <b-form-item prop="name">
          <b-input v-model="formInline.name" size="sm" placeholder="请输入工号、姓名、手机号查询"></b-input>
        </b-form-item>
        <b-form-item label="审批人" prop="user">
          <b-input v-model="formInline.user" size="sm" placeholder="审批人"></b-input>
        </b-form-item>
        <b-form-item label="活动区域" prop="region" :show-validate-icon="false">
          <b-select v-model="formInline.region" size="sm" placeholder="请选择活动区域">
            <b-option label="北京" value="beijing"></b-option>
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
      <button type="button" class="btn btn-primary btn-sm" @click="add">
        <i class="iconfont icon-xinzeng"></i>新增</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchDisable">
        <i class="iconfont icon-jinyong"></i>禁用</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchEnable">
        <i class="iconfont icon-qiyong"></i>启用</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchDelete">
        <i class="iconfont icon-close"></i>删除</button>
      <button type="button" class="btn btn-default btn-sm" @click="exportData">
        <i class="iconfont icon-daochu"></i>导出</button>
      <button type="button" class="btn btn-default btn-sm" @click="importData">
        <i class="iconfont icon-daoru"></i>导入</button>
      <button type="button" class="btn btn-default btn-sm" @click="openCloudGoods">
        <i class="iconfont icon-shangpinku"></i>云商品库</button>
    </div>

    <b-table :data="tableConfig.data" :columns="tableConfig.columns" :show-select="true" :show-handle="true" :select-fixed="true"
      :handle-fixed="true" :pagination="tableConfig.pagination" :orderNumber="true" @click-item="selectTableItem" @change-page="changePage"
      @select-change="selectChange">
      <template slot="operations" slot-scope="scope">
        <span @click="edit(scope.item)">编辑</span>
        <span @click="delete(scope.item)">删除</span>
        <span v-if="!scope.item.disable" @click="disable(scope.item)">禁用</span>
        <span v-else @click="enable(scope.item)">启用</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import {
  BForm,
  BFormItem
} from '@/components/form'
import BInput from '@/components/input'
import {
  BSelect,
  BOption,
  BOptionGroup
} from '@/components/select'
import BTable from '@/components/table/table'
import tableData from './data/tabledata'

export default {
  name: 'FormDemo',
  components: {
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BOptionGroup,
    BTable
  },
  data() {
    return {
      formInline: {
        name: '',
        user: '',
        region: ''
      },
      tableConfig: {
        data: tableData.data2,
        columns: [{
          title: '商品编号',
          key: 'number',
          width: 150,
          textAlign: 'center'
        },
        {
          title: '商品名称',
          key: 'name',
          width: 250,
          textAlign: 'left',
          textLine: 2,
          selectText: true
        },
        {
          title: '商品类别',
          key: 'type',
          width: 150,
          textAlign: 'right'
        },
        {
          title: '品牌',
          key: 'brand',
          width: 180,
          textAlign: 'center'
        },
        {
          title: '规格',
          key: 'specifications',
          width: 150,
          textAlign: 'left'
        },
        {
          title: '图片',
          key: 'image',
          type: 'img',
          width: 76,
          textAlign: 'center'
        },
        {
          title: '零售价',
          key: 'retailPrice',
          width: 150,
          textAlign: 'left'
        },
        {
          title: '基本单位',
          key: 'unit',
          width: 150,
          textAlign: 'left'
        },
        {
          title: '测试测试',
          key: 'brand',
          width: 150,
          textAlign: 'left'
        }
        ],
        pagination: {
          total: 188
        },
        selectedItems: []
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$phpApi('getPermissions').post().then((res) => {
        console.log(res)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSearch() {
      console.log('search data:', this.formInline)
    },
    selectTableItem(value) {
      console.log(value)
    },
    changePage(page) {
      console.log(page)
    },
    add() {

    },
    edit(item) {
      console.log(item)
    },
    delete(item) {
      console.log(item)
    },
    batchDelete(items) {

    },
    disable(item) {
      console.log(item)
    },
    batchDisable(items) {

    },
    enable(item) {
      console.log(item)
    },
    batchEnable(items) {

    },
    exportData() {

    },
    importData() {

    },
    openCloudGoods() {

    },
    selectChange(arr) {
      this.tableConfig.selectedItems = arr
      console.log(this.tableConfig.selectedItems)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>

/**
* @file 表格组件 应用实例
* @author jhh678
* @date 2017/9/27
*/
<template>
  <div class="container-fluid">
    <h3 style="text-align: center; margin: 20px 0">常用的表格有下面两个</h3>
    <section class="panel panel-default">
      <div class="panel-heading">最基础形态小表格</div>
      <div class="panel-body">
        <div style="width: 800px">
          <b-table :data="tableData"
                     :columns="tableColumns"
                     :show-handle="true"
                     :tdHeight="40"
                     :tableId="demo1Id"
                     @td-brand="clickStatus"
                     @click-item="tableSelectItem">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="delete(scope.item)">删除</span>
              <span @click="disable(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
        <b-dropdown ref="dropdown" style="display:inline-block">
          <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
            <span>导出</span>
            <span class="caret"></span>
          </button>
          <template slot="dropdown">
            <li  v-for="item in dropdownData" :key="item" @click="selectType(item)"><a role="button">{{item}}</a></li>
          </template>
        </b-dropdown>
      </div>
    </section>
    <!--左右固定-->
    <section class="panel panel-default">
      <div class="panel-heading">左右固定形态表格</div>
      <div class="panel-body">
        <div>
          <b-table :data="tableData2"
                     :columns="tableColumns2"
                     :show-select="true"
                     :show-handle="true"
                     :select-fixed="true"
                     :handle-fixed="true"
                     :pagination="pagination"
                     :orderNumber="true"
                     @click-item="tableSelectItem"
                     @change-page="changePage">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="edit(scope.item)">删除</span>
              <span @click="edit(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <h3 style="text-align: center; margin: 20px 0">下面是扩展表格</h3>
    <!--左边选择固定-->
    <section class="panel panel-default">
      <div class="panel-heading">左边选择固定</div>
      <div class="panel-body">
        <div>
          <b-table :data="tableData2"
                     :columns="tableColumns2"
                     :show-select="true"
                     :show-handle="true"
                     :select-fixed="true"
                     :handle-fixed="false"
                     :pagination="pagination"
                     @click-item="tableSelectItem"
                     @change-page="changePage">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="edit(scope.item)">删除</span>
              <span @click="edit(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <!--右边操作固定,右边不固定-->
    <section class="panel panel-default">
      <div class="panel-heading">右边操作固定,左边不固定</div>
      <div class="panel-body">
        <div>
          <b-table :data="tableData2"
                     :columns="tableColumns2"
                     :show-select="true"
                     :show-handle="true"
                     :select-fixed="false"
                     :handle-fixed="true"
                     :pagination="pagination"
                     @click-item="tableSelectItem"
                     @change-page="changePage">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="edit(scope.item)">删除</span>
              <span @click="edit(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <!--左右不固定 上下固定-->
    <section class="panel panel-default">
      <div class="panel-heading">左右不固定 头部固定</div>
      <div class="panel-body">
        <div>
          <b-table :data="tableData2"
                     :columns="tableColumns2"
                     :show-select="true"
                     :show-handle="false"
                     :title-fixed="'fixed'"
                     :scroll-height="300"
                     :select-fixed="false"
                     :handle-fixed="false"
                     :pagination="pagination"
                     @click-item="tableSelectItem"
                     @change-page="changePage">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="edit(scope.item)">删除</span>
              <span @click="edit(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <!--左边固定 上下固定-->
    <section class="panel panel-default">
      <div class="panel-heading">左右不固定 头部固定</div>
      <div class="panel-body">
        <div>
          <b-table :data="tableData2"
                     :columns="tableColumns2"
                     :show-select="true"
                     :show-handle="false"
                     :title-fixed="'fixed'"
                     :scroll-height="300"
                     :select-fixed="true"
                     :handle-fixed="false"
                     :pagination="pagination"
                     @click-item="tableSelectItem"
                     @change-page="changePage">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="edit(scope.item)">删除</span>
              <span @click="edit(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <!--右边边固定 上下固定-->
    <section class="panel panel-default">
      <div class="panel-heading">右边固定 头部固定</div>
      <div class="panel-body">
        <div>
          <b-table :data="tableData2"
                     :columns="tableColumns2"
                     :show-select="false"
                     :show-handle="true"
                     :title-fixed="'fixed'"
                     :scroll-height="300"
                     :select-fixed="false"
                     :handle-fixed="true"
                     :pagination="pagination"
                     @click-item="tableSelectItem"
                     @change-page="changePage">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="edit(scope.item)">删除</span>
              <span @click="edit(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <!--右边边固定 上下固定-->
    <section class="panel panel-default">
      <div class="panel-heading">左右固定 头部固定</div>
      <div class="panel-body">
        <div>
          <b-table :data="tableData2"
                     :columns="tableColumns2"
                     :show-select="true"
                     :show-handle="true"
                     :title-fixed="'fixed'"
                     :scroll-height="300"
                     :select-fixed="true"
                     :handle-fixed="true"
                     :pagination="pagination"
                     @click-item="tableSelectItem"
                     @change-page="changePage">
            <template slot="operations" scope="scope">
              <span @click="edit(scope.item)">编辑</span>
              <span @click="edit(scope.item)">删除</span>
              <span @click="edit(scope.item)">禁用</span>
            </template>
          </b-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import BTable from '@/components/table/table'
  import tableData from './data/tabledata'
  import BDropdown from '@/components/dropdown/dropdown'
  const columns1 = [
    {
      title: '机构编号',
      key: 'number',
      width: 85,
      textAlign: 'left'
    },
    {
      title: '机构名称',
      key: 'name',
      width: 292,
      textAlign: 'left',
      textLine: 2,
      selectText: true
    },
    {
      title: '类型',
      key: 'type',
      width: 180,
      textAlign: 'center'
    },
    {
      title: '状态',
      key: 'brand',
      width: 82,
      textAlign: 'center',
      click: true
    }
  ]
  const columns2 = [
    {
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
  ]
  export default{
    components: {
      BTable,
      BDropdown
    },
    data() {
      return {
        demo1Id: 'demo1',
        dropdownData: ['xls', 'json', 'txt', 'xml', 'doc', 'image', 'pdf'],
        tableData: tableData.data1,
        tableColumns: columns1,
        tableColumns2: columns2,
        tableData2: tableData.data2,
        pagination: {
          maxSize: 5,
          total: 88,
          hidePagination: false,
          pageSizes: [10, 20, 25, 50, 100, 200, 500]
        }
      }
    },
    methods: {
      tableSelectItem() {
        console.log(123)
      },
      edit(e) {
        console.log(e)
      },
      changePage(e) {
        console.log(e)
      },
      selectType (type) {
      },
      clickStatus (data) {
        console.log('aaa', data)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
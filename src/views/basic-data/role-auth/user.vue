/** * @file 角色用户页面 * @author jhh678 * @date 2017/11/18 */
<template>
  <div class="sub-page-wrap">
    <b-table 
			:data="tableConfig.data" 
			:columns="tableConfig.columns" 
			:show-select="false" 
			:show-handle="false" 
			:select-fixed="true" 
			:handle-fixed="true" 
			:orderNumber="true" 
			:pagination="tableConfig.pagination" 
			@click-item="selectTableItem"
			@change-page="changePage">
    </b-table>
  </div>
</template>

<script>
  import BTable from '@/components/table/table'
  export default {
    props: ['userData'],
    components: {
      BTable
    },
    data() {
      return {
        tableConfig: {
          data: [],
          columns: [{
            title: '用户名',
            key: 'login_account',
            textAlign: 'center',
            width: 150
          }, {
            title: '姓名',
            key: 'full_name',
            textAlign: 'center',
            width: 150
          }, {
            title: '手机',
            key: 'mobile',
            textAlign: 'center',
            width: 150
          }, {
            title: '部门',
            key: 'user_num',
            textAlign: 'center'
          }],
          pagination: {
            total: 88
          }
        }
      }
    },
    methods: {
      changePage(page) {
        console.log(page)
      },
      selectTableItem(data) {
        console.log(data)
      },
      init() {
        this.tableConfig.pagination.total = this.userData.data.total_items
        this.tableConfig.data = this.userData.data.items
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
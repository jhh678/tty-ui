<template>
  <div class="system-user">
    <div class="fbtn">
      <button type="button" class="btn btn-primary" @click="add"><i class="iconfont">&#xe797;</i>新增</button>
      <button type="button" class="btn btn-default" @click="deleteSelectBank"><i class="iconfont">&#xe79d;</i>删除</button>
    </div>
    <b-table :data="tableConfig.data"
              :columns="tableConfig.columns"
              :show-select="true"
              :show-handle="true"
              :pagination="tableConfig.pagination"
              :orderNumber="true"
              :tableId="tableConfig.tableId"
              @select-change="tableSelectItem"
              @change-page="changePage">
      <template slot="operations" scope="scope">
        <span @click="edit(scope.item)">编辑</span>
        <span @click="deleteItem(scope.item)">删除</span>
      </template>
    </b-table>
    <!-- 新增模态框 -->
    <b-modal v-model="showAdd" title="新增银行账号">
      <add @close="closeModel"
           :pBank="pBank"
           :isEdit="isEdit"
           :fetchBank="getBankList"
           ref="aebank"></add>
      <div slot="footer"></div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BModal from '@/components/modal/modal'
import BInput from '@/components/input'
import BTable from '@/components/table/table'
import Add from './add.vue'
export default {
  components: {
    BModal,
    BInput,
    BTable,
    Add
  },
  data() {
    return {
      showAdd: false,
      tableConfig: {
        tableId: 'bandTable',
        data: [],
        columns: [
          {
            title: '银行',
            key: 'bank_name',
            width: 300,
            textAlign: 'center'
          },
          {
            title: '账号',
            key: 'account_number',
            width: 200,
            textAlign: 'center'
          }
        ],
        pagination: {
          total: 0
        }
      },
      prams: {
        org_id: '141861443334111232',
        page: 1,
        limit: 10
      },
      isEdit: 0,
      selectedItems: [],
      pBank: {}
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.BasicData.bankOrg
    })
  },
  methods: {
    tableSelectItem(data) {
      this.selectedItems = data
    },
    edit(data) {
      this.isEdit = 1
      this.pBank = data
      setTimeout(this.$refs.aebank.editModel, 0)
      this.showAdd = true
    },
    changePage(e) {
      this.prams.page = e.currentPage
      this.prams.limit = e.pageSize
      this.getBankList()
    },
    // 新增
    add() {
      this.isEdit = 0
      this.showAdd = true
    },
    closeModel(str) {
      this.showAdd = false
      if (str) {
        this.$message({
          message: str,
          type: 'success'
        })
      }
    },
    async getBankList() {
      const res = await this.$store.dispatch('getBank', this.prams)
      if (res.code === 200) {
        this.tableConfig.data = res.data.items ? res.data.items : []
        this.tableConfig.pagination.total = res.data.total_items || 0
      }
    },
    async deleteBank(prams) {
      this.$confirm(['确定要删除吗？'], '删除提示').then(async () => {
        const res = await this.$store.dispatch('deleteBank', prams)
        if (res.code === 200) {
          await this.getBankList()
          this.$message({
            message: '删除银行账号成功',
            type: 'success'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteItem(item) {
      let prams = {
        org_id: this.prams.org_id,
        ids: item.id
      }
      this.deleteBank(prams)
    },
    deleteSelectBank() {
      if (this.selectedItems.length > 0) {
        let ids = ''
        this.selectedItems.forEach(item => {
          ids += item.id + ','
        })
        ids = ids.substring(0, ids.length - 1)
        let prams = {
          org_id: this.prams.org_id,
          ids: ids
        }
        this.deleteBank(prams)
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.prams.org_id = vm.orgId
      vm.getBankList()
    })
  }
}
</script>
<style scoped lang="scss">
.system-user {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  .fbtn {
    margin: 15px 0 10px 0;
    button {
      margin-left: 10px;
    }
  }
}
</style>
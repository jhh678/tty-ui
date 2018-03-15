/** * @file 角色管理页面 * @author jhh678 * @date 2017/11/01 */
<template>
  <div class="sub-page-wrap">
    <div class="search-wrap"></div>
    <div class="option-btns-wrap">
      <button type="button" class="btn btn-primary btn-sm" @click="add"><i class="iconfont icon-xinzeng"></i>新增</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchDelete"><i class="iconfont icon-close"></i>删除</button>
    </div>

    <b-table :data="tableConfig.data"
             :columns="tableConfig.columns"
             :show-select="true"
             :show-handle="true"
             :select-fixed="true"
             :handle-fixed="true"
             :orderNumber="true"
             :pagination="tableConfig.pagination"
             @click-item="selectTableItem"
             @td-user_num="clickStatus"
             @change-page="changePage"
             @select-change="selectChange">
      <template slot="operations" scope="scope">
        <span @click="opreaAdd(scope.item)">新增</span>
        <span @click="edit(scope.item)">编辑</span>
        <span @click="deleteFn(scope.item)">删除</span>
      </template>
    </b-table>

     <!-- 新增模态框 -->
    <b-modal v-model="showAdd" title="角色新增" width="720px">
      <user-form :userRole="userRole" :addRole="addRole" ref="addData"></user-form>
      <div slot="footer"></div>
    </b-modal>

     <!-- 编辑模态框 -->
    <b-modal v-model="showEdit" title="角色编辑" width="720px">
      <user-form-edit :userRole="userRole" :editRole="editRole" ref="editData"></user-form-edit>
      <div slot="footer"></div>
    </b-modal>

    <!-- 用户数模态框 -->
    <b-modal v-model="showUser" title="用户列表" width="870px">
      <user :userData="userData" ref="userData"></user>
      <div slot="footer"></div>
    </b-modal>
  </div>
</template>

<script>
  import BModal from '@/components/modal/modal'
  import BTable from '@/components/table/table'
  import UserForm from './add'
  import UserFormEdit from './edit'
  import User from './user'
  import { sessionStore } from '@/utils'

  export default {
    name: 'FormDemo',
    components: {
      BModal,
      BTable,
      UserForm,
      UserFormEdit,
      User
    },
    data() {
      return {
        showAdd: false,
        showEdit: false,
        showUser: false,
        addRole: {},
        editRole: {},
        userRole: {},
        tableConfig: {
          data: [],
          columns: [{
              title: '角色名称',
              key: 'name',
              width: 150,
              textAlign: 'center'
            },
            {
              title: '角色说明',
              key: 'remark',
              width: 250,
              textAlign: 'center'
            },
            {
              title: '上级角色',
              key: 'parent_name',
              width: 150,
              textAlign: 'center'
            },
            {
              title: '用户数',
              key: 'user_num',
              width: 65,
              textAlign: 'center',
              click: true
            }
          ],
          pagination: {
            total: 88
          },
          selectedItems: []
        },
        userData: [],
        getUserPrams: {
          user_id: '',
          page: 1,
          limit: 10
        }
      }
    },
    methods: {
      async init() {
        let that = this
        await this.$store.dispatch('getRole', this.getUserPrams).then(res => {
          console.log(res)
          that.tableConfig.data = res.list
          that.tableConfig.pagination.total = res.totalNum
        })
      },
      selectTableItem(value) {
        // console.log(value)
      },
      changePage(e) {
        this.getUserPrams.limit = e.pageSize
        this.getUserPrams.page = e.currentPage
        this.init()
      },
      add() {
        let that = this
        this.showAdd = !this.showAdd
        this.$store.dispatch('getUserRole').then((res) => {
          res.unshift({
            id: '0',
            name: '无'
          })
          that.userRole = res
          setTimeout(this.$refs.addData.addInit, 0)
        })
      },
      opreaAdd(item) {
        let that = this
        this.showAdd = !this.showAdd
        this.addRole = item
        this.$store.dispatch('getUserRole').then((res) => {
          res.unshift({
            id: '0',
            name: '无'
          })
          that.userRole = res
        })
        setTimeout(this.$refs.addData.opreaAdd, 0)
      },
      edit(item) {
        let that = this
        this.editRole = item
        this.showEdit = !this.showEdit
        // this.$store.dispatch('getUserRole').then((res) => {
        //   that.userRole = res
        // })
        setTimeout(this.$refs.editData.editInit, 0)
      },
      async deleteFn(item) {
        let roleIds = item.id
        let that = this
        await this.$store.dispatch('deleteRole', {
          role_ids: roleIds
        }).then(res => {
          if(res.code === 200) {
            this.$message({
              message: '删除角色成功',
              type: 'success'
            })
            that.init()
          }
        })
      },
      async batchDelete() {
        const res = await this.$store.dispatch('deleteRole', {role_ids: this.getIds()})
        if(res.code === 200) {
          await this.init()
          this.$message({
            message: '删除角色成功',
            type: 'success'
          })
        }
      },
      selectChange(arr) {
        this.tableConfig.selectedItems = arr
      },
      // 获取多选的ids
      getIds() {
        let arr = []
        this.tableConfig.selectedItems.forEach((item, index) => {
          arr.push(item.id)
        })
        return arr.join(',')
      },
      // 点击用户数
      async clickStatus(data) {
        console.log(data)
        const res = await this.$store.dispatch('getSysUser', {role_id: data.id, org_id: sessionStore.get('userInfo').org_id})
        if(res.code === 200) {
          this.showUser = true
          this.userData = res
          setTimeout(this.$refs.userData.init, 0)
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.getUserPrams.user_id = sessionStore.get('userInfo').user_id
        vm.init()
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
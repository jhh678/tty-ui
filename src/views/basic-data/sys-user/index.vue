<template>
  <div class="system-user">
    <div class="search-wrap">
      <b-form :model="formInline" :inline="true" label-width="100px" ref="formInline" class="demo-form-inline">
        <b-form-item prop="name">
          <b-input v-model="formInline.serchStr" size="sm" placeholder="请输入手机号、姓名查询"></b-input>
        </b-form-item>
        <b-form-item label="" prop="isStart" :show-validate-icon="false" style="margin: 0 20px;">
          <b-select v-model="formInline.isStart" size="sm" placeholder="请选择">
            <b-option label="仅显示启用" value="1"></b-option>
            <b-option label="近显示禁用" value="0"></b-option>
            <b-option label="启用和禁用" value=""></b-option>
          </b-select>
        </b-form-item>
        <b-form-item label="" prop="role" :show-validate-icon="false">
          <b-select v-model="formInline.role" size="sm" placeholder="请选择">
            <b-option label="全部" value=""></b-option>
            <b-option v-for="(item, index) in userRole" 
                      :key="index" 
                      :label="item.name" 
                      :value="item.id"></b-option>
          </b-select>
        </b-form-item>
        <b-form-item style="font-size: 0;">
          <button type="button" class="btn btn-primary btn-sm" @click="onSearch">检索</button>
          <button type="button" class="btn btn-default btn-sm" @click="resetForm()">重置</button>
        </b-form-item>
      </b-form>
    </div>
    <div class="fbtn">
      <button type="button" class="btn btn-primary" @click="show"><i class="iconfont">&#xe797;</i>新增</button>
      <button type="button" class="btn btn-default" @click="selectRemove"><i class="iconfont">&#xe79d;</i>删除</button>
      <button type="button" class="btn btn-default" @click="selectDisable"><i class="iconfont">&#xe79a;</i>停用</button>
      <button type="button" class="btn btn-default" @click="selectAble"><i class="iconfont">&#xe798;</i>启用</button>
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
    <b-table :data="tableConfig.data"
              :columns="tableConfig.columns"
              :show-select="true"
              :show-handle="true"
              :select-fixed="true"
              :handle-fixed="true"
              :pagination="tableConfig.pagination"
              :orderNumber="true"
              :tableId="tableConfig.tableId"
              @select-change="selectChange"
              @change-page="changePage">
      <template slot="operations" scope="scope">
        <span @click="edit(scope.item)">编辑</span>
        <span @click="del(scope.item)">删除</span>
        <span @click="able(scope.item)" v-if="scope.item.status == 0">启用</span>
        <span @click="disable(scope.item)" v-else>禁用</span>
        <span @click="reset(scope.item)">重置密码</span>
      </template>
    </b-table>
    <!-- 新增编辑数据模态框 -->
    <b-modal v-model="showAdd" :title="mTitle">
      <user-form ref="user" :isEdit="isEdit" :editeData="editeData" @close="closeModel"></user-form>
      <div slot="footer"></div>
    </b-modal>
    <!-- 重置密码模态框 -->
    <b-modal v-model="showReset" title="重置密码">
      <reset-form ref="reset" :editeData="editeData" @close="closeReset"></reset-form>
      <div slot="footer"></div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BModal from '@/components/modal/modal'
import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
import { BSelect, BOption, BOptionGroup } from '@/components/select'
import BTable from '@/components/table/table'
import BCheckbox from '@/components/checkbox/checkbox'
import BCheckboxGroup from '@/components/checkbox/checkbox-group'
// import UserForm from './add-edit.vue'
import BDropdown from '@/components/dropdown/dropdown'
export default {
  components: {
    BModal,
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BOptionGroup,
    BTable,
    BCheckbox,
    BCheckboxGroup,
    BDropdown,
    UserForm: () => import('./add-edit.vue'),
    ResetForm: () => import('./reset-password.vue')
  },
  data() {
    return {
      dropdownData: ['xls', 'json', 'txt', 'xml', 'doc', 'image', 'pdf'],
      showAdd: false,
      showReset: false,
      isEdit: 0,
      editeData: {},
      mTitle: '新增用户',
      selectArr: [],
      formInline: {
        serchStr: '',
        isStart: '',
        role: ''
      },
      tableConfig: {
        tableId: 'userTable',
        data: [],
        columns: [
          {
            title: '用户名',
            key: 'login_account',
            width: 150,
            textAlign: 'center'
          },
          {
            title: '姓名',
            key: 'full_name',
            width: 200,
            textLine: 2,
            textAlign: 'center'
          },
          {
            title: '手机',
            key: 'mobile',
            width: 120,
            textAlign: 'center'
          },
          {
            title: '角色',
            key: 'org_id',
            width: 250,
            textAlign: 'center'
          },
          {
            title: '状态',
            key: 'status',
            width: 60,
            textAlign: 'center'
          }
        ],
        pagination: {
          total: 0
        },
        selectedItems: []
      },
      getUserPrams: {
        org_id: '141861443334111232',
        role_id: '',
        page: 1,
        limit: 10,
        keyword: '',
        status: ''
      }
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.BasicData.userRole
    })
  },
  methods: {
    // 搜索
    onSearch() {
      this.getUserPrams.status = this.formInline.isStart
      this.getUserPrams.keyword = this.formInline.serchStr
      this.getUserPrams.role_id = this.formInline.role
      this.getUser()
    },
    // 翻页
    changePage(e) {
      this.getUserPrams.limit = e.pageSize
      this.getUserPrams.page = e.currentPage
      this.getUser()
    },
    // 重置
    resetForm() {
      this.$refs.formInline.resetFields()
      this.onSearch()
    },
    // 新增
    show() {
      this.showAdd = true
      this.mTitle = '新增用户'
    },
    // 角色权限
    roleSelectfn(item) {
      console.log(item)
    },
    // 下拉
    selectType(type) {
      console.log(type)
    },
    // 编辑
    edit(item) {
      this.isEdit = 1
      this.editeData = item
      this.mTitle = '编辑用户'
      setTimeout(() => {
        this.$refs.user.initEdit()
        this.showAdd = true
      }, 1)
    },
    // selectChange
    selectChange(e) {
      this.selectArr = e
    },
    // 批量删除
    selectRemove() {
      this.selectDeal('请选择删除的用户', this.removeItem)
    },
    // 批量禁用
    selectDisable() {
      this.selectDeal('请选择禁用的用户', this.disableItem)
    },
    // 批量启用
    selectAble() {
      this.selectDeal('请选择启用的用户', this.ableItem)
    },
    // 批量处理
    selectDeal(str, callback) {
      let ids = ''
      if (this.selectArr.length > 0) {
        this.selectArr.forEach(item => {
          ids += ',' + item.user_id
        })
        ids = ids.substr(1)
        callback && callback(ids)
      } else {
        this.$message({
          message: str,
          type: 'warning'
        })
      }
    },
    // 删除
    del(item) {
      this.removeItem(item.user_id)
    },
    async removeItem(ids) {
      let res = await this.$store.dispatch('deleteSysUser', { ids })
      if (res.code === 200) {
        await this.getUser()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    // 启用
    able(item) {
      this.ableItem(item.user_id)
    },
    async ableItem(ids) {
      let res = await this.$store.dispatch('enableSysUser', { ids })
      if (res.code === 200) {
        await this.getUser()
        this.$message({
          message: '禁用用户成功',
          type: 'success'
        })
      }
    },
    // 禁用
    async disable(item) {
      this.disableItem(item.user_id)
    },
    async disableItem(ids) {
      let res = await this.$store.dispatch('disableSysUser', { ids })
      if (res.code === 200) {
        await this.getUser()
        this.$message({
          message: '禁用用户成功',
          type: 'success'
        })
      }
    },
    // 重置密码
    reset(item) {
      this.editeData = item
      this.showReset = true
    },
    async getUser() {
      let res = await this.$store.dispatch('getSysUser', this.getUserPrams)
      if (res.code === 200) {
        this.tableConfig.data = res.data.items
        this.tableConfig.pagination.total = res.data.total_items
      }
    },
    // 关闭弹出
    async closeModel(str) {
      if (str) {
        await this.getUser()
        this.$message({
          message: str,
          type: 'success'
        })
      }
      this.showAdd = false
    },
    closeReset() {
      this.showReset = false
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$store.dispatch('getUserRole')
      vm.getUser()
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
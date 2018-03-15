/** * @file 职员管理页面 * @author jhh678 * @date 2017/10/30 */
<template>
  <div class="sub-page-wrap">
    <div class="search-wrap">
      <b-form :model="formInline" :inline="true" label-width="100px" ref="formInline" class="demo-form-inline">
        <b-form-item  prop="name">
          <b-input v-model="formInline.name" size="sm" placeholder="请输入工号、姓名、手机号查询"></b-input>
        </b-form-item>
        <b-form-item label="状态" prop="isStart" :show-validate-icon="false" style="margin: 0 20px;">
          <b-select v-model="formInline.isStart" size="sm" placeholder="请选择">
            <b-option label="仅显示启用" value="1"></b-option>
            <b-option label="近显示禁用" value="0"></b-option>
            <b-option label="启用和禁用" value=""></b-option>
          </b-select>
        </b-form-item>
        <b-form-item label="部门：" prop="region" :show-validate-icon="false">
          <b-select v-model="formInline.region" size="sm" placeholder="请选择">
            <b-option label="全部" value=""></b-option>
            <b-option v-for="(item, index) in organizeTree" 
                      :key="index" 
                      :label="item.org_name" 
                      :value="item.org_id"></b-option>
          </b-select>
        </b-form-item>
        <b-form-item style="font-size: 0;">
          <button type="button" class="btn btn-primary btn-sm" @click="onSearch">检索</button>
          <button type="button" class="btn btn-default btn-sm" @click="resetForm()">重置</button>
        </b-form-item>
      </b-form>
    </div>

    <div class="option-btns-wrap">
      <button type="button" class="btn btn-primary btn-sm" @click="add"><i class="iconfont icon-xinzeng"></i>新增</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchDelete"><i class="iconfont icon-close"></i>删除</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchDisable"><i class="iconfont icon-jinyong"></i>禁用</button>
      <button type="button" class="btn btn-default btn-sm" @click="batchEnable"><i class="iconfont icon-qiyong"></i>启用</button>
    </div>

    <b-table :data="tableConfig.data"
             :columns="tableConfig.columns"
             :show-select="true"
             :show-handle="true"
             :select-fixed="true"
             :handle-fixed="true"
             :pagination="tableConfig.pagination"
             @click-item="selectTableItem"
             @change-page="changePage"
             @select-change="selectChange">
      <template slot="operations" scope="scope">
        <span @click="edit(scope.item)">编辑</span>
        <span @click="deleteBtn(scope.item)">删除</span>
      </template>
    </b-table>

     <!-- 新增模态框 -->
    <b-modal v-model="showAdd" title="职员新增">
      <user-form @close="closeModel"
                 :treeArr="treeArr"
                 ref="addData"></user-form>
      <div slot="footer"></div>
    </b-modal>

      <!-- 编辑模态框 -->
    <b-modal v-model="showEdit" title="职员编辑">
      <user-form-edit @close="closeModel"
                      :fromData="fromData"
                      :treeArr="treeArr"
                      ref="editData"></user-form-edit>
      <div slot="footer"></div>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { BForm, BFormItem } from '@/components/form'
import BModal from '@/components/modal/modal'
import BInput from '@/components/input'
import { BSelect, BOption, BOptionGroup } from '@/components/select'
import BTable from '@/components/table/table'
import UserForm from './add'
import UserFormEdit from './edit'
import { sessionStore } from '@/utils'

export default {
  name: 'FormDemo',
  components: {
    BModal,
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BOptionGroup,
    BTable,
    UserForm,
    UserFormEdit
  },
  data() {
    return {
      fromData: {},
      treeArr: [],
      showAdd: false,
      showEdit: false,
      formInline: {
        name: '',
        isStart: '',
        region: ''
      },
      tableConfig: {
        data: [],
        columns: [{
          title: '姓名',
          key: 'emp_name',
          width: 190,
          textAlign: 'center'
        },
        {
          title: '职位',
          key: 'emp_position',
          width: 150,
          textAlign: 'center'
        },
        {
          title: '手机号',
          key: 'emp_mobile',
          width: 150,
          textAlign: 'center'
        },
        {
          title: '工号',
          key: 'emp_code',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '组织',
          key: 'org_name',
          width: 150,
          textAlign: 'center'
        },
        {
          title: '部门',
          key: 'dept_name',
          width: 170,
          textAlign: 'center'
        },
        {
          title: '入职日期',
          key: 'emp_entry_datetime',
          width: 200,
          textAlign: 'center'
        },
        {
          title: '状态',
          key: 'status',
          width: 150,
          textAlign: 'center'
        }
        ],
        pagination: {
          total: 0
        },
        selectedItems: []
      },
      getUserPrams: {
        org_id: '',
        page: 1,
        limit: 10,
        keyword: '',
        status: ''
      }
    }
  },
  computed: {
    ...mapState({
      organizeTree: state => state.BasicData.organizeTree
    })
  },
  methods: {
    async init() {
      let that = this
      await this.$store.dispatch('getEmployee', this.getUserPrams).then(res => {
        // console.log(res)
        that.tableConfig.data = res.items
        that.tableConfig.pagination.total = res.total_items
        res.items.forEach((item, index) => {
          item.emp_entry_datetime = that.timestamp(item.emp_entry_datetime)
        })
      })
    },
    async treeInit() {
      await this.$store.dispatch('getDepTree', {
        org_id: sessionStore.get('userInfo').org_id
      }).then((res) => {
        this.treeArr = res.data
        // console.log(res)
      })
    },
    resetForm() {
      this.$refs.formInline.resetFields()
      this.onSearch()
    },
    onSearch() {
      this.getUserPrams.status = this.formInline.isStart
      this.getUserPrams.keyword = this.formInline.name
      this.init()
      // this.getUserPrams.role_id = this.formInline.region
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
      this.showAdd = !this.showAdd
      setTimeout(this.$refs.addData.addInit, 0)
    },
    edit(item) {
      this.fromData = item
      setTimeout(this.$refs.editData.editInit, 0)
      this.showEdit = !this.showEdit
      // console.log(item)
    },
    async deleteBtn(item) {
      let empIds = item.emp_id
      let that = this
      await this.$store.dispatch('deletEmployee', {
        emp_ids: empIds
      }).then(res => {
       if(res.code === 200) {
         this.$message({
           message: '删除职员成功',
           type: 'success'
         })
         that.init()
       }
      })
    },
    async batchDelete(items) {
      let that = this
      await this.$store.dispatch('deletEmployee', {
        emp_ids: this.empIds()
      }).then(res => {
       if(res.code === 200) {
         that.$message({
           message: '删除职员成功',
           type: 'success'
         })
         that.init()
       }
      })
    },
    async batchDisable(items) {
     const res = await this.$store.dispatch('disableEmployee', {emp_ids: this.empIds()})
     if (res.code === 200) {
       await this.init()
       this.$message({
         message: '禁用职员成功',
         type: 'success'
       })
     }
    },
    async batchEnable(items) {
     const res = await this.$store.dispatch('enableEmployeer', {emp_ids: this.empIds()})
     if (res.code === 200) {
       await this.init()
       this.$message({
         message: '启用职员成功',
         type: 'success'
       })
     }
    },
    // 关闭弹出
    async closeModel () {
      await this.init()
      this.showEdit = this.showAdd = false
    },
    selectChange(arr) {
      this.tableConfig.selectedItems = arr
      // console.log(this.tableConfig.selectedItems)
    },
    // 时间戳转化为时间格式
    timestamp(time) {
      let arr = []
      if(!Number(time) > 0) return
      var newDate = new Date()
      newDate.setTime(time)
      time = newDate.toLocaleDateString().split('/')
      time.forEach((item, index) => {
        item = item < 10 ? '0' + item : item
        arr.push(item)
      })
      return arr.join('-')
      // return time.replace(new RegExp('/', 'g'), '-')
    },
    // 获取多选的emp_ids
    empIds() {
      let arr = []
      this.tableConfig.selectedItems.forEach((item, index) => {
        arr.push(item.emp_id)
      })
      return arr.join(',')
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$store.dispatch('getOrgTree', {org_id: sessionStore.get('userInfo').org_id})
      vm.getUserPrams.org_id = sessionStore.get('userInfo').org_id
      vm.init()
      vm.treeInit()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
// 组织架构
<template>
  <div style="padding: 10px">
    <tree-grid 
      :items='organizeList' 
      :columns='columns'
      ref="orgTable">
      <template slot="operations" slot-scope="scope">
        <span @click="edit(scope.item)">编辑</span>
        <span @click="remove(scope.item)">删除</span>
        <span @click="toForbid(scope.item)" v-if = "scope.item.status == 1">禁用</span>
        <span @click="toEnble(scope.item)" v-else>启用</span>
        <span @click="band(scope.item)"  v-if="scope.item.tree_type == 1">银行</span><br/>
        <span @click="addOrEditOrg(scope.item, 0)" v-if="scope.item.tree_type == 1">新增组织</span>
        <span @click="addOrEditDep(scope.item, 0)">新增部门</span>
      </template>
    </tree-grid>
    <!-- 新增编辑组织弹出层 -->
    <b-modal v-model="showAddOrganization" :title="orgTitle">
      <add-org :orgData="pOrgData"
               :orgType="orgActionType"
               :fetchOrg="getOrg"
               ref="org"
               @close="closeOrg"></add-org>
      <div slot="footer"></div>
    </b-modal>
    <!-- 新增编辑部门弹出层 -->
    <b-modal v-model="showAddDepatment" :title="depTitle">
      <add-dep :depData="pDepData"
               :depType="depActionType"
               :fetchOrg="getOrg"
               ref="dep"
               @close="closeDep"></add-dep>
      <div slot="footer"></div>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import TreeGrid from '@/components/table/tree-table-node'
import BModal from '@/components/modal/modal'
import AddOrg from './add-edit-org'
import AddDep from './add-edit-dep'
export default {
  components: {
    TreeGrid,
    BModal,
    AddOrg,
    AddDep
  },
  data() {
    return {
      showAddOrganization: false,
      showAddDepatment: false,
      orgTitle: '新增组织',
      depTitle: '新增部门',
      pOrgData: {},
      pDepData: {},
      orgActionType: 0, // 0：新增 1：编辑
      depActionType: 0, // 0：新增 1：编辑
      columns: [
        {
          title: '组织/部门名称',
          key: 'org_name : dept_name',
          width: '264'
        }, {
          title: '编码',
          key: 'org_code : dept_code',
          width: '110',
          align: 'center'
        }, {
          title: '简称',
          key: 'org_short_name : dept_short_name',
          width: '208',
          align: 'center'
        }, {
          title: '类型',
          key: 'tree_type',
          width: '110',
          align: 'center'
        }, {
          title: '法人/负责人',
          key: 'org_legal_person : dept_admin_name',
          width: '124',
          align: 'center'
        }, {
          title: '状态',
          key: 'status',
          width: '82',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    localComputed () {},
    ...mapState({
      organizeList: state => state.BasicData.organizeList
    })
  },
  methods: {
    edit(data) {
      if (data.tree_type === 1 || data.tree_type === '1') {
        // 编辑组织
        this.addOrEditOrg(data, 1)
        setTimeout(this.$refs.org.editInit, 0)
      } else {
        // 编辑部门
        this.addOrEditDep(data, 1)
        setTimeout(this.$refs.dep.editInit, 0)
      }
    },
    async remove(data) {
      if (data.tree_type === 1 || data.tree_type === '1') {
        // 删除组织
        await this.$store.dispatch('deleteOrg', {org_id: data.org_id})
        await this.getOrg()
        this.$message({
          message: '删除组织成功',
          type: 'success'
        })
      } else {
        // 删除部门
        const res = await this.$store.dispatch('deleteDep', {dept_ids: data.dept_id})
        if (res.code === 200) {
          await this.getOrg()
          this.$message({
            message: '删除部门成功',
            type: 'success'
          })
        }
      }
    },
    async toForbid(data) {
      if (data.tree_type === 1 || data.tree_type === '1') {
        // 禁用组织
        await this.$store.dispatch('disableOrg', {org_id: data.org_id})
        await this.getOrg()
        this.$message({
          message: '禁用组织成功',
          type: 'success'
        })
      } else {
        // 禁用部门
        await this.$store.dispatch('disableDep', {dept_ids: data.dept_id})
        await this.getOrg()
        this.$message({
          message: '禁用部门成功',
          type: 'success'
        })
      }
    },
    async toEnble(data) {
      if (data.tree_type === 1 || data.tree_type === '1') {
        // 启用组织
        await this.$store.dispatch('enableOrg', {org_id: data.org_id})
        await this.getOrg()
        this.$message({
          message: '启用组织成功',
          type: 'success'
        })
      } else {
        // 启用部门
        await this.$store.dispatch('enableDep', {dept_ids: data.dept_id})
        await this.getOrg()
        this.$message({
          message: '启用部门成功',
          type: 'success'
        })
      }
    },
    band(data) {
      this.$store.dispatch('bankOrg', data.org_id)
      this.$router.push('/basic-data/bank-account')
    },
     // 新增或者编辑组织
    addOrEditOrg(data, type) {
      this.orgActionType = type
      this.pOrgData = data
      this.showAddOrganization = true
    },
    // 新增或者编辑部门
    addOrEditDep(data, type) {
      this.depActionType = type
      this.pDepData = data
      this.showAddDepatment = true
    },
    // 关闭组织弹出层
    async closeOrg(closeStr) {
      this.showAddOrganization = false
      if (closeStr) {
        await this.getOrg()
        this.$message({
          message: closeStr,
          type: 'success'
        })
      }
    },
    // 关闭部门弹出层
    async closeDep (closeStr) {
      this.showAddDepatment = false
      if (closeStr) {
        await this.getOrg()
        this.$message({
          message: closeStr,
          type: 'success'
        })
      }
    },
    async getOrg() {
      const res = await this.$store.dispatch('getOrg')
      this.$refs.orgTable.initToggle()
      return res
    }
  },
  created () {
    this.getOrg()
  }
}
</script>
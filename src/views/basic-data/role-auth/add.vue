<template>
  <div>
    <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form">
      <b-form-item label="角色名称：" prop="name">
        <b-input v-model="ruleForm.name" placeholder="20位以下汉字或字母，建议用岗"></b-input>
      </b-form-item>
      <b-form-item label="角色说明：" prop="instruction">
        <b-input v-model="ruleForm.instruction"></b-input>
      </b-form-item>
      <b-form-item label="上级角色：" prop="superio">
        <b-select v-model="ruleForm.superio" placeholder="请选择" @change="optionValue">
           <b-option v-for="(item, index) in userRole" 
                      :key="index"
                      :label="item.name" 
                      :value="item.id" 
                      ></b-option>
          </b-select>
        </b-select>
      </b-form-item>
       <b-form-item label="权限：" width="auto">
        <p class="choose-role">至少选择一个权限项目</p>
        <tree-checkbox v-for="(items,index) in treeArray" :key='index' :model="items"></tree-checkbox>
      </b-form-item>
      <b-form-item style="font-size: 0;">
        <button type="button" class="btn btn-primary btn-mw" @click="submitForm('ruleForm')">保存</button>
        <button type="button" class="btn btn-default btn-mw" @click="resetForm('ruleForm')">重置</button>
      </b-form-item>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
import { BSelect, BOption, BOptionGroup } from '@/components/select'
import BTable from '@/components/table/table'
import treeCheckbox from '@/components/tree/tree-checkbox'
import { flattenTree } from '@/utils'
var treeData1 = {
  name: '基础资料',
  permissions: [
    {
      name: '组织架构',
      isCheckAll: false,
      checkedRoles: [],
      permissions: {
       data: [{
         name: '新增',
         id: '01'
       },
       {
         name: '修改',
         id: '02'
       },
       {
         name: '删除',
         id: '03'
       },
       {
         name: '启用',
         id: '04'
       }]
      }
    },
    {
      name: '商品管理',
      isCheckAll: false,
      checkedRoles: [],
      permissions: {
       data: [{
         name: '新增',
         id: '05'
       },
       {
         name: '修改',
         id: '06'
       },
       {
         name: '删除',
         id: '07'
       },
       {
         name: '启用',
         id: '08'
       }]
      }
    }
  ]
}

var treeData2 = {
  name: '系统管理',
  permissions: [
    {
      name: '角色管理',
      isCheckAll: false,
      checkedRoles: [],
      permissions: {
       data: [{
         name: '新增',
         id: '10'
       },
       {
         name: '修改',
         id: '11'
       },
       {
         name: '删除',
         id: '12'
       },
       {
         name: '启用',
         id: '13'
       }]
      }
    },
    {
      name: '用户管理',
      isCheckAll: false,
      checkedRoles: [],
      permissions: {
       data: [{
         name: '新增',
         id: '14'
       },
       {
         name: '修改',
         id: '15'
       },
       {
         name: '删除',
         id: '16'
       },
       {
         name: '启用',
         id: '17'
       }]
      }
    }
  ]
}

export default {
  props: ['userRole', 'addRole'],
  components: {
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BOptionGroup,
    BTable,
    treeCheckbox
  },
  data () {
    return {
      show: false,
      treeArray: [],
      ruleForm: {
        name: '',
        instruction: '',
        superio: '',
        role: []
      },
      rules: {
        name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        instruction: [{
          required: true,
          message: '请输入角色说明',
          trigger: 'blur'
        }],
        superio: [{
          required: true,
          message: '请选择上级角色',
          trigger: 'change'
        }],
        role: [{
          type: 'array',
          required: true,
          message: '请至少选择一个权限',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          // 取出勾选的权限
          let rolesArr = []
          this.treeArray.forEach((item, index) => {
            item.permissions.forEach((item, index) => {
             rolesArr.push(item.checkedRoles)
            })
          })
          rolesArr = [].concat.apply([], rolesArr)
          if (!rolesArr.length) {
            this.$message({
              message: '至少选择一个权限项目',
              type: 'fail'
            })
            return false
          }
          // 调用保存接口
          this.$store.dispatch('addRole', {
            name: this.ruleForm.name,
            remark: this.ruleForm.instruction,
            parent_id: this.ruleForm.superio,
            per_ids: rolesArr.join(',')
          }).then((res) => {
            console.log(res)
          })
        } else {
          console.log('fail')
          return false
        }
      })
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 下拉树
    showTree() {
      this.show = !this.show
    },
    // 根据上级角色出对应的权限
    async optionValue(value) {
      let that = this
      value = value === '无' ? 0 : value
      if(!value) return
      await this.$store.dispatch('permissionRole', {
        role_id: value
      }).then((res) => {
        that.rolePermission(res.data.list)
        // console.log(res.data.list)
        that.treeArray = res.data.list
      })
    },
    // 添加初始化数据(无)
    addInit() {
       this.ruleForm.superio = this.userRole[0].id
    },
    // 添加初始化数据(带自身role_id)
    opreaAdd() {
      this.ruleForm.superio = this.addRole.id
      // this.optionValue(this.addRole.id)
    },
    // 扁平化数据
    rolePermission(data) {
      if(data) {
        data.forEach((item, index) => {
          if(!item.permissions.length) {
            return
          }
          item.permissions.forEach((item, index) => {
            let roleArr = []
            if(item.permissions && item.permissions.length > 0) {
              roleArr = flattenTree(item.permissions, 'permissions')
            }
            item.isCheckAll = false
            item.checkedRoles = []
            item.permissions = roleArr
            item.permissions.data = roleArr
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .choose-role {
    margin-bottom: 0;
    padding-top: 5px;
    padding-right: 10px;
    color: #999
  }
</style>
<template>
  <div>
    <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-form">
      <b-form-item label="用户名" prop="name">
        <b-input v-model="ruleForm.name" placeholder="请输入用户名"></b-input>
      </b-form-item>
      <b-form-item label="密码" prop="password" v-if="isEdit == 0">
        <b-input type="password" v-model="ruleForm.password"  placeholder="请输入密码"></b-input>
      </b-form-item>
      <b-form-item label="确认密码" prop="cpassword" v-if="isEdit == 0">
        <b-input  type="password" v-model="ruleForm.cpassword"  placeholder="请输确认密码"></b-input>
      </b-form-item>
      <b-form-item label="姓名" prop="username">
        <b-select v-model="ruleForm.username" placeholder="请选择职员" @change="selectUser">
          <b-option v-for="(item, index) in employee" :key="index" 
                    :label="item.emp_name" 
                    :value="item.emp_id">{{item.emp_name + ' | ' + item.dept_name + ' | ' + item.emp_mobile}}</b-option>
        </b-select>
      </b-form-item>
      <div v-show="showPhone">
        <b-form-item label="手机号">
          <b-input v-model="ruleForm.phone" disabled></b-input>
        </b-form-item>
        <b-form-item label="部门">
          <b-input v-model="ruleForm.part"  disabled></b-input>
        </b-form-item>
      </div>
      <b-form-item label="角色" prop="role" :widthauto="true">
        <b-checkbox-group v-model="ruleForm.role" type="button" tips="至少选择一种角色">
          <b-checkbox v-for="(role, index) in userRole" 
                      :label="role.id"
                      :name="role.name"
                      :key="index">{{role.name}}</b-checkbox>
        </b-checkbox-group>
      </b-form-item>
      <div class="btnbox" v-if="isEdit == 0">
        <button type="button" class="btn btn-mw btn-primary marginbtn" @click="addSubmitForm(1)">保存并关闭</button>
        <button type="button" class="btn btn-mw btn-default marginbtn" @click="addSubmitForm(0)">保存并新增</button>
        <button type="button" class="btn btn-mw btn-default" @click="cancel">取消</button>
      </div>
      <div class="btnbox" v-else>
        <button type="button" class="btn btn-mw btn-primary marginbtn" @click="editSubmitForm()">保存</button>
        <button type="button" class="btn btn-mw btn-default" @click="cancel">取消</button>
      </div>
    </b-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
import { BSelect, BOption, BOptionGroup } from '@/components/select'
import BTable from '@/components/table/table'
import BCheckbox from '@/components/checkbox/checkbox'
import BCheckboxGroup from '@/components/checkbox/checkbox-group'
export default {
  components: {
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BOptionGroup,
    BTable,
    BCheckbox,
    BCheckboxGroup
  },
  props: {
    isEdit: {
      type: Number,
      default: 0
    },
    editeData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        password: '',
        cpassword: '',
        username: '',
        phone: '',
        part: '',
        role: ['']
      },
      rules: {
        name: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          message: '密码长度至少为6个字符',
          trigger: 'blur'
        }],
        cpassword: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输确认密码'))
            }else if (value !== this.ruleForm.password) {
              callback(new Error('两次输入密码不一致!'))
            }else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请选择姓名',
          trigger: 'change'
        }],
        role: [{
          type: 'array',
          required: true,
          message: '至少选择一种角色',
          trigger: 'blur'
        }]
      },
      employee: [],
      selectEmpid: '',
      showPhone: false
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.BasicData.userRole
    })
  },
  methods: {
    addSubmitForm (type) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log('成功')
          this.addUser(type)
        }
      })
    },
    editSubmitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.editUser()
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    selectUser (id) {
      let item = this.employee.filter(item => item.emp_id === id)
      item = item[0] || {}
      if (item.emp_id) {
        this.ruleForm.phone = item.emp_mobile
        this.ruleForm.part = item.dept_name
        this.selectEmpid = item.emp_id
        this.showPhone = true
      }
    },
    // 取消
    cancel () {
      this.resetForm()
      this.$emit('close')
    },
    // 获取职员列表
    async getEmployee () {
      let employeePrams = {
        org_id: '141861443334111232',
        page: 1,
        keyword: '',
        limit: 9999
      }
      let res = await this.$store.dispatch('getEmployee', employeePrams)
      this.employee = res.items
    },
    // 新增用户
    async addUser (type) {
      let prams = {
        org_id: '141861443334111232', // 先写死一个 id
        login_account: this.ruleForm.name,
        login_password: this.ruleForm.password,
        full_name: this.ruleForm.username,
        role_ids: this.ruleForm.role.join(','),
        emp_id: this.selectEmpid,
        status: 1
      }
      let res = await this.$store.dispatch('addSysUser', prams)
      if (res.code === 200 && type === 1) {
        this.$emit('close', '新增用户成功')
        this.resetForm()
      }
    },
    // 初始化编辑数据
    initEdit () {
      console.log(this.isEdit)
      console.log(this.editeData)
      this.resetForm()
      let data = this.editeData
      this.ruleForm.username = data.full_name
      this.selectUser(data.emp_id)
      this.ruleForm.name = data.login_account
      if (data.roles.length > 0) {
        data.roles.forEach(item => {
          this.ruleForm.role.push(item.id)
        })
      }
    },
    // 编辑用户
    async editUser () {
      console.log(this.ruleForm.role)
      let prams = {
        id: this.editeData.user_id,
        org_id: '141861443334111232', // 先写死一个 id
        login_account: this.ruleForm.name,
        full_name: this.ruleForm.username,
        role_ids: this.ruleForm.role.join(',').substr(1),
        emp_id: this.selectEmpid,
        status: this.editeData.status
      }
      console.log(prams)
      let res = await this.$store.dispatch('updateSysUser', prams)
      if (res.code === 200) {
        this.$emit('close', '修改用户成功')
        this.resetForm()
      }
    }
  },
  created () {
    this.getEmployee()
  }
}
</script>

<style lang="scss" scoped>
.btnbox{
  display: flex;
  justify-content: center;
}
.marginbtn{
  margin-right: 10px;
}
</style>
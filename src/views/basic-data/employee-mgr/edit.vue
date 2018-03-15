<template>
  <div>
    <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form">
      <b-form-item label="姓名" prop="emp_name">
        <b-input v-model="ruleForm.emp_name"></b-input>
      </b-form-item>
      <b-form-item label="手机号">
        <b-input v-model="ruleForm.emp_mobile"></b-input>
      </b-form-item>
      <b-form-item label="职位">
        <b-input v-model="ruleForm.emp_position"></b-input>
      </b-form-item>
       <b-form-item label="工号">
        <b-input v-model="ruleForm.emp_code"></b-input>
      </b-form-item>
      <b-form-item label="所属组织">
       <b-input v-model="org_name" :disabled="true"></b-input>
      </b-form-item>
      <b-form-item label="所属部门" prop="dept_id">
       <b-select v-model="ruleForm.dept_id" filterable placeholder="请选择部门">
          <b-option-tree :tree-data="treeData" :tree-props="treeProps" node-key="dept_id"></b-option-tree>
        </b-select>
      </b-form-item>
      <div class="clearfix">
        <b-form-item label="紧急联系人" class="col-md-12" width="auto">
          <b-input v-model="ruleForm.emp_urgent_person"></b-input>
        </b-form-item>
        <b-form-item label="紧急联系方式" class="col-md-12" width="auto">
          <b-input v-model="ruleForm.emp_urgent_tel"></b-input>
        </b-form-item>
      </div>
       <b-form-item label="入职日期">
         <b-date-picker v-model="ruleForm.emp_entry_datetime" type="date" placeholder="选择日期"></b-date-picker>
        </b-form-item>
      <b-form-item style="font-size: 0;">
        <button type="button" class="btn btn-primary btn-mw" @click="submitForm('ruleForm')">保存</button>
        <button type="button" class="btn btn-default btn-mw" @click="resetForm('ruleForm')">重置</button>
      </b-form-item>
    </b-form>
  </div>
</template>

<script>
import { BDatePicker, BTimePicker, BTimeSelect } from '@/components/datetime-picker'
import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
import { BSelect, BOption, BOptionGroup, BOptionTree } from '@/components/select'
import BTable from '@/components/table/table'
import { sessionStore } from '@/utils'
export default {
  components: {
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BOptionGroup,
    BOptionTree,
    BTable,
    BDatePicker,
    BTimePicker,
    BTimeSelect
  },
  data () {
    return {
      org_name: '',
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'dept_name'
      },
      ruleForm: {
        emp_name: '',
        emp_position: '',
        emp_code: '',
        emp_mobile: '',
        dept_id: '',
        emp_urgent_person: '',
        emp_urgent_tel: '',
        org_id: '',
        emp_entry_datetime: ''
      },
      rules: {
        emp_name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ],
        org_name: [{
          required: true,
          message: '请选择所属组织',
          trigger: 'change'
        }],
        dept_id: [{
          required: true,
          message: '请选择所属部门',
          trigger: 'change'
        }]
      }
    }
  },
  props: {
    fromData: {
      type: Object,
      defualt: {}
    },
    treeArr: {
      type: Array,
      defualt: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let time = Date.parse(new Date(this.ruleForm.entry_datetime))
          this.ruleForm.emp_entry_datetime = time / 1000
          this.ruleForm.emp_entry_datetime = this.ruleForm.emp_entry_datetime ? this.ruleForm.emp_entry_datetime : ''
          this.$store.dispatch('editEmployee', this.ruleForm).then(res => {
            if (res.code === 200) {
                this.$message({
                message: '职员编辑成功',
                type: 'success'
              })
              this.$emit('close')
            }
          })
        } else {
          console.log('submit error')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    editInit() {
      this.org_name = sessionStore.get('userInfo').org_name
      this.$store.dispatch('detailEmployee', {
        emp_id: this.fromData.emp_id
      }).then(res => {
        // console.log(res)
        res.data.emp_entry_datetime = res.data.emp_entry_datetime * 1 ? res.data.emp_entry_datetime * 1 : ''
        this.ruleForm = res.data
      })
      this.treeData = this.treeArr
    }
  }
}
</script>

<style>
</style>
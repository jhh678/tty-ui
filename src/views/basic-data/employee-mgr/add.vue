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
        <!-- <b-select v-model="ruleForm.org_name" placeholder="请选择所属组织" @change="optionValue">
          <b-option v-for="(item, index) in orgTree" 
                      :key="index"
                      :label="item.org_name" 
                      :value="item.org_id" 
                      ></b-option>
          </b-select> -->
        </b-select>
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
        <div class="btnbox"> 
          <button type="button" class="btn btn-primary btn-mw" @click="submitForm(0)">保存并新增</button>
          <button type="button" class="btn btn-primary btn-mw" @click="submitForm(1)">保存并关闭</button>
          <button type="button" class="btn btn-default btn-mw" @click="cancel">取消</button>
        </div>
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
      orgTree: [],
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
        // org_name: [{
        //   required: true,
        //   message: '请选择所属组织',
        //   trigger: 'change'
        // }],
        dept_id: [{
          required: true,
          message: '请选择所属部门',
          trigger: 'change'
        }]
      }
    }
  },
  props: {
    treeArr: {
      type: Array,
      defualt: []
    }
  },
  methods: {
    submitForm(type) {
      let that = this
      this.$refs.ruleForm.validate((valid) => {
        if(valid) {
          this.ruleForm.emp_entry_datetime = this.ruleForm.emp_entry_datetime ? new Date(this.ruleForm.emp_entry_datetime).getTime() : ''
          console.log(that.ruleForm)
          this.$store.dispatch('addEmployee', (that.ruleForm)).then((res) => {
           if (res.code === 200) {
             this.$message({
              message: '新增职员成功',
              type: 'success'
            })
             this.resetForm()
            if (type === 1) {
              this.$emit('close')
            }
           }
          })
        } else {
          console.log('submit error')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.ruleForm.emp_mobile = ''
      this.ruleForm.emp_code = ''
      this.ruleForm.emp_position = ''
      this.ruleForm.emp_urgent_person = ''
      this.ruleForm.emp_urgent_tel = ''
      this.ruleForm.emp_entry_datetime = ''
    },
    addInit() {
      this.org_name = sessionStore.get('userInfo').org_name
      this.ruleForm.org_id = sessionStore.get('userInfo').org_id
      this.treeData = this.treeArr
    },
    // 取消
    cancel () {
      this.resetForm()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.btnbox{
  display: flex;
  justify-content: center;
}
</style>
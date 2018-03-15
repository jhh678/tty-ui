<template>
  <div class="add-org">
    <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form">
      <b-form-item label="所属组织:" class="item-text" v-if="depData.tree_type == 1">
        <span class="deptext">{{depData.org_name}}</span>
      </b-form-item>
      <b-form-item label="上级部门:" class="item-text" v-else-if="depData.tree_type == 2">
        <span class="deptext">{{depData.dept_name}}</span>
      </b-form-item>

      <b-form-item label="编码:" prop="code">
        <b-input v-model="ruleForm.code"></b-input>
      </b-form-item>
      <b-form-item label="部门名称:" prop="name">
        <b-input v-model="ruleForm.name"></b-input>
      </b-form-item>
      <b-form-item label="负责人:" v-if="depType == 1">
        <b-select v-model="ruleForm.head" placeholder="选择负责人">
          <b-option v-for="(item,index) in employee" 
                    :label="item.emp_name" 
                    :key="index" 
                    :value="item.emp_id"></b-option>
        </b-select>
      </b-form-item>
      <b-form-item style="font-size: 0;" v-if="depType == 0">
        <button type="button" class="btn btn-primary" @click="addSubmitForm('ruleForm', 1)">保存并关闭</button>
        <button type="button" class="btn btn-default" @click="addSubmitForm('ruleForm', 0)">保存并新增</button>
        <button type="button" class="btn btn-default" @click="resetForm('ruleForm')">取消</button>
      </b-form-item>
      <b-form-item style="font-size: 0;" v-else>
        <button type="button" class="btn btn-primary" @click="editSubmitForm('ruleForm')">保存</button>
        <button type="button" class="btn btn-default" @click="concelt">取消</button>
      </b-form-item>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
import { BSelect, BOption, BOptionGroup } from '@/components/select'
import { BDatePicker, BTimePicker } from '@/components/datetime-picker'
import BSwitch from '@/components/switch/switch'
import { BRadio, BRadioGroup } from '@/components/radio'
import { BCheckbox, BCheckboxGroup } from '@/components/checkbox'
export default {
  name: 'addOrg',
  components: {
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BOptionGroup,
    BDatePicker,
    BTimePicker,
    BSwitch,
    BRadio,
    BRadioGroup,
    BCheckbox,
    BCheckboxGroup
  },
  props: {
    depData: {
      type: Object,
      defualt: {}
    },
    depType: {
      type: Number,
      defualt: 0
    },
    fetchOrg: {
      type: Function,
      defualt: function() {}
    }
  },
  data () {
    return{
      ruleForm: {
        code: '',
        name: '',
        head: ''
      },
      rules: {
        code: [{
          required: true,
          message: '请输入编码',
          trigger: 'blur'
        }],
        name: [
          {
            required: true,
            message: '请输入组织名称',
            trigger: 'blur'
          }
        ]
      },
      employee: []
    }
  },
  methods: {
    addSubmitForm(formName, type) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if(valid) {
          let prams = _this.postFromPrams()
          _this.$store.dispatch('addDep', prams).then(res => {
            if(res.code === 200) {
              if (type === 1) {
                // 保存并关闭
                _this.$emit('close', '新增部门成功')
                _this.resetForm('ruleForm')
              } else {
                // 保存并新增
                _this.fetchOrg()
                _this.$message({
                  message: '新增部门成功',
                  type: 'success'
                })
                _this.resetForm('ruleForm')
              }
            } else {
              _this.$message({
                message: '新增部门失败',
                type: 'error'
              })
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    concelt () {
      this.$emit('close', 0)
    },
    editSubmitForm (formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if(valid) {
          let prams = _this.postFromPrams()
          _this.$store.dispatch('editeDep', prams).then(res => {
            _this.$emit('close', '编辑部门成功')
          })
        }
      })
    },
    postFromPrams () {
      let prams = {
        org_id: this.depData.org_id,
        dept_pid: this.depData.dept_id || 0,
        dept_name: this.ruleForm.name,
        dept_code: this.ruleForm.code,
        dept_short_name: this.depData.dept_short_name
      }
      if (this.depType === 1) {
        prams.dept_pid = Number(this.depData.dept_pid)
        prams.dept_id = this.depData.dept_id
        prams.emp_id = this.depData.emp_id
      }
      return prams
    },
    getEmployee (prams) {
      this.$store.dispatch('getEmployee', prams).then(res => {
        if (res.items) {
          this.employee = res.items
        } else {
          this.employee = []
        }
      })
    },
    // 编辑部门初始化
    editInit() {
      if (this.depType === 1) {
        this.ruleForm.code = this.depData.dept_code
        this.ruleForm.name = this.depData.dept_name
        let prams = {
          dept_id: this.depData.dept_id,
          org_id: this.depData.dept_id,
          limit: 15
        }
        this.getEmployee(prams)
      }
    },
    watch: {
      depType (val) {
        console.log('watch val', val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.item-text{
  .deptext{
    line-height: 30px;
    color: #00a53c;
  }
}
</style>
<template>
  <div class="add-org">
    <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form">
      <div class="clearfix">
        <b-form-item width="auto" class="col-md-12" label="编码" prop="code">
          <b-input v-model="ruleForm.code"></b-input>
        </b-form-item>
        <b-form-item width="auto" class="col-md-12" label="组织简称">
          <b-input v-model="ruleForm.orgEname"></b-input>
        </b-form-item>
      </div>
      <b-form-item label="组织名称" prop="name">
        <b-input v-model="ruleForm.name"></b-input>
      </b-form-item>
      <div class="clearfix">
        <b-form-item width="auto" class="col-md-12" label="法人" prop="legal">
          <b-input v-model="ruleForm.legal"></b-input>
        </b-form-item>
        <b-form-item width="auto" class="col-md-12" label="组织类型" prop="type">
          <b-select v-model="ruleForm.type" placeholder="选择组织类型">
            <b-option label="独立核算" value="1"></b-option>
            <b-option label="非独立核算" value="0"></b-option>
          </b-select>
        </b-form-item>
      </div>
      <div class="clearfix">
        <b-form-item width="auto" class="col-md-12" label="电话">
          <b-input v-model="ruleForm.phone"></b-input>
        </b-form-item>
        <b-form-item width="auto" class="col-md-12" label="传真">
          <b-input v-model="ruleForm.fax"></b-input>
        </b-form-item>
      </div>
      <b-form-item label="住址">
        <b-input v-model="ruleForm.address"></b-input>
      </b-form-item>
      <div class="clearfix">
        <b-form-item  width="auto" class="col-md-12" label="组织代码">
          <b-input v-model="ruleForm.orgCode"></b-input>
        </b-form-item>
        <b-form-item  width="auto" class="col-md-12" label="税务登记号">
          <b-input v-model="ruleForm.registerNumber"></b-input>
        </b-form-item>
      </div>
      <b-form-item style="font-size: 0;" v-if="orgType == 0">
        <button type="button" class="btn btn-primary" @click="addSubmitForm('ruleForm', 1)">保存并关闭</button>
        <button type="button" class="btn btn-default" @click="addSubmitForm('ruleForm', 0)">保存并新增</button>
        <button type="button" class="btn btn-default" @click="resetForm()">重置</button>
      </b-form-item>
      <b-form-item style="font-size: 0;" v-else>
        <button type="button" class="btn btn-primary" @click="editeSubmitForm('ruleForm')">保存</button>
        <button type="button" class="btn btn-default" @click="concel()">取消</button>
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
    orgData: {
      type: Object,
      defualt: {}
    },
    orgType: {
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
        legal: '',
        type: '1',
        phone: '',
        fax: '',
        address: '',
        orgCode: '',
        registerNumber: ''
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
        ],
        legal: [
          {
            required: true,
            message: '请输入法人',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择组织类型',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 新增保存并关闭
    addSubmitForm(formName, type) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let prams = _this.postFormPrams()
          _this.$store.dispatch('addOrg', prams).then(res => {
            if (res.code === 200) {
              if (type === 1) {
                // 保存并关闭
                _this.$emit('close', '新增组织成功')
                _this.resetForm()
              } else {
                // 保存并新增
                _this.fetchOrg()
                _this.$message({
                  message: '新增组织成功',
                  type: 'success'
                })
                _this.resetForm()
              }
            }
          })
        }
      })
    },
    // 编辑保存
    editeSubmitForm (formName) {
      // const _this = this
      this.$refs[formName].validate(async (valid) => {
        if(valid) {
          // let prams = _this.postFormPrams()
          // let res = await this.$store.dispatch('editOrg', prams)
        }
      })
    },
    // 重置
    resetForm() {
      this.ruleForm.code = ''
      this.ruleForm.name = ''
      this.ruleForm.orgEname = ''
      this.ruleForm.legal = ''
      this.ruleForm.type = '1'
      this.ruleForm.phone = ''
      this.ruleForm.fax = ''
      this.ruleForm.address = ''
      this.ruleForm.orgCode = ''
      this.ruleForm.registerNumber = ''
    },
    // 提交数据
    postFormPrams () {
      let orgData = this.orgData
      let ruleForm = this.ruleForm
      let prams = {
        org_number: ruleForm.code,
        parent_id: orgData.org_id,
        org_name: ruleForm.name,
        org_short_name: ruleForm.orgEname,
        org_legal_person: ruleForm.legal,
        org_type_id: orgData.org_type_id,
        org_code: ruleForm.orgCode,
        org_if_auxiliary: ruleForm.type,
        org_tel: ruleForm.phone,
        org_fax: ruleForm.fax,
        org_address: ruleForm.address,
        org_tax_no: ruleForm.registerNumber
      }
      if (this.orgType === 1) {
        prams.org_id = orgData.org_id
      }
      return prams
    },
    concel() {
      this.$emit('close')
    },
    editInit() {
      let orgData = this.orgData
      if (this.orgType === 1) {
        this.ruleForm.code = orgData.org_code
        this.ruleForm.name = orgData.org_name
        this.ruleForm.orgEname = orgData.org_short_name
        this.ruleForm.legal = orgData.org_short_name
        this.ruleForm.type = orgData.org_if_auxiliary
        this.ruleForm.phone = orgData.org_tel
        this.ruleForm.fax = orgData.org_fax
        this.ruleForm.address = orgData.org_address
        this.ruleForm.orgCode = ''
        this.ruleForm.registerNumber = orgData.org_tax_no
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
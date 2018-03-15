<template>
  <div class="add-org">
    <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form">
      <b-form-item label="银行" prop="bank">
        <b-input v-model="ruleForm.bank"></b-input>
      </b-form-item>
      <b-form-item label="账号" prop="bankNumber">
        <b-input v-model="ruleForm.bankNumber"></b-input>
      </b-form-item>
      <b-form-item style="font-size: 0;" v-if="isEdit == 0">
        <button type="button" class="btn btn-primary" @click="addSubmitForm('添加银行账号成功')">保存并关闭</button>
        <button type="button" class="btn btn-default" @click="addSubmitForm('')">保存并新增</button>
        <button type="button" class="btn btn-default" @click="resetForm">重置</button>
      </b-form-item>
      <b-form-item style="font-size: 0;" v-else>
        <button type="button" class="btn btn-primary" @click="editSubmitForm('编辑银行账号成功')">保存</button>
        <button type="button" class="btn btn-default" @click="concel('ruleForm')">取消</button>
      </b-form-item>
    </b-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
    pBank: {
      type: Object,
      defualt: {}
    },
    fetchBank: {
      type: Function,
      defualt: function() {}
    },
    isEdit: {
      type: Number,
      defualt: 0
    }
  },
  data () {
    return{
      ruleForm: {
        bank: '',
        bankNumber: ''
      },
      rules: {
        bank: [{
          required: true,
          message: '请输入银行名字',
          trigger: 'blur'
        }],
        bankNumber: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            required: true,
            min: 16,
            max: 19,
            message: '银行账号是16到19位数',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.BasicData.bankOrg
    })
  },
  methods: {
    addSubmitForm(str) {
       this.$refs.ruleForm.validate(valid => {
        if(valid) {
          this.addBank(str)
        }
      })
    },
    editSubmitForm(str) {
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          this.editBank(str)
        }
      })
    },
    async addBank(closeStr) {
      const prams = {
        org_id: this.orgId,
        bank_name: this.ruleForm.bank,
        account_number: this.ruleForm.bankNumber
      }
      const res = await this.$store.dispatch('addBank', prams)
      this.tip(res, closeStr)
    },
    async editBank(closeStr) {
      const prams = {
        org_id: this.orgId,
        id: this.pBank.id,
        bank_name: this.ruleForm.bank,
        account_number: this.ruleForm.bankNumber
      }
      const res = await this.$store.dispatch('editBank', prams)
      this.tip(res, closeStr)
    },
    // 提示公用
    async tip (res, closeStr) {
      if (res.code === 200) {
        await this.fetchBank()
        if (closeStr) {
          this.$emit('close', closeStr)
          this.resetForm()
        } else {
          this.$message({
            message: '新增银行账号成功',
            type: 'success'
          })
        }
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    concel() {
      this.resetForm()
      this.$emit('close')
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    editModel() {
      if (this.isEdit === 1) {
        this.ruleForm.bank = this.pBank.bank_name
        this.ruleForm.bankNumber = this.pBank.account_number
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
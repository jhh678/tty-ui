<template>
  <div>
    <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-form">
      <b-form-item label="密码" prop="password">
        <b-input type="password" v-model="ruleForm.password"  placeholder="请输入密码"></b-input>
      </b-form-item>
      <b-form-item label="确认密码" prop="cpassword">
        <b-input  type="password" v-model="ruleForm.cpassword"  placeholder="请输确认密码"></b-input>
      </b-form-item>
      <b-form-item>
        <button type="button" class="btn btn-mw btn-primary marginbtn" @click="submitForm()">保存</button>
        <button type="button" class="btn btn-mw btn-default" @click="cancel">取消</button>
      </b-form-item>
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
export default {
  components: {
    BForm,
    BFormItem,
    BInput
  },
  props: {
    editeData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      ruleForm: {
        password: '',
        cpassword: ''
      },
      rules: {
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
        }]
      }
    }
  },
  methods: {
    submitForm () {
      console.log(this.editeData)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.resetPassword()
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    // 取消
    cancel () {
      this.resetForm()
      this.$emit('close')
    },
    async resetPassword () {
      let prams = {
        id: this.editeData.user_id,
        login_password: this.ruleForm.password
      }
      let res = await this.$store.dispatch('resetPassword', prams)
      if (res.code === 200) {
        this.$message({
          message: '设置新密码成功',
          type: 'success'
        })
        this.$emit('close')
      }
    }
  }
}
</script>

/*
 * @File: 表单示例
 * @Author: jhh678
 * @Date: 2018-03-28 15:42:06
 * @Last Modified by:   jhh678
 * @Last Modified time: 2018-03-28 15:42:06
 */

<template>
  <div class="sub-page-wrap">
    <div class="form-demo-header">
      <h3>Form 表单</h3>
      <div class="text-muted">由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据</div>
    </div>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>典型表单</h4>
        <div class="text-muted">包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。</div>
      </div>
      <div class="panel-body">
        <b-form :model="form" label-width="100px" class="demo-form">
          <b-form-item label="活动名称" prop="name">
            <b-input v-model="form.name"></b-input>
          </b-form-item>
          <b-form-item label="活动区域" prop="region" :show-validate-icon="false">
            <b-select v-model="form.region" placeholder="请选择活动区域">
              <b-option label="北京" value="beijing"></b-option>
              <b-option label="上海" value="shanghai"></b-option>
              <b-option label="广州" value="guangzhou"></b-option>
              <b-option label="深圳" value="shenzhen"></b-option>
            </b-select>
          </b-form-item>
          <b-form-item label="活动时间" required>
            <div class="col-md-11">
              <b-form-item prop="date1" :show-validate-icon="false" style="margin-bottom: 0;">
                <b-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></b-date-picker>
              </b-form-item>
            </div>
            <div class="line col-md-2">-</div>
            <div class="col-md-11">
              <b-form-item prop="date2" :show-validate-icon="false" style="margin-bottom: 0;">
                <b-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></b-time-picker>
              </b-form-item>
            </div>
          </b-form-item>
          <b-form-item label="即时配送" prop="delivery" :show-validate-icon="false">
            <b-switch on-text="" off-text="" v-model="form.delivery"></b-switch>
          </b-form-item>
          <b-form-item label="活动性质" prop="type" :show-validate-icon="false">
            <b-checkbox-group v-model="form.type">
              <b-checkbox label="美食/餐厅线上活动" name="type"></b-checkbox>
              <b-checkbox label="地推活动" name="type"></b-checkbox>
              <b-checkbox label="线下主题活动" name="type"></b-checkbox>
              <b-checkbox label="单纯品牌曝光" name="type"></b-checkbox>
            </b-checkbox-group>
          </b-form-item>
          <b-form-item label="特殊资源" prop="resource" :show-validate-icon="false">
            <b-radio-group v-model="form.resource">
              <b-radio label="线上品牌商赞助"></b-radio>
              <b-radio label="线下场地免费"></b-radio>
            </b-radio-group>
          </b-form-item>
          <b-form-item label="活动形式" prop="desc">
            <b-input type="textarea" v-model="form.desc"></b-input>
          </b-form-item>
          <b-form-item style="font-size: 0;">
            <button type="button" class="btn btn-primary" @click="onSubmit">保存</button>
            <button type="button" class="btn btn-default">取消</button>
          </b-form-item>
        </b-form>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>表单验证</h4>
        <div class="text-muted">在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。</div>
      </div>
      <div class="panel-body">
        <b-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-form">
          <b-form-item label="活动名称" prop="name">
            <b-input v-model="ruleForm.name"></b-input>
          </b-form-item>
          <b-form-item label="活动区域" prop="region">
            <b-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <b-option label="北京" value="beijing"></b-option>
              <b-option label="上海" value="shanghai"></b-option>
              <b-option label="广州" value="guangzhou"></b-option>
              <b-option label="深圳" value="shenzhen"></b-option>
            </b-select>
          </b-form-item>
          <b-form-item label="活动时间" width="auto" required>
            <div class="col-md-11">
              <b-form-item prop="date1" :show-validate-icon="false" width="auto" style="margin-bottom: 0;">
                <b-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></b-date-picker>
              </b-form-item>
            </div>
            <div class="line col-md-2">-</div>
            <div class="col-md-11">
              <b-form-item prop="date2" :show-validate-icon="false" width="auto" style="margin-bottom: 0;">
                <b-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></b-time-picker>
              </b-form-item>
            </div>
          </b-form-item>
          <div class="clearfix">
            <b-form-item class="col-md-12" label="联系电话" width="auto" prop="phone">
              <b-input v-model="ruleForm.phone"></b-input>
            </b-form-item>
            <b-form-item class="col-md-12" label="联系地址" width="auto" prop="address">
              <b-input v-model="ruleForm.address"></b-input>
            </b-form-item>
          </div>
          <b-form-item label="即时配送" prop="delivery" :show-validate-icon="false">
            <b-switch on-text="" off-text="" v-model="ruleForm.delivery"></b-switch>
          </b-form-item>
          <b-form-item label="活动性质" prop="type" :show-validate-icon="false">
            <b-checkbox-group v-model="ruleForm.type" width="160px">
              <b-checkbox label="美食/餐厅线上活动" name="type"></b-checkbox>
              <b-checkbox label="地推活动" name="type"></b-checkbox>
              <b-checkbox label="线下主题活动" name="type"></b-checkbox>
              <b-checkbox label="单纯品牌曝光" name="type"></b-checkbox>
            </b-checkbox-group>
          </b-form-item>
          <b-form-item label="特殊资源" prop="resource" :show-validate-icon="false">
            <b-radio-group v-model="ruleForm.resource" width="160px">
              <b-radio label="线上品牌商赞助"></b-radio>
              <b-radio label="线下场地免费"></b-radio>
            </b-radio-group>
          </b-form-item>
          <b-form-item label="活动形式" prop="desc" width="auto">
            <b-input type="textarea" v-model="ruleForm.desc"></b-input>
          </b-form-item>
          <b-form-item style="font-size: 0;">
            <button type="button" class="btn btn-primary" @click="submitForm('ruleForm')">保存</button>
            <button type="button" class="btn btn-default" @click="resetForm('ruleForm')">重置</button>
          </b-form-item>
        </b-form>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>行内表单</h4>
        <div class="text-muted">当垂直方向空间受限且表单较简单时，可以在一行内放置表单，可用于表格检索条件。</div>
      </div>
      <div class="panel-body">
        <div class="search-wrap">
          <b-form :model="formInline" :inline="true" label-width="100px" ref="formInline" class="demo-form-inline">
            <b-form-item prop="name">
              <b-input v-model="formInline.name" size="sm" placeholder="请输入工号、姓名、手机号查询"></b-input>
            </b-form-item>
            <b-form-item label="审批人" prop="user">
              <b-input v-model="formInline.user" size="sm" placeholder="审批人"></b-input>
            </b-form-item>
            <b-form-item label="活动区域" prop="region" :show-validate-icon="false">
              <b-select v-model="formInline.region" size="sm" placeholder="请选择活动区域">
                <b-option label="北京" value="beijing"></b-option>
                <b-option label="上海" value="shanghai"></b-option>
                <b-option label="广州" value="guangzhou"></b-option>
                <b-option label="深圳" value="shenzhen"></b-option>
              </b-select>
            </b-form-item>
            <b-form-item style="font-size: 0;">
              <button type="button" class="btn btn-primary btn-sm" @click="onSearch">检索</button>
              <button type="button" class="btn btn-default btn-sm" @click="resetForm('formInline')">重置</button>
            </b-form-item>
          </b-form>
        </div>
        <div class="option-btns-wrap">
        	<button type="button" class="btn btn-primary btn-sm"><i class="iconfont icon-xinzeng"></i>新增</button>
          <button type="button" class="btn btn-default btn-sm"><i class="iconfont icon-jinyong"></i>禁用</button>
          <button type="button" class="btn btn-default btn-sm"><i class="iconfont icon-qiyong"></i>启用</button>
          <button type="button" class="btn btn-default btn-sm"><i class="iconfont icon-close"></i>删除</button>
          <button type="button" class="btn btn-default btn-sm"><i class="iconfont icon-daochu"></i>导出</button>
          <button type="button" class="btn btn-default btn-sm"><i class="iconfont icon-daoru"></i>导入</button>
          <button type="button" class="btn btn-default btn-sm"><i class="iconfont icon-shangpinku"></i>云商品库</button>
        </div>
      </div>
    </section>
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
  name: 'FormDemo',
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
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        phone: '',
        address: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }
        ],
        region: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        date1: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        date2: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }],
        phone: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入联系地址',
          trigger: 'blur'
        }],
        type: [{
          type: 'array',
          required: true,
          message: '请至少选择一个活动性质',
          trigger: 'change'
        }],
        resource: [{
          required: true,
          message: '请选择活动资源',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: '请填写活动形式',
          trigger: 'blur'
        }]
      },
      formInline: {
        name: '',
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit data:', this.form)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSearch() {
      console.log('search data:', this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-demo-header {
  padding: 20px;
  background: #fff;
  h3 {
    margin-top: 0;
  }
}

.demo-form {
  width: 580px;
}

.line {
  margin-left: -20px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>

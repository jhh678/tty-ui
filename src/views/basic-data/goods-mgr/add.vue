<template>
  <div class="add-goods">
  	<div class="goods-group">
      <h3>基本信息</h3>
      <div class="goods-info">
        <b-form :model="formInline" :inline="true" label-width="100px" ref="formInline" class="demo-form-inline">
          <div class="row">
            <div class="col-sm-18">
              <b-form-item label="商品编号：" prop="id">
                <b-input v-model="formInline.id" size="sm" placeholder=""></b-input>
              </b-form-item>
              <b-form-item label="商品名称：" prop="name1">
                <b-input v-model="formInline.name1" size="sm" placeholder=""></b-input>
              </b-form-item>
              <b-form-item label="简称：" prop="shorthand">
                <b-input v-model="formInline.shorthand" size="sm" placeholder=""></b-input>
              </b-form-item>              
              <b-form-item label="品牌：" prop="brand">
                <b-input v-model="formInline.brand" size="sm" placeholder=""></b-input>
              </b-form-item>
              <b-form-item label="商品分类：" prop="classify" :show-validate-icon="false" style="margin: 0 20px;">
                <b-select v-model="formInline.classify" size="sm" placeholder="请选择">
                  <b-option label="除草剂" value="0"></b-option>
                  <b-option label="杀虫剂" value="1"></b-option>
                  <b-option label="杀菌剂" value="2"></b-option>
                </b-select>
              </b-form-item>
              <b-form-item label="成分：" prop="part">
                <b-input v-model="formInline.part" size="sm" placeholder=""></b-input>
              </b-form-item>
              <b-form-item label="产地：" prop="place">
                <b-input v-model="formInline.place" size="sm" placeholder=""></b-input>
              </b-form-item>
              <b-form-item label="商品条码：" prop="code">
                <b-input v-model="formInline.code" size="sm" placeholder=""></b-input>
              </b-form-item>
              <b-form-item label="" prop="service">
                <b-checkbox v-model="formInline.service">是否服务商品</b-checkbox>
              </b-form-item>
              <b-form-item label="备注：" prop="remark">
                <textarea placeholder=""></textarea>
              </b-form-item>
            </div>
            <div class="col-sm-6">
              <b-form-item label="规格：" prop="spec">
                <b-input v-model="formInline.spec" size="sm" placeholder=""></b-input>
              </b-form-item>
            </div>
          </div>
        </b-form>
      </div>
    </div>
    
  	<div class="goods-group">
      <h3>单位&amp;价格</h3>
      <div class="goods-info">
        <b-table :data="tableConfig.data"
             :columns="tableConfig.columns"
             :show-select="true"
             :show-handle="true"
             :select-fixed="true"
             :handle-fixed="true"
             :pagination="tableConfig.pagination">
          <template slot="operations" slot-scope="scope">
            <span @click="deleteItem">删除</span>
          </template>
        </b-table>
      </div>
      <div class="fbtn">
        <button type="button" class="btn btn-primary" @click="addUnit"><i class="iconfont">&#xe797;</i>新增</button>
        <button type="button" class="btn btn-default" @click="deleteSelectUint"><i class="iconfont">&#xe79d;</i>删除</button>
      </div>
  	</div>

    
  	<div class="goods-group">
      <h3>税率</h3>
      <div class="goods-info">
        <b-form :model="formInline" :inline="true" label-width="100px" ref="formInline1" class="demo-form-inline">
          <div class="row">
              <div class="col-sm-24">
                <b-form-item label="采购默认税率：" prop="buyrate" :show-validate-icon="false" style="margin: 0 20px;">
                  <b-select v-model="formInline.buyrate" size="sm" placeholder="请选择">
                    <b-option label="基准税率" value="0"></b-option>
                    <b-option label="9折税率" value="1"></b-option>
                    <b-option label="8折税率" value="2"></b-option>
                  </b-select>
                </b-form-item>
              </div>
          </div>
        
          <div class="row">
              <div class="col-sm-24">
                <b-form-item label="销售默认税率：" prop="salerate" :show-validate-icon="false" style="margin: 0 20px;">
                  <b-select v-model="formInline.salerate" size="sm" placeholder="请选择">
                    <b-option label="基准税率" value="0"></b-option>
                    <b-option label="9折税率" value="1"></b-option>
                    <b-option label="8折税率" value="2"></b-option>
                  </b-select>
                </b-form-item>
              </div>
          </div>
        
        </b-form>
      </div>
    </div>

    <div class="option-btns-wrap">
      <button type="button" class="btn btn-primary btn-sm" @click="add">保存并关闭</button>
      <button type="button" class="btn btn-default btn-sm" @click="save">保存</button>
      <button type="button" class="btn btn-default btn-sm" @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
import { BForm, BFormItem } from '@/components/form'
import BInput from '@/components/input'
import { BCheckbox } from '@/components/checkbox'
import { BSelect, BOption } from '@/components/select'
import BTable from '@/components/table/table'

export default {
  components: {
    BForm,
    BFormItem,
    BInput,
    BSelect,
    BOption,
    BCheckbox,
    BTable
  },
  data() {
    return {
      formInline: {
        id: '',
        name1: '',
        shorthand: '',
        spec: '',
        brand: '',
        classify: '',
        part: '',
        place: '',
        code: '',
        service: false
      },
      tableConfig: {
        data: [{
          emp_name: '瓶',
          emp_rate: '<input placeholder="" value="">',
          emp_buy_price: '<input placeholder="" value="">',
          emp_retail_price: '<input placeholder="" value="">',
          emp_vip_price: '<input placeholder="" value="">',
          emp_metering_uint: '<input name="metering" type="radio" value="">',
          emp_purchase_unit: '<input name="purchase" type="radio" value="">',
          emp_sale_unit: '<input name="sale" type="radio" value="">',
          emp_surplus_unit: '<input name="surplus" type="radio" value="">'
        },
        {
          emp_name: '瓶',
          emp_rate: '<input placeholder="" value="">',
          emp_buy_price: '<input placeholder="" value="">',
          emp_retail_price: '<input placeholder="" value="">',
          emp_vip_price: '<input placeholder="" value="">',
          emp_metering_uint: '<input name="metering" type="radio" value="">',
          emp_purchase_unit: '<input name="purchase" type="radio" value="">',
          emp_sale_unit: '<input name="sale" type="radio" value="">',
          emp_surplus_unit: '<input name="surplus" type="radio" value="">'
        }],
        columns: [{
          title: '单位名称',
          key: 'emp_name',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '换算率',
          key: 'emp_rate',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '采购价',
          key: 'emp_buy_price',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '零售价',
          key: 'emp_retail_price',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '会员价',
          key: 'emp_vip_price',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '基本计量单位',
          key: 'emp_metering_uint',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '采购默认单位',
          key: 'emp_purchase_unit',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '销售默认单位',
          key: 'emp_sale_unit',
          width: 100,
          textAlign: 'center'
        },
        {
          title: '存货默认单位',
          key: 'emp_surplus_unit',
          width: 100,
          textAlign: 'center'
        }
        ],
        pagination: {
          total: 0
        },
        selectedItems: []
      }
    }
  },
  methods: {
    async deleteUnit() {
    },
    deleteItem(item) {
      this.deleteUnit()
    },
    resetForm() {

    },
    onSearch() {
      console.log('search data:')
    },
    add() {
    },
    save() {

    },
    close() {

    },
    addUnit() {

    },
    deleteSelectUint() {

    }
  }
}

</script>

<style lang="scss">
.add-goods {
  .goods-group {
    h3 {
      padding: 15px;
      background: #eee;
    }
    .goods-info {
      padding: 0 15px;
      .form-group {
        margin: 0 0 15px 0 !important;
      }
      .table-scroll {
        td {
          input {
            width: 100%;
            background: none;
            text-align: center;
          }
        }
      }
    }
    .fbtn {
      margin: 25px 0 0 15px;
    }
  }
  .option-btns-wrap {
    margin: 25px 15px;
  }
}
.form-inline {
  .form-group {
    .control-label {
      width: auto;
    }
  }
}
</style>
/*
 * @File: 选择器组件示例
 * @Author: jhh678
 * @Date: 2018-03-28 11:30:19
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 11:34:19
 */

<template>
  <div class="sub-page-wrap">
    <section class="panel panel-default">
      <div class="panel-heading">Select选择器</div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>基础用法</h4>
          <div class="text-muted">适用广泛的基础单选</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>禁用状态</h4>
          <div class="text-muted">选择器不可用状态</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" disabled placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>可清空单选</h4>
          <div class="text-muted">包含清空按钮，可将选择器清空为初始状态</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" clearable placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>基础多选</h4>
          <div class="text-muted">适用性较广的基础多选，用 Tag 展示已选项</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectMulValue" multiple placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>可搜索</h4>
          <div class="text-muted">可以利用搜索功能快速查找选项</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" filterable placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>远程搜索</h4>
          <div class="text-muted">从服务器搜索数据，输入关键字进行查找</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="remoteSelectValue" filterable remote placeholder="请选择" :remote-method="remoteMethod" :loading="selectLoading">
                <b-option v-for="item in remoteOptions" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>支持自定义底部操作</h4>
          <div class="text-muted">支持自定义底部操作，比如添加操作，自定义slot(name=footer)</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" filterable allow-create :create-method="createNewOption" placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>下拉树</h4>
          <div class="text-muted">从服务器搜索数据，输入关键字进行查找</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="treeSelectValue" filterable placeholder="请选择">
                <b-option-tree :tree-data="treeData" :tree-props="treeProps" node-key="id"></b-option-tree>
              </b-select>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  BSelect,
  BOption,
  BOptionGroup,
  BOptionTree
} from '@/components/select'

let optionIndex = 6

export default {
  components: {
    BSelect,
    BOption,
    BOptionGroup,
    BOptionTree
  },
  data() {
    return {
      selectValue: '',
      remoteSelectValue: '',
      selectMulValue: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      remoteOptions: [],
      selectStates: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming'
      ],
      selectList: [],
      selectLoading: false,
      treeSelectValue: '9',
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      treeProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.remoteOptions = this.selectList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.remoteOptions = this.selectList.slice()
      }
    },
    createNewOption() {
      let index = optionIndex++
      const newOption = {
        value: '选项' + index,
        label: '黄焖鸡米饭' + index
      }
      this.options.push(newOption)
    }
  },
  created() {
    this.selectList = this.selectStates.map(item => {
      return {
        value: item,
        label: item
      }
    })
    this.remoteOptions = this.selectList.slice()
  }
}

</script>

<template>
  <div class="area-select">
    <div class="select-text clearfix">
      <label>{{contentText}}</label>
      <span @click="resetSeachText">清空</span>
    </div>
    <input type="text" :disabled="disabled" class="text-search" placeholder="请输入关键字搜索..." v-model="seachText">
    <div class="select-box clearfix">
      <b-checkbox-group v-if="JSON.stringify(objdata) !=='{}'" v-model="insideSelected">
        <b-checkbox v-for="(vuale, key) of objdata" width="46%" :label="key" :key="key">{{vuale}}</b-checkbox>
      </b-checkbox-group>
      <div v-else class="no-data">暂无数据</div>
    </div>
  </div>
</template>
<script>
import { BCheckbox, BCheckboxGroup } from '@/components/checkbox'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      dafault: []
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    BCheckbox,
    BCheckboxGroup
  },
  data() {
    return {
      objdata: {},
      seachText: ''
    }
  },
  created() {
    this.objdata = this.data
  },
  computed: {
    contentText() {
      let arr = []
      console.log(this.data)
      this.selected.forEach(function (index) {
        arr.push(this.data[index])
      }.bind(this))
      return arr.join(',')
    },
    insideSelected: {
      set(val) {
        this.$emit('checkData', val)
      },
      get() {
        return this.selected
      }
    }
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.objdata = Object.assign({}, this.data)
        }
      },
      deep: true
    },
    seachText(val, oldVal) {
      this.objdata = Object.assign({}, this.data)
      if (val !== oldVal) {
        if (val) {
          for (var i in this.objdata) {
            if (this.objdata[i].indexOf(val) < 0) {
              delete this.objdata[i]
            }
          }
        }
      }
    }
  },
  methods: {
    // 清空
    resetSeachText() {
      this.seachText = ''
      this.selected.splice(0, this.selected.length)
    }
  }
}
</script>
<style lang="scss" scoped>
.area-select {
  .select-text {
    height: 30px;

    label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 15px;
      width: 450px;
      height: 30px;
      line-height: 28px;
      border: 1px solid #ccc;
      font-weight: normal;
      float: left;
      margin-bottom: 0;
    }
    span {
      width: 50px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background: #00a53c;
      display: block;
      float: left;
      color: #fff;
      cursor: pointer;
    }
  }

  .text-search {
    padding: 0 15px;
    width: 500px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #00a53c;
    outline: none;
    border-bottom: 0;
  }

  .select-box {
    width: 500px;
    padding: 0 15px;
    max-height: 320px;
    overflow-y: auto;
    border: 1px solid #00a53c;
    background: #fff;

    .no-data {
      padding: 30px;
      text-align: center;
    }
  }
}
</style>
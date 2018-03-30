/*
 * @File: 输入框示例
 * @Author: jhh678
 * @Date: 2018-03-28 11:34:58
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 11:35:31
 */

<template>
  <div class="sub-page-wrap">
    <h4>基础用法</h4>
    <div class="row">
      <div class="col-sm-24">
        <b-input v-model="inputValue1" placeholder="请输入内容"></b-input>
      </div>
    </div>
    <h4>禁用状态</h4>
    <div class="text-muted">输入框不可用状态。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-input placeholder="请输入内容" v-model="inputValue2" :disabled="true"></b-input>
      </div>
    </div>
    <h4>文本域</h4>
    <div class="text-muted">用于输入多行文本信息，通过将 type 属性的值指定为 textarea。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea1"></b-input>
      </div>
    </div>
    <h4>可自适应文本高度的文本域</h4>
    <div class="text-muted">通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-input type="textarea" autosize placeholder="请输入内容" v-model="textarea2"></b-input>
        <br>
        <b-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3"></b-input>
      </div>
    </div>
    <h4>复合型输入框</h4>
    <div class="text-muted">可前置或后置元素，一般为标签或按钮</div>
    <div class="row">
      <div class="col-sm-24">
        <div>
          <b-input placeholder="请输入内容" v-model="inputValue3">
            <template slot="prepend">Http://</template>
          </b-input>
        </div>
        <div style="margin-top: 15px;">
          <b-input placeholder="请输入内容" v-model="inputValue4">
            <template slot="append">.com</template>
          </b-input>
        </div>
      </div>
    </div>
    <h4>尺寸</h4>
    <div class="text-muted">可通过size属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small两种尺寸。</div>
    <div class="row">
      <div class="col-sm-24">
        <b-input placeholder="请输入内容" v-model="inputValue5"></b-input>
        <b-input size="lg" placeholder="请输入内容" v-model="inputValue6"></b-input>
        <b-input size="sm" placeholder="请输入内容" v-model="inputValue7"></b-input>
      </div>
    </div>
  </div>
</template>

<script>
import BInput from '@/components/input'

export default {
  components: {
    BInput
  },
  data() {
    return {
      inputValue1: '',
      inputValue2: '',
      inputValue3: '',
      inputValue4: '',
      inputValue5: '',
      inputValue6: '',
      inputValue7: '',
      textarea1: '',
      textarea2: '',
      textarea3: ''
    }
  }
}
</script>

/*
 * @File: 标签示例
 * @Author: jhh678
 * @Date: 2018-03-28 16:17:53
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 16:44:08
 */

<template>
  <div class="sub-page-wrap">
    <div class="form-demo-header">
      <h3>Tag 标签</h3>
      <div class="text-muted">用于标记和选择。</div>
    </div>
    <section class="panel panb-default">
      <div class="panb-heading">
        <h4>基础用法</h4>
        <div class="text-muted">由type属性来选择<code>tag</code>的类型，也可以通过<code>color</code>属性来自定义背景色。</div>
      </div>
      <div class="panb-body">
        <b-tag>标签一</b-tag>
        <b-tag type="success">标签二</b-tag>
        <b-tag type="info">标签三</b-tag>
        <b-tag type="warning">标签四</b-tag>
        <b-tag type="danger">标签五</b-tag>
      </div>
    </section>
    <section class="panel panb-default">
      <div class="panb-heading">
        <h4>可移除标签</h4>
        <div class="text-muted">设置<code>closable</code>属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置<code>disable-transitions</code>属性，它接受一个<code>Boolean</code>，true 为关闭。</div>
      </div>
      <div class="panb-body">
        <b-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">{{tag.name}}</b-tag>
      </div>
    </section>
    <section class="panel panb-default">
      <div class="panb-heading">
        <h4>动态编辑标签</h4>
        <div class="text-muted">动态编辑标签可以通过点击标签关闭按钮后触发的<code>close</code>事件来实现</div>
      </div>
      <div class="panb-body">
        <b-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</b-tag>
        <b-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="sm" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></b-input>
        <button v-else class="btn btn-sm" @click="showInput">+ New Tag</button>
      </div>
    </section>
  </div>
</template>

<script>
import BTag from '@/components/tag/tag'
import BInput from '@/components/input'
export default {
  components: {
    BTag,
    BInput
  },
  data() {
    return {
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.b-tag + .b-tag {
  margin-left: 10px;
}

.input-new-tag {
  display: inline-block;
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

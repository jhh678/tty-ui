/*
 * @File: 警告示例
 * @Author: jhh678
 * @Date: 2018-03-28 16:17:53
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-29 16:08:01
 */

<template>
  <div class="sub-page-wrap">
    <div class="form-demo-header">
      <h3>Alert 警告</h3>
      <div class="text-muted">用于页面中展示重要的提示信息。</div>
    </div>
    <section class="panel panb-default">
      <div class="panb-heading">
        <h4>基本用法</h4>
        <div class="text-muted">通过Vue实例直接使用（this.$alert）,Alert组件提供四种主题，由<code>type</code>属性指定，默认值为<code>info</code></div>
      </div>
      <div class="panb-body">
        <button type="button" class="btn btn-default" @click="showAlertSuccess">成功提示</button>
        <button type="button" class="btn btn-default" @click="showAlertInfo">消息提示</button>
        <button type="button" class="btn btn-default" @click="showAlertWarning">警告提示</button>
        <button type="button" class="btn btn-default" @click="showAlertDanger">错误提示</button>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  methods: {
    showAlertSuccess() {
      this.$alert({
        type: 'success',
        message: '恭喜你，打开一个成功提示框',
        duration: 3000,
        closable: true
      })
    },
    showAlertInfo() {
      this.$alert({
        type: 'info',
        message: '恭喜你，打开一个消息提示框',
        duration: 3000,
        closable: true
      })
    },
    showAlertWarning() {
      this.$alert({
        type: 'warning',
        message: '恭喜你，打开一个警告提示框',
        duration: 3000,
        closable: true
      })
    },
    showAlertDanger() {
      this.$alert({
        type: 'danger',
        message: '恭喜你，打开一个错误提示框',
        duration: 3000,
        closable: true
      })
    }
  }
}
</script>

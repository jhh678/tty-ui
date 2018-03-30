/*
 * @File: 加载示例
 * @Author: jhh678
 * @Date: 2018-03-30 16:15:50
 * @Last Modified by:   jhh678
 * @Last Modified time: 2018-03-30 16:15:50
 */

<template>
  <div class="sub-page-wrap">
    <h3>Loading加载</h3>
    <p>加载数据时显示动效。</p>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">服务</h4>
        <p>Loading 还可以以服务的方式调用。引入 Loading 服务</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-default" @click="openLoading">打开加载</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from '@/components'

export default {
  data() {
    return {
      loadingInstance: null
    }
  },
  methods: {
    openLoading() {
      this.loadingInstance = Loading({
        message: '拼命加载中...'
      })

      setTimeout(() => {
        this.loadingInstance.close()
      }, 3000)
    }
  }
}
</script>

<style>

</style>

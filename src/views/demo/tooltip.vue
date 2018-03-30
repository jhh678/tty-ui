/*
 * @File: 文字提示示例
 * @Author: jhh678
 * @Date: 2018-03-30 16:15:50
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-30 17:39:03
 */

<template>
  <div class="sub-page-wrap">
    <h3>Tooltip文字提示</h3>
    <p>常用于展示鼠标 hover 时的提示信息。</p>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">基本用法</h4>
        <p>在这里我们提供 4 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。</p>
      </div>
      <div class="panel-body">
        <b-tooltip text="Top提升文字" placement="top">
          <button type="button" class="btn btn-default">上</button>
        </b-tooltip>
        <b-tooltip text="Rigth提升文字" placement="right">
          <button type="button" class="btn btn-default">右</button>
        </b-tooltip>
        <b-tooltip text="bottom提升文字" placement="bottom">
          <button type="button" class="btn btn-default">下</button>
        </b-tooltip>
        <b-tooltip text="left提升文字" placement="right">
          <button type="button" class="btn btn-default">左</button>
        </b-tooltip>
      </div>
    </section>
  </div>
</template>

<script>
import BTooltip from '@/components/tooltip/tooltip'

export default {
  components: {
    BTooltip
  },
  data() {
    return {
    }
  },
  methods: {
    openLoading() {

    }
  }
}
</script>

<style>

</style>

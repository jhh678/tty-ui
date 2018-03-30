/*
 * @File: 弹出框示例
 * @Author: jhh678
 * @Date: 2018-03-30 16:15:50
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-30 17:43:05
 */

<template>
  <div class="sub-page-wrap">
    <h3>Popover 弹出框</h3>
    <p>Popover 的属性与 Tooltip 很类似，常用于展示鼠标 hover 或 click 时 时的提示信息。</p>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">基本用法</h4>
        <p>在这里我们提供 4 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。</p>
      </div>
      <div class="panel-body">
        <b-popover title="标题" placement="top">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层上</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
        <b-popover title="标题" placement="right">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层左</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
        <b-popover title="标题" placement="bottom">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层下</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
        <b-popover title="标题" placement="left">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层左</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
      </div>
    </section>
  </div>
</template>

<script>
import BPopover from '@/components/popover/popover'

export default {
  components: {
    BPopover
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

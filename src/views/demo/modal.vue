/*
 * @File: 对话框示例
 * @Author: jhh678
 * @Date: 2018-03-30 16:15:50
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-30 17:23:16
 */

<template>
  <div class="sub-page-wrap">
    <h3>Modal对话框</h3>
    <p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">基本用法</h4>
        <p>Modal弹出一个对话框，适合需要定制性更大的场景。</p>
      </div>
      <div class="panel-body">
        <button type="button" class="btn btn-default" @click="showModal1=!showModal1">默认对话框</button>
        <b-modal v-model="showModal1" title="默认对话框">
          <p>这是一个默认对话框</p>
        </b-modal>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">设置尺寸</h4>
        <p>可以通过<code>size</code>设置对话框尺寸，除默认尺寸外，还提供lg,sm两种尺寸，也可以通过<code>width</code>属性自定义宽度</p>
      </div>
      <div class="panel-body">
        <button type="button" class="btn btn-default" @click="showModal2=!showModal2">大尺寸对话框</button>
        <b-modal v-model="showModal2" size="lg" title="大尺寸对话框">
          <p>这是一个大尺寸对话框</p>
        </b-modal>
        <button type="button" class="btn btn-default" @click="showModal3=!showModal3">小尺寸对话框</button>
        <b-modal v-model="showModal3" size="sm" title="小尺寸对话框">
          <p>这是一个小尺寸对话框</p>
        </b-modal>
        <button type="button" class="btn btn-default" @click="showModal4=!showModal4">自定义大小对话框</button>
        <b-modal v-model="showModal4" width="500px" title="自定义大小对话框">
          <p>这是一个自定义大小对话框</p>
        </b-modal>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">设置位置</h4>
        <p>可以通过<code>vertical-align</code>属性设置对话框垂直方向位置，可设置三个值，top|middle|bottom,默认为top</p>
      </div>
      <div class="panel-body">
        <button type="button" class="btn btn-default" @click="showModal5=!showModal5">居中对话框</button>
        <b-modal v-model="showModal5" vertical-align="middle" title="居中对话框">
          <p>这是一个居中对话框</p>
        </b-modal>
        <button type="button" class="btn btn-default" @click="showModal6=!showModal6">底部对话框</button>
        <b-modal v-model="showModal6" vertical-align="bottom" title="底部对话框">
          <p>这是一个底部对话框</p>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import BModal from '@/components/modal'

export default {
  components: {
    BModal
  },
  data() {
    return {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false,
      showModal5: false,
      showModal6: false
    }
  }
}
</script>

<style>

</style>

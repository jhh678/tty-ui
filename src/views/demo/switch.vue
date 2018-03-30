/*
 * @File: 开关组件示例
 * @Author: jhh678
 * @Date: 2018-03-28 11:42:05
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 11:44:56
 */

<template>
  <div class="sub-page-wrap">
    <section class="panel panel-default">
      <div class="panel-heading">Switch 开关<div class="text-muted">表示两种相互对立的状态间的切换，多用于触发「开/关」。</div></div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>基础用法</h4>
          <div class="text-muted">绑定v-model到一个Boolean类型的变量。可以使用active-color属性与inactive-color属性来设置开关的背景色。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-switch v-model="switchValue1" active-color="#00a53c" inactive-color="#ccc"></b-switch>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>文字描述</h4>
          <div class="text-muted">使用show-text控制是否显示文字描述,使用active-text属性与inactive-text属性来设置开关的文字描述。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-switch v-model="switchValue2" active-color="#13ce66" inactive-color="#ff4949" :show-text="true" active-text="开" inactive-text="关"></b-switch>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>禁用状态</h4>
          <div class="text-muted">设置disabled属性，接受一个Boolean，设置true即可禁用。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-switch v-model="switchValue3" disabled></b-switch>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BSwitch from '@/components/switch/switch'
export default {
  components: {
    BSwitch
  },
  data() {
    return {
      switchValue1: true,
      switchValue2: true,
      switchValue3: true
    }
  }
}
</script>

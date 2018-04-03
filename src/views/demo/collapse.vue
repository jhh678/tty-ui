/*
 * @File: 折叠面板示例
 * @Author: jhh678
 * @Date: 2018-04-02 14:10:14
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-04-03 09:58:56
 */

<template>
  <div class="sub-page-wrap">
    <section class="panel panel-default">
      <div class="panel-heading"><h3>Collapse 折叠面板</h3><div class="text-muted">通过折叠面板收纳内容区域</div></div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>基础用法</h4>
          <button type="button" class="btn btn-default" @click="showCollapse1=!showCollapse1">点我展开折叠组件!</button>
          <b-collapse v-model="showCollapse1">
            <br/>
            <div class="well" style="margin-bottom: 0">Hi 我在这展开了哦</div>
          </b-collapse>
        </div>
        <div class="panel-item">
          <!--手风琴-->
          <h4>手风琴效果</h4>
          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading" role="button" @click="toggleAccordion(0)">
                <h4 class="panel-title">手风琴内容 #1</h4>
              </div>
              <b-collapse v-model="showAccordion[0]">
                <div class="panel-body">
                  <p>一大波内容来袭，winter is comming...</p>
                  <p>一大波内容来袭，winter is comming...</p>
                  <p>一大波内容来袭，winter is comming...</p>
                  <p>一大波内容来袭，winter is comming...</p>
                  <p>一大波内容来袭，winter is comming...</p>
                </div>
              </b-collapse>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" role="button" @click="toggleAccordion(1)">
                <h4 class="panel-title">手风琴内容 #2</h4>
              </div>
              <b-collapse v-model="showAccordion[1]">
                <div class="panel-body">
                  <p>又双他喵的，一大波内容来袭，winter is comming again</p>
                  <p>又双他喵的，一大波内容来袭，winter is comming again</p>
                  <p>又双他喵的，一大波内容来袭，winter is comming again</p>
                  <p>又双他喵的，一大波内容来袭，winter is comming again</p>
                  <p>又双他喵的，一大波内容来袭，winter is comming again</p>
                </div>
              </b-collapse>
            </div>
            <div class="panel panel-info">
              <div class="panel-heading" role="button" @click="toggleAccordion(2)">
                <h4 class="panel-title">手风琴内容 #3</h4>
              </div>
              <b-collapse v-model="showAccordion[2]">
                <div class="panel-body">
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                  <p>又双叒他喵的，一大波内容来袭，winter is comming again and again</p>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BCollapse from '@/components/collapse/collapse'

export default {
  components: {
    BCollapse
  },
  data() {
    return {
      showCollapse1: false,
      showAccordion: [true, false, false]
    }
  },
  methods: {
    toggleAccordion(index) {
      if (this.showAccordion[index]) {
        this.showAccordion[index] = false
      } else {
        for (let i = 0; i < this.showAccordion.length; i++) {
          this.showAccordion[i] = false
        }
        this.showAccordion[index] = true
      }
      this.showAccordion = this.showAccordion.map(v => v)
    }
  }
}
</script>

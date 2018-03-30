/*
 * @File: 时间选择器
 * @Author: jhh678
 * @Date: 2018-03-28 14:57:57
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 15:29:51
 */

<template>
  <div class="sub-page-wrap">
    <section class="panel panel-default">
      <div class="panel-heading">TimePicker 时间选择器</div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>固定时间点</h4>
          <div class="text-muted">提供几个固定的时间点供用户选择，使用 el-time-select 标签，分别通过star、end和step指定可选的起始时间、结束时间和步长</div>
          <div class="row">
            <div class="col-sm-24">
              <b-time-select v-model="datetimes.timeSelect" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间"></b-time-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>任意时间点</h4>
          <div class="text-muted">可以选择任意时间，使用 el-time-picker 标签，通过selectableRange限制可选时间范围</div>
          <div class="row">
            <div class="col-sm-24">
              <b-time-picker v-model="datetimes.time0" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点"></b-time-picker>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>固定时间范围</h4>
          <div class="text-muted">若先选择开始时间，则结束时间内备选项的状态会随之改变</div>
          <div class="row">
            <div class="col-sm-24">
              <b-time-select v-model="datetimes.startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="起始时间"></b-time-select>
              <b-time-select v-model="datetimes.endTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: datetimes.startTime}" placeholder="结束时间"></b-time-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>任意时间范围</h4>
          <div class="text-muted">可选择任意的时间范围，添加is-range属性即可选择时间范围</div>
          <div class="row">
            <div class="col-sm-24">
              <b-time-picker is-range v-model="datetimes.timeRange" placeholder="选择时间范围"></b-time-picker>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { BTimePicker, BTimeSelect } from '@/components/datetime-picker'

export default {
  components: {
    BTimePicker,
    BTimeSelect
  },
  data() {
    return {
      datetimes: {
        timeSelect: '',
        time0: '',
        startTime: '',
        endTime: '',
        timeRange: []
      }
    }
  }
}
</script>

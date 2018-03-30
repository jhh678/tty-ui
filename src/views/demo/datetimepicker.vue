/*
 * @File: 日期时间选择器示例
 * @Author: jhh678
 * @Date: 2018-03-28 14:57:57
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-30 16:15:24
 */

<template>
  <div class="sub-page-wrap">
    <section class="panel panel-default">
      <div class="panel-heading">DateTimePicker 日期时间选择器</div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>日期和时间点</h4>
          <div class="row">
            <div class="col-sm-6">
              <h5>默认</h5>
              <b-date-picker v-model="datetimes.datetime0" type="datetime" placeholder="选择日期时间"></b-date-picker>
            </div>
            <div class="col-sm-6">
              <h5>带快捷选项</h5>
              <b-date-picker v-model="datetimes.datetime1" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions.datetime1"></b-date-picker>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>日期和时间范围</h4>
          <div class="row">
            <div class="col-sm-6">
              <h5>默认</h5>
              <b-date-picker v-model="datetimes.datetimerange0" type="datetimerange" placeholder="选择时间范围"></b-date-picker>
            </div>
            <div class="col-sm-6">
              <h5>带快捷选项</h5>
              <b-date-picker v-model="datetimes.datetimerange1" type="datetimerange" align="right" placeholder="选择时间范围" :picker-options="pickerOptions.datetimerange1"></b-date-picker>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { BDatePicker } from '@/components/datetime-picker'

export default {
  components: {
    BDatePicker
  },
  data() {
    return {
      datetimes: {
        datetime0: '',
        datetime1: '',
        datetimerange0: '',
        datetimerange1: ''
      },
      pickerOptions: {
        datetime1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        datetimerange1: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    }
  }
}
</script>

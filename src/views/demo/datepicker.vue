/*
 * @File: 日期选择器示例
 * @Author: jhh678
 * @Date: 2018-03-28 14:57:57
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-30 16:15:12
 */

<template>
  <div class="sub-page-wrap">
    <section class="panel panel-default">
      <div class="panel-heading">DatePicker 日期选择器</div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>选择日</h4>
          <div class="text-muted">以「日」为基本单位，基础的日期选择控件</div>
          <div class="row">
            <div class="col-sm-4">
              <h5>默认</h5>
              <b-date-picker v-model="datetimes.date0" type="date" placeholder="选择日期"></b-date-picker>
            </div>
            <div class="col-sm-4">
              <h5>设置最小日期</h5>
              <b-date-picker v-model="datetimes.date1" type="date" placeholder="选择日期" :picker-options="pickerOptions.date1"></b-date-picker>
            </div>
            <div class="col-sm-4">
              <h5>带快捷选项</h5>
              <b-date-picker v-model="datetimes.date2" type="date" placeholder="选择日期" :picker-options="pickerOptions.date2"></b-date-picker>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>选择日期范围</h4>
          <div class="text-muted">可在一个选择器中便捷地选择一个时间范围</div>
          <div class="row">
            <div class="col-sm-4">
              <h5>默认</h5>
              <b-date-picker v-model="datetimes.daterange0" type="daterange" placeholder="选择日期范围"></b-date-picker>
            </div>
            <div class="col-sm-4">
              <h5>设置最小最大日期</h5>
              <b-date-picker v-model="datetimes.daterange1" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions.daterange1"></b-date-picker>
            </div>
            <div class="col-sm-4">
              <h5>带快捷选项</h5>
              <b-date-picker v-model="datetimes.daterange2" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions.daterange2"></b-date-picker>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>其他日期单位</h4>
          <div class="text-muted">通过扩展基础的日期选择，可以选择周、月、年</div>
          <div class="row">
            <div class="col-sm-4">
              <h5>周</h5>
              <b-date-picker v-model="datetimes.week" type="week" format="yyyy 第 WW 周" placeholder="选择周"></b-date-picker>
            </div>
            <div class="col-sm-4">
              <h5>月</h5>
              <b-date-picker v-model="datetimes.month" type="month" placeholder="选择月"></b-date-picker>
            </div>
            <div class="col-sm-4">
              <h5>年</h5>
              <b-date-picker v-model="datetimes.year" type="year" align="center" placeholder="选择年"></b-date-picker>
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
        date0: '',
        date1: '',
        date2: '',
        daterange0: '',
        daterange1: '',
        daterange2: '',
        week: '',
        month: '',
        year: ''
      },
      pickerOptions: {
        date1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        date2: {
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
        daterange1: {
          disabledDate(time) {
            let correctTime = time.getTime() + 8.64e7
            let startTime = Date.now()
            let endTime = Date.now() + 30 * 24 * 60 * 60 * 1000
            return correctTime < startTime || correctTime > endTime
          }
        },
        daterange2: {
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

/*
 * @File: 分页示例
 * @Author: jhh678
 * @Date: 2018-03-28 16:17:53
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 17:07:45
 */

<template>
  <div class="sub-page-wrap">
    <div class="form-demo-header">
      <h3>Pagination 分页</h3>
      <div class="text-muted">当数据量过多时，使用分页分解数据。</div>
    </div>
    <section class="panel panel-default">
      <div class="panel-heading">基础用法</div>
      <div class="panel-body">
        <b-pagination :total-page="50" :max-size="6" :total="200" :page-sizes="pageSizes" v-model="currentPage" @change="changePage" @changeMaxSize="changeMaxSizefn"></b-pagination>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>尺寸</h4>
        <div class="text-muted">可通过<code>size</code>属性指定输入框的尺寸，除了默认的大小外，还提供了lg和sm两种尺寸。</div>
      </div>
      <div class="panel-body">
        <b-pagination :total-page="50" :max-size="6" :total="200" :page-sizes="pageSizes" v-model="currentPageLg" size="lg" @change="changePage" @changeMaxSize="changeMaxSizefn"></b-pagination>
        <b-pagination :total-page="50" :max-size="6" :total="200" :page-sizes="pageSizes" v-model="currentPageSm" size="sm" @change="changePage" @changeMaxSize="changeMaxSizefn"></b-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import BPagination from '@/components/pagination/pagination'

export default {
  components: {
    BPagination
  },
  data() {
    return {
      currentPageSm: 1,
      currentPage: 1,
      currentPageLg: 1,
      pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200]
    }
  },
  methods: {
    changePage(e) {
      console.log(e)
    },
    changeMaxSizefn(size) {
      console.log(size)
    }
  }
}
</script>

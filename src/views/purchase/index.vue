<template>
  <div class="">
  	采购模块页面
  	<input type="text" name="" id="" value="" />
  	<button type="button" class="btn btn-primary" @click="showPanel">测试</button>
  	<div class="panel" v-show="show">
  		显示面板
  	</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    updated() {
      console.log('up')
    },
    methods: {
      showPanel() {
        this.show = !this.show
      }
    }
  }
</script>

<style>
</style>
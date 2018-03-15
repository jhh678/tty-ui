<template>
  <div class="tab-page">
    <div class="tabs-nav-wrap">
      <ul>
        <li v-for="(item, index) of tabs" :key="item.path" class="hover-layer" :class="{'active':activeIndex===index, 'home': !index}" @click="switchTab(item.path)">
          <a href="javascript:void(0);"><span class="tab-name">{{item.name}}</span><i class="iconfont icon-close hover-layer" @click.stop="$closeTabPage(item.path)" v-show="index"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tabs() {
      return this.$store.state.openedTabs
    },
    activeIndex() {
      return this.$store.state.currentTabIndex
    }
  },
  methods: {
    switchTab(path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-page {
  margin: 0;
  padding: 0;
  background: #fff;
  overflow: hidden;
  .tabs-nav-wrap {
    position: relative;
    z-index: 1;
    width: 99999px !important;
    height: 36px;
    ul {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      zoom: 1;
      height: 36px;
      overflow: hidden;
      margin: 0;
      padding: 0;
      li {
        display: inline-block;
        height: 36px;
        line-height: 36px;
        padding: 0 5px 0 10px;
        list-style: none;
        font-size: 14px;
        color: #666;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-bottom-width: 0;
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        &.home {
          padding-right: 10px;
        }
        &:not(:last-child) {
          margin-right: 6px;
        }
        &.active {
          background-color: #00a53c;
          border-color: #00a53c;
          a {
            color: #fff;
            font-weight: bold;
          }
        }
        a {
          display: block;
          height: 100%;
          color: #666;
          text-decoration: none;
          .tab-name {
            float: left;
            width: 4em;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .iconfont {
            float: left;
            width: 24px;
            height: 24px;
            line-height: 24px;
            margin: 6px 0 0 5px;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
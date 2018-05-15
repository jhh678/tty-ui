<template>
  <div id="app" class="page" v-cloak>
    <div class="master" v-if="$route.meta.hasMaster === true">
      <div class="page-sidebar">
        <div class="logo-wrap">
          <img src="./assets/images/logo.png" alt="logo">
        </div>
        <ul>
          <li v-for="(item, index) of menuList" :key="index" :class="{'active': $route.path.indexOf(item.link) !== -1}">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.name}}</span>
            <i class="iconfont icon-zhankai"></i>

            <div class="sub-menu">
              <div class="group" v-for="(sub, index) of item.sub" :key="index">
                <div class="group-name">{{sub.groupName}}</div>
                <ul>
                  <li v-for="(page, index) of sub.pages" :key="index">
                    <router-link :to="page.link" class="hover-layer">{{page.name}}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="page-content">
        <div class="header" ref="header">
          <div class="header-bar">
            <span class="company-name">XXX有限公司</span>
            <div class="account-nav pull-right clearfix">
              <ul class="clearfix">
                <li role="button" class="hover-layer">
                  <i class="iconfont icon-yujing"></i>
                </li>
                <li role="button" class="hover-layer">
                  <i class="iconfont icon-xiaoxi"></i>
                  <span class="badge-count">99+</span>
                </li>
                <li role="button" class="hover-layer">
                  <i class="iconfont icon-bangzhu"></i>
                </li>
              </ul>
              <b-dropdown :menu-right="true">
                <div role="button" data-role="trigger" class="dropdown-toggle hover-layer">
                  <span>{{userInfo.phone}}</span>
                  <i class="iconfont icon-zhankai"></i>
                </div>
                <template slot="dropdown">
                  <li>
                    <a role="button">修改密码</a>
                  </li>
                  <li>
                    <a role="button" @click="logout">退出</a>
                  </li>
                </template>
              </b-dropdown>
            </div>
          </div>

          <b-tab-page></b-tab-page>
        </div>
        <div class="container-fluid">
          <div class="sub-page" ref="subPage">
            <div class="panel panel-default" ref="subPageContent">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="$route.meta.hasMaster === false">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </template>
  </div>
</template>

<script>
  import {
    sessionStore
  } from '@/utils'
  import {
    menuList
  } from '@/config'
  import BDropdown from '@/components/dropdown/dropdown'
  import BTabPage from '@/components/tab-page/tab-page'
  import debounce from 'throttle-debounce/debounce'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'App',
    components: {
      BDropdown,
      BTabPage
    },
    data() {
      return {
        menuList: menuList
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo
    }),
    updated() {
      let _this = this
      this.initSubPageHeight()
      window.onresize = function () {
        _this.initSubPageHeight()
      }
      debounce(300, this.initSubPageHeight)
      // let userInfo = sessionStore.get('userInfo')
      // if (userInfo && userInfo.phone) {
      //   this.$store.dispatch('updateUserInfo', userInfo)
      // }
    },
    methods: {
      initSubPageHeight() {
        let bodyStyle = document.body.style
        if (this.$route.meta.hasMaster) {
          let scrollHeight = document.documentElement.clientWidth < 1260 ? 20 : 1
          let subPageMinHeight = document.documentElement.clientHeight - this.$refs.header.clientHeight - scrollHeight
          this.$refs.subPage.style.height = subPageMinHeight + 'px'
          bodyStyle.overflowY = 'hidden'
        } else {
          bodyStyle.overflowY = 'auto'
        }
      },
      logout() {
        sessionStore.clear()
        this.$router.push({
          path: '/login'
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .page-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 160px;
    display: block;
    background: #414146;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
    .logo-wrap {
      position: relative;
      width: 100%;
      height: 48px;
      background: #00a53c;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
      }
    }
    &>ul {
      position: relative;
      z-index: 10;
      padding: 0;
      list-style: none;
      li {
        position: relative;
        padding: 0 15px;
        height: 48px;
        line-height: 48px;
        color: #ccc;
        &.active {
          &:after {
            content: "";
            display: table;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 10;
            width: 4px;
            height: 48px;
            background: #f5f5f5;
          }
          .icon-zhankai {
            transform: rotate(-90deg);
          }
        }
        &:hover {
          background: #323237;
          color: #fff;
          span {
            font-weight: bold;
          }
          .icon-zhankai {
            transform: rotate(-90deg);
          }
          .sub-menu {
            display: table;
            display: flex;
          }
        }
        .iconfont {
          font-size: 16px;
        }
        span {
          padding: 0 6px;
          font-size: 14px;
        }
        .icon-zhankai {
          float: right;
          transition: 0.3s ease-in-out;
        }
        .sub-menu {
          display: none;
          position: absolute;
          top: 0;
          left: 100%;
          z-index: 10;
          padding: 10px 0;
          border-radius: 4px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
          background: #fff;
          white-space: nowrap;
          .group {
            display: table-cell;
            position: relative;
            &:not(:first-child) {
              &:before {
                content: "";
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                z-index: 100;
                width: 1px;
                height: 100%;
                padding: 10px 0;
                background: #ddd;
                background-clip: content-box;
              }
            }
            .group-name {
              position: relative;
              height: 30px;
              line-height: 30px;
              padding: 0 20px;
              font-size: 14px;
              font-weight: bold;
              color: #666;

              &:before {
                content: "";
                display: block;
                position: absolute;
                left: 10px;
                top: 8px;
                width: 3px;
                height: 14px;
                background: #999;
              }
            }
            ul {
              margin: 0;
              padding: 0;
              list-style: none;
              li {
                height: 30px;
                line-height: 30px;
                margin: 0;
                padding: 0;
                &:hover {
                  background: transparent;
                }
                a {
                  display: block;
                  padding: 0 30px 0 20px;
                  font-size: 14px;
                  color: #333;
                }
              }
            }
          }
        }
      }
    }
  }

  .page-content {
    display: block;
    margin-left: 160px;
    .header {
      height: 85px;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      background: #fff;
      .header-bar {
        height: 48px;
        line-height: 48px;
      }
    }
  }

  .header-bar {
    .company-name {
      font-size: 15px;
      color: #333;
      font-weight: bold;
    }
  }

  .account-nav {
    display: inline-block;
    height: 48px;
    &>ul {
      float: left;
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        position: relative;
        float: left;
        height: 48px;
        padding: 0 10px;
        i.iconfont {
          font-size: 20px;
          color: #666;
        }
        .badge-count {
          position: absolute;
          top: 6px;
          left: 20px;
          min-width: 16px;
          height: 16px;
          line-height: 14px;
          padding: 0 4px;
          border-radius: 8px;
          background: #f00;
          color: #fff;
          text-align: center;
          font-size: 12px;
          white-space: nowrap;
        }
      }
    }
    .dropdown {
      float: left;
      height: 48px;
      padding-left: 21px;
      &:before {
        content: "";
        position: absolute;
        top: 11px;
        left: 0;
        display: block;
        margin: auto 10px;
        border-left: 1px solid #ddd;
        width: 1px;
        height: 24px;
      }
      .dropdown-toggle {
        padding: 0 15px;
      }
    }
  }

  .container-fluid {
    overflow: auto;
    padding: 0;
    .sub-page {
      min-width: 1100px;
      margin: 0;
      padding: 10px;
      .panel {
        margin: 0;
        min-height: 100%;
        margin-bottom: 10px;
        background-clip: border-box;
      }
    }
  }

</style>

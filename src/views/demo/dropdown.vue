/*
 * @File: 下拉菜单示例
 * @Author: jhh678
 * @Date: 2018-03-30 16:13:53
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-30 16:14:15
 */

<template>
  <div class="sub-page-wrap">
    <h3>Dropdown 下拉菜单</h3>
    <p>将动作或菜单折叠到下拉菜单中。</p>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">基础用法</h4>
        <p>点击下拉菜单，展开更多操作。</p>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-2">
            <!--下拉菜单1-->
            <b-dropdown ref="dropdown" :dropup="dropup" :menu-right="menuRight">
              <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
                <span>下拉菜单1</span>
                <span class="caret"></span>
              </button>
              <template slot="dropdown">
                <li>
                  <a role="button">子项目1</a>
                </li>
                <li>
                  <a role="button">子项目2</a>
                </li>
                <li>
                  <a role="button">子项目3</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a role="button">子项目4特殊</a>
                </li>
              </template>
            </b-dropdown>
          </div>
          <div class="col-sm-2">
            <!--下拉菜单2-->
            <b-dropdown v-model="open2" :dropup="dropup" :menu-right="menuRight">
              <button @click="open2 = !open2" class="btn btn-primary dropdown-toggle" type="button">
                <span>下拉菜单2</span>
                <span class="caret"></span>
              </button>
              <template slot="dropdown">
                <li>
                  <a role="button">子项目1</a>
                </li>
                <li>
                  <a role="button">子项目2</a>
                </li>
                <li>
                  <a role="button">子项目3</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a role="button">子项目4特殊</a>
                </li>
              </template>
            </b-dropdown>
          </div>
          <div class="col-sm-3">
            <!--下拉菜单3-->
            <b-dropdown class="btn-group" v-model="open3" :dropup="dropup" :menu-right="menuRight">
              <button type="button" class="btn btn-danger">下拉菜单3</button>
              <button type="button" class="btn btn-danger dropdown-toggle" @click="open3 = !open3">
                <span class="caret"></span>
                <span class="sr-only"></span>
              </button>
              <template slot="dropdown">
                <li>
                  <a role="button">子项目1</a>
                </li>
                <li>
                  <a role="button">子项目2</a>
                </li>
                <li>
                  <a role="button">子项目3</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a role="button">子项目4特殊</a>
                </li>
              </template>
            </b-dropdown>
          </div>
          <div class="col-sm-5">
            <!--下拉菜单4-->
            <b-dropdown :append-to-body="true" v-model="open4" :dropup="dropup" :menu-right="menuRight">
              <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
                <span>把下拉菜单添加到 body 标签里面</span>
                <span class="caret"></span>
              </button>
              <template slot="dropdown">
                <li>
                  <a role="button">子项目1</a>
                </li>
                <li>
                  <a role="button">子项目2</a>
                </li>
                <li>
                  <a role="button">子项目3</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a role="button">子项目4特殊</a>
                </li>
              </template>
            </b-dropdown>
          </div>
          <!--下拉菜单4-->
          <div style="padding: 30px; clear: both">
            <b-dropdown class="btn-group" v-model="open5" :dropup="dropup" :menu-right="menuRight">
              <button type="button" class="btn btn-default" style="width: 300px">下拉菜单3</button>
              <button type="button" class="btn btn-default dropdown-toggle" @click="open5 = !open5">
                <span class="caret"></span>
                <span class="sr-only"></span>
              </button>
              <template slot="dropdown">
                <li>
                  <a role="button">子项目1</a>
                </li>
                <li>
                  <a role="button">子项目2</a>
                </li>
                <li>
                  <a role="button">子项目3</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a role="button">子项目4特殊</a>
                </li>
              </template>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BDropdown from '@/components/dropdown/dropdown'

export default {
  name: 'DropdownDemo',
  components: {
    BDropdown
  },
  data() {
    return {
      dropup: false,
      menuRight: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false
    }
  },
  methods: {

  }
}
</script>

<style>

</style>

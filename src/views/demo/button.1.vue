/** * @file * @author jhh678 * @date 2017/7/10 */
<template>
  <div class="sub-page-wrap">
    <h3>组件demo页面</h3>
    <section class="panel panel-default">
      <div class="panel-heading">生成二维码</div>
      <div class="panel-body">
        <b-input v-model="qrcodeText" placeholder="请输入二维码内容">
          <div slot="append" @click="createQRcode">生成二维码</div>
        </b-input>
        <div class="qrcode-img" ref="qrcodeImg">

        </div>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">模态框</div>
      <div class="panel-body">
        <button type="button" class="btn btn-default" @click="open=!open">Modal demo</button>
        <b-modal v-model="open" title="demo modal">
          <p>This is a simple modal.</p>
        </b-modal>
      </div>
    </section>
    <!--下拉菜单组件-->
    <section class="panel panel-default">
      <div class="panel-heading">下拉菜单
        <a target="_blank" href="https://uiv.wxsm.space/dropdown/">文档</a>
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
    </section>
    <!--分页组件-->
    <section class="panel panel-default">
      <div class="panel-heading">分页组件
        <a target="_blank" href="https://uiv.wxsm.space/pagination/">文档</a>
      </div>
      <div class="panel-body">
        <b-pagination :total-page="50" :max-size="6" :total="200" :page-sizes="pageSizes" v-model="currentPage" @change="changePage" @changeMaxSize="changeMaxSizefn"></b-pagination>
      </div>
    </section>
    <!--折叠组件-->
    <section class="panel panel-default">
      <div class="panel-heading">折叠组件
        <a target="_blank" href="https://uiv.wxsm.space/collapse">文档</a>
      </div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>默认</h4>
          <button type="button" class="btn btn-default" @click="showCollapse1=!showCollapse1">点我展开折叠组件!</button>
          <b-collapse v-model="showCollapse1">
            <br/>
            <div class="well" style="margin-bottom: 0">Hi 我在这展开了哦</div>
          </b-collapse>
        </div>

        <div class="panel-item">
          <!--手风琴-->
          <h4>手风琴</h4>
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
                <h4 class="panel-title">C手风琴内容 #2</h4>
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
    <!--弹出层-->
    <section class="panel panel-default">
      <div class="panel-heading">弹出层文档
        <a target="_blank" href="https://uiv.wxsm.space/popover">文档</a>
      </div>
      <div class="panel-body">
        <b-popover :title="title" :placement="placement" :auto-placement="autoPlacement" :trigger="trigger" :enable="enable" v-model="poverOpen1" ref="popover">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层上</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
        <b-popover :title="title" :placement="'bottom'" :auto-placement="autoPlacement" :trigger="trigger" :enable="enable" v-model="poverOpen2" ref="popover">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层下</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
        <b-popover :title="title" :placement="'left'" :auto-placement="autoPlacement" :trigger="trigger" :enable="enable" v-model="poverOpen3" ref="popover">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层左</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
        <b-popover :title="title" :placement="'right'" :auto-placement="autoPlacement" :trigger="trigger" :enable="enable" v-model="poverOpen4" ref="popover">
          <button type="button" class="btn btn-default" data-role="trigger">弹出层左</button>
          <div slot="popover">
            <h1>Hello world!</h1>
          </div>
        </b-popover>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">自动补全
        <a target="_blank" href="https://uiv.wxsm.space/popover">文档</a>
      </div>
      <div class="panel-body">
        <div class="panel-item">
          <!--基本-->
          <b-typeahead ref="typeahead1" v-model="model1" :data="states" :item-key="itemKey" :limit="10" :append-to-body="false" :ignore-case="ignoreCase" :match-start="matchStart" :force-select="forceSelect" :open-on-focus="openOnFocus"></b-typeahead>
          <button class="btn btn-primary" type="button" @click="model1 = states[0]">设置 model 为 Alabama</button>
          <button class="btn btn-default" type="button" @click="model1 = null">重置</button>
        </div>
      </div>
      <div class="panel-item">
        <!--异步获取数据-->
        <h4>Github Users</h4>
        <b-typeahead ref="typeahead2" v-model="model2" :asyncObj="asyncData" async-key="items" item-key="login" :ignore-case="ignoreCase" :match-start="matchStart" :force-select="forceSelect">
          <template slot="item" slot-scope="props">
            <li v-for="(item, index) in props.items" :key="index" :class="{active:props.activeIndex===index}">
              <a href="javascript:void(0)" @click="props.select(item)">
                <img width="22px" height="22px" :src="item.avatar_url + '&s=40'">
                <span v-html="props.highlight(item)"></span>
              </a>
            </li>
          </template>
        </b-typeahead>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">警告框</div>
      <div class="panel-body">
        <!--警告-->
        <button type="button" class="btn btn-default" @click="show=!show">组件使用方式</button>
        <b-alert type="warning" :closable="true" :show="show">组件使用方式,警告框</b-alert>

        <button type="button" class="btn btn-default" @click="showAlert">直接使用方式(推荐)</button>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">标签页Tabs</div>
      <div class="panel-body">
        <!--标签-->
        <div>
          <b-tab-page :tabs="tabs" :active-index="0">
            <!--<div slot="right">我是右边</div>-->
          </b-tab-page>
        </div>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">工具提示Tootip</div>
      <div class="panel-body">
        <!--提示工具-->
        <b-tooltip :text="tooltipText" :placement="placement" :auto-placement="autoPlacement" :trigger="trigger" :enable="enable" ref="tooltip" v-model="open1">
          <button type="button" class="btn btn-default">tooltip</button>
        </b-tooltip>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">轮播</div>
      <div class="panel-body">
        <!--轮播-->
        <b-swiper v-model="index" :indicators="true" :controls="true" :interval="2000">
          <b-slide v-for="(slide,index) in slides" :key="index">
            <div style="width: 100%;height: 600px;" :style="{background:index%2===0?'#99a9bf':'#d3dce6'}"></div>
            <div class="carousel-caption">
              <h3>This is {{slide.title}}</h3>
            </div>
          </b-slide>
        </b-swiper>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">Tree 树形控件</div>
      <div class="panel-body">
        <router-link to="/demo/tree">Tree 树形控件</router-link>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">Switch 开关<div class="text-muted">表示两种相互对立的状态间的切换，多用于触发「开/关」。</div></div>
      <div class="panel-body">
        <!-- <b-switch v-model="value1"></b-switch> -->
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

    <section class="panel panel-default">
      <div class="panel-heading">checkbox多选组件</div>
      <div class="panel-body">
        <b-check-select :selected="selectedArea" :data="data" :disabled="disabled" @checkData="changePlan"></b-check-select>
      </div>
    </section>

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

    <section class="panel panel-default">
      <div class="panel-heading">Select选择器</div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>基础用法</h4>
          <div class="text-muted">适用广泛的基础单选</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>禁用状态</h4>
          <div class="text-muted">选择器不可用状态</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" disabled placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>可清空单选</h4>
          <div class="text-muted">包含清空按钮，可将选择器清空为初始状态</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" clearable placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>基础多选</h4>
          <div class="text-muted">适用性较广的基础多选，用 Tag 展示已选项</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectMulValue" multiple placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>可搜索</h4>
          <div class="text-muted">可以利用搜索功能快速查找选项</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" filterable placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>远程搜索</h4>
          <div class="text-muted">从服务器搜索数据，输入关键字进行查找</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="remoteSelectValue" filterable remote placeholder="请选择" :remote-method="remoteMethod" :loading="selectLoading">
                <b-option v-for="item in remoteOptions" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>支持自定义底部操作</h4>
          <div class="text-muted">支持自定义底部操作，比如添加操作，自定义slot(name=footer)</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="selectValue" filterable allow-create :create-method="createNewOption" placeholder="请选择">
                <b-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></b-option>
              </b-select>
            </div>
          </div>
        </div>
        <div class="panel-item">
          <h4>下拉树</h4>
          <div class="text-muted">从服务器搜索数据，输入关键字进行查找</div>
          <div class="row">
            <div class="col-sm-24">
              <b-select v-model="treeSelectValue" filterable placeholder="请选择">
                <b-option-tree :tree-data="treeData" :tree-props="treeProps" node-key="id"></b-option-tree>
              </b-select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--表格组件-->
    <section class="panel panel-default">
      <div class="panel-heading">表格组件</div>
      <div class="panel-body">
        <router-link to="/demo/table">表格组件</router-link>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">Radio单选框</div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>基础用法</h4>
          <div class="text-muted">由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-radio class="radio" v-model="radio1" label="1">备选项</b-radio>
              <b-radio class="radio" v-model="radio1" label="2">备选项</b-radio>
            </div>
          </div>
          <h4>禁用状态</h4>
          <div class="text-muted">单选框不可用的状态。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-radio disabled v-model="radio2" label="禁用">备选项</b-radio>
              <b-radio disabled v-model="radio2" label="选中且禁用">备选项</b-radio>
            </div>
          </div>
          <h4>单选框组</h4>
          <div class="text-muted">适用于在多个互斥的选项中选择的场景</div>
          <div class="row">
            <div class="col-sm-24">
              <b-radio-group v-model="radio3">
                <b-radio :label="3">备选项</b-radio>
                <b-radio :label="6">备选项</b-radio>
                <b-radio :label="9">备选项</b-radio>
              </b-radio-group>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">Checkbox多选框</div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>基础用法</h4>
          <div class="text-muted">单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-checkbox v-model="checkbox1">备选项</b-checkbox>
            </div>
          </div>
          <h4>禁用状态</h4>
          <div class="text-muted">多选框不可用状态。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-checkbox v-model="checkbox2" disabled>备选项1</b-checkbox>
              <b-checkbox v-model="checkbox3" disabled>备选项2</b-checkbox>
            </div>
          </div>
          <h4>多选框组</h4>
          <div class="text-muted">适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-checkbox-group v-model="checkboxList">
                <b-checkbox label="复选框 A"></b-checkbox>
                <b-checkbox label="复选框 B"></b-checkbox>
                <b-checkbox label="复选框 C"></b-checkbox>
                <b-checkbox label="禁用" disabled></b-checkbox>
                <b-checkbox label="选中且禁用" disabled></b-checkbox>
              </b-checkbox-group>
            </div>
          </div>
          <h4>indeterminate 状态</h4>
          <div class="text-muted">indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果</div>
          <div class="row">
            <div class="col-sm-24">
              <b-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</b-checkbox>
              <div style="margin: 15px 0;"></div>
              <b-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <b-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</b-checkbox>
              </b-checkbox-group>
            </div>
          </div>
          <h4>可选项目数量的限制</h4>
          <div class="text-muted">使用 min 和 max 属性能够限制可以被勾选的项目的数量。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-checkbox-group v-model="checkedCities1" :min="1" :max="2">
                <b-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</b-checkbox>
              </b-checkbox-group>
            </div>
          </div>
          <h4>按钮样式（用于角色选择）</h4>
          <div class="text-muted">使用 min 和 max 属性能够限制可以被勾选的项目的数量。</div>
          <div class="row">
            <div class="col-sm-24">
              <b-checkbox-group v-model="checkedRoles" type="button" tips="至少选择一种角色">
                <b-checkbox v-for="role in roles" :label="role.label" :key="role.value">{{role.label}}</b-checkbox>
              </b-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { localStore } from '@/utils'
import QRCode from '@/utils/qrcode'
import BInput from '@/components/input'
import BModal from '@/components/modal/modal'
import BAlert from '@/components/alert/alert'
import Alert from '@/components/alert'
import BSlide from '@/components/swiper/slide'
import BSwiper from '@/components/swiper/swiper'
import BTabPage from '@/components/tab-page/tab-page'
import BTooltip from '@/components/tooltip/tooltip'
import BDropdown from '@/components/dropdown/dropdown'
import BPagination from '@/components/pagination/pagination'
import BCollapse from '@/components/collapse/collapse'
import BPopover from '@/components/popover/popover'
import BTypeahead from '@/components/typeahead/typeahead'
import { BSelect, BOption, BOptionGroup, BOptionTree } from '@/components/select'
import states from './data/states.json'
import BSwitch from '@/components/switch/switch'
import BCheckSelect from '@/components/check-select/check-select'
import { BDatePicker, BTimePicker, BTimeSelect } from '@/components/datetime-picker'
import tableData from './data/tabledata'
import { BRadio, BRadioGroup } from '@/components/radio'
import { BCheckbox, BCheckboxGroup } from '@/components/checkbox'
const columns = [{
  title: '商品编号',
  key: 'number',
  width: 150,
  textAlign: 'center'
},
{
  title: '商品名称',
  key: 'name',
  width: 250,
  textAlign: 'left',
  textLine: 2,
  selectText: true
},
{
  title: '商品类别',
  key: 'type',
  width: 150,
  textAlign: 'right'
},
{
  title: '品牌',
  key: 'brand',
  width: 150,
  textAlign: 'center'
},
{
  title: '规格',
  key: 'brand',
  width: 150,
  textAlign: 'left'
},
{
  title: '零售价',
  key: 'brand',
  width: 150,
  textAlign: 'left'
},
{
  title: '基本单位',
  key: 'brand',
  width: 150,
  textAlign: 'left'
},
{
  title: '测试测试',
  key: 'brand',
  width: 150,
  textAlign: 'left'
}
]
const cityOptions = ['上海', '北京', '广州', '深圳']
let optionIndex = 6
export default {
  name: 'Demo',
  components: {
    BInput,
    BModal,
    BAlert,
    BSlide,
    BSwiper,
    BTooltip,
    BDropdown,
    BPagination,
    BCollapse,
    BPopover,
    BTypeahead,
    BSelect,
    BOption,
    BOptionGroup,
    BOptionTree,
    BTabPage,
    BSwitch,
    BDatePicker,
    BTimePicker,
    BTimeSelect,
    BCheckSelect,
    BRadio,
    BRadioGroup,
    BCheckbox,
    BCheckboxGroup
  },
  data() {
    return {
      qrcode: null,
      selectedArea: [],
      disabled: false,
      data: {
        1: '小麦',
        2: '西瓜',
        3: '山药',
        4: '玉米',
        5: '葡萄',
        6: '水稻',
        7: '防风',
        8: '防1',
        9: '防2',
        10: '防3',
        11: '小麦',
        12: '西瓜',
        13: '山药',
        14: '玉米',
        15: '葡萄',
        16: '水稻',
        17: '防风',
        18: '防1',
        19: '防2',
        20: '防3'
      },
      liveList: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      allLoaded: false,
      userInfo: {},
      slides: [{
        title: 'Slide 1'
      },
      {
        title: 'Slide 2'
      },
      {
        title: 'Slide 3'
      },
      {
        title: 'Slide 4'
      }
      ],
      index: 0,
      qrcodeText: '',
      open: false,
      show: false,
      tabs: [{
        title: '首页',
        link: ''
      },
      {
        title: '商品管理',
        link: ''
      },
      {
        title: '新增商品',
        link: ''
      }
      ],
      //      下拉菜单
      dropup: false,
      menuRight: false,
      switchValue1: true,
      switchValue2: true,
      switchValue3: true,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      tooltipText: '这个是提示的内容',
      // 分页
      currentPageSm: 1,
      currentPage: 1,
      currentPageLg: 1,
      // 折叠组件
      showCollapse1: false,
      showAccordion: [true, false, false],
      // 弹出层
      enable: true,
      title: 'Popover Title',
      trigger: 'outside-click',
      placement: 'top',
      autoPlacement: true,
      poverOpen1: false,
      poverOpen2: false,
      poverOpen3: false,
      poverOpen4: false,
      model1: '',
      model2: '',
      model3: '',
      itemKey: 'name',
      states: states.data,
      forceSelect: false,
      ignoreCase: true,
      matchStart: true,
      openOnFocus: true,
      asyncData: {
        url: 'https://api.github.com/search/users?q=',
        methods: 'get',
        prams: {}
      },
      //
      Treelist: [],
      datetimes: {
        date0: '',
        date1: '',
        date2: '',
        daterange0: '',
        daterange1: '',
        daterange2: '',
        datetime1: '',
        datetimerange1: '',
        week: '',
        month: '',
        year: '',
        timeSelect: '',
        time0: '',
        startTime: '',
        endTime: '',
        timeRange: []
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
        },
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
      },
      tableData: tableData,
      tableColumns: columns,
      radio1: '1',
      radio2: '选中且禁用',
      radio3: 3,
      checkbox1: true,
      checkbox2: false,
      checkbox3: true,
      checkboxList: ['选中且禁用', '复选框 A'],
      checkAll: true,
      checkedCities: ['上海', '北京'],
      checkedCities1: ['广州', '深圳'],
      cities: cityOptions,
      roles: [
        { value: 1, label: '系统管理员' },
        { value: 2, label: '采购主管' },
        { value: 3, label: '采购专员' },
        { value: 4, label: '店长' },
        { value: 5, label: '销售经理' },
        { value: 6, label: '销售' },
        { value: 7, label: '财务经理' },
        { value: 8, label: '会计' }
      ],
      checkedRoles: [],
      isIndeterminate: true,
      pageConfig: {
        totalPage: 50,
        maxSize: 5
      },
      selectValue: '',
      remoteSelectValue: '',
      selectMulValue: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      remoteOptions: [],
      selectStates: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming'],
      selectList: [],
      selectLoading: false,
      treeSelectValue: '9',
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      treeProps: {
        children: 'children',
        label: 'label'
      },
      pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200]
    }
  },
  created() {
    this.userInfo = localStore.get('userInfo')
    this.selectList = this.selectStates.map(item => {
      return { value: item, label: item }
    })
    this.remoteOptions = this.selectList.slice()
  },
  methods: {
    createQRcode() {
      if (this.qrcodeText) {
        if (!this.qrcode) {
          this.qrcode = new QRCode(this.$refs.qrcodeImg, {
            text: this.qrcodeText,
            width: 128,
            height: 128,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
        } else {
          this.qrcode.makeCode(this.qrcodeText)
        }
      } else {
        this.$message({
          message: '请先输入内容',
          type: 'warning'
        })
      }
    },
    loadTop() {
      location.reload()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom() {
      let length = this.liveList.length
      if (length < 50) {
        let _this = this
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            _this.liveList.push(length + i + 1)
          }
          _this.$refs.loadmore.onBottomLoaded()
        }, 2000)
      } else {
        this.allLoaded = true // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded()
      }
    },
    changePage(e) {
      console.log(e)
    },
    changeMaxSizefn(size) {
      console.log(size)
    },
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
    },
    showAlert() {
      Alert({
        type: 'success',
        message: '恭喜你，打开一个提示框',
        duration: 3000,
        closable: true
      })
    },
    input(e) {
      console.log(e)
    },
    createNewOption() {
      let index = optionIndex++
      const newOption = {
        value: '选项' + index,
        label: '黄焖鸡米饭' + index
      }
      this.options.push(newOption)
    },
    treeSelect(e) {
      console.log(e)
    },
    changePlan(value) {
      this.selectedArea = value
    },
    tableSelectItem(item) {
      console.log(item)
    },
    toDownSelectItem(item) {
      console.log(item)
    },
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    roleSelectfn(item) {
      console.log(item)
    },
    remoteMethod(query) {
      if (query) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.remoteOptions = this.selectList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.remoteOptions = this.selectList.slice()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-item {
  padding-bottom: 15px;
}
.qrcode-img {
  height: 130px;
  text-align: center;
}
</style>

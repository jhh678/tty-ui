/*
 * @Author: jhh678
 * @Date: 2017-11-08 18:56:29
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-04-26 15:31:08
 */
var path = require('path')
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import auth from '@/service/auth'

/* 登录 */
const Login = () =>
  import ('@/views/login')

/* 首页 */
const Home = () =>
  import ('@/views/home')

/* Error404 */
const Error404 = () =>
  import ('@/views/error-404')

/* 采购 */
const Purchase = () =>
  import (/* webpackChunkName: "purchase" */ '@/views/purchase/index')

/* 销售 */
const Sales = () =>
  import (/* webpackChunkName: "sales" */ '@/views/sales/index')

/* 仓储 */
const Storage = () =>
  import (/* webpackChunkName: "storage" */ '@/views/storage/index')

/* 会员营销 */
const MemberMarket = () =>
  import (/* webpackChunkName: "member-market" */ '@/views/member-marketing/index')

/* 财务管理 */
const FinanceManage = () =>
  import (/* webpackChunkName: "finance-manage" */ '@/views/finance-manage/index')

/* 统计分析 */
const StatisticalAnalysis = () =>
  import (/* webpackChunkName: "statistical-analysis" */ '@/views/statistical-analysis/index')

/* 基础资料 */
// const BasicData = () => import(/* webpackChunkName: "basic-data" */ '@/views/basic-data/index')
// const RoleAuth = () =>
//   import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/role-auth') // 角色权限
const SysUser = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/sys-user') // 系统用户
const OrgChart = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/org-chart') // 组织架构
const BankAccount = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/bank-account') // 银行账户
const EmployeeMgr = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/employee-mgr') // 职员管理
const SupplierMgr = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/supplier-mgr') // 供货商管理
const GoodsMgr = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/goods-mgr') // 商品管理
const GoodsAdd = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/goods-mgr/add') // 商品添加
const GoodsEdit = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/goods-mgr/edit') // 商品编辑
const WarehouseMgr = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/warehouse-mgr') // 仓库编辑

/* demo index */
const IndexDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/index')

/* demo layout */
const LayoutDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/layout')

/* demo button */
const ButtonDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/button')

// demo input
const InputDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/input')

// demo radio
const RadioDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/radio')

// demo checkbox
const CheckboxDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/checkbox')

// demo select
const SelectDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/select')

// demo switch
const SwitchDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/switch')

// demo datepicker
const DatepickerDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/datepicker')

// demo timepicker
const TimepickerDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/timepicker')

// demo datetimepicker
const DatetimepickerDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/datetimepicker')

// demo form
const FormDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/form')

// demo table
const TableDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/table')

// demo tag
const TagDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/tag')

// demo tree
const TreeDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/tree')

// demo pagination
const PaginationDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/pagination')

// demo alert
const AlertDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/alert')

// demo message
const MessageDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/message')

// demo messagebox
const MessageBoxDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/message-box')

// demo loading
const LoadingDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/loading')

// demo dropdown
const DropdownDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/dropdown')

// demo modal
const ModalDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/modal')

// demo tooltip
const TooltipDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/tooltip')

// demo popover
const PopoverDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/popover')

// demo carousel
const CarouselDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/carousel')

// demo collapse
const CollapseDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/collapse')

// demo page layout
const PageLayoutDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/page-layout')

// demo page layout
const TreeTabel = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/tree-table')

// demo reserve
const ReserveDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/reserve')

Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, '../../dist/build/') : '/',
  routes: [{
      path: '*',
      component: Error404,
      meta: {
        hasMaster: false,
        name: '页面去寻找诗和远方了'
      }
    },

    // 根路径,默认登录
    {
      path: '/',
      component: Login,
      meta: {
        hasMaster: false,
        name: '登录'
      }
    },

    // 登录
    {
      path: '/login',
      component: Login,
      meta: {
        hasMaster: false,
        name: '登录'
      }
    },

    // 首页
    {
      path: '/home',
      component: Home,
      meta: {
        hasMaster: true,
        name: '首页'
      }
    },

    // 采购
    {
      path: '/purchase',
      component: Purchase,
      meta: {
        hasMaster: true,
        name: '采购'
      }
    },

    // 销售
    {
      path: '/sales',
      component: Sales,
      meta: {
        hasMaster: true,
        name: '销售'
      }
    },

    // 仓储
    {
      path: '/storage',
      component: Storage,
      meta: {
        hasMaster: true,
        name: '仓储'
      }
    },

    // 会员营销
    {
      path: '/member-market',
      component: MemberMarket,
      meta: {
        hasMaster: true,
        name: '会员营销'
      }
    },

    // 财务管理
    {
      path: '/finance-manage',
      component: FinanceManage,
      meta: {
        hasMaster: true,
        name: '财务管理'
      }
    },

    // 统计分析
    {
      path: '/statistical-analysis',
      component: StatisticalAnalysis,
      meta: {
        hasMaster: true,
        name: '统计分析'
      }
    },
    {
      path: '/basic-data/sys-user',
      component: SysUser,
      meta: {
        hasMaster: true,
        name: '系统用户'
      }
    },
    {
      path: '/basic-data/org-chart',
      component: OrgChart,
      meta: {
        hasMaster: true,
        name: '组织架构'
      }
    },
    {
      path: '/basic-data/bank-account',
      component: BankAccount,
      meta: {
        hasMaster: true,
        name: '银行账户'
      }
    },
    {
      path: '/basic-data/employee-mgr',
      component: EmployeeMgr,
      meta: {
        hasMaster: true,
        name: '职员管理'
      }
    },
    {
      path: '/basic-data/supplier-mgr',
      component: SupplierMgr,
      meta: {
        hasMaster: true,
        name: '供货商管理'
      }
    },
    {
      path: '/basic-data/goods-mgr',
      component: GoodsMgr,
      meta: {
        hasMaster: true,
        name: '商品管理'
      }
    },
    {
      path: '/basic-data/goods-mgr/add',
      component: GoodsAdd,
      meta: {
        hasMaster: true,
        name: '商品新增'
      }
    },
    {
      path: '/basic-data/goods-mgr/edit',
      component: GoodsEdit,
      meta: {
        hasMaster: true,
        name: '商品编辑'
      }
    },
    {
      path: '/basic-data/warehouse-mgr',
      component: WarehouseMgr,
      meta: {
        hasMaster: true,
        name: '仓库编辑'
      }
    },

    // demo
    {
      path: '/demo/index',
      component: IndexDemo,
      meta: {
        hasMaster: true,
        name: '组件说明'
      }
    },
    {
      path: '/demo/layout',
      component: LayoutDemo,
      meta: {
        hasMaster: true,
        name: '布局'
      }
    },
    {
      path: '/demo/button',
      component: ButtonDemo,
      meta: {
        hasMaster: true,
        name: '按钮'
      }
    },
    {
      path: '/demo/input',
      component: InputDemo,
      meta: {
        hasMaster: true,
        name: '输入框'
      }
    },
    {
      path: '/demo/radio',
      component: RadioDemo,
      meta: {
        hasMaster: true,
        name: '单选框'
      }
    },
    {
      path: '/demo/checkbox',
      component: CheckboxDemo,
      meta: {
        hasMaster: true,
        name: '多选框'
      }
    },
    {
      path: '/demo/select',
      component: SelectDemo,
      meta: {
        hasMaster: true,
        name: '选择器'
      }
    },
    {
      path: '/demo/switch',
      component: SwitchDemo,
      meta: {
        hasMaster: true,
        name: '开关'
      }
    },
    {
      path: '/demo/datepicker',
      component: DatepickerDemo,
      meta: {
        hasMaster: true,
        name: '日期选择器'
      }
    },
    {
      path: '/demo/timepicker',
      component: TimepickerDemo,
      meta: {
        hasMaster: true,
        name: '时间选择器'
      }
    },
    {
      path: '/demo/datetimepicker',
      component: DatetimepickerDemo,
      meta: {
        hasMaster: true,
        name: '日期时间选择器'
      }
    },
    {
      path: '/demo/form',
      component: FormDemo,
      meta: {
        hasMaster: true,
        name: '表单'
      }
    },
    {
      path: '/demo/table',
      component: TableDemo,
      meta: {
        hasMaster: true,
        name: '表格'
      }
    },
    {
      path: '/demo/tag',
      component: TagDemo,
      meta: {
        hasMaster: true,
        name: '标签'
      }
    },
    {
      path: '/demo/tree',
      component: TreeDemo,
      meta: {
        hasMaster: true,
        name: '树形控件'
      }
    },
    {
      path: '/demo/pagination',
      component: PaginationDemo,
      meta: {
        hasMaster: true,
        name: '分页'
      }
    },
    {
      path: '/demo/alert',
      component: AlertDemo,
      meta: {
        hasMaster: true,
        name: '警告'
      }
    },
    {
      path: '/demo/message',
      component: MessageDemo,
      meta: {
        hasMaster: true,
        name: '消息提示'
      }
    },
    {
      path: '/demo/message-box',
      component: MessageBoxDemo,
      meta: {
        hasMaster: true,
        name: '弹框'
      }
    },
    {
      path: '/demo/loading',
      component: LoadingDemo,
      meta: {
        hasMaster: true,
        name: '加载'
      }
    },
    {
      path: '/demo/dropdown',
      component: DropdownDemo,
      meta: {
        hasMaster: true,
        name: '下拉菜单'
      }
    },
    {
      path: '/demo/modal',
      component: ModalDemo,
      meta: {
        hasMaster: true,
        name: '对话框'
      }
    },
    {
      path: '/demo/tooltip',
      component: TooltipDemo,
      meta: {
        hasMaster: true,
        name: '文字提示'
      }
    },
    {
      path: '/demo/popover',
      component: PopoverDemo,
      meta: {
        hasMaster: true,
        name: '弹出框'
      }
    },
    {
      path: '/demo/carousel',
      component: CarouselDemo,
      meta: {
        hasMaster: true,
        name: '走马灯'
      }
    },
    {
      path: '/demo/collapse',
      component: CollapseDemo,
      meta: {
        hasMaster: true,
        name: '折叠面板'
      }
    },
    {
      path: '/demo/page-layout',
      component: PageLayoutDemo,
      meta: {
        hasMaster: true,
        name: '页面布局'
      }
    },
    {
      path: '/demo/tree-table',
      component: TreeTabel,
      meta: {
        hasMaster: true,
        name: '树形表格'
      }
    },
    {
      path: '/demo/reserve',
      component: ReserveDemo,
      meta: {
        hasMaster: true,
        name: '敬请期待'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
router.beforeEach(async (to, from, next) => {
  if (to.path === '/' || to.path === '/login') {
    next()
  } else {
    if (auth.isLogined()) {
      if (await auth.getUserInfo()) {
        next()
      }
    } else {
      auth.goLogin()
    }
  }
})
router.afterEach((to, from) => {
  if (to.meta.hasMaster) {
    // if (to.path === '/') {
    //   store.dispatch('updateTabIndex', 0)
    //   return
    // }

    let tabs = store.state.openedTabs
    for (let i = 0, len = tabs.length; i < len; i++) {
      if (tabs[i].path === to.path) {
        store.dispatch('updateTabIndex', i)
        return
      }
    }
    if (tabs.length > 9) {
      tabs.splice(1, 1)
    }
    tabs.push({
      path: to.path,
      name: to.meta.name || to.path
    })
    store.dispatch('updateTabIndex', store.state.openedTabs.length - 1)
  }
})
export default router

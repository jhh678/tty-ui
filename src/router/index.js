/*
 * @Author: jhh678
 * @Date: 2017-11-08 18:56:29
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-15 11:41:02
 */
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
const RoleAuth = () =>
  import (/* webpackChunkName: "basic-data" */ '@/views/basic-data/role-auth') // 角色权限
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

/* demo button */
const ButtonDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/button')

// demo table
const TableDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/table-demo')

// demo tree
const Tree = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/tree-demo')

// demo form
const FormDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/form-demo')

// demo page layout
const PageLayoutDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/page-layout-demo')

// demo page layout
const TreeTabel = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/tree-table')

// demo messagebox
const MessageBoxDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/message-box-demo')

// demo message
const MessageDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/message')

// demo reserve
const ReserveDemo = () =>
  import (/* webpackChunkName: "demo" */ '@/views/demo/reserve')

Vue.use(Router)
let router = new Router({
  mode: 'history',
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

    // 基础资料
    {
      path: '/basic-data/role-auth',
      component: RoleAuth,
      meta: {
        hasMaster: true,
        name: '角色管理'
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
      path: '/demo/button',
      component: ButtonDemo,
      meta: {
        hasMaster: true,
        name: 'Button按钮'
      }
    },
    {
      path: '/demo/table',
      component: TableDemo,
      meta: {
        hasMaster: true,
        name: '表格组件demo'
      }
    },
    {
      path: '/demo/tree',
      component: Tree,
      meta: {
        hasMaster: true,
        name: 'Tree Demo'
      }
    },
    {
      path: '/demo/form',
      component: FormDemo,
      meta: {
        hasMaster: true,
        name: '表单demo'
      }
    },
    {
      path: '/demo/page-layout',
      component: PageLayoutDemo,
      meta: {
        hasMaster: true,
        name: '页面布局demo'
      }
    },
    {
      path: '/demo/tree-table',
      component: TreeTabel,
      meta: {
        hasMaster: true,
        name: '树形表格demo'
      }
    },
    {
      path: '/demo/message',
      component: MessageDemo,
      meta: {
        hasMaster: true,
        name: '消息提示demo'
      }
    },
    {
      path: '/demo/message-box',
      component: MessageBoxDemo,
      meta: {
        hasMaster: true,
        name: '提示框demo'
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

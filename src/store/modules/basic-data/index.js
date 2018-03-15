/**
 * @file 基本资料模块
 * @author jhh678
 * @date 2017/9/22
 */
import {
  phpApi
} from '@/service/rest-api'
import {
  flattenTree
} from '@/utils'
const state = {
  bankOrg: '141861443334111232', // 选择的 orgid
  organizeList: [],
  organizeTree: [],
  bankList: [],
  employeeList: [],
  roleList: [],
  userRole: []
}

// getters
const getters = {}

// actions
const actions = {
  bankOrg({
    commit,
    state
  }, id) {
    state.bankOrg = id
  },
  // 获取组织
  async getOrg({
    commit,
    state
  }) {
    const res = await phpApi('getOrg').post()
    if (res.data.data) {
      commit('getOrg', res.data.data)
    }
    return res.data.data
  },
  // 获取组织树
  async getOrgTree({
    commit,
    state
  }, prams) {
    const res = await phpApi('getOrgTree').post(prams)
    if (res.data.code === 200) {
      let r = []
      if (res.data.data && res.data.data.length > 0) {
        r = flattenTree(res.data.data, 'children')
      }
      res.data.data = r
      commit('getOrgTree', res.data.data)
      return res.data.data
    } else {
      return []
    }
  },
  // 编辑组织
  async editOrg({
    commit,
    state
  }, prams) {
    const res = await phpApi('editOrg').post(prams)
    return res.data
  },
  // 删除组织
  async deleteOrg({
    commit,
    state
  }, prams) {
    const res = await phpApi('deleteOrg').post(prams)
    return res.data.data
  },
  // 新增组织
  async addOrg({
    commit,
    state
  }, prams) {
    const res = await phpApi('addOrg').post(prams)
    return res.data
  },
  // 禁用组织
  async disableOrg({
    commit,
    state
  }, prams) {
    const res = await phpApi('disableOrg').post(prams)
    return res.data
  },
  // 启用组织
  async enableOrg({
    commit,
    state
  }, prams) {
    const res = await phpApi('enableOrg').post(prams)
    return res.data.data
  },
  // 获取银行组织列表
  async getBank({
    commit,
    state
  }, prams) {
    const res = await phpApi('getBank').post(prams)
    return res.data
  },
  // 添加银行
  async addBank({
    commit,
    state
  }, prams) {
    const res = await phpApi('addBank').post(prams)
    return res.data
  },
  // 修改银行
  async editBank({
    commit,
    state
  }, prams) {
    const res = await phpApi('updateBank').post(prams)
    return res.data
  },
  // 删除银行
  async deleteBank({
    commit,
    state
  }, prams) {
    const res = await phpApi('deleteBank').post(prams)
    return res.data
  },
  // 新增部门
  async addDep({
    commit,
    state
  }, prams) {
    const res = await phpApi('addDep').post(prams)
    return res.data
  },
  // 编辑部门
  async editeDep({
    commit,
    state
  }, prams) {
    const res = await phpApi('updateDep').post(prams)
    return res.data.data
  },
  // 删除部门
  async deleteDep({
    commit,
    state
  }, prams) {
    const res = await phpApi('deleteDep').post(prams)
    return res.data
  },
  // 启用部门
  async enableDep({
    commit,
    state
  }, prams) {
    const res = await phpApi('enableDep').post(prams)
    return res.data.data
  },
  // 禁用部门
  async disableDep({
    commit,
    state
  }, prams) {
    const res = await phpApi('disableDep').post(prams)
    return res.data
  },
  // 获取部门详情
  async getDep({
    commit,
    state
  }, prams) {
    const res = await phpApi('getDep').post(prams)
    return res.data
  },
  // 获取部门树
  async getDepTree({
    commit,
    state
  }, prams) {
    const res = await phpApi('getDepTree').post(prams)
    return res.data
  },
  // 获取职员列表
  async getEmployee({
    commit,
    state
  }, prams) {
    const res = await phpApi('getEmployee').post(prams)
    if (res.data.data) {
      commit('getEmployee', res.data.data)
    }
    return res.data.data
  },
  // 新增职员
  async addEmployee({
    commit,
    state
  }, prams) {
    const res = await phpApi('addEmployee').post(prams)
    return res.data
  },
  // 编辑职员
  async editEmployee({
    commit,
    state
  }, prams) {
    const res = await phpApi('editEmployee').post(prams)
    return res.data
  },
  // 编辑职员详情
  async detailEmployee({
    commit,
    state
  }, prams) {
    const res = await phpApi('detailEmployee').post(prams)
    return res.data
  },
  // 删除职员
  async deletEmployee({
    commit,
    state
  }, prams) {
    const res = await phpApi('deletEmployee').post(prams)
    return res.data
  },
  // 获取系统用户列表
  async getSysUser({
    commit,
    state
  }, prams) {
    const res = await phpApi('getSysUser').post(prams)
    return res.data
  },
  // 系统用户详情
  async sysUserDetail({
    commit,
    state
  }) {
    const res = await phpApi('sysUserDetail').post()
    return res.data
  },
  // 添加系统用户
  async addSysUser({
    commit,
    state
  }, prams) {
    const res = await phpApi('addSysUser').post(prams)
    return res.data
  },
  // 修改系统用户
  async updateSysUser({
    commit,
    state
  }, prams) {
    const res = await phpApi('updateSysUser').post(prams)
    return res.data
  },
  // 删除系统用户
  async deleteSysUser({
    commit,
    state
  }, prams) {
    const res = await phpApi('deleteSysUser').post(prams)
    return res.data
  },
  // 启用系统用户
  async enableSysUser({
    commit,
    state
  }, prams) {
    const res = await phpApi('enableSysUser').post(prams)
    return res.data
  },
  // 禁用系统用户
  async disableSysUser({
    commit,
    state
  }, prams) {
    const res = await phpApi('disableSysUser').post(prams)
    return res.data
  },
  // 重置密码
  async resetPassword({
    commit,
    state
  }, prams) {
    const res = await phpApi('resetPassword').post(prams)
    return res.data
  },
  // 禁用职员
  async disableEmployee({
    commit,
    state
  }, prams) {
    const res = await phpApi('disableEmployee').post(prams)
    return res.data
  },
  // 启用职员
  async enableEmployeer({
    commit,
    state
  }, prams) {
    const res = await phpApi('enableEmployeer').post(prams)
    return res.data
  },
  // 获取角色管理列表
  async getRole({
    commit,
    state
  }, prams) {
    const res = await phpApi('getRole').post(prams)
    if (res.data.code === 200) {
      let r = []
      if (res.data.data.list && res.data.data.list.length > 0) {
        r = flattenTree(res.data.data.list, 'roles')
      }
      res.data.data.list = r
      commit('getRole', res.data.data)
      return res.data.data
    } else {
      return []
    }
  },
  // 获取用户角色列表
  async getUserRole({
    commit,
    state
  }, prams) {
    const res = await phpApi('getUserRole').post(prams)
    if (res.data.code === 200) {
      // 数据平扁化
      let r = []
      if (res.data.data.list && res.data.data.list.length > 0) {
        r = flattenTree(res.data.data.list, 'roles')
      }
      commit('getUserRole', r)
      return r
    } else {
      return []
    }
  },
  // 角色获取权限
  async permissionRole({
    commit,
    state
  }, prams) {
    const res = await phpApi('permissionRole').post(prams)
    return res.data
  },
  // 编辑时角色获取权限
  async permissionSonRole({
    commit,
    state
  }, prams) {
    const res = await phpApi('permissionSonRole').post(prams)
    return res.data
  },
  // 删除角色
  async deleteRole({
    commit,
    state
  }, prams) {
    const res = await phpApi('deleteRole').post(prams)
    return res.data
  },
  // 添加角色
  async addRole({
    commit,
    state
  }, prams) {
    const res = await phpApi('addRole').post(prams)
    return res.data
  }
}

// mutations
const mutations = {
  getOrg(state, data) {
    state.organizeList = data
  },
  getOrgTree(state, data) {
    state.organizeTree = data
  },
  getEmployee(state, data) {
    state.getEmployee = data
  },
  getBankList(state, data) {
    state.bankList = data
  },
  getRole(state, data) {
    state.roleList = data
  },
  getUserRole(state, data) {
    state.userRole = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

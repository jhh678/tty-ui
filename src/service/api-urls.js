// api接口
const apiUrls = {
  // 权限管理
  login: '/api/permission/login', // 用户登陆信息
  getUserInfo: '/api/permission/user', // 用户登陆信息
  getPermissions: '/api/permission/index', // 权限列表
  // 组织架构
  getOrg: '/api/organize/index', // 获取组织架构列表
  getOrgTree: '/api/organize/tree', // 获取组织树
  addOrg: '/api/organize/add', // 新增组织
  editOrg: '/api/organize/update', // 编辑组织
  deleteOrg: '/api/organize/delete', // 删除组织
  enableOrg: '/api/organize/enable', // 启用组织
  disableOrg: '/api/organize/disable', // 禁用组织
  getBank: '/api/organize/bank_list', // 获取银行列表
  addBank: '/api/organize/bank_add', // 添加银行
  deleteBank: '/api/organize/bank_delete', // 删除银行
  updateBank: '/api/organize/bank_update', // 修改银行
  addDep: '/api/department/add', // 新增部门
  updateDep: '/api/department/update', // 编辑部门
  deleteDep: '/api/department/delete', // 删除部门
  enableDep: '/api/department/enable', // 启用部门
  disableDep: '/api/department/disable', // 禁用部门
  getDep: '/api/department/index', // 部门详情
  getDepTree: '/api/department/tree', // 部门树

  // 系统用户
  getSysUser: '/api/users/index', // 获取系统用户列表
  sysUserDetail: '/api/user/info', // 获取系统用户详情
  addSysUser: '/api/users/add', // 添加系统用户
  updateSysUser: '/api/users/update', // 修改系统用户
  bindSysUser: '/api/users/bind_role', // 绑定系统用户角色
  deleteSysUser: '/api/users/delete', // 删除系统用户
  enableSysUser: '/api/users/enable', // 启用用户
  disableSysUser: '/api/users/disable', // 禁用系统用户
  resetPassword: '/api/users/set_passwd', // 重置用户密码

  // 职员管理
  getEmployee: '/api/employee/index', // 获取职员列表
  addEmployee: '/api/employee/add', // 新增职员
  editEmployee: '/api/employee/update', // 编辑职员
  deletEmployee: '/api/employee/delete', // 删除职员
  enableEmployeer: '/api/employee/enable', // 启用职员
  disableEmployee: '/api/employee/disable', // 禁用职员
  detailEmployee: '/api/employee/info', // 职员详情

  // 角色管理
  getRole: '/api/users/role_page', // 角色管理列表
  addRole: '/api/users/role_save', // 角色添加
  getUserRole: '/api/users/role_tree', // 获取用户角色
  permissionRole: '/api/users/role_getpermission', // 角色绑定权限
  deleteRole: '/api/users/role_delete', // 删除角色权限
  permissionSonRole: '/api/users/role_son' // 编辑时角色绑定权限
}

export default apiUrls

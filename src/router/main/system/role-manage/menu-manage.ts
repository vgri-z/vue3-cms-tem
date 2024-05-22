const role_manage = () =>
  import('@/views/main/system/role-manage/role-manage.vue')

export default {
  path: '/main/system/role-manage',
  name: '角色管理',
  component: role_manage,
  children: []
}

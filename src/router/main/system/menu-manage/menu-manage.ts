const menu_manage = () =>
  import('@/views/main/system/menu-manage/menu-manage.vue')

export default {
  path: '/main/system/menu-manage',
  name: '菜单管理',
  component: menu_manage,
  children: []
}

import { IMenuItem } from '../../types/type'

export const userMenus: IMenuItem[] = [
  {
    displayName: '系统管理',
    hasUrl: false,
    icon: 'Setting',
    id: '1',
    isLeaf: false,
    name: '系统管理',
    order: 1,
    parentId: '0',
    permission: null,
    url: '/main/system',
    children: [
      {
        displayName: '菜单管理',
        hasUrl: false,
        icon: 'Menu',
        id: '1-1',
        isLeaf: true,
        name: '菜单管理',
        order: 2,
        parentId: '1',
        permission: null,
        url: '/main/system/menu-manage',
        children: []
      },
      {
        displayName: '角色管理',
        hasUrl: false,
        icon: 'User',
        id: '1-2',
        isLeaf: true,
        name: '角色管理',
        order: 3,
        parentId: '1',
        permission: null,
        url: '/main/system/role-manage',
        children: []
      }
    ]
  }
]

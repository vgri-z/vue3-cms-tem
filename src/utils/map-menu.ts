import { IBreadItem } from '@/components/breadcrumb/types/type'
import { IMenuItem } from '@/components/nav-menu/types/type'
import type { RouteRecordRaw } from 'vue-router'

let firstMenu: IMenuItem = null
export function mapMenusToRoutes(userMenus: IMenuItem[]) {
  const routes: RouteRecordRaw[] = []
  const allRoutes = []

  // 匹配router文件夹的main文件夹下面的所有的ts后缀文件
  const modules = import.meta.glob('../router/main/**/*.ts', { eager: true })
  Object.keys(modules).forEach((key) => {
    const route = (modules[key] as any).default
    allRoutes.push(route)
  })

  // 2. 根据userMenus获取所需要添加的routes
  // 递归获取需要添加的路由
  const _recurseGetRoute = (menus) => {
    for (let menu of menus) {
      if (!menu.isLeaf) {
        _recurseGetRoute(menu.children)
      } else if (menu.isLeaf) {
        const route = allRoutes.find((item) => {
          return menu.url.startsWith(item.path)
        })
        if (!firstMenu) {
          firstMenu = menu
        }
        if (route) routes.push(route)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export { firstMenu }

// 查找当前状态为active的菜单
export function pathMapToMenu(
  userMenus: IMenuItem[],
  currentPath: string,
  breadcrumbs?: IBreadItem[]
): any {
  for (const menu of userMenus) {
    if (!menu.isLeaf) {
      const targetMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (targetMenu) {
        breadcrumbs?.push(...[menu, targetMenu])
        return targetMenu
      }
    } else if (menu.isLeaf) {
      if (menu.url === currentPath) {
        return menu
      }
    }
  }
}

// 获取面包屑数据
export function pathToBreadcrumb(
  userMenus: IMenuItem[],
  currentPath: string
): any {
  const breadcrumbs: IBreadItem[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

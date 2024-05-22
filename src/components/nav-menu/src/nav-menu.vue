<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- <img class="img" src="~@/assets/images/logo.svg" alt="logo" />
      <span class="title">管理系统</span> -->
    </div>
    <!-- 菜单 -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 有二级菜单 -->
        <template v-if="!item.isLeaf">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <template v-if="item.icon">
                <component :class="item.icon" :is="item.icon"></component>
              </template>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <template v-if="subitem.icon">
                  <component
                    :class="subitem.icon"
                    :is="subitem.icon"
                  ></component>
                </template>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 没有二级菜单 -->
        <template v-else-if="item.isLeaf">
          <el-menu-item
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
          >
            <template v-if="item.icon">
              <component :class="item.icon" :is="item.icon"></component>
            </template>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menu'
import { IMenuItem } from '../types/type'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()
const defaultValue = ref('1')
const currentPath = ref('')
currentPath.value = route.path // 当前路由路径
const userMenus = computed(() => {
  // 当前用户菜单
  return loginStore.userMenus
})

const setDefaultMenu = () => {
  const menu: IMenuItem = pathMapToMenu(userMenus.value, currentPath.value)
  if (menu) {
    // 如果是菜单页面，直接匹配到当前路由对应的那个菜单
    defaultValue.value = menu.id + ''
  } else {
    // 如果是详情页面，详情的路由不属于userMenus里面，所以用当前路由和userMenus匹配不到对应的菜单，
    // 这个时候通过每次点击菜单的时候，保存的当前活跃的菜单，将当前活跃的菜单设置为初始菜单
    const currentMenu: IMenuItem = localCache.getCache('currentMenu')
    defaultValue.value = currentMenu.id + ''
  }
}
setDefaultMenu()

watch(route, () => {
  currentPath.value = route.path
  setDefaultMenu()
})

const handleMenuItemClick = (subitem: IMenuItem) => {
  localCache.setCache('currentMenu', subitem)
  router.push(subitem.url)
}
</script>

<style scoped lang="less">
.nav-menu {
  .logo {
    height: 28px;
    padding: 12px 10px 8px 10px;
    display: flex;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
    background: #001429;
  }

  :deep(.el-menu) {
    // 修改菜单图标大小
    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }

  // 目录
  .el-submenu {
    background-color: #001429 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #001429 !important;
    }
  }

  :deep(.el-sub-menu__title) {
    background-color: #001429 !important;

    .el-icon.el-sub-menu__icon-arrow {
      position: absolute;
    }

    // 修改菜单图标大小
    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  // 选中之后菜单高亮颜色
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #3396fb !important;
  }
}

// :deep(.el-menu-item svg) {
//   width: 15px !important;
//   height: 15px !important;
//   margin-right: 5px;
// }

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>

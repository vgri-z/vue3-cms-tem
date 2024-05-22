<template>
  <div class="nav-header">
    <component :is="isFold ? 'Expand' : 'Fold'" @click="handleFold"></component>
    <div class="operate">
      <vgri-breadcrumbs :breadcrumbs="breadcrumbs" />
      <user-operate />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UserOperate from './user-operate.vue'
import { VgriBreadcrumbs } from '@/components/breadcrumb'
import { useRoute } from 'vue-router'
import { IBreadItem } from '@/components/breadcrumb/types/type'
import { pathToBreadcrumb } from '@/utils/map-menu'
import { IMenuItem } from '@/components/nav-menu/types/type'
import { userMenus } from '@/components/nav-menu/src/data/menu'

const emits = defineEmits(['foldMenu'])
const isFold = ref(false)

const route = useRoute()

const breadcrumbs = computed<IBreadItem[]>(() => {
  const currentPath = route.path
  return pathToBreadcrumb(userMenus as IMenuItem[], currentPath)
})

const handleFold = () => {
  isFold.value = !isFold.value
  emits('foldMenu', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;

  .operate {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .breadcrumb {
      margin-left: 10px;
      align-self: center;
    }
  }
}
.el-icon {
  cursor: pointer;
}

svg {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
</style>

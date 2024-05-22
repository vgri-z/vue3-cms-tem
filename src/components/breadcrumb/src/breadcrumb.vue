<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { IBreadItem } from '../types/type'

export interface Props {
  breadcrumbs: IBreadItem[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => []
})
</script>

<style scoped lang="less"></style>

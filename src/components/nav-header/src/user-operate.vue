<template>
  <div class="user-operate">
    <el-avatar
      size="small"
      src="https://himg.bdimg.com/sys/portraitn/item/public.1.107afbdb.xhKaxQlsIACHNfS3NxjUXQ"
      class="avatar"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userName }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CircleClose" @click="logout"
            >退出登录</el-dropdown-item
          >
          <!-- <el-dropdown-item icon="Edit">修改密码</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'

const loginStore = useLoginStore()
const router = useRouter()

const userName = computed(() => {
  return loginStore.userInfo.account
})

const logout = () => {
  localCache.deleteCache('token')
  router.push('/main')
}
</script>

<style scoped lang="less">
.user-operate {
  display: flex;
  align-items: center;
  cursor: pointer;

  .avatar {
    margin-right: 5px;
  }
}
</style>

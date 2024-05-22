<template>
  <div class="login">
    <LoginContent></LoginContent>
  </div>
</template>

<script lang="ts" setup>
import LoginContent from './login-content.vue'
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login_bg.jpg');
  background-size: 100% 100%;
}
</style>

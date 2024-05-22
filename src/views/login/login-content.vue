<template>
  <div class="login-content">
    <div class="title">登录</div>
    <div class="login-account">
      <el-form
        ref="formRef"
        :model="account"
        :rules="rules"
        class="demo-ruleForm"
        hide-required-asterisk
        label-width="40"
        size="large"
        status-icon
      >
        <el-form-item label="账户" prop="account">
          <el-input v-model="account.account" placeholder="" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="account.password" placeholder="" show-password />
        </el-form-item>
      </el-form>

      <div class="login-btn">
        <el-button
          style="width: 100%; height: 42px"
          type="primary"
          @click="handleLogin"
        >
          立即登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { rules } from './config/login.config'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { ILoginAccount } from './types/type'
import { userAccounts } from './config/users'
// import { ElMessage } from 'element-plus'

const router = useRouter()
const loginStore = useLoginStore()
const formRef = ref(null)
const account = reactive<ILoginAccount>({
  account: 'admin',
  password: '123456'
})
const handleLogin = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loginStore.loginAction(account)
    }
  })
}

const handleToRegister = () => {
  router.push('/register')
}
</script>

<style lang="less" scoped>
.login-content {
  width: 400px;
  height: 350px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
  }

  .login-account {
    width: 100%;

    .login-btn {
      width: 90%;
      position: absolute;
      bottom: 20px;

      .register {
        font-size: 14px;
        width: 90%;
        color: #bebbbb;
        display: flex;
        margin-bottom: 20px;

        .register-btn {
          color: #4892fe;
          cursor: pointer;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>

import type { FormRules } from 'element-plus'

export const rules: FormRules = {
  account: { required: true, message: '请输入账户名称', trigger: 'blur' },
  password: { required: true, message: '请输入账户密码', trigger: 'blur' }
}

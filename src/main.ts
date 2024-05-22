import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import * as Icons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { globalRegister } from './global'

import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
app.use(store)
app.use(router)

app.use(globalRegister)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')

// 注册element-icon全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})

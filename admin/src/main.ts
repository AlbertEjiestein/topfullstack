import { createApp } from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

// 创建vue实例
const app = createApp(App)
// 配置全局属性$http
const http = axios.create({
  baseURL: 'http://localhost:3000'
})
app.config.globalProperties.$http = http
// 注册路由
app.use(router)
// 注册element
app.use(installElementPlus)
// 挂载
app.mount('#app')
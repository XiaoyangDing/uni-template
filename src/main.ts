import { createSSRApp } from 'vue'
import { setupStore } from '@/store'
import App from './App.vue'
import tmui from './tmui'

// #ifdef VUE3
export function createApp() {
  const app = createSSRApp(App)
  // 注册状态管理
  setupStore(app)
  app.use(tmui, {} as Tmui.tmuiConfig)
  return {
    app
  }
}
// #endif

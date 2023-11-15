import uniCrazyRouter, { beforeEach, afterEach, onError } from 'uni-crazy-router'

// 开放给main.js
export function setupRouter(app: any) {
  // 接收vue3的实例
  app.use(uniCrazyRouter)

  beforeEach((to, from, next) => {
    if (to.url === from?.url) {
      return
    }
    next()
  })

  afterEach(() => {
    // 逻辑代码
  })

  onError(() => {
    // 逻辑代码
  })
}

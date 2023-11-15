import { defineStore } from 'pinia'
import { setCache, getCache } from '@/utils/cache'

// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
  // other options...
  state: () => ({
    token: getCache('TOKEN_KEY') || '',
    userInfo: null
  }),
  getters: {
    getToken: (state): String => {
      return state.token
    },
    getUser: (state) => {
      return state.userInfo
    }
  },
  actions: {
    setToken(token: string) {
      setCache('TOKEN_KEY', token)
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    // 登出
    logout() {
      return new Promise(resolve => {
        this.$reset()
        resolve(true)
      })
    }
  }
})

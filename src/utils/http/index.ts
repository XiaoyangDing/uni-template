import Request from './core/Request'
import { assign } from 'lodash-es'
import type { HttpSuccess } from '@/types/http'
import { Toast } from '@/utils/uniApi'
import { useUserStore } from '@/store/modules/user'
import { REQUEST_URL } from '@/config/request'

const HEADER = {
  'Content-Type': 'application/json;charset=UTF-8;',
  Accept: 'application/json, text/plain, */*'
}

function createRequest() {
  return new Request({
    // 注意，如果是本地开发联调APP，h5必须打开，路径需要被代理才能访问
    // 本地开发服务器(前提：打开H5进行代理转发
    baseURL: REQUEST_URL,
    header: HEADER,
    timeout: 60000
  })
}

const request = createRequest()
/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (options) => {
    const { config } = options
    const { header } = config
    const userStore = useUserStore()
    const result = {
      Authorization: userStore.getToken
    }
    config.header = assign(header, result)
    return options
  },
  (options) => {
    return Promise.reject(options)
  }
)

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: HttpSuccess<API<any>>) => {
    const { data: resData } = response
    const { code, message } = resData
    if (code !== 200) {
      console.log('响应报错：' + JSON.stringify(response))
      Toast(message)
    }
    if (code === 200) {
      return resData as any
    }
    return Promise.reject(resData)
  },
  (response) => {
    if (response.errMsg) {
      Toast('网络异常，请稍后重试')
    }
    return Promise.reject(response)
  }
)

export { request }

import { VgriRequest } from './request/request'
import { BASE_URL, TIME_OUT } from './config'
import { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios'
import { localCache } from '../utils/cache'

const vgriRequest = new VgriRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: false,
  headers: new AxiosHeaders(),
  interceptors: {
    requestInterceptor: (config: InternalAxiosRequestConfig) => {
      // 里面添加，如果所有的实例都需要token，那么就在全局的请求拦截里面添加
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求拦截失败')
      return err
    },
    responseInterceptor: (res: AxiosResponse) => {
      // console.log('响应拦截成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应拦截失败')
      return err
    }
  }
})

export { vgriRequest }

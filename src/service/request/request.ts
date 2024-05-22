import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { VgriRequestInterceptors, VgriRequestConfig } from './type'
import { ElLoading, ElMessage } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

// axios本身也是一个实例对象
export class VgriRequest {
  instance: AxiosInstance
  interceptors: VgriRequestInterceptors | undefined
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: VgriRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING // 默认开启loading

    // 添加每个实例独有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 为请求添加loading 全局的loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '数据请求中...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()

        const data = res.data
        const code = data?.status?.code
        if (code === 500) {
          ElMessage({
            message: '服务器错误',
            type: 'error'
          })
        }
        return data
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T>(config: VgriRequestConfig<T>): Promise<T> {
    // 返回一个Promise
    return new Promise((resolve, reject) => {
      // 某一个请求独有的请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断某一个请求的loading是否显示
      if (config.showLoading === false) {
        this.showLoading = false
      }

      // 通过instance实例发送网络请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 这里的响应拦截最后执行
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
          this.showLoading = this.showLoading ?? DEFAULT_LOADING
        })
        .catch((err) => {
          this.showLoading = this.showLoading ?? DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  put<T>(config: VgriRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// interface VgriAxiosHeaders extends AxiosRequestHeaders {
//   easyDataApiAppId: string
//   easyDataApiNonce: string
//   easyDataApiAppSecret: string
//   easyDataApiSignature: string
//   easyDataApiTimestamp: string
// }

// 类型扩展，方便在使用时可以传入一些拦截器
interface VgriRequestConfig<T = AxiosResponse>
  extends InternalAxiosRequestConfig {
  interceptors?: VgriRequestInterceptors<T>
  showLoading?: boolean
}

interface VgriRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export { VgriRequestInterceptors, VgriRequestConfig }

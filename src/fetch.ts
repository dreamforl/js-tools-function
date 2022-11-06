import { deepCopy } from './deepCopy'
import { isObject } from './type'
type Fun = (res: unknown) => unknown
type Use = (callback: Fun, errorCallback: Fun) => void

interface Params {
  [params: string]: any
}
type ResponseType = 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData'

interface FetchOptions {
  params?: Params
  responseType?: ResponseType
  body?: string
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
  headers?: Params
  withCredentials?: boolean
  [params: string]: any
}
interface Interceptor {
  options: FetchOptions
  request: { use: Use }
  response: {
    noTransform: { use: Use }
    transform: { use: Use }
  }
}
type CallbackFun = (obj: any) => any
const requestCallback: Array<CallbackFun> = [] // 请求的拦截器列表
const requestErrorCallback: Array<CallbackFun> = []

const responseCallback: Array<CallbackFun> = [] // 响应拦截器列表
const responseErrorCallback: Array<CallbackFun> = []

const responseParseCallback: Array<CallbackFun> = [] // 解析响应拦截器列表
const responseParseErrorCallback: Array<CallbackFun> = []
// 所有拦截器都需要返回拦截之后的内容
const interceptor: Interceptor = {
  options: {
    headers: {},
    withCredentials: true, // 跨域请求中携带cookie
    responseType: 'json',
    method: 'GET',
    params: {},
  },
  // 添加请求拦截器
  request: {
    use(callback: CallbackFun, errorCallback: CallbackFun) {
      callback instanceof Function && requestCallback.push(callback)
      errorCallback instanceof Function && requestErrorCallback.push(errorCallback)
    },
  },
  response: {
    // 添加响应拦截器（未解析）
    noTransform: {
      use(callback: CallbackFun, errorCallback: CallbackFun) {
        callback instanceof Function && responseCallback.push(callback)
        errorCallback instanceof Function && responseErrorCallback.push(errorCallback)
      },
    },
    // 添加响应拦截器（已解析）
    transform: {
      use(callback: CallbackFun, errorCallback: CallbackFun) {
        callback instanceof Function && responseParseCallback.push(callback)
        errorCallback instanceof Function && responseParseErrorCallback.push(errorCallback)
      },
    },
  },
}

const originalFetch = window.fetch

/**
 * @description 可以配置拦截器的fetch
 * @param 与原生一致
 * @return Promise<T>
 */
export function zwFetch(url, params: FetchOptions = {}) {
  const urlObj = new URL(url)
  const { origin, pathname, search } = urlObj
  const searchParams = new URLSearchParams(search)
  if (isObject(interceptor.options.params)) {
    Object.entries(interceptor.options.params as Params).forEach(item => {
      searchParams.set(item[0], item[1])
    })
  }
  url = origin + pathname + '?' + searchParams.toString()
  let options = deepCopy({ ...interceptor.options, ...params }) as FetchOptions
  requestCallback.forEach(item => {
    options = item(options)
  })
  return new Promise((resolve, reject) => {
    originalFetch(url, options)
      .then(res => {
        responseCallback.forEach(item => {
          res = item(res)
        })
        if (/^2\d\d$/.test(res.status as unknown as string)) {
          const { responseType } = options
          res[responseType as string]().then(data => {
            responseParseCallback.forEach(item => {
              data = item(data)
            })
            resolve(data)
          })
        } else {
          reject(res)
        }
      })
      .catch(e => {
        responseErrorCallback.forEach(item => {
          e = item(e)
        })
      })
  })
}
zwFetch.interceptor = interceptor

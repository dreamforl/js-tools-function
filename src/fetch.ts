import deepCopy from './deepCopy'
import error from './error'
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
 * 传入对象，解析为请求地址栏的参数的形式
 * '?name=1&age=2'
 * 并且参数会被编码 encodeURIComponent
 */
export function parseObject(object: Params, noQuestionMark = false): string {
  if (typeof object !== 'object') {
    error('parseObject first param needs object .likes { name : "张三" }')
    return ''
  }
  const result = Object.entries(object).reduce((pre, item) => {
    return `${pre}&${item[0]}=${encodeURIComponent(item[1])}`
  }, '')
  return `${noQuestionMark ? '&' : '?'}${result.replace('&', '')}`
}

/**
 * @description 可以配置拦截器的fetch
 * @param 与原生一致
 * @return Promise<T>
 */
export function zwFetch(url, params: FetchOptions = {}) {
  if (/\?/.test(url)) {
    url = url + parseObject(interceptor.options.params as Params, true)
  } else {
    url = url + parseObject(interceptor.options.params as Params)
  }
  let options = deepCopy({ ...interceptor.options, ...params }) as FetchOptions
  requestCallback.forEach(item => {
    options = item(options)
  })
  options.body = params.body
  return new Promise(resolve => {
    originalFetch(url, options)
      .then(res => {
        responseCallback.forEach(item => {
          res = item(res)
        })
        const { responseType = 'json' } = options
        res[responseType]().then(data => {
          responseParseCallback.forEach(item => {
            data = item(data)
          })
          resolve(data)
        })
      })
      .catch(e => {
        responseErrorCallback.forEach(item => {
          e = item(e)
        })
      })
  })
}
zwFetch.interceptor = interceptor

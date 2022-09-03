import { FetchOptions } from './types/fetch'
import { deepCopy } from 'src/deepCopy'
type CallbackFun = (obj: any) => any
const requestCallback: Array<CallbackFun> = [] // 请求的拦截器列表
const requestErrorCallback: Array<CallbackFun> = []

const responseCallback: Array<CallbackFun> = [] // 响应拦截器列表
const responseErrorCallback: Array<CallbackFun> = []

const responseParseCallback: Array<CallbackFun> = [] // 解析响应拦截器列表
const responseParseErrorCallback: Array<CallbackFun> = []
// 所有拦截器都需要返回拦截之后的内容
const interceptor: FetchOptions = {
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
// 处理请求中的地址（将参数拼接进去），支持fetch第二个请求中传递{params}
function getUrl(url: string, options: FetchOptions = {}) {
  const { params = {} } = options
  const paramsStr = Object.entries(params).reduce((pre, item) => {
    return `${pre}&${item[0]}=${item[1]}`
  }, '')
  if (/\?/.test(url)) {
    url += paramsStr
  } else {
    url += '?' + paramsStr.replace('&', '')
  }
  return url
}
const originalFetch = window.fetch

/**
 * @description 可以配置拦截器的fetch
 * @param 与原生一致，不过第二参数支持params给url拼接参数
 * @return Promise<T>
 */
export function zwFetch(url, params: FetchOptions = {}) {
  let options = deepCopy({ ...interceptor.options, ...params }) as FetchOptions
  requestCallback.forEach(item => {
    options = item(options)
  })
  options.body = params.body
  return new Promise(resolve => {
    url = getUrl(url, options)
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

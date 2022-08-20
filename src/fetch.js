const requestCallback = [] // 请求的拦截器列表
const requestErrorCallback = []

const responseCallback = [] // 响应拦截器列表
const responseErrorCallback = []

const responseParseCallback = [] // 解析响应拦截器列表
const responseParseErrorCallback = []
// 所有拦截器都需要返回拦截之后的内容
const interceptor = {
  options: {
    headers: {},
    credentials: 'include', // 跨域请求中携带cookie
    responseType: 'json',
    method: 'GET',
    params: {},
  },
  // 添加请求拦截器
  request: {
    use(callback, errorCallback) {
      callback instanceof Function && requestCallback.push(callback)
      errorCallback instanceof Function && requestErrorCallback.push(errorCallback)
    },
  },
  response: {
    // 添加响应拦截器（未解析）
    noTransform: {
      use(callback, errorCallback) {
        callback instanceof Function && responseCallback.push(callback)
        errorCallback instanceof Function && responseErrorCallback.push(errorCallback)
      },
    },
    // 添加响应拦截器（已解析）
    transform: {
      use(callback, errorCallback) {
        callback instanceof Function && responseParseCallback.push(callback)
        errorCallback instanceof Function && responseParseErrorCallback.push(errorCallback)
      },
    },
  },
}
// 处理请求中的地址（将参数拼接进去），支持fetch第二个请求中传递{params}
function getUrl(url, options) {
  const { params } = options
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
export function zwFetch(url, options = {}) {
  options = { ...interceptor.options, ...options }
  requestCallback.forEach(item => {
    options = item(options)
  })
  return new Promise((resolve, reject) => {
    url = getUrl(url, options)
    originalFetch(url, options)
      .then(res => {
        responseCallback.forEach(item => {
          res = item(res)
        })
        const { responseType } = options
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

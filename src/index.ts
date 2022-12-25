export * from './exportExcel'
export * from './deepCopy'
export * from './fetch'
export * from './buffer'
export * as dom from './dom'
export * as string from './string'
export * as random from './random'
export * as time from './time'
export * as math from './math'
export * as cache from './cache'
export * as cookie from './cookie'
export * as type from './type'
type anyFun = (...args) => any
/**
 * 函数节流-立即执行版，
 * 触发的时候会立即执行一次,后续持续点击只会在单位时间内被点击触发一次
 */
export function throttleAtonce(fn: anyFun, time = 500): anyFun {
  let previous = 0
  return function () {
    const now = Date.now()
    if (now - previous > time) {
      fn.call(this)
      previous = now
    }
  }
}

/**
 * 函数节流---延迟执行版,第一次触发会生成定时器，到一定时间后执行函数
 * 持续点击也只会在单位时间内触发一次
 */
export function throttleLatter(fn: anyFun, time = 500): anyFun {
  let timeout
  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        fn.call(this)
        timeout = ''
      }, time)
    }
  }
}

/**
 * 事件触发过了一段时间之后才会执行，持续触发的话刷新计时器
 */
export function debonce(func: anyFun, time = 500): anyFun {
  let timeout
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.call(this)
    }, time)
  }
}

interface base64Result {
  status: 'error' | 'ok'
  message?: 'base64格式错误' | '无法获取图片类型' | '未知错误'
  blob?: Blob
  e?: unknown
}
/**
 * base64转化为图片
 */
export function base64ToBlob(base64: string): base64Result {
  try {
    const arr = base64.split(',')
    if (arr.length < 2) {
      return {
        status: 'error',
        message: 'base64格式错误',
      }
    }
    const regResult = arr[0].match(/:(.*?);/)
    if (!regResult) {
      return {
        status: 'error',
        message: '无法获取图片类型',
      }
    }
    const mime = regResult[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return {
      status: 'error',
      blob: new Blob([u8arr], {
        type: mime,
      }),
    }
  } catch (e) {
    return {
      status: 'error',
      message: '未知错误',
      e,
    }
  }
}

// 降级的复制
function defaultCopy(value: string, callback: any): void {
  const element = document.createElement('textarea')
  element.style.opacity = '0'
  element.style.position = 'fixed'
  element.style.zIndex = '0'
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (typeof document.execCommand !== 'function') {
    return
  }
  document.execCommand('copy')
  document.body.removeChild(element)
  return typeof callback === 'function' && callback()
}
/**
 * 赋值内容到剪切板,可以接受第二参数为复制成功的回调
 * 会先调用navigator.clipboard.writeText复制
 * 不存在就降级为document.execCommand('copy')
 * 需要用户操作之后才会复制成功
 */
export function copy(value: string, callback: any): void {
  const { clipboard } = window.navigator
  if (clipboard instanceof Object && typeof clipboard.writeText === 'function') {
    clipboard
      .writeText(value)
      .then(() => {
        return typeof callback === 'function' && callback()
      })
      .catch(e => {
        if (e.name === 'NotAllowedError') {
          return console.warn('需要点击之类的操作才可以触发')
        }
        return defaultCopy(value, callback)
      })
  } else {
    return defaultCopy(value, callback)
  }
}

/**
 * 返回参数的类型
 */
export function getType(params: any): string {
  const str = Object.prototype.toString.call(params).slice(8, -1).toLowerCase()
  return str
}

/**
 * 定时任务 返回promise，经过若干秒后触发
 */
interface sleepPromise {
  <T = number>(time: number): Promise<T>
}
export function sleep(time = 500): Promise<sleepPromise> {
  return new Promise(resolve => setTimeout(resolve, time))
}

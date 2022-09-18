export * from './exportExcel'
export * from './deepCopy'
export * from './fetch'
export * from './buffer'
export * as dom from './dom'
export * as string from './string'
export * as random from './random'
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

/**
 * 根据传入的字符串格式化事件，默认格式化获取当前时间
 * 形如YYYY-MM-DD hh-mm-ss
 */
export function format(str = 'YYYY-MM-DD hh:mm:ss', time?: Date | number): string | any {
  if (!time) {
    time = new Date()
  }
  if (typeof time === 'number') {
    time = new Date(time)
  }
  if (!(time instanceof Date)) {
    return time
  }
  const year = time.getFullYear().toString()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const day = time.getDate().toString().padStart(2, '0')
  const hour = time.getHours().toString().padStart(2, '0')
  const minute = time.getMinutes().toString().padStart(2, '0')
  const second = time.getSeconds().toString().padStart(2, '0')
  str = str
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
  return str
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

/**
 * 赋值内容到剪切板
 */
export function copyToBoard(value: string): void {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(element)
    return
  }
  document.body.removeChild(element)
  return
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

import { isNumber, isObject } from './type'

const { localStorage } = window

export const remove = key => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}

/**
 * 读取缓存，如果缓存没有过期返回之前设置的值
 * 过期了返回空字符串
 */
export const get = key => {
  const str = localStorage.getItem(key)
  if (!str) {
    return
  }
  const json = JSON.parse(str)
  if (!isObject(json)) {
    return
  }
  const { t, v } = json
  if (isNumber(t) && t > Date.now()) {
    return v
  }
  return
}

export const set = (key: any, value, timeout: number) => {
  if (!isNumber(timeout)) {
    throw new Error('set localstorage third params needs Number')
  }
  const json = {
    t: Date.now() + timeout,
    v: value,
  }
  localStorage.setItem(key, JSON.stringify(json))
}

import { isBool, isDate, isNumber, isString } from './type'
type options = {
  expires?: Date // 过期时间
  maxAge?: number // cookie存在的时间，单位是s
  domain?: string // 设置cookie的域名
  path?: string // 设置cookie的路径
  secure?: boolean // 是否只允许https请求携带
}
export const globalOptions = {}
// 读取cookie
export const get = key => {
  const list = document.cookie.split('; ')
  const kv = list.find(item => {
    return item.split('=')[0] === key
  })
  return kv && decodeURIComponent(kv.replace(/(.*?)=/, ''))
}

// 根据参数设置cookie
const calcCookie = (cookie, options: options) => {
  options = { ...globalOptions, ...options }
  const { expires, maxAge, path, domain, secure } = options
  if (isDate(expires)) {
    cookie += `;expires=${(expires as Date).toUTCString()}`
  }
  if (isNumber(maxAge)) {
    cookie += `;max-age=${maxAge}`
  }
  if (isString(domain)) {
    cookie += `;domain=${encodeURIComponent(domain as string)}`
  }
  if (isString(path)) {
    cookie += `;path=${encodeURIComponent(path as string)}`
  }
  if (isBool(secure)) {
    cookie += `;secure=${secure}`
  }
  return cookie
}

/**
 * @description 设置cookie，第三个参数可以配置
 * @param { Date } options.expires // 过期时间
 * @param { Number } options.maxAge // cookie存在的时间，单位是s
 * @param { String } options.domain // 设置cookie的域名
 * @param { String } options.path // 设置cookie的路径
 * @param { Boolean } options.secure // 是否只允许https请求携带
 * @return
 */
export const set = (key, value, options: options) => {
  let cookie = `${key}=${encodeURIComponent(value)}`
  cookie = calcCookie(cookie, options)
  document.cookie = cookie
}

// 移除cookie
export const remove = key => {
  document.cookie = `${key}=0;max-age=0`
}

// 获取子cookie
export const getSubCookie = (key1, key2) => {
  const cookie = get(key1)
  const searchParams = new URLSearchParams(cookie)
  return searchParams.get(key2)
}

// 设置子cookie,需要父cookie名称、子cookie键、子cookie值，以及配置
export const setSubCookie = (key, key2, value, options: options) => {
  const cookie = get(key)
  const searchParams = new URLSearchParams(cookie)
  searchParams.set(key2, value)
  set(key, searchParams.toString(), options)
}

// 移除子cookie
export const removeSubCookie = (key, key2, options: options) => {
  const cookie = get(key)
  const searchParams = new URLSearchParams(cookie)
  searchParams.delete(key2)
  set(key, searchParams.toString(), options)
}

// 可以统一的配置
export const setGlobalOptions = options => {
  Object.assign(globalOptions, options)
}

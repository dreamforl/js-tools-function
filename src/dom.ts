import { isString } from './type'
import error from './error'
import { camelCase } from './string'
/**
 * 设置元素的样式
 */
export function setStyle(el: HTMLElement, key: string, value: string | number): void {
  if (!(el instanceof HTMLElement)) {
    error('setStyle first param needs HTMLElement')
    return
  }
  if (!isString(key)) {
    error('setStyle second param needs string')
    return
  }
  key = camelCase(key)
  el.style[key] = value
}

/**
 * 获取元素的某个样式
 */
export function getStyle(el: HTMLElement, key: string): string | undefined {
  if (!(el instanceof HTMLElement)) {
    error('getStyle first param needs HTMLElement')
    return
  }
  if (!isString(key)) {
    error('setStyle second param needs string')
    return
  }
  key = camelCase(key)
  return getComputedStyle(el)[key]
}

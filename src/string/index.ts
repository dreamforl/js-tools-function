import error from '../error'
/**
 * 将下划线和中划线转化为小驼峰
 */
export function camelCase(str: string): string {
  if (typeof str !== 'string') {
    error('camelCase first params needs string')
    return ''
  }
  return str.replace(/[-_][a-zA-Z]/g, item => item[1].toUpperCase())
}

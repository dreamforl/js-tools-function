import error from '../error'
/**
 * 生成RFC4122 u4版本的uuid
 * eg:9638b498-5146-4661-a109-315bc1bd667f
 * 第15位固定是4
 */
export function getUuid(): string {
  return crypto.randomUUID()
}

/**
 * 返回给定长度的随机数
 * 默认当字符的变化返回是0~f
 * 也可以传递要随机的列表,会从列表中获取
 */
export function getRandom(length = 10, list: undefined | Array<number | string>): string {
  if (typeof length !== 'number') {
    error('getRandomNumber first params length needs number likes 10')
    return ''
  }
  if (list && !Array.isArray(list)) {
    error('getRandomNumber second params needs array likes [1,2]')
    return ''
  }
  if (!list) {
    list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  }
  const listLength = list.length
  let result = ''
  for (let i = 0; i < length; i++) {
    const hash = crypto.getRandomValues(new Uint8Array(1))[0]
    result += list[hash % listLength]
  }
  return result
}

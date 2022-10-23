import { isObject } from './type'
interface CopyObject {
  [params: string]: any
}
// 复制对象类型
function copyObject(obj: CopyObject, map, insideCopy): unknown {
  const result = {}
  Object.keys(obj).forEach(item => {
    result[item] = insideCopy(obj[item], map)
  })
  return result
}
// 复制数组类型
function copyList(list, map, insideCopy) {
  const result: Array<any> = []
  list.forEach(item => {
    result.push(insideCopy(item, map))
  })
  return result
}
function insideCopy(obj: unknown, map): unknown {
  if (!isObject(obj)) {
    return obj
  }
  // 避免循环依赖
  if (map.has(obj)) {
    return obj
  } else {
    map.set(obj)
  }

  const type = Object.prototype.toString.call(obj).slice(8, -1)
  switch (type) {
    // 是数组，就走数组的拷贝
    case 'Array': {
      return copyList(obj, map, insideCopy)
    }
    // 日期使用新日期
    case 'Object': {
      return copyObject(obj as CopyObject, map, insideCopy)
    }
    default: {
      // 最后走对象的拷贝
      return obj
    }
  }
}

/**
 * 深拷贝：支持对象、数组、日期、正则
 */
export function deepCopy(obj: unknown): unknown {
  if (!isObject(obj)) {
    return obj
  }
  const map = new WeakMap()
  return insideCopy(obj, map)
}

import { getType } from './index'
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
  if (typeof obj !== 'object') {
    return obj
  }
  // 避免循环依赖
  if (map.has(obj)) {
    return obj
  } else {
    map.set(obj)
  }
  const type = getType(obj)
  switch (type) {
    // 是数组，就走数组的拷贝
    case 'array': {
      return copyList(obj, map, insideCopy)
    }
    // 正则直接复制
    case 'regexp': {
      return obj
    }
    // 日期使用新日期
    case 'date': {
      return new Date(obj as Date)
    }
    default: {
      // 最后走对象的拷贝
      return copyObject(obj as CopyObject, map, insideCopy)
    }
  }
}

/**
 * 深拷贝：支持对象、数组、日期、正则
 */
export default function deepCopy(obj: unknown): unknown {
  if (typeof obj !== 'object') {
    return obj
  }
  const map = new WeakMap()
  return insideCopy(obj, map)
}

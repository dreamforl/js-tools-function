import { getType } from './index'
export default function deepCopy(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  const map = new WeakMap()
  const insideCopy = function (obj, map) {
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
        return copyList(obj, map)
      }
      // 正则直接复制
      case 'regexp': {
        return obj
      }
      // 日期使用新日期
      case 'date': {
        return new Date(obj)
      }
      default: {
        // 最后走对象的拷贝
        return copyObject(obj, map, insideCopy)
      }
    }
  }
  return insideCopy(obj, map)
}

// 复制数组类型
function copyList(list, map, insideCopy) {
  const result = []
  list.forEach(item => {
    result.push(insideCopy(item, map))
  })
  return result
}

// 复制对象类型
function copyObject(obj, map, insideCopy) {
  const result = {}
  Object.keys(obj).forEach(item => {
    result[item] = insideCopy(obj[item], map)
  })
  return result
}


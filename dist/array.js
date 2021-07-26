/**
 * @function_name forEach
 * @description 遍历数组
 * @param {}  
 * list:需要遍历的数组
 *  callback:回调函数，有三个参数，数组元素，对应下标，数组本身
 * @return undefined
 */
export function forEach(list, callback) {
  for (let i = 0; i < list.length; i++) {
    callback(list[i], i, list)
  }
}

/**
 * @function_name map
 * @description 遍历数组，返回新数组
 * @param {}  
 *  list:需要遍历的数组
 *  callback:回调函数，有三个参数，数组元素，对应下标，数组本身
 * @return [] 
 */
export function map(list, callback) {
  let newlist = []
  for (let i = 0; i < list.length; i++) {
    newlist.push(callback(list[i], i, list))
  }
  return newlist;
}

/**
 * @function_name filter
 * @description 遍历数组，返回符合条件的数组
 * @param {}  
 *  list:需要遍历的数组
 *  callback:回调函数，有三个参数，数组元素，对应下标，数组本身
 * @return [] 
 */
export function filter(list, callback) {
  let newlist = []
  for (let i = 0; i < list.length; i++) {
    if (callback(list[i], i, list)) {
      newlist.push(list[i])
    }
  }
  return newlist;
}

/**
 * @function_name every
 * @description 遍历数组，检查是否所有元素都满足条件
 * @param {}  
 *  list:需要遍历的数组
 *  callback:回调函数，有三个参数，数组元素，对应下标，数组本身
 * @return [] 
 */
export function every(list, callback) {
  for (let i = 0; i < list.length; i++) {
    if (!callback(list[i], i, list)) {
      return false
    }
  }
  return true;
}

/**
 * @function_name some
 * @description 遍历数组，检查是否有元素满足条件
 * @param {}  
 *  list:需要遍历的数组
 *  callback:回调函数，有三个参数，数组元素，对应下标，数组本身
 * @return [] 
 */
export function some(list, callback) {
  for (let i = 0; i < list.length; i++) {
    if (callback(list[i], i, list)) {
      return true
    }
  }
  return false;
}

/**
 * @function_name find
 * @description 遍历数组，返回第一个符合条件的元素，如果都不满足，就返回undefined
 * @param {}  
 *  list:需要遍历的数组
 *  callback:回调函数，有三个参数，数组元素，对应下标，数组本身
 * @return [] 
 */
export function find(list, callback) {
  for (let i = 0; i < list.length; i++) {
    if (callback(list[i], i, list)) {
      return list[i]
    }
  }
}

/**
 * @function_name findindex
 * @description 遍历数组，返回第一个符合条件的元素的下标，如果都不满足，就返回-1
 * @param {}  
 *  list:需要遍历的数组
 *  callback:回调函数，有三个参数，数组元素，对应下标，数组本身
 * @return [] 
 */
export function findindex(list, callback) {
  for (let i = 0; i < list.length; i++) {
    if (callback(list[i], i, list)) {
      return i
    }
  }
}

/**
 * @function_name reduce
 * @description 遍历数组，结果汇聚为单个值返回(可以用于累加或者递减之类的)
 * @param {}  
 *  list:需要遍历的数组
 *  callback:回调函数，有四个参数 上一次的结果(如果没有指定第三个参数的话，默认是数组第一个元素)
 *                                ,数组元素，对应下标，数组本身，
 *  sum :初始值，如果不指定的话，那么回调函数中的第一个参数就是数组第一个元素
 * @return  
 */
export function reduce(list, callback, sum) {
  if (!sum) {
    sum = list[0]
    for (let i = 1; i < list.length; i++) {
      sum = callback(sum, list[i], i, list)
    }
    return sum
  }else{
    for (let i = 0; i < list.length; i++) {
      sum = callback(sum , list[i] , i , list)
    }
    return sum
  }

}
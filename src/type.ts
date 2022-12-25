// 数组
export const isArray = obj => obj && obj instanceof Array

// 是对象，且不是null
export const isObject = obj => obj && obj instanceof Object

// 是数字，且不是NaN
export const isNumber = obj => typeof obj === 'number' && !Number.isNaN(obj)

// 是字符串
export const isString = obj => typeof obj === 'string'

// 是时间
export const isDate = d => d && d instanceof Date

// 是布尔值
export const isBool = bool => bool === true || bool === false

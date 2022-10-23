export const isArray = obj => obj instanceof Array

// 是对象，且不是null
export const isObject = obj => obj instanceof Object

// 是数字，且不是NaN
export const isNumber = obj => typeof obj === 'number' && obj === obj

// 是字符串
export const isString = obj => typeof obj === 'string'

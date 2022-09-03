/**
 * @function_name strToBuffer
 * @description 字符串转arraybuffer
 * @param str 要转化的字符串
 * @return Arraybuffer
 */
export function strToBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2) // 每个字符占用2个字节
  const bufView = new Uint16Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

/**
 * @function_name bufferToStr
 * @description ArrayBuffer对象转化为字符串
 * @param ArrayBuffer
 * @return string
 */
export function bufferToStr(buf: ArrayBuffer): string {
  const list = new Uint16Array(buf)
  return list.reduce((pre, item) => {
    return pre + String.fromCharCode(item)
  }, '')
}

/**
 * Uint8Array转化为字符串
 */
export function Uint8ArrayToString(fileData: Uint8Array): string {
  let dataString = ''
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i])
  }
  return dataString
}

/**
 * 字符串转化为Uint8Array
 */
export function stringToUint8Array(str: string): Uint8Array {
  const arr: Array<number> = []
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i))
  }

  return new Uint8Array(arr)
}

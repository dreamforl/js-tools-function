/**
 * @function_name strToBuffer
 * @description 字符串转arraybuffer
 * @param str 要转化的字符串
 * @return Arraybuffer
 */
function strToBuffer(str) {
  var buf = new ArrayBuffer(str.length); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
 * @function_name bufferToStr
 * @description ArrayBuffer对象转化为字符串
 * @param ArrayBuffer
 * @return string
 */
function bufferToStr(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

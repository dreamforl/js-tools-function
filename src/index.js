// 节流：单位时间内，只会执行一次函数
/**
 * @function_name throttleAtonce
 * @description //函数节流-立即执行版，触发的时候会立即执行一次,后续持续点击只会在单位时间内被点击触发一次
 * @param {}  
 * fn:需要节流的函数,
 *  time:触发的时间间隙
 * @return undefined 
 */
export function throttleAtonce(fn, time) {
  let previous = 0;
  return function () {
    let now = Date.now();
    if (now - previous > time) {
      fn.call(this);
      previous = now;
    }
  }
}

/**
 * @function_name throttleLatter
 * @description //函数节流---延迟执行版,第一次触发会生成定时器，到一定时间后执行函数
 *  持续点击也只会在单位时间内触发一次
 * @param {}   
 * fn:需要节流的函数,
 *  time:触发的时间间隙
 * @return undefined 
 */
export function throttleLatter(fn, time) {
  let timeout = '';
  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        fn.call(this);
        timeout = '';
      }, time)
    }
  }
}

// 防抖：事件触发过了一段时间才会执行(例如搜索框)
/**
 * @function_name function debonce
 * @description 事件触发过了一段时间之后才会执行，持续触发的话刷新计时器
 * @param {}  
 *  fn:需要节流的函数,
 *  time:触发的时间间隙
 * @return undefined
 */
export function debonce(func, time) {
  let timeout
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    };
    timeout = setTimeout(() => {
      func.call(this)
    }, time)
  }
}

/**
 * @function_name format
 * @description 根据传入的字符串格式化事件，默认格式化获取当前时间
 * @param {String} str  日期字符串  形如YYYY-MM-DD hh-mm-ss,
 * @param {time} str  Date对象，也可以不传
 * @return String 
 */
export function format(str, time) {
  if (!time) {
    time = new Date();
  }
  if (!str) {
    str = 'YYYY-MM-DD hh:mm:ss';
  }
  let year = time.getFullYear();
  let month = (time.getMonth() + 1).toString().padStart(2, '0');
  let day = time.getDate().toString().padStart(2, '0');
  let hour = time.getHours().toString().padStart(2, '0');
  let minute = time.getMinutes().toString().padStart(2, '0');
  let second = time.getSeconds().toString().padStart(2, '0');
  str = str.replace('YYYY', year).replace('MM', month)
    .replace('DD', day).replace('hh', hour).replace('mm', minute).replace('ss', second);
  return str
}

// base64转化为png
export function base64ToBlob(base64) {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

/**
 * @function_name copyToBoard
 * @description 赋值内容到剪切板
 * @param {String}  value
 * @return {undefined} 
 */
export function copyToBoard(value) {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(element)
    return true
  }
  document.body.removeChild(element)
  return false
}

/**
 * @function_name pictureGray
 * @description 图片变灰
 * @param {Object | String}   el 选择器或者是canvas对象
 * @return {} 
 */
export function pictureGray(el) {
  let str = Object.prototype.toString.call(el).slice(8, -1)
  if (str !== 'String' && str !== 'HTMLCanvasElement') {
    throw new Error('请传入cnavas的选择器或者是cnavas对象')
  }
  if (str === 'String') {
    el = document.querySelector(el)
    if (!el) {
      throw new Error('请检查选择器是否有误，或者当前DOM没有canvas节点')
    }
    if (type(el) !== 'HTMLCanvasElement') {
      throw new Error('当前选择器有误，请检查选择器对应的DOM节点是否是canvas')
    }
  }
  let ctx = el.getContext('2d')
  let imgdata = ctx.getImageData(0, 0, el.width, el.height)
  let list = imgdata.data
  for (let i = 0; i < list.length; i += 4) {
    let average = (list[i] + list[i + 1] + list[i + 2]) / 3
    list[i] = average;
    list[i + 1] = average;
    list[i + 2] = average;
  }
  ctx.putImageData(imgdata, 0, 0)
  console.log('图像灰度成功');
}

/**
 * @function_name type
 * @description 返回参数的类型
 * @param {any} params  
 * @return {string} 参数的类型
 */
export function type(params) {
  let str = Object.prototype.toString.call(params).slice(8, -1)
  return str
}
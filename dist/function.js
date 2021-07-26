/*
 * @Description: 
 * @Author: zhenwei
 * @LastEditTime: 2021-07-25 21:01:55
 * @LastEditors: Please set LastEditors
 */

/**
 * @function_name call
 * @description 改变函数指向
 * @param {
 *  fn:要改变指向的函数，
 *  obj:是要指向的目标对象，
 *  ..args是接受的参数数组,如果obj为undefined或者null的话，就指向全局对象
 * }  
 * @return {undefined} 
 */
export function call(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj._temp_ = fn;
  // 此处存在问题，如果这个对象有_temp_属性的话，就会覆盖并且删除该属性，存在冲突的可能性
  let result = obj.fn(...args);
  delete obj._temp_;
  return result
}

/**
 * @function_name apply
 * @description 改变函数指向
 * @param {
 *  fn:要改变指向的函数，
 *  obj:是要指向的目标对象，
 *  ..args是接受的参数数组,如果obj为undefined或者null的话，就指向全局对象
 * }  
 * @return {undefined} 
 */
export function apply(fn, obj, argument) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj._temp_ = fn;
  // 此处存在问题，如果这个对象有_temp_属性的话，就会覆盖并且删除该属性，存在冲突的可能性
  let result = obj.fn(...argument);
  delete obj._temp_;
  return result
}

/**
 * @function_name bind
 * @description 改变函数this指向,而且在bind绑定的时候，可以传递参数，在调用的时候也可以传递参数
 * @param {
 *  fn:要改变指向的函数，
 *  obj:是要指向的目标对象，
 *  ..args是接受的参数数组,如果obj为undefined或者null的话，就指向全局对象
 * }    
 * @return {函数} 
 */
export function bind(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  return function (...args2) {
    obj._temp_ = fn;
    let result = obj._temp_(...args, ...args2);
    delete obj._temp_;
    return result
  }
}

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
 * @function_name deepClone
 * @description 深拷贝,递归实现，仅仅支持普通对象{}或者[]，包括函数
 * @param {} 需要拷贝的对象
 * @return {}  拷贝后的对象
 */
export function deepClone(obj) { //深拷贝
  let newObj = obj instanceof Array ? [] : {};
  for (let item in obj) {
    let temple = typeof obj[item] == 'object' ? deepClone(obj[item]) : obj[item];
    newObj[item] = temple;
  }
  return newObj;
}

/**
 * @function_name format
 * @description 根据传入的字符串格式化事件，默认格式化获取当前时间
 * @param {
 * String 形如YYYY-MM-DD hh-mm-ss,
 * time 时间戳(js的时间戳)
 * } ,
 * @return String 
 */
export function format(str, time) {
  if (!time) {
    time = new Date();
  }
  if(!str){
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
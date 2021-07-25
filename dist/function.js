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
/**
 * @function_name debonceAtonce
 * @description //函数防抖-立即执行版，触发的时候会立即执行一次，后续在一定的时间间隔内只能执行一次
 * @param {
 *  fn:需要防抖的函数,
 *  time:触发的时间间隙
 * }  
 * @return {undefined} 
 */
export function debonceAtonce(fn, time) {
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
 * @function_name debonceLatter
 * @description //函数防抖---延迟执行版,第一次触发会生成定时器，
 * 到一定时间后执行函数，如果持续触发，会刷新计时器重新计时
 * @param {
 *  fn:需要防抖的函数,
 *  time:触发的时间间隙
 * }   
 * @return {undefined} 
 */
export function debonceLatter(fn, time) {
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
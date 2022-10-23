import { isNumber } from './type'
type dateObject = {
  day: number
  hours: number
  minutes: number
  seconds: number
}
/**
 * 毫秒转化为天-时-分-秒
 * @param { number } time 一个毫秒
 * @return { Object } 包含时、分、秒和天的对象
 * eg:  {day: 30, hours: 19, minutes: 46, seconds: 19}
 */
export function getTime(time: number): dateObject | undefined {
  // 不是数字 或者是NaN 或者 小于0
  if (!isNumber(time) || time < 0) {
    return
  }
  const day = Math.floor(time / (1000 * 60 * 60 * 24))
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const seconds = Math.floor(((time / 1000) % 60) % 60)
  return {
    day,
    hours,
    minutes,
    seconds,
  }
}

/**
 * 计算两个日期之间相差的天、时、分、秒
 * @param { number | Date } time1 一个日期或者时间戳
 * @param { number | Date } time2 一个日期或者时间戳（默认为当前时间戳）
 * @return { Object } 包含时、分、秒和天的对象
 * eg:  {day: 30, hours: 19, minutes: 46, seconds: 19}
 */
export function diffTwoTimes(
  time1: number | Date,
  time2: number | Date = Date.now()
): dateObject | undefined {
  if (Object.prototype.toString.call(time1 as Date) === '[object Date]') {
    time1 = (time1 as Date).getTime()
  }
  if (Object.prototype.toString.call(time2 as Date) === '[object Date]') {
    time2 = (time2 as Date).getTime()
  }
  if (!isNumber(time1) || time1 < 0) {
    return
  }
  if (!isNumber(time2) || time2 < 0) {
    return
  }
  return getTime(Math.abs((time1 as number) - (time2 as number)))
}

/**
 * 根据传入的字符串格式化事件，默认格式化获取当前时间
 * 形如YYYY-MM-DD hh-mm-ss
 */
export function format(str = 'YYYY-MM-DD hh:mm:ss', time?: Date | number): string | any {
  if (!time) {
    time = new Date()
  }
  if (typeof time === 'number') {
    time = new Date(time)
  }
  if (!(time instanceof Date)) {
    return time
  }
  const year = time.getFullYear().toString()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const day = time.getDate().toString().padStart(2, '0')
  const hour = time.getHours().toString().padStart(2, '0')
  const minute = time.getMinutes().toString().padStart(2, '0')
  const second = time.getSeconds().toString().padStart(2, '0')
  str = str
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
  return str
}

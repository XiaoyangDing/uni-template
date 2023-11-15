/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {Number} delay 防抖时间，默认500ms
 * @param {Boolean} immediate 是否立即执行
 */
let timeout = <any>null
export function debounce(fn:Function, delay = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  console.log(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, delay)
    console.log('callNow', callNow)
    if (callNow) typeof fn === 'function' && fn()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = null
    timeout = setTimeout(() => {
      typeof fn === 'function' && fn()
    }, delay)
  }
}

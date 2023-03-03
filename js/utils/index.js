// 这种场景下, 我也不知道那个东西能做到这么狠了
export function xjhCurrying(fn) {
  function currying(...arg) {
    if (fn.length >= arg.length) {
      fn.apply(this, arg)
    } else {
      function currying2(...args) {
        currying.apply(this, arg.concat(args))
      }
      return currying2
    }
  }
  return currying
}

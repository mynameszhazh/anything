export function call() {
  Function.prototype.xcall = function(thisArg, ...rest) {
    var fn = this
    thisArg = thisArg ? Object(thisArg) : {}

    thisArg.fn = fn
    var result = thisArg.fn(...rest)
    delete thisArg.fn
    return result
  }
}

export function apply() {
  Function.prototype.apply = function(thisArg, argArray) {
    var fn = this
    thisArg = thisArg ? Object(thisArg) : {}

    thisArg.fn = fn
    argArray = argArray || []
    var result = thisArg.fn(...argArray)
    delete thisArg.fn
    return result
  }
}

export function bind() {
  Function.prototype.bind = function(thisArg, ...argArray) {
    var fn = this
    thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : {}

    function proxyFn(...args) {
      thisArg.fn = fn
      var finalArgs = [...argArray, ...args]
      var result = thisArg.fn(...finalArgs)
      delete thisArg.fn
      return result
    }

    return proxyFn
  }
}

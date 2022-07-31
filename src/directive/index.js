import copy from "./copy";
import longpress from "./longpress";
import debounce from "./debounce";
import emoji from "./emoji";
import waterMarker from "./waterMarker";
import draggable from "./draggable";

// 自定义指令
const directives = {
  copy,
  longpress,
  debounce,
  emoji,
  waterMarker,
  draggable
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      // 这个就是关键步骤
      Vue.directive(key, directives[key])
    })
  }
}
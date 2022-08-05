import Vue from 'vue'
import Notice from '../components/Notice.vue'
function createComp(component, props) {
  // 这样就可以得到一个  半真实的dom
  let vm = new Vue({
    render: h => h(component, { props })
  }).$mount()

  // vm.$el 就是元素的真实dom
  document.body.appendChild(vm.$el)

  // 再从 document 
  const comp = vm.$children[0]

  // 将我的组件销毁掉
  comp.remove = function() {
    console.log(vm, 'vm vm vm')
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}

export default {
  install(Vue) {
    Vue.prototype.$notice = function(options) {
      // 函数柯里化一下
      return createComp(Notice, options)
    }
  }
} 
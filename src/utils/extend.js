import Vue from 'vue'
import Notice from '../components/Notice.vue'

function create(Component, props) {
  const Constrctor = Vue.extend(Component)
  const comp = new Constrctor({propsData: props})
  comp.$mount()
  document.body.appendChild(comp.$el)
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy() 
  }
  return comp
}
export default {
  install(Vue) {
    Vue.prototype.$notice2 = function(options) {
      return create(Notice, options)
    }
  }
}
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import directive from './directive';
import create from './utils/create';
import LazyLoad from './directive/lazyLoad';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* PUBLIC */
import './assets/styles/reset.min.css'
import './assets/styles/basic.css' 

//  自定义指令 常规 
Vue.use(directive)
// 注册create Notice 插件
Vue.use(create)
// 图片懒加载, 因为方式有些特殊 需要单独拿出来用
Vue.use(LazyLoad, {
  default: 'https://img0.baidu.com/it/u=1572355261,686237717&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
})
/* ElementUI */
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

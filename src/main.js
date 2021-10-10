// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入阿里图片iocn
import './assets/iocn/iconfont.css'
// 引入element// 导入message
import ElementUI, { Message } from 'element-ui'
// 引入elementUI
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
// 导入axios
import axios from 'axios'
// 引入vuex中的store
import store from './store/index'
// 挂载到$message上
Vue.prototype.$message = Message
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
// 配置请求的跟路径
axios.defaults.baseURL = 'http://localhost:3000/'
// 跨域优化
// axios.defaults.headers.get['Content-Type'] = 'text/html '
// 全局配置  挂载到vue的原型对象上  这样每个vue组件都可以通过this.$http 使用axios
Vue.prototype.$http = axios
// 注册事件总线
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

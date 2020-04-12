import Vue from 'vue'
import Axios from 'axios'
import VueClipboard from 'vue-clipboard2'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)
Vue.use(VueClipboard)

import App from './App'
import router from './router'

Vue.http = Vue.prototype.$http = Axios.create({
  baseURL: localStorage.getItem('baseUrl') || 'http://localhost:3625/'
})

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`
}

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')

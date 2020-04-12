import Vue from 'vue'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import VTooltip from 'v-tooltip'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);
Vue.use(VTooltip)
Vue.use(VueClipboard)

import App from './App'
import router from './router'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')

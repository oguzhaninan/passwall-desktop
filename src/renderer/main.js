import Vue from 'vue'
import Axios from 'axios'
import VueClipboard from 'vue-clipboard2'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)
Vue.use(VueClipboard)

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$http = Axios.create({
  baseURL: localStorage.getItem('baseUrl') || 'http://localhost:3625/'
})

const AuthCheck = async () => {
  const goToLogin = async () => {
    localStorage.removeItem('token')
    await router.push({ name: 'Login' })
  }

  try {
    const token = localStorage.getItem('token')
    if (token) {
      Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`

      try {
        await Vue.prototype.$http.post('auth/check')
      } catch (error) {
        try {
          const { data } = await Vue.prototype.$http.post('auth/refresh')
          localStorage.setItem('token', data.token)
        } catch (error) {
          await goToLogin()
        }
      }
    }
  } catch (error) {
    await goToLogin()
  }
}

;(async () => {
  await AuthCheck()
  setInterval(AuthCheck, 30e3)

  new Vue({
    components: { App },
    router,
    template: '<App/>'
  }).$mount('#app')
})()

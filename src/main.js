import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@/assets/stylesheets/base.scss'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

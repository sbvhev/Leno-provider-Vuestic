// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import '@/helpers/CustomRules'
import '@/helpers/filters'
import App from './App'
import store from './store'
import VuesticPlugin from 'vuestic-theme/vuestic-plugin'
import './i18n'
import YmapPlugin from 'vue-yandex-maps'
import './services/vuex'
import './services/axios'
import './services/vuex-router-sync'
import { router } from './services/vue-router'

import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
const toastrConfigs = {
  position: 'top right',
  hideDuration: 1000,
  timeOut: 3000,
  showMethod: 'fadeInRight',
  hideMethod: 'fadeOutDown'
}
Vue.use(CxltToastr, toastrConfigs)
Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })

store.dispatch('auth/check')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue from 'vue'
import Axios from 'axios'
import store from '@/store'

Axios.defaults.baseURL = 'http://test-env-web.wb7sp3zctn.us-east-1.elasticbeanstalk.com/employer/'
Axios.defaults.headers.common.Accept = 'application/json'
Axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout')
    }

    return Promise.reject(error)
  }
)

// Bind Axios to Vue.
Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})

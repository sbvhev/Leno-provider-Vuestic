/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue'
import store from '@/store'
import * as types from './mutation-types'
import Proxy from '@/proxies/Proxy'
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

export const check = ({ commit }) => {
  commit(types.CHECK)
}

export const register = async ({ commit }, user) => {
  /*
   * Normally you would use a proxy to register the user:
   */
  const proxy = new Proxy('createAccount.php?', user)

  try {
    const response = await proxy.submit('post')
    if (response.error) {
      commit(types.NOTIFICATION, {
        type: 'ERROR',
        title: 'REGISTERED USER',
        message: response.error
      })
    } else {
      commit(types.LOGIN, response)
      await store.dispatch('account/me', response)
      Vue.router.push({ name: 'dashboard' })
    }
  } catch (err) {
    commit(types.NOTIFICATION, {
      type: 'ERROR',
      title: 'SERVER ERROR',
      message: 'Oops, Please try again later.'
    })
  }
}

export const login = async ({ commit }, user) => {
  /*
   * Normally you would use a proxy to log the user in:
   */
  Vue.$http.defaults.headers.common.Authorization = ''
  const response = await new Proxy('logIn.php?', user).submit('post')
  const { success, error, displayError, provider } = response
  if (success) {
    commit(types.PROVIDER, provider)
    commit(types.LOGIN, provider)
    Vue.router.push({ name: 'dashboard' })
  } else {
    commit(types.NOTIFICATION, {
      type: 'ERROR',
      title: error,
      message: displayError
    })
  }
}

export const notification = ({ commit }, info) => {
  commit(types.NOTIFICATION, info)
}

export const notificationClear = ({ commit }) => {
  commit(types.CLEAR)
}

export const logout = ({ commit }) => {
  commit(types.LOGOUT)
  commit(`account/${types.LOGOUT}`, null, { root: true })
  Vue.router.push({
    name: 'login'
  })
}

export const isProcessing = ({ commit }, value) => {
  commit(types.PROCESSING)
}

export default {
  check,
  register,
  login,
  logout,
  notification,
  isProcessing,
  notificationClear
}

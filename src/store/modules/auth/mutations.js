/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue'
import {
  CHECK,
  REGISTER,
  LOGIN,
  LOGOUT,
  NOTIFICATION,
  PROCESSING,
  CLEAR,
  SET_FORMDATA
} from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [CHECK] (state) {
    state.authenticated = !!localStorage.getItem('id_token')
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        'id_token'
      )}`
    }
  },

  [REGISTER] (state) {
    //
  },

  [LOGIN] (state, { accessToken }) {
    state.authenticated = true
    localStorage.setItem('id_token', accessToken)
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  },

  [LOGOUT] (state) {
    state.authenticated = false
    localStorage.removeItem('id_token')
    delete Vue.$http.defaults.headers.common.Authorization
  },

  [PROCESSING] (state, value) {
    state.isProcessing = value
  },

  [NOTIFICATION] (state, info) {
    state.notificationInfo = info
  },

  [CLEAR] (state) {
    state.notificationInfo.title = ''
    state.notificationInfo.message = ''
  },

  [SET_FORMDATA] (state, payload) {
    state.formData = payload
  }
}

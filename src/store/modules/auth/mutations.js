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
  FORMDATA,
  PROVIDER,
  CHANGEISON,
  CHANGEPRICING,
  CHANGEPRICEISON,
  COMPLETE_SETUP_PROFILE
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

  [LOGIN] (state, { providerAccessToken }) {
    state.authenticated = true
    localStorage.setItem('id_token', providerAccessToken)
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${providerAccessToken}`
  },

  [LOGOUT] (state) {
    state.authenticated = false
    state.provider = null
    state.formData.locations = null
    state.formData.pricings = null
    state.isSetupProfile = false
    localStorage.removeItem('id_token')
    delete Vue.$http.defaults.headers.common.Authorization
  },

  [NOTIFICATION] (state, info) {
    state.notificationInfo = info
  },

  [CLEAR] (state) {
    state.notificationInfo.title = ''
    state.notificationInfo.message = ''
  },

  [PROCESSING] (state, value) {
    state.isProcessing = value
  },

  [PROVIDER] (state, payload) {
    state.provider = payload
  },

  [FORMDATA] (state, payload) {
    state.formData = {
      ...state.formData,
      [payload.key]: payload.value
    }
  },

  [CHANGEISON] (state, payload) {
    const { locations } = state.formData
    const locations1 = [...locations]
    const newLocations = locations1.map(ele => {
      if (ele.id === payload.id) {
        ele.isOn = payload.isOn
      }
      return ele
    })

    state.formData.locations = newLocations
  },

  [CHANGEPRICING] (state, payload) {
    state.formData.pricings[payload.key] = {
      ...state.formData.pricings[payload.key],
      options: payload.value
    }
  },

  [CHANGEPRICEISON] (state, index) {
    let tempFlg = true
    if (state.formData.pricings[index].isOn) tempFlg = false
    state.formData.pricings[index].isOn = tempFlg
  },

  [COMPLETE_SETUP_PROFILE] (state) {
    state.isSetupProfile = true
  }
}

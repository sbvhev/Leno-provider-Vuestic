/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { ME, LOGOUT } from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [ME] (state, info) {
    for (const key in state.me) {
      state.me[key] = info[key]
    }
  },
  [LOGOUT] (state) {
    for (const key in state.me) {
      if (key === 'planChoice') state.me[key] = '0'
      else state.me[key] = ''
    }
  }
}

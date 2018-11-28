/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import * as types from './mutation-types'
import Proxy from '@/proxies/Proxy'

import { NOTIFICATION } from '../auth/mutation-types'

export const me = async ({ commit }, infoWithToken) => {
  /*
   * Normally you would use a proxy to fetch the account:
   */
  const proxy = new Proxy('getUser.php?', infoWithToken)
  try {
    const response = await proxy.submit('get')
    if (response.error) {
      commit(NOTIFICATION, {
        type: 'ERROR',
        title: 'EMPTY USER INFO',
        message: response.error
      })
    } else {
      const myself = { ...infoWithToken, ...response }
      commit(types.ME, myself)
    }
  } catch (err) {
    commit(
      `account/${NOTIFICATION}`,
      {
        type: 'ERROR',
        title: 'SERVER ERROR',
        message: 'Oops, Please try again later.'
      },
      { root: true }
    )
  }
}

export default {
  me
}

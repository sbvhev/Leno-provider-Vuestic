/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import VuexI18n from 'vuex-i18n'

// Modules
import account from './modules/account'
import auth from './modules/auth'
import shared from './modules/shared'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    account,
    auth,
    shared
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug
    ? [createLogger(), createPersistedState()]
    : [createPersistedState()]
})

Vue.use(VuexI18n.plugin, store)
export default store

/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routerSetting from '@/router'
import store from '@/store'

Vue.use(VueRouter)

const {
  options: { routes }
} = routerSetting

const sharedGetterConfig = store.getters['shared/config']

let mediaHandler = () => {
  if (window.matchMedia(sharedGetterConfig.windowMatchSizeLg).matches) {
    store.dispatch('shared/toggleSidebar', true)
  } else {
    store.dispatch('shared/toggleSidebar', false)
  }
}

export const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    store.commit('shared/setLoading', true)
    next({
      name: 'login'
    })
  } else if (
    to.matched.some(m => m.meta.guest) &&
    store.state.auth.authenticated
  ) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    store.commit('shared/setLoading', true)
    next({
      name: 'dashboard'
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('shared/setLoading', false)
})

Vue.router = router

export default {
  router
}

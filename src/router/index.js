import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/admin/AppLayout'
import AuthLayout from '../components/auth/AuthLayout'
import lazyLoading from './lazyLoading'

Vue.use(Router)

const demoRoutes = []
if (process.env.NODE_ENV === 'development') {
  const VueBook = require('vue-book').default

  demoRoutes.push(
    VueBook(require.context('./..', true, /.demo.vue$/), '/demo'),
    VueBook(require.context('./../components', true, /.vue$/), '/presentation')
  )
}

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: lazyLoading('auth/login/Login')
        },
        {
          name: 'signup',
          path: 'signup/:siteId',
          component: lazyLoading('auth/signup/Signup')
        },
        {
          path: '',
          redirect: { name: 'login' }
        }
      ],
      // If the user needs to be a guest to view this page.
      meta: {
        guest: true
      }
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: lazyLoading('dashboard/Dashboard'),
          default: true
        },
        {
          name: 'users',
          path: 'users',
          component: lazyLoading('users/Users')
        },
        {
          name: 'payment',
          path: 'payment',
          component: lazyLoading('payment/Payment')
        },
        {
          name: 'class',
          path: 'class/:classId',
          component: lazyLoading('dashboard/class/Class')
        },
        {
          name: 'plan',
          path: 'plan',
          component: lazyLoading('plan/Plan')
        }
      ],
      // If the user needs to be authenticated to view this page.
      meta: {
        auth: true
      }
    }
  ]
})

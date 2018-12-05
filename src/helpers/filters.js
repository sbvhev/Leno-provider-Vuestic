import Vue from 'vue'

Vue.filter('exchangeDoller', function (value) {
  return Math.round(value / 100 * 100) / 100
})

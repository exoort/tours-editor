import Vue from 'vue'

Vue.filter('number', function (value) {
  return Number(value)
})

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/filters'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { $eventBus, initEventBus } from '@/utils/eventBus'

Vue.config.productionTip = false

initEventBus()
Vue.prototype.$eventBus = $eventBus

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

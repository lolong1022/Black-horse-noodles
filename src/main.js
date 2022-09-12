import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vantsFilter from './plugins/vant'
Vue.config.productionTip = false
Vue.use(vantsFilter)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import store from './store'
import axios from 'axios'
import http from './assets/http'
import domain from './assets/domain.js';
global.domain = domain
import Mock from './mock'
Mock.init();

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import less from './styles/base.less'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Element)
Vue.use(http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

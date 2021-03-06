// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'assets/js/rem.js'
import store from './store/index'

import MintUi from 'mint-ui'
import 'mint-ui/lib/style.min.css'
// 字体图标
// import './assets/iconfont/iconfont'
import './assets/iconfont/iconfont.css'

Vue.use(MintUi)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

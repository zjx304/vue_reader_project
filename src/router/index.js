import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import('components/HelloWorld.vue')
const Demo1 = () => import('pages/Demo1')
const Demo2 = () => import('pages/Demo2')
const Rank = () => import('pages/Rank')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/demo1',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/demo2',
      name: 'Demo2',
      component: Demo2
    }
  ]
})

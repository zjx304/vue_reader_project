import Vue from 'vue'
import Router from 'vue-router'
const Rank = () => import('pages/Rank')
const Category = () => import('pages/Category')
const CategoryList = () => import('pages/CategoryList')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CategoryList',
      component: CategoryList
    },
    // {
    //   path: '/',
    //   name: 'Rank',
    //   component: Rank
    // },
    // {
    //   path: '/',
    //   name: 'Categary',
    //   component: Category
    // },
    
  ]
})

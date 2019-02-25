import Vue from 'vue'
import Router from 'vue-router'
const Rank = () => import('pages/Rank')
const Category = () => import('pages/Category')
const CategoryList = () => import('pages/CategoryList')
const Book = () => import('pages/Book')
const Read = () => import('pages/Read')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/book/:id',
      name: 'book',
      component: Book
    },
    {
      path: '/',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/read/:id',
      name: 'Read',
      component: Read
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

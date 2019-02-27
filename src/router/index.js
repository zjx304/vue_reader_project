import Vue from 'vue'
import Router from 'vue-router'
const Rank = () => import('pages/Rank')
const Category = () => import('pages/Category')
const CategoryList = () => import('pages/CategoryList')
const Book = () => import('pages/Book')
const Read = () => import('pages/Read')
const Home = () => import('pages/Home')
const Myshelf = () => import('pages/Myshelf')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Myshelf',
      component: Myshelf
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/book/:id',
      name: 'book',
      component: Book
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/categoryList',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/read/:id',
      name: 'Read',
      component: Read
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },    
  ]
})

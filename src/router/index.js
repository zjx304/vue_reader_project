import Vue from 'vue'
import Router from 'vue-router'
const Rank = () => import('pages/Rank')
const Category = () => import('pages/Category')
const CategoryList = () => import('pages/CategoryList')
const Book = () => import('pages/Book')
const Read = () => import('pages/Read')
const Home = () => import('pages/Home')
const Myshelf = () => import('pages/Myshelf')
const List = () => import('pages/List')
const Search = () => import('pages/Search')
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
      name: 'Book',
      component: Book
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      // 注意params传递参数，需要在路由中相应配置，query则不用
      // 在返回的时候，如果路由没有配置相应的major,即：path: '/categoryList'   则返回的时候this.$route.params.major获取到的是undefined 
      // 需要配置为path: '/categoryList/:major', 则返回的时候才能获取到this.$route.params.major的值
      path: '/categoryList/:major',
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
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },   
    {
      path:'/search',
      name:'Search',
      component:Search
    }
  ]
})

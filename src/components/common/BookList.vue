<template>
  <section class="book-list" >
    <ul class="book-list-content">
      <li v-for="(book) in bookList" :key="book._id">
        <div class="book-list-lft"></div>
        <div class="book-list-right">
          <h3>{{book.title}}</h3>
          <div class="book-des">
            {{book.shortIntro}}
          </div>
          <div class="book-info">
            <div class="author">{{book.author}}</div>
            <div class="label">
              
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import http from '@/http/api'
export default {
  name:'BookList',
  props: {
    bookList: Array
  },
  data(){
    return{

    }
  },
  created(){
    
  },
  watch: {

	},
  methods:{

  },
}
</script>

<style lang="scss" scoped>

</style>


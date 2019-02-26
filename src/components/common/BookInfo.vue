<template>
  <section class="book-info" v-if="book !== null">
    <div class="book-detail">
      <!-- <img class="book-cover fl" :src="cover" :alt="book.title"> -->
      <div class="book-desc">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-meta red">{{ book.author }}|仙侠</p>
        <p class="book-meta">{{ book.majorCate }}/{{ book.minorCate }}</p>
      </div>
      <div class="book-recommend">
        <div class="book-score">7.9分</div>
        <div class="book-keep">用户留存</div>
        <div class="book-hot">人气</div>
      </div>
      <div class="book-menu">
        <router-link :to="{ name: 'Read', params: { id: book._id }, query: { menu: true } }">
          <div class="menu-title">目录</div>
          <p class="menu-content">
            {{ book.updated}}
            <span class="split-dot">·</span> {{ book.lastChapter }}
          </p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import http from '@/http/api'
import {mapState, mapMutations} from 'vuex';
export default {
  name:'bookinfo',
  data(){
    return{
      book:null
    }
  },
  computed:{
    ...mapState([
			'currentBook'
		]),
  },
  methods:{
    ...mapMutations([
			'setCurrentBookInfo'
		]),
  },
  created(){
    http.getBook(this.currentBook.id)
     .then(data=>{
       this.book=data
       console.log(data)
     })
  }
}
</script>

<style lang="scss" scoped>

</style>


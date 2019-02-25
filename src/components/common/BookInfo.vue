<template>
  <section class="book-info" v-if="book !== null">
    <div class="book-detail">
      <!-- <img class="book-cover fl" :src="cover" :alt="book.title"> -->
      <div class="book-desc">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-meta red">{{ book.author }}</p>
        <p class="book-meta">{{ book.majorCate }}/{{ book.minorCate }}</p>
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


<template>
  <section class="book-bar">
    <div class="book-bar-content">
      <div class="book-bar-left book-bar-item" @click="addBookToShelf(current_book)">
        加入书架
      </div>
      <div class="book-bar-right book-bar-item">
        <router-link class="book-bar-right-text" :to="{ name: 'Read', params: { id: current_book.id }}">
          立刻阅读
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name:'book-bar',
  data(){
    return{

    }
  },
  computed:{
    ...mapState([
        'current_book'
    ])    
  },
  methods:{
    ...mapMutations([
      'addToShelft'
    ]),
    addBookToShelf(book){
      this.addToShelft(book)
    }
  }
}
</script>
<style lang="scss" scoped>
.book-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  .book-bar-content{
    height: 1.15rem;
    display: flex;
    justify-content: space-between;
    .book-bar-item{
      flex: 0 0 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .32rem;
    }
    .book-bar-left{
      border-top: 1px solid #ececec;
    }
    .book-bar-right{
      background: #ed424b;
      border-top-color: #ed424b;
      .book-bar-right-text{
        color: #fff;
      }
    }
  }

}
</style>


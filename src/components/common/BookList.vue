<template>
  <section class="book-list" >
    <ul class="book-list-content">
      <li v-for="(book) in bookList" :key="book._id">
        <router-link :to="{name:'book',params:{id:book._id}}">
          <div class="book-list-box">
            <div class="book-list-left">
              <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1642072250,2261007888&fm=58" alt="">
            </div>
            <div class="book-list-right">
              <h3 class="book-name" >{{book.title}}</h3>
              <div class="book-des">
                {{book.shortIntro}}
              </div>
              <div class="book-info">
                <div class="author">{{book.author}}</div>
                <div class="label">
                  
                </div>
              </div>
            </div>
          </div>

        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import http from '@/http/api'
export default {
  name:'booklist',
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

.book-list-content{
  border-top:1px solid rgb(199, 199, 199);
  li{
    .book-list-box{
      box-sizing: border-box;
      height: 2.36rem;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      padding:0 .25rem;
      padding-top: .3rem;
      .book-list-left{
        width: 1.46rem;
        height: 2.1rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .book-list-right{
        width: 5.23rem;
        text-align: left;
        .book-name{
          color: #333;
          font-weight: bold;
          font-size: .3rem;
        }
        .book-des{
          color: #969ba3;
          overflow : hidden; 
          text-overflow: ellipsis; 
          display: -webkit-box; 
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical; 
          -webkit-line-clamp:2; 
        }
        .book-info{
          color: #969ba3;
          display: flex;
          justify-content: space-between;
        }
      }
    }

  }
}


</style>


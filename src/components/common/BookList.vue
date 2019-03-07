<template>
  <section class="book-list" >
    <ul class="book-list-content">
      <li v-for="(book) in bookList" :key="book._id">
        <router-link :to="{name:'Book',params:{id:book._id}}">
          <div class="book-list-box">
            <div class="book-list-left">
              <img :src="staticPath+book.cover" alt="">
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
import {staticPath} from '../../assets/js/storage_function.js';
export default {
  name:'booklist',
  props: {
    bookList: Array
  },
  data(){
    return{
      staticPath:staticPath
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
  li{
    .book-list-box{
      // width: 5.94rem;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      padding:.15rem .25rem;
      .book-list-left{
        // width: 1.16rem;
        flex:0 0 1.16rem;
        height: 1.69rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .book-list-right{
        flex:1;
        padding-left: .15rem;
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
          font-size: .25rem;
        }
        .book-info{
          color: #969ba3;
          display: flex;
          justify-content: space-between;
          font-size: .2rem;
        }
      }
    }

  }
}


</style>


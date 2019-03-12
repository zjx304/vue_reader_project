<template>
  <section class="book-list" >
    <ul class="book-list-content">
      <li v-for="(book,index) in bookList" :key="index">
        <router-link :to="{name:'Book',params:{id:book._id}}">
          <div class="book-list-box">
            <div class="book-list-left">
              <img :src="book.cover|setCover" alt="">
            </div>
            <div class="book-list-right">
              <h3 class="book-name" >{{index+1}}.{{book.title}}</h3>
              <div class="book-des">
                {{book.shortIntro}}
              </div>
              <div class="book-info">
                <div class="author"><i class="iconfont icon-yonghu"></i>{{book.author}}</div>
                <div class="label">
                  <span>{{book.majorCate}}</span>
                  <span class="lately-follower">{{book.latelyFollower|count_change_one}}人气</span>
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
  filters:{
    setCover(cover) {
        if(cover.indexOf(staticPath) > -1) {
            return cover;
        }
        return staticPath + cover;
    },
    count_change_one(val){
      return val > 10000 ? (val/ 10000).toFixed(1) + '万' : val;
    },
  },
  computed:{

  },
  mounted() {

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

.iconfont{
  font-size: .25rem;
}
.icon-yonghu{
  padding-right: .1rem;
}


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
          align-items: center;
          font-size: .2rem;
          .author{
            font-size: .24rem;
          }
          .label{
            font-size: .17rem;
            span{
              display: inline-block;
              font-size: .15rem;
              color: #777;
              text-align: center;
              height: .3rem;
              line-height: .3rem;
              border-radius: .15rem;
              background: #efeff4;
              padding:0 .1rem;
            }
            .lately-follower{
              margin-left: .1rem;
              background: #fdecec;
              color: #ef4f4d;
            }
          }
        }
      }
    }

  }
}


</style>


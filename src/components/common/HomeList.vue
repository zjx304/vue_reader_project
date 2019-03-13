<template>
  <section class="home-list">
    <div class="home-title">
      <span class="left">{{channel.title}}</span>
      <router-link :to="{ name: 'List', params: {id :channel._id,title:channel.title} }" class="red">
        <span class="right">查看更多<i class="iconfont icon-youjiantou"></i></span>
      </router-link>
    </div>
    <ul v-if="book_list">
      <li v-for="(book_item,index) in book_list" :key="index">
        <router-link :to="{name:'Book',params:{id:book_item.book._id}}">
          <div class="home-list-left">
            <img :src="book_item.book.cover" alt="">
          </div>
          <div class="home-list-right">
            <h4 class="book-name">{{book_item.book.title}}</h4>
            <p class="book-desc">{{book_item.book.shortIntro}}</p>
            <div class="book-info">
              <div class="author">{{book_item.book.author}}</div>
              <div class="label">
                <span>{{book_item.book.majorCate}}</span>
                <span>{{book_item.book.latelyFollower|count_change_one}}人气</span>
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
import {mapState,mapMutations} from 'vuex';
export default {
  name:'home-list',
  props:{
    channel:Object
  },
  data(){
    return{
      book_list:[]
    }
  },
  filters:{
    // 以万为单位保留1为小数
    count_change_one(val){
      return val > 10000 ? (val/ 10000).toFixed(1) + '万' : val;
    },
  },
  methods:{
    ...mapMutations([
      'saveListType'
    ]),
    getHomeListData(){
			http.getBooks(this.channel._id)
				.then(data => {
          this.book_list=data
        })
		}
  },
  created(){
    this.getHomeListData()
    this.saveListType('home')
  }
}
</script>
<style lang="scss" scoped>
.home-list{
  // border-bottom: .13rem solid #f4f4f4;
  .home-title{
    height: .97rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding:0 .26rem;
    border-bottom: 1px solid #f4f4f4;
    .left{
      font-size: .29rem;
    }
    .right{
      font-size: .23rem;
      color: #969ba3;
      display: flex;
      align-items: center;
      .iconfont{
        font-size: .3rem;
      }
    }
  }
  ul{
    li{
      a{
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding:.26rem .26rem .16rem .26rem;
        .home-list-left{
          width: 1.46rem;
          height: 1.94rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .home-list-right{
          width:5.28rem;
          color:#333;
          .book-name{
            font-size: .28rem;
            margin-top: .08rem;
          }
          .book-desc{
            font-size: .24rem;
            line-height: .3rem;
            margin-top: .2rem;
            color: #969ba3;
            overflow : hidden; 
            text-overflow: ellipsis; 
            display: -webkit-box; 
            -webkit-line-clamp: 2; 
              /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */; 
            -webkit-line-clamp:2; 
          }
          .book-info{
            margin-top: .22rem;
            display: flex;
            justify-content: space-between;
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
            }
          }
        }
      }
    }
  }
}
</style>


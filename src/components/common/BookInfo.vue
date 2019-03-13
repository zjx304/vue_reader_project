<template>
  <section class="book-info" v-if="book !== null">
    <div class="book-detail gray">
      <div class="book-desc">
        <div class="book-left">
          <img :src="staticPath+book.cover" alt="">
        </div>
        <div class="book-right">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-meta red"><span>{{ book.author }}</span></p>
          <p class="book-meta gray">{{ book.majorCate }}<span class="separate">|</span>{{ book.minorCate }}</p>
          <p class="book-meta gray">{{book.wordCount|count_change}}字<span class="separate">|</span>{{ book.isSerial ? '连载中' : '完结'}}</p>
        </div>
      </div>
      <div class="book-recommend gray">
        <div class="book-score"><div><span class="big">{{book.rating.score|num_fixed_two}} </span><v-star :num="book.rating.score" :sub=2></v-star></div><div  class="small">{{book.rating.count|count_change_one}}人评分</div></div>
        <div class="book-keep"><div class="big">{{ book.retentionRatio }}%</div><div class="small">读者留存</div></div>
        <div class="book-hot"><div class="big">{{ book.latelyFollower|count_change_one}}</div><div class="small">追书人气</div></div>
      </div>
      <div class="book-introduction">
        <h3>简介</h3>
        <p class="book-long-introduce" :class="[!spread_intro?'ellipsis':'']" @click="spredIntroduction()">{{book.longIntro}}</p>
      </div>
      <div class="book-menu">
        <router-link :to="{ name: 'Read', params: { id: book._id }, query: { menu: true } }">
          <div class="book-menu-box">
            <div class="menu-title gray">目录</div>
            <p class="menu-content">
              {{ book.updated | time }}
              <span class="split-dot"></span> {{ book.lastChapter }}
              <i class="iconfont icon-iconfonti"></i>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import http from '@/http/api'
import moment from 'moment';
import {mapState, mapMutations} from 'vuex';
import {staticPath} from '../../assets/js/storage_function';
import Star from './Star'
export default {
  name:'bookinfo',
  components:{
    'v-star':Star
  },
  data(){
    return{
      book:null,
      staticPath:staticPath,
      spread_intro:false
    }
  },
  filters:{
    // 以万为单位显示
    count_change(val){
      return val > 10000 ? parseInt(val/ 10000) + '万' : val;
    },
    // 以万为单位保留1为小数
    count_change_one(val){
      return val > 10000 ? (val/ 10000).toFixed(1) + '万' : val;
    },
    // 保留1位小数
    num_fixed_two(val){
      return val.toFixed(1)
    },
		time(updated) {
			moment.locale('zh-cn');
			return moment(updated).fromNow();
		}
  },
  computed:{
    ...mapState([
			'current_book'
    ]),
  },
  methods:{
    ...mapMutations([
			'setCurrentBookInfo'
    ]),
    spredIntroduction(){
      this.spread_intro=!this.spread_intro
    }
  },
  created(){
    http.getBook(this.current_book.id)
     .then(data=>{
       this.book=data
       let book_data=this.current_book
       book_data.id=this.current_book.id
       book_data.title=data.title
       book_data.cover=staticPath+data.cover
       book_data.author=data.author
       book_data.lastChapter=data.lastChapter
       book_data.updated=data.updated
        //  保存书籍信息
        this.setCurrentBookInfo(book_data)
     })
  }
}
</script>

<style lang="scss" scoped>

.red{
  color:#EE4341;
}
.gray{
  color:#636466;
}




// 三行省略
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:3;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
   /* autoprefixer: on */
}



.book-info{
  .book-detail{
    box-sizing: border-box;
    padding:0 .42rem;
    border-bottom: .17rem solid #f4f4f4;
    .book-desc{
      display: flex;
      .book-left{
        width: 1.66rem;
        height: 2.22rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .book-right{
        margin-left: .35rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding:.15rem 0;
        .book-title{
          font-weight: bold;
          font-size: .33rem;
        }
        .book-meta{
          font-size: .26rem;
          .separate{
            margin:0 .14rem;
          }
        }
      }
    }
    .book-recommend{
      width: 6.53rem;
      height: .8rem;
      margin:0 auto;
      margin-top: .61rem;
      position: relative;
      .book-score{
        position: absolute;
        left:0;
        // width: 2.25rem;
        width: 1.7rem;
        &>div:first-child{
          display: flex;
          align-items: center;
          &>span:first-child{
            padding-right: .1rem;
          }
        }
        &>div:last-child{
          text-align: center;
        }
      }
      .book-keep{
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        margin:0 auto;
        width: 1.5rem;
        text-align: center;
      }
      .book-hot{
        position: absolute;
        right: 0;
        width: 1.5rem;
        text-align: center;
      }
      .small{
        font-size: .2rem;
        line-height: .2rem;
        margin-top: .1rem;
      }
      .big{
        font-size: .35rem;
        line-height: .5rem;
        height: .5rem;
      }
    }
    .book-introduction{
      font-size: .31rem;
      margin-top: .64rem;
      h3{
        font-size: .31rem;
      }
      .book-long-introduce{
        line-height: .4rem;
        margin-top: .2rem;
      }
    }
    .book-menu{
      border-top: 1px solid #ececec;
      margin-top: .6rem; 
      height: .93rem;
      line-height: .93rem;
      font-size: .31rem;
      .book-menu-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .menu-title{

        }
        .menu-content{
          position: relative;
          padding-right: .2rem;
          color: #9b9ba3;
          font-size: .24rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          flex:0 0 70%;
          .icon-iconfonti{
            position: absolute;
            right:0;
            top:0;
          }
        }
      }
    }
  }
}
</style>


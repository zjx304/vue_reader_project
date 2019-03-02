<template>
  <section class="book-info" v-if="book !== null">
    <div class="book-detail gray">
      <div class="book-desc">
        <div class="book-left">
          <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3100606169,1664729282&fm=58" alt="">
        </div>
        <div class="book-right">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-meta red"><span>{{ book.author }}</span><span class="separate">|</span><span>仙侠</span></p>
          <p class="book-meta gray">{{ book.majorCate }}<span class="separate">|</span>{{ book.minorCate }}</p>
          <p class="book-meta gray">752万字<span class="separate">|</span>连载中</p>
        </div>
      </div>
      <div class="book-recommend gray">
        <div class="book-score">7.9分</div>
        <div class="book-keep"><div class="big">33.66%</div><div class="small">读者留存</div></div>
        <div class="book-hot"><div class="big">1841</div><div class="small">追书人气</div></div>
      </div>
      <div class="book-introduction">
        <h3>简介</h3>
        <p>{{book.longIntro}}</p>
      </div>
      <div class="book-menu">
        <router-link :to="{ name: 'Read', params: { id: book._id }, query: { menu: true } }">
          <div class="book-menu-box">
            <div class="menu-title gray">目录</div>
            <p class="menu-content">
              <!-- {{ book.updated}} -->
              <span class="split-dot"></span> {{ book.lastChapter }}
            </p>
          </div>
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
			'current_book'
		]),
  },
  methods:{
    ...mapMutations([
			'setCurrentBookInfo'
		]),
  },
  created(){
    http.getBook(this.current_book.id)
     .then(data=>{
       this.book=data
       console.log(data)
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
      height: .76rem;
      margin:0 auto;
      margin-top: .61rem;
      position: relative;
      .book-score{
        position: absolute;
        left:0;
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
        line-height: .35rem;
        
      }
    }
    .book-introduction{
      font-size: .31rem;
      margin-top: .64rem;
      h3{
        font-size: .31rem;
      }
      &>p{
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
          color: #9b9ba3;
          font-size: .24rem;
        }
      }
    }
  }
}
</style>


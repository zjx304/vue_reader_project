<template>
  <section class="recommend" v-if="recommend_list.length">
    <div class="recommend-content">
      <div class="recommend-title">本书追友还在读</div>
      <ul class="recommend-list">
        <li class="recomend-item" v-for="(recommend_list,index) in recommend_list" :key="index" v-if="index<4">
          <img class="cover" :src="staticPath+recommend_list.cover" alt="">
          <div class="book-name ellipsis">{{recommend_list.title}}</div>
          <div class="has-read">{{recommend_list.retentionRatio}}%读过</div>
        </li>
      </ul>
      <div class="show-more">
        <router-link :to="{ name: 'List', params: {id :current_book.id} }" class="red">
          <span>查看更多</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import http from '@/http/api'
import {mapState,mapMutations} from 'vuex';
import {staticPath} from '../../assets/js/storage_function';
export default {
  name:'recommend',
  data(){
    return{
      recommend_list:[],
      staticPath:staticPath
    }
  },
  computed:{
    ...mapState([
        'current_book'
    ])    
  },
  methods:{
    ...mapMutations([
      'saveListType'
    ]),
  },
  created(){
    // 限制4条
    http.getRecommend(this.current_book.id)
      .then(data => {
          this.recommend_list = data;
          // console.log(this.recommend_list )
      })
    this.saveListType('book')
  }
}
</script>

<style lang="scss" scoped>
.red{
  color:#ee4745;
}

.ellipsis{
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.recommend{
  box-sizing: border-box;
  border-bottom: .17rem solid #f4f4f4;
  margin-bottom: 1.15rem;
  .recommend-content{
    .recommend-title{
      padding: 0 .47rem;
      height: .93rem;
      line-height: .93rem;
      font-size: .31rem;
      color: #636466;
    }
    .recommend-list{
      display: flex;
      justify-content: space-between;
      padding: .3rem .47rem;
      border-top: 1px solid #ececec;
      .recomend-item{
        width: 1.49rem;
        font-size: .24rem;
        .cover{
          width: 1.49rem;
          height: 1.99rem;
        }
        .book-name{
          color: #636466;
        }
        .has-read{
          color: #8a8a8f;
        }
      }
    }
    .show-more{
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      border-top: 1px solid #ececec;
    }
  }
}
</style>


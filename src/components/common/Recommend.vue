<template>
  <section class="recommend">
    <div class="recommend-content">
      <div class="recommend-title">本书追友还在读</div>
      <ul class="recommend-list">
        <li class="recomend-item" v-for="(recommend_list,index) in recommend_list" :key="index" v-if="index<4">
          <img class="cover" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1527567554,3451379786&fm=27&gp=0.jpg" alt="">
          <div class="book-name">{{recommend_list.title}}</div>
          <div class="has-read">{{recommend_list.retentionRatio}}%读过</div>
        </li>
      </ul>
      <div class="show-more red">查看更多</div>
    </div>
  </section>
</template>

<script>
import http from '@/http/api'
import {mapState} from 'vuex';
export default {
  name:'recommend',
  data(){
    return{
      recommend_list:[]
    }
  },
  computed:{
    ...mapState([
        'current_book'
    ])    
  },
  methods:{

  },
  created(){
    // 限制4条
    http.getRecommend(this.current_book.id)
      .then(data => {
          this.recommend_list = data;
          console.log(this.recommend_list )
      })
  }
}
</script>

<style lang="scss" scoped>
.red{
  color:#ee4745;
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


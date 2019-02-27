<template>
  <section class="comment">
    <div class="comment-title gray">
      <span>热门短评</span>
    </div>
    <ul class="comment-list">
      <li v-for="(comment_item,index) in comment_list" :key="index">
        <div class="comment-man">
          <div>
            <span class="avatar"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1527567554,3451379786&fm=27&gp=0.jpg" alt=""></span>
            <span class="name less-gray">{{comment_item.author.nickname}}</span>
            <span class="rank">Lv{{comment_item.author.lv}}</span>
          </div>
          <div class="star">{{comment_item.rating}}</div>
        </div>
        <p class="content">
          {{comment_item.content}}
        </p>
        <div class="comment-bottom">
          <span class="time">{{comment_item.updated}}</span>
          <span class="praise">{{comment_item.helpful.total}}</span>
        </div>
      </li>
    </ul>
    <div class="show-more red">查看更多</div>
  </section>
</template>

<script>
import http from '@/http/api'
import {mapState} from 'vuex';
export default {
  name:'comment',
  computed:{
    ...mapState([
      'currentBook'
    ])
  },
  data(){
    return{
      comment_list:[]
    }
  },
  created(){
    http.getReview(this.currentBook.id)
      .then(data => {
          this.comment_list=data
          console.log(data)
      })
  }
}
</script>

<style lang="scss" scoped>
.gray{
  color:#636466;
}
.less-gray{
  color: #8a8a8f;
}
.red{
  color:#ee4745;
}
.comment{
  padding: 0 .47rem;
  box-sizing: border-box;
  border-bottom: .17rem solid #f4f4f4;

  .comment-title{
    height: .93rem;
    line-height: .93rem;
    font-size: .31rem;
  }
  .comment-list{
    li{
      // padding:.275rem 0;
      padding-top: .275rem;
      border-top: 1px solid #ececec;
      .comment-man{
        &>div:first-child{
          display: flex;
          align-items: center;
          .avatar{
            img{
              width: .53rem;
              height: .53rem;
              border-radius: 50%;
            }
          }
          .name{
            margin-left:.15rem;
          }
          .rank{
            display: block;
            padding: 0 .1rem;
            border-radius: .2rem;
            box-sizing: border-box;
            border:1px solid #ececec;
            margin-left:.15rem;
            color: #cfcfcf;
            font-size: .24rem;
            height: .35rem;
            line-height: .35rem;

          }
        }
        .star{
          margin: .16rem 0;
        }
      }
      .content{
        color: #49494d;
      }
      .comment-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #cfcfcf;
        height: .8rem;
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
</style>


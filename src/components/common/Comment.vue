<template>
  <section class="comment" v-if="comment_list.length">
    <div class="comment-title gray">
      <span>热门短评</span>
    </div>
    <ul class="comment-list">
      <li v-for="(comment_item,index) in comment_list" :key="index">
        <div class="comment-man">
          <div>
            <span class="avatar"><img :src="staticPath+comment_item.author.avatar" alt=""></span>
            <span class="name less-gray">{{comment_item.author.nickname}}</span>
            <span class="rank">Lv{{comment_item.author.lv}}</span>
          </div>
          <div class="star"><v-star :num="comment_item.rating" :sub=1></v-star></div>
        </div>
        <p class="content ellipsis">
          {{comment_item.content}}
        </p>
        <div class="comment-bottom">
          <div class="time">{{comment_item.updated|time}}</div>
          <div class="praise" @click="praise(comment_item._id)">
            <template v-if="comment_item.state=='normal'">
              <i class="iconfont icon-zan"></i>
              {{comment_item.helpful.yes}}
            </template>
            <template v-else>
              <i class="iconfont icon-zan red"></i>
              {{comment_item.helpful.yes+1}}
            </template>
          </div>
        </div>
      </li>
    </ul>
    <!-- <div class="show-more red">查看更多</div> -->
  </section>
</template>

<script>
import http from '@/http/api'
import {mapState} from 'vuex';
import moment from 'moment';
import {staticPath} from '../../assets/js/storage_function';
import Star from './Star'
export default {
  name:'comment',
  components:{
    'v-star':Star
  },
  computed:{
    ...mapState([
      'current_book'
    ]),

  },
  filters:{
    time(updated) {
			moment.locale('zh-cn');
			return moment(updated).fromNow();
		},
    star(val){
      const CLASS_ON = 'on'
      const CLASS_HALF = 'half'
      const CLASS_OFF = 'off'
      var star=val
      var star_arr = []
      // 向star_arr添加CLASS_ON
      var star_integer = Math.floor(star)
      for (let i = 0; i < star_integer; i++) {
        star_arr.push(CLASS_ON)
      }
      // 向star_arr添加CLASS_HALF
      if(star-star_integer>=0.5) {
        star_arr.push(CLASS_HALF)
      }
      // 向star_arr添加CLASS_OFF
      while(star_arr.length<5) {
        star_arr.push(CLASS_OFF)
      }
      return star_arr
    }
  },
  data(){
    return{
      comment_list:[],
      staticPath:staticPath
    }
  },
  created(){
    http.getReview(this.current_book.id)
      .then(data => {
          this.comment_list=data
      })
  },
  methods:{
    praise(id){
      this.comment_list.forEach(function(val){
        if(val._id==id){
          val.state='unormal'
        }
      })
    }
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


// 三行省略
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:4;
    /*! autoprefixer: off */
  -webkit-box-orient: vertical;
   /* autoprefixer: on */;
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
    font-size: .28rem;
    .iconfont{
      font-size: .25rem;
    }
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
        .praise{
          padding-right: .1rem;
          // flex:0 0 1.4rem;
          .icon-zan{
            padding-right: .1rem;
          }
        }
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


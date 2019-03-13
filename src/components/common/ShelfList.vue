<template>
  <section class="shelf-list">
    <ul>
      <li v-for="shelf_item in shelfList" :key="shelf_item._id">
        <router-link :to="{ name: 'Read', params: { id: shelf_item.id }}">
          <div class="avatar">
            <img :src="shelf_item.cover">
          </div>
          <div class="book-info">
            <h4>{{shelf_item.title}}<span class="time">{{shelf_item.updated | time}}</span></h4>
            <p class="author">{{ shelf_item.author }}&nbsp;&nbsp;著</p>
            <p class="last-chapter">连载至：&nbsp;&nbsp;{{shelf_item.lastChapter }}</p>
          </div>
          <!-- 在router-link内要想使用点击事件 需要 在里面 .stop.prevent-->
          <!-- 若是想要在router-link 所在标签上添加点击事件 需要 .native -->
          <div class="delete" @click.stop.prevent="showDialog(shelf_item.id)"><i class="iconfont icon-shanchu"></i></div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import http from '@/http/api'
import moment from 'moment';
import { MessageBox } from 'mint-ui';
import {mapState, mapMutations} from 'vuex';
export default {
  name:'shelf_list',
  props:{
    shelfList:Array
  },
  data(){
    return{

    }
  },
  // 使用filter处理时间 为小时
  filters: {
    // 使用moment插件处理时间
		time(updated) {
			moment.locale('zh-cn');
			return moment(updated).fromNow();
		}
  },
  methods:{
    ...mapMutations([
      'deleteFromShelft'
    ]),
    showDialog(book_id){
      MessageBox({
        title: '温馨提示',
        message: '确定要从书架中删除？',
        showCancelButton: true,
        confirmButtonClass:'mint-confirm-btn'  //设置确定按钮样式
      }).then(action => { 
       if (action == 'confirm') {     //确认的回调
        this.deleteFromShelft(book_id)
       }
       }).catch(err => { 
        if (err == 'cancel') {     //取消的回调
          console.log('取消');
        } 
       })

    }
  },
  created(){
    
  }
  
}
</script>

<style lang="scss" scoped>




.delete{
  font-size: .2rem;
  display: flex;
  align-items: center;
  .iconfont{
    color: #33373d;
    font-size: .3rem;
  }
}

.shelf-list{
  ul{
    li{
      margin:0 auto;
      box-sizing: border-box;
      padding:.2rem 0;
      border-bottom: 1px solid #ebebeb;
      width: 6.92rem;
      a{
        width: 100%;
        // box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .avatar{
          // width: 1.4rem;
          // height: 2rem;
          width: .94rem;
          height: 1.32rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .book-info{
          width: 5rem;
          h4{
            font-size: .28rem;
            font-weight: bold;
            color: #000;
            display: flex;
            align-items: center;
            .time{
              margin-left: .1rem;
              display: inline-block;
              font-size: .15rem;
              height: .25rem;
              line-height: .25rem;
              color: #949494;
              border:1px solid #949494;
              padding:0 .1rem;
              border-radius: .125rem;
              box-sizing: border-box;
              font-weight:normal
            }
          }
          .author{
            font-size: .24rem;
            color: #33373d;
          }
          .last-chapter{
            font-size: .24rem;
            color: #33373d;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
          }
        }
      }
    }
  }
}
</style>

<template>
  <section class="shelf-list">
    <div>书架列表</div>
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
          <div class="delete" @click.stop.prevent="showDialog(shelf_item.id)">删除</div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
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
      MessageBox.confirm('确定要从书架中删除？', '温馨提示').then(action => { 
       if (action == 'confirm') {     //确认的回调
        console.log(1); 
        this.deleteFromShelft(book_id)
       }
       }).catch(err => { 
        if (err == 'cancel') {     //取消的回调
          console.log('取消');
        } 
       })
  }
  }
  
}
</script>

<style lang="scss" scoped>
.shelf-list{
  ul{
    li{
      a{
        width: 100%;
        box-sizing: border-box;
        padding:0 .29rem;
        display: flex;
        justify-content: space-between;
        .avatar{
          width: 1.4rem;
          height: 2rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

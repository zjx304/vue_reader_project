<template>
  <section class="rank">
    <v-header :title="title" :type="type"></v-header>
    <mt-navbar v-model="selected">
      <mt-tab-item class="gray" :id="item.en" v-for="(item,index) in top_tab_item" :key="index">
        {{item.ch}}
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item :id="item.en" v-for="(item,index) in top_tab_item" :key="index">
        <div class="rank-box">
          <ul class="rank-tab-list">
            <li v-for="left_tab_item in leftTab(item.en)" :key="left_tab_item._id" @click="changeRankId(left_tab_item._id)">
              <span>{{left_tab_item.shortTitle}}</span>
            </li>
          </ul>
          <div class="rank-book-list">
            <v-book-list :book-list="book_list"></v-book-list>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <v-tab-bar></v-tab-bar>
  </section>
</template>

<script>
import http from '../http/api'
import Header from '../components/common/Header'
import TabBar from '../components/common/TabBar'
import BookList from 'components/common/BookList'

export default {
  name:'Rank',
  components:{
    'v-book-list':BookList,
    'v-tab-bar':TabBar,
    'v-header':Header
  },
  data () {
    return {
      title:'排行',
      type:'type-two',
      data:Object,
      selected:'male', //默认显示第一个选项卡的内容  需要和id绑定
      male_rank_list:[],
      top_tab_item:[
        {en:'male',ch:'男频'},
        {en:'female',ch:'女频'},
        {en:'epub',ch:'出版'},
        {en:'picture',ch:'漫画'},
      ],
      book_list:[],
      rank_book_id:[]
      
    }
  },
  created(){
    this.getRankTab()
  },
  computed:{
    leftTab(){
      return (index)=>{
        return this.data[index]
      }
    }
  },
  watch:{
    //改变rank_book_id获取排行图书列表
    rank_book_id(){
      // 重设bookList为空
      this.book_list = []
      http.getRankBooks(this.rank_book_id)
        .then(data=>{
          this.book_list = data.ranking.books
        })
    },
    // 当tab栏滑动时改变rank_book_id
    selected(){
      this.book_list = []
      this.rank_book_id=this.data[this.selected][0]._id
      http.getRankBooks(this.rank_book_id)
        .then(data=>{
          this.book_list = data.ranking.books
        })
    }
  },
  methods:{
    // 获取排行列表的选项卡和设置rank_id
    getRankTab(){
      http.getRanks()
        .then(data=>{
          this.data=data
          this.male_rank_list = data.male;
          this.rank_book_id = this.male_rank_list[0]._id;

        })
    },
    changeRankId: function(rank_book_id) {
			this.rank_book_id = rank_book_id;
		}

  }
}
</script>

<style lang="scss" scoped>
.gray{
  color:#8a8a8f;
}
.red{
  color:#ee4745;
}
.border-color{
  color:#f5f5f5;
}
.rank{
  margin-top: .9rem;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  .mint-navbar{
    .is-selected{
      color:#ee4745;
      margin-bottom: 0;
      border:none;
    }
    .mint-tab-item{
      padding:.25rem 0;
      font-size: .26rem;
    }

  }
}




.rank-box{
  display: flex;
  justify-content: space-between;
  .rank-tab-list{
    flex:0 0 1.48rem;
    li{
      height: .55rem;
      width: 100%;
      position: relative;
      text-align: center;
      border-top: 1px solid #f5f5f5;
      &>span{
        text-align: center;
        font-size: .26rem;
      }
    }
    li:first-child{
      border-top: none;
    }
  }
  .rank-book-list{
    // flex:1;
    position: fixed;
    width: 5.625rem;
    top:1.64rem;
    right: 0;
    bottom:1.2rem;
    overflow-y: scroll;
  }
}
</style>


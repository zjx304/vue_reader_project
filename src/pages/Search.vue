<template>
  <section class="search">
    <div class="header">
      <div @click="$router.go(-1)">back</div>
      <div class="search-input">
        <input type="text" placeholder="热门推荐" ref="search_input">
        <span class="search-clear" @click="clearInput()">X</span>
      </div>
      <div class="search-btn" @click="searchWord()">搜索</div>
    </div>
    <v-book-list :book-list="search_books" v-if="search_books.length>0"></v-book-list>
    <div class="search-info" v-else>
      <div class="search-hot">
        <h4>热门搜索</h4>
        <ul>
          <li v-for="(word,index) in hot_keywords" :key="index" >
            <span @click="searchWord(word.word)">{{word.word}}</span>
          </li>
        </ul>
      </div>
      <div class="search-history" v-if="search_history">
        <div class="search-history-header">
          <h4>历史搜索</h4>
          <span @click="clearSearchHistory()">删除历史记录</span>
        </div>
        <ul>
          <li v-for="(word,index) in search_history" :key="index">
            <span @click="searchWord(word)">{{word}}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import http from '../http/api'
import {mapState,mapMutations} from 'vuex';
import BookList from '../components/common/BookList'
export default {
  name:'search',
  components:{
    'v-book-list':BookList
  },
  data(){
    return{
      hot_keywords:[],
      search_books:[]
    }
  },
  computed:{
		...mapState([
      // 搜索历史记录数组
			'search_history'
		])    
  },
  methods:{
    ...mapMutations([
      // 保存历史记录
      'setSearchHistory',
      // 删除历史记录
			'deleteSearchHistory'
		]),
    getHotWord(){
      http.getSearchHotKeywords()
        .then(data => {
          // 取20个
          this.hot_keywords = data.slice(0, 19);
        })
    },
    searchWord(keyword){
      if(this.$refs.search_input.value){
        var word=this.$refs.search_input.value
      }else{
        var word=keyword
        this.$refs.search_input.value=word
      }
      // 保存搜索记录到localstorage
      this.setSearchHistory(word);
      http.searchByKeyword(word)
				.then(data => {
          this.search_books = data;
				})
    },
    // 清除input框
    clearInput(){
      this.$refs.search_input.value=''
      this.search_books=[]
    },
    clearSearchHistory(){
      // 清除localstorage的搜索记录
      this.deleteSearchHistory()
    }
  },
  created(){
    this.getHotWord()
  },
}
</script>

<style lang="scss" scoped>
.search{
  .header{
    width: 100%;
    height: .9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 .34rem;
    box-sizing: border-box;
    .search-input{
      position: relative;
      background: #E9EAEC;
      border-radius: .34rem;
      color: #CACBCD;      
      
      position: relative;
      input{
        display: block;
        width: 5.04rem;
        height: .69rem;
        background: transparent;
        border:none;
        font-size: .25rem;
        text-indent: .3rem;
        line-height: .69rem;
        outline: none;
        border:none;
      }
      .search-clear{
        position: absolute;
        right: 0;
        top:50%;
        transform: translateY(-50%);
      }
    }
    .search-btn{

    }
  }
  .search-info{
    margin:0 auto;
    width: 6.83rem;
    .search-hot{
      border-top: 1px solid #CACBCD; 
      padding-top: .44rem;  
      ul{
        li{
          display: inline-block;
          padding:0 .29rem;
          margin:.15rem;
          height: .54rem;
          line-height: .54rem;
          border-radius: .27rem;
          border: 1px solid #CACBCD; 

        }
      }
    }
    .search-history{
      padding-top: .44rem;  
      .search-history-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      ul{
        li{
          display: flex;
        }
      }
    }
  }
}
</style>

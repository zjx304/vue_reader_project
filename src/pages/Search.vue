<template>
  <section class="search">
    <div class="header">
      <div>
        <div @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></div>
        <div class="search-input">
          <input type="text" placeholder="斗罗大陆" ref="search_input">
          <span class="search-clear" @click="clearInput()"><i class="iconfont icon-guanbi"></i></span>
        </div>
        <div class="search-btn red" @click="searchWord()">搜索</div>
      </div>
    </div>
    <div class="search-list" v-if="show_search_books">
      <v-book-list :book-list="search_books" ></v-book-list>
    </div>
    <div class="search-info" v-else>
      <div class="search-hot">
        <h4>热门搜索</h4>
        <ul>
          <li v-for="(word,index) in hot_keywords" :key="index" >
            <span @click="searchWord(word.word)">{{word.word}}</span>
          </li>
        </ul>
      </div>
      <div class="search-history" v-if="search_history.length>0">
        <div class="search-history-header">
          <h4>历史搜索</h4>
          <span @click="clearSearchHistory()" class="gray" >删除历史<i class="iconfont icon-shanchu"></i></span>
        </div>
        <ul>
          <li v-for="(word,index) in search_history" :key="index">
            <span @click="searchWord(word)" class="gray"><i class="iconfont icon-lishi"></i>{{word}}</span>
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
      search_books:[],
      show_search_books:false
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
      this.show_search_books=true
      // 保存搜索记录到localstorage
      this.setSearchHistory(word);
      http.searchByKeyword(word)
				.then(data => {
          this.search_books = data;
				})
    },
    // 清除input框
    clearInput(){
      this.show_search_books=false
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
  mounted(){
    this.$nextTick(function(){
      this.$refs.search_input.focus()
    }) 
  },
  beforeRouteLeave(to, from, next) {
		if (this.show_search_books) {
      this.show_search_books=false
      this.$refs.search_input.value=''
		} else {
			next()
		}
	} 
}
</script>

<style lang="scss" scoped>

.red{
  color:#d72321;
}
.gray{
  color: #9c9ca4 !important;
}

.iconfont{
  font-size: .25rem;
}

.search{
  font-size: .28rem;
  .header{
    position: fixed;
    top:0;
    width: 100%;
    height: .9rem;
    background: #fff;
    display: flex;
    justify-content:center;
    align-items: center;
    &>div{
      width: 6.82rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #CACBCD; 
    }


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
        right: .1rem;
        top:50%;
        transform: translateY(-50%);
        font-size: .4rem;
        width: .4rem;
        height: .4rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .search-btn{

    }
  }
  .search-list{
    margin-top: .9rem;

  }
  .search-info{
    margin:0 auto;
    margin-top: .9rem;
    width: 6.83rem;
    .search-hot{
      // border-top: 1px solid #CACBCD; 
      h4{
        height: 1rem;
        line-height: 1rem;
      }
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
      .search-history-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4{
          height: 1rem;
          line-height: 1rem;
        }
        .icon-shanchu{
          padding-left: .1rem;
        }
      }
      ul{
        li{
          display: flex;
          .icon-lishi{
            padding-right: .1rem;
          }
        }
      }
    }
  }
}



</style>

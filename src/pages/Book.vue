<template>
  <section class="book"> 
    <v-header :title="title" :type="type"></v-header>
    <v-book-info></v-book-info>
    <v-comment></v-comment>
    <v-recommend></v-recommend>
    <v-book-bar></v-book-bar>
  </section>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import Header from '../components/common/Header'
import BookIfo from '../components/common/BookInfo'
import Comment from '../components/common/Comment'
import Recommend from '../components/common/Recommend'
import BookBar from '../components/common/BookBar'
export default {
  name:'book',
  components:{
    'v-book-info':BookIfo,
    'v-comment':Comment,
    'v-recommend':Recommend,
    'v-book-bar':BookBar,
    'v-header':Header
  },
  data(){
    return{
      title:'书籍详情',
      type:'type-three'
    }
  },
  computed:{
    ...mapState([
        'current_book',
        'shelf_book_list'
    ])
  },
  methods:{
    ...mapMutations([
			'setCurrentBookInfo'
		]),
  },
  created(){
    // 如果当前书籍已存在书架中，则书架中的书籍设置为当前书籍
    let isInShelf = false;
    for(let book of Object.values(this.shelf_book_list)) {
      if (book.id === this.$route.params.id) {
        isInShelf = true;
        this.setCurrentBookInfo(book);
        break;
      }
    }
    // 若不在书架，则重新创建current_book
    if(!isInShelf){
      this.setCurrentBookInfo({
        id: this.$route.params.id,	//书籍id
        title: '',					//书名
        cover: '',					//封面
        author: '',					//作者
        lastChapter: '',			//已更新的最新章节
        updated: '',				//更新时间
        readChapter: '',			//已读章节
        isInShelf: false,			//是否已在书架中，false：不在，true：在
        sort: false,					//目录顺序，false：正序， true：倒序
        readTime:''           //阅读时间
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.book{
  position: relative;
  margin-top: 1.4rem;
}
</style>


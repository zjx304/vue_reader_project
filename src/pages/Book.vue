<template>
  <section class="book">
    <v-book-info></v-book-info>
    <!-- <v-comment></v-comment> -->
    <!-- <v-recommend></v-recommend> -->
    <router-link :to="{ name: 'Read', params: { id: currentBook.id }}">
			<p class="book-bar-content">立即阅读</p>
		</router-link>
  </section>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import BookIfo from '../components/common/BookInfo'
import Comment from '../components/common/Comment'
import Recommend from '../components/common/Recommend'
export default {
  name:'book',
  components:{
    'v-book-info':BookIfo,
    'v-comment':Comment,
    'v-recommend':Recommend
  },
  computed:{
    ...mapState([
        'currentBook',
    ])
  },
  methods:{
    ...mapMutations([
			'setCurrentBookInfo'
		]),
  },
  created(){
    	this.setCurrentBookInfo({
				id: this.$route.params.id,	//书籍id
				title: '',					//书名
				cover: '',					//封面
				author: '',					//作者
				lastChapter: '',			//已更新的最新章节
				updated: '',				//更新时间
				readChapter: '',			//已读章节
				isInShelf: false,			//是否已在书架中，false：不在，true：在
				sort: false					//目录顺序，false：正序， true：倒序
			});
  }
}
</script>

<style>

</style>

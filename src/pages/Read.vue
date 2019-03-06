<template>
  <section class="read">
    <v-read-content :read-content="read_content" @show-chapter="showChapter()"></v-read-content>
    <v-chapter :chapter-name="chapter_name" :chapter-show="chapter_show" @select-chapter="selectChapterData"></v-chapter>
  </section>
</template>

<script>
import http from '../http/api'
import { MessageBox } from 'mint-ui';
import {mapState,mapMutations} from 'vuex';
import ReadCotent from '../components/common/ReadContent'
import Chapter from '../components/common/Chapter'
export default {
  name:'read',
  components:{
    'v-read-content':ReadCotent,
    'v-chapter':Chapter
  },
  data(){
    return{
      book_id:'',
      chapter_name:[],
      chapter_show:false,
      read_content:[],
      read_index:0,   //阅读到第几章
      from_menu:'',    //从目录进来
    }
  },
  computed:{
    ...mapState([
      'current_book'
    ])
  },
  watch:{
    // 监听章节和阅读到第几章变化
    chapter_name(){
      this.getChapterData(this.chapter_name[this.read_index].id)
    },
    read_index(){

    }
  },
  methods:{
    ...mapMutations([
      'setCurrentBookInfo',
      'addToShelft'
    ]),
    // 获取所有章节名
    getChapterName(book_id){
      http.getChapters(book_id)
        .then(data => {
          this.chapter_name=data
        })
    },
    // 获取特定章节内容
    getChapterData(chapter_id){
      http.getChapterContent(chapter_id)
        .then(data => {
          this.read_content.push({
						content_title: data.title,
						content_list: data.isVip ? ['vip章节，请到正版网站阅读'] : data.cpContent.split('\n')     //换行符分割文章
          });
          var aa=data.cpContent.split('\n')
        })
    },
    // ReadContent组件传出的是否显示章节
    showChapter(){
      this.chapter_show=true
    },
    selectChapterData(chapter_id){
      // 先清空原有书籍
      // this.readContent.splice(0, this.readContent.length);
      this.read_content=[]
      this.getChapterData(chapter_id)
      this.chapter_show=false
    },
  },
  created(){
    this.book_id=this.$route.params.id;
    this.getChapterName(this.book_id)
    if(this.$route.query.menu) {
			this.from_menu = true;
			this.chapter_show = true;
  }

  },
  beforeRouteLeave(to, from, next) {
		if (!this.current_book.isInShelf && !this.from_menu) {
           MessageBox.confirm('', { 
            title: '加入书架',
            message: '喜欢本书就加入书架吧',
            showCancelButton: true,
            cancelButtonText:'不用了',
            confirmButtonText:'加入书架'
         }).then(action => { 
         if (action == 'confirm') {     //确认的回调
            let book = this.current_book;
            book.isInShelf = true;
            this.setCurrentBookInfo(book)
            this.addToShelft(book)
            next()
        }
      }).catch(err => { 
        if (err == 'cancel') {     //取消的回调
          next()
        } 
      });
		} else {
			next()
		}
	} 
}
</script>

<style lang="scss" scoped>

</style>


<template>
  <section class="read">
    <v-read-content :read-content="read_content" @show-chapter="showChapter()" @next-chapter="nextChapter()"></v-read-content>
    <v-chapter :chapter-name="chapter_name" :chapter-show="chapter_show" @select-chapter="selectChapterData" @hide-chapter-emit="hideChater()"></v-chapter>
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
    // 监听选择的章节 
    chapter_name(){
      // if(this.current_book.readChapter !== ''){
      //   //遍历对象chapter_name 找出当前readChapter
      //   for (let [index, chapter] of Object.entries(this.chapter_name)) {
			// 		if (this.current_book.readChapter === chapter.id) {
			// 			this.read_index = index;
			// 			break;
			// 		}
			// 	}
      // }
      this.getChapterData(this.chapter_name[this.read_index].id)
    },
    // 历史记录中阅读到第几章节 无则从第一章开始
    // read_index(){
		// 	// let book = this.current_book;
		// 	// book.readChapter = this.chapter_name[this.read_index].id;
		// 	// this.setCurrentBookInfo(book);
    // }
  },
  methods:{
    ...mapMutations([
      'setCurrentBookInfo',
      'addToShelft',
      'saveReadHistory'
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
        })
    },
    // ReadContent组件传出的是否显示章节
    showChapter(){
      this.chapter_show=true
    },
    selectChapterData(chapter_id){
      // 先清空原有书籍
      this.read_content=[]
      this.getChapterData(chapter_id)
      this.chapter_show=false
      // 保存阅读章节id
      this.current_book.readChapter=chapter_id
      // 保存current_book到localstorage
    },
    hideChater(){
      // // 判断是否从book.vue进入目录
			if(this.from_menu) {
				this.$router.go(-1);
			}
			this.chapter_show = false;
    },
    // 加载下一章
    nextChapter(){
      if (this.read_index === this.chapter_name.length - 1) {
				return;
			}
      this.read_index++;
      this.getChapterData(this.chapter_name[this.read_index].id);

    }
  },
  created(){
    this.book_id=this.$route.params.id;

    this.getChapterName(this.book_id)
    // 判断是否从书籍详情进来，显示目录
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


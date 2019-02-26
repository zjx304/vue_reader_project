<template>
  <section class="read">
    <v-read-content :read-content="read_content"></v-read-content>
    <v-chapter :chapter-name="chapter_name" :chapter_show="chapter_show"></v-chapter>
  </section>
</template>

<script>
import http from '../http/api'
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
      read_index:0
    }
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
          console.log(data)
          this.read_content.push({
						content_title: data.title,
						content_list: data.isVip ? ['vip章节，请到正版网站阅读'] : data.cpContent.split('\n')     //换行符分割文章
          });
          var aa=data.cpContent.split('\n')
        })
    },
  },
  created(){
    this.book_id=this.$route.params.id;
    this.getChapterName(this.book_id)
  } 
}
</script>

<style>

</style>

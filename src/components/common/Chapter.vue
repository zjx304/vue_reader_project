<template>
  <section :class="['chapter',{'chapter-show':chapterShow}]">
    <div class="chapter-title">
      <span class="back" @click="hideChapter()"><i class="iconfont icon-fanhui"></i></span>
      <span class="book-name">{{current_book.title}}</span>
    </div>
    <div class="chapter-head">
      <span class="chapter-total">共{{chapterName.length}}章</span>
      <span class="chapter-sort" @click="chapterSort()">
        <span v-if="sort">倒序<i class="iconfont  icon-plus-select-up" :class="[sort?'reverse':'']"></i></span>
        <span v-else>正序<i class="iconfont  icon-plus-select-up" ></i></span>
      </span>
    </div>
    <div class="chapter-list-section">
      <div class="chapter-top">正文卷</div>
      <ul class="chapter-list">
        <li class="chapter-list-item" v-for=" chapter in chapterName" :key="chapter.id" @click="selectChapter(chapter.id)">
          <span :class="[{'gray':chapter.isVip}]" >{{chapter.title}}</span>
          <span v-if="chapter.isVip"><i class="iconfont  icon-vip"></i></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name:'chapter',
  props: {
    chapterName: Array,
    chapterShow:Boolean
  },
  data(){
    return{
      sort:true
    }
  },
  computed:{
    ...mapState([
			'current_book'
    ]),
  },
  methods:{
    // 排序
    chapterSort(){
      this.sort=!this.sort
      this.chapterName.reverse();  //数组reverse()
    },
    // 选择章节
    selectChapter(chapter_id){
      this.$emit('select-chapter', chapter_id);
    },
    hideChapter(){
      this.$emit('hide-chapter-emit');
    }
  }
}
</script>

<style lang="scss" scoped>


.icon-plus-select-up{
  display: inline-block;
  font-size: .25rem;
}
.icon-vip{
  font-size: .25rem;
}
.reverse{
   transform:rotate(180deg);
}
.gray{
  color:gray;
}
.icon-vip{
  color:gray;
}

.chapter{
  font-size: .28rem;
}

.chapter-title{
  height: .9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .back{
    position: absolute;
    left: .25rem;
    top:50%;
    transform: translateY(-50%);
  }
}

.chapter-show{
  transform: translateX(0) !important;
}
.chapter{
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  overflow: hidden;
  z-index: 9999;
  background-color: #fff;
  transform: translateX(-100%);
  transition: transform .15s;
  .chapter-head{
    padding:0 .4rem;
    height: .8rem;
    padding: 0 .4rem;
    line-height: .8rem;
    display: flex;
    justify-content: space-between;
    color: #33373d;
  }
  .chapter-list-section{
    .chapter-top{
      color: #969ba3;
      background-color: #f6f7f9;
      padding:0 .4rem;
      height: .72rem;
      line-height: .72rem;
      font-size: .3rem;
    }
    .chapter-list{
      position: absolute;
      top:2.4rem;
      left:0;
      right:0;
      bottom:0;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 0 .4rem;
      .chapter-list-item{
        padding: .3rem 0;
        font-size: .24rem;
        color: #33373d;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-top: 1px solid #f0f1f2;
        display: flex;
        justify-content:space-between;
        align-items: center;
      }
    }
  }
}



</style>


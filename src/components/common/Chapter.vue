<template>
  <section class="chapter" v-if="chapterShow">
    <div class="chapter-title"></div>
    <div class="chapter-head">
      <span>共xxx章</span>
      <span>正序</span>
      <span>倒叙</span>
    </div>
    <div>
      <ul>
        <li v-for=" chapter in chapterName" :key="chapter.id">
          {{chapter.title}}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name:'chapter',
  props: {
    chapterName: Array,
    chapterShow:Boolean
  },
}
</script>

<style>
.chapter{
  

}
</style>

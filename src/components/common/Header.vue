<template>
  <section class="header">
    <!-- 主页  搜索 -->
    <div class="type-one" v-show="type=='type-one'">
      <div class="input">
        <input type="text" class="search" @focus="jumpToSearch()">
      </div>
      <div class="category">
        <span>分类</span>
        <span>分类</span>
      </div>
    </div>
    <!-- 分类 排行 搜索 -->
    <mt-header class="type-two" v-show="type=='type-two'">
        <mt-button  slot="left">{{title}}</mt-button>
        <mt-button  slot="right" @click="jumpToSearch()">搜索</mt-button>
    </mt-header>
    <!-- 返回 标题 -->
    <mt-header class="type-three" :title="title" v-show="type=='type-three'">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
  </section>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  name:'Header',
  components:{
    Header
  },
  props:{
    type:String,
    title:String,
  },
  methods:{
    jumpToSearch(){
      this.$router.push({path:'/search'})
    },
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  top:0;
  width: 100%;
  height: .9rem;
  background: #fff;
  background: #a70a0a;
  z-index: 10;
  .type-one{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding:0 .27rem;
    box-sizing: border-box;
    .input{
      input{
        width: 5.06rem;
        height: .54rem;
        border-radius: .27rem;
        background: transparent;
        border:none;
        background: #fff;

      }
    }

  }

}
.mint-header{
  background: #a70a0a;
  height: .9rem;
}
</style>


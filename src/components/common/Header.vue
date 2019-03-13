<template>
  <section class="header">
    <!-- 主页  搜索 -->
    <div class="type-one" v-show="type=='type-one'">
      <div class="input">
        <input type="text" class="search" placeholder="斗罗大陆" @focus="jumpToSearch()">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="category">
        <router-link :to="{ name: 'Category' }">
          <span><i class="iconfont icon-fenlei1"></i></span>
          <span>分类</span>
        </router-link>
      </div>
    </div>
    <!-- 分类 排行 搜索 -->
    <mt-header class="type-two" v-show="type=='type-two'">
        <mt-button  slot="left">{{title}}</mt-button>
        <mt-button  slot="right" @click="jumpToSearch()" class="iconfont icon-sousuo"></mt-button>
    </mt-header>
    <!-- 返回 标题 -->
    <mt-header class="type-three" :title="title" v-show="type=='type-three'">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <!-- 清除历史记录 -->
    <mt-header class="type-four" v-show="type=='type-four'" title="阅读历史">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        <mt-button  slot="right" @click="deleteHistory()" class="delete">清除</mt-button>
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
    // 删除浏览记录
    deleteHistory(){

    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont{
  font-size: .28rem;
}
.header /deep/ .mint-button-text{
  font-size: .3rem;
}
.header /deep/ .mint-header-title{
  font-size: .3rem;
}
.header /deep/ .mintui-back{
  font-size: .3rem;
}
.header{
  position: fixed;
  top:0;
  width: 100%;
  height: .9rem;
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
      position: relative;
      .search{
        width: 5.06rem;
        height: .54rem;
        border-radius: .27rem;
        background: transparent;
        border:none;
        background: #fff;
        text-indent: .6rem;
      }
      .iconfont{
        position: absolute;
        top:50%;
        left:.2rem;
        transform: translateY(-50%);
        color:#8f8f93;
      }
    }
    .category{
      color: #fff;
      span{
        font-size: .3rem;
        padding-right: .1rem;
        color: #fff;
      }
    }
  }
  .type-two{
    
  }
}
.mint-header{
  background: #a70a0a;
  height: .9rem;
  padding:0 .33rem;
  box-sizing: border-box;
}
</style>


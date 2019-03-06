<template>
  <section class="tab-bar">
    <div class="tab-bar-content">
      <ul>
        <li>
          <router-link :to="{ name: 'Myshelf' }" :class="[page=='/'? 'activeClass' : '','tab-bar-item']">
            <i class="iconfont icon-books"></i>
            <span>书架</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Home' }" :class="[page=='/home'? 'activeClass' : '','tab-bar-item']">
            <i class="iconfont icon-shu"></i>
            <span>书城</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Category' }" :class="[page=='/category'? 'activeClass' : '','tab-bar-item']">
            <i class="iconfont icon-fenlei"></i>
            <span>分类</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Rank' }" :class="[page=='/rank'? 'activeClass' : '','tab-bar-item']">
            <i class="iconfont icon-paixing"></i>
            <span>排行</span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name:'tabbar',
  computed:{
    page(){
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.activeClass{
  color: #a70a0a !important;
}
.tab-bar-item{
  display: flex;
  justify-content:space-between;
  align-items: center;
  flex-direction: column;
  .iconfont{
    text-align: center;
    font-size: .4rem;
    height: .5rem;
  }
  .tab-bar-item{
    span{
      margin-top: .2rem;
      font-size: .24rem;
    }
  }
}


.tab-bar{
  position: fixed;
  bottom:0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #ececec;
  z-index: 10;
  .tab-bar-content{
    ul{
      display: flex;
      align-items: center;
      height: 1.2rem;
      li{
        flex:0 0 25%;
        display: flex;
        justify-content: center;
        .tab-bar-item{
          color: #A3A3A3;
        }
      }

    }
  }
}
</style>


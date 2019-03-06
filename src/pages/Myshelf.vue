<template>
  <section class="my-shelf">
    <div class="header">
      <div class="left">追书神器</div>  
      <div class="right">
        <span class="search" @click="showSearch()">搜索</span>
        <span class="history" @click="showHistory()">历史</span>
      </div>
    </div>	
    <v-shelf-list :shelf-list="shelf_book_list" v-if="shelf_book_list.length>0"></v-shelf-list>
    <div class="without-book" v-else>
      <img src="../assets/img/without_shelf.png" alt="">
      <p>比撸猫更重要的，只有看书了……</p>
      <router-link :to="{name:'Home'}">添加书籍</router-link>
    </div>
    <v-tab-bar></v-tab-bar>
  </section>
</template>

<script>
import Header from '../components/common/Header'
import TabBar from '../components/common/TabBar'
import ShelfList from '../components/common/ShelfList'
import {mapState,mapMutations} from 'vuex'
import 'animate.css'
export default {
  name:'myshelf',
  components:{
    'v-tab-bar':TabBar,
    'v-header':Header,
    'v-shelf-list':ShelfList
  },
  data(){
    return{

    }
  },
  computed:{
    ...mapState([
      'shelf_book_list'
    ])
  },
  methods:{
    showSearch(){
      this.$router.push('/search')
    },
    showHistory(){

    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  top:0;
  height: .9rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background: #a70a0a;
  color: #fff;
  padding:0 .33rem;
  box-sizing: border-box;
  .left{
    font-size: .51rem;
    line-height: .9rem;
  }
  .right{
    line-height: .9rem;
  }
}
.my-shelf{
  margin-top: .9rem;
}
.without-book{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  text-align: center;
  width: 5.33rem;
  img{
    width: 5.33rem;
    height: 4.28rem;
  }
  p{
    font-size: .35rem;
    margin-top: .42rem;
    color: #969ba3;
  }
  a{
    display: block;
    margin:0 auto;
    margin-top: .58rem;
    width: 3.33rem;
    height: .86rem;
    border-radius: .43rem;
    font-size: .33rem;
    line-height: .86rem;
    background: #ED4744;
    color: #fff;
  }
}
</style>


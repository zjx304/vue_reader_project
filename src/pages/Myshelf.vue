<template>
  <section class="my-shelf">
    <v-header></v-header>
    <div>我的书架</div>
    <v-shelf-list :shelf-list="shelf_book_list"></v-shelf-list>
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
  }
}
</script>

<style lang="scss" scoped>
.my-shelf{
  margin-top: .9rem;
}
</style>


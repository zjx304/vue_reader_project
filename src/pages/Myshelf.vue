<template>
  <section class="my-shelf">
    <v-header></v-header>
    <div>我的书架</div>
    <v-tab-bar></v-tab-bar>
  </section>
</template>

<script>
import Header from '../components/common/Header'
import TabBar from '../components/common/TabBar'
export default {
  name:'myshelf',
  components:{
    'v-tab-bar':TabBar,
    'v-header':Header
  }
}
</script>

<style lang="scss" scoped>
.my-shelf{
  margin-top: .9rem;
}
</style>


<template>
  <section class="home">
    <v-header></v-header>
    <div>主页</div>
    <v-tab-bar></v-tab-bar>
  </section>
</template>

<script>
import Header from '../components/common/Header'
import TabBar from '../components/common/TabBar'
export default {
  name:'home',
  components:{
    'v-tab-bar':TabBar,
    'v-header':Header
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin-top: .9rem;
}
</style>

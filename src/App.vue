<template>
  <div id="app">
    <div class="container">
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
import http from './http/api'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'App',
  methods:{
    ...mapMutations([
      // 获取保存到localstorge数据
      'getStorageInitData'
		]),
  },
  created(){
    this.getStorageInitData()
  }
}
</script>

<style lang="scss">
@import 'assets/css/neat-min';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>


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
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import 'assets/css/neat-min';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: .6rem;
}
</style>


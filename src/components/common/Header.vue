<template>
  <section class="header">
    <router-link :to="{ name: 'Search'}">头部</router-link>
  </section>
</template>

<script>
export default {
  name:'Header'
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  top:0;
  width: 100%;
  height: .9rem;
  background: #a70a0a;
}
</style>


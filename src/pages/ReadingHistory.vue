<template>
  <section class="read-history">
    <ul>
      <li></li>
    </ul>
  </section>
</template>

<script>
import Header from '../components/common/Header'
import {mapState,mapMutations} from 'vuex'
export default {
  name:'readHistory',
  components:{
    'v-header':Header,
  },
}
</script>

<style lang="scss" scoped>

</style>

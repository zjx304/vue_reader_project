<template>
  <section class="read">
    <div>read页面</div>
    <v-read-content></v-read-content>
  </section>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import ReadCotent from '../components/common/ReadContent'
export default {
  name:'read',
  components:{
    'v-read-content':ReadCotent
  }
}
</script>

<style>

</style>

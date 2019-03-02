<template>
  <section class="shelf-list">
    <div>书架列表</div>
    <ul>
      <li v-for="shelf_item in shelfList" :key="shelf_item._id">
        <div class="avatar"></div>
        <div class="book-info">
          <h4>标题</h4>
        </div>
        <div class="button">删除</div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name:'shelf_list',
  props:{
    shelfList:Array
  },
  data(){
    return{

    }
  }
}
</script>

<style>

</style>

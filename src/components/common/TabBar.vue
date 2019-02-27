<template>
  <section class="tab-bar">
    <div class="tab-bar-content">
      <ul>
        <li>
          <router-link :to="{ name: 'Myshelf' }" class="tab-bar-item">
            书架
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Home' }" class="tab-bar-item">
            书城
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Category' }" class="tab-bar-item">
            分类
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Rank' }" class="tab-bar-item">
            排行
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name:'tabbar'
}
</script>

<style lang="scss" scoped>
.tab-bar{
  position: fixed;
  bottom:0;
  width: 100%;
  border-top: 1px solid #ececec;
  .tab-bar-content{
    ul{
      display: flex;
      align-items: center;
      height: 1.2rem;
      li{
      flex:0 0 25%;
      display: flex;
      justify-content: center;
      .tab-bar-item{

        }
      }

    }
  }
}
</style>


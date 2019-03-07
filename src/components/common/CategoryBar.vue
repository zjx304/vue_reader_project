<template>
  <section class="category-bar">
    <div class="category-filter">
      <div class="filter" @click="filter_show=!filter_show;type_show=false;">筛选</div>
      <div class="type" @click="type_show=!type_show;filter_show=false">类型</div>
    </div>
    <div class="category-filter-type">
      <transition name="filter">
        <ul class="filter-list" v-show="filter_show">
          <li class="filter-list-item" v-for="(type,index) in typeList" :class="['cat-filter-item', { active: type.value === selectedType }]" :data-value="type.value"
          :data-name="type.name" :key="index" @click="filterChange(type.value)">
          {{ type.name }}
          </li>
        </ul>
      </transition>
    </div>
    <div class="category-filter-major">
      <transition name="type">
        <ul class="type-list" ref="minorList" v-show="type_show">
          <li class="type-list-item" v-for="(minor,index2) in minorList" :class="['cat-filter-item', { active: minor === selectedMinor }]" :data-value="minor"
            :key="index2">
            {{ minor }}
          </li>
        </ul>
      </transition>
    </div>
  </section>
</template>

<script>
import http from '@/http/api'
import { mapState } from 'vuex'
export default {
  name:'category_bar',
  props: {
		gender: String,
		major: String
  },
  computed: {
    ...mapState([
      'filter',
    ]),
  },
  data(){
    return{
      typeList: [{
				value: 'hot',
				name: '热门'
			}, {
				value: 'new',
				name: '新书'
			}, {
				value: 'reputation',
				name: '好评'
			}, {
				value: 'over',
				name: '完结'
			}, {
				value: 'monthly',
				name: '包月'
			}],
			selectedType: 'hot',
			selectedTypeName: '热门',
			minorList: ['全部'],   //小分类
      selectedMinor: '全部',
      filter_show:false,   
      type_show:false
    }
  },
  methods:{
    getMinorList(){
      http.getMinorList()
			.then(data => {
        // for of 遍历数组
        for( let val of data[this.gender]){
          if(val.major==this.major){
            this.minorList.push(...val.mins);
          }
        }
			})
    },
    filterChange(type){
      console.log(type)
      this.$store.state.filter.type=type
      this.filter_show=!this.filter_show
    },

  },
  created(){
    this.getMinorList()
  }
}
</script>

<style lang="scss" scoped>
.category-bar{
  .category-filter{
    position: relative;
    display: flex;
    justify-content: space-between;
    height: .9rem;
  }
  .category-filter-type{
    
  }
}


</style>


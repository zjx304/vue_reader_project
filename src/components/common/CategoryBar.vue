<template>
  <section class="category-bar">
    <div class="category-filter-type">
      <ul>
        <li v-for="(type,index) in typeList" :class="['cat-filter-item', { active: type.value === selectedType }]" :data-value="type.value"
				:data-name="type.name" :key="index" @click="filterChange(type.value)">
				{{ type.name }}
			  </li>
      </ul>
    </div>
    <div class="category-filter-major">
      <ul class="cat-fliter-list" ref="minorList">
        <li v-for="(minor,index2) in minorList" :class="['cat-filter-item', { active: minor === selectedMinor }]" :data-value="minor"
          :key="index2">
          {{ minor }}
        </li>
      </ul>
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
    }
  },
  created(){
    this.getMinorList()
  }
}
</script>

<style lang="scss" scoped>
li{
  display: inline-block;
}
</style>


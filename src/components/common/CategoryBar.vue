<template>
  <section class="category-bar">
    <div class="category-filter">
      <div class="category-box">
        <div class="filter" :class="[filter_show?'reverse':'']" @click="filter_show=!filter_show;type_show=false;">按{{selectedTypeName}} <i class="iconfont  icon-plus-select-up"></i></div>
        <div class="type" :class="[type_show?'reverse':'']" @click="type_show=!type_show;filter_show=false">筛选<i class="iconfont  icon-plus-select-up"></i> </div>
      </div>
    </div>
    <div class="category-filter-type">
      <transition name="filter">
        <ul class="filter-list" v-show="filter_show">
          <li class="filter-list-item" v-for="(type,index) in typeList" :class="['cat-filter-item', { 'active': type.value === selectedType }]" :data-value="type.value"
          :data-name="type.name" :key="index" @click="filterChange(type)">
          {{ type.name }}
          </li>
        </ul>
      </transition>
    </div>
    <div class="category-filter-major">
      <transition name="type">
        <ul class="type-list" ref="minorList" v-show="type_show">
          <li class="type-list-item" v-for="(minor,index2) in minorList" :class="['cat-filter-item', { 'active': minor === selectedMinor }]" :data-value="minor"
            :key="index2" @click="typeChange(minor)">
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
    // 
    filterChange(type){
      this.$store.state.filter.type=type.value
      this.selectedType=type.value
      this.selectedTypeName=type.name
      this.filter_show=!this.filter_show
    },
    // 
    typeChange(minor){
      if(minor=='全部'){
        var minor=''
      }
      this.$store.state.filter.minor=minor
      this.selectedMinor=minor
      this.type_show=!this.type_show
    }

  },
  created(){
    this.getMinorList()

  }
}
</script>

<style lang="scss" scoped>
.active{
  color:red;
}


// 点击图标旋转
.iconfont{
  transition: transform 0.5s ease;
}
.icon-plus-select-up{
  display: inline-block;
}
.filter,.type{
  height: .5rem;
  line-height: .5rem;
  text-align: center;
  border-radius: .25rem;
  text-align: center;
}
.filter{
  width: 1.5rem;
}
.type{
  width: 1.2rem;
}
.reverse{
  color:red;
  background: pink;
  .icon-plus-select-up{
    // display: inline-block; 注意行内元素不能旋转，需要转为行内块元素
    transform:rotate(180deg);
  }
}



.category-bar{
  .category-filter{
    position: relative;
    height: .9rem;
    z-index: 3;
    .category-box{
      position: absolute;
      top:0;
      width: 100%;
      background: #fff;
      height: 100%;
      z-index: 3;
      display: flex;
      padding:0 .3rem;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #EFEFF4;
      color:rgb(172, 172, 172);
    }
  }
  .category-filter-type{
    position: absolute;
    top:.9rem;
    width: 100%;
    z-index: 2;     
    .filter-list{
      background: #fff;
      padding:0 .3rem;
      box-sizing: border-box;
      transition: transform 0.5s ease;
      border-bottom: 1px solid #EFEFF4;
      .filter-list-item{

      }
      &.filter-enter-active{
        transform: translateY(0);
      }
      &.filter-enter{
        transform: translateY(-100%); 
      }
      &.filter-leave-active{
        transform: translateY(-100%);
      }
      &.filter-leave{

      }
    }  
  }
  .category-filter-major{
    position: absolute;
    top:.9rem;
    width: 100%;
    z-index: 2;
    .type-list{
      background: #fff;
      padding:0 .3rem;
      box-sizing: border-box;
      transition: transform 0.5s ease;
      border-bottom: 1px solid #EFEFF4;
      .type-list-item{

      }
      &.type-enter-active{
        transform: translateY(0);
      }
      &.type-enter{
        transform: translateY(-100%); 
      }
      &.type-leave-active{
        transform: translateY(-100%);
      }
      &.type-leave{

      }
    }
  }
}


</style>


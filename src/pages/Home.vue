<template>
  <section class="home">
    <v-header></v-header>
    <div class="tabs-warp">
      <div ref="tabsContent" class="tabs-content">
        <div style="display: inline-block"> <!--PC端运行,加上这个div可修复tab-bar错位的问题 -->
          <ul class="tabs" ref="tabs">
            <li class="tab" v-for="(tab,i) in tabs" :class="{active: i===curIndex}" :style="{width: tabWidth+'px'}" :key="i" @click="changeTab(i)">{{tab.name}}</li>
          </ul>
          <div class="tab-bar" :style="{width: barWidth+'px', left: barLeft}"></div>
        </div>
      </div>
    </div>
    <!--轮播-->
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <!-- 精选 -->
        <div v-for="(feature_item,index) in feature_channel" :key="index">
          <v-home-list :channel="feature_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 男频 -->
        <div v-for="(male_item,index) in male_channel" :key="index">
          <v-home-list :channel="male_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 女频 -->
        <div v-for="(female_item,index) in female_channel" :key="index">
          <v-home-list :channel="female_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 限免 -->
        <div v-for="(free_item,index) in free_channel" :key="index">
          <v-home-list :channel="free_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 出版 -->
        <div v-for="(publish_item,index) in publish_channel" :key="index">
          <v-home-list :channel="publish_item"></v-home-list>
        </div>
      </swiper-slide>
    </swiper>
    <v-tab-bar></v-tab-bar>
  </section>
</template>

<script>
import http from '../http/api'
import Header from '../components/common/Header'
import TabBar from '../components/common/TabBar'
import HomeList from '../components/common/HomeList'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'home',
  data () {
    return {
      feature_channel:[],  //精选
      male_channel:[],  //男频
      female_channel:[],//女频
      free_channel:[],
      publish_channel:[],
      sex:'male',
      tabs: [
              {name: '精选',}, 
              {name: '男频',}, 
              {name: '女频',}, 
              {name: '限免',}, 
              {name: '出版',}, 
            ],
      tabWidth: 80, // 每个tab的宽度
      barWidth: 40, // tab底部红色线的宽度
      curIndex: 0, // 当前tab的下标
      tabScrollLeft: 0, // 菜单滚动条的位置
      swiperOption: { // 轮播配置
        on: {
          transitionEnd: () => {
            this.changeTab(this.swiper.activeIndex)
          }
        }
      }
    }
  },
  components: {
    'v-header':Header,
    'v-tab-bar':TabBar,
    'v-home-list':HomeList,
    swiper, // 轮播组件
    swiperSlide, // 轮播组件
  },
  computed: {
    swiper () { // 轮播对象
      return this.$refs.mySwiper.swiper
    },
    barLeft () { // 红线的位置
      return (this.tabWidth * this.curIndex + (this.tabWidth - this.barWidth) / 2) + 'px'
    }
  },
  methods: {
    // 切换菜单
    changeTab (tabIndex) {
      if (this.curIndex === tabIndex) return; // 避免重复调用
      let curTab = this.tabs[this.curIndex];// 当前列表
      let newTab = this.tabs[tabIndex];// 新转换的列表
      this.curIndex = tabIndex; // 切换菜单
      curTab.mescroll
      this.swiper.slideTo(tabIndex);
      let tabsContent = this.$refs.tabsContent;
      let tabDom = tabsContent.getElementsByClassName('tab')[tabIndex];
      let star = tabsContent.scrollLeft;// 当前位置
      let end = tabDom.offsetLeft + tabDom.clientWidth / 2 - document.body.clientWidth / 2; // 居中
      this.tabScrollLeft = end;
      tabsContent.scrollLeft = end;
    },
    getHomeRecommendData(){
      http.getFeaturedData()
        .then(data=>{
          console.log(data)

          // data 类型 畅销短篇 m站顶部banner 男生热门 女生佳作 男生完本 男生大神区 女生红文区 男频限免 女频限免
          // 由于没有找到特定的接口，所以精选为全部 包含男频 女频的内容
          // 精选为全部
          // 男频 为男生热门 男生完本 男生大神区
          // 女频 为女生佳作 女生红文区
          // 限免 男频限免 女频限免
          // 出版
          this.feature_channel=data.filter(function(item){
              return item.type !=1; 
          })
          this.male_channel=data.filter(function(item){
              return item.title=='男生热门'||item.title=='男生完本'||item.title=='男生大神区'; 
          })
          this.female_channel=data.filter(function(item){
              return item.title=='女生佳作'||item.title=='女生红文区'; 
          })
          this.free_channel=data.filter(function(item){
              return item.title=='男频限免'||item.title=='女频限免'; 
          })
          this.publish_channel=data.filter(function(item){
              return item.type !=1; 
          })
          // this.feature=data.delete

					// let sexOrder = this.sex === 'male' ? [2, 5, 7, 9] : [1, 4, 6, 8];
					// data = data.filter((obj) => {
					// 	return sexOrder.includes(obj.order) && obj.type === 0;
					// });
          // this.recommend = data;
          // console.log(this.recommend)
          // // this.loadModules = Array.from(data, value => value._id);
        })
    }
  },
  created(){
    this.getHomeRecommendData()
  }
}
</script>

<style lang="scss" scoped>
@import 'animate.css';


.swiper-slide{
  overflow-y: scroll;
}

.home{
  margin-top: .9rem;
}
/*菜单*/
.tabs-warp{
  text-align: center;
  height: 42px;/*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
  overflow-y: hidden;
  border-bottom: 1px solid #eee;
  box-sizing: content-box;
}
.tabs-warp .tabs-content{
  width: 100%;
  height: 50px;
  overflow-x: auto;
}
.tabs-warp .tabs-content .tabs{
  width: 100%;
  white-space: nowrap;
}
.tabs-warp .tabs-content .tabs li{
  display: inline-block;
  height: 40px;
  line-height: 45px;
  vertical-align: middle;
}
.tabs-warp .tabs-content .tabs .active{
  color: #FF6990;
}
/*菜单进度*/
.tabs-warp .tab-bar{
  position: relative;
  height: 2px;
  background-color: #FF6990;
  transition: left 300ms;
}
/*列表*/
.swiper-container{
  position: fixed;
  top: 130px;
  left: 0;
  right: 0;
  bottom:70px;
}
</style>

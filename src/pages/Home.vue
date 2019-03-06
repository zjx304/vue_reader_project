<template>
  <section class="home">
    <v-header :title="title" :type="type"></v-header>
    <div class="home-swiper">
      <swiper :options="swiperHomeOption">
        <swiper-slide v-for="swiper_item in swiper_img" :key="swiper_item._id">
          <router-link :to="{ name: 'Book', params: { id: swiper_item._id }}">
            <img :src="swiper_item.img" alt="">
          </router-link>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <div class="tabs-warp" :class="searchBarFixed == true ? 'isFixed' :''">
      <div ref="tabsContent" class="tabs-content">
        <div style="display: inline-block"> <!--PC端运行,加上这个div可修复tab-bar错位的问题 -->
          <ul class="tabs" ref="tabs">
            <li class="tab" v-for="(tab,i) in tabs" :class="{active: i===curIndex}" :key="i" @click="changeTab(i)">{{tab.name}}</li>
          </ul>
          <div class="tab-bar" :style="{left: barLeft}"></div>
        </div>
      </div>
    </div>
    <div v-if="searchBarFixed" class="replace-tab"></div>
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
      title:'主页',
      type:"type-one",
      feature_channel:[],  //精选
      male_channel:[],  //男频
      female_channel:[],//女频
      free_channel:[],
      publish_channel:[],
      sex:'male',   //设置默认男性，以后数据sex都是male
      tabs: [
              {name: '精选',}, 
              {name: '男频',}, 
              {name: '女频',}, 
              {name: '限免',}, 
              {name: '出版',}, 
            ],
      curIndex: 0, // 当前tab的下标
      tabScrollLeft: 0, // 菜单滚动条的位置
      swiperOption: { // 轮播配置
        on: {
          transitionEnd: () => {
            this.changeTab(this.swiper.activeIndex)
          }
        }
      },
      swiperHomeOption:{
        // autoplay,
        // loop:true
      },
      isMounted:false,
      searchBarFixed:false,
      offsetTop:0,    //吸顶
      swiper_img:[]   //轮播
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
    // 需要等dom加载完才能获取到dom
      if(this.isMounted){
        var tabWidth=document.getElementsByClassName('tab')[0].offsetWidth
        var barWidth=document.getElementsByClassName('tab-bar')[0].offsetWidth
        return (tabWidth * this.curIndex + (tabWidth - barWidth) / 2) + 'px'
      }
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
          // data 类型 畅销短篇 m站顶部banner 男生热门 女生佳作 男生完本 男生大神区 女生红文区 男频限免 女频限免
          // 由于没有找到特定的接口，所以精选为全部 包含男频 女频的内容
          // 精选为全部
          // 男频 为男生热门 男生完本 男生大神区
          // 女频 为女生佳作 女生红文区
          // 限免 男频限免 女频限免
          // 出版
          // 为了凑足每类都有3个
          this.feature_channel=data.filter(function(item){
              return item.type !=1 &&item.order<=4; 
          })
          this.male_channel=data.filter(function(item){
              return item.title=='男生热门'||item.title=='男生完本'||item.title=='男生大神区'; 
          })
          this.female_channel=data.filter(function(item){
              return item.title=='女生佳作'||item.title=='女生红文区'||item.title=='女频限免'; 
          })
          this.free_channel=data.filter(function(item){
              return item.title=='男频限免'||item.title=='女频限免'||item.title=='男生大神区'; 
          })
          this.publish_channel=data.filter(function(item){
              return item.type !=1&&item.order>=7; 
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
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(this.offsetTop==0){
        this.offsetTop=document.querySelector('.tabs-warp').offsetTop-document.querySelector('.header').offsetHeight
      }
      if (scrollTop > this.offsetTop) {
          this.searchBarFixed = true
      } else {
          this.searchBarFixed = false
      }
    },
    // 获取轮播图
    getSwiperPictures(){
      http.getSwiperPictures()
        .then(data => {
          this.swiper_img=data
        })
    }
  },
  mounted(){
    this.isMounted=true
    // 吸顶
    window.addEventListener('scroll', this.handleScroll)
  },
  created(){
    this.getHomeRecommendData()
    this.getSwiperPictures()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss" scoped>
@import 'animate.css';


.swiper-slide{
  overflow-y: scroll;
}

.isFixed{
 position:fixed;
 background-color:#Fff;
 top:.9rem;
 z-index:999;
}
.replace-tab{
  widows: 100%;
  height: 1rem;
}
.home{
  margin-top: .9rem;
  .home-swiper{
    margin:0 auto;
    width: 6.97rem;
    height: 2.84rem;
    padding:.15rem 0;
    .swiper-container{
      width: 100%;
      height: 100%;
      .swiper-wrapper{
        width: 100%;
        height: 100%;
        .swiper-slide{
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            border-radius: .15rem;
          }
        }
      }
    }



  }
}

/*菜单*/
.tabs-warp{
  text-align: center;
  height: .84rem;/*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
  overflow-y: hidden;
  border-bottom: 1px solid #eee;
  box-sizing: content-box;
}
.tab{
  width: 1.6rem;
}
.tabs-warp .tabs-content{
  width: 100%;
  height: 1rem;
  overflow-x: auto;
}
.tabs-warp .tabs-content .tabs{
  width: 100%;
  white-space: nowrap;
}
.tabs-warp .tabs-content .tabs li{
  display: inline-block;
  height: .8rem;
  line-height: .9rem;
  vertical-align: middle;
}
.tabs-warp .tabs-content .tabs .active{
  color: #a70a0a;;

}
/*菜单进度*/
.tabs-warp .tab-bar{
  position: relative;
  height: 2px;
  background-color: #a70a0a;;
  transition: left 300ms;
  width: .8rem;
}
/*列表*/
.swiper-container{
  padding-bottom:1.2rem;
}
</style>

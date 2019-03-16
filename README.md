# 说明

> 仿造追书神器app基于vue开发的webapp，使用的追书神器提供的api，页面UI设计参照了其他app

## 运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 技术难点
## 1.filter处理返回时间
<span class="time red">{{ book.updated | time}}</span>

import moment from 'moment';

    filters: {
        time(updated) {
            moment.locale('zh-cn');
            return moment(updated).fromNow();
        }
    },

## 2.tab切换和吸顶效果
吸顶效果

    <div class="tabs-warp" :class="searchBarFixed == true ? 'isFixed' :''">
      <div ref="tabsContent" class="tabs-content">
    <!-- 导航 -->
      </div>
    <div v-if="searchBarFixed" class="replace-tab"></div>
定义函数 当滑动距离超过tab栏到顶部距离的时候，应用isFixed样式。

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
在mounted阶段，监听滚动，当滚动的时候实现上面的函数

  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  
当离开组件的时候需要移除

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },


滑动内容带动tab栏滑动

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
    <!--  -->
    <div v-if="searchBarFixed" class="replace-tab"></div>
    <!--轮播-->
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <!-- 精选 -->
        <div v-for="(feature_item,index) in feature_channel" :key="index">
          <v-home-list  :channel="feature_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 男频 -->
        <div v-for="(male_item,index) in male_channel" :key="index">
          <v-home-list  :channel="male_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 女频 -->
        <div v-for="(female_item,index) in female_channel" :key="index">
          <v-home-list  :channel="female_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 限免 -->
        <div v-for="(free_item,index) in free_channel" :key="index">
          <v-home-list  :channel="free_item"></v-home-list>
        </div>
      </swiper-slide>
      <swiper-slide>
        <!-- 出版 -->
        <div v-for="(publish_item,index) in publish_channel" :key="index">
          <v-home-list  :channel="publish_item"></v-home-list>
        </div>
      </swiper-slide>
    </swiper>
引入插件
 ```
import { swiper, swiperSlide } from 'vue-awesome-swiper'
//设置swiper
  data () {
    return {
      curIndex: 0, // 当前tab的下标
      tabScrollLeft: 0, // 菜单滚动条的位置
      swiperOption: { // 轮播配置
        on: {
          transitionEnd: () => {
            this.changeTab(this.swiper.activeIndex)
          }
        }
      },
      isMounted:false,
      searchBarFixed:false,
      offsetTop:0,    //吸顶
    }
  },
//监听轮播

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
//当轮播切换的时候执行changeTab，tabIndex为轮播的索引

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
  },
}
 ```
## 3.项目上线反向代理
```#放开下列文件限制
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_connect_module modules/mod_proxy_connect.so
LoadModule proxy_ftp_module modules/mod_proxy_ftp.so
LoadModule proxy_http_module modules/mod_proxy_http.so

#在文件末尾设置追书神器项目代理
ProxyPass /api http://api.zhuishushenqi.com
ProxyPassReverse /api http://api.zhuishushenqi.com

ProxyPass /chapterapi http://chapter2.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com
ProxyPassReverse /chapterapi http://chapter2.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com
```
##更多内容请看我的博客：https://www.cnblogs.com/zjx304/p/10411596.html


# 效果图展示

### 轮播、tab切换、吸顶效果
![avatar](https://github.com/zjx304/vueproject/blob/master/gif/%E5%90%B8%E9%A1%B6%E6%BB%91%E5%8A%A8%E5%88%87%E6%8D%A2%E6%95%88%E6%9E%9C.gif)
### 左右联动
![avatar](https://github.com/zjx304/vueproject/blob/master/gif/%E5%B7%A6%E5%8F%B3%E8%81%94%E5%8A%A8%E7%AD%9B%E9%80%89.gif)
### 滑动切换tab
![avatar](https://github.com/zjx304/vueproject/blob/master/gif/%E5%B7%A6%E5%8F%B3%E6%BB%91%E5%8A%A8.gif)
### 搜索
![avatar](https://github.com/zjx304/vueproject/blob/master/gif/%E6%90%9C%E7%B4%A2.gif)
### 阅读 添加到书架 改变皮肤颜色和字体大小 选择目录章节
![avatar](https://github.com/zjx304/vueproject/blob/master/gif/%E9%98%85%E8%AF%BB.gif)



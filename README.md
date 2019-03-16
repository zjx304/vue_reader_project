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

    `<div class="tabs-warp" :class="searchBarFixed == true ? 'isFixed' :''">
      <div ref="tabsContent" class="tabs-content">
    <!-- 导航 -->
      </div>
    <div v-if="searchBarFixed" class="replace-tab"></div>`
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


## 3.菜单左右联动效果

## 4.筛选栏动画效果

## 5.根据评分显示相应星级

## 6.退出时提示添加到书架

## 7.改变皮肤颜色和字体大小

## 8.项目上线反向代理


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



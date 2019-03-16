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
## 1.处理返回时间
<span class="time red">{{ book.updated | time}}</span>

import moment from 'moment';

    filters: {
        time(updated) {
            moment.locale('zh-cn');
            return moment(updated).fromNow();
        }
    },

## 2.


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



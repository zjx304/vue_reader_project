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

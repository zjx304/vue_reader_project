<template>
  <section class="category">
    <v-header :title="title" :type="type"></v-header>
    <div class="content">
      <div class="category-box">
        <!-- 左边 -->
        <div class="menu-wrapper">
          <ul>
            <li class="menu-item"  v-for="(val,key,index) in category_data" :key="index" :class="{current: index === currentIndex}" @click="clickList(index)" ref="menuList">
              <span class="menu-item-text">{{category_label[key]}}</span>
            </li>
          </ul>
        </div>
        <!-- 右边 -->
        <div class="category-wrapper">
          <ul ref="itemList">
            <li class="categorys-li" v-for="(val,key,index1) in category_data" :key="index1">
              <div class="categorys-title">
                <span class="line"></span><span class="star">★</span><h4>{{category_label[key]}}</h4><span class="star">★</span><span class="line"></span>
              </div>
              <ul class="categorys-items">
                <li v-for="(item, index2) in val" :key="index2">
                  <router-link :to="{ name: 'CategoryList', params: { major: item.name}, query: { gender:key} }">
                    <div class="item-left">
                      <span>{{item.name}}</span>
                      <span>{{item.bookCount}}本</span>
                    </div>
                    <div class="item-right">
                      <img class="pic1" :src="staticPath+item.bookCover[0]" alt="">
                      <img class="pic2" :src="staticPath+item.bookCover[1]" alt="">
                      <img class="pic3" :src="staticPath+item.bookCover[2]" alt="">
                    </div>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>        
      </div>
      <v-tab-bar></v-tab-bar>
    </section>  
</template>
<script>
import http from '../http/api'
import Header from 'components/common/Header'
import TabBar from '../components/common/TabBar'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
import {staticPath} from '../assets/js/storage_function'
export default {
  name:'category',
  components:{
    'v-tab-bar':TabBar,
    'v-header':Header
  },
  data(){
    return{
      title:'分类',
      type:'type-two',
      // titleName:'分类',
      scrollY: 0, //右侧列表滑动的y轴坐标
      rightLiTops:[], //所有分类头部位置
      category_data:[],
      category_label:{
        male:'男生',
        female:'女生',
        picture:'漫画',
        press:'出版'
      },
      staticPath:staticPath
    }
  },
  computed: {
    // ...mapState(['searchgoods']),   //列表数据
    //动态绑定class类名
    currentIndex(index) {
      const {scrollY,rightLiTops} = this;
      return rightLiTops.findIndex((tops,index )=>{
        this._initLeftScroll(index);
        return scrollY >= tops && scrollY < rightLiTops[index + 1]
      })
    }
  },
  mounted() {


  },
  watch:{
    // searchgoods(){
    //   //监听数据
    //   // this.$nextTick(() =>{
    //   //   //左右两边滚动
    //   //   this. _initBScroll();
    //   //   //右边列表高度
    //   //   this._initRightHeight()
    //   // })
    // }
  },
  methods:{
    _initBScroll() {
      //左边滚动
      this.leftBscroll = new BScroll('.menu-wrapper',{click: true});
      //右边滚动
      this.rightBscroll = new BScroll('.category-wrapper',{
        click: true,
        probeType:3
      });
      //监听右边滚动事件
      this.rightBscroll.on('scroll',(pos) => {
        this.scrollY = Math.abs(pos.y);
      })
    },
    
    //求出右边列表的高度
    _initRightHeight(){
      let itemArray=[]; //定义一个伪数组
      let top = 0;
      itemArray.push(top)
      //获取右边所有li
      let allList = this.$refs.itemList.getElementsByClassName('categorys-li');
      //allList伪数组转化成真数组
      Array.prototype.slice.call(allList).forEach(li => {
        top += li.clientHeight; //获取所有li的每一个高度
        itemArray.push(top)
      });
      this.rightLiTops = itemArray;
    },
    //点击左边实现滚动
    clickList(index){
      this.scrollY = this.rightLiTops[index];
      this.rightBscroll.scrollTo(0,-this.scrollY,200)
    },
    //左右联调 
    _initLeftScroll(index){
      let menu = this.$refs.menuList;
      let el = menu[index];
      this.leftBscroll.scrollToElement(el,300,0,-300)
    },
    // 获取分类页数据
    getCategoryData(){
      http.getCategory()
        .then(data=>{
          delete data.ok
          // 把数据保存到vuex state
          this.category_data=data
          this.$nextTick(() =>{
              //左右两边滚动
              this. _initBScroll();
              //右边列表高度
              this._initRightHeight()
          })
        })
    }
  },
  created(){
    this.getCategoryData()
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/mixin.scss';
.star{
  font-size: .15rem;
}
.category{
  @include wh(100%,100%);
  overflow: hidden;
  .content{
    @include wh(100%,100%);
  }
}
.category-box{
  display: flex;
  position: fixed;
  width: 100%;
  top:.9rem;
  bottom: 1.2rem;
  overflow: hidden;
  .menu-wrapper{
    // background:#fafafa;
    font-size: .28rem;
    flex:0 0 1.28rem;
    .menu-item{
      width: 100%;
      position: relative;
      // background:#fafafa;
      color: #666;
      @include fj(center);
      .menu-item-text{
        display: block;
        height: .9rem;
        line-height: .9rem;
        width: .7rem;
        text-align: center;
        border-top: 1px solid #f0f0f0;
      }
      .menu-item-text:last-child{
        border-bottom: 1px solid #f0f0f0;
      }
    }
    .current{
      color:red;
      background: #fff;
    }
    .current::before {
      content:'';
      background-color:red;
      width:.04rem;
      height: .41rem;
      position:absolute;
      left:.06rem;
      top:50%;
      transform: translateY(-50%);
    }
  }

  .category-wrapper{
    flex:1;
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 6rem;
    ul{
      .categorys-title{
        width: 5.9rem;
        @include fj();
        align-items: center;
        flex-direction: row;
        height: .8rem;
        color: #d6d5db;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .line{
          width: 2.19rem;
          height: 2px;
          background: #f0f0f5;
        }
        h4{
          font-size: .26rem;
          color: #d6d5db;
        }
      }
      .categorys-items{
        display: flex;
        flex-wrap:wrap;
        li{
          flex:0 0 2.88rem;
          margin-right: .16rem;
          height: 1.16rem;
          background: #f9f9fb;
          align-items: center;
          margin-bottom: .16rem;
          a{
            display: flex;
            justify-content: space-between;
            .item-left{
              margin-left: .29rem;
              &>span:first-child{
                margin-top: .2rem;
                display: block;
                font-size: .25rem;
                // color: #616166;
                color: #333;
              }
              &>span:last-child{
                display: block;
                font-size: .2rem;
                color: #9b9b9b;
              }
            }
          }

          .item-right{
            margin-top: .17rem;
            margin-right: .12rem;
            width: 1rem;
            height: 1rem;
            position: relative;
            .pic1{
              position: absolute;
              width: .7rem;
              height: .95rem;
              z-index: 3;
              bottom:0;
              left: 50%;
              transform: translateX(-50%);
            }
            .pic2{
              position: absolute;
              left: 0;
              bottom:0;
              width: .5rem;
              height: .67rem; 
              z-index: 2;
            }
            .pic3{
              position: absolute;
              right:0;
              bottom:0;
              width: .3rem;
              height: .4rem; 
              z-index: 1;

            }
          }
        }
        li:nth-of-type(even){
          margin-right: 0;
        }
      }

    }

  }
}

</style>
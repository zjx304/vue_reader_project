<template>
  <section class="category">
    <div class="content">
      <div class="category-box">
        <!-- 左边 -->
        <div class="menu-wrapper">
          <ul>
            <li class="menu-item"  v-for="(val,key,index) in category_data" :key="index" :class="{current: index === currentIndex}" @click="clickList(index)" ref="menuList">
              <span>{{category_label[key]}}</span>
            </li>
          </ul>
        </div>
        <!-- 右边 -->
        <div class="category-wrapper">
          <ul ref="itemList">
            <li class="categorys-li" v-for="(val,key,index1) in category_data" :key="index1">
              <div class="categorys-title">
                <h4>{{category_label[key]}}</h4>
              </div>
              <ul class="categorys-items">
                <li v-for="(item, index2) in val" :key="index2">
                  <span>{{item.name}}</span>
                  <span>{{item.bookCount}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>        
      </div>
    </section>  
</template>
<script>
import http from '../http/api'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      titleName:'分类',
      scrollY: 0, //右侧列表滑动的y轴坐标
      rightLiTops:[], //所有分类头部位置
      category_data:[],
      category_label:{
        male:'男生',
        female:'女生',
        picture:'漫画',
        press:'出版'
      }
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
      console.log(allList)
      //allList伪数组转化成真数组
      Array.prototype.slice.call(allList).forEach(li => {
        top += li.clientHeight; //获取所有li的每一个高度
        itemArray.push(top)
      });
      this.rightLiTops = itemArray;
      // console.log(this.rightLiTops)
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
          console.log(data)
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
.category{
  @include wh(100%,100%);
  overflow: hidden;
  .content{
    @include wh(100%,100%);
  }
}
.category-box{
  display: flex;
  position: absolute;
  width: 100%;
  top:.8rem;
  bottom: 1.2rem;
  overflow: hidden;
  .menu-wrapper{
    // background: #e0e0e0;
    background:#fafafa;
    flex:0 0 1.5rem;
    .menu-item{
      width: 100%;
      height: .6rem;
      position: relative;
      background:#fafafa;
      color: #666;
      @include fj(center);
    }
    .current{
      color:red;
      background: #fff;
    }
    .current::before {
      content:'';
      background-color:red;
      width:.04rem;
      height: 100%;
      position:absolute;
      left:0;
    }
  }

  .category-wrapper{
    flex:1;
    background: #fff;
    ul{
      padding-bottom: 2rem;
      .categorys-title{
        @include fj();
        align-items: center;
        flex-direction: row;
        height: .8rem;
        color: #999;
      }
      .categorys-items{
        display: flex;
        flex-wrap:wrap;
        li{
          @include fj(center);
          @include wh(50%,2rem);
          align-items: center;
          .icon{
            width: .3rem;
            height: .3rem;
          }
        }
      }

    }

  }
}

</style>